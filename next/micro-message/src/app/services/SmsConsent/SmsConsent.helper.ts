import { messageTypes } from '@ringcentral-integration/commons/enums/messageTypes';

import {
  PhoneNumberPair,
  SMSOptStatus,
  SmsCampaignType,
  SmsConsentCoverage,
  SmsCoverageCampaignType,
  type SMSConsent,
  type SmsConfigurationResponse,
  type SmsConsentConversation,
  type SmsConsentRecordScope,
} from './SmsConsent.interface';

export type SmsConsentRecipientStatus = {
  isOptOut?: boolean;
  requiredOptInLoss?: boolean;
};

export const CAMPAIGN_LEVEL = {
  [SmsCampaignType.Conversational]: 1,
  [SmsCampaignType.Informational]: 2,
  [SmsCampaignType.Promotional]: 3,
} as const;

export const CAMPAIGN_TYPE_OPTIONS = [
  SmsCampaignType.Conversational,
  SmsCampaignType.Informational,
  SmsCampaignType.Promotional,
] as const;

const campaignCoverageMap: Partial<
  Record<SmsCoverageCampaignType, SmsCampaignType>
> = {
  [SmsCoverageCampaignType.Conversational]: SmsCampaignType.Conversational,
  [SmsCoverageCampaignType.Informational]: SmsCampaignType.Informational,
  [SmsCoverageCampaignType.Promotional]: SmsCampaignType.Promotional,
};

function getPartyNumber(party?: {
  phoneNumber?: string;
  extensionNumber?: string;
}) {
  return party?.phoneNumber || party?.extensionNumber || '';
}

function getRecordTimestamp(record: SMSConsent) {
  const timestamp = record.lastModifiedTime || '';
  const value = Date.parse(timestamp);
  return Number.isNaN(value) ? 0 : value;
}

function getCampaignTypeFromCoverage(coverage?: SmsCoverageCampaignType) {
  return coverage ? campaignCoverageMap[coverage] : undefined;
}

export function isSmsConsentConversationEligible(
  conversation?: SmsConsentConversation,
) {
  if (!conversation?.conversationId) {
    return false;
  }

  if (
    conversation.type &&
    conversation.type !== messageTypes.sms &&
    conversation.type !== messageTypes.text
  ) {
    return false;
  }

  const correspondents = conversation.correspondents ?? conversation.to ?? [];
  // skip group sms
  return correspondents.length === 1;
}

export function getConversationNumbers(
  conversation?: SmsConsentConversation,
): PhoneNumberPair | null {
  if (!isSmsConsentConversationEligible(conversation)) {
    return null;
  }

  const externalParty =
    conversation!.correspondents?.[0] ??
    (conversation!.direction === 'Outbound'
      ? conversation!.to?.[0]
      : conversation!.from);
  const rcParty =
    conversation!.self ??
    (conversation!.direction === 'Outbound'
      ? conversation!.from
      : conversation!.to?.[0]);

  const from = getPartyNumber(rcParty);
  const to = getPartyNumber(externalParty);

  if (!from || !to) {
    return null;
  }

  return {
    from,
    to,
  };
}

export function getEffectiveConsentNumbersFromKey(
  key: string,
): PhoneNumberPair | undefined {
  const [from, to, ...rest] = key.split('_');
  if (!from || !to || rest.length) {
    return;
  }

  return { from, to };
}

export function selectLatestSmsConsentRecord(records: SMSConsent[] = []) {
  if (records.length === 0) {
    return null;
  }

  return [...records].sort(
    (a, b) => getRecordTimestamp(b) - getRecordTimestamp(a),
  )[0];
}

function isAccountOrPhoneNumberConsent(consent: SMSConsent) {
  return (
    consent.coverage === SmsConsentCoverage.Account ||
    consent.coverage === SmsConsentCoverage.PhoneNumber
  );
}

function getCampaignLevel(campaignType?: SmsCampaignType) {
  if (!campaignType) {
    return undefined;
  }
  return CAMPAIGN_LEVEL[campaignType];
}

export function hasOptInCoverageForCampaignType(
  consent: SMSConsent,
  campaignType?: SmsCampaignType,
) {
  if (consent.optStatus !== SMSOptStatus.OptIn) {
    return false;
  }

  if (isAccountOrPhoneNumberConsent(consent)) {
    return true;
  }

  if (consent.coverage === SmsConsentCoverage.CampaignType) {
    const consentCampaignLevel = getCampaignLevel(consent.campaignType);
    const senderCampaignLevel = getCampaignLevel(campaignType);

    // fail-open if fetching enforcement status fails RCINT-47836
    if (!consentCampaignLevel || !senderCampaignLevel) {
      return true;
    }
    return consentCampaignLevel >= senderCampaignLevel;
  }

  return false;
}

export function hasOptOutCoverageForCampaignType(
  consent: SMSConsent,
  campaignType?: SmsCampaignType,
) {
  if (consent.optStatus !== SMSOptStatus.OptOut) {
    return false;
  }

  if (isAccountOrPhoneNumberConsent(consent)) {
    return true;
  }

  if (consent.coverage === SmsConsentCoverage.CampaignType) {
    const consentCampaignLevel = getCampaignLevel(consent.campaignType);
    const senderCampaignLevel = getCampaignLevel(campaignType);

    if (consentCampaignLevel && senderCampaignLevel) {
      return consentCampaignLevel <= senderCampaignLevel;
    }
  }

  return false;
}

export function hasValidSmsOptInConsent(
  consents?: SMSConsent[],
  campaignType?: SmsCampaignType,
) {
  return Boolean(
    consents?.some((consent) =>
      hasOptInCoverageForCampaignType(consent, campaignType),
    ),
  );
}

export function hasValidSmsOptOutConsent(
  consents?: SMSConsent[],
  campaignType?: SmsCampaignType,
) {
  return Boolean(
    consents?.some((consent) =>
      hasOptOutCoverageForCampaignType(consent, campaignType),
    ),
  );
}

export function shouldRequireSmsOptInConsent(
  consents?: SMSConsent[],
  configuration?: SmsConfigurationResponse,
) {
  if (!consents) {
    return false;
  }
  return Boolean(
    configuration?.smsCampaignInfo?.consentSettings?.optInRequired &&
    !hasValidSmsOptInConsent(
      consents,
      configuration?.smsCampaignInfo
        ?.coverageType as unknown as SmsCampaignType,
    ),
  );
}

export function getSmsConsentRecipientStatus({
  consents,
  configuration,
}: {
  consents?: SMSConsent[];
  configuration?: SmsConfigurationResponse;
}): SmsConsentRecipientStatus {
  const campaignType = configuration?.smsCampaignInfo
    ?.coverageType as unknown as SmsCampaignType;

  return {
    isOptOut: hasValidSmsOptOutConsent(consents, campaignType),
    requiredOptInLoss: shouldRequireSmsOptInConsent(consents, configuration),
  };
}

export function getSmsConsentRecordScopeFromCoverage(
  coverage?: SmsCoverageCampaignType,
): SmsConsentRecordScope {
  if (coverage === SmsCoverageCampaignType.Account) {
    return {
      coverage: SmsConsentCoverage.Account,
    };
  }

  const campaignType = getCampaignTypeFromCoverage(coverage);
  if (campaignType) {
    return {
      coverage: SmsConsentCoverage.CampaignType,
      campaignType,
    };
  }

  return {
    coverage: SmsConsentCoverage.PhoneNumber,
  };
}

export function getDefaultSmsConsentRecordScope({
  configuration,
  optStatus,
}: {
  configuration?: SmsConfigurationResponse;
  optStatus: SMSOptStatus;
}) {
  const smsCampaignInfo = configuration?.smsCampaignInfo;
  const coverage =
    optStatus === SMSOptStatus.OptOut
      ? smsCampaignInfo?.consentSettings?.coverage?.optOut
      : smsCampaignInfo?.consentSettings?.coverage?.optIn;

  return getSmsConsentRecordScopeFromCoverage(coverage);
}
