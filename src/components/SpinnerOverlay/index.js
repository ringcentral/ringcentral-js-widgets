import React from 'react';
import Spinner from '../Spinner';
import styles from './styles.scss';

export default function () {
  return (
    <div className={styles.root} >
      <div className={styles.container} >
        <Spinner />
      </div>
    </div>
  );
}
