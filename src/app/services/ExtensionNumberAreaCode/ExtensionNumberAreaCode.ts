import type { NumberParserAPIResponse } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import {
  computed,
  injectable,
  optional,
  watch,
} from '@ringcentral-integration/next-core';
import type { Unsubscribe } from 'redux';

import { AppFeatures } from '../AppFeatures';
import { Client } from '../Client';
import { DataFetcher, DataFetcherConsumer, DataSource } from '../DataFetcher';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { ExtensionPhoneNumber } from '../ExtensionPhoneNumber';

@injectable({
  name: 'ExtensionNumberAreaCode',
})
export class ExtensionNumberAreaCode extends DataFetcherConsumer<NumberParserAPIResponse> {
  protected _stopWatching?: Unsubscribe;

  constructor(
    protected _appFeatures: AppFeatures,
    protected _client: Client,
    protected override _dataFetcher: DataFetcher,
    protected _extensionFeatures: ExtensionFeatures,
    protected _extensionPhoneNumber: ExtensionPhoneNumber,
    @optional('TabManager') protected _tabManager?: any,
  ) {
    super(_dataFetcher);
    this._source = new DataSource({
      key: 'ExtensionNumberAreaCode',
      cleanOnReset: true,
      fetchFunction: async (): Promise<NumberParserAPIResponse> => {
        try {
          const response = await this._client.service
            .platform()
            .post('/restapi/v2/number-parser/parse', {
              originalStrings: this.originalString,
              contextSource: 'Account',
              context: {
                outboundCallPrefix: this._appFeatures.OCPValue,
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
        !!this._extensionPhoneNumber.ready && !!this._appFeatures.ready,
      permissionCheckFunction: () =>
        this._extensionFeatures.features?.ReadExtensionPhoneNumbers
          ?.available ?? false,
    });
    this._dataFetcher.register(this._source);
  }

  protected _handleDataChange() {
    if (
      this.ready &&
      (this._source.disableCache || (this._tabManager?.active ?? true))
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
    that._extensionPhoneNumber.primaryNumber,
    that._extensionPhoneNumber.mainCompanyNumber,
  ])
  get originalString() {
    const mainCompanyNumber =
      this._extensionPhoneNumber.mainCompanyNumber?.phoneNumber;
    const primaryNumber =
      this._extensionPhoneNumber.primaryNumber?.phoneNumber ??
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
      primaryNumber?.numberDetails?.areaCode ??
      mainCompanyNumber?.numberDetails?.areaCode
    );
  }
}
