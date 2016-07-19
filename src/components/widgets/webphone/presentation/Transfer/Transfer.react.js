import React from 'react';
import { Input } from '../../../../commons/autocomplete/';

import { transfer, transferTitle, transferInput } from './Transfer.css';

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
    <div className={transfer}>
      <div className={transferTitle}>Transfer to</div>
      <Input
        onChange={updateNumber}
        className={transferInput}
        placeholder={'Enter Name or Number'}
      />
    </div>
  );
};

Transfer.propTypes = {
  handleClick: React.PropTypes.func,
};

export default Transfer;
