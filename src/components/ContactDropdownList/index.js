import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

import phoneTypeNames from '../../lib/phoneTypeNames';
import phoneSourceNames from '../../lib/phoneSourceNames';

function ContactItem(props) {
  const className = classnames(
    styles.contactItem,
    props.active ? styles.active : null,
  );
  const spliter = '|';
  const phoneTypeName = props.phoneTypeRenderer ?
    props.phoneTypeRenderer(props.phoneType) :
    phoneTypeNames.getString(props.phoneType);
  const phoneSourceName = phoneSourceNames.getString(props.entityType);
  const nameTitle = `${props.name} ${spliter} ${phoneSourceName}`;
  const phoneNumberTitle =
    `${props.formatContactPhone(props.phoneNumber)} ${spliter} ${phoneTypeName}`;

  return (
    <li className={className} onMouseOver={props.onHover}>
      <div className={styles.clickable} onClick={props.onClick}>
        <div className={styles.nameSection} title={props.titleEnabled && nameTitle}>
          <span className={styles.name}>
            {props.name}
          </span>
          <span className={styles.spliter}>{spliter}</span>
          <span className={styles.label}>
            {phoneSourceName}
          </span>
        </div>
        <div className={styles.phoneNumberSection} title={props.titleEnabled && phoneNumberTitle}>
          <span>
            {props.formatContactPhone(props.phoneNumber)}
          </span>
          <span className={styles.spliter}>{spliter}</span>
          <span className={styles.label}>
            {phoneTypeName}
          </span>
        </div>
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
};
ContactItem.defaultProps = {
  titleEnabled: undefined,
  phoneTypeRenderer: undefined,
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
  phoneTypeRenderer: PropTypes.func,
  listRef: PropTypes.func,
};

ContactDropdownList.defaultProps = {
  className: null,
  scrollDirection: null,
  titleEnabled: undefined,
  phoneTypeRenderer: undefined,
  listRef: undefined,
};

export default ContactDropdownList;
