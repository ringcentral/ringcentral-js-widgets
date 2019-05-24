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
    className,
    dataSign,
    ...props
  }
) {
  const isListObject = !!(textField && valueField);
  return (
    <div className={className} data-sign={dataSign}>
      {
        data.map((item, key) => {
          const isSelected = selected === (isListObject ? item[valueField] : item);
          const checkStyle = isSelected ? styles.selectedCheckButton : null;
          const onClick = () => onSelect(item);
          const extraInfo = typeof item.renderExtraInfo === 'function' && isSelected ?
            item.renderExtraInfo({ ...props }) :
            null;
          return (
            <div key={key} data-sign={isSelected ? 'selectedItem' : undefined}>
              <div
                onClick={onClick}
                className={classnames(styles.item, item && item.disabled ? styles.disabled : null)}>
                <div className={classnames(styles.checkButton, checkStyle)} />
                <div className={styles.text} data-sign="text">
                  { isListObject ? item[textField] : item }
                </div>
              </div>
              {extraInfo}
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
  className: PropTypes.string,
  dataSign: PropTypes.string,
};

CheckBox.defaultProps = {
  textField: null,
  valueField: null,
  className: null,
  dataSign: undefined,
};

export default CheckBox;
