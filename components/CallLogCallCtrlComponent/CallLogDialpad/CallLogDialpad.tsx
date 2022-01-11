import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import CloseDialpadIcon from '../../../assets/images/CloseDialpad.svg';
import { audios } from '../../DialButton/audios';
import DialPad from '../../DialPad';
import { CallLogDialpadProps, DtmfValue } from './CallLogDialpad.interface';
import styles from './styles.scss';

const cleanRegex = /[^\d*#]/g;
const filter = (value) => value.replace(cleanRegex, '');

const MAX_PASTE_LENGTH = 15;

const CallLogDialpad: FunctionComponent<CallLogDialpadProps> = ({
  onChange,
  onClose,
  className,
  isWide,
}) => {
  const [value, setValue] = React.useState('');
  const audioRef = React.useRef<HTMLAudioElement>(null);
  React.useEffect(() => {
    if (typeof document !== 'undefined' && document.createElement) {
      audioRef.current = document.createElement('audio');
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.remove();
        audioRef.current = null;
      }
    };
  }, []);

  const playAudio = (value: DtmfValue) => {
    if (
      audioRef.current &&
      audioRef.current.canPlayType('audio/ogg') !== '' &&
      audios[value]
    ) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      }
      audioRef.current.src = audios[value];
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const onButtonOutput = (key: DtmfValue) => {
    setValue(value + key);
    onChange(key);
  };

  const sendDTMFKeys = (keys: DtmfValue) => {
    if (keys === '') {
      return;
    }
    onChange(keys);
    keys.split('').forEach((key, index) => {
      setTimeout(() => {
        playAudio(key);
      }, 100 * index);
    });
  };

  const onInputChange = (e) => {
    const value = filter(e.currentTarget.value);
    setValue(value);
  };

  const onKeyDown = (e: any) => {
    const value = filter(e.key);
    sendDTMFKeys(value);
  };

  const onPaste = (e: any) => {
    const item = e.clipboardData.items[0];
    item.getAsString((data) => {
      const filteredValue = filter(data.replace(/<[^>]*>/g, '')); // remove HTML tag in firefox
      let keys = filteredValue;
      if (filteredValue.length > MAX_PASTE_LENGTH) {
        keys = filteredValue.slice(0, MAX_PASTE_LENGTH);
      }
      sendDTMFKeys(keys);
      if (filteredValue.length > MAX_PASTE_LENGTH) {
        setValue(value.replace(filteredValue, keys));
      }
    });
  };
  return (
    <div
      data-sign="callLogDialPad"
      className={classnames(styles.root, className, {
        [styles.classic]: !isWide,
      })}
    >
      <div className={styles.closeBtn} onClick={onClose}>
        <CloseDialpadIcon />
      </div>
      <div
        className={classnames(styles.dialInput, { [styles.classic]: !isWide })}
      >
        <input
          data-sign="input"
          className={styles.input}
          value={value}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          autoFocus // eslint-disable-line
        />
      </div>
      <div
        className={classnames(styles.keypadContainer, {
          [styles.classic]: !isWide,
        })}
      >
        <DialPad
          dataSign="keypad"
          className={styles.dialPad}
          onButtonOutput={onButtonOutput}
        />
      </div>
    </div>
  );
};

export { CallLogDialpad };
