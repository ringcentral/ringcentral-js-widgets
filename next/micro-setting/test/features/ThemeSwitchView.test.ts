import {
  Brand,
  Locale,
  Theme,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  createBrowserHistory,
  Initiator,
  IRouterOptions,
  ISharedAppOptions,
  RouterOptions,
  RouterPlugin,
  SharedAppOptions,
  testBed,
} from '@ringcentral-integration/next-core';
import { render } from '@ringcentral-integration/test-utils';

import { ThemeSwitchView } from '../../src/app/views';

describe('ThemeSwitchView Module', () => {
  let updateThemeTypeMock: jest.Mock;
  let routerPushMock: jest.Mock;

  beforeEach(() => {
    updateThemeTypeMock = jest.fn();
    routerPushMock = jest.fn();
  });

  test('should instantiate ThemeSwitchView with defined themeTypeOptions', () => {
    const app = testBed({
      modules: [
        {
          provide: Brand,
          useValue: {
            suiThemeMap: { light: 'lightScheme', dark: 'darkScheme' },
          },
        },
        {
          provide: Theme,
          useValue: {
            supportedThemeTypes: ['light', 'dark'],
            selectedThemeType: 'light',
            themeId: 'light',
            updateThemeType: updateThemeTypeMock,
          },
        },
        Initiator,
        RouterPlugin,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
        {
          provide: SharedAppOptions,
          useValue: {
            name: 'internal-test',
            type: 'Base',
          } as ISharedAppOptions,
        },
      ],
      main: ThemeSwitchView,
      devOptions: { autoComputed: true },
    });
    expect(app.instance.themeTypeOptions).toBeTruthy();
  });

  test('themeTypeOptions should return correct options', () => {
    const app = testBed({
      modules: [
        {
          provide: Brand,
          useValue: { suiThemeMap: {} },
        },
        {
          provide: Theme,
          useValue: {
            supportedThemeTypes: ['light', 'dark'],
            selectedThemeType: 'light',
            themeId: 'light',
            updateThemeType: updateThemeTypeMock,
          },
        },
        Initiator,
        RouterPlugin,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
        {
          provide: SharedAppOptions,
          useValue: {
            name: 'internal-test',
            type: 'Base',
          } as ISharedAppOptions,
        },
      ],
      main: ThemeSwitchView,
      devOptions: { autoComputed: true },
    });
    // Assuming the t function returns the same key
    expect(app.instance.themeTypeOptions).toEqual([
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ]);
  });

  test('getUIProps returns correct UI properties', () => {
    const brandMap = { light: 'lightScheme', dark: 'darkScheme' };
    const app = testBed({
      modules: [
        {
          provide: Brand,
          useValue: { suiThemeMap: brandMap },
        },
        {
          provide: Theme,
          useValue: {
            supportedThemeTypes: ['light', 'dark'],
            selectedThemeType: 'dark',
            themeId: 'dark',
            updateThemeType: updateThemeTypeMock,
          },
        },
        Initiator,
        RouterPlugin,
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
        {
          provide: SharedAppOptions,
          useValue: {
            name: 'internal-test',
            type: 'Base',
          } as ISharedAppOptions,
        },
      ],
      main: ThemeSwitchView,
      devOptions: { autoComputed: true },
    });
    const uiProps = app.instance.getUIProps();
    expect(uiProps.themeType).toEqual('dark');
    expect(uiProps.themeId).toEqual('dark');
    expect(uiProps.themeMap).toEqual(brandMap);
    expect(uiProps.themeTypeOptions).toEqual([
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ]);
  });

  test('getUIFunctions onThemeTypeChange should call updateThemeType', () => {
    const app = testBed({
      modules: [
        {
          provide: Brand,
          useValue: { suiThemeMap: {} },
        },
        {
          provide: Theme,
          useValue: {
            supportedThemeTypes: ['light', 'dark'],
            selectedThemeType: 'light',
            themeId: 'light',
            updateThemeType: updateThemeTypeMock,
          },
        },
        Initiator,
        {
          provide: RouterPlugin,
          useValue: { push: routerPushMock },
        },
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
        {
          provide: SharedAppOptions,
          useValue: {
            name: 'internal-test',
            type: 'Base',
          } as ISharedAppOptions,
        },
      ],
      main: ThemeSwitchView,
      devOptions: { autoComputed: true },
    });
    const uiFunctions = app.instance.getUIFunctions();
    uiFunctions.onThemeTypeChange('dark');
    expect(updateThemeTypeMock).toHaveBeenCalledWith('dark');
  });

  test('getUIFunctions onBack should call router.push("/settings")', async () => {
    const app = testBed({
      modules: [
        {
          provide: Brand,
          useValue: { suiThemeMap: {} },
        },
        {
          provide: Theme,
          useValue: {
            supportedThemeTypes: [],
            selectedThemeType: 'light',
            themeId: 'light',
            updateThemeType: updateThemeTypeMock,
          },
        },
        Initiator,
        {
          provide: RouterPlugin,
          useValue: { push: routerPushMock },
        },
        {
          provide: RouterOptions,
          useValue: {
            createHistory: () => createBrowserHistory(),
          } as IRouterOptions,
        },
        {
          provide: SharedAppOptions,
          useValue: {
            name: 'internal-test',
            type: 'Base',
          } as ISharedAppOptions,
        },
        Locale,
      ],
      main: ThemeSwitchView,
      devOptions: { autoComputed: true },
    });
    const uiFunctions = app.instance.getUIFunctions();
    await uiFunctions.onBack();
    expect(routerPushMock).toHaveBeenCalledWith('/settings');
  });
});
