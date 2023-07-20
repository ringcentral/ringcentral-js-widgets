import type { FunctionComponent } from 'react';
import React from 'react';

import phoneTypeNames from '../../lib/phoneTypeNames';
import type { RecipientPhoneProps } from './RecipientsInputV2.interface';
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
    ? // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      phoneTypeRenderer(phoneType)
    : // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      phoneTypeNames.getString(phoneType, currentLocale);
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
