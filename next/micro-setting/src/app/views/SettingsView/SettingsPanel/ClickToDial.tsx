import { Line } from '@ringcentral-integration/next-widgets/components';
import { Switch } from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React from 'react';

import { ClickToDialProps } from '../Settings.view.interface';

import { t } from './i18n';

export const ClickToDial: FunctionComponent<ClickToDialProps> = ({
  showClickToDial,
  outboundSMS: clickToTextPermission,
  clickToCallPermission,
  clickToDialEnabled,
  onClickToDialChange,
  clickToDialTitle,
}) => {
  let displayText;
  if (clickToTextPermission && clickToCallPermission) {
    displayText = t('clickToDialSMS');
  } else if (!clickToTextPermission && clickToCallPermission) {
    displayText = t('clickToDial');
  } else if (clickToTextPermission && !clickToCallPermission) {
    displayText = t('clickToSMS');
  } else {
    displayText = '';
  }
  if (showClickToDial && (clickToTextPermission || clickToCallPermission)) {
    return (
      <Line
        data-sign="clickToDialSMS"
        icon={
          <Switch
            data-sign={'switchClickToDialSMS'}
            checked={clickToDialEnabled}
            onChange={(e) => onClickToDialChange?.(e.target.checked)}
          />
        }
        title={clickToDialTitle}
      >
        {displayText}
      </Line>
    );
  }
  return null;
};
