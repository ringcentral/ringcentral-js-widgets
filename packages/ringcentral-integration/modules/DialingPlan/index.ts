import moduleStatuses from '../../enums/moduleStatuses';
import DataFetcher from '../../lib/DataFetcher';
import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import { selector } from '../../lib/selector';

/**
 * @class
 * @description Dial plan list managing module
 */
@Module({
  deps: [
    'Client',
    'ExtensionFeatures',
    { dep: 'DialingPlanOptions', optional: true },
  ],
})
export default class DialingPlan extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({ client, extensionFeatures, ...options }) {
    super({
      client,
      polling: true,
      fetchFunction: async () =>
        (
          await fetchList(async (params) => {
            const platform = client.service.platform();
            const response = await platform.get(
              '/restapi/v1.0/account/~/dialing-plan',
              params,
            );
            return response.json();
          })
        ).map((p) => ({
          id: p.id,
          isoCode: p.isoCode,
          callingCode: p.callingCode,
        })),
      readyCheckFn: () => this._extensionFeatures.ready,
      ...options,
    });

    this._extensionFeatures = extensionFeatures;
  }

  get _name() {
    return 'dialingPlan';
  }

  @selector
  plans = [() => this.data, (data) => data || []];

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get _hasPermission() {
    return !!this._extensionFeatures.features?.ReadCompanyInfo?.available;
  }
}
