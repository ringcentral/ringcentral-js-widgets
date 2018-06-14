import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Input from '../Input';
import styles from './styles.scss';

import SearchIcon from '../../assets/images/Search.svg';

function SearchInput(props) {
  return (
    <div
      className={classnames(
        styles.root,
        props.className,
      )}
      >
      <SearchIcon className={styles.icon} />
      <Input
        name="search"
        value={props.value}
        onChange={props.onChange}
        onKeyUp={props.onKeyUp}
        className={styles.input}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        autoComplete="off"
        disabled={props.disabled}
      />
    </div>
  );
}

SearchInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

SearchInput.defaultProps = {
  className: null,
  disabled: false,
  placeholder: '',
  maxLength: undefined,
  onKeyUp: undefined,
};

export default SearchInput;
