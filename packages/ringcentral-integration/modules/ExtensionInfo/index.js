import mask from 'json-mask';
import subscriptionFilters from '../../enums/subscriptionFilters';
import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import permissionsMessages from '../RolesAndPermissions/permissionsMessages';

const DEFAULT_MASK = [
  'id',
  'extensionNumber',
  'contact(*)',
  'name',
  'type',
  'status',
  'permissions',
  'profileImage',
  'departments',
  `regionalSettings(${[
    'timezone(id,name,bias)',
    'homeCountry(id,isoCode,callingCode)',
    'language(localeCode)',
    'formattingLocale(localeCode)',
    'timeFormat',
  ].join(',')})`,
].join(',');

const DEFAULT_COUNTRY = {
  id: '1',
  isoCode: 'US',
  callingCode: '1',
};

const extensionRegExp = /.*\/extension\/\d+$/;

function extractData(info) {
  const serviceFeatures = {};
  info.serviceFeatures.forEach((f) => {
    serviceFeatures[f.featureName] = {
      enabled: f.enabled,
    };
    if (!f.enabled) {
      serviceFeatures[f.featureName].reason = f.reason;
    }
  });
  const output = mask(info, DEFAULT_MASK);
  output.serviceFeatures = serviceFeatures;
  return output;
}

const DEFAULT_TTL = 30 * 60 * 1000; // half hour update
const DEFAULT_TIME_TO_RETRY = 62 * 1000;

/**
 * @class
 * @description Extension info module
 */
@Module({
  deps: [
    'Client',
    { dep: 'Alert', optional: true },
    { dep: 'ExtensionInfoOptions', optional: true }
  ]
})
export default class ExtensionInfo extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({
    client,
    ttl = DEFAULT_TTL,
    timeToRetry = DEFAULT_TIME_TO_RETRY,
    polling = true,
    alert,
    ...options
  }) {
    super({
      name: 'extensionInfo',
      client,
      ttl,
      polling,
      timeToRetry,
      subscriptionFilters: [subscriptionFilters.extensionInfo],
      subscriptionHandler: async (message) => {
        await this._subscriptionHandleFn(message);
      },
      cleanOnReset: true,
      fetchFunction: async () => extractData(await this._client.account().extension().get()),
      forbiddenHandler: async () => {
        await this._auth.logout();
        if (this._alert) {
          this._alert.danger({
            message: permissionsMessages.insufficientPrivilege,
            ttl: 0,
          });
        }
        return {};
      },
      ...options
    });

    this._alert = alert;

    this.addSelector('info',
      () => this.data,
      data => (data || {}),
    );
    this.addSelector('serviceFeatures',
      this._selectors.info,
      info => (info.serviceFeatures || {}),
    );
  }

  async _subscriptionHandleFn(message) {
    if (
      message &&
      message.body &&
      extensionRegExp.test(message.event)
    ) {
      await this.fetchData();
    }
  }


  get info() {
    return this._selectors.info();
  }

  get id() {
    return this.info.id;
  }

  get extensionNumber() {
    return this.info.extensionNumber;
  }

  get serviceFeatures() {
    return this._selectors.serviceFeatures();
  }

  get country() {
    return (this.info.regionalSettings && this.info.regionalSettings.homeCountry) ||
      DEFAULT_COUNTRY;
  }

  get departments() {
    return this.info.departments;
  }

  get isCallQueueMember() {
    return !!this.departments && Array.isArray(this.departments) && this.departments.length > 0;
  }
}
