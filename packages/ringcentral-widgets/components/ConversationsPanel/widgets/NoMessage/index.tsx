import React from 'react';

import styles from './style.scss';

type NoMessagesProps = {
  placeholder: string;
};

const NoMessages: React.FC<NoMessagesProps> = ({ placeholder }) => {
  return (
    <p data-sign="noMatch" className={styles.noMessages}>
      {placeholder}
    </p>
  );
};
export default NoMessages;
