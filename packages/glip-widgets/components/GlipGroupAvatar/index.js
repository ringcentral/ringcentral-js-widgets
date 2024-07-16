import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import defaultAvatar from '../../assets/images/default_avatar.png';

import styles from './styles.scss';

function GroupAvatar({ persons, className, unread }) {
  let image;
  if (persons.length <= 2) {
    const personsWithoutMe = persons.filter((p) => !p.isMe);
    const person = personsWithoutMe && personsWithoutMe[0];
    image = (
      <img
        className={styles.big}
        src={(person && person.avatar) || defaultAvatar}
        alt={person && person.id}
      />
    );
  } else {
    image = (
      <div className={styles.images}>
        {persons.slice(0, 9).map((person) => (
          <img
            key={person.id}
            className={styles.small}
            src={(person && person.avatar) || defaultAvatar}
            alt={person && person.id}
          />
        ))}
      </div>
    );
  }
  let unreadEl;
  if (unread > 0) {
    unreadEl = (
      <span className={styles.unread}>{unread > 99 ? '99+' : unread}</span>
    );
  }
  return (
    <div className={clsx(styles.root, className)}>
      {image}
      {unreadEl}
    </div>
  );
}

GroupAvatar.propTypes = {
  className: PropTypes.string,
  persons: PropTypes.array,
  unread: PropTypes.number,
};

GroupAvatar.defaultProps = {
  className: undefined,
  unread: 0,
  persons: [],
};

export default GroupAvatar;
