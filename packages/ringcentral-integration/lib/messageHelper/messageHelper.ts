import {
  GetMessageInfoResponse,
  MessageAttachmentInfo,
} from '@rc-ex/core/definitions';

import { messageTypes } from '../../enums/messageTypes';
import removeUri from '../removeUri';

import {
  NormalizedMessageRecord,
  Correspondent,
  VoicemailAttachment,
  FaxAttachment,
  SortEntity,
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

export function messageIsDeleted(message: NormalizedMessageRecord) {
  return (
    message.availability === 'Deleted' || message.availability === 'Purged'
  );
}

export function messageIsTextMessage(message: NormalizedMessageRecord) {
  return (
    message.type !== messageTypes.fax && message.type !== messageTypes.voiceMail
  );
}

export function messageIsFax(message: NormalizedMessageRecord) {
  return message.type === messageTypes.fax;
}

export function messageIsVoicemail(message: NormalizedMessageRecord) {
  return message.type === messageTypes.voiceMail;
}

export function messageIsAcceptable(message: NormalizedMessageRecord) {
  // do not show submitted faxes or sending failed faxes now
  // do not show deleted messages
  return (
    (message.type !== messageTypes.fax ||
      (message.messageStatus !== 'Queued' &&
        message.messageStatus !== 'SendingFailed')) &&
    !messageIsDeleted(message)
  );
}

export function getMessageType(message: NormalizedMessageRecord) {
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
  message: NormalizedMessageRecord;
  myExtensionNumber: string;
}) {
  if (!message) {
    return null;
  }
  if (message.direction === 'Outbound') {
    return message.from;
  }
  if (message.type === messageTypes.pager) {
    const myNumber = message.to.find(
      (number) => number.extensionNumber === myExtensionNumber,
    );
    if (myNumber) {
      return myNumber;
    }
    return { extensionNumber: myExtensionNumber };
  }
  return message.to && message.to.length >= 0 && message.to[0];
}

export function uniqueRecipients(
  recipients: Correspondent[],
  filter: (recipient: Correspondent) => boolean = () => true,
) {
  const recipientMap: { [key: string]: Correspondent } = {};
  recipients.forEach((recipient) => {
    if (filter(recipient)) {
      const key = recipient.extensionNumber || recipient.phoneNumber;
      recipientMap[key] = recipient;
    }
  });
  return Object.values(recipientMap);
}

export function getRecipientNumbersFromMessage({
  message,
  myNumber,
}: {
  message: NormalizedMessageRecord;
  myNumber: Correspondent;
}) {
  if (!message) {
    return [];
  }
  const fromRecipients = (message.from && [message.from]) || [];
  if (message.type === messageTypes.sms) {
    if (message.direction === 'Outbound') {
      return message.to;
    }
    return fromRecipients;
  }
  const allRecipients = fromRecipients.concat(message.to);
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
  message: NormalizedMessageRecord;
  myExtensionNumber: string;
}) {
  const myNumber = getMyNumberFromMessage({
    message,
    myExtensionNumber,
  });
  return getRecipientNumbersFromMessage({
    message,
    myNumber,
  });
}

export function getNumbersFromMessage({
  extensionNumber,
  message,
}: {
  extensionNumber: string;
  message: NormalizedMessageRecord;
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
    return {
      self: toField[0],
      correspondents: fromField,
    };
  }
  return {
    self: fromField[0],
    correspondents: toField,
  };
}

export function sortByDate(a: SortEntity, b: SortEntity) {
  const ta = new Date(a.creationTime).getTime();
  const tb = new Date(b.creationTime).getTime();
  return tb - ta;
}

export function sortSearchResults(a: SortEntity, b: SortEntity) {
  if (a.matchOrder === b.matchOrder) return sortByDate(a, b);
  return a.matchOrder > b.matchOrder ? 1 : -1;
}

export function getVoicemailAttachment(
  message: NormalizedMessageRecord,
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
  message: NormalizedMessageRecord,
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
  message: NormalizedMessageRecord,
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
    )}`;
    return {
      ...attachment,
      uri,
    };
  });
}

export function getConversationId(record: GetMessageInfoResponse) {
  const conversationId =
    (record.conversation && record.conversation.id) || record.id;
  return conversationId.toString();
}

export function sortByCreationTime(
  a: NormalizedMessageRecord,
  b: NormalizedMessageRecord,
) {
  if (a.creationTime === b.creationTime) return 0;
  return a.creationTime > b.creationTime ? -1 : 1;
}

export function normalizeRecord(
  record: GetMessageInfoResponse,
): NormalizedMessageRecord {
  const newRecord = removeUri(record) as GetMessageInfoResponse;
  const conversationId = getConversationId(record);
  delete newRecord.conversation;
  return {
    ...newRecord,
    creationTime: new Date(record.creationTime).getTime(),
    lastModifiedTime: new Date(record.lastModifiedTime).getTime(),
    conversationId,
  };
}

export function messageIsUnread(message: NormalizedMessageRecord) {
  return (
    message.direction === 'Inbound' &&
    message.readStatus !== 'Read' &&
    !messageIsDeleted(message)
  );
}

/** salesforce and dynamics slice the message numbers to reduce the pressure of contact match
 * Fax: 100
 * Voice Mail: 100
 * total(SMS, Pager, Text): 250
 * @param {*} records
 */
export const filterMessages = (messages: NormalizedMessageRecord[]) => {
  function sortByCreationTime(records: NormalizedMessageRecord[]) {
    return records.sort((a, b) => sortByDate(a, b));
  }
  function groupMessages(records: NormalizedMessageRecord[]) {
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

  return [].concat(fax.slice(0, 100), voice.slice(0, 100), text.slice(0, 250));
};
