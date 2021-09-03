import { computed } from '@ringcentral-integration/core';
import ConfigData from './ConfigData.json';
import { Module } from '../../lib/di';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { Deps } from './DynamicConfig.interface';
import { fetchWithJsonp } from '../../lib/fetchWithJsonp';

export const getRcmUriRegExp = (regExpText: string) =>
  new RegExp(
    `(https?):\\/\\/${regExpText}(\\/\\w+)?(\\/(\\d+))(\\?pwd=\\w+)?`,
    'i',
  );
export const getRcvUriRegExp = (regExpText: string) =>
  new RegExp(
    `(https?):\\/\\/${regExpText}(\\/{1,2}\\w+)*(\\/{1,2}(\\d+))(\\?pw=\\w{32})?`,
    'i',
  );

const DEFAULT_CONFIG_URL =
  'https://apps.ringcentral.com/integration/dynamic-config/ConfigData.js';

@Module({
  name: 'DynamicConfig',
  deps: [
    'Auth',
    'Client',
    'DataFetcherV2',
    { dep: 'DynamicConfigOptions', optional: true },
  ],
})
class DynamicConfig extends DataFetcherV2Consumer<Deps, typeof ConfigData> {
  private _rcmUriRegExp = ConfigData.meetingUriReg.rcm;
  private _rcvUriRegExp = ConfigData.meetingUriReg.rcv;

  constructor(deps: Deps) {
    super({
      deps,
    });
    this._source = new DataSource({
      ...deps.dynamicConfigOptions,
      key: 'dynamicConfig',
      readyCheckFunction: () => this._deps.auth.loggedIn,
      fetchFunction: () => fetchWithJsonp(this.configUrl),
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  get configUrl() {
    return this._deps.dynamicConfigOptions?.configUrl ?? DEFAULT_CONFIG_URL;
  }

  get frequentUpdate() {
    return this._deps.dynamicConfigOptions?.frequentUpdate ?? false;
  }

  async onInit() {
    if (this.isDiscoveryApi) {
      await this.updateDiscoveryConfig();
    }
    await this.fetchData();
  }

  get isDiscoveryApi() {
    return !!this._deps.client.service.platform().discovery();
  }

  async updateDiscoveryConfig() {
    if (this.isDiscoveryApi) {
      const data = await this._deps.client.service
        .platform()
        .discovery()
        ?.externalData();
      if (data) {
        // just use static regexp
        // `data.rcm.sdkDomain` example: `ringcentral.zoom.us` -> `ringcentral\.zoom\.us`
        // this._rcmUriRegExp =
        //   data.rcm.sdkDomain?.replace(/\./g, '\\.') ?? this._rcmUriRegExp;

        // `data.rcv.baseWebUri` example: `https://v.ringcentral.com` -> `v\.ringcentral\.com`
        this._rcvUriRegExp =
          data.rcv.baseWebUri
            ?.replace(/^https?:\/\//, '')
            .replace(/\./g, '\\.') ?? this._rcvUriRegExp;
      } else {
        // handle discovery api  error in sdk
      }
    }
  }

  async fetchConfig() {
    if (!this.frequentUpdate) return;
    try {
      if (this.isDiscoveryApi) {
        await this.updateDiscoveryConfig();
      }
      await this.fetchData();
    } catch (e) {
      console.warn(`Failed to update meeting domain`);
    }
  }

  async getMeetingUriRegExp() {
    await this.fetchConfig();
    return {
      rcvUriRegExp: this.rcvUriRegExp,
      rcmUriRegExp: this.rcmUriRegExp,
    };
  }

  @computed(({ _rcmUriRegExp }: DynamicConfig) => [
    _rcmUriRegExp,
    // data?.meetingUriReg.rcm,
  ])
  get rcmUriRegExp() {
    // just use static regexp
    // const regExpText =
    // (this.isDiscoveryApi
    //   ? this._rcmUriRegExp
    //   : this.data?.meetingUriReg.rcm) ?? this._rcmUriRegExp;

    return getRcmUriRegExp(this._rcmUriRegExp);
  }

  @computed(({ _rcvUriRegExp, data }: DynamicConfig) => [
    _rcvUriRegExp,
    data?.meetingUriReg.rcv,
  ])
  get rcvUriRegExp() {
    const regExpText =
      (this.isDiscoveryApi
        ? `(${this._rcvUriRegExp}|${this.data?.meetingUriReg.rcv})`
        : this.data?.meetingUriReg.rcv) ?? this._rcvUriRegExp;
    return getRcvUriRegExp(regExpText);
  }

  get callWithJupiter() {
    return this.data.callWithJupiter;
  }
}

export { DynamicConfig };
