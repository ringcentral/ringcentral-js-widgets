import { pick } from 'ramda';
import {
  MeetingProviderTypesProps,
  RcVideoTypesProps,
  RcVMeetingModel,
  RcvGSuiteMeetingModel,
  RcVideoAPI,
} from '../../models/rcv.model';

/* TODO: this meetingProviderTypes is only used for calender-addon
 * if you want to use meetingProviderTypes
 * please turn to use MeetingProvider/interface
 */
const meetingProviderTypes: MeetingProviderTypesProps = {
  meeting: 'RCMeetings',
  video: 'RCVideo',
};

const RcVideoTypes: RcVideoTypesProps = {
  meeting: 0, // schedule
  call: 1, // instant meeting
};

const RCV_PASSWORD_REGEX = /^[A-Za-z0-9]{1,10}$/;
const DEFAULT_JBH = false;

/* RCINT-14566
 * Exclude characters that are hard to visually differentiate ["0", "o", "O", "I", "l"]
 */
function getDefaultChars() {
  const DEFAULT_PASSWORD_CHARSET =
    'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789';
  return DEFAULT_PASSWORD_CHARSET;
}

function validateRandomPassword(pwd) {
  return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9]*$/.test(pwd);
}

function generateRandomPassword(length = 10) {
  const charset = getDefaultChars();
  const charLen = charset.length;
  let retVal = '';
  for (let i = 0; i < length; i++) {
    retVal += charset.charAt(Math.floor(Math.random() * charLen));
  }
  if (!validateRandomPassword(retVal)) {
    return generateRandomPassword(length);
  }
  return retVal;
}

function validatePasswordSettings(
  meetingPassword: string,
  isMeetingSecret: boolean,
): boolean {
  if (!isMeetingSecret) {
    return true;
  }
  if (meetingPassword && RCV_PASSWORD_REGEX.test(meetingPassword)) {
    return true;
  }
  return false;
}

// gsuite
function getVideoSettings(data) {
  const {
    name = 'Scheduled meeting',
    isMeetingSecret,
    meetingPassword,
    ...params
  } = data;
  const settings: RcvGSuiteMeetingModel = {
    ...params,
    name,
    type: RcVideoTypes.meeting,
    expiresIn: 31536000,
  };

  if (isMeetingSecret) {
    settings.isMeetingSecret = true;
    settings.meetingPassword = meetingPassword;
  } else {
    settings.isMeetingSecret = false;
    settings.meetingPassword = '';
  }

  return settings;
}

function getDefaultVideoSettings({
  topic,
  startTime,
}: {
  topic: string;
  startTime: Date;
}): RcVMeetingModel {
  return {
    name: topic,
    type: RcVideoTypes.meeting,
    startTime,
    duration: 60,
    allowJoinBeforeHost: DEFAULT_JBH,
    muteAudio: false,
    muteVideo: false,
    expiresIn: 31536000,
    saveAsDefault: false,
    isMeetingSecret: true,
    meetingPassword: '',
    isMeetingPasswordValid: false,
    usePersonalMeetingId: false,
    personalMeetingId: '',
  };
}

function getTopic(extensionName: string, brandName: string) {
  if (brandName === 'RingCentral') {
    return `${extensionName}'s ${brandName} Video Meeting`;
  }
  return `${extensionName}'s ${brandName} Meeting`;
}

const rcVideoApiPayload: Array<keyof RcVideoAPI> = [
  'name',
  'type',
  'allowJoinBeforeHost',
  'muteAudio',
  'muteVideo',
  'isMeetingSecret',
  'meetingPassword',
  'expiresIn',
];

/**
 * Remove client side properties before sending to RCV API
 */
function pruneMeetingObject(meeting: RcVMeetingModel): RcVideoAPI {
  return pick(rcVideoApiPayload, meeting);
}

// TODO: will remove this when google app script could support export seperately
// export together because google app script not fully support export
export {
  DEFAULT_JBH,
  RCV_PASSWORD_REGEX,
  RcVideoTypes,
  meetingProviderTypes,
  getDefaultChars,
  validateRandomPassword,
  generateRandomPassword,
  validatePasswordSettings,
  getVideoSettings,
  getDefaultVideoSettings,
  getTopic,
  pruneMeetingObject,
};
