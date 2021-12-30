import Module from '@ringcentral-integration/commons/lib/di/decorators/module';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';

import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'FlipUI',
  deps: [
    'Locale',
    'Webphone',
    'ForwardingNumber',
    'RegionSettings',
    'RouterInteraction',
  ],
})
export default class FlipUI extends RcUIModule {
  constructor({
    locale,
    webphone,
    forwardingNumber,
    regionSettings,
    routerInteraction,
    ...options
  }) {
    super({
      ...options,
    });
    this._webphone = webphone;
    this._locale = locale;
    this._forwardingNumber = forwardingNumber;
    this._regionSettings = regionSettings;
    this._routerInteraction = routerInteraction;
  }

  getUIProps({ params: { sessionId } }) {
    const session = this._webphone.sessions.find((s) => s.id === sessionId);

    return {
      sessionId,
      isOnFlip: session && session.isOnFlip,
      currentLocale: this._locale.currentLocale,
      flipNumbers: this._forwardingNumber.flipNumbers,
      session,
    };
  }

  getUIFunctions() {
    return {
      onFlip: (flipNumber, sessionId) => {
        return this._webphone.flip(flipNumber, sessionId);
      },
      onComplete: (sessionId) => {
        this._webphone.hangup(sessionId);
      },
      onBack: () => {
        this._routerInteraction.goBack();
      },
      onCallEnd: () => {
        this._routerInteraction.replace('/dialer');
      },
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
        }),
    };
  }
}
