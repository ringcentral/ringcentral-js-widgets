import React, { FunctionComponent } from 'react';
import { RcText } from '@ringcentral/juno';
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
      <RcText
        variant="inherit"
        component="p"
        title={gateName}
        titleWhenOverflow
      >
        {gateName}
      </RcText>
      {gateId !== '-1' ? (
        <p className={styles.sub}>
          {i18n.getString('queueID', currentLocale)}: {gateId}
        </p>
      ) : null}
    </div>
  );
};

export { QueueLabel };
