import {
  Line,
  Tooltip,
} from '@ringcentral-integration/next-widgets/components';
import { InfoMd } from '@ringcentral/spring-icon';
import { Icon, Switch } from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React from 'react';

import { SelectToDialProps } from '../Settings.view.interface';

import { t } from './i18n';

export const SelectToDial: FunctionComponent<SelectToDialProps> = ({
  showSelectToDial,
  smsPermission,
  callPermission,
  selectToDialEnabled,
  onSelectToDialChange,
  selectToDialTitle,
}) => {
  let displayText;
  if (smsPermission && callPermission) {
    displayText = t('selectToDialSMS');
  } else if (!smsPermission && callPermission) {
    displayText = t('selectToDial');
  } else if (smsPermission && !callPermission) {
    displayText = t('selectToSMS');
  } else {
    displayText = '';
  }
  if (showSelectToDial && (smsPermission || callPermission)) {
    return (
      <Line
        data-sign="selectToDialSMS"
        icon={
          <Switch
            data-sign={'switchSelectToDialSMS'}
            checked={selectToDialEnabled}
            onChange={(e) => onSelectToDialChange?.(e.target.checked)}
          />
        }
        title={selectToDialTitle}
      >
        {displayText}
        <Tooltip title={t('selectToDialHint')}>
          <Icon size="small" symbol={InfoMd} data-sign="selectToDialHint" />
        </Tooltip>
      </Line>
    );
  }
  return null;
};
