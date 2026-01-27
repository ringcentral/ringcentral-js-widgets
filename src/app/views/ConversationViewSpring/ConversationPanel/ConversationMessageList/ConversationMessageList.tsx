import type { Message as MessageData } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import { isBlank } from '@ringcentral-integration/commons/lib/isBlank';
import { useFormattedDateFromNowFn } from '@ringcentral-integration/micro-phone/src/app/hooks';
import { Block } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FileAttachmentRender } from './FileAttachmentRender';
import { ImageAttachmentRender } from './ImageAttachmentRender';
import { SubjectRender } from './SubjectRender';
import i18n from './i18n';
import styles from './styles.scss';

dayjs.extend(localizedFormat);

interface MessageProps {
  subject?: string;
  time?: string;
  direction: 'Inbound' | 'Outbound';
  mmsAttachments: Array<{
    id: string;
    contentType: string;
  }>;
  currentLocale: string;
  onAttachmentDownload?: (attachment: any) => void;
  onLinkClick?: (url: string) => void;
  handleImageLoad?: () => void;
  renderSenderName?: () => React.ReactNode;
  title?: string;
}

const Message: React.FC<MessageProps> = ({
  subject,
  time,
  direction,
  mmsAttachments,
  currentLocale,
  onAttachmentDownload,
  onLinkClick,
  handleImageLoad,
  renderSenderName,
  title,
}) => {
  let subjectNode;
  if (subject && !isBlank(subject)) {
    subjectNode = (
      <SubjectRender onLinkClick={onLinkClick}>{subject}</SubjectRender>
    );
  }
  const imageAttachments = mmsAttachments
    .filter((m: any) => m.contentType.indexOf('image') > -1)
    .map((attachment: any) => {
      return (
        <ImageAttachmentRender
          key={attachment.id}
          attachment={attachment}
          direction={direction}
          handleImageLoad={handleImageLoad}
        />
      );
    });
  const otherAttachments = mmsAttachments
    .filter((m: any) => m.contentType.indexOf('image') === -1)
    .map((attachment: any) => {
      return (
        <Block
          key={attachment.id}
          data-sign={`${direction}Attachment`}
          className={clsx(
            styles.messageBody,
            direction === 'Outbound' ? 'float-right clear-both' : '',
            'text-neutral-b0 rounded-br-sui-md bg-neutral-base',
          )}
        >
          <FileAttachmentRender
            attachment={attachment}
            currentLocale={currentLocale}
            onLinkClick={onAttachmentDownload}
          />
        </Block>
      );
    });
  return (
    <div
      data-sign="message"
      className={clsx(
        styles.message,
        'typography-mainText text-neutral-static-w0',
      )}
      title={title}
    >
      {time ? (
        <div
          className={clsx(styles.time, 'typography-detailBold text-neutral-b2')}
          data-sign="conversationSendTime"
        >
          {time}
        </div>
      ) : null}
      {renderSenderName?.()}
      {!isBlank(subject) && (
        <div
          data-sign={`${direction}Text`}
          className={clsx(
            styles.messageBody,
            subject && subject.length > 500 && styles.big,
            direction === 'Outbound'
              ? 'bg-primary-b text-neutral-w0 float-right rounded-br-none'
              : 'bg-neutral-b4 text-neutral-b0 float-left rounded-bl-none',
          )}
        >
          {subjectNode}
        </div>
      )}
      {imageAttachments.length > 0 && (
        <div
          data-sign={`${direction}Image`}
          className={clsx(
            styles.imageBody,
            direction === 'Outbound' ? 'float-right' : 'float-left',
          )}
        >
          {imageAttachments}
        </div>
      )}
      {otherAttachments.length > 0 && <>{otherAttachments}</>}
      <div className={styles.clear} />
    </div>
  );
};

export interface ConversationMessageListProps {
  className?: string;
  messages: MessageData[];
  showSender?: boolean;
  loadingNextPage?: boolean;
  currentLocale?: string;
  onAttachmentDownload?: (attachment: any) => void;
  onLinkClick?: (url: string) => void;
  loadPreviousMessages?: () => void;
  renderSenderName?: (message: MessageData) => React.ReactNode;
  timeKey?: 'creationTime' | 'lastModifiedTime';
}

export const ConversationMessageList: React.FC<
  ConversationMessageListProps
> = ({
  className,
  messages,
  loadingNextPage = false,
  currentLocale = 'en-US',
  onAttachmentDownload,
  onLinkClick,
  renderSenderName,
  timeKey = 'creationTime',
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [scrollUp, setScrollUp] = useState<boolean>(false);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToLastMessage = useCallback(() => {
    endRef.current?.scrollIntoView();
  }, []);

  const handleScroll = useCallback(async () => {
    if (!listRef.current) {
      return;
    }

    const currentScrollTop = listRef.current.scrollTop;
    const currentScrollHeight = listRef.current.scrollHeight;
    const clientHeight = listRef.current.clientHeight;

    setScrollHeight(currentScrollHeight);

    if (currentScrollTop < scrollTop) {
      // user scroll up
      setScrollUp(true);
    } else if (currentScrollTop + clientHeight > currentScrollHeight - 200) {
      // user scroll down to bottom
      setScrollUp(false);
    }

    setScrollTop(currentScrollTop);
  }, [scrollTop]);

  // Initial scroll to last message
  useEffect(() => {
    scrollToLastMessage();
  }, [scrollToLastMessage]);

  // Handle messages length change
  useEffect(() => {
    if (!scrollUp) {
      scrollToLastMessage();
    } else if (
      listRef.current &&
      scrollHeight !== listRef.current.scrollHeight
    ) {
      listRef.current.scrollTop += listRef.current.scrollHeight - scrollHeight;
    }
  }, [messages.length, scrollUp, scrollHeight, scrollToLastMessage]);

  const formattedDateFromNow = useFormattedDateFromNowFn();

  let lastDate = 0;
  const messageList = messages.map((message) => {
    const date = new Date(message[timeKey] || 0);
    const timestamp = date.getTime();
    const time =
      timestamp - lastDate < 60 * 60 * 1000 &&
      date.getHours() === new Date(lastDate).getHours()
        ? undefined
        : formattedDateFromNow(timestamp, 'withTime');

    lastDate = date.getTime();

    const direction = message.direction || 'Inbound';
    const messageType = message.messageType || 'message';

    // add a title for the message to show the full date and time for user and us easy to know the message time
    const title = dayjs(timestamp).format('LLL');

    if (messageType === 'info' && message.lastModifiedTime) {
      return (
        <div
          key={message.id}
          className="w-full text-center px-4 py-2 typography-detailBold text-primary-f"
          title={title}
        >
          <div>{message.subject}</div>
          <div className="mt-1">
            {formattedDateFromNow(message.lastModifiedTime, 'withTime')}
          </div>
        </div>
      );
    }

    return (
      <Message
        title={title}
        key={message.id}
        time={time}
        direction={direction}
        subject={message.subject}
        mmsAttachments={message.mmsAttachments || []}
        currentLocale={currentLocale}
        onAttachmentDownload={onAttachmentDownload}
        onLinkClick={onLinkClick}
        handleImageLoad={() => {
          if (!scrollUp) {
            scrollToLastMessage();
          }
        }}
        renderSenderName={
          renderSenderName && direction === 'Inbound'
            ? () => renderSenderName?.(message)
            : undefined
        }
      />
    );
  });

  const loading = loadingNextPage ? (
    <div className={styles.loading}>
      {i18n.getString('loading', currentLocale)}
    </div>
  ) : null;

  return (
    <div
      className={clsx(styles.root, className)}
      ref={listRef}
      onScroll={handleScroll}
    >
      {loading}
      {messageList}
      <div ref={endRef} />
    </div>
  );
};
