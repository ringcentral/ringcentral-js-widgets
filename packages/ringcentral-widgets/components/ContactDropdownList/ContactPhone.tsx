import React from 'react';

import phoneTypeNames from '../../lib/phoneTypeNames';

import { splitter } from './splitter';
import styles from './styles.scss';

type ContactPhoneProps = {
  phoneType: string;
  phoneNumber: string;
  formatContactPhone: (...args: any[]) => any;
  titleEnabled?: boolean;
  phoneTypeRenderer?: (...args: any[]) => any;
};

export const ContactPhone: React.FC<ContactPhoneProps> = ({
  phoneType,
  phoneNumber,
  formatContactPhone,
  titleEnabled,
  phoneTypeRenderer,
}) => {
  const phoneTypeName = phoneTypeRenderer
    ? phoneTypeRenderer(phoneType)
    : phoneTypeNames.getString(phoneType);
  const phoneNumberTitle = phoneTypeName
    ? `${formatContactPhone(phoneNumber)} ${splitter} ${phoneTypeName}`
    : formatContactPhone(phoneNumber);
  return (
    <div
      className={styles.phoneNumberSection}
      title={titleEnabled && phoneNumberTitle}
    >
      <span data-sign="dropDownContactPhone">
        {formatContactPhone(phoneNumber)}
      </span>
      {phoneTypeName && <span className={styles.splitter}>{splitter}</span>}
      <span className={styles.label}>{phoneTypeName}</span>
    </div>
  );
};

ContactPhone.defaultProps = {
  titleEnabled: undefined,
  phoneTypeRenderer: undefined,
};
