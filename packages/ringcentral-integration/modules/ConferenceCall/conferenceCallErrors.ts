import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const conferenceCallErrors = ObjectMap.prefixKeys(
  [
    'internalServerError',
    'conferenceForbidden',
    'conferenceBadRequest',
    'conferenceNotFound',
    'conferenceConflict',
    'modeError',
    'makeConferenceFailed',
    'bringInFailed',
    'removeFromConferenceFailed',
    'terminateConferenceFailed',
    'callIsRecording',
  ],
  'conferenceCall',
);
