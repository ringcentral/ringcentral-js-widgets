import React, { FunctionComponent } from 'react';
import i18n from '../i18n';
import styles from './styles.scss';

export interface QueueLabelProps {
  gateName: string;
  gateId: string;
  currentLocale: string;
}

const QueueLabel: FunctionComponent<QueueLabelProps> = ({
  gateName,
  gateId,
  currentLocale,
}) => {
  return (
    <div className={styles.item}>
      <p>{gateName}</p>
      {gateId !== '-1' ? (
        <p className={styles.sub}>
          {i18n.getString('queueID', currentLocale)}: {gateId}
        </p>
      ) : null}
    </div>
  );
};

export { QueueLabel };
