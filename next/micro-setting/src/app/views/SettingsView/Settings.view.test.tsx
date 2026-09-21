import {
  AccountInfo,
  AppFeatures,
  Auth,
  ExtensionFeatures,
  ExtensionInfo,
  Presence,
  RegionSettings,
  UserInfo,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Brand,
  Locale,
  Theme,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  Initiator,
  injectable,
  RcViewModule,
  RouterPlugin,
  SharedAppOptions,
  StoragePlugin,
  testBed,
} from '@ringcentral-integration/next-core';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { CPRClientView } from '../CPRClientView';
import { CallQueueManagementView } from '../CallQueueManagementView';

import { SettingsView } from './Settings.view';
import type { SettingsViewPanelProps } from './Settings.view.interface';

describe('SettingsView', () => {
  const themeSystem = process.env.THEME_SYSTEM;

  afterEach(() => {
    process.env.THEME_SYSTEM = themeSystem;
  });

  it('passes additional settings sections to the spring settings component', async () => {
    process.env.THEME_SYSTEM = 'spring-ui';
    const SettingsPanel = ({
      additional,
      additionalLogItems,
      additionalAnalytics,
    }: SettingsViewPanelProps) => (
      <div>
        <div data-sign="additional">{additional}</div>
        <div data-sign="additional-log-items">{additionalLogItems}</div>
        <div data-sign="additional-analytics">{additionalAnalytics}</div>
      </div>
    );
    const AutoCallLoggingSwitch = () => (
      <div data-sign="auto-call-logging-switch" />
    );

    @injectable({
      name: 'AutoCallLoggingSwitchView',
    })
    class AutoCallLoggingSwitchView extends RcViewModule {
      component() {
        return <AutoCallLoggingSwitch />;
      }
    }

    const app = testBed({
      main: SettingsView,
      modules: [
        Initiator,
        StoragePlugin,
        {
          provide: SharedAppOptions,
          useValue: {
            name: 'settings-view-test',
            type: 'Base',
          },
        },
        {
          provide: UserInfo,
          useValue: {
            loginNumber: '+16505550100',
          },
        },
        {
          provide: Auth,
          useValue: {
            loggedIn: true,
            ready: true,
            logout: jest.fn(),
          },
        },
        {
          provide: Theme,
          useValue: {
            reducedMotion: false,
            supportedThemeTypes: ['light'],
          },
        },
        {
          provide: Brand,
          useValue: {
            name: 'RingCentral',
            brandConfig: {
              eulaLabel: 'Terms of Service',
              eulaLink: 'https://example.com/eula',
            },
          },
        },
        {
          provide: Locale,
          useValue: {
            ready: true,
            currentLocale: 'en-US',
          },
        },
        {
          provide: AccountInfo,
          useValue: {
            ready: true,
          },
        },
        {
          provide: ExtensionInfo,
          useValue: {
            ready: true,
            isCallQueueMember: false,
          },
        },
        {
          provide: RegionSettings,
          useValue: {
            ready: true,
            countryCode: 'US',
            areaCode: '650',
            showRegionSettings: true,
          },
        },
        {
          provide: ExtensionFeatures,
          useValue: {},
        },
        {
          provide: AppFeatures,
          useValue: {
            ready: true,
            isCallingEnabled: true,
            hasComposeTextPermission: true,
            hasEditPresenceStatus: true,
            enableAcceptQueueCallsControl: false,
          },
        },
        {
          provide: RouterPlugin,
          useValue: {
            currentPath: '/settings',
            push: jest.fn(),
          },
        },
        {
          provide: Presence,
          useValue: {
            ready: true,
            dndStatus: 'TakeAllCalls',
            userStatus: 'Available',
            presenceStatus: 'Available',
            setAvailable: jest.fn(),
            setBusy: jest.fn(),
            setDoNotDisturb: jest.fn(),
            setInvisible: jest.fn(),
            toggleAcceptCallQueueCalls: jest.fn(),
          },
        },
        {
          provide: CPRClientView,
          useValue: {},
        },
        {
          provide: CallQueueManagementView,
          useValue: {
            enableCallQueueManagement: false,
          },
        },
        AutoCallLoggingSwitchView,
        {
          provide: 'SettingsViewOptions',
          useValue: {
            component: SettingsPanel,
            additional: <span>Additional settings</span>,
            additionalLogItems: <span>Additional log item</span>,
            additionalAnalytics: <span>Additional analytics</span>,
          },
        },
      ],
      render,
      devOptions: { autoComputed: true },
    });

    app.bootstrap();
    await waitForRenderReady();

    expect(screen.getByTestId('additional')).toHaveTextContent(
      'Additional settings',
    );
    expect(screen.getByTestId('additional-log-items')).toHaveTextContent(
      'Additional log item',
    );
    expect(screen.getByTestId('additional-log-items')).toContainElement(
      screen.getByTestId('auto-call-logging-switch'),
    );
    expect(screen.getByTestId('additional-analytics')).toHaveTextContent(
      'Additional analytics',
    );

    app.destroy();
  });
});
