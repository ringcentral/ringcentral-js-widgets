
import React from 'react';
import PropTypes from 'prop-types';

// svg icon
import FaxOutBound from '../../assets/images/FaxOutbound.svg';
import VoiceMail from '../../assets/images/Voicemail.svg';
import Message from '../../assets/images/Message.svg';
import ActivityCall from '../../assets/images/Calls.svg';
import Unlogged from '../../assets/images/UnloggedIcon.svg';
import Logged from '../../assets/images/MessagesLog.svg';

// circle icon
import EndIcon from './EndIcon';
import AnswerIcon from './AswerIcon';
import TransferIcon from './TransferIcon';
import MergeIcon from './MergeIcon';

const iconTypes = {
  FaxOutBound,
  VoiceMail,
  Message,
  Unlogged,
  Logged,
  ActivityCall,
};

function Icon({
  type,
  className,
  iconWidth,
  iconHeight,
  iconX,
  iconY
}) {
  const ChoosenIcon = iconTypes[type];
  if (!ChoosenIcon) {
    return null;
  }
  return (
    <ChoosenIcon
      className={className}
      width={iconWidth}
      height={iconHeight}
      x={iconX}
      y={iconY}
    />
  );
}

Icon.End = EndIcon;
Icon.Answer = AnswerIcon;
Icon.Transfer = TransferIcon;
Icon.Merge = MergeIcon;

Icon.propTypes = {
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
  iconX: PropTypes.number,
  iconY: PropTypes.number,
  className: PropTypes.string,
  type: PropTypes.string,
};

Icon.defaultProps = {
  iconWidth: 80,
  iconHeight: 80,
  iconX: 40,
  iconY: 40,
  className: '',
  type: 'default'
};

export default Icon;
