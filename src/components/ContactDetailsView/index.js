import React from 'react';
import PropTypes from 'prop-types';
import SpinnerOverlay from '../../components/SpinnerOverlay';
import BackHeader from '../../components/BackHeader';
import Panel from '../../components/Panel';

import ContactDetails, { contactItemPropTypes } from '../ContactDetails';
import styles from './styles.scss';
import i18n from './i18n';

export default function ContactDetailsView({
  currentLocale,
  showSpinner,
  contactItem,
  getAvatarUrl,
  getPresence,
  onBackClick,
  onClickToSMS,
  onClickToDial,
  onClickToGmail,
}) {
  const content = showSpinner ?
    <SpinnerOverlay /> :
    (
      <ContactDetails
        currentLocale={currentLocale}
        getAvatarUrl={getAvatarUrl}
        getPresence={getPresence}
        contactItem={contactItem}
        onClickToSMS={onClickToSMS}
        onClickToDial={onClickToDial}
        onClickToGmail={onClickToGmail}
      />
    );

  return (
    <div className={styles.root}>
      <BackHeader
        buttons={[]}
        onBackClick={onBackClick}
      >
        {i18n.getString('contactDetails', currentLocale)}
      </BackHeader>
      <Panel className={styles.content}>
        {content}
      </Panel>
    </div>
  );
}

ContactDetailsView.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  contactItem: PropTypes.shape(contactItemPropTypes).isRequired,
  getAvatarUrl: PropTypes.func.isRequired,
  getPresence: PropTypes.func.isRequired,
  onBackClick: PropTypes.func,
  onClickToSMS: PropTypes.func,
  onClickToDial: PropTypes.func,
  onClickToGmail: PropTypes.func,
};

ContactDetailsView.defaultProps = {
  onBackClick: undefined,
  onClickToSMS: undefined,
  onClickToDial: undefined,
  onClickToGmail: undefined,
};
