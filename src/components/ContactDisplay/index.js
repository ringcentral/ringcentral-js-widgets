import React, { PropTypes } from 'react';
import classnames from 'classnames';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import DropdownSelect from '../DropdownSelect';
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
  // if (groupNumbers) {
  //   contentEl = groupNumbers.join(', ');
  // } else if (contactMatches.length === 0) {
  //   contentEl = fallBackName ||
  //     (phoneNumber && formatNumber({
  //       phoneNumber,
  //       countryCode,
  //       areaCode,
  //     })) ||
  //     i18n.getString('unknownNumber', currentLocale);
  // } else if (contactMatches.length === 1) {
  //   contentEl = contactMatches[0].name;
  // } else if (contactMatches.length > 1) {
    // const options = [
    //   {

    //   },
    //   ...contactMatches,
    // ];
    const options = [{ name: '12343242353454654654756634543', phoneNumbers: [{phoneNumber:1234, phoneType: 'main'}], entityType: 'account' }, { name: '333', phoneNumbers: [{phoneNumber:12346, phoneType: 'main'}], entityType:'account' }];
    contentEl = (
      <DropdownSelect
        className={styles.select}
        value={`${selected}`}
        onChange={onSelectContact}
        disabled={disabled || isLogging}
        options={options}
        placeholder={i18n.getString('select', currentLocale)}
        renderFunction={(entity, idx) => (
          `${entity.name} | ${i18n.getString(`phoneSource.${entity.entityType}`)}`
        )}
        renderValue={(value) => {
          console.debug('render', value);
          return `${options[value].name} ${i18n.getString(`phoneSource.${options[value].entityType}`)}`
        }}
        dropdownAlign="left"
        titleEnabled
        stopPropagation
      />
    );
  // }
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
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  groupNumbers: PropTypes.arrayOf(PropTypes.string),
  missed: PropTypes.string,
  active: PropTypes.string,
};
ContactDisplay.defaultProps = {
  className: undefined,
  onSelectContact: undefined,
  fallBackName: '',
  phoneNumber: undefined,
  groupNumbers: undefined,
};
