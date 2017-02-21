import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import i18n from './i18n';

function ContactItem(props) {
  return (
    <li
    >
      <a href="#select-contact-item" onClick={props.onClick}>
        <div>
          <span>
            {props.name}
          </span>
          <span className={styles.label}>
            {i18n.getString(`phoneSource.${props.entityType}`)}
          </span>
        </div>
        <div className={styles.phoneNumberSection}>
          <span>
            {props.formatPhone(props.phoneNumber)}
          </span>
          <span className={styles.label}>
            {i18n.getString(`phoneType.${props.phoneType}`)}
          </span>
        </div>
      </a>
    </li>
  );
}

ContactItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
  phoneType: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

function ContactDropdownList(props) {
  const items = props.items;
  let listClassName = null;
  let hiddenClassName = null;
  if (items.length === 0 || !props.visibility) {
    hiddenClassName = styles.hidden;
  }
  listClassName = classnames(styles.dropdownList, props.className, hiddenClassName);
  return (
    <ul className={listClassName}>
      {
        items.map(item => (
          <ContactItem
            name={item.name}
            entityType={item.entityType}
            phoneType={item.phoneType}
            phoneNumber={item.phoneNumber}
            formatPhone={props.formatPhone}
            onClick={() => props.addToRecipients({
              name: item.name,
              phoneNumber: item.phoneNumber,
            })}
            key={JSON.stringify(item)}
          />
        ))
      }
    </ul>
  );
}

ContactDropdownList.propTypes = {
  visibility: PropTypes.bool.isRequired,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  })).isRequired,
  formatPhone: PropTypes.func.isRequired,
  addToRecipients: PropTypes.func.isRequired,
};

ContactDropdownList.defaultProps = {
  className: null,
};

export default ContactDropdownList;
