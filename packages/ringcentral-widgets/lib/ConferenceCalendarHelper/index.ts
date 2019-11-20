import formatMessage from 'format-message';
import i18n from './i18n';

export function getConferenceLocationField({ dialInNumber, participantCode }) {
  return formatMessage(i18n.getString('conferenceLocationField'), {
    participantCode,
    dialInNumber,
  });
}
