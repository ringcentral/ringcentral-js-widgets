import React, { FunctionComponent, MouseEvent } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import { RemoveButton } from '../RemoveButton';

export interface RecipientProps {
  phoneNumber: string;
  name?: string;
  title?: string;
  onRemove: (ev: MouseEvent) => void;
}

const Recipient: FunctionComponent<RecipientProps> = ({
  phoneNumber,
  name = phoneNumber,
  title = name,
  onRemove,
}) => {
  const className =
    phoneNumber.length > 5 ? styles.phoneNumber : styles.extension;
  return (
    <li className={className} title={title}>
      <span>{name}</span>
      <RemoveButton
        className={styles.removeReceiver}
        onClick={onRemove}
        visibility
      />
    </li>
  );
};

export interface BasicRecipientInfo {
  phoneNumber: string;
  name?: string;
}

export interface SelectedRecipientsProps {
  onRemove: (phoneNumber: string) => void;
  className?: string;
  recipients: BasicRecipientInfo[];
}

export const SelectedRecipients: FunctionComponent<SelectedRecipientsProps> = ({
  recipients,
  onRemove,
  className,
}) => {
  if (recipients.length) {
    return (
      <ul className={classnames(className, styles.selectReceivers)}>
        {recipients.map((item) => (
          <Recipient
            key={item.phoneNumber}
            name={item.name}
            phoneNumber={item.phoneNumber}
            onRemove={() => onRemove(item.phoneNumber)}
          />
        ))}
      </ul>
    );
  }
  return null;
};
