import {
  Brand,
  Theme,
} from '@ringcentral-integration/micro-core/src/app/services';
import { slideOutViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  computed,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { useRef } from 'react';

import type {
  ThemeSwitchViewOptions,
  ThemeSwitchViewPanelProps,
  ThemeSwitchViewProps,
  ThemeTypeOption,
} from './ThemeSwitch.view.interface';
import { ThemeSwitchPanel } from './ThemeSwitchPanel';
import { t } from './i18n';

@injectable({
  name: 'ThemeSwitchView',
})
export class ThemeSwitchView extends RcViewModule {
  @computed
  get themeTypeOptions(): ThemeTypeOption[] {
    const supportedTypes = this._theme.supportedThemeTypes;
    if (!supportedTypes) return [];

    return supportedTypes.map((type) => ({
      label: t(type),
      value: type,
    }));
  }

  @computed
  get reducedMotionOptions() {
    return [
      { label: t('reduceMotionDisable'), value: 'never' },
      { label: t('reduceMotionEnable'), value: 'always' },
      { label: t('reduceMotionUser'), value: 'user' },
    ];
  }

  constructor(
    private _brand: Brand,
    private _theme: Theme,
    private _router: RouterPlugin,
    @optional('ThemeSwitchViewOptions')
    private _themeSwitchViewOptions?: ThemeSwitchViewOptions,
  ) {
    super();
  }
  getUIProps(): UIProps<ThemeSwitchViewPanelProps> {
    return {
      themeType: this._theme.selectedThemeType,
      themeId: this._theme.themeId || 'default',
      themeMap: this._brand.suiThemeMap,
      themeTypeOptions: this.themeTypeOptions,
      prefersReducedMotion: this._theme.prefersReducedMotion || 'user',
      reducedMotionOptions: this.reducedMotionOptions,
    };
  }

  getUIFunctions(): UIFunctions<ThemeSwitchViewPanelProps> {
    return {
      onBack: () => {
        slideOutViewTransition(
          () => this._router.push('/settings'),
          this._theme.reducedMotion,
        );
      },
      onThemeTypeChange: (type) => {
        this.logger.log('update theme type', type);
        this._theme.updateThemeType(type);
      },
      onThemeIdChange: (themeId) => {
        console.log('🐞 ~ themeId:', themeId);
      },
      onPrefersReducedMotionChange: (val) => {
        this.logger.log('update prefers reduced motion', val);
        this._theme.updatePrefersReducedMotion(val);
      },
    };
  }

  component(props: ThemeSwitchViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions());

    const _props = useConnector(() => {
      const uiProps = this.getUIProps();

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component =
      this._themeSwitchViewOptions?.component || ThemeSwitchPanel;
    return <Component {..._props} {...uiFunctions} />;
  }
}
