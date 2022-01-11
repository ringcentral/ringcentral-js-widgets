import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import { SimpleCallControlPanelProps } from '../../components/SimpleCallControlPanel';
import i18n from '../../components/SimpleCallControlPanel/i18n';
import { pickFallBackInfo } from '../../components/SimpleCallControlPanel/utils';
import {
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
    const { activeCallControl, regionSettings, locale, brand } = this._deps;
    const { activeSession } = activeCallControl;
    let nameMatches: Entity[] = [];
    if (activeSession && !renderContactName) {
      // TODO: check activeSession type
      nameMatches =
        activeSession.direction === callDirections.outbound
          ? activeSession.toMatches
          : activeSession.fromMatches;
    }
    let phoneNumber: string;
    if (activeSession) {
      phoneNumber =
        activeSession.direction === callDirections.outbound
          ? activeSession.to
          : activeSession.from;
    }
    let fallBackName = i18n.getString('Unknown', locale.currentLocale);
    if (renderContactName) {
      const { fallBackName: fallBackNameFromThirdParty, fallBackNumber } =
        pickFallBackInfo(
          activeSession,
          renderContactName({
            sessionId: activeSession && activeSession.sessionId,
            telephonySessionId: sessionId,
          }),
          locale.currentLocale,
        );
      phoneNumber = fallBackNumber;
      fallBackName = fallBackNameFromThirdParty;
    }
    return {
      currentLocale: locale.currentLocale,
      activeSession,
      sessionId,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
      nameMatches,
      phoneNumber,
      fallBackName,
      brandName: brand.name,
      controlBusy: activeCallControl.busy,
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
