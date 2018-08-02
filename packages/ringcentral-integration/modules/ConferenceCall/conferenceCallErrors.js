import Enum from '../../lib/Enum';

export default new Enum([
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
], 'conferenceCall');
