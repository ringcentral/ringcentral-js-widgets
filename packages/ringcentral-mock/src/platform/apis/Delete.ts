import {
  GetLocationDeletionMultiResponse,
  ScimErrorResponse,
} from '../interfaces';

export interface Delete {
  '/restapi/v1.0/subscription/:subscriptionId': {
    parameters: {
      /**
       * Internal identifier of a subscription
       */
      subscriptionId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/glip/teams/:chatId': {
    parameters: {
      /**
       * Internal identifier of a team.
       */
      chatId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content.
       */
      204: any;

      /**
       * User is not Team Admin.
       */
      403: any;

      /**
       * Team Not Found.
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
       * Internal identifier of a post to be deleted.
       */
      postId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content.
       */
      204: any;

      /**
       * Requestor has no permissions to do this action.
       */
      403: any;

      /**
       * Post Not Found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/adaptive-cards/:cardId': {
    parameters: {
      /**
       * Adaptive Card ID to be deleted.
       */
      cardId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * You do not have permissions to delete specified adaptive card.
       */
      403: any;

      /**
       * Adaptive Card not found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/events/:eventId': {
    parameters: {
      /**
       * Internal identifier of an event to be deleted
       */
      eventId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: any;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * Event not found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/notes/:noteId': {
    parameters: {
      /**
       * Internal identifier of a note to be deleted
       */
      noteId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Note is locked by another user
       */
      400: any;

      /**
       * You have no permissions to delete note
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
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

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
  '/restapi/v1.0/glip/webhooks/:webhookId': {
    parameters: {
      /**
       * Internal identifier of a webhook
       */
      webhookId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * The resource was deleted successfully.
       */
      200: any;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * Webhook not found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/address-book/contact/:contactId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of a contact record in the RingCentral database
       */
      contactId: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/caller-blocking/phone-numbers/:blockedNumberId': {
    parameters: {
      /**
       *
       */
      accountId: string;

      /**
       *
       */
      extensionId: string;

      /**
       *
       */
      blockedNumberId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/forwarding-number/:forwardingNumberId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of a forwarding number
       */
      forwardingNumberId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/answering-rule/:ruleId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of an answering rule
       */
      ruleId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/answering-rule/:ruleId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an answering rule
       */
      ruleId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/ivr-prompts/:promptId': {
    parameters: {
      /**
       *
       */
      accountId: string;

      /**
       *
       */
      promptId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/call-recording/custom-greetings': {
    parameters: {
      /**
       *
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/call-recording/custom-greetings/:greetingId': {
    parameters: {
      /**
       *
       */
      accountId: string;

      /**
       *
       */
      greetingId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/call-log': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * The end datetime for records deletion in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601]  format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is current time
       */
      dateTo?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/custom-fields/:fieldId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Custom field identifier
       */
      fieldId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/:meetingId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral meeting
       */
      meetingId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store': {
    parameters: {
      /**
       *
       */
      conversationId?: string[];

      /**
       * Messages received earlier then the date specified will be deleted. The default value is current datetime
       */
      dateTo?: string;

      /**
       * Type of messages to be deleted
       */
      type?: 'Fax' | 'SMS' | 'VoiceMail' | 'Pager' | 'Text' | 'All';

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store/:messageId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of a message
       */
      messageId: number[];

      /**
       * If the value is 'True', then the message is purged immediately with all the attachments
       */
      purge?: boolean;

      /**
       * Internal identifier of a message thread
       */
      conversationId?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId': {
    parameters: {
      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      savePhoneLines?: boolean;

      /**
       *
       */
      savePhoneNumbers?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/wireless-points/:pointId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      pointId: string[];
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/networks/:networkId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      networkId: string[];
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/switches/:switchId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      switchId: string[];
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-locations/:locationId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of emergency location
       */
      locationId: string;

      /**
       * Internal identifier of a location that should be used instead of a deleted one
       */
      newLocationId?: string;

      /**
       * Flag indicating that validation of emergency location(s) is required before deletion
       */
      validateOnly?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * Successful validation
       */
      200: any;

      /**
       * No Content
       */
      204: any;

      /**
       * Multi-Status
       */
      207: GetLocationDeletionMultiResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/emergency-locations/:locationId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of an emergency response location to be deleted
       */
      locationId: string;

      /**
       * Flag indicating that only validation of Emergency Response Locations to be deleted is required.
       */
      validateOnly?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/call-monitoring-groups/:groupId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      groupId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Group with the given identifier doesn't belong to the account.
       */
      404: any;
    };
  };
  '/restapi/v1.0/account/:accountId/user-role/:roleId': {
    parameters: {
      /**
       *
       */
      roleId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Specifes that role should be validated prior to deletion whether it can be deleted or not
       */
      validateOnly?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/ring-out/:ringoutId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of a RingOut call
       */
      ringoutId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: any;
    };
  };
  '/scim/v2/Users/:id': {
    parameters: {
      /**
       * user id
       */
      id: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * successfully deleted
       */
      204: any;

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
       * too many requests
       */
      429: ScimErrorResponse;

      /**
       * internal server error
       */
      500: ScimErrorResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

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
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

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
