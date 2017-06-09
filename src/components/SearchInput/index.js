import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

function SearchInput(props) {
  return (
    <div
      className={classnames(
        styles.root,
        props.className,
      )}
      >
      <span className={classnames(dynamicsFont.search, styles.icon)} />
      <input
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
