import { RcTypography, RcCard, RcCardContent } from '@ringcentral/juno';
import React from 'react';

import styles from '../styles.scss';

interface SectionProps {
  label: string;
  dataSign: string;
  children: React.ReactNode;
}

export function Section({ label, children, dataSign }: SectionProps) {
  return (
    <div className={styles.section} data-sign={dataSign}>
      <RcTypography
        className={styles.sectionTitle}
        variant="body1"
        color="action.grayLight"
      >
        {label}
      </RcTypography>
      <RcCard>
        <RcCardContent className={styles.sectionContent}>
          {children}
        </RcCardContent>
      </RcCard>
    </div>
  );
}
