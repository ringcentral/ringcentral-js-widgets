import { map, reduce } from 'ramda';

import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import countryNames from '../../lib/countryNames';
import {
  ConferenceContainerProps,
  ConferencePanelProps,
  Deps,
} from './ConferenceUI.interface';

@Module({
  name: 'ConferenceUI',
  deps: [
    'Conference',
    'RegionSettings',
    'Locale',
    'ComposeText',
    'AppFeatures',
    'Brand',
    'Alert',
    'RouterInteraction',
    'Call',
  ],
})
export class ConferenceUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  // TODO: add type
  getDialInNumbers(phoneNumbers: any[]) {
    const countryCounter = reduce(
      (acc, item) => {
        if (!acc[item.country.isoCode]) {
          acc[item.country.isoCode] = 1;
        } else {
          acc[item.country.isoCode] += 1;
        }
        return acc;
      },
      {} as Record<string, number>,
      phoneNumbers,
    );
    return map((item) => {
      const countryName = countryNames.getString(
        item.country.isoCode,
        this._deps.locale.currentLocale,
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

  getUIProps(): UIProps<ConferencePanelProps> {
    const {
      hostCode = '',
      participantCode = '',
      allowJoinBeforeHost = false,
      phoneNumbers = [],
    } = this._deps.conference.data || {};
    return {
      dialInNumbers: this.getDialInNumbers(phoneNumbers),
      dialInNumber: this._deps.conference.dialInNumber || '',
      hostCode,
      participantCode,
      allowJoinBeforeHost,
      additionalNumbers: this._deps.conference.additionalNumbers,
      disableTxtBtn: !this._deps.appFeatures.hasComposeTextPermission,
      countryCode: this._deps.regionSettings.countryCode,
      areaCode: this._deps.regionSettings.areaCode,
      currentLocale: this._deps.locale.currentLocale,
      brandName: this._deps.brand.name,
      dialInNumbersLink:
        this._deps.brand.brandConfig.conference.dialInNumbersLink,
      conferenceInviteText: this._deps.brand.brandConfig.conference.inviteText,
      showSpinner: !(
        this._deps.conference.ready &&
        this._deps.regionSettings.ready &&
        this._deps.locale.ready &&
        this._deps.composeText.ready
      ),
      showSaveAsDefault: this._deps.conference.showSaveAsDefault,
    };
  }

  getUIFunctions({
    enableAutoEnterHostKey = false,
  }: ConferenceContainerProps): UIFunctions<ConferencePanelProps> {
    return {
      alert: (msg) => {
        this._deps.alert.warning({ message: msg });
      },
      updateDialInNumber: (dialInNumber) => {
        this._deps.conference.updateDialInNumber(dialInNumber);
      },
      updateAdditionalNumbers: (additionalDialInNumbers) => {
        this._deps.conference.updateAdditionalNumbers(additionalDialInNumbers);
      },
      inviteWithText: (text) => {
        this._deps.composeText.updateMessageText(text);
        // for track
        this._deps.conference.onInviteWithText();
        this._deps.routerInteraction.push('/composeText');
        // update settings
      },
      joinAsHost: (dialInNumber) => {
        // for track
        this._deps.conference.onJoinAsHost();
        this._deps.routerInteraction.history.push('/dialer');
        const theDialInNumber =
          dialInNumber || this._deps.conference.dialInNumber;
        const phoneNumber = enableAutoEnterHostKey
          ? `${theDialInNumber},,${this._deps.conference.data.hostCode}#`
          : theDialInNumber;
        // TODO: check interface error
        this._deps.call.call({ phoneNumber });
      },
      onAllowJoinBeforeHostChange: (allowJoinBeforeHost) => {
        this._deps.conference.updateEnableJoinBeforeHost(allowJoinBeforeHost);
      },
      showHelpCommands: () => {
        this._deps.routerInteraction.push('/conference/commands');
      },
    };
  }
}
