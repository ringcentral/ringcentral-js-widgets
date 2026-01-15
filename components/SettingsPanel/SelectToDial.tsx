import { RcIconButton } from '@ringcentral/juno';
import { InfoBorder } from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React from 'react';

import IconLine from '../IconLine';
import Switch from '../Switch';

import type { SelectToDialProps } from './SettingsPanel.interface';
import { t } from './i18n';
import styles from './styles.scss';

export const SelectToDial: FunctionComponent<SelectToDialProps> = ({
  currentLocale,
  showSelectToDial,
  smsPermission,
  callPermission,
  selectToDialEnabled,
  onSelectToDialChange,
  selectToDialTitle,
}) => {
  let displayText;
  if (smsPermission && callPermission) {
    displayText = t('selectToDialSMS', currentLocale);
  } else if (!smsPermission && callPermission) {
    displayText = t('selectToDial', currentLocale);
  } else if (smsPermission && !callPermission) {
    displayText = t('selectToSMS', currentLocale);
  } else {
    displayText = '';
  }
  if (showSelectToDial && (smsPermission || callPermission)) {
    return (
      <IconLine
        dataSign="selectToDialSMS"
        icon={
          <Switch
            dataSign="switchSelectToDialSMS"
            checked={selectToDialEnabled}
            onChange={onSelectToDialChange}
          />
        }
        title={selectToDialTitle}
      >
        {displayText}
        <RcIconButton
          className={styles.tooltipIcon2}
          variant="plain"
          size="small"
          title={t('selectToDialHint')}
          data-sign="selectToDialHint"
          symbol={InfoBorder}
        />
      </IconLine>
    );
  }
  return null;
};
