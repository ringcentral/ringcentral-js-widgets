import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DialPad from '../DialPad';
import ActiveCallButton from '../ActiveCallButton';

import HideIcon from '../../assets/images/HideDialpad.svg';
import EndIcon from '../../assets/images/End.svg';

import styles from './styles.scss';
import i18n from './i18n';

class ActiveCallDialPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.onButtonOutput = (key) => {
      this.setState((preState) => {
        const value = preState.value + key;
        this.props.onChange(key);
        return { value };
      });
    };
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.dialInput}>
          <input
            className={styles.input}
            value={this.state.value}
          />
        </div>
        <div className={styles.padContainer}>
          <DialPad
            className={styles.dialPad}
            onButtonOutput={this.onButtonOutput}
          />
          <div className={styles.buttonRow}>
            <ActiveCallButton
              onClick={this.props.hiddenDialPad}
              className={styles.button}
              icon={HideIcon}
              title={i18n.getString('hide', this.props.currentLocale)}
            />
            <ActiveCallButton
              onClick={this.props.hangup}
              className={styles.button}
              buttonClassName={styles.stopButton}
              icon={EndIcon}
              title={i18n.getString('end', this.props.currentLocale)}
              showBorder={false}
            />
          </div>
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

