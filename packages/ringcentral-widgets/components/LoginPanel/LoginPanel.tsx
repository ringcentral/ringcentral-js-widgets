import type { RcButtonSize } from '@ringcentral/juno';
import {
  flexCenterStyle,
  palette2,
  RcButton,
  styled,
  typography,
} from '@ringcentral/juno';
import type { FunctionComponent } from 'react';
import React from 'react';

import { headerViewHeight } from '../HeaderView/utils/HeaderViewUtils';
import type { SpinnerOverlayProps } from '../SpinnerOverlay';
import { SpinnerOverlay } from '../SpinnerOverlay';

import i18n from './i18n';

export type LoginPanelProps = {
  className?: string;
  currentLocale: string;
  onLoginButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  version?: string;
  showSignUp?: boolean;
  onSignUpButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** @deprecated */
  customStyles?: string;
  showSpinner?: boolean;
  customSpinner?: SpinnerOverlayProps['custom'];
  size?: RcButtonSize;
};

const CustomButton = styled(RcButton)`
  ${typography('caption2')}
`;

const SignUpButton = styled(CustomButton)`
  margin-top: 5%;
`;

const LoginWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  ${flexCenterStyle};
  flex-direction: column;
  background-color: ${palette2('neutral', 'b01')};
  padding: 0 10% ${headerViewHeight}px;
`;

const VersionWrapper = styled.div`
  position: absolute;
  bottom: 1%;
  right: 1%;
  ${typography('caption1')};
  color: ${palette2('neutral', 'f03')};
`;

export const LoginPanel: FunctionComponent<LoginPanelProps> = ({
  className,
  onLoginButtonClick,
  currentLocale,
  disabled,
  version,
  showSpinner,
  customSpinner,
  children,
  showSignUp,
  size = 'medium',
  onSignUpButtonClick,
  customStyles,
}) => {
  return (
    <LoginWrapper className={className}>
      <CustomButton
        variant="contained"
        data-sign="loginButton"
        className={customStyles}
        fullWidth
        onClick={onLoginButtonClick}
        disabled={disabled}
        size={size}
      >
        {i18n.getString('loginButton', currentLocale)}
      </CustomButton>

      {showSignUp && (
        <SignUpButton
          variant="outlined"
          fullWidth
          onClick={onSignUpButtonClick}
          size={size}
        >
          {i18n.getString('signupButton', currentLocale)}
        </SignUpButton>
      )}

      {version && (
        <VersionWrapper>
          {i18n.getString('version', currentLocale)} {version}
        </VersionWrapper>
      )}

      {showSpinner && (
        <SpinnerOverlay {...(customSpinner ? { custom: customSpinner } : {})} />
      )}
      {children}
    </LoginWrapper>
  );
};

LoginPanel.defaultProps = {};
