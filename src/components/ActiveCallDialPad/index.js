import React, { PropTypes, Component } from 'react';

import DialPad from '../DialPad';
import TextInput from '../TextInput';
import ActiveCallButton from '../ActiveCallButton';

import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

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
            title={'Hide'}
          >
            <i className={rcFont.uni40} />
          </ActiveCallButton>
          <ActiveCallButton
            onClick={this.props.hangup}
            className={styles.button}
            buttonClassName={styles.stopButton}
            title={'End'}
          >
            <i className={rcFont.uni44} />
          </ActiveCallButton>
        </div>
      </div>
    );
  }
}

ActiveCallDialPad.propTypes = {
  onChange: PropTypes.func.isRequired,
  hiddenDialPad: PropTypes.func.isRequired,
  hangup: PropTypes.func.isRequired,
};

export default ActiveCallDialPad;

