import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'mergeStart',
  'mergeSucceeded',
  'mergeFailed',
  // make conference call
  'makeConference',
  'makeConferenceSucceeded',
  'makeConferenceFailed',
  // terminate
  'terminateConference',
  'terminateConferenceSucceeded',
  'terminateConferenceFailed',
  // update
  'updateConference',
  'updateConferenceSucceeded',
  'updateConferenceFailed',
  // get party
  'getParty',
  'getPartySucceeded',
  'getPartyFailed',
  // bring-in
  'bringInConference',
  'bringInConferenceSucceeded',
  'bringInConferenceFailed',
  // remove
  'removeFromConference',
  'removeFromConferenceSucceeded',
  'removeFromConferenceFailed',
  // update merge pairs
  'updateFromSession',
  'updateToSession',
  // for reselect
  'updateCurrentConferenceId',
], 'conferenceCall');
