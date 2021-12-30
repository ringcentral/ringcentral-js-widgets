import React from 'react';

import { RcIcon } from '@ringcentral/juno';
import { Blocked } from '@ringcentral/juno/icon';

import { Tooltip } from '../Rcui/Tooltip';
import i18n from './i18n';
import styles from './styles.scss';

type DoNotCallIndicatorProps = {
  doNotCall?: boolean;
  currentLocale: string;
};

export const DoNotCallIndicator: React.FC<DoNotCallIndicatorProps> = ({
  doNotCall,
  currentLocale,
}) => {
  if (!doNotCall) return null;
  return (
    <Tooltip title={i18n.getString('doNotCall', currentLocale)}>
      <div className={styles.doNotCall} data-sign="doNotCall">
        <RcIcon color="neutral.f04" symbol={Blocked} size="xsmall" />
      </div>
    </Tooltip>
  );
};

DoNotCallIndicator.defaultProps = {
  doNotCall: false,
};
