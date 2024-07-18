import { RcTypography } from '@ringcentral/juno';
import type { FunctionComponent } from 'react';
import React from 'react';

import styles from './styles.scss';

export interface WarningProps {
  children: string;
  isWide?: boolean;
}

export const Warning: FunctionComponent<WarningProps> = ({
  children,
  isWide,
}) => (
  <RcTypography
    variant={isWide ? 'body1' : 'caption1'}
    color="highlight.f02"
    className={styles.warning}
  >
    {children}
  </RcTypography>
);

Warning.defaultProps = {
  isWide: true,
};
