import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import type { RcButtonSize } from '@ringcentral/juno';
import { Button } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import { SpringSpinnerOverlay } from '../../components';

import i18n from './i18n';
import WelcomeSvg from './welcome.svg';

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
  brandName: string;
  appName: string;
};

export const LoginPage: FunctionComponent<LoginPageProps> = ({
  className,
  disabled,
  children,
  showSignUp,
  openOAuthPage,
  showSpinner = false,
  appName,
  brandName,
  onSignUpButtonClick,
}) => {
  const { t } = useLocale(i18n);
  return (
    <SpringSpinnerOverlay loading={showSpinner}>
      <div
        className={clsx(
          'flex flex-col flex-auto items-center justify-between bg-neutral-base p-4 h-full overflow-hidden',
          className,
        )}
      >
        <div className="mt-8">
          <WelcomeSvg width="160" height="160" />
        </div>
        <div className="mb-6 self-stretch flex flex-col justify-start items-center gap-5">
          <div
            className="text-neutral-b0 typography-title"
            data-sign="login-title"
          >
            {t('title', { brandName })}
          </div>
          <div className="self-stretch h-10 flex flex-col justify-start items-center gap-1">
            <div
              className="self-stretch typography-descriptor text-center text-neutral-b2"
              data-sign="login-desc"
            >
              {t('description', { appName })}
            </div>
          </div>
        </div>
        <div className="container flex flex-col justify-start items-center gap-4">
          <Button
            className=""
            color="primary"
            size="large"
            variant="contained"
            onClick={openOAuthPage}
            disabled={disabled}
            data-sign="loginButton"
            fullWidth
          >
            {t('loginButton')}
          </Button>
          {showSignUp && (
            <Button
              className=""
              color="primary"
              size="large"
              variant="outlined"
              onClick={onSignUpButtonClick}
              data-sign="signUpButton"
              fullWidth
            >
              {t('signupButton')}
            </Button>
          )}
        </div>
        {children}
      </div>
    </SpringSpinnerOverlay>
  );
};
