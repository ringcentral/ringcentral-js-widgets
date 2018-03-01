import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

import phoneTypeNames from '../../lib/phoneTypeNames';
import phoneSourceNames from '../../lib/phoneSourceNames';

const spliter = '|';

function ContactInfo({
  name,
  nameTitle,
  sourceName,
}) {
  return (
    <div className={styles.nameSection} title={nameTitle}>
      <span className={styles.name}>
        {name}
      </span>
      <span className={styles.spliter}>{spliter}</span>
      <span className={styles.label}>
        {sourceName}
      </span>
    </div>
  );
}
ContactInfo.propTypes = {
  name: PropTypes.string.isRequired,
  nameTitle: PropTypes.string,
  sourceName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};
ContactInfo.defaultProps = {
  nameTitle: undefined,
};

function ContactPhone({
  phoneNumber,
  phoneNumberTitle,
  phoneTypeName,
}) {
  return (
    <div className={styles.phoneNumberSection} title={phoneNumberTitle}>
      <span>
        {phoneNumber}
      </span>
      <span className={styles.spliter}>{spliter}</span>
      <span className={styles.label}>
        {phoneTypeName}
      </span>
    </div>
  );
}
ContactPhone.propTypes = {
  phoneNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  phoneNumberTitle: PropTypes.string,
  phoneTypeName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};
ContactPhone.defaultProps = {
  phoneNumberTitle: undefined,
};

function ContactItem(props) {
  const className = classnames(
    styles.contactItem,
    props.active ? styles.active : null,
  );
  let contactInfo;
  if (props.contactInfoRenderer) {
    contactInfo = props.contactInfoRenderer(props);
  } else {
    const phoneSourceName = phoneSourceNames.getString(props.entityType);
    const nameTitle = `${props.name} ${spliter} ${phoneSourceName}`;
    contactInfo = (
      <ContactInfo
        name={props.name}
        nameTitle={props.titleEnabled ? nameTitle : undefined}
        sourceName={phoneSourceName}
      />
    );
  }
  let contactPhone;
  if (props.contactPhoneRenderer) {
    contactPhone = props.contactPhoneRenderer(props);
  } else {
    const phoneTypeName = props.phoneTypeRenderer ?
      props.phoneTypeRenderer(props.phoneType) :
      phoneTypeNames.getString(props.phoneType);
    const phoneNumberTitle =
      `${props.formatContactPhone(props.phoneNumber)} ${spliter} ${phoneTypeName}`;
    contactPhone = (
      <ContactPhone
        phoneNumber={props.formatContactPhone(props.phoneNumber)}
        phoneNumberTitle={props.titleEnabled && phoneNumberTitle}
        phoneTypeName={phoneTypeName}
      />
    );
  }
  return (
    <li className={className} onMouseOver={props.onHover}>
      <div className={styles.clickable} onClick={props.onClick}>
        {contactInfo}
        {contactPhone}
      </div>
    </li>
  );
}
ContactItem.propTypes = {
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
