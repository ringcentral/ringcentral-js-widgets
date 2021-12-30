import React, { FunctionComponent } from 'react';

import phoneTypeNames from '../../lib/phoneTypeNames';
import { RecipientPhoneProps } from './RecipientsInputV2.interface';
import styles from './styles.scss';

export const RecipientPhone: FunctionComponent<RecipientPhoneProps> = ({
  currentLocale,
  formatContactPhone,
  phoneNumber,
  phoneType,
  phoneTypeRenderer,
  splitter,
  enableTitle,
}) => {
  const phoneTypeName = phoneTypeRenderer
    ? phoneTypeRenderer(phoneType)
    : phoneTypeNames.getString(phoneType, currentLocale);
  const title = enableTitle
    ? `${formatContactPhone(phoneNumber)} ${splitter} ${phoneTypeName}`
    : undefined;
  return (
    <div className={styles.phoneNumberSection} title={title}>
      <span>{formatContactPhone(phoneNumber)}</span>
      <span className={styles.splitter}>{splitter}</span>
      <span className={styles.label}>{phoneTypeName}</span>
    </div>
  );
};
