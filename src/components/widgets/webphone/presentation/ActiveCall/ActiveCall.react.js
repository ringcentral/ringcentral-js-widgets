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

let durationInterval;

export default class ActiveCall extends React.Component {

  static propTypes = {
    phoneNumber: React.PropTypes.string,
    bye: React.PropTypes.func,
    flip: React.PropTypes.func,
    transfer: React.PropTypes.func,
    park: React.PropTypes.func,
    record: React.PropTypes.func,
    hold: React.PropTypes.func,
    mute: React.PropTypes.func,
    operationStatus: React.PropTypes.array,
    webphoneStatus: React.PropTypes.string,
  }

  state = {
    openedPanel: null,
    duration: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.webphoneStatus === 'CALL_CONNECTED' &&
        this.props.webphoneStatus === 'CALL_CONNECTING') {
      this.startToCountDuration();
    }
  }

  componentWillUnmount() {
    if (durationInterval) {
      window.clearInterval(durationInterval);
      durationInterval = null;
    }
  }

  startToCountDuration() {
    durationInterval = window.setInterval(
      () => this.setState({ duration: this.state.duration + 1 }),
      1000
    );
  }

  render() {
    const content = () => {
      if (this.state.openedPanel === 'keypad') {
        return (
          <div className={classNames(main, container)}>
            <CallInfo duration={this.state.duration} />
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
          <CallInfo phoneNumber={this.props.phoneNumber} duration={this.state.duration} />
          <CallConsole
            status={this.props.operationStatus}
            handleHoldClick={(flag) => { this.props.hold(flag); }}
            handleRecordClick={(flag) => { this.props.record(flag); }}
            handleKeypadClick={() => { this.setState({ openedPanel: 'keypad' }); }}
            handleFlipClick={() => { this.setState({ openedPanel: 'flip' }); }}
            handleTransferClick={() => { this.setState({ openedPanel: 'transfer' }); }}
            handleParkClick={() => { this.props.park(); }}
          />
          <CallFooter
            leftIcon={classNames({
              'icon-uniCE': !this.props.operationStatus.muted,
              'icon-uni7B': this.props.operationStatus.muted,
            })}
            rightIcon={'icon-uni44'}
            onLeftClick={() => { this.props.mute(!this.props.operationStatus.muted); }}
            onRightClick={() => { this.props.bye(); }}
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
