import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

function CheckBox(
  {
    data,
    selected,
    onSelect,
    valueField,
    textField,
  }
) {
  const isListObject = !!(textField && valueField);
  return (
    <div className={styles.checkBox}>
      {
        data.map((item, key) => {
          const isSelected = selected === (isListObject ? item[valueField] : item);
          const checkStyle = isSelected ? styles.selectedCheckButton : null;
          const onClick = () => onSelect(item);
          return (
            <div onClick={onClick} className={styles.item} key={key}>
              <div className={classnames(styles.checkButton, checkStyle)} />
              <div className={styles.text}>
                { isListObject ? item[textField] : item }
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

CheckBox.propTypes = {
  valueField: PropTypes.string,
  textField: PropTypes.string,
  selected: PropTypes.any.isRequired,
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  textField: null,
  valueField: null,
};

export default CheckBox;
