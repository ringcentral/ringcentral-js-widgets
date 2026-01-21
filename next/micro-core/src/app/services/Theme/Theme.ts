import {
  action,
  computed,
  PortManager,
  delegate,
  globalStorage,
  injectable,
  optional,
  RcModule,
  state,
  StoragePlugin,
  watch,
  fromWatchValue,
  takeUntilAppDestroy,
  logger,
} from '@ringcentral-integration/next-core';
import { createTheme, type RcTheme } from '@ringcentral/juno';
import type { MotionConfigContext } from 'framer-motion';
import {
  EMPTY,
  fromEvent,
  merge,
  startWith,
  switchMap,
  tap,
  timer,
  map,
} from 'rxjs';

import { Brand, BrandThemeMap } from '../Brand';
import type { CssModuleVariable } from '../Brand/BrandConfig.interface';

import type { ThemeOptions, ThemeType } from './Theme.interface';
import { defaultCssVariable } from './defaultCssVariable';

export const THEME_TYPE_STORAGE_KEY = '__rc_theme_type';
const THEME_PRIMARY_COLOR_STORAGE_KEY = '__rc_theme_primary_color';

const DEFAULT_THEME_TYPES: ThemeType[] =
  process.env.NODE_ENV === 'production'
    ? ['light']
    : // currently we only enable followSystem in dev mode, wait PM and design to confirm to enable in production
      ['followSystem', 'light', 'dark', 'contrast'];

@injectable({
  name: 'Theme',
})
export class Theme extends RcModule {
  @globalStorage
  @state
  themeId: string | null = null;

  @action
  setThemeId(val: string | null) {
    this.themeId = val;
  }

  @globalStorage
  @state
  themeType = '';

  @action
  private _setThemeType(type: string) {
    this.themeType = type;
  }

  @delegate('server')
  async setThemeType(type: string) {
    this._setThemeType(type);
  }

  @globalStorage
  @state
  followSystem: boolean = this._themeOptions?.followSystem ?? true;

  @action
  private setFollowSystem(val: boolean) {
    this.followSystem = val;
  }

  @globalStorage
  @state
  prefersReducedMotion: MotionConfigContext['reducedMotion'] =
    process.env.NODE_ENV === 'test'
      ? // in test env, we always enable reduced motion to ignore the animation
        'always'
      : // currently we always disable reduced motion in production as default value
        'never';

  @action
  private setPrefersReducedMotion(val: MotionConfigContext['reducedMotion']) {
    this.prefersReducedMotion = val;
  }

  @delegate('server')
  async updatePrefersReducedMotion(val: MotionConfigContext['reducedMotion']) {
    this.setPrefersReducedMotion(val);
  }

  @computed
  get reducedMotion() {
    if (this.prefersReducedMotion === 'always') {
      return true;
    }

    if (this.prefersReducedMotion === 'never') {
      return false;
    }

    return undefined;
  }

  @delegate('server')
  async updateThemeType(type: string) {
    if (type === 'followSystem') {
      this.setFollowSystem(true);
      return;
    }

    this.setFollowSystem(false);
    this.setThemeType(type);
  }

  /**
   * the type that this app supported theme types, only use in new spring-ui project
   */
  @computed
  get supportedThemeTypes() {
    const shouldSupportedTypes =
      this._themeOptions?.supportedThemeTypes || DEFAULT_THEME_TYPES;

    if (shouldSupportedTypes.length === 0) {
      return [];
    }
    const themeMap = this._brand.suiThemeMap;
    const localThemeData = Object.entries(themeMap);

    // when every themeMap is empty, that means not use suiThemeMap, just use default theme
    if (localThemeData.every(([, map]) => map.length === 0)) {
      return shouldSupportedTypes;
    }

    const supportedTypes = localThemeData.reduce((acc, [key, map]) => {
      if (key === 'default') return acc;

      if (
        map.length > 0 &&
        shouldSupportedTypes.indexOf(key as ThemeType) !== -1
      ) {
        acc.push(key as ThemeType);
      }

      return acc;
    }, [] as ThemeType[]);

    // only when both support light and dark can support followSystem
    if (supportedTypes.includes('light') && supportedTypes.includes('dark')) {
      supportedTypes.push('followSystem');
    }

    return supportedTypes.sort(
      (a, b) =>
        shouldSupportedTypes.indexOf(a) - shouldSupportedTypes.indexOf(b),
    );
  }

  @computed
  get supportListenSystemTheme() {
    return Boolean(this.supportedThemeTypes?.includes('followSystem'));
  }

  get selectedThemeType() {
    return this.followSystem ? 'followSystem' : this.themeType;
  }

  constructor(
    protected _portManager: PortManager,
    protected _brand: Brand,
    protected _storage: StoragePlugin,
    @optional('ThemeOptions') protected _themeOptions?: ThemeOptions,
  ) {
    super();

    const enableCache = this._themeOptions?.enableCache ?? true;
    if (enableCache) {
      this._storage.enable(this);
    }

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      if (this._portManager.shared) {
        this._portManager.onClient(() => {
          this.sendModuleInitEvent();
          this.listenThemeChange();
        });
        this._portManager.onMainTab(() => {
          this.listenSystemTheme();
        });

        this._portManager.onServer(() => {
          this.checkCurrThemeTypeBeSupported();
        });
      } else {
        this.sendModuleInitEvent();
        this.listenThemeChange();
        this.listenSystemTheme();
        this.checkCurrThemeTypeBeSupported();
      }
    } else {
      if (this._themeOptions?.initThemeDetect) {
        this.sendModuleInitEvent();
        this.listenThemeChange();
      }
    }
  }

  syncThemeStateToLocalStorage$ = fromWatchValue(
    this,
    () => this.themeType,
  ).pipe(
    switchMap((themeType) => {
      // wait 500ms for ensure the css already be set
      return timer(500).pipe(
        tap(() => {
          localStorage.setItem(THEME_TYPE_STORAGE_KEY, themeType);

          const value = getComputedStyle(document.body).getPropertyValue(
            '--s-primary-b',
          );
          if (!value) return;

          // get the primary color from css variable, and set it to localStorage
          localStorage.setItem(
            THEME_PRIMARY_COLOR_STORAGE_KEY,
            `rgb(${value})`,
          );
        }),
      );
    }),
  );

  // check current theme type is inside supported theme types
  private checkCurrThemeTypeBeSupported() {
    const currentThemeShouldInSupportThemeList$ = fromWatchValue(
      this,
      () => [this.themeType, this.supportedThemeTypes] as const,
      { multiple: true },
    ).pipe(
      tap(([themeType, supportedThemeTypes]) => {
        if (!supportedThemeTypes.includes(themeType as ThemeType)) {
          const targetType = supportedThemeTypes[0] || 'light';
          this.setThemeType(targetType);
        }
      }),
    );

    this.readyState$
      .pipe(
        switchMap((ready) =>
          ready ? currentThemeShouldInSupportThemeList$ : EMPTY,
        ),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  private listenSystemTheme() {
    const systemThemeChange$ = fromWatchValue(
      this,
      () => this.followSystem,
    ).pipe(
      switchMap((followSystem) => {
        if (!followSystem) return EMPTY;

        const darkTheme = window?.matchMedia?.('(prefers-color-scheme: dark)');

        return darkTheme
          ? fromEvent(darkTheme, 'change').pipe(
              startWith(null),
              map(() => {
                const isDark = darkTheme.matches;

                return isDark;
              }),
            )
          : EMPTY;
      }),
      tap((isDark) => {
        logger.log(
          `[${this.identifier}] system theme is`,
          isDark ? 'dark' : 'light',
        );
        const themeType = isDark ? 'dark' : 'light';
        this.setThemeType(themeType);
      }),
    );

    const systemTheme$ = fromWatchValue(
      this,
      () => this.supportListenSystemTheme,
    ).pipe(
      switchMap((supportListenSystemTheme) =>
        supportListenSystemTheme ? systemThemeChange$ : EMPTY,
      ),
    );

    this.readyState$
      .pipe(
        switchMap((ready) =>
          ready
            ? merge(systemTheme$, this.syncThemeStateToLocalStorage$)
            : EMPTY,
        ),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  private listenThemeChange() {
    watch(
      this,
      () => this.themeType,
      () => {
        document?.dispatchEvent(
          new CustomEvent('theme-change', {
            bubbles: false,
            detail: this.themeType,
          }),
        );
      },
    );
  }

  private sendModuleInitEvent() {
    document?.dispatchEvent(
      new CustomEvent('theme-init', {
        bubbles: false,
        detail: (type: string) => {
          // this be init before module init, set theme directly, that will be use before redux
          this.themeType = type;
        },
      }),
    );
  }

  override onInitOnce() {
    // those old logic only exec in non spring-ui project, new project should base on BSS to get the brand theme
    if (process.env.THEME_SYSTEM !== 'spring-ui') {
      if (!this._themeOptions?.ignoreInitDefaultTheme) {
        const isThemeReady = this.themeType !== '';

        if (!isThemeReady) {
          const defaultThemeType = this._brand.brandConfig.theme?.defaultTheme;

          if (defaultThemeType) {
            this.setThemeType(defaultThemeType);
          }
        }
      }

      if (!this._themeOptions?.ignoreThemeTypeInMapCheck) {
        watch(
          this,
          () => this._brand.brandConfig.theme,
          (newValue) => {
            // when current theme type not in new theme map, switch to default theme
            if (
              newValue?.themeMap &&
              !Object.hasOwnProperty.call(newValue.themeMap, this.themeType)
            ) {
              const newDefaultThemeType = newValue?.defaultTheme;

              if (
                newDefaultThemeType &&
                newDefaultThemeType !== this.themeType
              ) {
                this.setThemeType(newDefaultThemeType);
              }
            }
          },
        );
      }
    }
  }

  @computed((that: Theme) => [
    that.themeType,
    that.themeId,
    that._brand.brandConfig.theme?.themeMap,
    that._brand.defaultConfig.theme?.themeMap,
  ])
  get theme() {
    const themeType = this.themeType as keyof BrandThemeMap;
    // when themeType not be set, use light as default theme to find correct theme
    const targetThemeType = themeType || 'light';

    const curr = (this._brand.brandConfig.theme?.themeMap?.[targetThemeType] ||
      this._brand.defaultConfig.theme?.themeMap?.[targetThemeType] ||
      // when still not found, use default juno theme
      // we must have default theme, that will use in c2d variable
      createTheme()) as RcTheme;

    const processTheme = this._themeOptions?.processTheme;
    return processTheme ? processTheme(targetThemeType, curr) : curr;
  }

  @computed((that: Theme) => [that._brand.brandConfig.theme?.variable])
  get variable() {
    return {
      ...defaultCssVariable,
      ...this._brand.brandConfig.theme?.variable,
    } as CssModuleVariable;
  }
}
