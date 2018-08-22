import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getPostAbstract } from '../../lib/formatPost';

import styles from './styles.scss';

import GlipGroupAvatar from '../GlipGroupAvatar';
import GlipGroupName from '../GlipGroupName';

function LatestPost({ latestPost, members }) {
  const isGroup = members.length > 2;
  if (!latestPost) {
    return null;
  }
  const formatedText = getPostAbstract(latestPost, members);

  if (!isGroup || !latestPost.creator) {
    // TODO: update message with i18n
    return (
      <div className={styles.latestPost}>
        {formatedText || 'Unsupported message'}
      </div>
    );
  }
  // TODO: update message with i18n
  return (
    <div className={styles.latestPost}>
      {latestPost.creator.firstName}: {formatedText || 'Unsupported message'}
    </div>
  );
}

LatestPost.propTypes = {
  members: PropTypes.array.isRequired,
  latestPost: PropTypes.object,
};

LatestPost.defaultProps = {
  latestPost: null,
};

export default function GlipGroup({
  group,
  className,
  onSelectGroup,
  active,
}) {
  return (
    <div
      className={classnames(
        styles.root,
        (active ? styles.active : null),
        className,
      )}
      onClick={onSelectGroup}
    >
      <GlipGroupAvatar
        persons={group.detailMembers}
        alt={group.id}
        className={styles.avatar}
        unread={group.unread}
      />
      <div className={styles.content}>
        <div className={styles.name} title={group.name}>
          <GlipGroupName group={group} />
        </div>
        <LatestPost
          latestPost={group.latestPost}
          members={group.detailMembers}
        />
      </div>
    </div>
  );
}

GlipGroup.propTypes = {
  className: PropTypes.string,
  group: PropTypes.object,
  onSelectGroup: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

GlipGroup.defaultProps = {
  className: undefined,
  group: {},
  active: false,
};
