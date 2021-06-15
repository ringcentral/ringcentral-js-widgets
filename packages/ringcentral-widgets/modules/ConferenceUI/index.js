import { Module } from 'ringcentral-integration/lib/di';
import { reduce, map } from 'ramda';
import RcUIModule from '../../lib/RcUIModule';
import countryNames from '../../lib/countryNames';

@Module({
  name: 'ConferenceUI',
  deps: [
    'Conference',
    'RegionSettings',
    'Locale',
    'ComposeText',
    'ExtensionFeatures',
    'Brand',
    'Alert',
    'RouterInteraction',
    'Call',
  ],
})
export default class ConferenceUI extends RcUIModule {
  constructor({
    conference,
    regionSettings,
    locale,
    composeText,
    extensionFeatures,
    brand,
    alert,
    routerInteraction,
    call,
    ...options
  }) {
    super({
      ...options,
    });
    this._conference = conference;
    this._regionSettings = regionSettings;
    this._locale = locale;
    this._composeText = composeText;
    this._extensionFeatures = extensionFeatures;
    this._brand = brand;
    this._alert = alert;
    this._routerInteraction = routerInteraction;
    this._call = call;
  }

  getDialInNumbers(phoneNumbers) {
    const countryCounter = reduce(
      (acc, item) => {
        if (!acc[item.country.isoCode]) {
          acc[item.country.isoCode] = 1;
        } else {
          acc[item.country.isoCode] += 1;
        }
        return acc;
      },
      {},
      phoneNumbers,
    );
    return map((item) => {
      const countryName = countryNames.getString(
        item.country.isoCode,
        this._locale.currentLocale,
      );
      // only show the provinces of canada
      return {
        region:
          countryCounter[item.country.isoCode] > 1
            ? `${countryName}, ${item.location}`
            : countryName,
        phoneNumber: item.phoneNumber,
      };
    }, phoneNumbers);
  }

  getUIProps() {
    const {
      hostCode = '',
      participantCode = '',
      allowJoinBeforeHost = false,
      phoneNumbers = [],
    } = this._conference.data || {};
    return {
      dialInNumbers: this.getDialInNumbers(phoneNumbers),
      dialInNumber: this._conference.dialInNumber || '',
      hostCode,
      participantCode,
      allowJoinBeforeHost,
      additionalNumbers: this._conference.additionalNumbers,
      disableTxtBtn: !(
        this._extensionFeatures.hasOutboundSMSPermission ||
        this._extensionFeatures.hasInternalSMSPermission
      ),
      countryCode: this._regionSettings.countryCode,
      areaCode: this._regionSettings.areaCode,
      currentLocale: this._locale.currentLocale,
      brand: {
        code: this._brand.code,
        name: this._brand.name,
      },
      showSpinner: !(
        this._conference.ready &&
        this._regionSettings.ready &&
        this._locale.ready &&
        this._composeText.ready
      ),
      showSaveAsDefault: this._conference.showSaveAsDefault,
    };
  }

  getUIFunctions({ enableAutoEnterHostKey = false }) {
    return {
      alert: (msg) => {
        this._alert.warning({ message: msg });
      },
      updateDialInNumber: (dialInNumber) => {
        this._conference.updateDialInNumber(dialInNumber);
      },
      updateAdditionalNumbers: (additionalDialInNumbers) => {
        this._conference.updateAdditionalNumbers(additionalDialInNumbers);
      },
      inviteWithText: (text) => {
        this._composeText.updateMessageText(text);
        // for track
        this._conference.onInviteWithText();
        this._routerInteraction.push('/composeText');
        // update settings
      },
      joinAsHost: (dialInNumber) => {
        // for track
        this._conference.onJoinAsHost();
        this._routerInteraction.history.push('/dialer');
        const theDialInNumber = dialInNumber || this._conference.dialInNumber;
        const phoneNumber = enableAutoEnterHostKey
          ? `${theDialInNumber},,${this._conference.data.hostCode}#`
          : theDialInNumber;
        this._call.call({ phoneNumber });
      },
      onAllowJoinBeforeHostChange: (allowJoinBeforeHost) => {
        this._conference.updateEnableJoinBeforeHost(allowJoinBeforeHost);
      },
      showHelpCommands: () => {
        this._routerInteraction.push('/conference/commands');
      },
    };
  }
}
