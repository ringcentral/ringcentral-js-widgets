import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import { SelectedRecipientItem } from './SelectedRecipientItem';
import styles from './styles.scss';

type SelectedRecipientsProps = {
  onRemove: (...args: any[]) => any;
  recipient?: {
    phoneNumber: string;
    name?: string;
  };
  recipients: {
    phoneNumber: string;
    name?: string;
  }[];
  multiple: boolean;
  className?: string;
};
export const SelectedRecipients: FunctionComponent<SelectedRecipientsProps> = ({
  recipient,
  recipients,
  multiple,
  onRemove,
  className,
}) => {
  if (multiple && recipients.length) {
    return (
      <ul className={classnames(className, styles.selectReceivers)}>
        {recipients.map((item) => (
          <SelectedRecipientItem
            {...item}
            key={item.phoneNumber}
            name={item.name}
            phoneNumber={item.phoneNumber}
            onRemove={() => onRemove(item.phoneNumber)}
          />
        ))}
      </ul>
    );
  }
  if (!multiple && recipient) {
    return (
      <ul className={classnames(className, styles.selectReceivers)}>
        <SelectedRecipientItem
          {...recipient}
          key={recipient.phoneNumber}
          name={recipient.name}
          phoneNumber={recipient.phoneNumber}
          onRemove={() => onRemove(recipient.phoneNumber)}
        />
      </ul>
    );
  }
  return null;
};
