import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

import phoneTypeNames from '../../lib/phoneTypeNames';
import phoneSourceNames from '../../lib/phoneSourceNames';

const spliter = '|';

function ContactInfo({
  name,
  entityType,
  titleEnabled,
}) {
  const phoneSourceName = phoneSourceNames.getString(entityType);
  const nameTitle = `${name} ${spliter} ${phoneSourceName}`;
  return (
    <div className={styles.nameSection} title={titleEnabled && nameTitle}>
      <span className={styles.name}>
        {name}
      </span>
      <span className={styles.spliter}>{spliter}</span>
      <span className={styles.label}>
        {phoneSourceName}
      </span>
    </div>
  );
}
ContactInfo.propTypes = {
  name: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
  titleEnabled: PropTypes.bool,
};
ContactInfo.defaultProps = {
  titleEnabled: undefined,
};

function ContactPhone({
  phoneType,
  phoneNumber,
  formatContactPhone,
  titleEnabled,
  phoneTypeRenderer,
}) {
  const phoneTypeName = phoneTypeRenderer ?
    phoneTypeRenderer(phoneType) :
    phoneTypeNames.getString(phoneType);
  const phoneNumberTitle =
    `${formatContactPhone(phoneNumber)} ${spliter} ${phoneTypeName}`;
  return (
    <div className={styles.phoneNumberSection} title={titleEnabled && phoneNumberTitle}>
      <span>
        {formatContactPhone(phoneNumber)}
      </span>
      <span className={styles.spliter}>{spliter}</span>
      <span className={styles.label}>
        {phoneTypeName}
      </span>
    </div>
  );
}
ContactPhone.propTypes = {
  phoneType: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  formatContactPhone: PropTypes.func.isRequired,
  titleEnabled: PropTypes.bool,
  phoneTypeRenderer: PropTypes.func,
};
ContactPhone.defaultProps = {
  titleEnabled: undefined,
  phoneTypeRenderer: undefined,
};

function ContactItem({
  currentLocale,
  active,
  onHover,
  onClick,
  name,
  entityType,
  phoneType,
  phoneNumber,
  formatContactPhone,
  titleEnabled,
  phoneTypeRenderer,
  contactInfoRenderer: ContactInfoRenderer,
  contactPhoneRenderer: ContactPhoneRenderer,
}) {
  const className = classnames(
    styles.contactItem,
    active ? styles.active : null,
  );
  if (!ContactInfoRenderer) {
    ContactInfoRenderer = ContactInfo;
  }
  if (!ContactPhoneRenderer) {
    ContactPhoneRenderer = ContactPhone;
  }
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
          titleEnabled={titleEnabled}
        />
        <ContactPhoneRenderer
          currentLocale={currentLocale}
          name={name}
          entityType={entityType}
          phoneType={phoneType}
          phoneNumber={phoneNumber}
          formatContactPhone={formatContactPhone}
          phoneTypeRenderer={phoneTypeRenderer}
          titleEnabled={titleEnabled}
        />
      </div>
    </li>
  );
}
ContactItem.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  formatContactPhone: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
  phoneType: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired,
  titleEnabled: PropTypes.bool,
  phoneTypeRenderer: PropTypes.func,
  contactInfoRenderer: PropTypes.func,
  contactPhoneRenderer: PropTypes.func,
};
ContactItem.defaultProps = {
  titleEnabled: undefined,
  phoneTypeRenderer: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined,
};

class ContactDropdownList extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.visibility || nextProps.items.length === 0) {
      return;
    }
    if (nextProps.scrollDirection === 'ArrowDown') {
      if (nextProps.selectedIndex < nextProps.items.length) {
        if (nextProps.selectedIndex > 4 && this.node) {
          this.node.scrollTop += 53;
          this.node.scrollTop = Math.floor(this.node.scrollTop / 53) * 53;
        }
      }
    }
    if (nextProps.scrollDirection === 'ArrowUp') {
      if (nextProps.selectedIndex > -1) {
        if ((nextProps.selectedIndex < nextProps.items.length - 4) && this.node) {
          this.node.scrollTop -= 53;
          this.node.scrollTop = Math.floor(this.node.scrollTop / 53) * 53;
        }
      }
    }
  }

  render() {
    const {
      currentLocale,
      className,
      listRef,
      items,
      selectedIndex,
      formatContactPhone,
      setSelectedIndex,
      addToRecipients,
      titleEnabled,
      visibility,
      phoneTypeRenderer,
      contactInfoRenderer,
      contactPhoneRenderer,
    } = this.props;
    if (!visibility || items.length === 0) {
      return null;
    }
    return (
      <ul
        className={classnames(styles.dropdownList, className)}
        ref={(c) => {
          this.node = c;
          if (typeof listRef === 'function') {
            listRef(c);
          }
        }}
      >
        {
          items.map((item, index) => (
            <ContactItem
              currentLocale={currentLocale}
              active={selectedIndex === index}
              name={item.name}
              entityType={item.entityType}
              phoneType={item.phoneType}
              phoneNumber={item.phoneNumber}
              phoneTypeRenderer={phoneTypeRenderer}
              formatContactPhone={formatContactPhone}
              onHover={() => setSelectedIndex(index)}
              onClick={() => addToRecipients(item)}
              key={`${index}${item.phoneNumber}${item.name}${item.phoneType}`}
              titleEnabled={titleEnabled}
              contactInfoRenderer={contactInfoRenderer}
              contactPhoneRenderer={contactPhoneRenderer}
            />
          ))
        }
      </ul>
    );
  }
}

ContactDropdownList.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  scrollDirection: PropTypes.string,
  visibility: PropTypes.bool.isRequired,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  })).isRequired,
  formatContactPhone: PropTypes.func.isRequired,
  addToRecipients: PropTypes.func.isRequired,
  setSelectedIndex: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  titleEnabled: PropTypes.bool,
  listRef: PropTypes.func,
  phoneTypeRenderer: PropTypes.func,
  contactInfoRenderer: PropTypes.func,
  contactPhoneRenderer: PropTypes.func,
};

ContactDropdownList.defaultProps = {
  className: null,
  scrollDirection: null,
  titleEnabled: undefined,
  listRef: undefined,
  phoneTypeRenderer: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined,
};

export default ContactDropdownList;
