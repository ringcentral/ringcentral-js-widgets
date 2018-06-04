import 'core-js/fn/array/find';
import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import DataFetcher from '../../lib/DataFetcher';
import removeUri from '../../lib/removeUri';

/**
 * @class
 * @description Extension device list module
 */
@Module({
  deps: ['Client', { dep: 'ExtensionDeviceOptions', optional: true }]
})
export default class ExtensionDevice extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({
    client,
    ...options
  }) {
    super({
      name: 'extensionDevice',
      client,
      fetchFunction: async () => (await fetchList(params => (
        client.account().extension().device().list(params)
      ))).map(device => ({
        ...removeUri(device),
        extension: removeUri(device.extension),
      })),
      cleanOnReset: true,
      ...options,
    });

    this.addSelector(
      'devices',
      () => this.data,
      data => data || [],
    );

    this.addSelector(
      'phoneLines',
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
    );
  }

  get devices() {
    return this._selectors.devices();
  }

  get phoneLines() {
    return this._selectors.phoneLines();
  }
}
