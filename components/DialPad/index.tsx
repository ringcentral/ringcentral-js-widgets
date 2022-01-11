import React from 'react';

import classnames from 'classnames';

import DialButton from '../DialButton';
import styles from './styles.scss';

const keyConfig = [
  [
    { value: '1', text: '' },
    { value: '2', text: 'ABC', dx: '175' },
    { value: '3', text: 'DEF', dx: '180' },
  ],
  [
    { value: '4', text: 'GHI', dx: '175' },
    { value: '5', text: 'JKL', dx: '180' },
    { value: '6', text: 'MNO', dx: '155' },
  ],
  [
    { value: '7', text: 'PQRS', dx: '140' },
    { value: '8', text: 'TUV', dx: '175' },
    { value: '9', text: 'WXYZ', dx: '140' },
  ],
  [
    { value: '*', text: '' },
    {
      value: '0',
      text: '+',
      alternativeValue: '+',
      dx: '220',
    },
    { value: '#', text: '' },
  ],
];
type DialPadProps = {
  className?: string;
  hideSpecial?: boolean;
  onButtonPress?: (...args: any[]) => any;
  onButtonOutput?: (...args: any[]) => any;
  alternativeTimeout?: number;
  dialButtonVolume?: number;
  dialButtonMuted?: boolean;
  dataSign?: string;
};
const DialPad: React.SFC<DialPadProps> = ({
  className,
  hideSpecial,
  onButtonPress,
  onButtonOutput,
  alternativeTimeout,
  dialButtonVolume,
  dialButtonMuted,
  dataSign,
}) => {
  dataSign = typeof dataSign !== 'undefined' ? dataSign : '';
  return (
    <div
      data-sign={`${dataSign}DialPad`}
      className={classnames(styles.root, className)}
    >
      {keyConfig.map((row, rowIdx) => (
        <div key={rowIdx} className={styles.row}>
          {row.map((btn) => {
            if (hideSpecial && (btn.value === '*' || btn.value === '#')) {
              return <div key={btn.value} className={styles.btnPlaceholder} />;
            }
            return (
              <DialButton
                key={btn.value}
                btn={btn}
                className={styles.btnPlaceholder}
                onPress={onButtonPress}
                onOutput={onButtonOutput}
                alternativeTimeout={alternativeTimeout}
                volume={dialButtonVolume}
                muted={dialButtonMuted}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
DialPad.defaultProps = {
  className: undefined,
  hideSpecial: false,
  onButtonPress: undefined,
  onButtonOutput: undefined,
  alternativeTimeout: undefined,
  dialButtonVolume: 1,
  dialButtonMuted: false,
  dataSign: undefined,
};
export default DialPad;
