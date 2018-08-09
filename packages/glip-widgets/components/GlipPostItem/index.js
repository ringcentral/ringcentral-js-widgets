import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import status from 'ringcentral-integration/modules/GlipPosts/status';

import defaultAvatar from '../../assets/images/default_avatar.png';
import styles from './styles.scss';

import GlipPostContent from '../GlipPostContent';

function PostAvatar({ creator, viewProfile }) {
  if (!creator) {
    return (
      <img src={defaultAvatar} alt="default avatar" />
    );
  }
  return (
    <img
      onClick={() => viewProfile(creator.id)}
      src={creator.avatar || defaultAvatar}
      alt={creator.id}
    />
  );
}

PostAvatar.propTypes = {
  creator: PropTypes.object,
  viewProfile: PropTypes.func.isRequired,
};

PostAvatar.defaultProps = {
  creator: null,
};

function PostName({ creator, showName, viewProfile }) {
  if (!creator || !showName) {
    return null;
  }
  return (
    <span className={styles.name} onClick={() => viewProfile(creator.id)}>
      {creator.firstName} {creator.lastName}
    </span>
  );
}

PostName.propTypes = {
  creator: PropTypes.object,
  viewProfile: PropTypes.func.isRequired,
  showName: PropTypes.bool.isRequired,
};

PostName.defaultProps = {
  creator: null,
};

function PostStatus({ sendStatus }) {
  if (!sendStatus) {
    return null;
  }
  return (
    <span>
      ({sendStatus === status.creating ? 'Sending' : 'Send failed'})
    </span>
  );
}

PostStatus.propTypes = {
  sendStatus: PropTypes.string,
};

PostStatus.defaultProps = {
  sendStatus: null,
};

function PostTime({ creationTime }) {
  if (!creationTime) {
    return null;
  }
  return (
    <div className={styles.time}>
      {creationTime}
    </div>
  );
}

PostTime.propTypes = {
  creationTime: PropTypes.string,
};

PostTime.defaultProps = {
  creationTime: null,
};

export default function GlipPost({
  post,
  className,
  creationTime,
  showName,
  atRender,
  viewProfile,
}) {
  let addedPersons = null;
  if (post.type === 'PersonsAdded') {
    addedPersons = post.addedPersonIds && post.addedPersonIds.map((id) => {
      const peronName = atRender({ id, type: 'Person' });
      return (
        <span key={id}>{peronName}</span>
      );
    });
  }
  return (
    <div
      className={classnames(
        styles.root,
        className,
      )}
    >
      <PostTime
        creationTime={creationTime}
      />
      <div className={styles.avatar}>
        <PostAvatar creator={post.creator} viewProfile={viewProfile} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <PostName
            creator={post.creator}
            showName={showName || post.type !== 'TextMessage'}
            viewProfile={viewProfile}
          />
          { post.type === 'PersonJoined' ? 'joined the team' : null }
          { post.type === 'PersonsAdded' ? 'added ' : null }
          { addedPersons }
          { post.type === 'PersonsAdded' ? 'to the team' : null }
          <PostStatus sendStatus={post.sendStatus} />
        </div>
        {
          post.type === 'TextMessage' ? <GlipPostContent post={post} atRender={atRender} /> : null
        }
      </div>
    </div>
  );
}

GlipPost.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object,
  creationTime: PropTypes.string,
  showName: PropTypes.bool,
  atRender: PropTypes.func,
  viewProfile: PropTypes.func.isRequired,
};

GlipPost.defaultProps = {
  className: undefined,
  creationTime: undefined,
  post: {},
  showName: true,
  atRender: undefined,
};
