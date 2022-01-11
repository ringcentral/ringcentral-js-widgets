import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import { Eula } from '../Eula';
import IconLine from '../IconLine';
import Line from '../Line';
import i18n from './i18n';
import { FooterProps } from './SettingsPanel.interface';
import styles from './styles.scss';

export const Footer: FunctionComponent<FooterProps> = ({
  loginNumber,
  currentLocale,
  version,
  versionContainer,
  onLogoutButtonClick,
  eulaLabel,
  eulaLink,
  onEulaLinkClick,
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
          <Eula
            dataSign="eula"
            currentLocale={currentLocale}
            link={eulaLink}
            label={eulaLabel}
            onClick={onEulaLinkClick}
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
