import React, { PropTypes } from 'react';
import classnames from 'classnames';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import Select from '../Select';
import i18n from './i18n';
import styles from './styles.scss';

export default function ContactDisplay({
  className,
  contactMatches,
  selected,
  onSelectContact,
  disabled,
  isLogging,
  fallBackName,
  areaCode,
  countryCode,
  phoneNumber,
  currentLocale,
  groupNumbers,
}) {
  let contentEl;
  if (groupNumbers) {
    contentEl = groupNumbers.join(', ');
  } else if (contactMatches.length === 0) {
    contentEl = fallBackName ||
      (phoneNumber && formatNumber({
        phoneNumber,
        countryCode,
        areaCode,
      })) ||
      i18n.getString('unknownNumber', currentLocale);
  } else if (contactMatches.length === 1) {
    contentEl = contactMatches[0].name;
  } else if (contactMatches.length > 1) {
    const options = [
      {

      },
      ...contactMatches,
    ];

    contentEl = (
      <Select
        className={styles.select}
        value={`${selected}`}
        onChange={onSelectContact}
        disabled={disabled || isLogging}
        options={options}
        valueFunction={(_, idx) => `${idx - 1}`}
        renderFunction={(entity, idx) => (
          idx === 0 ?
            i18n.getString('select', currentLocale) :
            `${entity.name} ${i18n.getString(`phoneSource.${entity.entityType}`)}`
        )}
        renderValue={(value) => {
          value = parseInt(value, 10) + 1;
          return value === 0 ?
            i18n.getString('select', currentLocale) :
            `${options[value].name} ${i18n.getString(`phoneSource.${options[value].entityType}`)}`;
        }}
        dropdownAlign="left"
        titleEnabled
      />
    );
  }
  return (
    <div
      className={classnames(
        styles.contact,
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
};
