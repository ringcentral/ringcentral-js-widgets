import React from 'react';
import SmsIcon from '!babel!svg-react!../../assets/images/SmsIcon.inline.svg';

import styles from './styles.scss';

export default function ActiveCallButton() {
  return (
    <div>
      <svg className={styles.btnSvg} viewBox="0 0 500 500">
        <g
          className={styles.btnSvgGroup}
        >
          <circle
            className={styles.circle}
            cx="250"
            cy="250"
            r="200"
          />
          <SmsIcon
            width="200"
            height="200"
          />
        </g>
      </svg>
    </div>
  );
}
