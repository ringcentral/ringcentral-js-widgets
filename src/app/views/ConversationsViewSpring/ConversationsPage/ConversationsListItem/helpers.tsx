import { messageDirection } from '@ringcentral-integration/commons/enums/messageDirection';
import { messageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import { formatDurationWithLocale } from '@ringcentral-integration/commons/lib/formatDuration';
import { FaxMd, Smsmd, VoicemailMd } from '@ringcentral/spring-icon';

import { t } from './i18n';

export const getIconInfo = (conversation: Message) => {
  switch (conversation.type) {
    case messageTypes.voiceMail:
      return { icon: VoicemailMd };
    case messageTypes.fax:
      return { icon: FaxMd };
    default:
      return { icon: Smsmd };
  }
};

// ringcentral-js-widgets/ringcentral-widgets/components/MessageItem/index.tsx
// getDetail
export const getDetail = (conversation: Message) => {
  if (messageIsTextMessage(conversation)) {
    if (conversation.mmsAttachments && conversation.mmsAttachments.length > 0) {
      const count = conversation.mmsAttachments.length;
      if (count === 1) {
        return t('mmsWithOneAttachment');
      }
      return t('mmsWithAttachments', {
        count,
      });
    }
    return conversation.subject;
  }

  if (conversation.voicemailAttachment) {
    const { duration } = conversation.voicemailAttachment;
    return `${formatDurationWithLocale(duration, {
      day: t('day'),
      hr: t('hour'),
      min: t('min'),
      sec: t('sec'),
    })}`;
  }

  if (messageIsFax(conversation)) {
    const pageCount = conversation?.faxPageCount || 0;
    const pageUnit = t(pageCount === 1 ? 'page' : 'pages');
    const pageSuffix = `: ${pageCount} ${pageUnit}`;
    if (conversation.direction === messageDirection.inbound) {
      return `${t('faxReceived')}${pageSuffix}`;
    }
    const messageStatus = conversation.messageStatus;

    switch (messageStatus) {
      case 'SendingFailed':
      case 'DeliveryFailed':
        return t('faxSendFailed');
      case 'Queued':
        return pageCount === 0
          ? t('faxProcessing')
          : `${t('faxSubmitted')}${pageSuffix}`;
      default:
        break;
    }

    return `${t('faxSent')}${pageSuffix}`;
  }
  return '';
};

// ringcentral-js-widgets/ringcentral-widgets/components/MessageItem/index.tsx
// getPhoneNumber
export const getPhoneNumber = (conversation: Message) => {
  const { correspondents } = conversation;
  return (
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    (correspondents.length === 1 &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      correspondents[0] &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      (correspondents[0].phoneNumber || correspondents[0].extensionNumber)) ||
    undefined
  );
};

// ringcentral-js-widgets/ringcentral-integration/lib/messageHelper/messageHelper.ts
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
