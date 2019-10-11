import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import { selector } from '../../lib/selector';
import subscriptionHints from '../../enums/subscriptionHints';
import subscriptionFilters from '../../enums/subscriptionFilters';

function extractData(res) {
  const features = {};
  res.records.forEach((x) => {
    features[x.id] = {
      available: x.available,
    };
    if (!x.available) {
      features[x.id].reason = x.reason;
    }
  });
  return features;
}

/**
 * @class
 * @description Extension features
 */
@Module({
  deps: ['Client', { dep: 'ExtensionFeaturesOptions', optional: true }],
})
class ExtensionFeatures extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({ client, ...options }) {
    super({
      client,
      subscriptionFilters: [subscriptionFilters.extensionInfo],
      subscriptionHandler: async (message) => {
        await this._subscriptionHandleFn(message);
      },
      async fetchFunction() {
        const res = await client.service
          .platform()
          .get('/account/~/extension/~/features');
        return extractData(res.json());
      },
      cleanOnReset: true,
      ...options,
    });
  }

  get _name() {
    return 'extensionFeatures';
  }

  async _subscriptionHandleFn(message) {
    if (
      message &&
      message.body &&
      message.body.hints &&
      (message.body.hints.includes(subscriptionHints.limits) ||
        message.body.hints.includes(subscriptionHints.features) ||
        message.body.hints.includes(subscriptionHints.permissions))
    ) {
      await this.fetchData();
    }
  }

  @selector
  features = [() => this.data, (data) => data || {}];
}

export default ExtensionFeatures;
