import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

export default function ContactDetails({
  currentLocale,
  contactItem,
  getAvatarUrl,
  getPresence,
  onClickToSMS,
  onClickToDial,
  onClickToGmail,
}) {
  return (
    <div className={styles.root}>
      <p>Contact Id: {contactItem.id}</p>
      <p>Contact Name: {contactItem.name}</p>
    </div>
  );
}

ContactDetails.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  contactItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  getAvatarUrl: PropTypes.func.isRequired,
  getPresence: PropTypes.func.isRequired,
  onClickToSMS: PropTypes.func,
  onClickToDial: PropTypes.func,
  onClickToGmail: PropTypes.func,
};

ContactDetails.defaultProps = {
  onClickToSMS: undefined,
  onClickToDial: undefined,
  onClickToGmail: undefined,
};
