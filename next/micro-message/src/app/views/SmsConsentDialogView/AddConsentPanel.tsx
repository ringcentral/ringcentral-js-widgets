import { InfoMd, Xmd } from '@ringcentral/spring-icon';
import {
  Button,
  ClickAwayListener,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormLabel,
  IconButton,
  Link,
  Option,
  Radio,
  RadioGroup,
  Select,
  Textarea,
  TextField,
  Tooltip,
} from '@ringcentral/spring-ui';
import React, { useState } from 'react';

import {
  CAMPAIGN_TYPE_OPTIONS,
  SMSOptStatus,
  SmsCampaignType,
} from '../../services';

import { t } from './i18n';
import { getSmsCampaignTypeLabel } from './SmsConsentDialog.helper';

const statusOptions = [SMSOptStatus.OptIn, SMSOptStatus.OptOut] as const;

const REGISTRATION_TYPE_LEARN_MORE_URL =
  'https://support.ringcentral.com/article-v2/SMS-consent-requirements-and-examples.html?brand=RingCentral&product=RingEX&language=en_US';

const RegistrationTypeTooltip = () => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      open={open}
      placement="bottom"
      title={
        <ClickAwayListener
          onClickAway={() => {
            setOpen(false);
          }}
        >
          <span>
            {t('registrationTypeTooltip')}
            <span className="pl-1">
              <Link
                href={REGISTRATION_TYPE_LEARN_MORE_URL}
                target="_blank"
                className="text-neutral-w0 hover:text-neutral-w0"
              >
                {t('learnMore')}
              </Link>
            </span>
          </span>
        </ClickAwayListener>
      }
    >
      <IconButton
        size="xsmall"
        color="secondary"
        variant="icon"
        data-sign="smsConsentRegistrationTypeTooltip"
        symbol={InfoMd}
        onClick={(e) => {
          e.preventDefault();
          setOpen((previous) => !previous);
        }}
      />
    </Tooltip>
  );
};

export interface AddConsentPanelProps {
  optStatus: SMSOptStatus;
  externalNumber: string;
  registeredNumber: string;
  campaignType: SmsCampaignType;
  showRegisteredNumber: boolean;
  showRegistrationType: boolean;
  notes: string;
  saving: boolean;
  disabled: boolean;
  /**
   * When true the External Number field becomes editable.
   * Defaults to a disabled, read-only field.
   */
  editableExternalNumber?: boolean;
  externalNumberError?: boolean;
  onClose: () => void;
  onOptStatusChange: (status: SMSOptStatus) => void;
  onExternalNumberChange?: (value: string) => void;
  onExternalNumberBlur?: () => void;
  onCampaignTypeChange: (campaignType: SmsCampaignType) => void;
  onNotesChange: (notes: string) => void;
  onSave: () => void;
}

export const AddConsentPanel = ({
  optStatus,
  externalNumber,
  registeredNumber,
  campaignType,
  showRegisteredNumber,
  showRegistrationType,
  notes,
  saving,
  disabled,
  editableExternalNumber = false,
  externalNumberError = false,
  onClose,
  onOptStatusChange,
  onExternalNumberChange,
  onExternalNumberBlur,
  onCampaignTypeChange,
  onNotesChange,
  onSave,
}: AddConsentPanelProps) => (
  <div className="flex flex-col overflow-hidden" style={{ maxHeight: '75vh' }}>
    <DialogTitle className="relative flex min-h-[48px] items-center justify-center px-12 py-3">
      <div
        className="typography-subtitleBold truncate text-neutral-b0"
        data-sign="smsConsentAddDialogTitle"
      >
        {t('addConsentTitle')}
      </div>
      <IconButton
        symbol={Xmd}
        size="small"
        variant="icon"
        color="secondary"
        className="absolute right-2 top-2"
        data-sign="smsConsentDialogCloseButton"
        disabled={saving}
        TooltipProps={{
          title: t('closeDialog'),
        }}
        onClick={onClose}
      />
    </DialogTitle>
    <DialogContent className="flex flex-col gap-3 pb-4">
      <div className="typography-mainText text-neutral-b0">
        {t('addConsentSubtitle')}
      </div>
      <div>
        <div className="typography-descriptorMini text-neutral-b0 mb-1">
          {t('consentStatus')}
        </div>
        <RadioGroup
          name="sms-consent-status"
          value={optStatus}
          onChange={(event) => {
            onOptStatusChange(event.target.value as SMSOptStatus);
          }}
          row
          className="gap-4"
        >
          {statusOptions.map((status) => (
            <FormLabel
              key={status}
              className="flex items-center typography-descriptorMini text-neutral-f06"
              label={status === SMSOptStatus.OptIn ? t('optIn') : t('optOut')}
              value={status}
            >
              <Radio name="sms-consent-status" />
            </FormLabel>
          ))}
        </RadioGroup>
      </div>
      <TextField
        label={t('externalNumber')}
        size="medium"
        value={externalNumber}
        fullWidth
        disabled={!editableExternalNumber}
        error={editableExternalNumber && externalNumberError}
        placeholder={editableExternalNumber ? t('enterNumber') : undefined}
        onChange={
          editableExternalNumber
            ? (event) => onExternalNumberChange?.(event.target.value)
            : undefined
        }
        onBlur={
          editableExternalNumber ? () => onExternalNumberBlur?.() : undefined
        }
        inputProps={{
          'data-sign': 'smsConsentExternalNumber',
        }}
      />
      {showRegisteredNumber ? (
        <TextField
          label={t('smsRegisteredNumber')}
          size="medium"
          value={registeredNumber}
          fullWidth
          disabled
          inputProps={{
            'data-sign': 'smsConsentRegisteredNumber',
          }}
        />
      ) : null}
      {showRegistrationType ? (
        <Select
          label={
            <span className="inline-flex items-center gap-1">
              <span>{t('registrationType')}</span>
              <RegistrationTypeTooltip />
            </span>
          }
          value={campaignType}
          onChange={({ target: { value } }) => {
            onCampaignTypeChange(value as SmsCampaignType);
          }}
          variant="outlined"
          size="medium"
          className="w-full"
          data-sign="smsConsentRegistrationTypeSelect"
        >
          {CAMPAIGN_TYPE_OPTIONS.slice()
            .reverse()
            .map((item) => (
              <Option key={item} value={item}>
                {getSmsCampaignTypeLabel(item)}
              </Option>
            ))}
        </Select>
      ) : null}
      <Textarea
        label={t('notes')}
        placeholder={t('notesPlaceholder')}
        value={notes}
        fullWidth
        maxRows={2}
        inputProps={{
          'data-sign': 'smsConsentNotesInput',
        }}
        showCharacterCount
        onChange={(event) => {
          onNotesChange(event.target.value);
        }}
      />
    </DialogContent>
    <Divider orientation="horizontal" flexItem />
    <DialogActions>
      <Button
        variant="contained"
        color="primary"
        data-sign="smsConsentSaveButton"
        loading={saving}
        disabled={disabled}
        onClick={onSave}
        fullWidth
        className="mb-3"
      >
        {t('save')}
      </Button>
    </DialogActions>
  </div>
);
