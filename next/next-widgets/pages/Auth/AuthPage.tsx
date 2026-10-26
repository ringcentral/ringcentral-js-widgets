import {
  Route,
  Switch,
  useRouteMatch,
} from '@ringcentral-integration/next-core';
import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';

import { LoginPage } from './LoginPage';

export const AuthPage: FunctionComponent<{
  currentLocale: string;
  openOAuthPage: () => void;
  disabled: boolean;
  showSpinner?: boolean;
  showSignUp?: boolean;
  onSignUpButtonClick?: () => void;
  brandName: string;
  appName: string;
  children?: ReactNode;
}> = ({
  openOAuthPage,
  showSpinner,
  currentLocale,
  children,
  disabled,
  showSignUp,
  onSignUpButtonClick,
  appName,
  brandName,
}) => {
  const match = useRouteMatch();

  const loginPath = `${match.path}`;
  return (
    <Switch>
      <Route
        path={loginPath}
        component={() => (
          <LoginPage
            disabled={disabled}
            showSpinner={showSpinner}
            currentLocale={currentLocale}
            openOAuthPage={openOAuthPage}
            showSignUp={showSignUp}
            onSignUpButtonClick={onSignUpButtonClick}
            appName={appName}
            brandName={brandName}
          >
            {children}
          </LoginPage>
        )}
      />
      {/* <Redirect from="*" to={loginPath} /> */}
    </Switch>
  );
};
