import React from 'react';
import classNames from 'classnames';

import LPN from 'google-libphonenumber';

import Input from '../../shared/AutoComplete/';
import Icon from '../../shared/Icon';

import Dialer from '../Dialer';
import CallerBar from '../CallerBar';

// const incoming = '../../../assets/audio/incoming.ogg';
// const outgoing = '../../../assets/audio/incoming.ogg';

import prefix from '../../../utils/style';

const { main, container, line, bar, callButton, phoneInput } =
  prefix(['main', 'container', 'line', 'bar', 'callButton', 'phoneInput'], 'DialPad');

export default class DialPad extends React.PureComponent {
  static propTypes = {
    disabled: React.PropTypes.bool,
    contacts: React.PropTypes.array,
    userNumbers: React.PropTypes.array,
    call: React.PropTypes.func,
    remoteMedia: React.PropTypes.any,
    localMedia: React.PropTypes.any,
    getString: React.PropTypes.func,
    loadRingAudio: React.PropTypes.func,
  }

  state = {
    dialingNumber: '',
    caller: this.props.userNumbers ? this.props.userNumbers[0] : null,
  }

  static defaultProps = {
    userNumbers: [],
    contacts: [],
  }

  componentWillMount() {
    if (this.props.userNumbers[0]) {
      this.setDefaultCaller(this.props.userNumbers);
    }
    this.phoneUtil = LPN.PhoneNumberUtil.getInstance();
    this.boundHandleChange = (number) => this.handleChange(number);
    this.boundHandleClick = (number) => this.handleClick(number);
    this.boundHandleCallClick = (event) => this.handleCallClick(event);
    this.boundCaller = (number) => this.caller(number);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.caller && nextProps.userNumbers[0]) {
      this.setDefaultCaller(nextProps.userNumbers);
    }
    // if (this.props.disabled && !nextProps.disabled) {
    //   this.props.loadRingAudio({
    //     incoming,
    //     outgoing,
    //   });
    // }
  }

  setDefaultCaller(numbers) {
    this.setState({ caller: numbers[0] });
  }

  handleChange(number) {
    this.dial(number);
  }

  handleClick(number) {
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(number) > -1) {
      this.dial(this.state.dialingNumber + number);
    }
  }

  handleCallClick(event) {
    const toNumberInstance = this.phoneUtil.parse(this.state.dialingNumber, 'US');
    const fromNumberInstance = this.phoneUtil.parse(this.state.caller.phoneNumber, 'US');
    if (this.phoneUtil.isValidNumber(toNumberInstance)) {
      this.props.call({
        toNumber:
          this.phoneUtil.format(toNumberInstance, LPN.PhoneNumberFormat.E164),
        fromNumber:
          this.phoneUtil.format(fromNumberInstance, LPN.PhoneNumberFormat.E164),
        media: {
          remote: this.props.remoteMedia,
          local: this.props.localMedia,
        },
      });
    } else {
      console.error(`${this.state.dialingNumber} not a valid phone number`);
      // TODO: SHOW ERROR
    }
  }

  dial(dialingNumber) {
    this.setState({ dialingNumber });
  }

  caller(caller) {
    this.setState({ caller });
  }

  render() {
    return (
      <div className={classNames(main, container)}>
        <div className={bar}>
          <CallerBar
            setCaller={this.boundCaller}
            caller={this.state.caller}
            numbers={this.props.userNumbers}
            getString={this.props.getString}
          />
        </div>
        <div>
          <div>
            <Input
              className={phoneInput}
              onChange={this.boundHandleChange}
              value={this.state.dialingNumber}
              items={this.props.contacts}
            />
            <div>
              <Dialer handleClick={this.boundHandleClick} />
            </div>
          </div>
        </div>
        <div>
          <div className={line}>
            <button
              className={callButton}
              onClick={this.boundHandleCallClick}
            >
              <Icon id={'icon-uniAE'} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
