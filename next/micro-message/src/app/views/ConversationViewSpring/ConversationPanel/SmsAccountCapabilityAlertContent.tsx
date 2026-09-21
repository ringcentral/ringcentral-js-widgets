import { HelpMd } from '@ringcentral/spring-icon';
import { Link, Icon } from '@ringcentral/spring-ui';
import React from 'react';

import type { SmsPermissionReason } from '../../../services';

import { t, type I18nKey } from './i18n';

const TCR_LEARN_MORE_URL =
  'https://support.ringcentral.com/article-v2/Setting-up-TCR-registration-assigning-numbers-to-SMS-campaigns.html?brand=RingCentral&product=MVP&language=en_US';

const smsPermissionReasonMap: Record<SmsPermissionReason, I18nKey> = {
  noComposePermission: 'smsNotEnabledAlert',
  noNumberAvailable: 'smsNoNumberAvailableAlert',
  receiveOnlyNumber: 'smsReceiveOnlyNumberAlert',
};

const showLearnMoreReasonSet = new Set<SmsPermissionReason>([
  'noNumberAvailable',
  'receiveOnlyNumber',
]);

export interface SmsAccountCapabilityAlertContentProps {
  reason: SmsPermissionReason;
  readOnly?: boolean;
  showIcon?: boolean;
}

export const SmsAccountCapabilityAlertContent = ({
  reason,
  readOnly = false,
  showIcon = false,
}: SmsAccountCapabilityAlertContentProps) => {
  return (
    <div
      className="flex items-center gap-1"
      data-sign="smsAccountCapabilityAlert"
    >
      {showIcon && <Icon symbol={HelpMd} size="small" />}
      <span>
        {readOnly ? `${t('readOnlyConversationPrefix')} ` : null}
        {t(smsPermissionReasonMap[reason])}
        {showLearnMoreReasonSet.has(reason) ? (
          <span className="pl-0.5">
            <Link href={TCR_LEARN_MORE_URL} target="_blank" variant="primary">
              {t('learnMore')}
            </Link>
          </span>
        ) : null}
      </span>
    </div>
  );
};
