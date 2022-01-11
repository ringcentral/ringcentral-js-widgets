import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type CheckBoxProps = {
  valueField?: string;
  textField?: string;
  selected?: any;
  data?: any[];
  onSelect?: (...args: any[]) => any;
  className?: string;
  dataSign?: string;
  type?: string;
  onChecked?: (...args: any[]) => any;
  checked?: boolean;
  disabled?: boolean;
};
const CheckBox: React.SFC<CheckBoxProps> = ({
  data,
  selected,
  onSelect,
  valueField,
  textField,
  className,
  dataSign,
  type,
  checked,
  disabled,
  onChecked,
  children,
  ...props
}) => {
  const isListObject = !!(textField && valueField);
  switch (type) {
    case 'radio': {
      return (
        <div className={className} data-sign={dataSign}>
          {data.map((item, key) => {
            const isSelected =
              selected === (isListObject ? item[valueField] : item);
            const checkStyle = isSelected ? styles.selectedCheckButton : null;
            const onClick = () => (disabled ? undefined : onSelect(item));
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
                    disabled || (item && item.disabled)
                      ? styles.disabled
                      : null,
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
      const checkboxWrapperClassNames = classnames(
        styles.checkboxWrapper,
        disabled ? styles.wrapperDisabled : '',
        className,
      );
      const checkboxClassName = classnames(
        styles.checkbox,
        checked ? styles.checked : '',
        disabled ? styles.checkboxDisabled : '',
      );
      return (
        <div
          className={checkboxWrapperClassNames}
          data-sign={dataSign}
          onClick={() => {
            if (!disabled && onChecked) {
              onChecked(!checked);
            }
          }}
        >
          <div className={checkboxClassName}>{checked && '✓'}</div>
          {children}
        </div>
      );
    }
    default:
      break;
  }
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
  checked: false,
  disabled: false,
};
export default CheckBox;
