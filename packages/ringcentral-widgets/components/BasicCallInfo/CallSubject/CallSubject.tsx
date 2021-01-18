import React from 'react';

import { Tooltip } from '../../Rcui/Tooltip';
import styles from './styles.scss';
import { TOOLTIP_LONG_DELAY_TIME } from '../../../lib/toolTipDelayTime';

export interface CallSubjectProps {
  subject: string;
}

export const CallSubject: React.FunctionComponent<CallSubjectProps> = ({
  subject,
}) => {
  if (!subject) return null;
  return (
    <div className={styles.subject}>
      <Tooltip title={subject} enterDelay={TOOLTIP_LONG_DELAY_TIME}>
        <div className={styles.matchName} data-sign="matchName">
          {subject}
        </div>
      </Tooltip>
    </div>
  );
};
