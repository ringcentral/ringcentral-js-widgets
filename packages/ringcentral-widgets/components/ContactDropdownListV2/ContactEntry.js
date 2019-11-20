import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

import ContactInfo from './ContactInfo';
import ContactPhone from './ContactPhone';

export default function ContactEntry({
  active,
  contactInfoRenderer: ContactInfoRenderer,
  contactPhoneRenderer: ContactPhoneRenderer,
  currentLocale,
  entityType,
  formatContactPhone,
  name,
  onClick,
  onHover,
  phoneNumber,
  phoneSourceNameRenderer,
  phoneType,
  phoneTypeRenderer,
  splitter,
  enableTitle,
}) {
  const className = classnames(styles.contactItem, active && styles.active);
  return (
    <li className={className} onMouseOver={onHover}>
      <div className={styles.clickable} onClick={onClick}>
        <ContactInfoRenderer
          currentLocale={currentLocale}
          name={name}
          entityType={entityType}
          phoneType={phoneType}
          phoneNumber={phoneNumber}
          formatContactPhone={formatContactPhone}
          phoneTypeRenderer={phoneTypeRenderer}
          phoneSourceNameRenderer={phoneSourceNameRenderer}
          enableTitle={enableTitle}
          splitter={splitter}
        />
        <ContactPhoneRenderer
          currentLocale={currentLocale}
          name={name}
          entityType={entityType}
          phoneType={phoneType}
          phoneNumber={phoneNumber}
          formatContactPhone={formatContactPhone}
          phoneTypeRenderer={phoneTypeRenderer}
          phoneSourceNameRenderer={phoneSourceNameRenderer}
          enableTitle={enableTitle}
          splitter={splitter}
        />
      </div>
    </li>
  );
}
ContactEntry.propTypes = {
  active: PropTypes.bool.isRequired,
  contactInfoRenderer: PropTypes.func,
  contactPhoneRenderer: PropTypes.func,
  currentLocale: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
  formatContactPhone: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  phoneSourceNameRenderer: PropTypes.func,
  phoneType: PropTypes.string.isRequired,
  phoneTypeRenderer: PropTypes.func,
  splitter: PropTypes.string.isRequired,
  enableTitle: PropTypes.bool,
};
ContactEntry.defaultProps = {
  contactInfoRenderer: ContactInfo,
  contactPhoneRenderer: ContactPhone,
  phoneSourceNameRenderer: undefined,
  phoneTypeRenderer: undefined,
  enableTitle: undefined,
};
