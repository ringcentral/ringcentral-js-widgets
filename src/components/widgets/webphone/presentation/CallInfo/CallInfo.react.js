import React from 'react';
import { title, time, subtitle } from './CallInfo.css';

const CallInfo = (props) => (
  <div>
    <div className={title}>
      {props.phoneNumber}
    </div>
    <div className={time}>
      00:00
    </div>
    <div className={subtitle}>
      You are on a WebPhone call.
    </div>
  </div>
);

CallInfo.propTypes = {
  phoneNumber: React.PropTypes.string,
};
CallInfo.defaultProps = {
  phoneNumber: 'Unknown',
};

export default CallInfo;
