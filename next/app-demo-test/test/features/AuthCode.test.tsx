import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  And,
  autorun,
  common,
  examples,
  Given,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { Entry } from '../steps/Entry';
import { Login } from '../steps/Login';
import { CreateMock } from '../steps/Mock';

@autorun(test)
@common
@title('check getAuthCode with enableDiscovery: ${enableDiscovery}')
export class CheckGetAuthCode extends Step {
  @examples(`
    | enableDiscovery |
    | true            |
    | false           |
  `)
  run() {
    return (
      <Scenario desc="User go to the app entry" action={Entry}>
        <Given desc="User login app and go to dialer page" action={Login} />
        <When
          desc="call getAuthCode() in Auth modules"
          action={
            (async (_, { app, payload }) => {
              const auth = app.container.got(Auth)!;
              payload.result = await auth.getAuthCode();
            }) as StepFunction
          }
        />
        <Then
          desc="getAuthCode() should return an auth code"
          action={
            ((_, { payload }) => {
              expect(typeof payload.result.code === 'string').toBeTruthy();
            }) as StepFunction
          }
        />
      </Scenario>
    );
  }
}

@autorun(test)
@common
@title('check Auth module')
export class CheckAuthModule extends Step {
  run() {
    return (
      <Scenario
        desc="go to the app entry and mock refresh token error"
        action={[
          CreateMock,
          ((_, { rcMock }) => {
            rcMock.defaultInitMocks.delete(rcMock.postOauthToken);
            rcMock.defaultInitMocks.add(() => {
              rcMock.postOauthToken({ failure: true, failureCode: 403 });
            });
          }) as StepFunction,
          <Entry manualMock />,
        ]}
      >
        <When
          desc="add afterLoggedInHandler and refreshErrorHandler hooks"
          action={
            (async (_, { app, payload }) => {
              const auth = app.container.got(Auth)!;
              payload.loggedInFn = jest.fn();
              payload.loggedInFn1 = jest.fn();
              auth.addAfterLoggedInHandler(payload.loggedInFn);
              const loggedInFnCallback1 = auth.addAfterLoggedInHandler(
                payload.loggedInFn1,
              );
              expect(typeof loggedInFnCallback1 === 'function').toBeTruthy();
              loggedInFnCallback1();

              payload.refreshErrorFn = jest.fn();
              payload.refreshErrorFn1 = jest.fn();
              auth.addRefreshErrorHandler(payload.refreshErrorFn);
              const refreshErrorFnCallback1 = auth.addRefreshErrorHandler(
                payload.refreshErrorFn1,
              );
              expect(
                typeof refreshErrorFnCallback1 === 'function',
              ).toBeTruthy();
              refreshErrorFnCallback1();
            }) as StepFunction
          }
        />
        <And desc="User login app" action={Login} />
        <Then
          desc="check the afterLoggedInHandler and refreshErrorHandler hooks should be called"
          action={
            (async (_, { payload }) => {
              expect(payload.loggedInFn).toHaveBeenCalled();
              expect(payload.loggedInFn1).not.toHaveBeenCalled();
            }) as StepFunction
          }
        />
        <Then
          desc="make the app refresh token"
          action={
            (async (_, { app }) => {
              const auth = app.container.got(Auth)!;
              try {
                await auth.refreshToken();
              } catch (err) {
                //
              }
            }) as StepFunction
          }
        />
        <When
          desc="check the afterLoggedInHandler and refreshErrorHandler hooks should be called"
          action={
            (async (_, { payload }) => {
              expect(payload.refreshErrorFn).toHaveBeenCalled();
              expect(payload.refreshErrorFn1).not.toHaveBeenCalled();
            }) as StepFunction
          }
        />
      </Scenario>
    );
  }
}
