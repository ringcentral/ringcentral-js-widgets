import React from 'react';
import classNames from 'classnames';

import { PanelHeader, PanelContent, PanelFooter } from '../../../commons/panel/';

import UserFlip from '../container/UserFlip.react';
import UserTransfer from '../container/UserTransfer.react';

import CallConsole from './CallConsole.react';
import Dialer from './Dialer.react';
import CallInfo from './CallInfo.react';
import CallFooter from './CallFooter.react';
import Closeable from './Closable.react';

import iconsStyles from '../../../../styles/icon.css';
import styles from '../index.css';

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
          <div className={classNames(styles.main, styles.container)}>
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
          <Closeable onClose={() => this.setState({ openedPanel: null })} className={styles.main}>
            <UserFlip />
          </Closeable>
        );
      } else if (this.state.openedPanel === 'transfer') {
        return (
          <Closeable onClose={() => this.setState({ openedPanel: null })} className={styles.main}>
            <UserTransfer />
          </Closeable>
        );
      }
      return (
        <div className={classNames(styles.main, styles.container)}>
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
      <div className={styles.main}>
        {content()}
      </div>
    );
  }
}
