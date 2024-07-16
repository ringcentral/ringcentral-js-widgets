import { computed, watch } from '@ringcentral-integration/core';
import type { Unsubscribe } from 'redux';

import type { NumberParserAPIResponse } from '../../interfaces/NumberParserResponse.interface';
import { Module } from '../../lib/di';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';

import type { Deps } from './ExtensionNumberAreaCode.interface';

@Module({
  name: 'ExtensionNumberAreaCode',
  deps: [
    'AppFeatures',
    'Client',
    'DataFetcherV2',
    'ExtensionFeatures',
    'ExtensionPhoneNumber',
    { dep: 'TabManager', optional: true },
  ],
})
export class ExtensionNumberAreaCode extends DataFetcherV2Consumer<
  Deps,
  NumberParserAPIResponse
> {
  protected _stopWatching?: Unsubscribe;

  constructor(deps: Deps) {
    super({
      deps,
    });
    this._source = new DataSource({
      key: 'ExtensionNumberAreaCode',
      cleanOnReset: true,
      fetchFunction: async (): Promise<NumberParserAPIResponse> => {
        try {
          const response = await this._deps.client.service
            .platform()
            .post('/restapi/v2/number-parser/parse', {
              originalStrings: this.originalString,
              contextSource: 'Account',
              context: {
                outboundCallPrefix: this._deps.appFeatures.OCPValue,
              },
            });
          return response.json();
        } catch (err) {
          console.error('fetch extensionNumberAreaCode', err);
          return {
            results: [],
          };
        }
      },
      readyCheckFunction: () =>
        !!this._deps.extensionPhoneNumber.ready &&
        !!this._deps.appFeatures.ready,
      permissionCheckFunction: () =>
        this._deps.extensionFeatures.features?.ReadExtensionPhoneNumbers
          ?.available ?? false,
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  protected _handleDataChange() {
    if (
      this.ready &&
      (this._source.disableCache || (this._deps.tabManager?.active ?? true))
    ) {
      this.fetchData();
    }
  }

  override onInit() {
    this._stopWatching = watch(
      this,
      () => this.originalString,
      () => this._handleDataChange(),
    );
  }

  override onReset() {
    this._stopWatching?.();
    this._stopWatching = undefined;
  }

  @computed((that: ExtensionNumberAreaCode) => [
    that._deps.extensionPhoneNumber.primaryNumber,
    that._deps.extensionPhoneNumber.mainCompanyNumber,
  ])
  get originalString() {
    const mainCompanyNumber =
      this._deps.extensionPhoneNumber.mainCompanyNumber?.phoneNumber;
    const primaryNumber =
      this._deps.extensionPhoneNumber.primaryNumber?.phoneNumber ??
      mainCompanyNumber;
    return [primaryNumber, mainCompanyNumber];
  }

  @computed(({ data }: ExtensionNumberAreaCode) => [data])
  get defaultAreaCode() {
    if (!this.data) {
      return;
    }
    const [primaryNumber, mainCompanyNumber] = this.data.results;
    return (
      primaryNumber?.numberDetails?.areaCode ||
      mainCompanyNumber?.numberDetails?.areaCode
    );
  }
}
