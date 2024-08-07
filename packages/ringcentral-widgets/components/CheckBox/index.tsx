import clsx from 'clsx';
import React from 'react';

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
// @ts-expect-error TS(2322): Type '{ ({ data, selected, onSelect, valueField, t... Remove this comment to see the full error message
const CheckBox: React.FC<CheckBoxProps> = ({
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
          {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
          {data.map((item, key) => {
            const isSelected =
              selected === (isListObject ? item[valueField] : item);
            const checkStyle = isSelected ? styles.selectedCheckButton : null;
            // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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
                  data-sign={`checkbox-option-${item.value}`}
                  onClick={onClick}
                  className={clsx(
                    styles.item,
                    disabled || (item && item.disabled)
                      ? styles.disabled
                      : null,
                  )}
                >
                  <div className={clsx(styles.checkButton, checkStyle)} />
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
      const checkboxWrapperClassNames = clsx(
        styles.checkboxWrapper,
        disabled ? styles.wrapperDisabled : '',
        className,
      );
      const checkboxClassName = clsx(
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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  textField: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  valueField: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
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
