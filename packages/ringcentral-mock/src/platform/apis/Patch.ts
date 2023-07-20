import type {
  GlipPatchTeamBody,
  GlipTeamInfo,
  UpdateGlipEveryoneRequest,
  GlipEveryoneInfo,
  GlipPatchPostBody,
  GlipPostInfo,
  GlipNoteCreate,
  GlipNoteInfo,
  GlipUpdateTask,
  GlipTaskList,
  UpdateUnifiedPresence,
  UnifiedPresence,
  MeetingServiceInfoRequest,
  MeetingServiceInfoResource,
  UserPatch,
  UserResponse,
  ScimErrorResponse,
  PartyUpdateRequest,
  CallParty,
  CallRecordingUpdate,
  CallRecording,
} from '../interfaces';

export interface Patch {
  '/restapi/v1.0/glip/teams/:chatId': {
    parameters: {
      /**
       * Internal identifier of a team to be updated.
       */
      chatId: string;
    };
    requestBody: GlipPatchTeamBody;
    responses: {
      /**
       * Success
       */
      200: GlipTeamInfo;

      /**
       * One of body parameters has invalid value.
       */
      400: any;

      /**
       * User is not Team Admin or Team is not active.
       */
      403: any;

      /**
       * Team Not Found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/everyone': {
    parameters: {};
    requestBody?: UpdateGlipEveryoneRequest;
    responses: {
      /**
       * Success
       */
      200: GlipEveryoneInfo;

      /**
       * Chat Not Found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/chats/:chatId/posts/:postId': {
    parameters: {
      /**
       * Internal identifier of a chat.
       */
      chatId: string;

      /**
       * Internal identifier of a post to be updated.
       */
      postId: string;
    };
    requestBody: GlipPatchPostBody;
    responses: {
      /**
       * Success
       */
      200: GlipPostInfo;

      /**
       * One of body parameters has invalid value.
       */
      400: any;

      /**
       * Requestor has no permissions to do this action.
       */
      403: any;

      /**
       * Chat not found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/notes/:noteId': {
    parameters: {
      /**
       * Internal identifier of a note to be updated
       */
      noteId: string;
    };
    requestBody: GlipNoteCreate;
    responses: {
      /**
       * OK
       */
      200: GlipNoteInfo;

      /**
       * Note is locked by another user
       */
      400: any;

      /**
       * You have no permissions to update the note
       */
      403: any;

      /**
       * Note is not found
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/tasks/:taskId': {
    parameters: {
      /**
       * Internal identifier of a task
       */
      taskId: string;
    };
    requestBody?: GlipUpdateTask;
    responses: {
      /**
       * Updated Tasks
       */
      200: GlipTaskList;

      /**
       * Invalid input parameter(-s)
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Task with the specified ID doesn`t exist
       */
      404: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/unified-presence': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;
    };
    requestBody: UpdateUnifiedPresence;
    responses: {
      /**
       * OK
       */
      200: UnifiedPresence;

      /**
       * Some of parameters are missing or have invalid format
       */
      400: any;

      /**
       * User is not allowed to do this action
       */
      403: any;

      /**
       * Resource not found
       */
      404: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/service-info': {
    parameters: {
      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: MeetingServiceInfoRequest;
    responses: {
      /**
       * OK: Meeting Service Info
       */
      200: MeetingServiceInfoResource;
    };
  };
  '/scim/v2/Users/:id': {
    parameters: {
      /**
       * user id
       */
      id: string;
    };
    requestBody?: UserPatch;
    responses: {
      /**
       * successfully partially updated user
       */
      200: UserResponse;

      /**
       * bad request
       */
      400: ScimErrorResponse;

      /**
       * authorization failure
       */
      401: ScimErrorResponse;

      /**
       * permissions denied
       */
      403: ScimErrorResponse;

      /**
       * not found
       */
      404: ScimErrorResponse;

      /**
       * duplicate email
       */
      409: ScimErrorResponse;

      /**
       * too many requests
       */
      429: ScimErrorResponse;

      /**
       * internal server error
       */
      500: ScimErrorResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: PartyUpdateRequest;
    responses: {
      /**
       * Success
       */
      200: CallParty;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/recordings/:recordingId': {
    parameters: {
      /**
       * Identifies a brand of a logged in user or a brand of a sign-up session
       */
      brandId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;

      /**
       * Internal identifier of a recording
       */
      recordingId: string;
    };
    requestBody: CallRecordingUpdate;
    responses: {
      /**
       * Success
       */
      200: CallRecording;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
}
