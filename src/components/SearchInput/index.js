import React, { PropTypes } from 'react';
import classnames from 'classnames';
import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

function SearchInput(props) {
  return (
    <div
      className={classnames(
        styles.root,
        props.className,
      )}
      >
      <span className={classnames(rcFont.icon_search, styles.icon)} />
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
  onKeyUp: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
};

SearchInput.defaultProps = {
  className: null,
};

export default SearchInput;
