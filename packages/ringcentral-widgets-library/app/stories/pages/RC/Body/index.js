import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function Body({
  children
}) {
  return (
    <div className={styles.body}>
      {children}
    </div>
  );
}

Body.propTypes = {
  children: PropTypes.any.isRequired
};
