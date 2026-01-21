import {
  And,
  autorun,
  examples,
  Given,
  mockAllLogs,
  p2,
  Scenario,
  screen,
  Step,
  StepFunction,
  Then,
  title,
  ut,
} from '@ringcentral-integration/test-utils';

import { Auth, loginStatus } from '../../src/app/services';
import { Entry } from '../steps/Entry';

beforeEach(() => {
  mockAllLogs();
});
@autorun(test)
@ut
@p2
@title('App render correctly')
class AppRender extends Step {
  run() {
    return (
      <Scenario desc="App render">
        <Given desc="App render" action={<Entry />} />
        <Then
          desc="Auth module miss Loc function check unit test"
          action={[
            (async (_, { app }) => {
              const auth = app.container.got(Auth)!;

              expect(auth).toBeDefined();

              auth.setLoginError();

              expect(auth.loginStatus).toBe(loginStatus.notLoggedIn);
              expect(auth.token).toEqual({
                ownerId: undefined,
                endpointId: undefined,
                accessToken: undefined,
                tokenType: undefined,
                expireTime: undefined,
                expiresIn: undefined,
                scope: undefined,
              });
              expect(auth._triggerSyncToken).toBeTruthy();
              expect(auth.isFreshLogin).toBeNull();

              auth.setCancelLogout();
              expect(auth.loginStatus).toBe(loginStatus.loggedIn);

              const refreshTokenHelper = auth['refreshTokenHelper'];

              const client = auth['_client'];
              const platform = client.service.platform();

              const origin = platform.get.bind(platform);
              jest
                .spyOn(platform, 'get')
                .mockImplementation((url: string, ...args: any) => {
                  if (url === '/restapi/v1.0/client-info') return true;
                  return origin(url, ...args);
                });
              platform['_authProxy'] = true;
              const result = await refreshTokenHelper.loggedIn();
              expect(result).toBeTruthy();

              Object.defineProperty(platform, '_authProxy', {
                get() {
                  throw new Error('Refresh token has expired');
                },
              });

              const result2 = await refreshTokenHelper.loggedIn();
              expect(result2).toBeFalsy();

              expect(console.log).toHaveBeenCalledWith(
                'Expired token data clear',
              );

              // should be back to 100ms(default in SDK)
              expect(platform['_refreshDelayMs']).toBe(100);
            }) as StepFunction,
          ]}
        />
        <And
          desc="Have 'Sign In' there on the view"
          action={() => {
            expect(screen.queryByText('Sign In')).toBeInTheDocument();
          }}
        />
      </Scenario>
    );
  }
}
