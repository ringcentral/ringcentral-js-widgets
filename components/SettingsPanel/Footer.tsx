import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import { Eula } from '../Eula';
import IconLine from '../IconLine';
import Line from '../Line';

import type { FooterProps } from './SettingsPanel.interface';
import i18n from './i18n';
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
  privacyNoticeLabel,
  privacyNoticeLink,
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
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            link={eulaLink}
            label={eulaLabel}
            onClick={onEulaLinkClick}
          />
        </Line>
        {privacyNoticeLink && privacyNoticeLabel && (
          <Line noBorder>
            <Eula
              dataSign="privacyNotice"
              currentLocale={currentLocale}
              link={privacyNoticeLink}
              label={privacyNoticeLabel}
            />
          </Line>
        )}
      </section>
      <section className={styles.section}>
        <IconLine
          noBorder
          dataSign="logoutButton"
          onClick={onLogoutButtonClick}
          icon={
            <span className={clsx(styles.logoutIcon, dynamicsFont.logout)} />
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
