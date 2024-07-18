import React from 'react';

import i18n from './i18n';
import styles from './styles.scss';

type NoCallsProps = {
  currentLocale: string;
  active: boolean;
};
const NoCalls: React.FC<NoCallsProps> = ({ currentLocale, active }) => {
  return (
    <p className={styles.noCalls}>
      {i18n.getString(active ? 'noActiveCalls' : 'noRecords', currentLocale)}
    </p>
  );
};
export default NoCalls;
