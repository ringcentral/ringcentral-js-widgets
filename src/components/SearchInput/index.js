import React, { PropTypes } from 'react';
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
};

SearchInput.defaultProps = {
  className: null,
  placeholder: '',
  maxLength: undefined,
  onKeyUp: undefined,
};

export default SearchInput;
