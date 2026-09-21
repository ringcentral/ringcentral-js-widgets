import {
  getDefaultSmsConsentRecordScope,
  getConversationNumbers,
  getEffectiveConsentNumbersFromKey,
  getSmsConsentRecipientStatus,
  hasValidSmsOptInConsent,
  hasValidSmsOptOutConsent,
  selectLatestSmsConsentRecord,
  shouldRequireSmsOptInConsent,
  SMSOptStatus,
  SmsCampaignType,
  SmsConsentCoverage,
  SmsCoverageCampaignType,
} from '../../../src/app/services/SmsConsent';

describe('SmsConsent helpers', () => {
  it('extracts RC and external numbers from a 1:1 conversation', () => {
    expect(
      getConversationNumbers({
        conversationId: 'conversation-1',
        type: 'Text',
        direction: 'Inbound',
        self: { phoneNumber: '+12025550100' },
        correspondents: [{ phoneNumber: '+16505550123' }],
      } as any),
    ).toEqual({
      from: '+12025550100',
      to: '+16505550123',
    });
  });

  it('skips group SMS conversations', () => {
    expect(
      getConversationNumbers({
        conversationId: 'conversation-1',
        type: 'Text',
        direction: 'Outbound',
        self: { phoneNumber: '+12025550100' },
        correspondents: [
          { phoneNumber: '+16505550123' },
          { phoneNumber: '+16505550124' },
        ],
      } as any),
    ).toBeNull();
  });

  it('parses effective consent cache keys into number pairs', () => {
    expect(
      getEffectiveConsentNumbersFromKey('+12025550100_+16505550123'),
    ).toEqual({
      from: '+12025550100',
      to: '+16505550123',
    });
    expect(getEffectiveConsentNumbersFromKey('+12025550100')).toBeUndefined();
    expect(
      getEffectiveConsentNumbersFromKey('+12025550100_+16505550123_extra'),
    ).toBeUndefined();
  });

  it('selects latest consent record by lastModifiedTime', () => {
    expect(
      selectLatestSmsConsentRecord([
        {
          to: '+16505550123',
          optStatus: SMSOptStatus.OptIn,
          coverage: SmsConsentCoverage.PhoneNumber,
          source: 'Api',
          lastModifiedTime: '2026-06-02T06:00:08.203931Z',
        },
        {
          to: '+16505550123',
          optStatus: SMSOptStatus.OptOut,
          coverage: SmsConsentCoverage.Account,
          source: 'Api',
          lastModifiedTime: '2026-06-03T06:00:08.203931Z',
        },
      ]),
    ).toEqual(
      expect.objectContaining({
        optStatus: SMSOptStatus.OptOut,
      }),
    );
  });

  it('detects valid opt-out consent by coverage hierarchy', () => {
    expect(
      hasValidSmsOptOutConsent(
        [
          {
            to: '+16505550123',
            optStatus: SMSOptStatus.OptOut,
            coverage: SmsConsentCoverage.CampaignType,
            campaignType: SmsCampaignType.Informational,
            source: 'Api',
            lastModifiedTime: '2026-06-03T06:00:08.203931Z',
          },
        ],
        SmsCampaignType.Promotional,
      ),
    ).toBe(true);

    expect(
      hasValidSmsOptOutConsent(
        [
          {
            to: '+16505550123',
            optStatus: SMSOptStatus.OptOut,
            coverage: SmsConsentCoverage.CampaignType,
            campaignType: SmsCampaignType.Promotional,
            source: 'Api',
            lastModifiedTime: '2026-06-03T06:00:08.203931Z',
          },
        ],
        SmsCampaignType.Informational,
      ),
    ).toBe(false);
  });

  it('detects valid opt-in consent by coverage hierarchy', () => {
    expect(
      hasValidSmsOptInConsent(
        [
          {
            to: '+16505550123',
            optStatus: SMSOptStatus.OptIn,
            coverage: SmsConsentCoverage.CampaignType,
            campaignType: SmsCampaignType.Promotional,
            source: 'Api',
            lastModifiedTime: '2026-06-03T06:00:08.203931Z',
          },
        ],
        SmsCampaignType.Informational,
      ),
    ).toBe(true);

    expect(
      hasValidSmsOptInConsent(
        [
          {
            to: '+16505550123',
            optStatus: SMSOptStatus.OptIn,
            coverage: SmsConsentCoverage.CampaignType,
            campaignType: SmsCampaignType.Informational,
            source: 'Api',
            lastModifiedTime: '2026-06-03T06:00:08.203931Z',
          },
        ],
        SmsCampaignType.Promotional,
      ),
    ).toBe(false);
  });

  it('requires opt-in when existing opt-in does not cover the campaign type', () => {
    expect(
      shouldRequireSmsOptInConsent(
        [
          {
            to: '+16505550123',
            optStatus: SMSOptStatus.OptIn,
            coverage: SmsConsentCoverage.CampaignType,
            campaignType: SmsCampaignType.Informational,
            source: 'Api',
            lastModifiedTime: '2026-06-03T06:00:08.203931Z',
          },
        ],
        {
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
        },
      ),
    ).toBe(true);
  });

  it('does not require opt-in while consents are not loaded', () => {
    const configuration = {
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
    };

    expect(shouldRequireSmsOptInConsent(undefined, configuration)).toBe(false);
    expect(shouldRequireSmsOptInConsent([], configuration)).toBe(true);
  });

  it('uses sms configuration coverage defaults', () => {
    expect(
      getDefaultSmsConsentRecordScope({
        optStatus: SMSOptStatus.OptIn,
        configuration: {
          phoneNumberId: '513003004',
          phoneNumber: '+12025550100',
          smsCampaignInfo: {
            id: '983782004',
            coverageType: SmsCoverageCampaignType.Informational,
            consentSettings: {
              optInRequired: true,
              coverage: {
                optIn: SmsCoverageCampaignType.Promotional,
                optOut: SmsCoverageCampaignType.Account,
              },
            },
          },
        },
      }),
    ).toEqual({
      coverage: SmsConsentCoverage.CampaignType,
      campaignType: SmsCampaignType.Promotional,
    });
  });

  it('computes recipient consent status from effective consents', () => {
    const configuration = {
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
    };

    expect(
      getSmsConsentRecipientStatus({
        consents: [
          {
            to: '+16505550123',
            optStatus: SMSOptStatus.OptOut,
            coverage: SmsConsentCoverage.Account,
            source: 'Api',
            lastModifiedTime: '2026-06-03T06:00:08.203931Z',
          },
        ],
        configuration,
      }),
    ).toEqual({
      isOptOut: true,
      requiredOptInLoss: true,
    });

    expect(
      getSmsConsentRecipientStatus({
        consents: [
          {
            to: '+16505550123',
            optStatus: SMSOptStatus.OptIn,
            coverage: SmsConsentCoverage.CampaignType,
            campaignType: SmsCampaignType.Promotional,
            source: 'Api',
            lastModifiedTime: '2026-06-03T06:00:08.203931Z',
          },
        ],
        configuration,
      }),
    ).toEqual({
      isOptOut: false,
      requiredOptInLoss: false,
    });
  });
});
