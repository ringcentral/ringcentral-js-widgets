import React from 'react';
import { Input } from '../../../../commons/autocomplete/';

import { transfer, transferTitle, transferInput } from './Transfer.css';

class Transfer extends React.Component {

  static propTypes = {
    handleClick: React.PropTypes.func,
  }

  updateNumber(event) {
    this.setState({ number: event.target.value });
  }

  render() {
    return (
      <div className={transfer}>
        <div className={transferTitle}>Transfer to</div>
        <Input
          onChange={(event) => this.updateNumber(event)}
          className={transferInput}
          placeholder={'Enter Name or Number'}
        />
        <button onClick={() => this.props.handleClick(this.state.number)}>Transfer</button>
      </div>
    );
  }
}

export default Transfer;
