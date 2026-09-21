import { HelpMd } from '@ringcentral/spring-icon';
import { Link, Icon } from '@ringcentral/spring-ui';
import React from 'react';

import { t } from './i18n';

export interface SmsConsentRequiredAlertProps {
  canAddConsent?: boolean;
  onAddConsentClick?: () => void;
  multiple?: boolean;
}

export const SmsConsentRequiredAlert = ({
  canAddConsent = false,
  onAddConsentClick,
  multiple = false,
}: SmsConsentRequiredAlertProps) => (
  <div className="flex flex-row items-center gap-1">
    <Icon symbol={HelpMd} size="small" />
    <div>
      {t(multiple ? 'smsConsentRequiredMultiple' : 'smsConsentRequired')}
      {canAddConsent && !multiple ? (
        <Link
          variant="primary"
          className="block"
          onClick={onAddConsentClick}
          data-sign="smsConsentRequiredAddConsent"
        >
          {t('addConsent')}
        </Link>
      ) : null}
    </div>
  </div>
);
