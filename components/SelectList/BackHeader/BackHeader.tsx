import React, { FunctionComponent } from 'react';
import BasicBackHeader, {
  BackHeaderProps,
} from 'ringcentral-widgets/components/BackHeaderV2';

import styles from '../styles.scss';

export const BackHeader: FunctionComponent<BackHeaderProps> = (props) => {
  return (
    <BasicBackHeader
      {...props}
      rightIcon={<div className={styles.fillRight} />}
      className={styles.backHeader}
    />
  );
};
