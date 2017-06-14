import React, { PropTypes } from 'react';
import classnames from 'classnames';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import DropdownSelect from '../DropdownSelect';
import i18n from './i18n';
import styles from './styles.scss';
import phoneSourceNames from '../../lib/phoneSourceNames';

const displayFomatter = ({ entityName, entityType, phoneNumber }) => {
  if (phoneNumber && entityName && entityType) {
    return `${entityName} | ${phoneSourceNames.getString(entityType)} ${phoneNumber}`;
  } else if (entityName && entityType) {
    return `${entityName} | ${phoneSourceNames.getString(entityType)}`;
  } else if (phoneNumber) {
    return `${phoneNumber}`;
  }
  return '';
};

export default function ContactDisplay({
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
    contentEl = (
      <DropdownSelect
        className={styles.select}
        value={`${selected}`}
        onChange={onSelectContact}
        disabled={disabled || isLogging}
        options={options}
        placeholder={i18n.getString('select', currentLocale)}
        renderFunction={entity => (
          displayFomatter({
            entityName: entity.name,
            entityType: entity.entityType,
          })
        )}
        renderValue={value => (
          options[value].name
        )}
        renderTitle={entity => (
          entity ? displayFomatter({
            entityName: entity.name,
            entityType: entity.entityType,
            phoneNumber,
          }) : phoneNumber)
        }
        dropdownAlign="left"
        titleEnabled
        stopPropagation
        noPadding
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
};
ContactDisplay.defaultProps = {
  className: undefined,
  onSelectContact: undefined,
  fallBackName: '',
  phoneNumber: undefined,
  groupNumbers: undefined,
  enableContactFallback: undefined,
};
