import React, { FunctionComponent } from 'react';
import { RcTypography } from '@ringcentral/juno';
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
    // TODO: Juno UI hasn't add the font color we need, it is wip by designer, so just custom in ev briefly
    // color="secondary"
    classes={{
      root: styles.warning,
    }}
  >
    {children}
  </RcTypography>
);

Warning.defaultProps = {
  isWide: true,
};
