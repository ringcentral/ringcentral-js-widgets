import {
  RcButton,
  RcButtonSize,
  RcCircularProgress,
} from '@ringcentral-integration/rcui';
import classNames from 'classnames';
import React, { FunctionComponent, useCallback } from 'react';
import { SpinnerOverlay } from 'ringcentral-widgets/components/SpinnerOverlay';

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
  isWide?: boolean;
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
  isWide,
}) => {
  const CustomSpinner = useCallback<FunctionComponent>(
    () => <RcCircularProgress size={isWide ? 40 : 20} />,
    [isWide],
  );

  const spinner = showSpinner ? (
    <SpinnerOverlay
      classes={{ container: styles.spinner }}
      custom={CustomSpinner}
    />
  ) : null;

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
      {spinner}
      {children}
    </div>
  );
};
