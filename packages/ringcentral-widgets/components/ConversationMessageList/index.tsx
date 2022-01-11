import React, { Component } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import isBlank from '@ringcentral-integration/commons/lib/isBlank';
import { RcIcon } from '@ringcentral/juno';
import {
  DefaultFile as fileSvg,
  Download as downloadSvg,
} from '@ringcentral/juno/icon';

import i18n from './i18n';
import styles from './styles.scss';

function getExtFromContentType(contentType) {
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
}) => {
  let subjectNode;
  if (subject && !isBlank(subject)) {
    subjectNode = SubjectRenderer ? (
      <SubjectRenderer subject={subject} />
    ) : (
      subject
    );
  }
  const imageAttachments = mmsAttachments
    .filter((m) => m.contentType.indexOf('image') > -1)
    .map((attachment) => {
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
    .filter((m) => m.contentType.indexOf('image') === -1)
    .map((attachment) => {
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
  componentDidMount() {
    this.scrollToLastMessage();
  }

  componentDidUpdate(previousProps) {
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
      this.props.loadPreviousMessages();
    }
    this._scrollTop = currentScrollTop;
  };

  scrollToLastMessage = () => {
    if (this._listRef) {
      this._listRef.scrollTop = this._listRef.scrollHeight;
    }
  };

  render() {
    const {
      className,
      dateTimeFormatter,
      messages,
      showSender,
      height,
      messageSubjectRenderer,
      formatPhone,
      loadingNextPage,
      currentLocale,
      onAttachmentDownload,
    } = this.props;

    let lastDate = 0;
    const messageList = messages.map((message) => {
      const sender = showSender
        ? message.from.name ||
          formatPhone(message.from.extensionNumber || message.from.phoneNumber)
        : null;
      const date = new Date(message.creationTime);
      const time =
        date - lastDate < 60 * 60 * 1000 &&
        date.getHours() === lastDate.getHours()
          ? null
          : dateTimeFormatter({
              utcTimestamp: message.creationTime,
              type: 'long',
            });
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
