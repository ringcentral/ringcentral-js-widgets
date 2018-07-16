import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DialPad from '../DialPad';
import CircleButton from '../CircleButton';
import BackHeader from '../BackHeader';

import audios from '../DialButton/audios';

import EndIcon from '../../assets/images/End.svg';

import styles from './styles.scss';
import i18n from './i18n';

const cleanRegex = /[^\d*#]/g;
const filter = value => value.replace(cleanRegex, '');

const MAX_PASTE_LENGTH = 15;

class ActiveCallDialPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    if (typeof document !== 'undefined' && document.createElement) {
      this.audio = document.createElement('audio');
    }

    this.playAudio = (value) => {
      if (this.audio && this.audio.canPlayType('audio/ogg') !== '' && audios[value]) {
        if (!this.audio.paused) {
          this.audio.pause();
        }
        this.audio.src = audios[value];
        this.audio.currentTime = 0;
        this.audio.play();
      }
    };

    this.onButtonOutput = (key) => {
      this.setState((preState) => {
        const value = preState.value + key;
        this.props.onChange(key);
        return { value };
      });
    };

    this.sendDTMFKeys = (keys) => {
      if (keys === '') {
        return;
      }
      keys.split('').forEach((key, index) => {
        setTimeout(() => {
          this.playAudio(key);
          this.props.onChange(key);
        }, 100 * index);
      });
    };

    this.onChange = (e) => {
      const value = filter(e.currentTarget.value);
      this.setState({ value });
    };

    this.onKeyDown = (e) => {
      const value = filter(e.key);
      this.sendDTMFKeys(value);
    };

    this.onPaste = (e) => {
      const item = e.clipboardData.items[0];
      item.getAsString((data) => {
        const value = filter(data);
        let keys = value;
        if (value.length > MAX_PASTE_LENGTH) {
          keys = value.slice(0, MAX_PASTE_LENGTH);
        }
        this.sendDTMFKeys(keys);
        if (value.length > MAX_PASTE_LENGTH) {
          this.setState(preState => ({
            value: preState.value.replace(value, keys)
          }));
        }
      });
    };
  }

  render() {
    return (
      <div className={styles.root}>
        <BackHeader
          onBackClick={this.props.hiddenDialPad}>
          {i18n.getString('keypad', this.props.currentLocale)}
        </BackHeader>
        <div className={styles.dialInput}>
          <input
            className={styles.input}
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            onPaste={this.onPaste}
            autoFocus // eslint-disable-line
          />
        </div>
        <div className={styles.padContainer}>
          <DialPad
            className={styles.dialPad}
            onButtonOutput={this.onButtonOutput}
          />
          <div className={styles.buttonRow}>
            <div className={styles.button}>
              <CircleButton
                className={styles.stopButton}
                onClick={this.props.onHangup}
                icon={EndIcon}
                showBorder={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ActiveCallDialPad.propTypes = {
  onChange: PropTypes.func.isRequired,
  hiddenDialPad: PropTypes.func.isRequired,
  onHangup: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
};

export default ActiveCallDialPad;

