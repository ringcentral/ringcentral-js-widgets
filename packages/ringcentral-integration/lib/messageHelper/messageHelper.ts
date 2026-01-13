import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';
import type InstantMessageEvent from '@rc-ex/core/lib/definitions/InstantMessageEvent';
import type MessageAttachmentInfo from '@rc-ex/core/lib/definitions/MessageAttachmentInfo';
import type MessageStoreCallerInfoResponseFrom from '@rc-ex/core/lib/definitions/MessageStoreCallerInfoResponseFrom';
import type MessageStoreCallerInfoResponseTo from '@rc-ex/core/lib/definitions/MessageStoreCallerInfoResponseTo';

import { messageTypes } from '../../enums/messageTypes';
import type { Message } from '../../interfaces/MessageStore.model';

import type {
  Correspondent,
  FaxAttachment,
  SortEntity,
  VoicemailAttachment,
} from './messageHelper.interface';

export function filterNumbers(
  numbers: Correspondent[],
  filterNumber: Correspondent,
) {
  return numbers.filter((number) => {
    if (filterNumber.phoneNumber) {
      return filterNumber.phoneNumber !== number.phoneNumber;
    }
    return filterNumber.extensionNumber !== number.extensionNumber;
  });
}

export function messageIsDeleted(message: Message) {
  return (
    message.availability === 'Deleted' || message.availability === 'Purged'
  );
}

export function messageIsTextMessage(message: Message) {
  return (
    message.type !== messageTypes.fax && message.type !== messageTypes.voiceMail
  );
}

export function messageIsFax(message: Message) {
  return message.type === messageTypes.fax;
}

export function messageIsVoicemail(message: Message) {
  return message.type === messageTypes.voiceMail;
}

export function messageIsAcceptable(message: Message) {
  // do not show submitted faxes or sending failed faxes now
  // do not show deleted messages
  return (
    (message.type !== messageTypes.fax ||
      (message.messageStatus !== 'Queued' &&
        message.messageStatus !== 'SendingFailed')) &&
    !messageIsDeleted(message)
  );
}

export function getMessageType(message: Message) {
  if (messageIsTextMessage(message)) {
    return messageTypes.text;
  }
  if (messageIsVoicemail(message)) {
    return messageTypes.voiceMail;
  }
  if (messageIsFax(message)) {
    return messageTypes.fax;
  }
  return null;
}

export function getMyNumberFromMessage({
  message,
  myExtensionNumber,
}: {
  message: Pick<Message, 'direction' | 'from' | 'to' | 'type'>;
  myExtensionNumber: string;
}) {
  if (!message) {
    return null;
  }
  if (message.direction === 'Outbound') {
    return message.from;
  }
  if (message.type === messageTypes.pager) {
    const myNumber = message.to!.find(
      (number) => number.extensionNumber === myExtensionNumber,
    );
    if (myNumber) {
      return myNumber;
    }
    return { extensionNumber: myExtensionNumber };
  }

  // Sometimes the target sender is not the 1st item of `to` filed in the message.
  const targetToField = message.to;
  if (targetToField && targetToField.length > 1) {
    return targetToField.find((to) => to.target);
  }
  return (targetToField && targetToField[0]) || null;
}

export function uniqueRecipients(
  recipients: Correspondent[],
  filter: (recipient: Correspondent) => boolean = () => true,
) {
  const recipientMap: { [key: string]: Correspondent } = {};
  recipients.forEach((recipient) => {
    if (filter(recipient)) {
      const key = recipient.extensionNumber || recipient.phoneNumber;
      recipientMap[key!] = recipient;
    }
  });
  return Object.values(recipientMap);
}

type RecipientNumbers = MessageStoreCallerInfoResponseTo[] &
  MessageStoreCallerInfoResponseFrom[];
export function getRecipientNumbersFromMessage({
  message,
  myNumber,
}: {
  message: Pick<Message, 'direction' | 'from' | 'to' | 'type'>;
  myNumber: Correspondent;
}): RecipientNumbers {
  if (!message) {
    return [];
  }

  const fromRecipients = (message.from && [message.from]) || [];
  const toRecipients = message.to || [];

  if (message.type === messageTypes.sms) {
    if (message.direction === 'Outbound') {
      return toRecipients;
    }

    if (toRecipients.length > 1) {
      const toFieldWithoutMyNumber = filterNumbers(toRecipients, myNumber);
      return [...toFieldWithoutMyNumber, ...fromRecipients];
    }

    return fromRecipients;
  }
  const allRecipients = fromRecipients.concat(message.to!);
  const recipients = filterNumbers(allRecipients, myNumber);
  if (recipients.length === 0) {
    recipients.push(myNumber);
  }
  return uniqueRecipients(recipients);
}

export function getRecipients({
  message,
  myExtensionNumber,
}: {
  message: Message;
  myExtensionNumber: string;
}) {
  const myNumber = getMyNumberFromMessage({
    message,
    myExtensionNumber,
  });

  if (myNumber) {
    return getRecipientNumbersFromMessage({
      message,
      myNumber,
    });
  }

  return [];
}

export function getNumbersFromMessage({
  extensionNumber,
  message,
}: {
  extensionNumber: string;
  message: Message;
}) {
  if (!message) {
    return {};
  }
  if (message.type === messageTypes.pager) {
    // It is safer and simpler to just put all known contacts into array and filter self out
    const contacts = (message.to && message.to.slice()) || [];
    if (message.from) contacts.push(message.from);
    const correspondents: Correspondent[] = uniqueRecipients(
      contacts,
      (contact) => contact.extensionNumber !== extensionNumber,
    );
    // to support send message to myself.
    if (correspondents && correspondents.length === 0) {
      const myPhoneLength = contacts.filter(
        (contact) => contact.extensionNumber === extensionNumber,
      ).length;
      if (myPhoneLength > 0 && contacts.length === myPhoneLength) {
        correspondents.push({
          extensionNumber,
        });
      }
    }
    return {
      self: {
        extensionNumber,
      },
      correspondents: correspondents || [],
    };
  }

  const inbound = message.direction === 'Inbound';
  const fromField =
    (message.from &&
      (Array.isArray(message.from) ? message.from : [message.from])) ||
    [];
  const toField =
    (message.to && (Array.isArray(message.to) ? message.to : [message.to])) ||
    [];
  if (inbound) {
    const targetToField =
      toField.length > 1 ? toField.find((to) => to.target) : toField[0];
    return {
      self: targetToField,
      correspondents: [
        // support group sms
        ...fromField,
        ...toField.filter(
          (it) =>
            (it.phoneNumber &&
              targetToField?.phoneNumber &&
              it.phoneNumber !== targetToField?.phoneNumber) ||
            (targetToField?.extensionNumber &&
              it.extensionNumber &&
              it.extensionNumber !== targetToField.extensionNumber),
        ),
      ],
    };
  }
  return {
    self: fromField[0],
    correspondents: toField,
  };
}

export function sortByDate(a: SortEntity, b: SortEntity) {
  const ta = new Date(a.creationTime!).getTime();
  const tb = new Date(b.creationTime!).getTime();
  return tb - ta;
}

export function sortSearchResults(a: SortEntity, b: SortEntity) {
  if (a.matchOrder === b.matchOrder) return sortByDate(a, b);
  return a.matchOrder! > b.matchOrder! ? 1 : -1;
}

export function getVoicemailAttachment(
  message: Message,
  accessToken: string,
): VoicemailAttachment {
  const attachment = message.attachments && message.attachments[0];
  if (!attachment) {
    return { duration: 0 };
  }
  const duration = attachment.vmDuration;
  const uri = `${attachment.uri}?access_token=${decodeURIComponent(
    accessToken,
  )}`;
  return {
    duration,
    uri,
  };
}

export function getFaxAttachment(
  message: Message,
  accessToken: string,
): FaxAttachment {
  const attachment = message.attachments && message.attachments[0];
  if (!attachment) {
    return {};
  }
  const uri = `${attachment.uri}?access_token=${decodeURIComponent(
    accessToken,
  )}`;
  return {
    uri,
  };
}

export function getMMSAttachments(
  message: Message,
  accessToken: string,
): MessageAttachmentInfo[] {
  if (!message.attachments || message.attachments.length === 0) {
    return [];
  }
  const attachments = message.attachments.filter(
    (a) => a.type === 'MmsAttachment',
  );
  return attachments.map((attachment) => {
    const uri = `${attachment.uri}?access_token=${decodeURIComponent(
      accessToken,
    )}&shouldCache=true`;
    return {
      ...attachment,
      uri,
    };
  });
}

export function getConversationId(record: GetMessageInfoResponse) {
  const conversationId =
    (record.conversation && record.conversation.id) || record.id;
  return conversationId?.toString();
}

export function sortByCreationTime<T extends { creationTime?: number }>(
  a: T,
  b: T,
) {
  if (a.creationTime === b.creationTime) return 0;

  return a.creationTime &&
    b.creationTime &&
    // make sure creationTime exist
    a.creationTime > b.creationTime
    ? -1
    : 1;
}

export function normalizeInstantEvent(
  event: InstantMessageEvent,
): GetMessageInfoResponse {
  const { id = '', conversationId = '', type, ...message } = event.body!;
  return {
    ...message,
    id: Number(id),
    conversationId: Number(conversationId),
    type: type as any,
  };
}

export function normalizeRecord(record: GetMessageInfoResponse): Message {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { uri, ...newRecord } = record;
  const conversationId = getConversationId(record);
  delete newRecord.conversation;

  return {
    ...newRecord,
    creationTime: record.creationTime
      ? new Date(record.creationTime).getTime()
      : undefined,
    lastModifiedTime: record.lastModifiedTime
      ? new Date(record.lastModifiedTime).getTime()
      : undefined,
    conversationId,
  };
}

export function messageIsUnread(message: Message) {
  return (
    message.direction === 'Inbound' &&
    message.readStatus !== 'Read' &&
    !messageIsDeleted(message)
  );
}

export function messageReadStatusMatched(
  readStatus: 'All' | 'Unread' | 'Read',
  message: Message,
) {
  if (readStatus === 'All') {
    return true;
  } else if (readStatus === 'Unread') {
    return messageIsUnread(message);
  } else {
    return message.readStatus === readStatus;
  }
}

export function directionlessMessageIsUnread(
  message: Message & { preUpdateReadStatus?: Pick<Message, 'readStatus'> },
) {
  return (
    (message.preUpdateReadStatus || message.readStatus) !== 'Read' &&
    !messageIsDeleted(message)
  );
}

/** salesforce and dynamics slice the message numbers to reduce the pressure of contact match
 * Fax: 100
 * Voice Mail: 100
 * total(SMS, Pager, Text): 250
 * @param {*} records
 */
export const filterMessages = (messages: Message[]) => {
  function sortByCreationTime(records: Message[]) {
    return records.sort((a, b) => sortByDate(a as any, b as any));
  }
  function groupMessages(records: Message[]) {
    const faxRecords = records.filter(messageIsFax);
    const voiceMailRecords = records.filter(messageIsVoicemail);
    const textRecords = records.filter(messageIsTextMessage);
    return {
      fax: sortByCreationTime(faxRecords),
      voice: sortByCreationTime(voiceMailRecords),
      text: sortByCreationTime(textRecords),
    };
  }

  const { fax, voice, text } = groupMessages(messages);

  return [...fax.slice(0, 100), ...voice.slice(0, 100), ...text.slice(0, 250)];
};
