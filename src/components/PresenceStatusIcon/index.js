import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

function PresenceStatusIcon({
  userStatus,
  dndStatus,
  presenceStatus,
  className,
}) {
  return (
    <div
      className={
        classnames(
          styles.presence,
          styles[userStatus || presenceStatus],
          styles[dndStatus],
          className,
        )
      }
    >
      <div className={styles.presenceBar} />
    </div>
  );
}

PresenceStatusIcon.propTypes = {
  className: PropTypes.string,
  dndStatus: PropTypes.string,
  userStatus: PropTypes.string,
  presenceStatus: PropTypes.string,
};

PresenceStatusIcon.defaultProps = {
  className: null,
  dndStatus: null,
  userStatus: null,
  presenceStatus: null,
};

export default PresenceStatusIcon;
