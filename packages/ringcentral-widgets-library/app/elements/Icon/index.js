
import React from 'react';
import PropTypes from 'prop-types';

// svg icon
import FaxOutBound from '../../assets/images/FaxOutbound.svg';
import VoiceMail from '../../assets/images/Voicemail.svg';
// import VoiceMail from '../../assets/images/VoicemailIcon.svg';
import Message from '../../assets/images/Message.svg';
import ActivityCall from '../../assets/images/Calls.svg';
import Unlogged from '../../assets/images/UnloggedIcon.svg';
import Logged from '../../assets/images/MessagesLog.svg';
import Dialpad from '../../assets/images/Dialpad.svg';
import Time from '../../assets/images/Time.svg';
import SettingNav from '../../assets/images/SettingsNavigation.svg';

// circle icon
import EndIcon from './EndIcon';
import AnswerIcon from './AswerIcon';
import TransferIcon from './TransferIcon';
import MergeIcon from './MergeIcon';

const IconTypes = {
  FaxOutBound,
  VoiceMail,
  Message,
  Unlogged,
  Logged,
  ActivityCall,
  Dialpad,
  Time,
  SettingNav,
};

function Icon({
  type,
  className,
  iconWidth,
  iconHeight,
  iconX,
  iconY,
  onClick,
}) {
  const ChoosenIcon = IconTypes[type];
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
      onClick={onClick}
    />
  );
}

Icon.End = EndIcon;
Icon.Answer = AnswerIcon;
Icon.Transfer = TransferIcon;
Icon.Merge = MergeIcon;

Icon.propTypes = {
  iconWidth: PropTypes.string,
  iconHeight: PropTypes.string,
  iconX: PropTypes.string,
  iconY: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  iconWidth: '80',
  iconHeight: '80',
  iconX: '40',
  iconY: '40',
  className: '',
  type: 'default',
  onClick() { },
};

export default Icon;
