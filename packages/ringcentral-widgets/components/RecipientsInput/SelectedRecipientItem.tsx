import React, { FunctionComponent } from 'react';

import { RemoveButton } from '../RemoveButton';
import styles from './styles.scss';

type SelectedRecipientItemProps = {
  phoneNumber: string;
  name?: string;
  title?: string;
  onRemove: (...args: any[]) => any;
  isWarning?: boolean;
};
export const SelectedRecipientItem: FunctionComponent<SelectedRecipientItemProps> =
  ({
    phoneNumber,
    isWarning = false,
    name = phoneNumber,
    title = name,
    onRemove,
  }) => {
    let className =
      phoneNumber.length > 5 ? styles.phoneNumber : styles.extension;
    if (isWarning) className = styles.warningRecipient;

    return (
      <li className={className} title={title} data-sign="recipientItem">
        <span>{name}</span>
        <RemoveButton
          className={styles.removeReceiver}
          onClick={onRemove}
          visibility
          showWarningIcon={isWarning}
        />
      </li>
    );
  };
