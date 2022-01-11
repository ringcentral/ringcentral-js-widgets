import { Module } from '@ringcentral-integration/commons/lib/di';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import {
  ConferenceParticipantPanelProps,
  Deps,
} from './ConferenceParticipantUI.interface';

@Module({
  name: 'ConferenceParticipantUI',
  deps: [
    'Locale',
    'ConferenceCall',
    'Webphone',
    'RegionSettings',
    'RouterInteraction',
    { dep: 'ConferenceParticipantUIOptions', optional: true },
  ],
})
class ConferenceParticipantUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  getUIProps(): UIProps<ConferenceParticipantPanelProps> {
    const { locale, conferenceCall, webphone } = this._deps;
    const participants = conferenceCall.partyProfiles;
    const sessionCount = (webphone.sessions && webphone.sessions.length) || 0;
    return {
      currentLocale: locale.currentLocale,
      participants,
      sessionCount,
    };
  }

  getUIFunctions(): UIFunctions<ConferenceParticipantPanelProps> {
    const { conferenceCall, routerInteraction, regionSettings } = this._deps;
    return {
      onBackButtonClick: () => {
        routerInteraction.goBack();
      },
      removeFunc: async (id) => {
        const confId =
          conferenceCall.conferences &&
          Object.keys(conferenceCall.conferences)[0];
        try {
          await conferenceCall.removeFromConference(confId, id);
          // user action track
          conferenceCall.removeParticipantClickRemoveTrack();
          return true;
        } catch (e) {
          return false;
        }
      },
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: regionSettings.areaCode,
          countryCode: regionSettings.countryCode,
        }),
      // user action track functions
      afterOnRemoveBtnClick: () =>
        conferenceCall.participantListClickHangupTrack(),
      afterOnCancel: () => conferenceCall.removeParticipantClickCancelTrack(),
    };
  }
}

export { ConferenceParticipantUI };
