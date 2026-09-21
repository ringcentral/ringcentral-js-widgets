import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import {
  AppFeatures,
  Auth,
  Client,
  ExtensionPhoneNumber,
  NumberFormatter,
  type WebSocketSubscription as Subscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Initiator,
  PortDetector,
  SharedAppOptions,
  testBed,
} from '@ringcentral-integration/next-core';
import { firstValueFrom, NEVER } from 'rxjs';

import {
  SmsConsent,
  SMSOptStatus,
  SmsCampaignType,
  SmsConsentCoverage,
  SmsCoverageCampaignType,
} from '../../../src/app/services/SmsConsent';

const createEffectiveConsentResponse = ({
  optStatus = SMSOptStatus.OptIn,
  explicitConsents = [],
}: {
  optStatus?: SMSOptStatus;
  explicitConsents?: any[];
} = {}) => ({
  explicitConsents,
  campaignSettings: {
    campaignType: SmsCampaignType.Informational,
    optInRequired: true,
  },
  optStatus,
});

const createSmsConfigurationResponse = () => ({
  phoneNumberId: '513003004',
  phoneNumber: '+12025550100',
  smsCampaignInfo: {
    id: '983782004',
    coverageType: SmsCoverageCampaignType.Promotional,
    consentSettings: {
      optInRequired: true,
      coverage: {
        optIn: SmsCoverageCampaignType.Promotional,
        optOut: SmsCoverageCampaignType.Account,
      },
    },
  },
});

const createConsentRecordsResponse = ({
  records = [
    {
      to: '+16505550123',
      optStatus: SMSOptStatus.OptIn,
      coverage: SmsConsentCoverage.CampaignType,
      campaignType: SmsCampaignType.Promotional,
      source: 'Api',
      lastModifiedTime: '2026-06-03T06:00:08.203931Z',
    },
  ],
  nextPageToken,
}: {
  records?: any[];
  nextPageToken?: string;
} = {}) => ({
  records,
  paging: {
    perPage: 20,
    ...(nextPageToken ? { nextPageToken } : {}),
  },
});

const createSmsConsent = ({
  subscription,
}: {
  subscription?: Subscription;
} = {}) => {
  const get = jest.fn();
  const patch = jest.fn();
  const post = jest.fn();
  const client = {
    service: {
      platform: () => ({
        get,
        patch,
        post,
      }),
    },
  };
  const smsConsent = testBed({
    main: SmsConsent,
    modules: [
      {
        provide: SharedAppOptions,
        useValue: {
          name: 'sms-consent-test',
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
        provide: Auth,
        useValue: { loggedIn: true },
      },
      {
        provide: Client,
        useValue: client,
      },
      {
        provide: AppFeatures,
        useValue: {
          hasConsentManagementPermission: true,
          hasReadConsentsPermission: true,
        },
      },
      {
        provide: ExtensionPhoneNumber,
        useValue: {
          numbers: [{ id: '513003004', phoneNumber: '+12025550100' }],
          smsSenderNumbers: [{ id: '513003004', phoneNumber: '+12025550100' }],
        },
      },
      {
        provide: NumberFormatter,
        useValue: {
          normalizeNumber: jest.fn((phoneNumber) =>
            phoneNumber.replace(/[^\d+]/g, ''),
          ),
          formatNumber: jest.fn((phoneNumber) => phoneNumber),
        },
      },
      ...(subscription
        ? [
            {
              provide: 'Subscription',
              useValue: subscription,
            },
          ]
        : []),
    ],
  }).instance;

  return {
    smsConsent,
    mocks: {
      get,
      patch,
      post,
    },
  };
};

const createSubscription = () =>
  ({
    register: jest.fn(),
    fromMessage$: jest.fn(() => NEVER),
  }) as unknown as Subscription & {
    register: jest.Mock;
    fromMessage$: jest.Mock;
  };

describe('SmsConsent service', () => {
  it('registers sms consent change subscription filter', () => {
    const subscription = createSubscription();
    const { smsConsent } = createSmsConsent({ subscription });

    expect(subscription.register).toHaveBeenCalledWith(smsConsent, {
      filters: [subscriptionFilters.smsConsents],
    });
  });

  it('shares effective consent state for the same normalized from/to numbers', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const response = createEffectiveConsentResponse();
    mocks.get.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    await smsConsent.loadEffectiveConsentForNumbers({
      from: '+1 (202) 555-0100',
      to: '+1 (650) 555-0123',
    });

    expect(
      smsConsent.getEffectiveConsent({
        from: '+12025550100',
        to: '+16505550123',
      }),
    ).toBe(response);
    expect(smsConsent.effectiveConsentStateMap).toEqual({
      '+12025550100_+16505550123': {
        status: 'success',
        data: response,
      },
    });
  });

  it('keeps effective consent state separate for different recipients from the same sender', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const firstResponse = createEffectiveConsentResponse();
    const secondResponse = createEffectiveConsentResponse({
      optStatus: SMSOptStatus.OptOut,
    });
    mocks.get
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(firstResponse),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(secondResponse),
      });

    await smsConsent.loadEffectiveConsentForNumbers({
      from: '+1 (202) 555-0100',
      to: '+1 (650) 555-0123',
    });

    expect(
      smsConsent.getEffectiveConsent({
        from: '+1 (202) 555-0100',
        to: '+1 (650) 555-0456',
      }),
    ).toBeUndefined();

    await smsConsent.loadEffectiveConsentForNumbers({
      from: '+1 (202) 555-0100',
      to: '+1 (650) 555-0456',
    });

    expect(smsConsent.effectiveConsentStateMap).toEqual({
      '+12025550100_+16505550123': {
        status: 'success',
        data: firstResponse,
      },
      '+12025550100_+16505550456': {
        status: 'success',
        data: secondResponse,
      },
    });
  });

  it('normalizes formatted from/to numbers when reading effective consent state', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const response = createEffectiveConsentResponse();
    mocks.get.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    await smsConsent.loadEffectiveConsentForNumbers({
      from: '+1 (202) 555-0100',
      to: '+1 (650) 555-0123',
    });

    expect(
      smsConsent.getEffectiveConsent({
        from: '+12025550100',
        to: '+16505550123',
      }),
    ).toBe(response);
    expect(mocks.get).toHaveBeenCalledWith(
      '/restapi/v2/accounts/~/sms/consents/effective-consent',
      {
        from: '+12025550100',
        to: '+16505550123',
      },
    );
  });

  it('reloads effective consent every time the same from/to numbers are loaded', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const firstResponse = createEffectiveConsentResponse();
    const secondResponse = createEffectiveConsentResponse({
      optStatus: SMSOptStatus.OptOut,
    });
    mocks.get
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(firstResponse),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(secondResponse),
      });

    await smsConsent.loadEffectiveConsentForNumbers({
      from: '+1 (202) 555-0100',
      to: '+1 (650) 555-0123',
    });
    await smsConsent.loadEffectiveConsentForNumbers({
      from: '+12025550100',
      to: '+16505550123',
    });

    expect(mocks.get).toHaveBeenCalledTimes(2);
    expect(
      smsConsent.getEffectiveConsent({
        from: '+12025550100',
        to: '+16505550123',
      }),
    ).toBe(secondResponse);
  });

  it('loads multiple effective consent pairs and deduplicates normalized pairs in one batch', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const firstResponse = createEffectiveConsentResponse();
    const secondResponse = createEffectiveConsentResponse({
      optStatus: SMSOptStatus.OptOut,
    });
    mocks.get
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(firstResponse),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(secondResponse),
      });

    await smsConsent.loadEffectiveConsentForNumberPairs([
      {
        from: '+1 (202) 555-0100',
        to: '+1 (650) 555-0123',
      },
      {
        from: '+12025550100',
        to: '+16505550123',
      },
      {
        from: '+12025550100',
        to: '+16505550456',
      },
    ]);

    expect(mocks.get).toHaveBeenCalledTimes(2);
    expect(mocks.get).toHaveBeenNthCalledWith(
      1,
      '/restapi/v2/accounts/~/sms/consents/effective-consent',
      {
        from: '+12025550100',
        to: '+16505550123',
      },
    );
    expect(mocks.get).toHaveBeenNthCalledWith(
      2,
      '/restapi/v2/accounts/~/sms/consents/effective-consent',
      {
        from: '+12025550100',
        to: '+16505550456',
      },
    );
    expect(smsConsent.effectiveConsentStateMap).toEqual({
      '+12025550100_+16505550123': {
        status: 'success',
        data: firstResponse,
      },
      '+12025550100_+16505550456': {
        status: 'success',
        data: secondResponse,
      },
    });
  });

  it('ensures effective consent pairs only when state is missing or failed', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const firstResponse = createEffectiveConsentResponse();
    const secondResponse = createEffectiveConsentResponse({
      optStatus: SMSOptStatus.OptOut,
    });
    mocks.get
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(firstResponse),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(secondResponse),
      });

    await smsConsent.ensureEffectiveConsentForNumberPairs([
      {
        from: '+1 (202) 555-0100',
        to: '+1 (650) 555-0123',
      },
    ]);
    await smsConsent.ensureEffectiveConsentForNumberPairs([
      {
        from: '+12025550100',
        to: '+16505550123',
      },
    ]);

    expect(mocks.get).toHaveBeenCalledTimes(1);
    expect(
      smsConsent.getEffectiveConsent({
        from: '+12025550100',
        to: '+16505550123',
      }),
    ).toBe(firstResponse);

    (smsConsent as any)._setEffectiveConsentState('+12025550100_+16505550123', {
      status: 'error',
      error: 'failed',
    });
    await smsConsent.ensureEffectiveConsentForNumberPairs([
      {
        from: '+12025550100',
        to: '+16505550123',
      },
    ]);

    expect(mocks.get).toHaveBeenCalledTimes(2);
    expect(
      smsConsent.getEffectiveConsent({
        from: '+12025550100',
        to: '+16505550123',
      }),
    ).toBe(secondResponse);
  });

  it('reloads matching effective consent state when sms consent change event is received', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const firstConsent = createEffectiveConsentResponse();
    const otherConsent = createEffectiveConsentResponse({
      optStatus: SMSOptStatus.OptOut,
    });
    const reloadedConsent = createEffectiveConsentResponse({
      explicitConsents: [
        {
          from: '+12025550100',
          to: '+16505550123',
          optStatus: SMSOptStatus.OptOut,
          coverage: SmsConsentCoverage.PhoneNumber,
          source: 'Recipient',
          lastModifiedTime: '2026-06-03T06:00:08.203931Z',
        },
      ],
      optStatus: SMSOptStatus.OptOut,
    });
    const smsConfiguration = createSmsConfigurationResponse();
    mocks.get
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(firstConsent),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(otherConsent),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(smsConfiguration),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(reloadedConsent),
      });

    await smsConsent.loadEffectiveConsentForNumberPairs([
      {
        from: '+1 (202) 555-0100',
        to: '+1 (650) 555-0123',
      },
      {
        from: '+1 (202) 555-0100',
        to: '+1 (650) 555-0456',
      },
    ]);
    await smsConsent.loadSmsConfigurationForSender('+1 (202) 555-0100');
    await (smsConsent as any)._handleSmsConsentChangeEvent({
      records: [
        {
          from: '+1 (202) 555-0100',
          to: '+1 (650) 555-0123',
          optStatus: SMSOptStatus.OptOut,
          source: 'Recipient',
        },
      ],
    });

    expect(
      smsConsent.getEffectiveConsent({
        from: '+12025550100',
        to: '+16505550123',
      }),
    ).toBe(reloadedConsent);
    expect(
      smsConsent.getEffectiveConsent({
        from: '+12025550100',
        to: '+16505550456',
      }),
    ).toBe(otherConsent);
    expect(smsConsent.smsConfigurationStateMap).toEqual({
      '+12025550100': {
        status: 'success',
        data: smsConfiguration,
      },
    });
    expect(mocks.get).toHaveBeenCalledTimes(4);
    expect(mocks.get).toHaveBeenLastCalledWith(
      '/restapi/v2/accounts/~/sms/consents/effective-consent',
      {
        from: '+12025550100',
        to: '+16505550123',
      },
    );
  });

  it('reloads matching effective consent states for wildcard event from number', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const firstConsent = createEffectiveConsentResponse();
    const secondConsent = createEffectiveConsentResponse();
    const unmatchedConsent = createEffectiveConsentResponse();
    const firstReloadedConsent = createEffectiveConsentResponse({
      optStatus: SMSOptStatus.OptOut,
    });
    const secondReloadedConsent = createEffectiveConsentResponse({
      optStatus: SMSOptStatus.OptOut,
    });
    mocks.get
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(firstConsent),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(secondConsent),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(unmatchedConsent),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(firstReloadedConsent),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(secondReloadedConsent),
      });

    await smsConsent.loadEffectiveConsentForNumberPairs([
      {
        from: '+12025550100',
        to: '+16505550123',
      },
      {
        from: '+14155550100',
        to: '+16505550123',
      },
      {
        from: '+12025550100',
        to: '+16505550456',
      },
    ]);
    await (smsConsent as any)._handleSmsConsentChangeEvent({
      records: [
        {
          from: '*',
          to: '+1 (650) 555-0123',
          optStatus: SMSOptStatus.OptOut,
          source: 'Recipient',
        },
      ],
    });

    expect(mocks.get).toHaveBeenCalledTimes(5);
    expect(
      smsConsent.getEffectiveConsent({
        from: '+12025550100',
        to: '+16505550123',
      }),
    ).toBe(firstReloadedConsent);
    expect(
      smsConsent.getEffectiveConsent({
        from: '+14155550100',
        to: '+16505550123',
      }),
    ).toBe(secondReloadedConsent);
    expect(
      smsConsent.getEffectiveConsent({
        from: '+12025550100',
        to: '+16505550456',
      }),
    ).toBe(unmatchedConsent);
  });

  it('loads sms configuration by matching extension phone number id', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    mocks.get.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        phoneNumberId: '513003004',
      }),
    });

    await smsConsent.fetchSmsConfigurationForSender('+1 (202) 555-0100');

    expect(mocks.get).toHaveBeenCalledWith(
      '/restapi/v1.0/account/~/extension/~/phone-number/513003004/sms-configuration',
    );
  });

  it('computes recipient consent status from effective consent without filtering by recipient', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const smsConfiguration = createSmsConfigurationResponse();
    const emptyConsent = createEffectiveConsentResponse();
    const optInConsent = createEffectiveConsentResponse({
      explicitConsents: [
        {
          to: '+15550009999',
          optStatus: SMSOptStatus.OptIn,
          coverage: SmsConsentCoverage.CampaignType,
          campaignType: SmsCampaignType.Promotional,
          source: 'Api',
          lastModifiedTime: '2026-06-03T06:00:08.203931Z',
        },
      ],
    });
    mocks.get
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(smsConfiguration),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(emptyConsent),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(optInConsent),
      });

    await smsConsent.loadSmsConfigurationForSender('+1 (202) 555-0100');
    await smsConsent.loadEffectiveConsentForNumbers({
      from: '+1 (202) 555-0100',
      to: '+1 (650) 555-0123',
    });

    expect(
      smsConsent.getConsentStatus({
        from: '+12025550100',
        to: '+16505550123',
      }),
    ).toEqual({
      isOptOut: false,
      requiredOptInLoss: true,
    });

    await smsConsent.loadEffectiveConsentForNumbers({
      from: '+12025550100',
      to: '+16505550123',
    });

    expect(
      smsConsent.getConsentStatus({
        from: '+1 (202) 555-0100',
        to: '+1 (650) 555-0123',
      }),
    ).toEqual({
      isOptOut: false,
      requiredOptInLoss: false,
    });
  });

  it('stores sms configuration state by normalized sender number', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const response = {
      phoneNumberId: '513003004',
    };
    mocks.get.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    await smsConsent.loadSmsConfigurationForSender('+1 (202) 555-0100');

    expect(smsConsent.getSmsConfiguration('+12025550100')).toBe(response);
    expect(smsConsent.smsConfigurationStateMap).toEqual({
      '+12025550100': {
        status: 'success',
        data: response,
      },
    });
  });

  it('searches consent records with normalized numbers and default perPage', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const response = createConsentRecordsResponse({ nextPageToken: 'next' });
    mocks.post.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    const search$ = smsConsent.searchConsentRecords$({
      from: ['+1 (202) 555-0100'],
      to: ['+1 (650) 555-0123'],
      optStatus: SMSOptStatus.OptIn,
      coverage: [SmsConsentCoverage.CampaignType],
      campaignType: [SmsCampaignType.Promotional],
      pageToken: 'page-token',
    });

    expect(mocks.post).not.toHaveBeenCalled();

    await firstValueFrom(search$);

    expect(mocks.post).toHaveBeenCalledWith(
      '/restapi/v2/accounts/~/sms/consents/search',
      {
        from: ['+12025550100'],
        to: ['+16505550123'],
        optStatus: SMSOptStatus.OptIn,
        coverage: [SmsConsentCoverage.CampaignType],
        campaignType: [SmsCampaignType.Promotional],
        pageToken: 'page-token',
        perPage: 20,
      },
    );
    expect(smsConsent.consentsData).toBe(response);
  });

  it('preserves an explicit consent-record perPage override', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    mocks.post.mockResolvedValue({
      json: jest.fn().mockResolvedValue(createConsentRecordsResponse()),
    });

    await firstValueFrom(
      smsConsent.searchConsentRecords$({
        perPage: 8,
      }),
    );

    expect(mocks.post).toHaveBeenCalledWith(
      '/restapi/v2/accounts/~/sms/consents/search',
      {
        perPage: 8,
      },
    );
  });

  it('appends consent records and replaces paging on load more', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const firstResponse = createConsentRecordsResponse({
      records: [
        {
          to: '+16505550123',
          optStatus: SMSOptStatus.OptIn,
          coverage: SmsConsentCoverage.Account,
          source: 'Api',
          lastModifiedTime: '2026-06-03T06:00:08.203931Z',
        },
      ],
      nextPageToken: 'next',
    });
    const secondResponse = createConsentRecordsResponse({
      records: [
        {
          to: '+14155550123',
          optStatus: SMSOptStatus.OptOut,
          coverage: SmsConsentCoverage.PhoneNumber,
          source: 'Api',
          lastModifiedTime: '2026-06-04T06:00:08.203931Z',
        },
      ],
    });
    mocks.post
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(firstResponse),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(secondResponse),
      });

    await firstValueFrom(smsConsent.searchConsentRecords$());
    await firstValueFrom(
      smsConsent.searchConsentRecords$({ pageToken: 'next' }, { append: true }),
    );

    expect(smsConsent.consentsData).toEqual({
      ...secondResponse,
      records: [...firstResponse.records, ...secondResponse.records],
    });
  });

  it('does not store a consent-record response after unsubscribe', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const response = createConsentRecordsResponse();
    let resolveRequest!: (value: any) => void;
    mocks.post.mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      }),
    );

    const subscription = smsConsent.searchConsentRecords$().subscribe();

    subscription.unsubscribe();
    resolveRequest({
      json: jest.fn().mockResolvedValue(response),
    });
    await Promise.resolve();
    await Promise.resolve();

    expect(smsConsent.consentsData).toBeNull();
  });

  it('exposes registered SMS sender numbers and shared number helpers', () => {
    const { smsConsent } = createSmsConsent();

    expect(smsConsent.registeredSmsNumbers).toEqual(['+12025550100']);
    expect(smsConsent.normalizeNumber('+1 (202) 555-0100')).toBe(
      '+12025550100',
    );
    expect(smsConsent.formatNumber('+12025550100')).toBe('+12025550100');
  });

  it('omits from number when saving account-level consent', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    mocks.patch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        failedRecords: [],
      }),
    });

    await smsConsent.saveConsentRecord({
      from: '+12025550100',
      to: '+16505550123',
      optStatus: SMSOptStatus.OptIn,
      coverage: SmsConsentCoverage.Account,
      notes: 'Jean Wu added this consent. ok',
    });

    expect(mocks.patch).toHaveBeenCalledWith(
      '/restapi/v2/accounts/~/sms/consents',
      {
        records: [
          {
            to: '+16505550123',
            optStatus: SMSOptStatus.OptIn,
            coverage: SmsConsentCoverage.Account,
            source: 'Api',
            notes: 'Jean Wu added this consent. ok',
          },
        ],
      },
    );
  });

  it('refreshes effective consent state with the from/to key after saving consent', async () => {
    const { smsConsent, mocks } = createSmsConsent();
    const response = createEffectiveConsentResponse();
    mocks.patch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        failedRecords: [],
      }),
    });
    mocks.get.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    await smsConsent.saveConsentRecord({
      from: '+12025550100',
      to: '+16505550123',
      optStatus: SMSOptStatus.OptIn,
      coverage: SmsConsentCoverage.Account,
      notes: 'Jean Wu added this consent. ok',
    });
    await smsConsent.loadEffectiveConsentForNumbers({
      from: '+12025550100',
      to: '+16505550123',
    });

    expect(mocks.get).toHaveBeenCalledWith(
      '/restapi/v2/accounts/~/sms/consents/effective-consent',
      {
        from: '+12025550100',
        to: '+16505550123',
      },
    );
    expect(smsConsent.effectiveConsentStateMap).toEqual({
      '+12025550100_+16505550123': {
        status: 'success',
        data: response,
      },
    });
  });
});
