import type { FunctionComponent } from 'react';
import React from 'react';

import type { BackHeaderProps } from '@ringcentral-integration/widgets/components/BackHeaderV2';
import BasicBackHeader from '@ringcentral-integration/widgets/components/BackHeaderV2';

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
