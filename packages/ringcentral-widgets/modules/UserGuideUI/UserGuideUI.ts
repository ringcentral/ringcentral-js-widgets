import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';
import { Deps, UserGuidePanelProps } from './UserGuideUI.interface';

@Module({
  name: 'UserGuideUI',
  deps: [
    'RouterInteraction',
    'Locale',
    'UserGuide',
    { dep: 'QuickAccess', optional: true },
  ],
})
export class UserGuideUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({ deps });
  }

  getUIProps(): UIProps<UserGuidePanelProps> {
    const { locale, userGuide } = this._deps;
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
      firstLogin: userGuide.firstLogin,
      guides: userGuide.guides,
    };
  }

  getUIFunctions(): UIFunctions<UserGuidePanelProps> {
    const { userGuide, quickAccess } = this._deps;
    const quickAccessEnter = quickAccess
      ? () => quickAccess.enter()
      : undefined;
    return {
      updateCarousel: (...args) => userGuide.updateCarousel(...args),
      quickAccessEnter,
    };
  }
}
