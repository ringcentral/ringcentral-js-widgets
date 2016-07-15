import React from 'react';
import classNames from 'classnames';

import UserFlip from '../../container/UserFlip.react';
import UserTransfer from '../../container/UserTransfer.react';

import CallConsole from '../CallConsole/CallConsole.react';
import Dialer from '../Dialer/Dialer.react';
import CallInfo from '../CallInfo/CallInfo.react';
import CallFooter from '../CallFooter/CallFooter.react';
import Closeable from '../Closable/Closable.react';

import { main, container } from '../../index.css';

export default class ActiveCall extends React.Component {

  static propTypes = {
    phoneNumber: React.PropTypes.string,
  }

  state = {
    openedPanel: null,
    duration: 0,
  }

  render() {
    const content = () => {
      if (this.state.openedPanel === 'keypad') {
        return (
          <div className={classNames(main, container)}>
            <CallInfo />
            <Dialer scale={0.9} handleClick={() => {}} />
            <CallFooter
              leftIcon={'icon-uni40'}
              rightIcon={'icon-uni44'}
              onLeftClick={() => this.setState({ openedPanel: null })}
              onRightClick={() => {}}
            />
          </div>
        );
      } else if (this.state.openedPanel === 'flip') {
        return (
          <Closeable onClose={() => this.setState({ openedPanel: null })} className={main}>
            <UserFlip />
          </Closeable>
        );
      } else if (this.state.openedPanel === 'transfer') {
        return (
          <Closeable onClose={() => this.setState({ openedPanel: null })} className={main}>
            <UserTransfer />
          </Closeable>
        );
      }
      return (
        <div className={classNames(main, container)}>
          <CallInfo />
          <CallConsole
            handleHoldClick={() => {}}
            handleRecordClick={() => {}}
            handleKeypadClick={() => { this.setState({ openedPanel: 'keypad' }); }}
            handleFlipClick={() => { this.setState({ openedPanel: 'flip' }); }}
            handleTransferClick={() => { this.setState({ openedPanel: 'transfer' }); }}
            handleParkClick={() => {}}
          />
          <CallFooter
            leftIcon={'icon-uniCE'}
            rightIcon={'icon-uni44'}
            onLeftClick={() => {}}
            onRightClick={() => {}}
          />
        </div>
      );
    };

    return (
      <div className={main}>
        {content()}
      </div>
    );
  }
}
