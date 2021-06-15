import DataFetcher from '../../lib/DataFetcher';
import { Module } from '../../lib/di';
import { selector } from '../../lib/selector';

/**
 * @class
 * @description Glip Company managing module.
 */
@Module({
  deps: [
    'Client',
    'ExtensionFeatures',
    { dep: 'GLipCompanyOptions', optional: true },
  ],
})
export default class GlipCompany extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({ client, extensionFeatures, ...options }) {
    super({
      client,
      fetchFunction: async () => {
        const response = await this._client.glip().companies('~').get();
        return response;
      },
      readyCheckFn: () => this._extensionFeatures.ready,
      cleanOnReset: true,
      ...options,
    });
    this._extensionFeatures = extensionFeatures;
  }

  get _name() {
    return 'glipCompany';
  }

  @selector
  info = [() => this.data, (data) => data || {}];

  get name() {
    return this.info.name;
  }

  get domain() {
    return this.info.domain;
  }

  get id() {
    return this.info.id;
  }

  get _hasPermission() {
    return !!this._extensionFeatures.features?.Glip?.available;
  }
}
