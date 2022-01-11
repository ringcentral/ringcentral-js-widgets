import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  computed,
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import {
  Deps,
  FlipUIContainerProps,
  FlipUIPanelProps,
} from './FlipUI.interface';

@Module({
  name: 'FlipUI',
  deps: [
    'Locale',
    'Webphone',
    'ForwardingNumber',
    'RegionSettings',
    'RouterInteraction',
    { dep: 'FlipUIOptions', optional: true },
  ],
})
export class FlipUI extends RcUIModuleV2<Deps> {
  private sessionId: string | null = null;

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @computed((that: FlipUI) => [that.sessionId, that._deps.webphone.sessions])
  get session() {
    return (
      this.sessionId &&
      this._deps.webphone.sessions.find((s) => s.id === this.sessionId)
    );
  }

  getUIProps({
    params: { sessionId },
  }: FlipUIContainerProps): UIProps<FlipUIPanelProps> {
    this.sessionId = sessionId;

    return {
      sessionId,
      isOnFlip: this.session?.isOnFlip,
      currentLocale: this._deps.locale.currentLocale,
      flipNumbers: this._deps.forwardingNumber.flipNumbers,
      session: this.session,
    };
  }

  getUIFunctions(): UIFunctions<FlipUIPanelProps> {
    return {
      onFlip: (...args) => this._deps.webphone.flip(...args),
      onComplete: (...args) => this._deps.webphone.hangup(...args),
      onBack: () => this._deps.routerInteraction.goBack(),
      onCallEnd: () => this._deps.routerInteraction.replace('/dialer'),
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
        }),
    };
  }
}
