import { Module } from 'ringcentral-integration/lib/di';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'UserGuideUI',
  deps: ['RouterInteraction', 'Locale', 'UserGuide', 'QuickAccess'],
})
class UserGuideUI extends RcUIModule {
  getUIProps({ phone: { locale, userGuide } }) {
    const { curIdx, entered, playing } = userGuide.carouselState;
    return {
      showSpinner: !(
        userGuide.ready &&
        userGuide.preLoadImageStatus &&
        locale.ready
      ),
      currentLocale: locale.currentLocale,
      curIdx,
      entered,
      playing,
      firstLogin: userGuide.state.firstLogin,
      guides: userGuide.guides,
    };
  }

  getUIFunctions({ phone: { userGuide, quickAccess } }) {
    return {
      updateCarousel: (...args) => userGuide.updateCarousel(...args),
      quickAccessEnter: () => quickAccess && quickAccess.enter(),
    };
  }
}

export default UserGuideUI;
