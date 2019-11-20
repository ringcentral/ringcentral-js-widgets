import { Module } from 'ringcentral-integration/lib/di';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'CallBadgeUI',
  deps: ['Locale', 'Webphone'],
})
export default class CallBadgeUI extends RcUIModule {
  getUIProps({
    hidden,
    goToCallCtrl,
    defaultOffsetX = 0,
    defaultOffsetY = 0,
    phone: { locale, webphone },
  }) {
    const currentSession = webphone.activeSession || webphone.ringSession || {};

    return {
      hidden,
      goToCallCtrl,
      defaultOffsetX,
      defaultOffsetY,
      session: currentSession,
      currentLocale: locale.currentLocale,
    };
  }

  getUIFunctions({ phone: { webphone } }) {
    return {
      toggleMinimized: (id) => webphone.toggleMinimized(id),
    };
  }
}
