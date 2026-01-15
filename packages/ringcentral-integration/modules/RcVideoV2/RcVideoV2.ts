import type {
  RcVideoAPI,
  RcVideoAPIResponse,
  RcVideoV2Api,
  RcVideoV2PostData,
} from '../../interfaces/Rcv.model';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { RcVideo as BaseRcVideo } from '../RcVideo';

import {
  RCV_WAITING_ROOM_MODE,
  RCV_WAITING_ROOM_MODE_REVERSE,
} from './constants';

const formatJoinUriWithPMN = (settings: RcVideoV2Api) => {
  const joinUri = settings.discovery?.web;
  const alias = settings.pins?.aliases?.[0];

  if (settings.type === 'PMI' && alias) {
    const pmiId = settings.pins?.pstn.participant;
    return joinUri.replace(pmiId, alias);
  }

  return joinUri;
};

@Module({
  name: 'RcVideo',
  deps: [
    'Alert',
    'Client',
    'Brand',
    'Storage',
    'AccountInfo',
    'ExtensionInfo',
    'VideoConfiguration',
    'Locale',
    'AppFeatures',
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'RcVideoOptions', optional: true },
  ],
})
export class RcVideo extends BaseRcVideo {
  // Convert the data structure of RcVideoV2 to RcVideoV1
  transformV2ResponseToV1(
    settings: RcVideoV2Api,
  ): Partial<RcVideoAPIResponse | RcVideoAPI> {
    return {
      id: settings.id,
      name: settings.name,
      shortId: settings.pins?.pstn.participant,
      extensionId: settings.host?.extensionId,
      accountId: settings.host?.accountId,
      type: 0,
      personalMeetingName: settings.pins?.aliases?.[0],
      allowJoinBeforeHost: settings.preferences.joinBeforeHost,
      allowScreenSharing: settings.preferences.screenSharing,
      isMeetingSecret: settings.security.passwordProtected,
      meetingPassword: settings.security.password?.plainText,
      meetingPasswordMasked: settings.security.password?.joinQuery,
      meetingPasswordPSTN: settings.security.password?.pstn,
      isOnlyAuthUserJoin: settings.security.noGuests,
      isOnlyCoworkersJoin: settings.security.sameAccount,
      e2ee: settings.security.e2ee,
      joinUri: formatJoinUriWithPMN(settings),
      muteAudio: settings.preferences.join?.audioMuted,
      muteVideo: settings.preferences.join?.videoMuted,
      waitingRoomMode:
        RCV_WAITING_ROOM_MODE[settings.preferences.join?.waitingRoomRequired],
      allowAnyoneRecord:
        settings.preferences.recordings?.everyoneCanControl.enabled ?? false,
      allowAnyoneTranscribe:
        settings.preferences.allowEveryoneTranscribeMeetings ?? false,
    };
  }

  transformV1MeetingToV2(
    settings: RcVideoAPI,
    usePersonalMeetingId: boolean,
  ): RcVideoV2PostData {
    const result: RcVideoV2PostData = {
      name: settings.name,
      type: usePersonalMeetingId ? 'PMI' : 'Scheduled',
      security: {
        passwordProtected: settings.isMeetingSecret,
        password: settings.isMeetingSecret ? settings.meetingPassword! : '',
        // If true, only authenticated users can join to a meeting.
        noGuests: settings.isOnlyAuthUserJoin,
        // If true, only users have the same account can join to a meeting.
        sameAccount: settings.isOnlyCoworkersJoin,
      },
      preferences: {
        join: {
          audioMuted: settings.muteAudio,
          videoMuted: settings.muteVideo,
        },
        joinBeforeHost: settings.allowJoinBeforeHost,
        screenSharing: settings.allowScreenSharing,
        allowEveryoneTranscribeMeetings: !!settings.allowAnyoneTranscribe,
        recordings: {
          everyoneCanControl: { enabled: !!settings.allowAnyoneRecord },
        },
      },
    };
    if (this.enableWaitingRoom) {
      result.preferences.join.waitingRoomRequired =
        RCV_WAITING_ROOM_MODE_REVERSE[settings.waitingRoomMode!];
    }
    if (this.enableE2EE) {
      result.security.e2ee = settings.e2ee!;
    }
    if (usePersonalMeetingId) {
      result.id = settings.id!;
    }
    return result;
  }

  override async _initPersonalMeeting(
    accountId: number = this.accountId,
    extensionId: number = this.extensionId,
  ) {
    if (!this._enablePersonalMeeting) {
      return;
    }
    try {
      const meetingResult = await this._deps.client.service
        .platform()
        .get(
          `/rcvideo/v2/account/${accountId}/extension/${extensionId}/bridges/default`,
        );
      const meeting = (await meetingResult.json()) as RcVideoV2Api;
      this._savePersonalMeeting(this.transformV2ResponseToV1(meeting));
    } catch (errors) {
      console.error('fetch personal meeting error:', errors);
      this._resetPersonalMeeting();
    }
  }

  @proxify
  protected override async _postBridges(
    meetingDetail: RcVideoAPI,
    usePersonalMeetingId: boolean,
  ) {
    const postData = this.transformV1MeetingToV2(
      meetingDetail,
      usePersonalMeetingId,
    );
    const result = await this._deps.client.service
      .platform()
      .post(
        `/rcvideo/v2/account/${meetingDetail.accountId}/extension/${meetingDetail.extensionId}/bridges`,
        postData,
      );
    const resp = await result.json();
    return this.transformV2ResponseToV1(resp);
  }

  @proxify
  protected override async _patchBridges(
    meetingId: string,
    meetingDetail: RcVideoAPI,
    usePersonalMeetingId: boolean,
  ) {
    const body = this.transformV1MeetingToV2(
      meetingDetail,
      usePersonalMeetingId,
    );
    const result = await this._deps.client.service.platform().send({
      method: 'PATCH',
      url: `/rcvideo/v2/bridges/${meetingId}`,
      body,
    });
    const resp = await result.json();
    return this.transformV2ResponseToV1(resp);
  }

  @proxify
  override async getMeeting(shortId: string) {
    const result = await this._deps.client.service
      .platform()
      .get(`/rcvideo/v2/bridges/pin/web/${shortId}`);
    const meeting = await result.json();
    return this.transformV2ResponseToV1(meeting) as RcVideoAPI;
  }
}
