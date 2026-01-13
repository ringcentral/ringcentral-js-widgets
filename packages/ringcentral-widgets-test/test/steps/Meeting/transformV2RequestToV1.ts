import type { RcVideoV2Api } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import { RCV_WAITING_ROOM_MODE } from '@ringcentral-integration/commons/modules/RcVideoV2';

export const transformV2RequestToV1 = (settings: RcVideoV2Api) => {
  return {
    id: settings.id,
    name: settings.name,
    shortId: settings.pins?.pstn.participant,
    extensionId: settings.host?.extensionId,
    accountId: settings.host?.accountId,
    type: 0,
    allowJoinBeforeHost: settings.preferences.joinBeforeHost,
    allowScreenSharing: settings.preferences.screenSharing,
    isMeetingSecret: settings.security.passwordProtected,
    meetingPassword: settings.security.password,
    isOnlyAuthUserJoin: settings.security.noGuests,
    isOnlyCoworkersJoin: settings.security.sameAccount,
    e2ee: settings.security.e2ee,
    joinUri: settings.discovery?.web,
    muteAudio: settings.preferences.join.audioMuted,
    muteVideo: settings.preferences.join.videoMuted,
    waitingRoomMode:
      RCV_WAITING_ROOM_MODE[settings.preferences.join.waitingRoomRequired],
    allowAnyoneRecord:
      settings.preferences.recordings.everyoneCanControl.enabled,
    allowAnyoneTranscribe: settings.preferences.allowEveryoneTranscribeMeetings,
  };
};
