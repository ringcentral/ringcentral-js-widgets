import React from 'react';
import classNames from 'classnames';

import { PanelHeader, PanelContent, PanelFooter } from '../../../../commons/panel/';
import { Input } from '../../../../commons/autocomplete/';

import Dialer from '../Dialer/Dialer.react';
import UserCallerBar from '../../container/UserCallerBar.react';

import webphoneStyles from '../../index.css';
import styles from './DialPad.css';
import iconsStyles from '../../../../../styles/icon.css';

export default class DialPad extends React.Component {
  static propTypes = {
    contacts: React.PropTypes.object,
  }

  state = {
    dialingNumber: '',
  }

  handleInput(event) {
    this.dial(event.target.value);
  }

  handleClick(number) {
    this.dial(this.state.dialingNumber + number);
  }

  dial(dialingNumber) {
    this.setState({ dialingNumber });
  }

  render() {
    return (
      <div className={classNames(webphoneStyles.main, webphoneStyles.container)}>
        <div className={styles.bar}>
          <UserCallerBar />
        </div>
        <PanelContent>
          <div>
            <Input
              className={webphoneStyles.phoneInput}
              onChange={() => this.handleInput}
              value={this.state.dialingNumber}
              items={this.props.contacts}
            />
            <div>
              <Dialer handleClick={() => this.handleClick} />
            </div>
          </div>
        </PanelContent>
        <PanelFooter>
          <div className={webphoneStyles.line}>
            <button className={webphoneStyles.callButton}>
              <span className={`${iconsStyles['icon-uniAE']} ${iconsStyles.icon}`}></span>
            </button>
          </div>
        </PanelFooter>
      </div>
    );
  }
}
