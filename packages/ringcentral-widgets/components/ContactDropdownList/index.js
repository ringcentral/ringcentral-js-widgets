import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { RcIcon } from '@ringcentral/juno';
import { Blocked } from '@ringcentral/juno/icon';
import { Tooltip } from '../Rcui/Tooltip';
import styles from './styles.scss';
import i18n from './i18n';

import phoneTypeNames from '../../lib/phoneTypeNames';
import phoneSourceNames from '../../lib/phoneSourceNames';

const spliter = '|';

const ContactInfo = ({
  name,
  entityType,
  titleEnabled,
  phoneSourceNameRenderer,
  doNotCall,
}) => {
  const phoneSourceName = phoneSourceNameRenderer
    ? phoneSourceNameRenderer(entityType)
    : phoneSourceNames.getString(entityType);
  const nameTitle = `${name} ${spliter} ${phoneSourceName}`;
  return (
    <div
      className={classnames(styles.nameSection, {
        [styles.dncNameSection]: doNotCall,
      })}
      title={titleEnabled && nameTitle}
      data-sign="contactNameSection"
    >
      <span className={styles.name}>{name}</span>
      <span className={styles.spliter}>{spliter}</span>
      <span className={styles.label}>{phoneSourceName}</span>
    </div>
  );
};
ContactInfo.propTypes = {
  name: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
  titleEnabled: PropTypes.bool,
  phoneSourceNameRenderer: PropTypes.func,
  doNotCall: PropTypes.bool,
};
ContactInfo.defaultProps = {
  titleEnabled: undefined,
  phoneSourceNameRenderer: undefined,
  doNotCall: false,
};

const DoNotCallIndicator = ({ doNotCall, currentLocale }) => {
  if (!doNotCall) return null;
  return (
    <Tooltip title={i18n.getString('doNotCall', currentLocale)}>
      <div className={styles.doNotCall} data-sign="doNotCall">
        <RcIcon symbol={Blocked} size="xsmall" />
      </div>
    </Tooltip>
  );
};
DoNotCallIndicator.propTypes = {
  doNotCall: PropTypes.bool,
  currentLocale: PropTypes.string.isRequired,
};
DoNotCallIndicator.defaultProps = {
  doNotCall: false,
};

const ContactPhone = ({
  phoneType,
  phoneNumber,
  formatContactPhone,
  titleEnabled,
  phoneTypeRenderer,
}) => {
  const phoneTypeName = phoneTypeRenderer
    ? phoneTypeRenderer(phoneType)
    : phoneTypeNames.getString(phoneType);
  const phoneNumberTitle = `${formatContactPhone(
    phoneNumber,
  )} ${spliter} ${phoneTypeName}`;
  return (
    <div
      className={styles.phoneNumberSection}
      title={titleEnabled && phoneNumberTitle}
    >
      <span data-sign="dropDownContactPhone">
        {formatContactPhone(phoneNumber)}
      </span>
      <span className={styles.spliter}>{spliter}</span>
      <span className={styles.label}>{phoneTypeName}</span>
    </div>
  );
};
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

const ContactItem = ({
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
  doNotCall,
  phoneTypeRenderer,
  phoneSourceNameRenderer,
  contactInfoRenderer: ContactInfoRenderer,
  contactPhoneRenderer: ContactPhoneRenderer,
}) => {
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
    <li className={className} onMouseOver={onHover} data-sign="contactItem">
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
          titleEnabled={titleEnabled}
          doNotCall={doNotCall}
        />
        <DoNotCallIndicator
          doNotCall={doNotCall}
          currentLocale={currentLocale}
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
          titleEnabled={titleEnabled}
        />
      </div>
    </li>
  );
};
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
  phoneSourceNameRenderer: PropTypes.func,
  contactInfoRenderer: PropTypes.func,
  contactPhoneRenderer: PropTypes.func,
  doNotCall: PropTypes.bool,
};
ContactItem.defaultProps = {
  titleEnabled: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined,
  doNotCall: false,
};

class ContactDropdownList extends Component {
  // eslint-disable-next-line react/no-deprecated
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
        if (nextProps.selectedIndex < nextProps.items.length - 4 && this.node) {
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
      phoneSourceNameRenderer,
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
        data-sign="contactDropdownList"
      >
        {items.map((item, index) => (
          <ContactItem
            currentLocale={currentLocale}
            active={selectedIndex === index}
            name={item.name}
            entityType={item.entityType}
            phoneType={item.phoneType}
            phoneNumber={item.phoneNumber}
            phoneTypeRenderer={phoneTypeRenderer}
            phoneSourceNameRenderer={phoneSourceNameRenderer}
            formatContactPhone={formatContactPhone}
            onHover={() => setSelectedIndex(index)}
            onClick={() => addToRecipients(item)}
            key={`${index}${item.phoneNumber}${item.name}${item.phoneType}`}
            titleEnabled={titleEnabled}
            contactInfoRenderer={contactInfoRenderer}
            contactPhoneRenderer={contactPhoneRenderer}
            doNotCall={item.doNotCall}
          />
        ))}
      </ul>
    );
  }
}

ContactDropdownList.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  scrollDirection: PropTypes.string,
  visibility: PropTypes.bool.isRequired,
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      entityType: PropTypes.string.isRequired,
      phoneType: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }),
  ).isRequired,
  formatContactPhone: PropTypes.func.isRequired,
  addToRecipients: PropTypes.func.isRequired,
  setSelectedIndex: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  titleEnabled: PropTypes.bool,
  listRef: PropTypes.func,
  phoneTypeRenderer: PropTypes.func,
  phoneSourceNameRenderer: PropTypes.func,
  contactInfoRenderer: PropTypes.func,
  contactPhoneRenderer: PropTypes.func,
};

ContactDropdownList.defaultProps = {
  className: null,
  scrollDirection: null,
  titleEnabled: undefined,
  listRef: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined,
};

export default ContactDropdownList;
