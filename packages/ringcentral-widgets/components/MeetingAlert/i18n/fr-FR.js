import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';

export default {
  [meetingStatus.emptyTopic]: 'Veuillez saisir la rubrique de la réunion.',
  [meetingStatus.noPassword]: 'Veuillez fournir le mot de passe de la réunion.',
  [meetingStatus.scheduledSuccess]: 'La réunion est planifiée.',
};

// @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
