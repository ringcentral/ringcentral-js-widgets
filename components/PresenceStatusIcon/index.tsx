import clsx from 'clsx';
import React from 'react';

import styles from './styles.scss';

type PresenceStatusIconProps = {
  className?: string;
  dndStatus?: string;
  userStatus?: string;
  presenceStatus?: string;
};
const PresenceStatusIcon: React.FC<PresenceStatusIconProps> = ({
  userStatus,
  dndStatus,
  presenceStatus,
  className,
}) => {
  return (
    <div
      className={clsx(
        styles.presence,
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        styles[presenceStatus || userStatus],
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        styles[dndStatus],
        className,
      )}
    >
      <div className={styles.presenceBar} />
    </div>
  );
};
PresenceStatusIcon.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  dndStatus: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  userStatus: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  presenceStatus: null,
};
export default PresenceStatusIcon;
