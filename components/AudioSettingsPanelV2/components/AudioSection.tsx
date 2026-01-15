import { RcTypography, RcCard, RcCardContent } from '@ringcentral/juno';
import React from 'react';

import styles from '../styles.scss';

interface SectionProps {
  label: string;
  dataSign: string;
  children: React.ReactNode;
  show?: boolean;
}

export function Section({
  label,
  children,
  dataSign,
  show = true,
}: SectionProps) {
  if (!show) return null;
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
