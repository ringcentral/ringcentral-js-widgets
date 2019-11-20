import React from 'react';

import styles from './styles.scss';

export interface CallInfoProps {
  name: string;
  content: string;
}
export const CallInfo: React.FunctionComponent<CallInfoProps> = ({
  name,
  content,
}) => {
  return (
    <div data-sign={content} className={styles.container}>
      <div className={styles.name} title={name}>
        {name}
      </div>
      <i className={styles.flexFill} />
      <div className={styles.content} title={content}>
        {content}
      </div>
    </div>
  );
};
