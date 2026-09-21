import {
  ExtensionInfo,
  NumberFormatter,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  DateTimeFormat,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import { ModalView } from '@ringcentral-integration/micro-core/src/app/views';
import {
  Initiator,
  PortDetector,
  RouterPlugin,
  SharedAppOptions,
  testBed,
} from '@ringcentral-integration/next-core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Subject } from 'rxjs';

import {
  SmsConsent,
  SMSOptStatus,
  SmsCampaignType,
  SmsConsentCoverage,
  SmsCoverageCampaignType,
} from '../../../src/app/services/SmsConsent';
import { SmsConsentDialogView } from '../../../src/app/views/SmsConsentDialogView';

let mockModalPayload: any;
let mockModalAction: any;
const mockTrackEvent = jest.fn();
const mockRouteChange$ = new Subject<void>();

jest.mock('@ringcentral-integration/micro-auth/src/app/services', () => ({
  ...jest.requireActual('@ringcentral-integration/micro-auth/src/app/services'),
  trackEvent: (...args: unknown[]) => mockTrackEvent(...args),
}));

function mockTranslate(key: string, values?: Record<string, string>) {
  const messages: Record<string, string> = {
    addConsent: 'Add consent',
    addConsentTitle: 'Add consent',
    addConsentSubtitle:
      "Track the contact's opt-in or opt-out status for text messaging.",
    closeDialog: 'Close',
    consentDetailsTitle: 'Consent',
    consentTitle: 'Consent',
    consentStatus: 'Consent status',
    externalNumber: 'External Number',
    smsRegisteredNumber: 'SMS Registered Number',
    registrationType: 'Registration type',
    registrationTypeTooltip:
      'Mobile carriers identify 3 different categories of messages: Conversational, informational, promotional. Click here for a detailed description:',
    learnMore: 'Learn more',
    notes: 'Notes',
    notesPlaceholder: 'Enter notes for your consent.',
    save: 'Save',
    dateCreated: 'Date created',
    source: 'Source',
    coverage: 'Coverage',
    noConsentRecord:
      'The contact has not provided consent to receive SMS communications yet.',
    contactGaveConsent:
      'The contact gave consent to receive SMS communications.',
    contactOptedOut: 'The contact opted out of receiving SMS communications.',
    optIn: 'Opt-in',
    optOut: 'Opt-out',
    sourceRecipient: 'Recipient',
    coverageSmsRegistration: 'SMS registration',
    conversational: 'Conversational',
    informational: 'Informational',
    promotional: 'Promotional',
    unknownUser: 'Unknown',
    userAddedConsentNotePrefix: '{userName} added translated consent.',
    filterPhoneNumbers: 'Filter phone numbers',
    close: 'Close',
    enterNumber: 'Enter number',
    emptySearch: 'No search results',
    noRegisteredNumberError:
      'You have no SMS-registered numbers available to add consent.',
  };
  const message = messages[key] ?? key;
  return Object.entries(values ?? {}).reduce(
    (text, [name, value]) => text.replace(`{${name}}`, value),
    message,
  );
}

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: () => ({
    t: mockTranslate,
  }),
}));

jest.mock('../../../src/app/views/SmsConsentDialogView/i18n', () => ({
  t: mockTranslate,
}));

jest.mock('@ringcentral-integration/micro-core/src/app/views', () => {
  const actual = jest.requireActual(
    '@ringcentral-integration/micro-core/src/app/views',
  );

  return {
    ...actual,
    useModalItemView: () => ({
      props: {
        payload: mockModalPayload,
      },
      action: mockModalAction,
    }),
  };
});

jest.mock('@ringcentral-integration/next-core', () => {
  const actual = jest.requireActual('@ringcentral-integration/next-core');
  return {
    ...actual,
    fromWatch: () => mockRouteChange$,
    useConnector: (selector: () => unknown) => selector(),
  };
});

jest.mock('@ringcentral-integration/micro-contacts/src/app/components', () => {
  const React = require('react');

  return {
    ContactAvatar: ({
      phoneNumber,
      contactName,
    }: {
      phoneNumber: string;
      contactName?: string;
    }) =>
      React.createElement('div', {
        'data-sign': 'contact-avatar',
        'data-phone-number': phoneNumber,
        'data-contact-name': contactName,
      }),
  };
});

const numbers = {
  from: '+12025550100',
  to: '+16505550123',
};

const smsConfiguration = {
  phoneNumberId: '100',
  phoneNumber: numbers.from,
};

const smsCampaignConfiguration = {
  ...smsConfiguration,
  smsCampaignInfo: {
    id: 'campaign-id',
    coverageType: SmsCoverageCampaignType.Promotional,
    consentSettings: {
      optInRequired: true,
      coverage: {
        optIn: SmsCoverageCampaignType.Promotional,
        optOut: SmsCoverageCampaignType.Promotional,
      },
    },
  },
};

const consentRecord = {
  to: '+16505550123',
  optStatus: SMSOptStatus.OptIn,
  coverage: SmsConsentCoverage.CampaignType,
  campaignType: SmsCampaignType.Conversational,
  source: 'RECIPIENT',
  lastModifiedTime: '2026-06-02T06:00:08.203931Z',
  notes: 'The contact has replied to consent message in app.',
};

const emptyEffectiveConsent = {
  explicitConsents: [],
  campaignSettings: {
    campaignType: 'Informational',
    optInRequired: true,
  },
  optStatus: SMSOptStatus.OptIn,
};

const contactHeaderPayload = {
  contactName: 'Jane Cooper',
};

const createDeferred = <T,>() => {
  let resolve!: (value: T | PromiseLike<T>) => void;
  const promise = new Promise<T>((innerResolve) => {
    resolve = innerResolve;
  });

  return { promise, resolve };
};

const createView = ({
  smsConsent: smsConsentOverrides = {},
}: {
  smsConsent?: Record<string, any>;
} = {}) => {
  const dialogs: any[] = [];
  const modalView = {
    create: jest.fn((config) => {
      dialogs.push(config);
      return config;
    }),
    open: jest.fn(() => ({
      closed: Promise.resolve(true),
      close: jest.fn(),
    })),
    close: jest.fn(),
  };
  const smsConsent = {
    canAddConsent: true,
    canReadConsent: true,
    registeredSmsNumbers: [] as string[],
    loadSmsConfigurationForSender: jest.fn(),
    getSmsConfiguration: jest.fn(() => smsConfiguration),
    loadEffectiveConsentForNumbers: jest.fn(),
    getEffectiveConsentState: jest.fn(() => ({
      data: emptyEffectiveConsent,
    })),
    saveConsentRecord: jest.fn(),
    ...smsConsentOverrides,
  };
  const toast = {
    danger: jest.fn(),
  };
  const router = {
    currentPath: '/messages',
  };

  const view = testBed({
    main: SmsConsentDialogView,
    modules: [
      {
        provide: SharedAppOptions,
        useValue: {
          name: 'sms-consent-dialog-view-test',
          type: 'Base',
        },
      },
      PortDetector,
      {
        provide: Initiator,
        useValue: {
          shouldActivate: false,
          beforeInitialize: jest.fn(),
        },
      },
      {
        provide: ModalView,
        useValue: modalView,
      },
      {
        provide: SmsConsent,
        useValue: smsConsent,
      },
      {
        provide: NumberFormatter,
        useValue: {
          formatNumber: jest.fn((phoneNumber) => phoneNumber),
          normalizeNumber: jest.fn((phoneNumber) =>
            phoneNumber.replace(/[^\d+]/g, ''),
          ),
        },
      },
      {
        provide: ExtensionInfo,
        useValue: {
          name: 'Jean Wu',
        },
      },
      {
        provide: DateTimeFormat,
        useValue: {
          formatDateTime: jest.fn(() => '6/2/2026'),
        },
      },
      {
        provide: Toast,
        useValue: toast,
      },
      {
        provide: RouterPlugin,
        useValue: router,
      },
    ],
    devOptions: { autoComputed: true },
    render: null as any,
  }).instance;

  return {
    view,
    dialogs,
    modalView,
    smsConsent,
    toast,
  };
};

const getDialogContent = (dialog: any) => dialog.view;

const renderAddDialog = (
  dialogs: any[],
  action = { close: jest.fn() },
  payload: any = {
    numbers,
    configuration: smsConfiguration,
    consentEntry: 'Text conversation',
  },
) => {
  const AddDialog = getDialogContent(dialogs[0]);
  mockModalPayload = payload;
  mockModalAction = action;

  return {
    ...render(<AddDialog />),
    action,
  };
};

const renderDetailsDialog = (
  dialogs: any[],
  action = { close: jest.fn() },
  payload: any = {
    numbers,
    consentEntry: 'Text conversation',
  },
) => {
  const DetailsDialog = getDialogContent(dialogs[1]);
  mockModalPayload = payload;
  mockModalAction = action;

  return {
    ...render(<DetailsDialog />),
    action,
    DetailsDialog,
  };
};

describe('SmsConsentDialogView', () => {
  beforeEach(() => {
    mockModalPayload = undefined;
    mockModalAction = undefined;
    mockTrackEvent.mockClear();
  });

  it('creates add drawer, details fullscreen, and number picker portals', () => {
    const { dialogs } = createView();

    expect(dialogs).toHaveLength(3);
    expect(dialogs[0].props({})).toEqual(
      expect.objectContaining({
        'data-sign': 'sms-consent-add-dialog',
        type: 'drawer',
        disableBackdropClick: true,
        disableEscapeKeyDown: true,
      }),
    );
    expect(dialogs[1].props({})).toEqual(
      expect.objectContaining({
        'data-sign': 'sms-consent-details-dialog',
        className: 'z-drawer',
        fullScreen: true,
        disableBackdropClick: true,
        disableEscapeKeyDown: true,
        onClose: expect.any(Function),
      }),
    );
    expect(dialogs[2].props({})).toEqual(
      expect.objectContaining({
        'data-sign': 'sms-consent-number-picker',
        type: 'drawer',
      }),
    );
  });

  it('opens add consent drawer with configuration payload', async () => {
    const { view, dialogs, modalView, smsConsent } = createView();

    const result = await view.openAddConsentDialog({
      numbers,
      consentEntry: 'Text conversation',
    });

    expect(result).toBe(true);
    expect(modalView.open).toHaveBeenCalledWith(dialogs[0], {
      numbers,
      configuration: smsConfiguration,
      consentEntry: 'Text conversation',
    });
    expect(smsConsent.loadEffectiveConsentForNumbers).not.toHaveBeenCalled();
    expect(smsConsent.loadSmsConfigurationForSender).toHaveBeenCalledWith(
      numbers.from,
    );
    expect(smsConsent.getSmsConfiguration).toHaveBeenCalledWith(numbers.from);
  });

  it('closes an open consent modal when the route changes', async () => {
    const { view, modalView } = createView();
    let resolveClosed: (value: boolean) => void;
    const close = jest.fn(() => resolveClosed(false));
    modalView.open.mockReturnValue({
      closed: new Promise<boolean>((resolve) => {
        resolveClosed = resolve;
      }),
      close,
    });

    const opened = view.openAddConsentDialog({
      numbers,
      consentEntry: 'Text conversation',
    });

    await waitFor(() => expect(modalView.open).toHaveBeenCalled());
    mockRouteChange$.next();

    await expect(opened).resolves.toBe(false);
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('does not open add consent after the route changes while loading configuration', async () => {
    const configurationLoaded = createDeferred<void>();
    const { view, modalView, smsConsent } = createView({
      smsConsent: {
        loadSmsConfigurationForSender: jest.fn(
          () => configurationLoaded.promise,
        ),
      },
    });

    const opened = view.openAddConsentDialog({
      numbers,
      consentEntry: 'Text conversation',
    });

    await waitFor(() =>
      expect(smsConsent.loadSmsConfigurationForSender).toHaveBeenCalled(),
    );
    mockRouteChange$.next();
    configurationLoaded.resolve();

    await expect(opened).resolves.toBe(false);
    expect(modalView.open).not.toHaveBeenCalled();
  });

  it('resets details dialog state when the route changes', async () => {
    const { view, modalView } = createView();
    let resolveClosed: (value: boolean) => void;
    const close = jest.fn(() => resolveClosed(false));
    modalView.open.mockReturnValue({
      closed: new Promise<boolean>((resolve) => {
        resolveClosed = resolve;
      }),
      close,
    });

    const opened = view.openConsentDetailsDialog({
      numbers,
      consentEntry: 'Text conversation',
    });

    await waitFor(() => expect(modalView.open).toHaveBeenCalled());
    mockRouteChange$.next();

    await expect(opened).resolves.toBeUndefined();
    expect((view as any).detailsDialogOpen).toBe(false);
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('does not open consent details after the route changes while reloading consent', async () => {
    const consentLoaded = createDeferred<void>();
    const { view, modalView, smsConsent } = createView({
      smsConsent: {
        loadEffectiveConsentForNumbers: jest.fn(() => consentLoaded.promise),
      },
    });

    const opened = view.viewConsentDetails({
      numbers,
      consentEntry: 'Text conversation',
    });

    await waitFor(() =>
      expect(smsConsent.loadEffectiveConsentForNumbers).toHaveBeenCalled(),
    );
    mockRouteChange$.next();
    consentLoaded.resolve();

    await expect(opened).resolves.toBe(false);
    expect(modalView.open).not.toHaveBeenCalled();
    expect(mockTrackEvent).not.toHaveBeenCalled();
  });

  it('uses payload configuration when add drawer renders', () => {
    const { dialogs, smsConsent } = createView();

    renderAddDialog(dialogs);

    expect(smsConsent.loadSmsConfigurationForSender).not.toHaveBeenCalled();
    expect(smsConsent.getSmsConfiguration).not.toHaveBeenCalled();
    expect(screen.getByText('Save').closest('button')).toBeDisabled();
  });

  it('opens registration type help tooltip only after clicking icon', async () => {
    const { dialogs } = createView();

    renderAddDialog(
      dialogs,
      { close: jest.fn() },
      {
        numbers,
        configuration: smsCampaignConfiguration,
      },
    );

    const tooltipIcon = document.querySelector(
      '[data-sign="smsConsentRegistrationTypeTooltip"]',
    );

    expect(tooltipIcon).toBeInTheDocument();

    fireEvent.mouseEnter(tooltipIcon!);
    expect(
      screen.queryByText(/Mobile carriers identify 3 different categories/),
    ).not.toBeInTheDocument();

    fireEvent.click(tooltipIcon!);

    expect(
      await screen.findByText(
        /Mobile carriers identify 3 different categories/,
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveAttribute(
      'href',
      'https://support.ringcentral.com/article-v2/SMS-consent-requirements-and-examples.html?brand=RingCentral&product=RingEX&language=en_US',
    );
  });

  it('closes add drawer from add header button', () => {
    const { dialogs } = createView();
    const action = { close: jest.fn() };

    renderAddDialog(dialogs, action);
    fireEvent.click(
      document.querySelector('[data-sign="smsConsentDialogCloseButton"]')!,
    );

    expect(action.close).toHaveBeenCalled();
  });

  it('does not open add drawer when configuration load fails', async () => {
    const { view, modalView, toast } = createView({
      smsConsent: {
        getSmsConfiguration: jest.fn(() => undefined),
      },
    });

    const result = await view.openAddConsentDialog({
      numbers,
      consentEntry: 'Text conversation',
    });

    expect(result).toBe(false);
    expect(modalView.open).not.toHaveBeenCalled();
    expect(toast.danger).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'openSettingsError',
        ttl: 5000,
      }),
    );
  });

  it('reloads effective consents before opening details fullscreen modal', async () => {
    const { view, dialogs, modalView, smsConsent } = createView({
      smsConsent: {
        getEffectiveConsentState: jest.fn(() => ({
          data: {
            ...emptyEffectiveConsent,
            explicitConsents: [consentRecord],
          },
        })),
      },
    });

    const result = await view.viewConsentDetails({
      numbers,
      consentEntry: 'Text list',
    });

    expect(smsConsent.loadEffectiveConsentForNumbers).toHaveBeenCalledWith(
      numbers,
    );
    expect(smsConsent.loadEffectiveConsentForNumbers).toHaveBeenCalledTimes(1);
    expect(smsConsent.getEffectiveConsentState).toHaveBeenCalledWith(numbers);
    expect(modalView.open).toHaveBeenCalledWith(dialogs[1], {
      numbers,
      consentEntry: 'Text list',
    });
    expect(result).toEqual({
      coverageType: 'Campaign',
      campaignType: 'Campaign-Conversational',
      consentEntry: 'Text list',
      consentStatus: 'Opt-in',
    });
    expect(mockTrackEvent).toHaveBeenCalledWith('Int_SMS_viewConsent', {
      coverageType: 'Campaign',
      campaignType: 'Campaign-Conversational',
      consentEntry: 'Text list',
      consentStatus: 'Opt-in',
    });
  });

  it('does not open details modal when consent reload fails', async () => {
    const { view, modalView, toast } = createView({
      smsConsent: {
        getEffectiveConsentState: jest.fn(() => ({
          error: 'load effective consent failed',
        })),
      },
    });

    const result = await view.viewConsentDetails({
      numbers,
      consentEntry: 'Text conversation',
    });

    expect(result).toBe(false);
    expect(modalView.open).not.toHaveBeenCalled();
    expect(mockTrackEvent).not.toHaveBeenCalled();
    expect(toast.danger).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'openSettingsError',
        ttl: 5000,
      }),
    );
  });

  it('saves consent, opens details modal, and closes add drawer', async () => {
    const { dialogs, modalView, smsConsent } = createView({
      smsConsent: {
        getEffectiveConsentState: jest.fn(() => ({
          data: {
            ...emptyEffectiveConsent,
            explicitConsents: [consentRecord],
          },
        })),
      },
    });
    const { action } = renderAddDialog(dialogs);

    fireEvent.change(
      screen.getByPlaceholderText('Enter notes for your consent.'),
      {
        target: {
          value: 'Customer agreed by phone.',
        },
      },
    );
    await waitFor(() => {
      expect(screen.getByText('Save')).not.toBeDisabled();
    });
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(smsConsent.saveConsentRecord).toHaveBeenCalledWith(
        expect.objectContaining({
          from: numbers.from,
          to: numbers.to,
          optStatus: SMSOptStatus.OptIn,
          coverage: SmsConsentCoverage.PhoneNumber,
          notes: 'Jean Wu added translated consent. Customer agreed by phone.',
        }),
      );
    });
    expect(smsConsent.loadEffectiveConsentForNumbers).toHaveBeenCalledWith(
      numbers,
    );
    expect(mockTrackEvent).toHaveBeenCalledWith('Int_SMS_addConsent', {
      coverageType: 'Number',
      consentEntry: 'Text conversation',
      consentStatus: 'Opt-in',
    });
    expect(mockTrackEvent).toHaveBeenCalledTimes(1);
    expect(modalView.open).toHaveBeenCalledWith(dialogs[1], {
      numbers,
      consentEntry: 'Text conversation',
    });
    expect(action.close).toHaveBeenCalled();
  });

  it('does not continue to consent details when the route changes while saving', async () => {
    const consentSaved = createDeferred<void>();
    const { dialogs, modalView, smsConsent } = createView({
      smsConsent: {
        saveConsentRecord: jest.fn(() => consentSaved.promise),
      },
    });
    const { action } = renderAddDialog(dialogs);

    fireEvent.change(
      screen.getByPlaceholderText('Enter notes for your consent.'),
      {
        target: {
          value: 'Customer agreed by phone.',
        },
      },
    );
    await waitFor(() => {
      expect(screen.getByText('Save')).not.toBeDisabled();
    });
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() =>
      expect(smsConsent.saveConsentRecord).toHaveBeenCalled(),
    );
    mockRouteChange$.next();
    consentSaved.resolve();

    await waitFor(() => expect(screen.getByText('Save')).not.toBeDisabled());
    expect(smsConsent.loadEffectiveConsentForNumbers).not.toHaveBeenCalled();
    expect(modalView.open).not.toHaveBeenCalled();
    expect(action.close).not.toHaveBeenCalled();
  });

  it('keeps add drawer open when refresh after save fails', async () => {
    const { dialogs, modalView, smsConsent, toast } = createView({
      smsConsent: {
        getEffectiveConsentState: jest.fn(() => ({
          error: 'load effective consent failed',
        })),
      },
    });
    const { action } = renderAddDialog(dialogs);

    fireEvent.change(
      screen.getByPlaceholderText('Enter notes for your consent.'),
      {
        target: {
          value: 'Customer agreed by phone.',
        },
      },
    );
    await waitFor(() => {
      expect(screen.getByText('Save')).not.toBeDisabled();
    });
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(toast.danger).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'openSettingsError',
          ttl: 5000,
        }),
      );
    });
    expect(smsConsent.saveConsentRecord).toHaveBeenCalled();
    expect(smsConsent.loadEffectiveConsentForNumbers).toHaveBeenCalledWith(
      numbers,
    );
    expect(modalView.open).not.toHaveBeenCalled();
    expect(action.close).not.toHaveBeenCalled();
    expect(screen.getByText('Add consent')).toBeInTheDocument();
  });

  it('disables close button while saving consent', async () => {
    const { dialogs, smsConsent } = createView({
      smsConsent: {
        saveConsentRecord: jest.fn(() => new Promise(() => undefined)),
      },
    });
    const { action } = renderAddDialog(dialogs);

    fireEvent.change(
      screen.getByPlaceholderText('Enter notes for your consent.'),
      {
        target: {
          value: 'Customer agreed by phone.',
        },
      },
    );
    await waitFor(() => {
      expect(screen.getByText('Save')).not.toBeDisabled();
    });
    fireEvent.click(screen.getByText('Save'));

    const closeButton = document.querySelector(
      '[data-sign="smsConsentDialogCloseButton"]',
    );

    await waitFor(() => {
      expect(smsConsent.saveConsentRecord).toHaveBeenCalled();
      expect(closeButton).toBeDisabled();
    });
    fireEvent.click(closeButton!);
    expect(action.close).not.toHaveBeenCalled();
  });

  it('renders no-consent details card from SmsConsent state', () => {
    renderDetailsDialog(createView().dialogs);

    expect(screen.getByText('Consent')).toBeInTheDocument();
    expect(screen.getByText('+16505550123')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The contact has not provided consent to receive SMS communications yet.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Add consent')).toBeInTheDocument();
  });

  it('renders details contact header from payload display info', () => {
    renderDetailsDialog(
      createView().dialogs,
      { close: jest.fn() },
      {
        numbers,
        consentEntry: 'Text conversation',
        ...contactHeaderPayload,
      },
    );

    expect(
      document.querySelector('[data-sign="contact-avatar"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-sign="contact-avatar"]'),
    ).toHaveAttribute('data-contact-name', 'Jane Cooper');
  });

  it('renders translated consent details from latest SmsConsent state', () => {
    const { dialogs } = createView({
      smsConsent: {
        getEffectiveConsentState: jest.fn(() => ({
          data: {
            ...emptyEffectiveConsent,
            explicitConsents: [consentRecord],
          },
        })),
      },
    });

    renderDetailsDialog(dialogs);

    expect(screen.getByText('+16505550123')).toBeInTheDocument();
    expect(screen.getByText('Opt-in')).toBeInTheDocument();
    expect(screen.getByText('Recipient')).toBeInTheDocument();
    expect(screen.getByText('SMS registration')).toBeInTheDocument();
    expect(screen.getByText('Conversational')).toBeInTheDocument();
    expect(screen.getByText('Informational')).toBeInTheDocument();
    expect(screen.getByText('Promotional')).toBeInTheDocument();
    expect(screen.getByText('Add consent')).toBeInTheDocument();
  });

  it('closes details modal from details header button', () => {
    const { action } = renderDetailsDialog(createView().dialogs);

    fireEvent.click(
      document.querySelector('[data-sign="viewConsentDetailsBackButton"]')!,
    );

    expect(action.close).toHaveBeenCalled();
  });

  it('opens add drawer from details without closing details modal', async () => {
    const { dialogs, modalView, smsConsent } = createView({
      smsConsent: {
        getEffectiveConsentState: jest.fn(() => ({
          data: {
            ...emptyEffectiveConsent,
            explicitConsents: [consentRecord],
          },
        })),
      },
    });
    const { action } = renderDetailsDialog(
      dialogs,
      { close: jest.fn() },
      {
        numbers,
        consentEntry: 'Text conversation',
        ...contactHeaderPayload,
      },
    );

    fireEvent.click(screen.getByText('Add consent'));

    await waitFor(() => {
      expect(modalView.open).toHaveBeenCalledWith(dialogs[0], {
        numbers,
        configuration: smsConfiguration,
        consentEntry: 'Text conversation',
        ...contactHeaderPayload,
      });
    });
    expect(smsConsent.loadSmsConfigurationForSender).toHaveBeenCalledWith(
      numbers.from,
    );
    expect(action.close).not.toHaveBeenCalled();
  });

  it('refreshes existing details data after saving from details add drawer', async () => {
    let explicitConsents: any[] = [];
    const { view, dialogs, modalView, smsConsent } = createView({
      smsConsent: {
        saveConsentRecord: jest.fn(() => {
          explicitConsents = [consentRecord];
        }),
        getEffectiveConsentState: jest.fn(() => ({
          data: {
            ...emptyEffectiveConsent,
            explicitConsents,
          },
        })),
      },
    });

    await view.viewConsentDetails({
      numbers,
      consentEntry: 'Text conversation',
      ...contactHeaderPayload,
    });
    modalView.open.mockClear();

    const { DetailsDialog, rerender } = renderDetailsDialog(
      dialogs,
      { close: jest.fn() },
      {
        numbers,
        consentEntry: 'Text conversation',
        ...contactHeaderPayload,
      },
    );
    expect(
      screen.getByText(
        'The contact has not provided consent to receive SMS communications yet.',
      ),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-sign="contact-avatar"]'),
    ).toHaveAttribute('data-contact-name', 'Jane Cooper');

    const { action: addAction } = renderAddDialog(
      dialogs,
      { close: jest.fn() },
      {
        numbers,
        configuration: smsConfiguration,
        consentEntry: 'Text conversation',
        ...contactHeaderPayload,
      },
    );

    fireEvent.change(
      screen.getByPlaceholderText('Enter notes for your consent.'),
      {
        target: {
          value: 'Customer agreed by phone.',
        },
      },
    );
    await waitFor(() => {
      expect(screen.getByText('Save')).not.toBeDisabled();
    });
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(smsConsent.loadEffectiveConsentForNumbers).toHaveBeenCalledWith(
        numbers,
      );
    });
    expect(modalView.open).not.toHaveBeenCalled();
    expect(addAction.close).toHaveBeenCalled();

    rerender(<DetailsDialog />);
    expect(screen.getByText('Recipient')).toBeInTheDocument();
    expect(
      document.querySelector('[data-sign="contact-avatar"]'),
    ).toHaveAttribute('data-contact-name', 'Jane Cooper');
  });

  describe('settings add consent flow', () => {
    const registeredNumbers = ['+13107390136', '+13107390143'];

    it('skips the number picker and opens an editable add drawer for a single number', async () => {
      const { view, dialogs, modalView, smsConsent } = createView({
        smsConsent: { registeredSmsNumbers: ['+13107390136'] },
      });

      await view.openAddConsentFromSettings();

      expect(modalView.open).toHaveBeenCalledTimes(1);
      expect(modalView.open).toHaveBeenCalledWith(dialogs[0], {
        numbers: { from: '+13107390136', to: '' },
        configuration: smsConfiguration,
        editableExternalNumber: true,
        skipDetailAfterSaved: true,
        consentEntry: 'Settings',
      });
      expect(smsConsent.loadSmsConfigurationForSender).toHaveBeenCalledWith(
        '+13107390136',
      );
    });

    it('opens the number picker with the first number as default when multiple numbers exist', async () => {
      const { view, dialogs, modalView } = createView({
        smsConsent: { registeredSmsNumbers: registeredNumbers },
      });

      await view.openAddConsentFromSettings();

      expect(modalView.open).toHaveBeenCalledWith(dialogs[2], {
        registeredNumbers,
        defaultNumber: '+13107390136',
      });
    });

    it('records the picked number and closes the picker on select', async () => {
      const { view, dialogs, modalView } = createView({
        smsConsent: { registeredSmsNumbers: registeredNumbers },
      });

      const NumberPicker = getDialogContent(dialogs[2]);
      mockModalPayload = {
        registeredNumbers,
        defaultNumber: '+13107390136',
      };
      mockModalAction = { close: jest.fn() };
      render(<NumberPicker />);

      expect(screen.getByText('Add consent')).toBeInTheDocument();
      fireEvent.click(screen.getByText('+13107390143'));

      await waitFor(() => {
        expect(modalView.close).toHaveBeenCalledWith(dialogs[2]);
      });
      expect((view as any).pickedNumber).toBe('+13107390143');
    });

    it('types the external number, validates it, and saves without opening details', async () => {
      const { dialogs, modalView, smsConsent } = createView({
        smsConsent: { registeredSmsNumbers: registeredNumbers },
      });
      const { action } = renderAddDialog(
        dialogs,
        { close: jest.fn() },
        {
          numbers: { from: '+13107390136', to: '' },
          configuration: smsConfiguration,
          editableExternalNumber: true,
          skipDetailAfterSaved: true,
          consentEntry: 'Settings',
        },
      );

      const externalNumberInput = document.querySelector(
        '[data-sign="smsConsentExternalNumber"]',
      ) as HTMLInputElement;
      expect(externalNumberInput).not.toBeDisabled();
      expect(externalNumberInput.getAttribute('placeholder')).toBe(
        'Enter number',
      );

      fireEvent.change(
        screen.getByPlaceholderText('Enter notes for your consent.'),
        { target: { value: 'Signed paper form.' } },
      );

      // invalid number: no error while typing, error only shows on blur
      fireEvent.change(externalNumberInput, { target: { value: '12345' } });
      expect(externalNumberInput).not.toHaveAttribute('aria-invalid', 'true');
      fireEvent.blur(externalNumberInput);
      expect(externalNumberInput).toHaveAttribute('aria-invalid', 'true');

      // clicking Save with an invalid number does not save
      fireEvent.click(screen.getByText('Save'));
      expect(smsConsent.saveConsentRecord).not.toHaveBeenCalled();

      // valid E.164 number clears the error and saves
      fireEvent.change(externalNumberInput, {
        target: { value: '+16505550123' },
      });
      expect(externalNumberInput).not.toHaveAttribute('aria-invalid', 'true');
      fireEvent.click(screen.getByText('Save'));

      await waitFor(() => {
        expect(smsConsent.saveConsentRecord).toHaveBeenCalledWith(
          expect.objectContaining({
            from: '+13107390136',
            to: '+16505550123',
            notes: 'Jean Wu added translated consent. Signed paper form.',
          }),
        );
      });
      // settings flow must not reload effective consent or open details modal
      expect(smsConsent.loadEffectiveConsentForNumbers).not.toHaveBeenCalled();
      expect(modalView.open).not.toHaveBeenCalled();
      expect(mockTrackEvent).toHaveBeenCalledWith('Int_SMS_addConsent', {
        coverageType: 'Number',
        consentEntry: 'Settings',
        consentStatus: 'Opt-in',
      });
      expect(action.close).toHaveBeenCalled();
    });
  });
});
