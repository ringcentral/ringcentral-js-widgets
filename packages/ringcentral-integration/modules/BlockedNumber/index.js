import DataFetcher from '../../lib/DataFetcher';
import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import { selector } from '../../lib/selector';
/**
 * @class
 * @description Blocked number list managing module
 */
@Module({
  deps: [
    'Client',
    'ExtensionFeatures',
    { dep: 'BlockedNumberOptions', optional: true },
  ],
})
export default class BlockedNumber extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({ client, extensionFeatures, ...options }) {
    super({
      ...options,
      client,
      fetchFunction: async () =>
        fetchList((params) =>
          this._client.account().extension().blockedNumber().list(params),
        ),
      readyCheckFn: () => this._extensionFeatures.ready,
      cleanOnReset: true,
    });

    this._extensionFeatures = extensionFeatures;
  }

  get _name() {
    return 'blockedNumber';
  }

  @selector
  numbers = [() => this.data, (data) => data || []];

  get _hasPermission() {
    return (
      this._extensionFeatures.features?.ReadBlockedNumbers?.available ?? false
    );
  }
}
