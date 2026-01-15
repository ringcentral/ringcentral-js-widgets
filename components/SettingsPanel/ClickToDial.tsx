import type { FunctionComponent } from 'react';
import React from 'react';

import IconLine from '../IconLine';
import Switch from '../Switch';

import type { ClickToDialProps } from './SettingsPanel.interface';
import { t } from './i18n';

export const ClickToDial: FunctionComponent<ClickToDialProps> = ({
  currentLocale,
  showClickToDial,
  outboundSMS: clickToTextPermission,
  clickToCallPermission,
  clickToDialEnabled,
  onClickToDialChange,
  clickToDialTitle,
}) => {
  let displayText;
  if (clickToTextPermission && clickToCallPermission) {
    displayText = t('clickToDialSMS', currentLocale);
  } else if (!clickToTextPermission && clickToCallPermission) {
    displayText = t('clickToDial', currentLocale);
  } else if (clickToTextPermission && !clickToCallPermission) {
    displayText = t('clickToSMS', currentLocale);
  } else {
    displayText = '';
  }
  if (showClickToDial && (clickToTextPermission || clickToCallPermission)) {
    return (
      <IconLine
        dataSign="clickToDialSMS"
        icon={
          <Switch
            dataSign="switchClickToDialSMS"
            checked={clickToDialEnabled}
            onChange={onClickToDialChange}
          />
        }
        title={clickToDialTitle}
      >
        {displayText}
      </IconLine>
    );
  }
  return null;
};
