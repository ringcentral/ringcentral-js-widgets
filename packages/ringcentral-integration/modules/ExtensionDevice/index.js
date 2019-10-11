import { Module } from '../../lib/di';
import { selector } from '../../lib/selector';
import fetchList from '../../lib/fetchList';
import DataFetcher from '../../lib/DataFetcher';
import removeUri from '../../lib/removeUri';

/**
 * @class
 * @description Extension device list module
 */
@Module({
  deps: ['Client', { dep: 'ExtensionDeviceOptions', optional: true }],
})
export default class ExtensionDevice extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({ client, ...options }) {
    super({
      client,
      fetchFunction: async () =>
        (await fetchList((params) =>
          client
            .account()
            .extension()
            .device()
            .list(params),
        )).map((device) => ({
          ...removeUri(device),
          extension: removeUri(device.extension),
        })),
      cleanOnReset: true,
      ...options,
    });
  }

  get _name() {
    return 'extensionDevice';
  }

  @selector
  devices = [() => this.data, (data) => data || {}];

  @selector
  phoneLines = [
    () => this.devices,
    (devices) => {
      let phoneLines = [];
      devices.forEach((device) => {
        if (!device.phoneLines || device.phoneLines.length === 0) {
          return;
        }
        phoneLines = phoneLines.concat(device.phoneLines);
      });
      return phoneLines;
    },
  ];
}
