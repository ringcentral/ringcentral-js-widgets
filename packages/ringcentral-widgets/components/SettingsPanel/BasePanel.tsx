import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import { Header } from '../Header';
import Panel from '../Panel';
import { SpinnerOverlay } from '../SpinnerOverlay';
import { Footer } from './Footer';
import i18n from './i18n';
import { BasePanelProps } from './SettingsPanel.interface';
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
}) => {
  if (showSpinner) {
    return <SpinnerOverlay />;
  }

  return (
    <div className={classnames(styles.root, className)}>
      {showHeader ? (
        <Header>{i18n.getString('settings', currentLocale)}</Header>
      ) : null}
      <Panel
        className={classnames(
          styles.content,
          showHeader && styles.contentWithHeader,
        )}
      >
        {children}
        <Footer
          {...{
            loginNumber,
            currentLocale,
            eulaLabel,
            eulaLink,
            onEulaLinkClick,
            onLogoutButtonClick,
            version,
            versionContainer,
          }}
        />
      </Panel>
    </div>
  );
};
