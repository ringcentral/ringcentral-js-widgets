import { getExtensionPhoneNumberLabel } from '@ringcentral-integration/commons/lib/contactHelper';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { computed, RcUIModuleV2 } from '@ringcentral-integration/core';

import type {
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
    'ExtensionPhoneNumber',
    'RegionSettings',
    'RouterInteraction',
    'AccountInfo',
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
    showCustomPhoneLabel = false,
  }: FlipUIContainerProps): UIProps<FlipUIPanelProps> {
    this.sessionId = sessionId;

    return {
      sessionId,
      // @ts-expect-error TS(2339): Property 'isOnFlip' does not exist on type '"" | N... Remove this comment to see the full error message
      isOnFlip: this.session?.isOnFlip,
      currentLocale: this._deps.locale.currentLocale,
      flipNumbers: this._deps.forwardingNumber.flipNumbers.map((flipNumber) => {
        // get phone label from extensionPhoneNumber
        let customLabel;
        if (showCustomPhoneLabel) {
          customLabel = getExtensionPhoneNumberLabel(
            flipNumber.phoneNumber!,
            this._deps.extensionPhoneNumber.numbers,
          );
        }
        return {
          ...flipNumber,
          label: customLabel || flipNumber.label,
        };
      }),
      // @ts-expect-error TS(2322): Type '"" | NormalizedSession | null | undefined' i... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
        }),
    };
  }
}
