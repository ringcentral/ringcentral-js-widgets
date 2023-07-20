import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { RcUIModuleV2 } from '@ringcentral-integration/core';

import type {
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
    'AccountInfo',
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
    const participants = this._deps.conferenceCall.partyProfiles;
    const sessionCount =
      (this._deps.webphone.sessions && this._deps.webphone.sessions.length) ||
      0;
    return {
      currentLocale: this._deps.locale.currentLocale,
      participants,
      sessionCount,
    };
  }

  getUIFunctions(): UIFunctions<ConferenceParticipantPanelProps> {
    return {
      onBackButtonClick: () => {
        this._deps.routerInteraction.goBack();
      },
      removeFunc: async (id) => {
        const confId =
          this._deps.conferenceCall.conferences &&
          Object.keys(this._deps.conferenceCall.conferences)[0];
        try {
          await this._deps.conferenceCall.removeFromConference(confId, id);
          // user action track
          this._deps.conferenceCall.removeParticipantClickRemoveTrack();
          return true;
        } catch (e) {
          return false;
        }
      },
      formatPhone: (phoneNumber) =>
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
        }),
      // user action track functions
      afterOnRemoveBtnClick: () =>
        this._deps.conferenceCall.participantListClickHangupTrack(),
      afterOnCancel: () =>
        this._deps.conferenceCall.removeParticipantClickCancelTrack(),
    };
  }
}

export { ConferenceParticipantUI };
