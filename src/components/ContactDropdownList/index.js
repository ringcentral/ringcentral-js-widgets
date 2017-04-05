import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import phoneTypes from '../../lib/phoneTypes';

function ContactItem(props) {
  const className = classnames(
    styles.contactItem,
    props.active ? styles.active : null,
  );
  return (
    <li className={className} onMouseOver={props.onHover}>
      <a href="#select-contact-item" onClick={props.onClick}>
        <div>
          <span className={styles.name}>
            {props.name}
          </span>
          <span className={styles.spliter}>|</span>
          <span className={styles.label}>
            {phoneTypes.getString(`phoneSource.${props.entityType}`)}
          </span>
        </div>
        <div className={styles.phoneNumberSection}>
          <span>
            {props.formatContactPhone(props.phoneNumber)}
          </span>
          <span className={styles.spliter}>|</span>
          <span className={styles.label}>
            { props.phoneType === 'unknown' ?
              phoneTypes.getString(`phoneType.${props.phoneType}`) : props.phoneType }
          </span>
        </div>
      </a>
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
        items.map((item, index) => (
          <ContactItem
            active={props.selectedIndex === index}
            name={item.name}
            entityType={item.entityType}
            phoneType={item.phoneType}
            phoneNumber={item.phoneNumber}
            formatContactPhone={props.formatContactPhone}
            onHover={() => props.setSelectedIndex(index)}
            onClick={() => props.addToRecipients({
              name: item.name,
              phoneNumber: item.phoneNumber,
            })}
            // eslint-disable-next-line react/no-array-index-key
            key={`${index}${item.phoneNumber}${item.name}${item.phoneType}`}
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
  formatContactPhone: PropTypes.func.isRequired,
  addToRecipients: PropTypes.func.isRequired,
  setSelectedIndex: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

ContactDropdownList.defaultProps = {
  className: null,
};

export default ContactDropdownList;
