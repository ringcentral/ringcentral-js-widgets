import '../../assets/DynamicsFont/DynamicsFont.scss'; // import font face

import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type SelectProps = {
  className?: string;
  value?: string;
  onChange?: (...args: any[]) => any;
  disabled?: boolean;
  options: any[];
  paddingLeft?: number;
  valueFunction?: (...args: any[]) => any;
  renderFunction?: (...args: any[]) => any;
};
const Select: React.SFC<SelectProps> = ({
  className,
  value,
  onChange,
  disabled,
  options,
  valueFunction,
  renderFunction,
  paddingLeft,
}) => {
  return (
    <div className={classnames(styles.root, className)}>
      <select
        className={styles.select}
        disabled={disabled}
        value={value}
        style={{
          paddingLeft,
        }}
        onChange={onChange}
      >
        {options.map((option, idx) => (
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          // eslint-disable-next-line react/no-array-index-key
          <option key={idx} value={valueFunction(option, idx)}>
            {/* @ts-expect-error TS(2722): Cannot invoke an object which is */}
            {renderFunction(option, idx)}
          </option>
        ))}
      </select>
    </div>
  );
};
Select.defaultProps = {
  className: undefined,
  value: undefined,
  onChange: undefined,
  disabled: false,
  paddingLeft: 10,
  valueFunction: (option) => option,
  renderFunction: (option) => option,
};
export default Select;
