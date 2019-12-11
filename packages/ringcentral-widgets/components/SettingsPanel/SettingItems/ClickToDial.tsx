import React, { FunctionComponent } from 'react';

import IconLine from '../../IconLine';
import Switch from '../../Switch';
import i18n from '../i18n';

export interface ClickToDialProps {
  currentLocale: string;
  showClickToDial?: boolean;
  outboundSMS?: boolean;
  clickToDialPermissions?: boolean;
  clickToDialEnabled?: boolean;
  clickToDialTitle?: string;
  onClickToDialChange?(enableClickToDial: boolean): any;
}

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
        icon={
          <Switch checked={clickToDialEnabled} onChange={onClickToDialChange} />
        }
        title={clickToDialTitle}
      >
        {clickToDialText}
      </IconLine>
    );
  }
  return null;
};
