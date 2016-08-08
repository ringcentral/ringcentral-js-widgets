import React from 'react';
import classNames from 'classnames';

import CallFooter from '../CallFooter/CallFooter.react';

import { main, container, title, subtitle, avatar } from './IncomingCall.css';

const IncomingCall = (props) => (
  <div className={classNames(main, container)}>
    <div>
      <div className={title}>
        {props.phoneNumber}
      </div>
      <div className={subtitle}>
        Call Incoming
      </div>
      <div className={avatar}>
        <img alt="avatar" src="http://placehold.it/150x150" />
      </div>
    </div>
    <CallFooter
      leftIcon={'icon-uniAE'}
      rightIcon={'icon-uni44'}
      onLeftClick={() => props.accept()}
      onRightClick={() => props.bye()}
    />
  </div>
);

IncomingCall.defaultProps = {
  phoneNumber: 'Unknown',
};

IncomingCall.propTypes = {
  phoneNumber: React.PropTypes.string,
  accept: React.PropTypes.func,
  bye: React.PropTypes.func,
};

export default IncomingCall;
