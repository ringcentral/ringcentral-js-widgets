import React, { FunctionComponent } from 'react';

import phoneSourceNames from '../../lib/phoneSourceNames';
import { RecipientInfoProps } from './RecipientsInputV2.interface';
import styles from './styles.scss';

export const RecipientInfo: FunctionComponent<RecipientInfoProps> = ({
  currentLocale,
  name,
  entityType,
  enableTitle,
  phoneSourceNameRenderer,
  splitter,
}) => {
  const phoneSourceName = phoneSourceNameRenderer
    ? phoneSourceNameRenderer(entityType)
    : phoneSourceNames.getString(entityType, currentLocale);
  const title = enableTitle
    ? `${name} ${splitter} ${phoneSourceName}`
    : undefined;
  return (
    <div className={styles.nameSection} title={title}>
      <span className={styles.name}>{name}</span>
      <span className={styles.splitter}>{splitter}</span>
      <span className={styles.phoneSourceLabel}>{phoneSourceName}</span>
    </div>
  );
};
