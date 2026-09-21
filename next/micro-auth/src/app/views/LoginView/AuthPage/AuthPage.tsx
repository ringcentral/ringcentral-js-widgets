import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import type { ThemeType } from '@ringcentral-integration/micro-core/src/app/services';
import { SpringSpinnerOverlay } from '@ringcentral-integration/next-widgets/components';
import { Button, Link } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import type { CSSProperties, FunctionComponent, ReactNode } from 'react';
import React from 'react';

import i18n from './i18n';

/**
 * `variant="card"`: full-page warm base + radial washes (standardized sign-in card layout).
 */
const cardVariantPageBackgroundStyle: CSSProperties = {
  backgroundColor: 'rgb(255, 217, 199)',
  backgroundImage: [
    'radial-gradient(circle at 98% 2%, rgb(226, 240, 254) 4.23%, transparent 62.76%)',
    'radial-gradient(circle at 91% 56%, rgb(253, 227, 238) 2.75%, transparent 38.25%)',
    'radial-gradient(circle at 96% 95%, rgb(255, 219, 238) 5.77%, transparent 42.84%)',
    'radial-gradient(circle at 3% 54%, rgb(255, 203, 163) 3.44%, transparent 40.01%)',
    'radial-gradient(circle at 1% 1%, rgb(255, 236, 224) 19.35%, transparent 62.76%)',
    'radial-gradient(circle at 51% 2%, rgb(229, 224, 224) 19.35%, transparent 62.76%)',
    'radial-gradient(circle at 52% 98%, rgb(255, 220, 214) 19.35%, transparent 62.76%)',
    'radial-gradient(circle at 2% 97%, rgb(255, 212, 179) 19.35%, transparent 62.76%)',
  ].join(', '),
};

/**
 * `variant="card"` + dark / contrast: same radial layout as {@link cardVariantPageBackgroundStyle},
 * with charcoal base and muted warm / cool glows (aligned with hero dark treatment).
 */
const cardVariantDarkPageBackgroundStyle: CSSProperties = {
  backgroundColor: '#1a1a1e',
  backgroundImage: [
    'radial-gradient(circle at 98% 2%, rgba(70, 88, 118, 0.55) 4.23%, transparent 62.76%)',
    'radial-gradient(circle at 91% 56%, rgba(92, 58, 72, 0.42) 2.75%, transparent 38.25%)',
    'radial-gradient(circle at 96% 95%, rgba(88, 52, 68, 0.38) 5.77%, transparent 42.84%)',
    'radial-gradient(circle at 3% 54%, rgba(112, 72, 52, 0.45) 3.44%, transparent 40.01%)',
    'radial-gradient(circle at 1% 1%, rgba(96, 72, 58, 0.4) 19.35%, transparent 62.76%)',
    'radial-gradient(circle at 51% 2%, rgba(58, 58, 62, 0.45) 19.35%, transparent 62.76%)',
    'radial-gradient(circle at 52% 98%, rgba(96, 62, 58, 0.38) 19.35%, transparent 62.76%)',
    'radial-gradient(circle at 2% 97%, rgba(108, 78, 52, 0.42) 19.35%, transparent 62.76%)',
  ].join(', '),
};

/**
 * `variant="hero"`: soft pastel band along the top (~upper quarter), fading to white
 * (standardized sign-in hero — peach top-left, sky-blue top-right, subtle pink/lavender bridge).
 */
const heroVariantPageBackgroundStyle: CSSProperties = {
  backgroundColor: '#FFFFFF',
  backgroundImage: [
    'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 22%, #FFFFFF 38%, #FFFFFF 100%)',
    'radial-gradient(ellipse 95% 80% at 10% 0%, rgba(255, 218, 200, 0.78) 0%, transparent 58%)',
    'radial-gradient(ellipse 90% 76% at 90% 0%, rgba(215, 232, 252, 0.85) 0%, transparent 56%)',
    'radial-gradient(ellipse 58% 44% at 50% 5%, rgba(237, 225, 242, 0.52) 0%, transparent 52%)',
  ].join(', '),
};

/**
 * `variant="hero"` + dark / contrast: charcoal base with soft warm (TL) and cool (TR) glows.
 */
const heroVariantDarkPageBackgroundStyle: CSSProperties = {
  backgroundColor: '#1a1a1e',
  backgroundImage: [
    'radial-gradient(ellipse 100% 90% at 12% 8%, rgba(61, 42, 42, 0.65) 0%, transparent 58%)',
    'radial-gradient(ellipse 95% 88% at 88% 10%, rgba(44, 58, 79, 0.58) 0%, transparent 55%)',
    'radial-gradient(ellipse 75% 55% at 48% 18%, rgba(30, 36, 46, 0.45) 0%, transparent 52%)',
  ].join(', '),
};

/** Standardized welcome card (glass): matches desktop welcome / sign-in reference. */
const loginCardStyle: CSSProperties = {
  background:
    'linear-gradient(rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.8) 47.6%, rgba(255, 255, 255, 0.95) 100%)',
};

/** Dark theme glass panel for `variant="card"` (pairs with {@link cardVariantDarkPageBackgroundStyle}). */
const loginCardDarkStyle: CSSProperties = {
  background:
    'linear-gradient(rgba(42, 42, 46, 0.55) 0%, rgba(32, 32, 36, 0.82) 47.6%, rgba(26, 26, 30, 0.94) 100%)',
};

export type AuthPageVariant = 'hero' | 'card';

export type AuthPageProps = {
  /** Primary sign-in action. */
  openOAuthPage: () => void;
  /** Used for the default `description` i18n string. */
  appName: string;
  brandName: string;
  disabled?: boolean;
  showSpinner?: boolean;
  logoUrl?: string;
  /** Logo `img` alt text; defaults to empty (decorative). */
  logoAlt?: string;
  variant?: AuthPageVariant;
  /** Optional heading for the card variant. */
  title?: string;
  /** Supporting copy; defaults to i18n `description` with `appName`. */
  description?: string;
  welcomePicture?: ReactNode;
  showSignUp?: boolean;
  onSignUpButtonClick?: () => void;
  /** Overrides the sign-in button label from i18n. */
  signInButtonLabel?: string;
  newUserLabel?: string;
  tryForFreeLabel?: string;
  /** Bottom footer link (e.g. Integration Console “Learn more” → admin guide). */
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
  themeType?: ThemeType;
};

export const AuthPage: FunctionComponent<AuthPageProps> = ({
  logoUrl,
  logoAlt = '',
  className,
  disabled,
  children,
  showSignUp,
  openOAuthPage,
  showSpinner = false,
  appName,
  brandName,
  variant = 'hero',
  title,
  description,
  onSignUpButtonClick,
  signInButtonLabel,
  newUserLabel,
  tryForFreeLabel,
  footer,
  themeType,
}) => {
  const { t } = useLocale(i18n);
  const titleText = title;
  const descriptionText = description ?? t('description', { appName });
  const signInText = signInButtonLabel ?? t('loginButton');
  const newUserText = newUserLabel ?? t('newUser', { brandName });
  const tryForFreeText = tryForFreeLabel ?? t('tryForFree');
  const isHeroVariant = variant === 'hero';
  const isDark = themeType === 'dark' || themeType === 'contrast';

  let shellStyle: CSSProperties;
  if (isHeroVariant) {
    shellStyle = isDark
      ? heroVariantDarkPageBackgroundStyle
      : heroVariantPageBackgroundStyle;
  } else {
    shellStyle = isDark
      ? cardVariantDarkPageBackgroundStyle
      : cardVariantPageBackgroundStyle;
  }

  let loginPanelStyle: CSSProperties | undefined;
  if (isHeroVariant) {
    // when be hero variant, the login panel always non set
    loginPanelStyle = undefined;
  } else if (isDark) {
    loginPanelStyle = loginCardDarkStyle;
  } else {
    loginPanelStyle = loginCardStyle;
  }

  const renderSignUp = () => {
    if (!showSignUp) return null;
    return (
      <div className="flex flex-wrap typography-descriptor text-neutral-b2 pb-1 justify-center gap-2">
        <span data-sign="newUser" className="text-nowrap">
          {newUserText}
        </span>
        <Link
          variant="primary"
          onClick={onSignUpButtonClick}
          data-sign="signUpButton"
          type="button"
        >
          {tryForFreeText}
        </Link>
      </div>
    );
  };

  return (
    <SpringSpinnerOverlay loading={showSpinner}>
      <div
        className={clsx('relative flex min-h-full flex-col', className)}
        style={shellStyle}
      >
        <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
              <div
                className={clsx(
                  'flex flex-col items-center',
                  isHeroVariant
                    ? undefined
                    : 'rounded-2xl border-2 border-solid border-neutral-w0',
                  'pt-12 px-8 pb-8 backdrop-blur-[2px]',
                )}
                data-sign="login-panel"
                style={loginPanelStyle}
              >
                <div className="mb-6 flex h-7 items-center justify-center gap-2">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={logoAlt}
                      className="h-7 w-auto max-w-[220px]"
                      data-sign="login-logo"
                    />
                  ) : null}
                  {titleText ? (
                    <span
                      className="typography-display3 font-bold italic text-nowrap text-neutral-b0"
                      data-sign="login-title"
                      style={{
                        fontSize: '27px',
                        letterSpacing: '-1.5px',
                      }}
                    >
                      {titleText}
                    </span>
                  ) : null}
                </div>

                <div className="max-w-[360px] w-full">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <p
                      className="typography-subtitle font-medium text-neutral-b0"
                      data-sign="login-desc"
                    >
                      {descriptionText}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-col gap-4">
                    <Button
                      color="primary"
                      size="xlarge"
                      variant="contained"
                      onClick={openOAuthPage}
                      disabled={disabled}
                      data-sign="loginButton"
                      fullWidth
                      className="min-h-12 rounded-[10px]"
                    >
                      {signInText}
                    </Button>
                    {renderSignUp()}
                    {children}
                  </div>
                </div>
              </div>
            </div>
            {footer ? (
              <div className="relative flex shrink-0 items-center justify-center px-4 py-3 bg-neutral-base gap-4">
                {footer}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </SpringSpinnerOverlay>
  );
};
