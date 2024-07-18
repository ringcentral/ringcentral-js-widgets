import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import { Header } from '../Header';
import Panel from '../Panel';
import { SpinnerOverlay } from '../SpinnerOverlay';

import { Footer } from './Footer';
import type { BasePanelProps } from './SettingsPanel.interface';
import i18n from './i18n';
import styles from './styles.scss';

export const BasePanel: FunctionComponent<BasePanelProps> = ({
  currentLocale,
  className,
  showSpinner,
  showHeader,
  children,
  loginNumber,
  onLogoutButtonClick,
  eulaLabel,
  eulaLink,
  onEulaLinkClick,
  version,
  versionContainer,
  privacyNoticeLabel,
  privacyNoticeLink,
}) => {
  if (showSpinner) {
    return <SpinnerOverlay />;
  }

  return (
    <div className={clsx(styles.root, className)}>
      {showHeader ? (
        <Header>{i18n.getString('settings', currentLocale)}</Header>
      ) : null}
      <Panel
        className={clsx(styles.content, showHeader && styles.contentWithHeader)}
      >
        {children}
        <Footer
          {...{
            loginNumber,
            currentLocale,
            eulaLabel,
            eulaLink,
            onEulaLinkClick,
            privacyNoticeLabel,
            privacyNoticeLink,
            onLogoutButtonClick,
            version,
            versionContainer,
          }}
        />
      </Panel>
    </div>
  );
};
