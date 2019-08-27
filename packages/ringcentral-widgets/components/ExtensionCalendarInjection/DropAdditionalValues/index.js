import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import CloseButton from '../CloseButton';
import Checkbox from '../Checkbox';

function DropAdditionalValues({
  dialInNumbers, selected, onChange, withCheckbox
}) {
  if (dialInNumbers.length === 0) {
    return '';
  }
  return (
    <ul className={styles.dropAdditionalValues}>
      {dialInNumbers.map((item) => {
        const checked = selected.indexOf(item.phoneNumber) > -1;

        const selectChange = () => {
          let newSelection = [];
          if (checked) {
            selected.forEach(curNum => curNum !== item.phoneNumber && newSelection.push(curNum));
          } else {
            newSelection = selected.concat(item.phoneNumber);
          }
          onChange(newSelection);
        };

        if (withCheckbox) {
          return (
            <li
              key={item.phoneNumber}
              title={item.region}
              onClick={selectChange}
              >
              <Checkbox
                className={styles.regionCkb}
                checked={checked}
                label={item.region}
                size="xsmall"
              />
              <div className={styles.phoneNumber}>
                {item.formattedPhoneNumber}
              </div>
            </li>
          );
        }

        return (
          <li key={item.phoneNumber} title={item.region} className={styles.selectedItemWrapper}>
            <div className={styles.regionText}>{item.region}</div>
            <div className={styles.phoneNumber}>{item.formattedPhoneNumber}</div>
            <CloseButton onClick={selectChange} />
          </li>
        );
      })}
    </ul>
  );
}

DropAdditionalValues.propTypes = {
  dialInNumbers: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  withCheckbox: PropTypes.bool
};

DropAdditionalValues.defaultProps = {
  withCheckbox: false
};

export default DropAdditionalValues;
