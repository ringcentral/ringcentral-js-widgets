import React from 'react';
import classNames from 'classnames';

import CallFooter from '../CallFooter/CallFooter.react';

import styles from '../../index.css';

const IncomingCall = (props) => (
  <div className={classNames(styles.main, styles.container)}>
    <div>
      <div className={styles.title}>
        Colin Liu
      </div>
      <div className={styles.subtitle}>
        Call Incoming
      </div>
      <div className={styles.avatar}>
        <img alt="avatar" src="http://placehold.it/150x150" />
      </div>
    </div>
    <CallFooter
      leftIcon={'icon-uniCE'}
      rightIcon={'icon-uni44'}
      onLeftClick={() => {}}
      onRightClick={() => {}}
    />
  </div>
);

export default IncomingCall;
