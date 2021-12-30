import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type PresenceStatusIconProps = {
  className?: string;
  dndStatus?: string;
  userStatus?: string;
  presenceStatus?: string;
};
const PresenceStatusIcon: React.SFC<PresenceStatusIconProps> = ({
  userStatus,
  dndStatus,
  presenceStatus,
  className,
}) => {
  return (
    <div
      className={classnames(
        styles.presence,
        styles[presenceStatus || userStatus],
        styles[dndStatus],
        className,
      )}
    >
      <div className={styles.presenceBar} />
    </div>
  );
};
PresenceStatusIcon.defaultProps = {
  className: null,
  dndStatus: null,
  userStatus: null,
  presenceStatus: null,
};
export default PresenceStatusIcon;
