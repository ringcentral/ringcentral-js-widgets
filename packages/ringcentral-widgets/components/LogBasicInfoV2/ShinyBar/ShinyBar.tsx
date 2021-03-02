import classnames from 'classnames';
import React from 'react';

import { CallStatus } from '../../CallLogPanel/CallLog.interface';
import styles from './ShinyBar.scss';

export type ShinyBarProps = {
  isRinging?: boolean;
  status?: CallStatus;
  className?: string;
};

export const ShinyBar: React.FunctionComponent<ShinyBarProps> = ({
  isRinging,
  className,
  status = 'callEnd',
}) => (
  <div
    className={classnames(
      styles.shinyBar,
      styles[status],
      isRinging && styles.ringing,
      className,
    )}
    data-sign={`shinyBar-${status}`}
  >
    <div />
  </div>
);

ShinyBar.defaultProps = {
  isRinging: false,
};
