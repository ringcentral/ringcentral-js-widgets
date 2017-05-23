import React, { PropTypes } from 'react';
import classnames from 'classnames';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import DropdownSelect from '../DropdownSelect';
import i18n from './i18n';
import styles from './styles.scss';

const displayFomatter = ({ entityName, entityType, phoneNumber }) => {
  if (phoneNumber && entityName && entityType) {
    return `${entityName} | ${i18n.getString(`phoneSource.${entityType}`)} ${phoneNumber}`;
  } else if (entityName && entityType) {
    return `${entityName} | ${i18n.getString(`phoneSource.${entityType}`)}`;
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
      <div className={styles.content} title={display}>
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
    contentEl = (
      <div className={styles.content} title={display}>
        {display}
      </div>
    );
  } else if (contactMatches.length === 1) {
    const display = contactMatches[0].name;
    const title = displayFomatter({
      entityName: display,
      entityType: contactMatches[0].entityType,
      phoneNumber: phoneNumber && formatNumber({
        phoneNumber,
        countryCode,
        areaCode,
      })
    });
    contentEl = (
      <div className={styles.content} title={title}>
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
          displayFomatter({
            entityName: options[value].name,
            entityType: options[value].entityType,
          })
        )}
        renderTitle={(entity) => {
          const formatted = phoneNumber && formatNumber({
            phoneNumber,
            countryCode,
            areaCode,
          });
          return entity ? displayFomatter({
            entityName: entity.name,
            entityType: entity.entityType,
            phoneNumber: formatted,
          }) : formatted;
        }}
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
