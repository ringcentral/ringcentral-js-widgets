import React from 'react';
import classNames from 'classnames';

import { PanelHeader, PanelContent, PanelFooter } from '../../../../commons/panel/';
import { Input } from '../../../../commons/autocomplete/';

import Dialer from '../Dialer/Dialer.react';
import UserCallerBar from '../../container/UserCallerBar.react';

import { main, container, line } from '../../index.css';
import { bar, callButton, phoneInput } from './DialPad.css';
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
      <div className={classNames(main, container)}>
        <div className={bar}>
          <UserCallerBar />
        </div>
        <PanelContent>
          <div>
            <Input
              className={phoneInput}
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
          <div className={line}>
            <button className={callButton}>
              <span className={`${iconsStyles['icon-uniAE']} ${iconsStyles.icon}`}></span>
            </button>
          </div>
        </PanelFooter>
      </div>
    );
  }
}
