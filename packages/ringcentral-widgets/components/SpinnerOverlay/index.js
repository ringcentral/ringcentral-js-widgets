import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spinner from '../Spinner';
import styles from './styles.scss';

export default function SpinnerOverlay({ className, custom }) {
  const Spinner = custom;
  return (
    <div
      data-sign="spinnerOverlay"
      className={classnames(styles.root, className)}
    >
      <div className={styles.mask} />
      <div className={styles.container}>
        <Spinner />
      </div>
    </div>
  );
}

SpinnerOverlay.propTypes = {
  className: PropTypes.string,
  custom: PropTypes.func,
};

SpinnerOverlay.defaultProps = {
  className: undefined,
  custom: Spinner,
};
