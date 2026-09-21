import {
  trackEvent,
  type SmsConsentEntry,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { useModalItemView } from '@ringcentral-integration/micro-core/src/app/views';
import { isE164, isValidNumber } from '@ringcentral-integration/phone-number';
import React, { useEffect, useState } from 'react';
import { usePromise } from 'react-use';

import {
  CAMPAIGN_TYPE_OPTIONS,
  getDefaultSmsConsentRecordScope,
  SMSOptStatus,
  SmsConsentCoverage,
  type PhoneNumberPair,
  type SaveSmsConsentRecordOptions,
  type SmsConfigurationResponse,
  type SmsConsentRecordScope,
} from '../../services';

import { AddConsentPanel } from './AddConsentPanel';
import { getSmsConsentRecordTrackProperties } from './SmsConsentDialog.helper';

export interface SmsConsentDialogPayload {
  numbers: PhoneNumberPair;
  configuration?: SmsConfigurationResponse;
  contactName?: string;
  /**
   * Settings "Add consent" flow: the external number is typed manually instead
   * of coming from an existing conversation.
   */
  editableExternalNumber?: boolean;
  /**
   * When true, saving does not navigate to the consent details page; the caller
   * (settings list) reloads instead. Independent of `editableExternalNumber`.
   */
  skipDetailAfterSaved?: boolean;
  consentEntry: SmsConsentEntry;
}

export interface SmsConsentDialogPanelProps {
  canAddConsent: boolean;
  userNotePrefix: string;
  formatNumber: (phoneNumber?: string) => string;
  normalizeNumber: (phoneNumber: string) => string;
  saveConsentRecord: (params: {
    numbers: PhoneNumberPair;
    options: SaveSmsConsentRecordOptions;
  }) => Promise<boolean>;
  onSaveSuccess: (numbers: PhoneNumberPair) => Promise<boolean>;
}

export const SmsConsentDialogPanel = ({
  canAddConsent,
  userNotePrefix,
  formatNumber,
  normalizeNumber,
  saveConsentRecord,
  onSaveSuccess,
}: SmsConsentDialogPanelProps) => {
  const { props, action } = useModalItemView<SmsConsentDialogPayload>();
  const mounted = usePromise();
  const payload = props.payload!;
  const {
    configuration,
    consentEntry,
    numbers,
    editableExternalNumber = false,
  } = payload;

  const [optStatus, setOptStatus] = useState<SMSOptStatus>(SMSOptStatus.OptIn);
  const [recordScope, setRecordScope] = useState<SmsConsentRecordScope>(() =>
    getDefaultSmsConsentRecordScope({
      configuration,
      optStatus: SMSOptStatus.OptIn,
    }),
  );
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [externalNumberInput, setExternalNumberInput] = useState(
    numbers.to ?? '',
  );
  const [externalNumberError, setExternalNumberError] = useState(false);

  useEffect(() => {
    setRecordScope(
      getDefaultSmsConsentRecordScope({
        configuration,
        optStatus,
      }),
    );
  }, [configuration, optStatus]);

  const campaignType = recordScope.campaignType ?? CAMPAIGN_TYPE_OPTIONS[0];
  const normalizedFrom = normalizeNumber(numbers.from);
  const effectiveExternalNumber = editableExternalNumber
    ? externalNumberInput
    : numbers.to;
  const normalizedTo = normalizeNumber(effectiveExternalNumber);
  const showRegisteredNumber =
    recordScope.coverage === SmsConsentCoverage.PhoneNumber;
  const showRegistrationType =
    recordScope.coverage === SmsConsentCoverage.CampaignType;
  const disabled =
    !canAddConsent ||
    !normalizedTo ||
    (showRegisteredNumber && !normalizedFrom) ||
    !notes.trim() ||
    saving;

  // Validate the manually typed external number on blur / save only, so the
  // error style does not flash while the user is still typing.
  const validateExternalNumber = () => {
    if (!editableExternalNumber) {
      return true;
    }
    const valid = isE164(normalizedTo) && isValidNumber(normalizedTo);
    setExternalNumberError(externalNumberInput.trim().length > 0 && !valid);
    return valid;
  };

  const onSave = async () => {
    if (editableExternalNumber && !validateExternalNumber()) {
      return;
    }
    if (!normalizedTo || (showRegisteredNumber && !normalizedFrom)) {
      return;
    }

    const normalizedNumbers = {
      from: normalizedFrom,
      to: normalizedTo,
    };

    trackEvent(
      'Int_SMS_addConsent',
      getSmsConsentRecordTrackProperties(
        {
          optStatus,
          coverage: recordScope.coverage,
          campaignType:
            recordScope.coverage === SmsConsentCoverage.CampaignType
              ? campaignType
              : undefined,
        },
        consentEntry,
      ),
    );

    setSaving(true);
    try {
      const success = await mounted(
        saveConsentRecord({
          numbers: normalizedNumbers,
          options: {
            from: normalizedFrom,
            to: normalizedTo,
            optStatus,
            coverage: recordScope.coverage,
            campaignType:
              recordScope.coverage === SmsConsentCoverage.CampaignType
                ? campaignType
                : undefined,
            notes: `${userNotePrefix} ${notes.trim()}`,
          },
        }),
      );
      if (success) {
        const completed = await onSaveSuccess(normalizedNumbers);
        if (completed) {
          action?.close();
        }
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <AddConsentPanel
      optStatus={optStatus}
      externalNumber={
        editableExternalNumber ? externalNumberInput : formatNumber(numbers.to)
      }
      registeredNumber={formatNumber(numbers.from)}
      campaignType={campaignType}
      showRegisteredNumber={showRegisteredNumber}
      showRegistrationType={showRegistrationType}
      notes={notes}
      saving={saving}
      disabled={disabled}
      editableExternalNumber={editableExternalNumber}
      externalNumberError={externalNumberError}
      onClose={() => action?.close()}
      onOptStatusChange={setOptStatus}
      onExternalNumberChange={(value) => {
        setExternalNumberInput(value);
        if (externalNumberError) {
          setExternalNumberError(false);
        }
      }}
      onExternalNumberBlur={validateExternalNumber}
      onCampaignTypeChange={(value) => {
        setRecordScope({
          coverage: SmsConsentCoverage.CampaignType,
          campaignType: value,
        });
      }}
      onNotesChange={setNotes}
      onSave={onSave}
    />
  );
};
