import { format } from '@ringcentral-integration/utils';

import i18n from './i18n';

export function getConferenceLocationField({
  dialInNumber,
  participantCode,
}: any) {
  return format(i18n.getString('conferenceLocationField'), {
    participantCode,
    dialInNumber,
  });
}
