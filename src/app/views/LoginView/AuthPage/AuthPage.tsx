import { useAppFooter } from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { SpringSpinnerOverlay } from '@ringcentral-integration/next-widgets/components';
import type { RcButtonSize } from '@ringcentral/juno';
import { Button } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import i18n from './i18n';
import WelcomeSvg from './welcome.svg';

export type AuthPageProps = {
  openOAuthPage: () => void;
  currentLocale: string;
  className?: string;
  disabled?: boolean;
  version?: string;
  description?: string;
  welcomePicture?: any;
  showSignUp?: boolean;
  size?: RcButtonSize;
  showSpinner?: boolean;
  onSignUpButtonClick?: () => void;
  brandName: string;
  appName: string;
  logoUrl?: string;
};

export const AuthPage: FunctionComponent<AuthPageProps> = ({
  logoUrl,
  className,
  disabled,
  children,
  showSignUp,
  openOAuthPage,
  showSpinner = false,
  appName,
  brandName,
  welcomePicture,
  description,
  onSignUpButtonClick,
}) => {
  const { t } = useLocale(i18n);

  // use AppFooter for toast position calculation
  const { footer } = useAppFooter({
    defaultFooter: (
      <div className="w-full flex flex-col justify-start items-center gap-4 px-3">
        <Button
          color="primary"
          size="medium"
          variant="contained"
          onClick={openOAuthPage}
          disabled={disabled}
          data-sign="loginButton"
          fullWidth
        >
          {t('loginButton')}
        </Button>
        {showSignUp ? (
          <div className="flex typography-descriptor text-neutral-b2 pb-3">
            <span data-sign="newUser" className="text-nowrap">
              {t('newUser')}
            </span>
            <button
              className="pl-1 underline hover:text-neutral-b2/70 active:text-neutral-b2/80 outline-none focus:text-neutral-b2/80"
              onClick={onSignUpButtonClick}
              data-sign="signUpButton"
            >
              {t('tryForFree')}
            </button>
          </div>
        ) : (
          <div className="h-2" />
        )}
        {children}
      </div>
    ),
    additionalFooterHeight: -16,
  });

  return (
    <SpringSpinnerOverlay loading={showSpinner}>
      <div
        className={clsx(
          'flex flex-col items-center justify-between pt-6 px-3 gap-12',
          className,
        )}
      >
        <img src={logoUrl} alt="logo" className="w-[158px] h-[24px]" />
        {welcomePicture ?? <WelcomeSvg width="240" height="170" />}
        <div className="flex flex-col justify-start items-center gap-4">
          <div
            className="text-neutral-b0 typography-display3 text-center"
            data-sign="login-title"
          >
            {t('title', { brandName })}
          </div>
          <div className="flex flex-col justify-start items-center gap-1">
            <div
              className="typography-descriptor text-center text-neutral-b0"
              data-sign="login-desc"
            >
              {description ?? t('description', { appName })}
            </div>
          </div>
        </div>
      </div>
      <i className="flex-auto" />
      {footer}
    </SpringSpinnerOverlay>
  );
};
