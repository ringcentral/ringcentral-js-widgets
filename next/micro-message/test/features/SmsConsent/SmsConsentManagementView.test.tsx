import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Initiator,
  PortDetector,
  PortManager,
  RouterPlugin,
  SharedAppOptions,
  testBed,
} from '@ringcentral-integration/next-core';
import * as nextCore from '@ringcentral-integration/next-core';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { of, Subject, throwError } from 'rxjs';

import {
  SmsCampaignType,
  SmsConsent,
  SmsConsentCoverage,
  SMSOptStatus,
} from '../../../src/app/services/SmsConsent';
import { SmsConsentManagementView } from '../../../src/app/views/SmsConsentManagementView';
import { SmsConsentManagementPanel } from '../../../src/app/views/SmsConsentManagementView/SmsConsentManagementPanel';

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: () => ({
    t: (key: string) =>
      ({
        title: 'Consent Management',
        search: 'Search',
        filter: 'Filter',
        filters: 'Filters',
        reset: 'Reset',
        apply: 'Apply',
        cancel: 'Cancel',
        coverage: 'Coverage',
        company: 'Company',
        registrationType: 'Registration type',
        smsRegisteredNumber: 'SMS registered number',
        filterPhoneNumbers: 'Filter phone numbers',
        addConsent: 'Add consent',
        externalNumber: 'External number',
        consentStatus: 'Consent status',
        consentStatusAndCoverage: 'Consent Status & Coverage',
        optIn: 'Opt-in',
        optOut: 'Opt-out',
        conversational: 'Conversational',
        informational: 'Informational',
        promotional: 'Promotional',
        emptyList: 'No opted-in or opted-out numbers yet.',
        emptySearch: 'No search results',
        loadError: 'Failed to load results. Please try again.',
      })[key] ?? key,
  }),
}));

jest.mock(
  '../../../src/app/views/SmsConsentDialogView/SmsConsentDialog.helper',
  () => ({
    getSmsConsentCoverageLabel: (coverage: string) =>
      ({
        PhoneNumber: 'Number',
        Account: 'Company',
        CampaignType: 'SMS registration',
      })[coverage],
  }),
);

jest.mock('@ringcentral/spring-ui', () => {
  const React = require('react');
  const actual = jest.requireActual('@ringcentral/spring-ui');

  const DrawerMock = ({ open, header, children, footer }: any) =>
    open ? (
      <div data-sign="filterDrawer">
        <div data-sign="filterDrawerHeader">{header}</div>
        {children}
        <div data-sign="filterDrawerFooter">{footer}</div>
      </div>
    ) : null;

  return {
    ...actual,
    SwipeableDrawer: DrawerMock,
    Drawer: DrawerMock,
    VirtualizedList: ({
      data,
      children,
      endReached,
      components,
      ...props
    }: any) => (
      <div {...props}>
        <button data-sign="endReached" type="button" onClick={endReached}>
          endReached
        </button>
        {data.map((item: any, index: number) => children(index, item))}
        {components?.Footer ? <components.Footer /> : null}
      </div>
    ),
  };
});

const createConsentRecord = ({
  to = '+16505550123',
  optStatus = SMSOptStatus.OptIn,
  coverage = SmsConsentCoverage.CampaignType,
  campaignType = SmsCampaignType.Promotional,
} = {}) => ({
  to,
  optStatus,
  coverage,
  campaignType,
  source: 'Api',
  lastModifiedTime: '2026-06-03T06:00:08.203931Z',
});

const createView = ({
  normalizedNumber = '+16505550123',
  portManager: portManagerOverrides = {},
  smsConsent: smsConsentOverrides = {},
}: {
  normalizedNumber?: string;
  portManager?: Record<string, any>;
  smsConsent?: Record<string, any>;
} = {}) => {
  const smsConsent = {
    canReadConsent: true,
    consentsData: undefined,
    registeredSmsNumbers: ['+13107390136', '+13107390143'],
    normalizeNumber: jest.fn(() => normalizedNumber),
    formatNumber: jest.fn((phoneNumber) => phoneNumber),
    searchConsentRecords$: jest.fn(() =>
      of({
        records: [createConsentRecord()],
        paging: { perPage: 100 },
      }),
    ),
    resetConsentsData: jest.fn().mockResolvedValue(undefined),
    ...smsConsentOverrides,
  };
  const contactMatcher = {
    match: jest.fn().mockResolvedValue(undefined),
    findMatchesFromNumber: jest.fn(() => [{ name: 'Jane Smith' }]),
    dataMapping: {},
  };
  const router = {
    push: jest.fn(),
  };
  const portManager = {
    shared: false,
    onServer: jest.fn(),
    ...portManagerOverrides,
  };

  const view = testBed({
    main: SmsConsentManagementView,
    modules: [
      {
        provide: SharedAppOptions,
        useValue: {
          name: 'sms-consent-management-view-test',
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
        provide: SmsConsent,
        useValue: smsConsent,
      },
      {
        provide: ContactMatcher,
        useValue: contactMatcher,
      },
      {
        provide: RouterPlugin,
        useValue: router,
      },
      {
        provide: PortManager,
        useValue: portManager,
      },
    ],
  }).instance;

  return {
    view,
    smsConsent,
    contactMatcher,
    portManager,
    router,
  };
};

describe('SmsConsentManagementView', () => {
  it('binds the request pipeline only on the server in shared mode', () => {
    let initializeOnServer: (() => void) | undefined;
    const { view, portManager } = createView({
      portManager: {
        shared: true,
        onServer: jest.fn((callback) => {
          initializeOnServer = callback;
        }),
      },
    });

    expect(portManager.onServer).toHaveBeenCalledTimes(1);
    expect((view as any)._loadConsentRecordsRequest$.observers).toHaveLength(0);

    initializeOnServer?.();

    expect((view as any)._loadConsentRecordsRequest$.observers).toHaveLength(1);
  });

  it('searches by normalized E.164 external number and matches contacts', async () => {
    const { view, smsConsent, contactMatcher } = createView();

    await view.loadConsentRecords({
      searchValue: '+1 (650) 555-0123',
    });

    expect(smsConsent.searchConsentRecords$).toHaveBeenCalledWith(
      {
        to: ['+16505550123'],
      },
      { append: false },
    );
    expect(contactMatcher.match).toHaveBeenCalledWith({
      queries: ['+16505550123'],
    });
  });

  it('sets error state and skips API when normalized number is not E.164', async () => {
    const { view, smsConsent } = createView({
      normalizedNumber: '6505550123',
    });

    await view.loadConsentRecords({
      searchValue: '6505550123',
    });

    expect(smsConsent.searchConsentRecords$).not.toHaveBeenCalled();
    expect(view.searchError).toBe(true);
  });

  it('ignores an earlier search failure after a newer search succeeds', async () => {
    const firstSearch$ = new Subject<any>();
    const secondSearch$ = new Subject<any>();
    const { view, smsConsent, contactMatcher } = createView({
      smsConsent: {
        normalizeNumber: jest.fn((phoneNumber) => phoneNumber),
        searchConsentRecords$: jest
          .fn()
          .mockReturnValueOnce(firstSearch$)
          .mockReturnValueOnce(secondSearch$),
      },
    });

    const firstSearch = view.loadConsentRecords({
      searchValue: '+16505550121',
    });
    await Promise.resolve();
    const secondSearch = view.loadConsentRecords({
      searchValue: '+16505550122',
    });
    await Promise.resolve();

    secondSearch$.next({
      records: [createConsentRecord({ to: '+16505550122' })],
      paging: { perPage: 100 },
    });
    secondSearch$.complete();
    await secondSearch;
    firstSearch$.error(new Error('stale request failed'));
    await firstSearch;

    expect((view as any).requestError).toBe(false);
    expect((view as any).loading).toBe(false);
    expect((view as any).loadingMore).toBe(false);
    expect(contactMatcher.match).toHaveBeenCalledTimes(1);
    expect(contactMatcher.match).toHaveBeenCalledWith({
      queries: ['+16505550122'],
    });
  });

  it('keeps request errors inside the active request pipeline', async () => {
    const { view } = createView({
      smsConsent: {
        searchConsentRecords$: jest.fn(() =>
          throwError(() => new Error('search failed')),
        ),
      },
    });

    await expect(view.loadConsentRecords()).resolves.toBeUndefined();

    expect((view as any).requestError).toBe(true);
    expect((view as any).loading).toBe(false);
    expect((view as any).loadingMore).toBe(false);
  });

  it('reloads the consent list only after a consent is saved from settings', async () => {
    const { view, smsConsent } = createView();
    const openAddConsentFromSettings = jest.fn().mockResolvedValue(true);
    Object.defineProperty(view, '_smsConsentDialogView', {
      configurable: true,
      value: { openAddConsentFromSettings },
    });

    await view.openAddConsent();

    expect(openAddConsentFromSettings).toHaveBeenCalled();
    expect(smsConsent.searchConsentRecords$).toHaveBeenCalled();
  });

  it('does not reload the consent list when settings add consent is cancelled', async () => {
    const { view, smsConsent } = createView();
    Object.defineProperty(view, '_smsConsentDialogView', {
      configurable: true,
      value: { openAddConsentFromSettings: jest.fn().mockResolvedValue(false) },
    });

    await view.openAddConsent();

    expect(smsConsent.searchConsentRecords$).not.toHaveBeenCalled();
  });

  it('applies coverage, campaign type, and registered-number filters', async () => {
    const { view, smsConsent } = createView();
    (view as any)._setFilterOpen(true);
    smsConsent.searchConsentRecords$.mockImplementationOnce(() => {
      expect((view as any).filterOpen).toBe(false);
      return of({
        records: [createConsentRecord()],
        paging: { perPage: 100 },
      });
    });

    await view.applyFilters({
      coverage: [SmsConsentCoverage.Account],
      campaignType: [SmsCampaignType.Informational],
      from: ['+13107390136'],
    });

    expect(smsConsent.searchConsentRecords$).toHaveBeenLastCalledWith(
      {
        coverage: [
          SmsConsentCoverage.Account,
          SmsConsentCoverage.CampaignType,
          SmsConsentCoverage.PhoneNumber,
        ],
        campaignType: [SmsCampaignType.Informational],
        from: ['+13107390136'],
      },
      { append: false },
    );
  });

  it('loads the next cursor page with current search and filters', async () => {
    const { view, smsConsent } = createView({
      smsConsent: {
        consentsData: {
          records: [createConsentRecord()],
          paging: {
            perPage: 100,
            nextPageToken: 'next-page',
          },
        },
      },
    });
    await view.updateSearchValue('+16505550123');
    await view.applyFilters({
      coverage: [SmsConsentCoverage.Account],
      campaignType: [],
      from: [],
    });

    await view.loadConsentRecords({ append: true });

    expect(smsConsent.searchConsentRecords$).toHaveBeenLastCalledWith(
      {
        to: ['+16505550123'],
        coverage: [SmsConsentCoverage.Account],
        pageToken: 'next-page',
      },
      { append: true },
    );
  });

  it('cancels an in-flight append when a new search starts', async () => {
    const initialSearch$ = new Subject<any>();
    const appendSearch$ = new Subject<any>();
    const nextSearch$ = new Subject<any>();
    const { view, smsConsent, contactMatcher } = createView({
      smsConsent: {
        consentsData: {
          records: [createConsentRecord({ to: '+16505550120' })],
          paging: { perPage: 100, nextPageToken: 'next-page' },
        },
        normalizeNumber: jest.fn((phoneNumber) => phoneNumber),
        searchConsentRecords$: jest
          .fn()
          .mockReturnValueOnce(initialSearch$)
          .mockReturnValueOnce(appendSearch$)
          .mockReturnValueOnce(nextSearch$),
      },
    });

    const initialSearch = view.loadConsentRecords({
      searchValue: '+16505550120',
    });
    await Promise.resolve();
    initialSearch$.next({
      records: [createConsentRecord({ to: '+16505550120' })],
      paging: { perPage: 100, nextPageToken: 'next-page' },
    });
    initialSearch$.complete();
    await initialSearch;

    const append = view.loadConsentRecords({ append: true });
    const nextSearch = view.loadConsentRecords({
      searchValue: '+16505550122',
    });
    await Promise.resolve();
    nextSearch$.next({
      records: [createConsentRecord({ to: '+16505550122' })],
      paging: { perPage: 100 },
    });
    nextSearch$.complete();
    await nextSearch;

    appendSearch$.next({
      records: [createConsentRecord({ to: '+16505550121' })],
      paging: { perPage: 100 },
    });
    appendSearch$.complete();
    await append;

    expect(smsConsent.searchConsentRecords$).toHaveBeenNthCalledWith(
      2,
      {
        to: ['+16505550120'],
        pageToken: 'next-page',
      },
      { append: true },
    );
    expect(contactMatcher.match).toHaveBeenCalledTimes(2);
    expect(contactMatcher.match).toHaveBeenLastCalledWith({
      queries: ['+16505550122'],
    });
  });

  it('ignores duplicate append requests while loading the same page', async () => {
    const appendSearch$ = new Subject<any>();
    const { view, smsConsent } = createView({
      smsConsent: {
        consentsData: {
          records: [createConsentRecord()],
          paging: { perPage: 100, nextPageToken: 'next-page' },
        },
        searchConsentRecords$: jest
          .fn()
          .mockReturnValueOnce(
            of({
              records: [createConsentRecord()],
              paging: { perPage: 100, nextPageToken: 'next-page' },
            }),
          )
          .mockReturnValueOnce(appendSearch$),
      },
    });

    await view.loadConsentRecords();

    const firstAppend = view.loadConsentRecords({ append: true });
    await view.loadConsentRecords({ append: true });

    expect(smsConsent.searchConsentRecords$).toHaveBeenCalledTimes(2);

    appendSearch$.next({
      records: [createConsentRecord({ to: '+16505550124' })],
      paging: { perPage: 100 },
    });
    appendSearch$.complete();
    await firstAppend;
  });

  it('skips consent-list lifecycle effects on shared secondary tabs', () => {
    const { view } = createView({
      portManager: {
        shared: true,
        isMainTab: false,
      },
    });
    const loadConsentRecords = jest.spyOn(view, 'loadConsentRecords');
    const resetConsentManagementView = jest.spyOn(
      view,
      'resetConsentManagementView',
    );
    const TestComponent = () => view.component();
    const useConnectorSpy = jest
      .spyOn(nextCore, 'useConnector')
      .mockImplementation((selector: () => unknown) => selector());

    const { unmount } = render(<TestComponent />);

    unmount();

    expect(loadConsentRecords).not.toHaveBeenCalled();
    expect(resetConsentManagementView).not.toHaveBeenCalled();

    useConnectorSpy.mockRestore();
  });

  it('runs consent-list lifecycle effects on a non-shared tab', () => {
    const { view } = createView({
      portManager: {
        shared: false,
      },
    });
    const loadConsentRecords = jest.spyOn(view, 'loadConsentRecords');
    const resetConsentManagementView = jest.spyOn(
      view,
      'resetConsentManagementView',
    );
    const TestComponent = () => view.component();
    const useConnectorSpy = jest
      .spyOn(nextCore, 'useConnector')
      .mockImplementation((selector: () => unknown) => selector());

    const { unmount } = render(<TestComponent />);

    expect(loadConsentRecords).toHaveBeenCalledTimes(1);
    expect(resetConsentManagementView).not.toHaveBeenCalled();

    unmount();

    expect(resetConsentManagementView).toHaveBeenCalledTimes(1);

    useConnectorSpy.mockRestore();
  });

  it('runs consent-list lifecycle effects on a shared main tab', () => {
    const { view } = createView({
      portManager: {
        shared: true,
        isMainTab: true,
      },
    });
    const loadConsentRecords = jest.spyOn(view, 'loadConsentRecords');
    const resetConsentManagementView = jest.spyOn(
      view,
      'resetConsentManagementView',
    );
    const TestComponent = () => view.component();
    const useConnectorSpy = jest
      .spyOn(nextCore, 'useConnector')
      .mockImplementation((selector: () => unknown) => selector());

    const { unmount } = render(<TestComponent />);

    expect(loadConsentRecords).toHaveBeenCalledTimes(1);

    unmount();

    expect(resetConsentManagementView).toHaveBeenCalledTimes(1);

    useConnectorSpy.mockRestore();
  });
});

describe('SmsConsentManagementPanel', () => {
  const baseProps = {
    records: [],
    searchValue: '',
    searchError: false,
    loading: false,
    loadingMore: false,
    requestError: false,
    filterOpen: false,
    filters: {
      coverage: [],
      campaignType: [],
      from: [],
    },
    registeredNumbers: ['+13107390136', '+13107390143'],
    canAddConsent: true,
    formatNumber: (phoneNumber?: string) => phoneNumber ?? '',
    getContactName: () => '',
    onBackClick: jest.fn(),
    onAddConsent: jest.fn(),
    onSearchChange: jest.fn(),
    onFilterOpen: jest.fn(),
    onFilterClose: jest.fn(),
    onFiltersApply: jest.fn(),
    onEndReached: jest.fn(),
  };

  it('uses error style without inline error text', () => {
    const { container } = render(
      <SmsConsentManagementPanel {...baseProps} searchError />,
    );

    expect(
      container.querySelector('[data-sign="consentSearchInput"]'),
    ).toHaveAttribute('aria-invalid', 'true');
    expect(
      screen.queryByText('Enter a valid external number.'),
    ).not.toBeInTheDocument();
  });

  it('shows the Add consent CTA and triggers the handler when permitted', () => {
    const onAddConsent = jest.fn();
    const { container } = render(
      <SmsConsentManagementPanel
        {...baseProps}
        canAddConsent
        onAddConsent={onAddConsent}
      />,
    );

    const cta = container.querySelector('[data-sign="addConsentButton"]');
    expect(cta).toBeInTheDocument();

    fireEvent.click(cta!);
    expect(onAddConsent).toHaveBeenCalled();
  });

  it('hides the Add consent CTA without add permission', () => {
    const { container } = render(
      <SmsConsentManagementPanel {...baseProps} canAddConsent={false} />,
    );

    expect(
      container.querySelector('[data-sign="addConsentButton"]'),
    ).not.toBeInTheDocument();
  });

  it('hides the Add consent CTA when there are no registered numbers', () => {
    const { container } = render(
      <SmsConsentManagementPanel {...baseProps} registeredNumbers={[]} />,
    );

    expect(
      container.querySelector('[data-sign="addConsentButton"]'),
    ).not.toBeInTheDocument();
  });

  it('renders contact, status, and reusable coverage label', () => {
    render(
      <SmsConsentManagementPanel
        {...baseProps}
        records={[createConsentRecord()]}
        getContactName={() => 'Jane Smith'}
      />,
    );

    expect(screen.getByText('+16505550123')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Opt-in')).toBeInTheDocument();
    expect(screen.getByText('SMS registration')).toBeInTheDocument();
  });

  it('renders the exact consent-record table mapping in API order', () => {
    const { container } = render(
      <SmsConsentManagementPanel
        {...baseProps}
        records={[
          createConsentRecord({
            to: '+16505550121',
            optStatus: SMSOptStatus.OptIn,
            coverage: SmsConsentCoverage.PhoneNumber,
          }),
          createConsentRecord({
            to: '+16505550122',
            optStatus: SMSOptStatus.OptOut,
            coverage: SmsConsentCoverage.Account,
          }),
          createConsentRecord({
            to: '+16505550123',
            optStatus: SMSOptStatus.OptIn,
            coverage: SmsConsentCoverage.CampaignType,
            campaignType: SmsCampaignType.Promotional,
          }),
        ]}
        getContactName={(phoneNumber) =>
          ({
            '+16505550121': 'Jane Smith',
            '+16505550123': 'John Lee',
          })[phoneNumber] ?? ''
        }
      />,
    );

    const rows = container.querySelectorAll('[data-sign="consentRecordRow"]');
    expect(rows).toHaveLength(3);

    expect(rows[0]).toHaveTextContent('+16505550121');
    expect(rows[0]).toHaveTextContent('Jane Smith');
    expect(rows[0]).toHaveTextContent('Opt-in');
    expect(rows[0]).toHaveTextContent('Number');

    expect(rows[1]).toHaveTextContent('+16505550122');
    expect(rows[1]).toHaveTextContent('Opt-out');
    expect(rows[1]).toHaveTextContent('Company');
    expect(
      rows[1].querySelector('[data-sign="externalNumber"] .typography-caption'),
    ).not.toBeInTheDocument();

    expect(rows[2]).toHaveTextContent('+16505550123');
    expect(rows[2]).toHaveTextContent('John Lee');
    expect(rows[2]).toHaveTextContent('Opt-in');
    expect(rows[2]).toHaveTextContent('SMS registration');
  });

  it('renders all coverage labels and both consent statuses', () => {
    render(
      <SmsConsentManagementPanel
        {...baseProps}
        records={[
          createConsentRecord({
            to: '+16505550121',
            coverage: SmsConsentCoverage.PhoneNumber,
          }),
          createConsentRecord({
            to: '+16505550122',
            coverage: SmsConsentCoverage.Account,
            optStatus: SMSOptStatus.OptOut,
          }),
          createConsentRecord({
            to: '+16505550123',
            coverage: SmsConsentCoverage.CampaignType,
          }),
        ]}
      />,
    );

    expect(screen.getByText('Number')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('SMS registration')).toBeInTheDocument();
    expect(screen.getAllByText('Opt-in')).toHaveLength(2);
    expect(screen.getByText('Opt-out')).toBeInTheDocument();
  });

  it('renders initial and loading-more states', () => {
    const { container, rerender } = render(
      <SmsConsentManagementPanel {...baseProps} loading />,
    );

    expect(
      container.querySelector('[data-sign="loadingConsentRecords"]'),
    ).toBeInTheDocument();
    expect(screen.getByText('Consent Management')).toBeInTheDocument();

    rerender(
      <SmsConsentManagementPanel
        {...baseProps}
        records={[createConsentRecord()]}
        loadingMore
      />,
    );

    expect(
      container.querySelector('[data-sign="loadingMoreConsentRecords"]'),
    ).toBeInTheDocument();
  });

  it('renders the list load failure copy without loading or empty states', () => {
    const { container } = render(
      <SmsConsentManagementPanel {...baseProps} requestError />,
    );

    expect(
      screen.getByText('Failed to load results. Please try again.'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('No opted-in or opted-out numbers yet.'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('No search results')).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-sign="loadingConsentRecords"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-sign="loadingMoreConsentRecords"]'),
    ).not.toBeInTheDocument();
  });

  it('opens SwipeableDrawer and applies selected filters', () => {
    const onFiltersApply = jest.fn();
    render(
      <SmsConsentManagementPanel
        {...baseProps}
        filterOpen
        onFiltersApply={onFiltersApply}
      />,
    );

    fireEvent.click(screen.getByText('Company'));
    expect(screen.getByText('Conversational')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Informational'));
    expect(screen.getByText('Promotional')).toBeInTheDocument();
    fireEvent.click(screen.getByText('+13107390136'));
    fireEvent.click(screen.getByText('Apply'));

    expect(onFiltersApply).toHaveBeenCalledWith({
      coverage: [SmsConsentCoverage.Account],
      campaignType: [SmsCampaignType.Informational],
      from: ['+13107390136'],
    });
  });

  it('matches the approved header and footer action placement', () => {
    const { container } = render(
      <SmsConsentManagementPanel {...baseProps} filterOpen />,
    );

    const header = container.querySelector('[data-sign="filterDrawerHeader"]')!;
    const footer = container.querySelector('[data-sign="filterDrawerFooter"]')!;

    expect(header).toHaveTextContent('Filters');
    expect(header).toHaveTextContent('Reset');
    expect(footer).not.toHaveTextContent('Reset');
    expect(footer).toHaveTextContent('Cancel');
    expect(footer).toHaveTextContent('Apply');
  });

  it('filters the formatted SMS registered-number list', () => {
    render(
      <SmsConsentManagementPanel
        {...baseProps}
        filterOpen
        registeredNumbers={['+13107390136', '+13107390143', '+16572245559']}
        formatNumber={(phoneNumber) =>
          ({
            '+13107390136': '(310) 739-0136',
            '+13107390143': '(310) 739-0143',
            '+16572245559': '(657) 224-5559',
          })[phoneNumber ?? ''] ?? ''
        }
      />,
    );

    expect(screen.getByText('SMS registered number')).toBeInTheDocument();
    fireEvent.change(
      screen.getByRole('searchbox', { name: 'Filter phone numbers' }),
      { target: { value: '0143' } },
    );

    expect(screen.queryByText('(310) 739-0136')).not.toBeInTheDocument();
    expect(screen.getByText('(310) 739-0143')).toBeInTheDocument();
    expect(screen.queryByText('(657) 224-5559')).not.toBeInTheDocument();
  });

  it('resets drawer selections and registered-number search', () => {
    const onFiltersApply = jest.fn();
    render(
      <SmsConsentManagementPanel
        {...baseProps}
        filterOpen
        filters={{
          coverage: [SmsConsentCoverage.Account],
          campaignType: [SmsCampaignType.Informational],
          from: ['+13107390136'],
        }}
        onFiltersApply={onFiltersApply}
      />,
    );

    fireEvent.change(
      screen.getByRole('searchbox', { name: 'Filter phone numbers' }),
      { target: { value: '0143' } },
    );
    fireEvent.click(screen.getByText('Reset'));

    expect(
      screen.getByRole('searchbox', { name: 'Filter phone numbers' }),
    ).toHaveValue('');
    fireEvent.click(screen.getByText('Apply'));
    expect(onFiltersApply).toHaveBeenCalledWith({
      coverage: [],
      campaignType: [],
      from: [],
    });
  });

  it('closes without applying draft filters on Cancel', () => {
    const onFilterClose = jest.fn();
    const onFiltersApply = jest.fn();
    render(
      <SmsConsentManagementPanel
        {...baseProps}
        filterOpen
        onFilterClose={onFilterClose}
        onFiltersApply={onFiltersApply}
      />,
    );

    fireEvent.click(screen.getByText('Company'));
    fireEvent.click(screen.getByText('Cancel'));

    expect(onFilterClose).toHaveBeenCalled();
    expect(onFiltersApply).not.toHaveBeenCalled();
  });

  it('selects all campaign types from the Registration type parent option', () => {
    const onFiltersApply = jest.fn();
    render(
      <SmsConsentManagementPanel
        {...baseProps}
        filterOpen
        onFiltersApply={onFiltersApply}
      />,
    );

    fireEvent.click(screen.getByText('Registration type'));
    fireEvent.click(screen.getByText('Apply'));

    expect(onFiltersApply).toHaveBeenCalledWith({
      coverage: [],
      campaignType: Object.values(SmsCampaignType),
      from: [],
    });
  });

  it('hides SMS registered-number filter when only one number exists', () => {
    render(
      <SmsConsentManagementPanel
        {...baseProps}
        filterOpen
        registeredNumbers={['+13107390136']}
      />,
    );

    expect(screen.queryByText('SMS registered number')).not.toBeInTheDocument();
  });

  it('switches initial and filtered empty-state copy', () => {
    const { rerender } = render(<SmsConsentManagementPanel {...baseProps} />);

    expect(
      screen.getByText('No opted-in or opted-out numbers yet.'),
    ).toBeInTheDocument();

    rerender(
      <SmsConsentManagementPanel
        {...baseProps}
        filters={{
          coverage: [SmsConsentCoverage.Account],
          campaignType: [],
          from: [],
        }}
      />,
    );

    expect(screen.getByText('No search results')).toBeInTheDocument();
  });
});
