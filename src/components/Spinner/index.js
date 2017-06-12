import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

export default function Spinner({
  className,
  ringWidth,
}) {
  return (
    <div className={classnames(styles.root, className)}>
      <div className={classnames(styles.padding)} />
      <div
        className={styles.spinner}
        style={{
          borderWidth: ringWidth,
        }} />
    </div>
  );
}
Spinner.propTypes = {
  className: PropTypes.string,
  ringWidth: PropTypes.number,
};
Spinner.defaultProps = {
  className: null,
  ringWidth: 8,
};
