import { find } from 'ramda';

import subscriptionFilters from '../../enums/subscriptionFilters';
import subscriptionHints from '../../enums/subscriptionHints';
import DataFetcher from '../../lib/DataFetcher';
import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import removeUri from '../../lib/removeUri';
import { selector } from '../../lib/selector';

/**
 * @class
 * @description Extension phone number list module
 */
@Module({
  deps: [
    'Client',
    'ExtensionFeatures',
    { dep: 'ExtensionPhoneNumberOptions', optional: true },
  ],
})
export default class ExtensionPhoneNumber extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({ client, extensionFeatures, ...options }) {
    super({
      client,
      subscriptionFilters: [subscriptionFilters.extensionInfo],
      subscriptionHandler: async (message) => {
        await this._subscriptionHandleFn(message);
      },
      fetchFunction: async () =>
        (
          await fetchList((params) =>
            client.account().extension().phoneNumber().list(params),
          )
        ).map((number) => ({
          ...number,
          country: removeUri(number.country),
        })),
      readyCheckFn: () => this._extensionFeatures.ready,
      cleanOnReset: true,
      ...options,
    });

    this._extensionFeatures = extensionFeatures;
  }

  get _name() {
    return 'extensionPhoneNumber';
  }

  async _subscriptionHandleFn(message) {
    if (
      message &&
      message.body &&
      message.body.hints &&
      message.body.hints.includes(subscriptionHints.companyNumbers)
    ) {
      await this.fetchData();
    }
  }

  @selector
  numbers = [() => this.data, (data) => data || []];

  @selector
  companyNumbers = [
    () => this.numbers,
    (phoneNumbers) =>
      phoneNumbers.filter((p) => p.usageType === 'CompanyNumber'),
  ];

  @selector
  mainCompanyNumber = [
    () => this.numbers,
    (phoneNumbers) =>
      find((p) => p.usageType === 'MainCompanyNumber', phoneNumbers),
  ];

  @selector
  directNumbers = [
    () => this.numbers,
    (phoneNumbers) =>
      phoneNumbers.filter((p) => p.usageType === 'DirectNumber'),
  ];

  @selector
  callerIdNumbers = [
    () => this.numbers,
    (phoneNumbers) =>
      phoneNumbers.filter(
        (p) =>
          (p.features && p.features.indexOf('CallerId') !== -1) ||
          (p.usageType === 'ForwardedNumber' &&
            // TODO: we should remove these special case after confirming that backend should list
            // these numbers with CallerId feature
            (p.status === 'PortedIn' || p.status === 'Normal')) ||
          (p.usageType === 'ForwardedCompanyNumber' &&
            (p.status === 'PortedIn' || p.status === 'Normal')),
      ),
  ];

  @selector
  smsSenderNumbers = [
    () => this.numbers,
    (phoneNumbers) =>
      phoneNumbers.filter(
        (p) => p.features && p.features.indexOf('SmsSender') !== -1,
      ),
  ];

  get _hasPermission() {
    return !!this._extensionFeatures.features?.ReadExtensionPhoneNumbers
      ?.available;
  }
}
