import { ContactAvatar } from '@ringcentral-integration/micro-contacts/src/app/components';
import { PageHeaderBackButton } from '@ringcentral-integration/next-widgets/components';
import {
  CircleCheckFilledSm,
  CircleXFilledSm,
  ConsentMd,
} from '@ringcentral/spring-icon';
import {
  Badge,
  Block,
  Button,
  DialogContent,
  DialogTitle,
  Icon,
} from '@ringcentral/spring-ui';
import React, { type ReactNode } from 'react';

import {
  CAMPAIGN_LEVEL,
  SmsCampaignType,
  type SMSConsent,
  SmsConsentCoverage,
  SMSOptStatus,
} from '../../services';

import { t } from './i18n';
import {
  getSmsCampaignTypeLabel,
  getSmsConsentCoverageLabel,
  getSmsConsentSourceLabel,
  getSmsConsentStatusLabel,
} from './SmsConsentDialog.helper';

export interface DetailsPanelProps {
  record?: SMSConsent | null;
  phoneNumber: string;
  contactName?: string;
  canAddConsent: boolean;
  formatNumber: (phoneNumber?: string) => string;
  formatDate: (value?: string) => string;
  onClose: () => void;
  onAddConsent: () => void;
}

export const DetailsPanel = ({
  record,
  phoneNumber,
  contactName,
  canAddConsent,
  formatNumber,
  formatDate,
  onClose,
  onAddConsent,
}: DetailsPanelProps) => (
  <>
    <DialogTitle>
      <PageHeaderBackButton
        data-sign="viewConsentDetailsBackButton"
        onClick={onClose}
      />
    </DialogTitle>
    <DialogContent>
      <div className="flex flex-col gap-4">
        <ContactHeader phoneNumber={phoneNumber} contactName={contactName} />
        <Block className="flex flex-col gap-4 p-4">
          <div className="flex items-center gap-2">
            <Icon symbol={ConsentMd} size="small" className="text-neutral-b2" />
            <div className="typography-subtitle">{t('consentTitle')}</div>
          </div>
          {!record ? (
            <div className="typography-mainText text-neutral-b0">
              {t('noConsentRecord')}
            </div>
          ) : (
            <ConsentDetails
              record={record}
              formatNumber={formatNumber}
              formatDate={formatDate}
            />
          )}
          {canAddConsent ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                data-sign="smsConsentDetailsAddButton"
                onClick={onAddConsent}
              >
                {t('addConsent')}
              </Button>
            </div>
          ) : null}
        </Block>
      </div>
    </DialogContent>
  </>
);

const ContactHeader = ({
  phoneNumber,
  contactName,
}: {
  phoneNumber: string;
  contactName?: string;
}) => (
  <div className="flex flex-col items-center gap-3 pb-1">
    <ContactAvatar
      size="large"
      phoneNumber={phoneNumber}
      contactName={contactName}
    />
    <div>
      {contactName && (
        <div className="typography-title text-center text-neutral-b0">
          {contactName}
        </div>
      )}
      <div className="typography-mainText text-center text-neutral-b1">
        {phoneNumber}
      </div>
    </div>
  </div>
);

const ConsentDetails = ({
  record,
  formatNumber,
  formatDate,
}: {
  record: SMSConsent;
  formatNumber: (phoneNumber?: string) => string;
  formatDate: (value?: string) => string;
}) => (
  <>
    <div className="typography-mainText text-neutral-b0">
      {getConsentSummary(record, formatNumber)}
    </div>
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full justify-between gap-4">
        <div className="min-w-0 flex-1">
          <DetailField label={t('consentStatus')}>
            <ConsentStatusPill status={record.optStatus} />
          </DetailField>
        </div>
        <div className="min-w-0 flex-1">
          <DetailField label={t('dateCreated')} align="right">
            {formatDate(record.lastModifiedTime)}
          </DetailField>
        </div>
      </div>
      <div className="flex w-full justify-between gap-4">
        <div className="min-w-0 flex-1">
          <DetailField label={t('source')}>
            {getSmsConsentSourceLabel(record.source)}
          </DetailField>
        </div>
        <div className="min-w-0 flex-1">
          <DetailField label={t('coverage')} align="right">
            {getSmsConsentCoverageLabel(record.coverage)}
          </DetailField>
        </div>
      </div>
    </div>
    <DetailField label={t('notes')}>{record.notes}</DetailField>
    {record.coverage === SmsConsentCoverage.CampaignType &&
    record.campaignType ? (
      <CampaignCoverageList campaignType={record.campaignType} />
    ) : null}
  </>
);

function getConsentSummary(
  record: SMSConsent,
  formatNumber: (phoneNumber?: string) => string,
) {
  const hasOptedIn = record.optStatus === SMSOptStatus.OptIn;

  if (record.coverage === SmsConsentCoverage.PhoneNumber && record.from) {
    return t(hasOptedIn ? 'optInNumberSummary' : 'optOutNumberSummary', {
      rcNumber: formatNumber(record.from),
    });
  }

  return t(hasOptedIn ? 'contactGaveConsent' : 'contactOptedOut');
}

const ConsentStatusPill = ({ status }: { status: SMSOptStatus }) => {
  const hasOptedIn = status === SMSOptStatus.OptIn;

  return (
    <Badge
      count={getSmsConsentStatusLabel(status)}
      color={hasOptedIn ? 'success' : 'danger'}
      variant="contained"
      size="medium"
      classes={{
        content: 'p-3',
      }}
      data-sign="smsConsentStatusPill"
    />
  );
};

const CampaignCoverageList = ({
  campaignType,
}: {
  campaignType: SmsCampaignType;
}) => (
  <div className="mt-4 w-full">
    <div className="mb-1 typography-descriptor text-neutral-b2">
      {t('registrationType')}
    </div>
    <div className="flex flex-wrap gap-1">
      {Object.values(SmsCampaignType).map((item) => {
        const included = CAMPAIGN_LEVEL[item] <= CAMPAIGN_LEVEL[campaignType];
        const label = getSmsCampaignTypeLabel(item);
        return (
          <Block
            key={item}
            bordered
            borderRadius="small"
            className="inline-flex flex-row items-center gap-1 overflow-hidden px-1.5 py-1"
          >
            <Icon
              symbol={included ? CircleCheckFilledSm : CircleXFilledSm}
              size="xsmall"
              className={included ? 'text-success' : 'text-danger'}
              tabIndex={-1}
            />
            <span className="typography-mainText text-neutral-b0">{label}</span>
          </Block>
        );
      })}
    </div>
  </div>
);

const DetailField = ({
  label,
  children,
  align = 'left',
}: {
  label: string;
  children: ReactNode;
  align?: 'left' | 'right';
}) => (
  <div className={align === 'right' ? 'text-right' : ''}>
    <div className="typography-descriptor text-neutral-b2 mb-1">{label}</div>
    <div className="typography-mainText text-neutral-b0 whitespace-pre-line break-words">
      {children}
    </div>
  </div>
);
