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
      <p>Id: {contactItem.id}</p>
      <p>Type: {contactItem.type}</p>
      <p>Name: {`${contactItem.firstName} ${contactItem.lastName}`}</p>
      {
        contactItem.phoneNumbers.map(item => (
          <p>{item.phoneType}: {item.phoneNumber}</p>
        ))
      }
    </div>
  );
}

ContactDetails.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  contactItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    hasProfileImage: PropTypes.bool,
    phoneNumbers: PropTypes.arrayOf(PropTypes.shape({
      phoneNumber: PropTypes.string,
      phoneType: PropTypes.string,
    })),
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
