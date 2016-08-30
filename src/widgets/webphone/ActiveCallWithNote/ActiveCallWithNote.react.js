import React from 'react';
import classNames from 'classnames';

import CallInfo from '../CallInfo/CallInfo.react';
import CallFooter from '../CallFooter/CallFooter.react';
import Closeable from '../Closable/Closable.react';

import Note from '../Note/Note.react';
import { main, container, list } from './ActiveCallWithNote.css';

let durationInterval;

export default class ActiveCall extends React.PureComponent {

  static propTypes = {
    callInfo: React.PropTypes.object,

    disabledOperation: React.PropTypes.array,
    operationStatus: React.PropTypes.array,
    webphoneStatus: React.PropTypes.oneOf(['CALL_CONNECTED', 'CALL_CONNECTING']),
  }

  state = {
    openedPanel: null,
    duration: 0,
  }

  componentDidMount() {
    this.enums = this.props.enums;
    if (this.props.webphoneStatus === 'CALL_CONNECTED') {
      this.startToCountDuration();
    }
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
    function contain(arr, target) {
      return arr && target && arr.indexOf(target) !== -1;
    }
    const content = () => {
      return (
        <div className={classNames(main, container)}>
          <CallInfo {...this.props.callInfo} duration={this.state.duration} />
          <select className={list}>
            <option>Contacts</option>
            <option>Number</option>
            <option>Phone</option>
          </select>
          <Note />
          <CallFooter
            leftIcon={classNames({
              'icon-uniCE': !contain(this.props.operationStatus, 'MUTED'),
              'icon-uni7B': contain(this.props.operationStatus, 'MUTED'),
            })}
            rightIcon={'icon-uni44'}
            onLeftClick={() => this.props.mute(!contain(this.props.operationStatus, 'MUTED'))}
            onRightClick={this.props.bye}
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
