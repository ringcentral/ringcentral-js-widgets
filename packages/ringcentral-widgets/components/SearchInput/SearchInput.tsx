import React, { ChangeEvent, FunctionComponent } from 'react';

import classnames from 'classnames';

import SearchIcon from '../../assets/images/Search.svg';
import styles from './styles.scss';

export interface SearchInputProps {
  dataSign?: string;
  className?: string;
  value: string;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchInput: FunctionComponent<SearchInputProps> = ({
  dataSign,
  className,
  value,
  maxLength,
  placeholder,
  disabled,
  onChange,
  onKeyUp,
}) => {
  return (
    <div className={classnames(styles.root, className)}>
      <SearchIcon className={styles.icon} />
      <input
        data-sign={dataSign}
        name="search"
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        className={styles.input}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
      />
    </div>
  );
};

SearchInput.defaultProps = {
  className: null,
  disabled: false,
  placeholder: '',
  maxLength: undefined,
  onKeyUp: undefined,
  dataSign: '',
};
