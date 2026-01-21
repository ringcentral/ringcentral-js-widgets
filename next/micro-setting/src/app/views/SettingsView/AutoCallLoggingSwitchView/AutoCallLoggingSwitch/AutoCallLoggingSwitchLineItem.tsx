import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { SwitchLine } from '@ringcentral-integration/next-widgets/components';
import { InfoMd } from '@ringcentral/spring-icon';
import { Icon, Link, Tooltip } from '@ringcentral/spring-ui';
import React, { FunctionComponent, useMemo } from 'react';

import i18n from './i18n';

export interface AutoCallLoggingSwitchLineItemProps {
  isAdmin: boolean;
  localAutoLog: boolean;
  onChange?: (checked: boolean) => void;
  remoteAutoLog: boolean;
  onAutoCallLogSettingLinkClick?: () => void;
  featureEnabled?: boolean;
  disableAutoLogControl: boolean;
}
export const AutoCallLoggingSwitchLineItem: FunctionComponent<
  AutoCallLoggingSwitchLineItemProps
> = ({
  isAdmin,
  remoteAutoLog,
  localAutoLog,
  onChange,
  onAutoCallLogSettingLinkClick,
  featureEnabled,
  disableAutoLogControl,
}) => {
  const { t } = useLocale(i18n);

  const externalLinkTitle = useMemo(() => {
    if (remoteAutoLog)
      return isAdmin ? t('adminLinkTitle') : t('seeAdminConfigurations');

    return t('endUserLinkTitle');
  }, [remoteAutoLog, isAdmin, t]);

  return (
    <SwitchLine
      data-sign="AutoLogCall"
      checked={
        // when server side AAL is enabled, the switch line item should be checked
        remoteAutoLog || localAutoLog
      }
      disabled={remoteAutoLog || disableAutoLogControl}
      onChange={onChange}
    >
      <div>
        <div className="flex items-center gap-1">
          {t('autoLogCalls')}

          {remoteAutoLog && (
            <Tooltip title={t('autoLogCallTooltipText')}>
              <Icon
                data-sign="AutoLogCall_tooltip"
                size="small"
                symbol={InfoMd}
                onClick={(e) => {
                  e.preventDefault();
                }}
              />
            </Tooltip>
          )}
        </div>

        {featureEnabled && (
          <Link
            onClick={onAutoCallLogSettingLinkClick}
            data-sign="aal-external-link"
            className="flex items-center gap-1 mt-1 typography-descriptor"
          >
            {externalLinkTitle}
          </Link>
        )}
      </div>
    </SwitchLine>
  );
};
