import DataFetcher from '../../lib/DataFetcher';
import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import removeUri from '../../lib/removeUri';
import { selector } from '../../lib/selector';

/**
 * @class
 * @description Extension forwarding number list module
 */
@Module({
  deps: [
    'Client',
    'ExtensionFeatures',
    { dep: 'ForwardingNumberOptions', optional: true },
  ],
})
export default class ForwardingNumber extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({ client, extensionFeatures, ...options }) {
    super({
      client,
      fetchFunction: async () => {
        const lists = await fetchList((params) =>
          this._client.account().extension().forwardingNumber().list(params),
        );
        return lists.map((number) => removeUri(number));
      },
      forbiddenHandler: () => [],
      readyCheckFn: () => this._extensionFeatures.ready,
      cleanOnReset: true,
      ...options,
    });
    this._extensionFeatures = extensionFeatures;
  }

  get _name() {
    return 'forwardingNumber';
  }

  @selector
  numbers = [() => this.data, (data) => data || []];

  @selector
  flipNumbers = [
    () => this.numbers,
    (phoneNumbers) =>
      phoneNumbers.filter(
        (p) => p.features.indexOf('CallFlip') !== -1 && p.phoneNumber,
      ),
  ];

  @selector
  forwardingNumbers = [
    () => this.numbers,
    (phoneNumbers) =>
      phoneNumbers.filter(
        (p) => p.features.indexOf('CallForwarding') !== -1 && p.phoneNumber,
      ),
  ];

  get _hasPermission() {
    return !!this._extensionFeatures.features?.ReadExtensionPhoneNumbers
      ?.available;
  }
}
