import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
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
    'closeMergingPair',
    // for reselect
    'updateCurrentConferenceId',
    // user action track
    'participantListClickHangupTrack',
    'removeParticipantClickCancelTrack',
    'removeParticipantClickRemoveTrack',
  ],
  'conferenceCall',
);

export default actionTypes;
