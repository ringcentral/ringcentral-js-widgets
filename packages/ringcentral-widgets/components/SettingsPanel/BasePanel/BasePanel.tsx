import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import Panel from '../../Panel';
import { SpinnerOverlay } from '../../SpinnerOverlay';
import Eula from '../../Eula';
import { Footer, FooterProps } from '../SettingItems/Footer';
import { Header, HeaderProps } from '../SettingItems/Header';
import styles from '../styles.scss';

export interface BasePanelProps extends HeaderProps, FooterProps {
  currentLocale: string;
  className?: string;
  showSpinner?: boolean;
  children?: ReactNode;
}

const BasePanel: FunctionComponent<BasePanelProps> = ({
  currentLocale,
  className,
  showSpinner,
  showHeader,
  children,
  brandId,
  loginNumber,
  onLogoutButtonClick,
  EulaRenderer,
  version,
  versionContainer,
}) => {
  if (showSpinner) {
    return <SpinnerOverlay />;
  }

  return (
    <div className={classnames(styles.root, className)}>
      <Header showHeader={showHeader} currentLocale={currentLocale} />
      <Panel
        className={classnames(
          styles.content,
          showHeader && styles.contentWithHeader,
        )}
      >
        {children}
        <Footer
          brandId={brandId}
          loginNumber={loginNumber}
          currentLocale={currentLocale}
          onLogoutButtonClick={onLogoutButtonClick}
          EulaRenderer={EulaRenderer}
          version={version}
          versionContainer={versionContainer}
        />
      </Panel>
    </div>
  );
};

BasePanel.defaultProps = {
  className: null,
  showSpinner: false,
  showHeader: false,
  children: null,
  EulaRenderer: Eula,
};

export default BasePanel;
