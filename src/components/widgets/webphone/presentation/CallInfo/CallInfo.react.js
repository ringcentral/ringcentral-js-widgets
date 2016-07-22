import React from 'react';
import { title, time, subtitle } from './CallInfo.css';

const CallInfo = (props) => (
  <div>
    <div className={title}>
      {props.phoneNumber}
    </div>
    <div className={time}>
      {props.duration > 0 ? props.duration : 'Connecting'}
    </div>
    <div className={subtitle}>
      You are on a WebPhone call.
    </div>
  </div>
);

CallInfo.propTypes = {
  phoneNumber: React.PropTypes.string,
  duration: React.PropTypes.number,
};
CallInfo.defaultProps = {
  phoneNumber: 'Unknown',
};

export default CallInfo;
