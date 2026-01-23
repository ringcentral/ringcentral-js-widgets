import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { SpinnerOverlay } from '@ringcentral-integration/widgets/components/SpinnerOverlay';
import type { RcButtonSize } from '@ringcentral/juno';
import {
  flexCenterStyle,
  palette2,
  RcButton,
  spacing,
  styled,
  typography,
} from '@ringcentral/juno';
import type { FunctionComponent } from 'react';
import React from 'react';

import i18n from './i18n';

export type LoginPageProps = {
  openOAuthPage: () => void;
  currentLocale: string;
  className?: string;
  disabled?: boolean;
  version?: string;
  showSignUp?: boolean;
  size?: RcButtonSize;
  showSpinner?: boolean;
  onSignUpButtonClick?: () => void;
};

const CustomButton = styled(RcButton)`
  ${typography('caption2')}
`;

const SignUpButton = styled(CustomButton)`
  margin-top: 5%;
`;

const LoginWrapper = styled.div`
  ${flexCenterStyle};
  flex: 1 1 auto;
  flex-direction: column;
  background-color: ${palette2('neutral', 'b01')};
  overflow: hidden;
  padding: ${spacing(4)};
  height: 100%;
`;

const VersionWrapper = styled.div`
  position: absolute;
  bottom: 1%;
  right: 1%;
  ${typography('caption1')};
  color: ${palette2('neutral', 'f03')};
`;

export const LoginPage: FunctionComponent<LoginPageProps> = ({
  className,
  disabled,
  version,
  children,
  showSignUp,
  openOAuthPage,
  currentLocale,
  showSpinner = false,
  size = 'medium',
  onSignUpButtonClick,
}) => {
  const { t } = useLocale(i18n);
  return (
    <LoginWrapper className={className}>
      <CustomButton
        data-sign="loginButton"
        variant="contained"
        fullWidth
        onClick={() => {
          openOAuthPage();
        }}
        disabled={disabled}
        size={size}
      >
        {t('loginButton')}
      </CustomButton>

      {showSignUp && (
        <SignUpButton
          variant="outlined"
          fullWidth
          size={size}
          onClick={onSignUpButtonClick}
        >
          {t('signupButton')}
        </SignUpButton>
      )}

      {version && (
        <VersionWrapper>
          {t('version')} {version}
        </VersionWrapper>
      )}

      {showSpinner && <SpinnerOverlay />}
      {children}
    </LoginWrapper>
  );
};
