import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import formatMessage from 'format-message';
import DropdownSelect from '../DropdownSelect';
import i18n from './i18n';
import styles from './styles.scss';
import phoneSourceNames from '../../lib/phoneSourceNames';

const displayFomatter = ({
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
  showPlaceholder,
  brand,
  stopPropagation,
}) {
  let contentEl;
  if (groupNumbers) {
    const display = groupNumbers.join(', ');
    contentEl = (
      <div title={display}>
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
      <div title={title}>
        {display}
      </div>
    );
  } else if (contactMatches.length === 1) {
    const display = contactMatches[0].name;
    const title = displayFomatter({
      entityName: display,
      entityType: contactMatches[0].entityType,
      phoneNumber,
      brand,
      currentLocale
    });
    contentEl = (
      <div title={title}>
        {display}
      </div>
    );
  } else if (contactMatches.length > 1) {
    const options = [
      ...contactMatches,
    ];
    let placeholder;
    if (showPlaceholder) {
      placeholder = i18n.getString('select', currentLocale);
    }
    contentEl = (
      <DropdownSelect
        reference={reference}
        className={classnames(styles.select, selectClassName)}
        value={`${selected}`}
        onChange={onSelectContact}
        disabled={disabled || isLogging}
        options={options}
        placeholder={placeholder}
        renderFunction={entity => (
          displayFomatter({
            entityName: entity.name,
            entityType: entity.entityType,
            brand,
            currentLocale,
          })
        )}
        renderValue={value => (
          displayFomatter({
            entityName: options[value].name,
            entityType: showType && options[value].entityType,
            brand,
            currentLocale,
          })
        )}
        renderTitle={entity => (
          entity ? displayFomatter({
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
  showPlaceholder: PropTypes.bool,
  brand: PropTypes.string,
  stopPropagation: PropTypes.bool,
};
ContactDisplay.defaultProps = {
  reference: undefined,
  className: undefined,
  onSelectContact: undefined,
  fallBackName: '',
  phoneNumber: undefined,
  groupNumbers: undefined,
  enableContactFallback: undefined,
  showType: true,
  selectClassName: undefined,
  showPlaceholder: true,
  brand: undefined,
  stopPropagation: true,
};
