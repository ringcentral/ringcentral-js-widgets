import React, { PropTypes } from 'react';
import styles from './styles.scss';

export default function Spinner(props) {
  return (
    <div className={[styles.root, props.className].join(' ')}>
      <div className={styles.padding} />
      <div className={styles.spinner} />
    </div>
  );
}
Spinner.propTypes = {
  className: PropTypes.string,
};
