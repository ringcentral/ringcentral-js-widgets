import mask from 'json-mask';

import { permissionsMessages } from '../../enums/permissionsMessages';
import subscriptionFilters from '../../enums/subscriptionFilters';
import subscriptionHints from '../../enums/subscriptionHints';
import DataFetcher from '../../lib/DataFetcher';
import { Module } from '../../lib/di';
import { selector } from '../../lib/selector';

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
  'site',
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
  return mask(info, DEFAULT_MASK);
}

const DEFAULT_TTL = 30 * 60 * 1000; // half hour update
const DEFAULT_TIME_TO_RETRY = 62 * 1000;

// serviceFeatures is deprecated from platform api

/**
 * @class
 * @description Extension info module
 * @deprecated Please use V2
 */
@Module({
  deps: [
    'Client',
    'ExtensionFeatures',
    { dep: 'Alert', optional: true },
    { dep: 'ExtensionInfoOptions', optional: true },
  ],
})
export default class ExtensionInfo extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {ExtensionInfoOptions} params.isMultipleSiteEnable - extension info options: Is multiple site enabled
   */
  constructor({
    client,
    extensionFeatures,
    ttl = DEFAULT_TTL,
    timeToRetry = DEFAULT_TIME_TO_RETRY,
    polling = true,
    alert,
    extensionInfoOptions,
    ...options
  }) {
    super({
      client,
      ttl,
      polling,
      timeToRetry,
      subscriptionFilters: [subscriptionFilters.extensionInfo],
      subscriptionHandler: async (message) => {
        await this._subscriptionHandleFn(message);
      },
      cleanOnReset: true,
      fetchFunction: async () =>
        extractData(await this._client.account().extension().get()),
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
      ...options,
    });
    this._alert = alert;
    this._extensionFeatures = extensionFeatures;
    this._extensionInfoOptions = extensionInfoOptions;
  }

  get _name() {
    return 'extensionInfo';
  }

  get isMultipleSiteEnabled() {
    return this._extensionInfoOptions?.isMultipleSiteEnabled ?? false;
  }

  async _subscriptionHandleFn(message) {
    if (
      message &&
      message.body &&
      extensionRegExp.test(message.event) &&
      !(
        message.body.hints &&
        (message.body.hints.includes(subscriptionHints.companyNumbers) ||
          message.body.hints.includes(subscriptionHints.limits) ||
          message.body.hints.includes(subscriptionHints.features) ||
          message.body.hints.includes(subscriptionHints.permissions) ||
          message.body.hints.includes(subscriptionHints.videoConfiguration))
      )
    ) {
      await this.fetchData();
    }
  }

  @selector
  info = [() => this.data, (data) => data || {}];

  get id() {
    return this.info.id;
  }

  get extensionNumber() {
    return this.info.extensionNumber;
  }

  get country() {
    return (
      (this.info.regionalSettings && this.info.regionalSettings.homeCountry) ||
      DEFAULT_COUNTRY
    );
  }

  get departments() {
    return this.info.departments;
  }

  @selector
  site = [
    () => this.info,
    (info) => {
      if (!this.isMultipleSiteEnabled) {
        return null;
      }
      const isEnabled =
        !!this._extensionFeatures.features?.SiteCodes?.available;
      if (!isEnabled) {
        return null;
      }
      if (!info.site) {
        console.warn('site code enabled, but cannot retrieve site info');
      }
      return info.site || null;
    },
  ];

  get isCallQueueMember() {
    return (
      !!this.departments &&
      Array.isArray(this.departments) &&
      this.departments.length > 0
    );
  }
}
