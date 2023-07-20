import type { FunctionComponent } from 'react';
import React from 'react';

import { Button } from '../Button';
import i18n from './i18n';
import styles from './styles.scss';

export type CallInfoBarProps = {
  label: string;
  onClick?: () => void;
  currentLocale: string;
  shouldDisplayViewCallsBtn: boolean;
  useV2: boolean;
  dataSign: string;
};

export const CallInfoBar: FunctionComponent<CallInfoBarProps> = ({
  label = '',
  onClick,
  currentLocale = '',
  shouldDisplayViewCallsBtn = false,
  useV2 = false,
  dataSign = '',
}) => {
  const buttonText = useV2 ? 'view' : 'viewCalls';
  return (
    <div className={useV2 ? styles.callInfoBarV2 : styles.bar}>
      <div
        className={styles.currentCallInfo}
        title={label}
        onClick={onClick}
        data-sign={dataSign}
      >
        {label}
      </div>
      {shouldDisplayViewCallsBtn ? (
        <Button
          className={styles.viewCallsBtn}
          tooltip={i18n.getString(buttonText, currentLocale)}
          onClick={onClick}
          dataSign="viewCalls"
        >
          {i18n.getString(buttonText, currentLocale)}
        </Button>
      ) : null}
    </div>
  );
};
