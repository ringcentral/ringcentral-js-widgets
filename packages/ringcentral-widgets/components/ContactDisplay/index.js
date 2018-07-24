import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import formatMessage from 'format-message';
import DropdownSelect from '../DropdownSelect';
import i18n from './i18n';
import styles from './styles.scss';
import phoneSourceNames from '../../lib/phoneSourceNames';
import phoneSources from '../../enums/phoneSources';

const displayFormatter = ({
  entityName,
  entityType,
  phoneNumber,
  currentLocale,
  brand,
}) => {
  let typeName;
  if (entityType) {
    typeName = formatMessage(
      phoneSourceNames.getString(entityType, currentLocale),
      { brand }
    );
  }
  if (phoneNumber && entityName && entityType) {
    return `${entityName} | ${typeName} ${phoneNumber}`;
  } else if (entityName && entityType) {
    return `${entityName} | ${typeName}`;
  } else if (entityName) {
    return entityName;
  } else if (phoneNumber) {
    return `${phoneNumber}`;
  }
  return '';
};

function ContactDisplayItem({
  entityName,
  entityType,
  phoneNumber,
  sourceIcons
}) {
  let SourceIcon = null;
  if (entityType) {
    if (entityType === phoneSources.rcContact) {
      SourceIcon = sourceIcons.brandIcon;
    } else {
      SourceIcon = sourceIcons[entityType];
    }
  }
  if (phoneNumber && entityName !== undefined && SourceIcon) {
    return (
      <span>
        <SourceIcon className={styles.typeIcon} width={10} height={10} />
        <span className={styles.typeName}>{entityName}</span>
      </span>
    );
  } else if (entityName !== undefined && SourceIcon) {
    return (
      <span>
        <SourceIcon className={styles.typeIcon} width={10} height={10} />
        <span className={styles.typeName}>{entityName}</span>
      </span>
    );
  } else if (entityName !== undefined) {
    return <span>{entityName}</span>;
  } else if (phoneNumber) {
    return <span>{phoneNumber}</span>;
  }
  return null;
}

ContactDisplayItem.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  sourceIcons: PropTypes.object.isRequired,
};

export default function ContactDisplay({
  reference,
  className,
  contactMatches,
  selected,
  onSelectContact,
  disabled,
  isLogging,
  fallBackName,
  enableContactFallback,
  areaCode,
  countryCode,
  phoneNumber,
  currentLocale,
  groupNumbers,
  showType,
  selectClassName,
  selectedClassName,
  showPlaceholder,
  brand,
  stopPropagation,
  sourceIcons = {},
  showGroupNumberName,
  contactName,
  isOnConferenceCall,
}) {
  let contentEl;
  if (isOnConferenceCall) {
    const confStr = i18n.getString('conferenceCall', currentLocale);
    contentEl = (
      <div title={confStr} className={styles.currentName}>
        {confStr}
      </div>
    );
  } else if (contactName) {
    contentEl = (
      <div title={contactName} className={styles.currentName}>
        {contactName}
      </div>
    );
  } else if (groupNumbers && showGroupNumberName) {
    const groupNames = groupNumbers.map((groupNumber) => {
      const groupContact = contactMatches.find(match => match.extensionNumber === groupNumber);
      return (groupContact && groupContact.name) || groupNumber;
    });
    const display = groupNames.join(', ');
    contentEl = (
      <div title={display} className={styles.currentName}>
        {display}
      </div>
    );
  } else if (groupNumbers) {
    const display = groupNumbers.join(', ');
    contentEl = (
      <div title={display} className={styles.currentName}>
        {display}
      </div>
    );
  } else if (contactMatches.length === 0) {
    const display = (enableContactFallback && fallBackName) ||
      (phoneNumber && formatNumber({
        phoneNumber,
        countryCode,
        areaCode,
      })) ||
      i18n.getString('unknownNumber', currentLocale);
    const title = (enableContactFallback && fallBackName) ||
      phoneNumber || '';
    contentEl = (
      <div title={title} className={styles.currentName}>
        {display}
      </div>
    );
  } else if (contactMatches.length === 1) {
    const display = contactMatches[0].name;
    const title = displayFormatter({
      entityName: display,
      entityType: contactMatches[0].entityType,
      phoneNumber,
      brand,
      currentLocale
    });
    contentEl = (
      <div title={title} className={styles.currentName}>
        {display}
      </div>
    );
  } else if (contactMatches.length > 1) {
    const options = [
      ...contactMatches,
    ];
    let placeholder;
    let _selected = selected;
    if (showPlaceholder) {
      placeholder = i18n.getString('select', currentLocale);
    } else {
      _selected = _selected < 0 ? 0 : _selected;
    }
    contentEl = (
      <DropdownSelect
        reference={reference}
        className={classnames(styles.select, selectClassName)}
        selectedClassName={classnames(styles.selectedValue, selectedClassName)}
        buttonStyle={styles.button}
        iconClassName={styles.icon}
        value={_selected}
        onChange={onSelectContact}
        disabled={disabled || isLogging}
        options={options}
        placeholder={placeholder}
        renderFunction={entity => (
          ContactDisplayItem({
            entityName: entity.name,
            entityType: entity.entityType,
            brand,
            currentLocale,
            sourceIcons
          })
        )}
        renderValue={value => (
          displayFormatter({
            entityName: options[value].name,
            entityType: showType && options[value].entityType,
            brand,
            currentLocale,
          })
        )}
        renderTitle={entity => (
          entity ? displayFormatter({
            entityName: entity.name,
            entityType: entity.entityType,
            phoneNumber,
            brand,
            currentLocale,
          }) : phoneNumber)
        }
        dropdownAlign="left"
        titleEnabled
        noPadding
        stopPropagation={stopPropagation}
      />
    );
  }
  return (
    <div
      className={classnames(
        styles.root,
        className,
      )} >
      {contentEl}
    </div>
  );
}
ContactDisplay.propTypes = {
  isOnConferenceCall: PropTypes.bool,
  reference: PropTypes.func,
  className: PropTypes.string,
  contactMatches: PropTypes.arrayOf(PropTypes.any).isRequired,
  selected: PropTypes.number.isRequired,
  onSelectContact: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  isLogging: PropTypes.bool.isRequired,
  fallBackName: PropTypes.string,
  enableContactFallback: PropTypes.bool,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  groupNumbers: PropTypes.arrayOf(PropTypes.string),
  showType: PropTypes.bool,
  selectClassName: PropTypes.string,
  selectedClassName: PropTypes.string,
  showPlaceholder: PropTypes.bool,
  brand: PropTypes.string,
  stopPropagation: PropTypes.bool,
  sourceIcons: PropTypes.object,
  showGroupNumberName: PropTypes.bool,
  contactName: PropTypes.any,
};
ContactDisplay.defaultProps = {
  isOnConferenceCall: false,
  reference: undefined,
  className: undefined,
  onSelectContact: undefined,
  fallBackName: '',
  phoneNumber: undefined,
  groupNumbers: undefined,
  enableContactFallback: undefined,
  showType: true,
  selectClassName: undefined,
  selectedClassName: undefined,
  showPlaceholder: true,
  brand: undefined,
  stopPropagation: true,
  sourceIcons: undefined,
  showGroupNumberName: false,
  contactName: undefined,
};
