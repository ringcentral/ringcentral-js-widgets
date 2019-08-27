import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { ThemeConsumer } from '../commons/themeContext';
import DropdownSelect from '../../DropdownSelect';
import ArrowSVG from '../ArrowSVG';
import styles from './styles.scss';

function DialInNumberItem({ region, formattedPhoneNumber }) {
  return (
    <div className={styles.dialInNumberItem} title={region}>
      <span className={styles.region}>{region}</span>
      <span>{formattedPhoneNumber}</span>
    </div>
  );
}

DialInNumberItem.propTypes = {
  region: PropTypes.string.isRequired,
  formattedPhoneNumber: PropTypes.string.isRequired,
};

class DialInNumberDropdown extends Component {
  render() {
    const {
      dialInNumber,
      dialInNumbers,
      theme,
      onUpdate
    } = this.props;

    return (
      <DropdownSelect
        className={classnames(styles.dropdown, theme.UI && styles[theme.UI])}
        iconClassName={styles.dropdownIcon}
        value={dialInNumber}
        onChange={option => onUpdate('dialInNumber', option.phoneNumber)}
        renderFunction={DialInNumberItem}
        renderValue={(phoneNumber) => {
          const option = dialInNumbers.find(p => p.phoneNumber === phoneNumber);
          if (!option) {
            console.warn(`Conference dial in number ${phoneNumber} is not found in the list.`);
          }
          const itemOptions = option || dialInNumbers[0];
          if (itemOptions) {
            return DialInNumberItem(itemOptions);
          }
          return '';
        }}
        options={dialInNumbers}
        dropdownAlign="left"
        icon={<ArrowSVG />}
      />
    );
  }
}

DialInNumberDropdown.propTypes = {
  dialInNumber: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  dialInNumbers: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ThemeConsumer(DialInNumberDropdown);
