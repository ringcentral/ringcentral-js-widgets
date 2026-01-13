import {
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  StepFunction,
  And,
  common,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../steps/CommonLogin';
import { CreateInstance } from '../../steps/CreateInstance';
import { CreateMock } from '../../steps/Mock';

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
          <CreateInstance />,
        ]}
      >
        <When
          desc="add afterLoggedInHandler and refreshErrorHandler hooks"
          action={
            (async (_, { phone, payload }) => {
              const { auth } = phone;
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
        <And
          desc="User login app"
          action={<CommonLogin CreateInstance={() => {}} />}
        />
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
            (async (_, { phone }) => {
              const { auth } = phone;
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
