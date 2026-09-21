import type {
  SmsConsentCoverageType,
  SmsConsentEntry,
  SmsConsentRecordTrackProperties,
  SmsConsentStatus,
} from '@ringcentral-integration/micro-auth/src/app/services';

import {
  type SMSConsent,
  SmsCampaignType,
  SmsConsentCoverage,
  SmsOptSource,
  SMSOptStatus,
} from '../../services';

import { t } from './i18n';

const SMS_CONSENT_COVERAGE_TYPES: Record<
  SmsConsentCoverage,
  SmsConsentCoverageType
> = {
  [SmsConsentCoverage.PhoneNumber]: 'Number',
  [SmsConsentCoverage.Account]: 'Company',
  [SmsConsentCoverage.CampaignType]: 'Campaign',
};

const SMS_CONSENT_STATUSES: Record<SMSOptStatus, SmsConsentStatus> = {
  [SMSOptStatus.OptIn]: 'Opt-in',
  [SMSOptStatus.OptOut]: 'Opt-out',
};

export function getSmsConsentRecordTrackProperties(
  record: Pick<SMSConsent, 'campaignType' | 'coverage' | 'optStatus'>,
  consentEntry: SmsConsentEntry,
): SmsConsentRecordTrackProperties {
  const coverageType = SMS_CONSENT_COVERAGE_TYPES[record.coverage];
  const consentStatus = SMS_CONSENT_STATUSES[record.optStatus];
  const campaignType =
    record.coverage === SmsConsentCoverage.CampaignType && record.campaignType
      ? (`Campaign-${record.campaignType}` as const)
      : undefined;

  return {
    coverageType,
    ...(campaignType ? { campaignType } : {}),
    consentEntry,
    consentStatus,
  };
}

export function getSmsConsentSourceLabel(
  source: SmsOptSource | string | undefined,
) {
  switch (source) {
    case SmsOptSource.Recipient:
    case 'RECIPIENT':
      return t('sourceRecipient');
    case SmsOptSource.Api:
    case 'API':
      return t('sourceApi');
    case SmsOptSource.Upstream:
    case SmsOptSource.Carrier:
    case 'UPSTREAM':
    case 'CARRIER':
    case 'DLR':
      return t('sourceCarrier');
    case 'ACCOUNT':
      return t('sourceAccount');
    default:
      return source ?? '';
  }
}

export function getSmsConsentCoverageLabel(
  coverage: SmsConsentCoverage | undefined,
) {
  switch (coverage) {
    case SmsConsentCoverage.PhoneNumber:
      return t('coverageNumber');
    case SmsConsentCoverage.Account:
      return t('coverageCompany');
    case SmsConsentCoverage.CampaignType:
      return t('coverageSmsRegistration');
    default:
      return coverage ?? '';
  }
}

export function getSmsConsentStatusLabel(status: SMSOptStatus | undefined) {
  switch (status) {
    case SMSOptStatus.OptIn:
      return t('optIn');
    case SMSOptStatus.OptOut:
      return t('optOut');
    default:
      return status ?? '';
  }
}

export function getSmsCampaignTypeLabel(campaignType: SmsCampaignType) {
  switch (campaignType) {
    case SmsCampaignType.Conversational:
      return t('conversational');
    case SmsCampaignType.Informational:
      return t('informational');
    case SmsCampaignType.Promotional:
      return t('promotional');
    default:
      return campaignType;
  }
}
