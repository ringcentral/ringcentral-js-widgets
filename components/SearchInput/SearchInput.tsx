import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { ChangeEvent } from 'react';

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
    <div className={clsx(styles.root, className)}>
      <SearchIcon data-sign="searchIcon" className={styles.icon} />
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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  disabled: false,
  placeholder: '',
  maxLength: undefined,
  onKeyUp: undefined,
  dataSign: '',
};
