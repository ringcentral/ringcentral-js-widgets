import React from 'react';
import classNames from 'classnames';
import Input from '../../shared/AutoComplete/';

import prefix from '../../../utils/style';

const {
  main,
  transfer,
  transferTitle,
  transferInput,
  transferButton,
  wrapper,
} = prefix([
  'main',
  'transfer',
  'transferTitle',
  'transferInput',
  'transferButton',
  'wrapper',
], 'Transfer');

class Transfer extends React.Component {

  static propTypes = {
    handleClick: React.PropTypes.func,
  }

  updateNumber(event) {
    this.setState({ number: event.target.value });
  }

  render() {
    return (
      <div className={classNames(main, transfer)}>
        <div className={transferTitle}>Transfer to</div>
        <Input
          onChange={(event) => this.updateNumber(event)}
          className={transferInput}
          placeholder={'Enter Name or Number'}
        />
        <div className={wrapper}>
          <button
            onClick={() => this.props.handleClick(this.state.number)}
            className={transferButton}
          >Transfer
          </button>
        </div>
      </div>
    );
  }
}

export default Transfer;
