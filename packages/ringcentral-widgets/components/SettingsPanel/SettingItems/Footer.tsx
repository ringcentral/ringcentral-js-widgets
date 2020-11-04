import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import dynamicsFont from '../../../assets/DynamicsFont/DynamicsFont.scss';
import Eula from '../../Eula';
import IconLine from '../../IconLine';
import Line from '../../Line';
import i18n from '../i18n';
import styles from '../styles.scss';

export interface FooterProps {
  brandId: string;
  loginNumber: string;
  currentLocale: string;
  version: string;
  versionContainer?: React.ReactNode;
  /**
   * **NOTE**: Render for End User License Agreement
   */
  EulaRenderer?: (...args: any[]) => any;
  onLogoutButtonClick?(): any;
}

const Footer: FunctionComponent<FooterProps> = ({
  brandId,
  loginNumber,
  currentLocale,
  version,
  EulaRenderer,
  versionContainer,
  onLogoutButtonClick,
}) => {
  const versionArea = versionContainer || (
    <div className={styles.versionContainer} data-sign="version">
      {i18n.getString('version', currentLocale)} {version}
    </div>
  );
  return (
    <>
      <section className={styles.section}>
        <Line noBorder>
          <EulaRenderer
            dataSign="eula"
            className={styles.eula}
            currentLocale={currentLocale}
            brandId={brandId}
          />
        </Line>
      </section>
      <section className={styles.section}>
        <IconLine
          noBorder
          dataSign="logoutButton"
          onClick={onLogoutButtonClick}
          icon={
            <span
              className={classnames(styles.logoutIcon, dynamicsFont.logout)}
            />
          }
        >
          <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
            {i18n.getString('logout', currentLocale)}
            <span data-sign="loginNumber" className={styles.loginNumber}>
              {loginNumber}
            </span>
          </div>
        </IconLine>
      </section>
      {versionArea}
    </>
  );
};

Footer.defaultProps = {
  EulaRenderer: Eula,
};

export { Footer };
