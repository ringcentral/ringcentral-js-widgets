import React from 'react';

import { RcAlert, RcAlertProps } from '@ringcentral/juno';

import styles from './styles.scss';

type MeetingAlertProps = Pick<RcAlertProps, 'severity'> & {
  content: string;
};

export const MeetingAlert = ({ content, severity }: MeetingAlertProps) => (
  <div className={styles.wrapper}>
    <RcAlert severity={severity} className={styles.alert}>
      {content}
    </RcAlert>
  </div>
);
