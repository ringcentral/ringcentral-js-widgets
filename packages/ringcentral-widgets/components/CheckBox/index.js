import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

function CheckBox({
  data,
  selected,
  onSelect,
  valueField,
  textField,
  className,
  dataSign,
  type,
  checked,
  onChecked,
  children,
  ...props
}) {
  const isListObject = !!(textField && valueField);
  switch (type) {
    case 'radio': {
      return (
        <div className={className} data-sign={dataSign}>
          {data.map((item, key) => {
            const isSelected =
              selected === (isListObject ? item[valueField] : item);
            const checkStyle = isSelected ? styles.selectedCheckButton : null;
            const onClick = () => onSelect(item);
            const extraInfo =
              typeof item.renderExtraInfo === 'function' && isSelected
                ? item.renderExtraInfo({ ...props })
                : null;
            return (
              <div
                key={key}
                data-sign={isSelected ? 'selectedItem' : undefined}
              >
                <div
                  onClick={onClick}
                  className={classnames(
                    styles.item,
                    item && item.disabled ? styles.disabled : null,
                  )}
                >
                  <div className={classnames(styles.checkButton, checkStyle)} />
                  <div className={styles.text} data-sign="text">
                    {isListObject ? item[textField] : item}
                  </div>
                </div>
                {extraInfo}
              </div>
            );
          })}
        </div>
      );
    }
    case 'checkbox': {
      const checkboxClassName = classnames(
        styles.checkbox,
        checked ? styles.checked : '',
      );
      const checkboxWrapperClassNames = classnames(
        styles.checkboxWrapper,
        className,
      );
      return (
        <div
          className={checkboxWrapperClassNames}
          data-sign={dataSign}
          onClick={() => onChecked && onChecked(!checked)}
        >
          <div className={checkboxClassName}>✓</div>
          {children}
        </div>
      );
    }
    default:
      break;
  }
}

CheckBox.propTypes = {
  valueField: PropTypes.string,
  textField: PropTypes.string,
  selected: PropTypes.any,
  data: PropTypes.array,
  onSelect: PropTypes.func,
  className: PropTypes.string,
  dataSign: PropTypes.string,
  type: PropTypes.string,
  onChecked: PropTypes.func,
};

CheckBox.defaultProps = {
  textField: null,
  valueField: null,
  className: null,
  dataSign: undefined,
  type: 'radio',
  onChecked() {},
  onSelect() {},
  data: [],
  selected: null,
};

export default CheckBox;
