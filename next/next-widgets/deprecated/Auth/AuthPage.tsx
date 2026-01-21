import {
  Route,
  Switch,
  useRouteMatch,
} from '@ringcentral-integration/next-core';
import type { FunctionComponent } from 'react';
import React from 'react';

import { LoginPage } from './LoginPage';

/**
 * @deprecated use pages/Auth/AuthPage instead
 */
export const AuthPage: FunctionComponent<{
  currentLocale: string;
  openOAuthPage: () => void;
  disabled: boolean;
  showSpinner?: boolean;
  showSignUp?: boolean;
  onSignUpButtonClick?: () => void;
}> = ({
  openOAuthPage,
  showSpinner,
  currentLocale,
  children,
  disabled,
  showSignUp,
  onSignUpButtonClick,
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
            children={children}
            showSpinner={showSpinner}
            currentLocale={currentLocale}
            openOAuthPage={openOAuthPage}
            showSignUp={showSignUp}
            onSignUpButtonClick={onSignUpButtonClick}
          />
        )}
      />
      {/* <Redirect from="*" to={loginPath} /> */}
    </Switch>
  );
};
