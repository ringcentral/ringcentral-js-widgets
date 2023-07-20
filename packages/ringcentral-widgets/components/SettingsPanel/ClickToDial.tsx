import type { FunctionComponent } from 'react';
import React from 'react';

import IconLine from '../IconLine';
import Switch from '../Switch';
import i18n from './i18n';
import type { ClickToDialProps } from './SettingsPanel.interface';

export const ClickToDial: FunctionComponent<ClickToDialProps> = ({
  currentLocale,
  showClickToDial,
  outboundSMS,
  clickToDialPermissions,
  clickToDialEnabled,
  onClickToDialChange,
  clickToDialTitle,
}) => {
  let clickToDialText;
  if (outboundSMS && clickToDialPermissions) {
    clickToDialText = i18n.getString('clickToDialSMS', currentLocale);
  } else if (!outboundSMS && clickToDialPermissions) {
    clickToDialText = i18n.getString('clickToDial', currentLocale);
  } else if (outboundSMS && !clickToDialPermissions) {
    clickToDialText = i18n.getString('clickToSMS', currentLocale);
  } else {
    clickToDialText = '';
  }
  if (showClickToDial && (outboundSMS || clickToDialPermissions)) {
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
        {clickToDialText}
      </IconLine>
    );
  }
  return null;
};
