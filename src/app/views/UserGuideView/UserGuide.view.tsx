import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import UserGuidePanel from '@ringcentral-integration/widgets/components/UserGuide';
import React, { useRef } from 'react';

import { QuickAccess, UserGuide } from '../../services';

import type {
  UserGuidePanelProps,
  UserGuideViewOptions,
  UserGuideViewProps,
} from './UserGuide.view.interface';

@injectable({
  name: 'UserGuideView',
})
export class UserGuideView extends RcViewModule {
  constructor(
    protected _router: RouterPlugin,
    protected _locale: Locale,
    protected _userGuide: UserGuide,
    @optional() protected _quickAccess?: QuickAccess,
    @optional('UserGuideViewOptions')
    protected _userGuideViewOptions?: UserGuideViewOptions,
  ) {
    super();
  }

  getUIProps(props: UserGuideViewProps): UIProps<UserGuidePanelProps> {
    const { curIdx, entered, playing } = this._userGuide.carouselState;
    return {
      showSpinner: !(
        this._userGuide.ready &&
        this._userGuide.preLoadImageStatus &&
        this._locale.ready
      ),
      currentLocale: this._locale.currentLocale,
      curIdx,
      entered,
      playing,
      firstLogin: this._userGuide.firstLogin,
      guides: this._userGuide.guides,
    };
  }

  getUIFunctions(props: UserGuideViewProps): UIFunctions<UserGuidePanelProps> {
    const quickAccessEnter = this._quickAccess
      ? () => this._quickAccess?.enter()
      : undefined;

    return {
      updateCarousel: (...args) => this._userGuide.updateCarousel(...args),
      quickAccessEnter,
    };
  }

  component(props: UserGuideViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component = this._userGuideViewOptions?.component || UserGuidePanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
