import React from 'react';
import prefix from '../../../utils/style';

const { title, time, subtitle } =
  prefix(['title', 'time', 'subtitle'], 'CallInfo');

function toHHMMSS(duration) {
  const sec = parseInt(duration, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - (hours * 3600)) / 60);
  let seconds = sec - (hours * 3600) - (minutes * 60);

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${hours}:${minutes}:${seconds}`;
}

const CallInfo = (props) => (
  <div>
    <div className={title}>
      {props.phoneNumber}
    </div>
    <div className={time}>
      {props.duration > 0 ? toHHMMSS(props.duration) : 'Connecting'}
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
