import React from 'react';

import styles from './styles.scss';

export interface CallSubjectProps {
  subject: string;
}

const CallSubject: React.FunctionComponent<CallSubjectProps> = ({
  subject,
}) => {
  if (!subject) return null;
  return (
    <div className={styles.subject}>
      <div className={styles.matchName} title={subject}>
        {subject}
      </div>
    </div>
  );
};

export default CallSubject;
