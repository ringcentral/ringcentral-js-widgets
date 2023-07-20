import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { Module } from '@ringcentral-integration/commons/lib/di';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { RcUIModuleV2 } from '@ringcentral-integration/core';

import type { SimpleCallControlPanelProps } from '../../components/SimpleCallControlPanel';
import i18n from '../../components/SimpleCallControlPanel/i18n';
import { pickFallBackInfo } from '../../components/SimpleCallControlPanel/utils';
import type {
  Deps,
  SimpleCallControlContainerProps,
} from './SimpleCallControlUI.interface';

@Module({
  name: 'SimpleCallControlUI',
  deps: [
    'Locale',
    'RouterInteraction',
    'Brand',
    'RegionSettings',
    'ActiveCallControl',
    'AccountInfo',
    { dep: 'SimpleCallControlUIOptions', optional: true },
  ],
})
export class SimpleCallControlUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  getUIProps({
    params: { sessionId },
    renderContactName,
  }: SimpleCallControlContainerProps): UIProps<SimpleCallControlPanelProps> {
    const { activeSession } = this._deps.activeCallControl;
    let nameMatches: Entity[] = [];
    if (activeSession && !renderContactName) {
      // TODO: check activeSession type
      nameMatches =
        activeSession.direction === callDirections.outbound
          ? // @ts-expect-error TS(2339): Property 'toMatches' does not exist on type 'Parti... Remove this comment to see the full error message
            activeSession.toMatches
          : // @ts-expect-error TS(2339): Property 'fromMatches' does not exist on type 'Par... Remove this comment to see the full error message
            activeSession.fromMatches;
    }
    let phoneNumber: string;
    if (activeSession) {
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      phoneNumber =
        activeSession.direction === callDirections.outbound
          ? activeSession.to
          : activeSession.from;
    }
    let fallBackName = i18n.getString(
      'Unknown',
      this._deps.locale.currentLocale,
    );
    if (renderContactName) {
      const { fallBackName: fallBackNameFromThirdParty, fallBackNumber } =
        pickFallBackInfo(
          activeSession,
          renderContactName({
            // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
            sessionId: activeSession && activeSession.sessionId,
            telephonySessionId: sessionId,
          }),
          this._deps.locale.currentLocale,
        );
      phoneNumber = fallBackNumber;
      fallBackName = fallBackNameFromThirdParty;
    }
    return {
      currentLocale: this._deps.locale.currentLocale,
      activeSession,
      sessionId,
      areaCode: this._deps.regionSettings.areaCode,
      countryCode: this._deps.regionSettings.countryCode,
      nameMatches,
      // @ts-expect-error TS(2454): Variable 'phoneNumber' is used before being assign... Remove this comment to see the full error message
      phoneNumber,
      fallBackName,
      brandName: this._deps.brand.name,
      controlBusy: this._deps.activeCallControl.busy,
      maxExtensionNumberLength: this._deps.accountInfo.maxExtensionNumberLength,
    };
  }

  getUIFunctions({
    params: { sessionId },
  }: SimpleCallControlContainerProps): UIFunctions<SimpleCallControlPanelProps> {
    return {
      onBackButtonClick: () => {
        this._deps.routerInteraction.goBack();
      },
      setActiveSessionId: (sessionId) => {
        this._deps.activeCallControl.setActiveSessionId(sessionId);
      },
      onTransfer: (sessionId) => {
        this._deps.routerInteraction.push(`/transfer/${sessionId}/active`);
      },
      onMute: () => this._deps.activeCallControl.mute(sessionId),
      onUnmute: () => this._deps.activeCallControl.unmute(sessionId),
      onHold: () => this._deps.activeCallControl.hold(sessionId),
      onUnhold: () => this._deps.activeCallControl.unhold(sessionId),
      onHangup: () => this._deps.activeCallControl.hangUp(sessionId),
    };
  }
}
