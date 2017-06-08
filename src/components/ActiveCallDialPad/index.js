import React, { PropTypes, Component } from 'react';

import DialPad from '../DialPad';
import TextInput from '../TextInput';
import ActiveCallButton from '../ActiveCallButton';

import HideIcon from '../../assets/images/HideDialpad.svg';
import EndIcon from '../../assets/images/End.svg';

import styles from './styles.scss';
import i18n from './i18n';

const cleanRegex = /[^\d*#]/g;

class ActiveCallDialPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.onTextChange = (e) => {
      const value = e.currentTarget.value;
      const cleanValue = value.replace(cleanRegex, '');
      if (value !== cleanValue) {
        return;
      }
      this.setState({ value });
      this.props.onChange(value);
    };
    this.onButtonOutput = (key) => {
      this.setState((preState) => {
        const value = preState.value + key;
        this.props.onChange(value);
        return { value };
      });
    };
  }

  render() {
    return (
      <div className={styles.root}>
        <TextInput
          className={styles.dialInput}
          value={this.state.value}
          onChange={this.onTextChange}
        />
        <DialPad
          className={styles.dialPad}
          onButtonOutput={this.onButtonOutput}
        />
        <div className={styles.buttonRow}>
          <ActiveCallButton
            onClick={this.props.hiddenDialPad}
            className={styles.button}
            Icon={HideIcon}
            title={i18n.getString('hide', this.props.currentLocale)}
          />
          <ActiveCallButton
            onClick={this.props.hangup}
            className={styles.button}
            buttonClassName={styles.stopButton}
            Icon={EndIcon}
            title={i18n.getString('end', this.props.currentLocale)}
            showBorder={false}
          />
        </div>
      </div>
    );
  }
}

ActiveCallDialPad.propTypes = {
  onChange: PropTypes.func.isRequired,
  hiddenDialPad: PropTypes.func.isRequired,
  hangup: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
};

export default ActiveCallDialPad;

