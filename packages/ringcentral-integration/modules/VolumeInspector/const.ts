export const LEVEL_CHECK_INTERVAL = 50;

export const MAX_RECORDING_SECS = 12;

export const MAX_RECORDING_TIME = MAX_RECORDING_SECS * 1000;

export const MEDIA_TYPE = 'audio/webm;codecs=opus';

export enum TEST_STATE {
  IDLE,
  RECORDS_AUDIO,
  PLAYS_AUDIO,
}

export enum TEST_TYPE {
  microphone = 'microphone',
  speaker = 'speaker',
}
