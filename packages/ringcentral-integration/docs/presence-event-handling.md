# Presence Event Handling

  We use `DetailedPresence` and `Presence` modules to handle presence event. `DetailedPresence` is based on `Presence` module. Those modules get presence event by subscribing `/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true`. When a presence event happen, client can get detailed Presence from notification message.
  It includes presenceStatus, dndStatus, userStatus and active calls list in notification message. Active calls include all user's ongoing calls in all devices.

## Determine the presence status of a user

  The presence status of a user is decided by `userStatus` and `dndStatus`.

  | UserStatus    | DndStatus                | Presence status    |
  | ------------- | ------------------------ | -----------------  |
  | Offline       | Any                      | Invisible          |
  | Avaliable     | Any                      | Available          |
  | Busy          | DoNotAcceptAnyCalls      | Do not Disturb     |
  | Busy          | Not DoNotAcceptAnyCalls  | Busy               |

## How to Match Ringout two legs

  Active calls in presence event message include two legs of a ringout call, so we need to remove inbound leg. Inbound ringout leg is removed in [calls](https://github.com/ringcentral/ringcentral-js-integration-commons/blob/master/src/modules/DetailedPresence/index.js#L53) of DetailedPresence module.

  If two calls's session id is a difference of 1000, 2000, 3000 or 4000, and a call's from phone number is same as anather call's to phone number, they are two legs of a ring call. Matching function is [here](https://github.com/ringcentral/ringcentral-js-integration-commons/blob/master/src/lib/callLogHelpers.js#L101).

## Determine the status of a call

  We use `telephonyStatus` of active call to determine the status of call.
  There are five status types of a call:

  * NoCall
  * CallConnected
  * Ringing
  * OnHold
  * ParkedCall

## Match webRTC connection and presence

  There are no exact match between webRTC call session and presence active call. So we only can match them by call's phone number, direction and start time. Function of match is [here](https://github.com/ringcentral/ringcentral-js-integration-commons/blob/master/src/modules/CallMonitor/index.js#L18). Because server doesn't provide start time of active call, so we use time that client receives notification as start time of active call.