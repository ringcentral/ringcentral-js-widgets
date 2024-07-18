import { RcDialerPadSoundsMPEG } from '@ringcentral/juno';
import React, { Component } from 'react';

import EndIcon from '../../assets/images/End.svg';
import {
  PageHeader,
  PageHeaderBack,
  PageHeaderRemain,
  PageHeaderTitle,
} from '../BackHeader/PageHeader';
import CircleButton from '../CircleButton';
import DialPad from '../DialPad';

import i18n from './i18n';
import styles from './styles.scss';

const cleanRegex = /[^\d*#]/g;
const filter = (value: any) => value.replace(cleanRegex, '');
const MAX_PASTE_LENGTH = 15;
type ActiveCallDialPadProps = {
  onChange: (...args: any[]) => any;
  hiddenDialPad: (...args: any[]) => any;
  onHangup: (...args: any[]) => any;
  currentLocale: string;
};
type ActiveCallDialPadState = {
  value: string;
};
class ActiveCallDialPad extends Component<
  ActiveCallDialPadProps,
  ActiveCallDialPadState
> {
  audio: any;
  onButtonOutput: any;
  onChange: any;
  onKeyDown: any;
  onPaste: any;
  playAudio: any;
  sendDTMFKeys: any;
  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
    };
    if (typeof document !== 'undefined' && document.createElement) {
      this.audio = document.createElement('audio');
    }
    this.playAudio = (value: any) => {
      if (this.audio && RcDialerPadSoundsMPEG[value as never]) {
        if (!this.audio.paused) {
          this.audio.pause();
        }
        this.audio.src = RcDialerPadSoundsMPEG[value as never];
        this.audio.currentTime = 0;
        this.audio.play().catch((error: any) => {
          console.error('playAudio error:', error);
        });
      }
    };
    this.onButtonOutput = (key: any) => {
      this.setState((preState) => {
        const value = preState.value + key;
        this.props.onChange(key);
        return { value };
      });
    };
    this.sendDTMFKeys = (keys: any) => {
      if (keys === '') {
        return;
      }
      this.props.onChange(keys);
      keys.split('').forEach((key: any, index: any) => {
        setTimeout(() => {
          this.playAudio(key);
        }, 100 * index);
      });
    };
    this.onChange = (e: any) => {
      const value = filter(e.currentTarget.value);
      this.setState({ value });
    };
    this.onKeyDown = (e: any) => {
      const value = filter(e.key);
      this.sendDTMFKeys(value);
    };
    this.onPaste = (e: any) => {
      const item = e.clipboardData.items[0];
      item.getAsString((data: any) => {
        const value = filter(data.replace(/<[^>]*>/g, '')); // remove HTML tag in firefox
        let keys = value;
        if (value.length > MAX_PASTE_LENGTH) {
          keys = value.slice(0, MAX_PASTE_LENGTH);
        }
        this.sendDTMFKeys(keys);
        if (value.length > MAX_PASTE_LENGTH) {
          this.setState((preState) => ({
            value: preState.value.replace(value, keys),
          }));
        }
      });
    };
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    if (this.audio) {
      this.audio.remove();
      this.audio = null;
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    return (
      <div data-sign="activeCallDialPad" className={styles.root}>
        <PageHeader>
          <PageHeaderBack onClick={this.props.hiddenDialPad} />
          <PageHeaderTitle>
            {i18n.getString('keypad', this.props.currentLocale)}
          </PageHeaderTitle>
          <PageHeaderRemain />
        </PageHeader>
        <div className={styles.dialInput}>
          <input
            data-sign="input"
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
            dataSign="keypad"
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
                dataSign="hangUp"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ActiveCallDialPad;
