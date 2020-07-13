import sleep from '../../lib/sleep';
import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import subscriptionHints from '../../enums/subscriptionHints';
import subscriptionFilters from '../../enums/subscriptionFilters';

import { getMeetingProvider } from './service';

/**
 * @class
 * @description: just check meeting provider from RC PLA
 */
@Module()
export default class MeetingProvider extends DataFetcher {
  constructor({ ...options }) {
    super({
      ...options,
      subscriptionFilters: [subscriptionFilters.extensionInfo],
      subscriptionHandler: async (message) => {
        await this._subscriptionHandleFn(message);
      },
      async fetchFunction() {
        const data = await getMeetingProvider(this._client);
        return data;
      },
      disableCache: true,
    });
  }

  async _subscriptionHandleFn(message) {
    if (message?.body?.hints?.includes(subscriptionHints.videoConfiguration)) {
      // https://jira.ringcentral.com/browse/ENV-67087
      // the video configuration api may return the old value
      // when we try to query immediately right after got the push notification
      // here we wait for seconds as a workaround to solve the issue
      await sleep(5000);
      await this.fetchData();
    }
  }

  get provider() {
    return this.data?.provider;
  }

  get _name() {
    return 'meetingProvider';
  }
}
