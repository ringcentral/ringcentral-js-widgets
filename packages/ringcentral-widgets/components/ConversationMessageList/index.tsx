import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { isBlank } from '@ringcentral-integration/commons/lib/isBlank';
import { RcIcon } from '@ringcentral/juno';
import {
  DefaultFile as fileSvg,
  Download as downloadSvg,
} from '@ringcentral/juno-icon';

import i18n from './i18n';
import styles from './styles.scss';
import { SubjectRender as DefaultRender } from './SubjectRender';

function getExtFromContentType(contentType: any) {
  const ext = contentType.split('/');
  return ext[1].split('+')[0];
}

export const Message = ({
  subject,
  time,
  direction,
  sender,
  subjectRenderer: SubjectRenderer,
  mmsAttachments,
  currentLocale,
  onAttachmentDownload,
  onLinkClick,
}: any) => {
  let subjectNode;
  if (subject && !isBlank(subject)) {
    const SubjectComp = SubjectRenderer || DefaultRender;
    subjectNode = (
      <SubjectComp subject={subject} onLinkClick={onLinkClick} />
    );
  }
  const imageAttachments = mmsAttachments
    .filter((m: any) => m.contentType.indexOf('image') > -1)
    .map((attachment: any) => {
      return (
        <img
          key={attachment.id}
          src={attachment.uri}
          alt={`attachment${attachment.id}`}
          className={styles.picture}
        />
      );
    });
  const otherAttachments = mmsAttachments
    .filter((m: any) => m.contentType.indexOf('image') === -1)
    .map((attachment: any) => {
      const fileName =
        attachment.fileName ||
        `${attachment.id}.${getExtFromContentType(attachment.contentType)}`;
      return (
        <div key={attachment.id} title={fileName} className={styles.file}>
          <RcIcon size="small" symbol={fileSvg} />
          <span className={styles.fileName}>{fileName}</span>
          <a
            target="_blank"
            className={styles.download}
            download={fileName}
            onClick={(e) => {
              if (typeof onAttachmentDownload === 'function') {
                onAttachmentDownload(attachment.uri, e);
              }
            }}
            title={i18n.getString('download', currentLocale)}
            href={`${attachment.uri}&contentDisposition=Attachment`}
          >
            <RcIcon size="small" symbol={downloadSvg} />
          </a>
        </div>
      );
    });
  return (
    <div data-sign="message" className={styles.message}>
      {time ? (
        <div className={styles.time} data-sign="conversationSendTime">
          {time}
        </div>
      ) : null}
      {sender && direction === 'Inbound' ? (
        <div className={styles.sender}>{sender}</div>
      ) : null}
      <div
        data-sign={`${direction}Text`}
        className={classnames(
          styles.messageBody,
          direction === 'Outbound' ? styles.outbound : styles.inbound,
          subject && subject.length > 500 && styles.big,
        )}
      >
        {subjectNode}
        {imageAttachments}
        {otherAttachments}
      </div>
      <div className={styles.clear} />
    </div>
  );
};

Message.propTypes = {
  direction: PropTypes.string.isRequired,
  subject: PropTypes.string,
  time: PropTypes.string,
  sender: PropTypes.string,
  subjectRenderer: PropTypes.func,
  mmsAttachments: PropTypes.array,
  currentLocale: PropTypes.string.isRequired,
  onAttachmentDownload: PropTypes.func,
  onLinkClick: PropTypes.func,
};

Message.defaultProps = {
  subject: '',
  sender: undefined,
  time: undefined,
  subjectRenderer: undefined,
  mmsAttachments: [],
  onAttachmentDownload: undefined,
};

class ConversationMessageList extends Component {
  _listRef: any;
  _scrollHeight: any;
  _scrollTop: any;
  _scrollUp: any;
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this.scrollToLastMessage();
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidUpdate(previousProps: any) {
    // @ts-expect-error TS(2339): Property 'messages' does not exist on type 'Readon... Remove this comment to see the full error message
    if (previousProps.messages.length === this.props.messages.length) {
      return;
    }
    if (!this._scrollUp) {
      this.scrollToLastMessage();
    } else if (
      this._listRef &&
      this._scrollHeight !== this._listRef.scrollHeight
    ) {
      this._listRef.scrollTop +=
        this._listRef.scrollHeight - this._scrollHeight;
    }
  }

  onScroll = async () => {
    if (!this._listRef) {
      return;
    }
    const currentScrollTop = this._listRef.scrollTop;
    this._scrollHeight = this._listRef.scrollHeight;
    const clientHeight = this._listRef.clientHeight;
    if (currentScrollTop < this._scrollTop) {
      // user scroll up
      this._scrollUp = true;
    } else if (currentScrollTop + clientHeight > this._scrollHeight - 200) {
      // user scroll down to bottom
      this._scrollUp = false;
    }
    if (currentScrollTop < 20 && this._scrollTop >= 20) {
      // @ts-expect-error TS(2339): Property 'loadPreviousMessages' does not exist on ... Remove this comment to see the full error message
      this.props.loadPreviousMessages();
    }
    this._scrollTop = currentScrollTop;
  };

  scrollToLastMessage = () => {
    if (this._listRef) {
      this._listRef.scrollTop = this._listRef.scrollHeight;
    }
  };

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      // @ts-expect-error TS(2339): Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
      className,
      // @ts-expect-error TS(2339): Property 'dateTimeFormatter' does not exist on typ... Remove this comment to see the full error message
      dateTimeFormatter,
      // @ts-expect-error TS(2339): Property 'messages' does not exist on type 'Readon... Remove this comment to see the full error message
      messages,
      // @ts-expect-error TS(2339): Property 'showSender' does not exist on type 'Read... Remove this comment to see the full error message
      showSender,
      // @ts-expect-error TS(2339): Property 'height' does not exist on type 'Readonly... Remove this comment to see the full error message
      height,
      // @ts-expect-error TS(2339): Property 'messageSubjectRenderer' does not exist o... Remove this comment to see the full error message
      messageSubjectRenderer,
      // @ts-expect-error TS(2339): Property 'formatPhone' does not exist on type 'Rea... Remove this comment to see the full error message
      formatPhone,
      // @ts-expect-error TS(2339): Property 'loadingNextPage' does not exist on type ... Remove this comment to see the full error message
      loadingNextPage,
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      currentLocale,
      // @ts-expect-error TS(2339): Property 'onAttachmentDownload' does not exist on ... Remove this comment to see the full error message
      onAttachmentDownload,
      // @ts-expect-error TS(2339): Property 'onLinkClick' does not exist on ... Remove this comment to see the full error message
      onLinkClick,
    } = this.props;

    let lastDate = 0;
    const messageList = messages.map((message: any) => {
      const sender = showSender
        ? message.from.name ||
          formatPhone(message.from.extensionNumber || message.from.phoneNumber)
        : null;
      const date = new Date(message.creationTime);
      const time =
        // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
        date - lastDate < 60 * 60 * 1000 &&
        // @ts-expect-error TS(2339): Property 'getHours' does not exist on type 'number... Remove this comment to see the full error message
        date.getHours() === lastDate.getHours()
          ? null
          : dateTimeFormatter({
              utcTimestamp: message.creationTime,
              type: 'long',
            });
      // @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'number'.
      lastDate = date;
      return (
        <Message
          key={message.id}
          sender={sender}
          time={time}
          direction={message.direction}
          subject={message.subject}
          subjectRenderer={messageSubjectRenderer}
          mmsAttachments={message.mmsAttachments}
          currentLocale={currentLocale}
          onAttachmentDownload={onAttachmentDownload}
          onLinkClick={onLinkClick}
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
        className={classnames(styles.root, className)}
        style={{ height }}
        ref={(body) => {
          this._listRef = body;
        }}
        onScroll={this.onScroll}
      >
        {loading}
        {messageList}
      </div>
    );
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ConversationMessageList.propTypes = {
  currentLocale: PropTypes.string,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      creationTime: PropTypes.number,
      id: PropTypes.number,
      direction: PropTypes.string,
      subject: PropTypes.string,
      mmsAttachments: PropTypes.array,
    }),
  ).isRequired,
  className: PropTypes.string,
  showSender: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  messageSubjectRenderer: PropTypes.func,
  formatPhone: PropTypes.func.isRequired,
  loadPreviousMessages: PropTypes.func,
  loadingNextPage: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onAttachmentDownload: PropTypes.func,
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ConversationMessageList.defaultProps = {
  currentLocale: 'en-US',
  className: null,
  showSender: false,
  messageSubjectRenderer: undefined,
  height: '100%',
  loadingNextPage: false,
  loadPreviousMessages: () => null,
  onAttachmentDownload: undefined,
};

export default ConversationMessageList;
