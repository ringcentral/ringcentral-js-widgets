import { Module } from '@ringcentral-integration/commons/lib/di';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { RcUIModuleV2 } from '@ringcentral-integration/core';

import type { Deps, UserGuidePanelProps } from './UserGuideUI.interface';

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
    const { curIdx, entered, playing } = this._deps.userGuide.carouselState;
    return {
      showSpinner: !(
        this._deps.userGuide.ready &&
        this._deps.userGuide.preLoadImageStatus &&
        this._deps.locale.ready
      ),
      currentLocale: this._deps.locale.currentLocale,
      curIdx,
      entered,
      playing,
      firstLogin: this._deps.userGuide.firstLogin,
      guides: this._deps.userGuide.guides,
    };
  }

  getUIFunctions(): UIFunctions<UserGuidePanelProps> {
    const quickAccessEnter = this._deps.quickAccess
      ? // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        () => this._deps.quickAccess.enter()
      : undefined;
    return {
      updateCarousel: (...args) => this._deps.userGuide.updateCarousel(...args),
      quickAccessEnter,
    };
  }
}
