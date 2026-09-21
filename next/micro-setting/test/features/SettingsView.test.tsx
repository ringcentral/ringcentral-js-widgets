import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { SettingsView } from '../../src/app/views/SettingsView';
import { SettingsPanel } from '../../src/app/views/SettingsView/SettingsPanel';

const mockTrackEvent = jest.fn();

jest.mock('@ringcentral-integration/micro-auth/src/app/services', () => ({
  ...jest.requireActual('@ringcentral-integration/micro-auth/src/app/services'),
  trackEvent: (...args: unknown[]) => mockTrackEvent(...args),
}));

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: () => ({
    t: (key: string) =>
      ({
        settings: 'Settings',
        phone: 'Phone',
        text: 'Text',
        consentManagement: 'Consent management',
        general: 'General',
        version: 'Version',
        logout: 'Sign out',
      }[key] ?? key),
  }),
}));

jest.mock('@ringcentral-integration/micro-core/src/app/components', () => ({
  AppHeaderNav: ({ title, children }: any) => (
    <div>
      <div>{title}</div>
      {children}
    </div>
  ),
}));

jest.mock('@ringcentral-integration/next-widgets/components', () => ({
  Eula: ({ label }: any) => <span>{label}</span>,
  Line: ({ children }: any) => <div>{children}</div>,
  LinkLine: ({ children, onClick, ...props }: any) => (
    <button type="button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
  RemoveMeetingWarn: () => null,
  SelectLine: ({ children }: any) => <div>{children}</div>,
  SwitchLine: ({ children }: any) => <div>{children}</div>,
}));

const createSettingsView = ({
  hasComposeTextPermission,
  canReadConsent,
}: {
  hasComposeTextPermission: boolean;
  canReadConsent?: boolean;
}) => {
  const router = {
    push: jest.fn(),
  };
  const view = new SettingsView(
    { loginNumber: '' } as any,
    { loggedIn: true, ready: true, logout: jest.fn() } as any,
    { supportedThemeTypes: [], reducedMotion: true } as any,
    {
      name: 'RingCentral',
      brandConfig: { eulaLabel: 'EULA', eulaLink: '#' },
    } as any,
    { ready: true, currentLocale: 'en-US' } as any,
    { ready: true } as any,
    { ready: true, isCallQueueMember: false } as any,
    {
      ready: true,
      showRegionSettings: false,
      countryCode: 'US',
      areaCode: '',
    } as any,
    {} as any,
    {
      ready: true,
      hasComposeTextPermission,
      isCallingEnabled: false,
      hasEditPresenceStatus: false,
      enableAcceptQueueCallsControl: false,
    } as any,
    router as any,
    { ready: true } as any,
    {} as any,
    { enableCallQueueManagement: false } as any,
    '1.0.0',
  );

  if (canReadConsent !== undefined) {
    Object.defineProperty(view, '_smsConsent', {
      configurable: true,
      value: { canReadConsent },
    });
  }

  return { view, router };
};

describe('SettingsView consent management', () => {
  beforeEach(() => {
    mockTrackEvent.mockClear();
  });

  it('requires compose-text and consent-read permissions', () => {
    expect(
      createSettingsView({
        hasComposeTextPermission: true,
        canReadConsent: true,
      }).view.getUIProps({}).showConsentManagement,
    ).toBe(true);
    expect(
      createSettingsView({
        hasComposeTextPermission: false,
        canReadConsent: true,
      }).view.getUIProps({}).showConsentManagement,
    ).toBe(false);
    expect(
      createSettingsView({
        hasComposeTextPermission: true,
        canReadConsent: false,
      }).view.getUIProps({}).showConsentManagement,
    ).toBe(false);
  });

  it('navigates to consent management', () => {
    const { view, router } = createSettingsView({
      hasComposeTextPermission: true,
      canReadConsent: true,
    });

    view.getUIFunctions({}).onConsentManagementClick?.();

    expect(mockTrackEvent).toHaveBeenCalledWith(
      'Int_SMS_consentManagement',
      {},
    );
    expect(router.push).toHaveBeenCalledWith('/settings/consentManagement');
  });
});

describe('SettingsPanel consent management', () => {
  const baseProps = {
    version: '1.0.0',
    loginNumber: 'RingCentral',
    brandConfig: {} as any,
    showRemoveMeetingWarning: false,
    currentLocale: 'en-US',
    eulaLabel: 'EULA',
    eulaLink: '#',
    onLogoutButtonClick: jest.fn(),
  };

  it('renders Text section below Phone and opens consent management', () => {
    const onConsentManagementClick = jest.fn();
    render(
      <SettingsPanel
        {...baseProps}
        showCalling
        showConsentManagement
        onConsentManagementClick={onConsentManagementClick}
      />,
    );

    const phone = screen.getByText('Phone');
    const text = screen.getByText('Text');
    expect(
      phone.compareDocumentPosition(text) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    fireEvent.click(screen.getByText('Consent management'));
    expect(onConsentManagementClick).toHaveBeenCalled();
  });
});
