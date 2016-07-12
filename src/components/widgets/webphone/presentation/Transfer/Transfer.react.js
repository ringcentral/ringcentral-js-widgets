import React from 'react';
import { Input } from '../../../../commons/autocomplete/';

import styles from '../../index.css';

const Transfer = (props) => {
  let number = '';
  function handleClick(event) {
    if (props.handleClick) {
      props.handleClick(number);
    }
  }
  function updateNumber(event, value) {
    number = value;
  }
  return (
    <div className={styles.flip}>
      <div className={styles.flipTitle}>Transfer to</div>
      <Input
        onChange={updateNumber}
        className={styles.transferInput}
        placeholder={'Enter Name or Number'}
      />
    </div>
  );
};

Transfer.propTypes = {
  handleClick: React.PropTypes.func,
};

export default Transfer;
