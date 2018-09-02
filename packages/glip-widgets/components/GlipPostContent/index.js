import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import DownloadIcon from 'ringcentral-widgets/assets/images/Download.svg';

import isPicture from '../../lib/isPicture';

import Markdown from '../GlipMarkdown';

import styles from './styles.scss';

function Attachments({ attachments }) {
  const attachmentFiles = attachments.map((attachment) => {
    if (isPicture(attachment.contentUri)) {
      return (
        <img
          key={attachment.name}
          src={attachment.contentUri}
          alt={attachment.name}
          className={styles.attachmentImg}
        />
      );
    }
    if (attachment.type === 'Card') {
      // TODO: update message with i18n
      return 'Unsupported message';
    }
    return (
      <a
        key={attachment.name}
        download
        href={attachment.contentUri}
        className={styles.attachmentFile}
      >
        {attachment.name}
        <span title="Download" className={styles.downloadIcon}>
          <DownloadIcon width="18" height="18" />
        </span>
      </a>
    );
  });
  return (
    <div className={styles.attachments}>
      {attachmentFiles}
    </div>
  );
}

Attachments.propTypes = {
  attachments: PropTypes.array.isRequired,
};

function PostContent({ post, className, atRender }) {
  if (!post.text && (!post.attachments || post.attachments.length === 0)) {
    return (
      <div className={classnames(styles.root, className)}>
        Unsupported message
      </div>
    );
  }
  let text = post.text;
  if (text) {
    text = text.replace('[code]', '```\n').replace('[/code]', '\n```\n');
  }
  const textContent = text ?
    (<Markdown text={text} atRender={atRender} />) : null;
  const attachments = post.attachments ? (<Attachments attachments={post.attachments} />) : null;
  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.content}>
        {textContent}
        {attachments}
      </div>
    </div>
  );
}

PostContent.propTypes = {
  post: PropTypes.object.isRequired,
  className: PropTypes.string,
  atRender: PropTypes.func,
};

PostContent.defaultProps = {
  className: undefined,
  atRender: undefined,
};

export default PostContent;
