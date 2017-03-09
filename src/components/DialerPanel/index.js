import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import DialPad from '../DialPad';
import DialTextInput from '../DialTextInput';
import styles from './styles.scss';


function DialerPanel({
  callButtonDisabled,
  className,
  keepToNumber,
  onCall,
  toNumber,
}) {
  const onCallFunc = () => {
    !callButtonDisabled && onCall();
  };
  return (
    <div className={classnames(styles.root)}>
      <DialTextInput
        value={toNumber}
        onChangeEvent={(event) => {
          keepToNumber(event.currentTarget.value);
        }}
        onDelete={() => {
          keepToNumber('');
        }}
        />
      <div className={styles.dialButtons}>
        <DialPad
          className={styles.dialPad}
          onButtonOutput={(key) => {
            keepToNumber(toNumber + key);
          }}
          />
        <div className={classnames(styles.callBtnRow)}>
          <div className={styles.callBtn}>
            <svg className={styles.btnSvg} viewBox="0 0 500 500">
              <g
                className={classnames(
                  styles.btnSvgGroup,
                  callButtonDisabled && styles.disabled,
                )}
                onClick={onCallFunc}
                >
                <circle
                  className={styles.circle}
                  cx="250"
                  cy="250"
                  r="200"
                  />
                <text
                  className={styles.btnValue}
                  x="0"
                  dx="167.5155"
                  y="0"
                  dy="300"
                  dangerouslySetInnerHTML={{
                    __html: '&#xe953;',
                  }} />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
DialerPanel.propTypes = {
  className: PropTypes.string,
  onCall: PropTypes.func.isRequired,
  callButtonDisabled: PropTypes.bool,
  toNumber: PropTypes.string,
  keepToNumber: PropTypes.func,
};

export default DialerPanel;
