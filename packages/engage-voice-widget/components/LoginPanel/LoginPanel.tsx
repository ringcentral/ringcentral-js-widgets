import { RcButton, RcButtonSize } from '@ringcentral/juno';
import classNames from 'classnames';
import React, { FunctionComponent, useEffect } from 'react';

import i18n from './i18n';
import styles from './styles.scss';

export interface LoginPanelProps {
  className?: string;
  onLoginButtonClick: () => void;
  currentLocale: string;
  disabled?: boolean;
  version?: string;
  showSpinner?: boolean;
  showSignUp?: boolean;
  onSignUpButtonClick?: () => void;
  customStyles?: string;
  size?: RcButtonSize;
  onLoading: Function;
  onLoadingComplete: Function;
}

export const LoginPanel: FunctionComponent<LoginPanelProps> = ({
  className,
  onLoginButtonClick,
  currentLocale,
  disabled,
  version,
  showSpinner,
  children,
  showSignUp,
  onSignUpButtonClick,
  customStyles,
  size = 'medium',
  onLoading,
  onLoadingComplete,
}) => {
  useEffect(() => {
    if (showSpinner) {
      onLoading();
    } else {
      onLoadingComplete();
    }

    return () => {
      onLoadingComplete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSpinner]);

  const versionDisplay = version ? (
    <div className={styles.versionContainer}>
      {i18n.getString('version', currentLocale)} {version}
    </div>
  ) : null;

  const signUpButton = showSignUp ? (
    <RcButton
      variant="contained"
      className={styles.signUpButton}
      onClick={onSignUpButtonClick}
      size={size}
    >
      {i18n.getString('signupButton', currentLocale)}
    </RcButton>
  ) : null;

  return (
    <div className={classNames(styles.root, className)}>
      <RcButton
        variant="contained"
        data-sign="loginButton"
        className={classNames(styles.loginButton, customStyles)}
        onClick={onLoginButtonClick}
        disabled={disabled}
        size={size}
      >
        {i18n.getString('loginButton', currentLocale)}
      </RcButton>
      {signUpButton}
      {versionDisplay}
      {children}
    </div>
  );
};
