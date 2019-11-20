import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import RemoveButton from '../RemoveButton';

function Recipient({
  phoneNumber,
  name = phoneNumber,
  title = name,
  onRemove,
}) {
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
}

Recipient.propTypes = {
  name: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  title: PropTypes.string,
};

Recipient.defaultProps = {
  name: undefined,
  title: undefined,
};

export default function SelectedRecipients({
  recipients,
  onRemove,
  className,
}) {
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
}

SelectedRecipients.propTypes = {
  onRemove: PropTypes.func.isRequired,
  recipients: PropTypes.arrayOf(
    PropTypes.shape({
      phoneNumber: PropTypes.string.isRequired,
      name: PropTypes.string,
    }),
  ).isRequired,
  className: PropTypes.string,
};

SelectedRecipients.defaultProps = {
  className: undefined,
};
