import { Module } from '../../lib/di';
import { getMeetingProvider } from './service';
import DataFetcher from '../../lib/DataFetcher';

/**
 * @class
 * @description: just check meeting provider from RC PLA
 */
@Module({
  deps: ['Auth', 'Client', 'Alert'],
})
export default class MeetingProvider extends DataFetcher {
  constructor({ ...options }) {
    super({
      cleanOnReset: true,
      ...options,
      async fetchFunction() {
        const data = await getMeetingProvider(this._client);
        return data;
      },
      disableCache: true,
    });
  }

  get provider() {
    return this.data && this.data.provider;
  }

  get status() {
    return this.state.status;
  }

  get _name() {
    return 'meetingProvider';
  }
}
