import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import { selector } from '../../lib/selector';

@Module({
  deps: ['Client', { dep: 'CallerIdOptions', optional: true }],
})
export class CallerId extends DataFetcher {
  constructor({ ...options }) {
    super({
      fetchFunction: async () => {
        const resp = await this._client.service
          .platform()
          .get('/restapi/v1.0/account/~/extension/~/caller-id');
        return resp.json();
      },
      ...options,
    });
  }

  get _name() {
    return 'callerId';
  }

  get byDevice() {
    return this.data.byDevice;
  }

  get byFeature() {
    return this.data.byFeature;
  }

  @selector
  ringOut = [
    () => this.byFeature,
    (settings = []) =>
      settings.find((item) => item.feature === 'RingOut')?.callerId,
  ];
}
