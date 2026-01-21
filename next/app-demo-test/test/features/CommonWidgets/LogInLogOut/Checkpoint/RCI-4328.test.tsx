/**
 * RCI-4328: Check Account Access Restriction
 * https://test_it_domain/test-cases/RCI-4328
 * Preconditions:
 * The user has logged into 3rd party
 * The user hasn't login CTI app
 * Entry point(/s):
 * (Enable AAR settings: AW > Click 'Login to Account' > More > Security and Compliance >Account Access Restriction)
 * 1.Login to SW > More > Security and Compliance >Account Access Restriction >Input the Realm ID> Click Save
 */
import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  autorun,
  common,
  examples,
  Given,
  it,
  p1,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckAlertMessage } from '../../../../steps/Alert';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import {
  CreateMock,
  MockExtensionInfo,
  MockGetPhoneNumber,
  MockPostOauthToken,
} from '../../../../steps/Mock';

export const AARRefresh: StepFunction = async (_, { app }) => {
  const auth = app.container.got(Auth)!;
  try {
    await auth.refreshToken();
  } catch (error) {
    console.error('refreshToken error', error);
  }
};

const CheckAARAlert: StepFunction<{
  dataSign?: string;
  ifAlert?: boolean;
}> = async ({ ifAlert, dataSign }) => {
  if (!ifAlert) {
    return;
  }
  return (
    <CheckAlertMessage
      dataSign={dataSign}
      message="Sorry, use a different account to sign in. Please ask your IT admin for assistance."
    />
  );
};

export const CheckLogInResult: StepFunction<{
  loginFail?: boolean;
}> = async (props, { app }) => {
  const auth = app.container.got(Auth)!;
  expect(auth.loggedIn).toBe(!props.loginFail);
};

interface CheckAARProps {
  CustomLogin: StepFunction<any>;
  CustomCreateMock: StepFunction<any>;
}

@autorun(test.skip)
@it
@p1
@common
@title('Check Account Access Restriction')
export class CheckAAR extends Step<CheckAARProps> {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  AARAlertDataSign?: string;
  @examples(`
    |account        | containsRealmId   |  loginFail         | ifAlert     |
    |'Account_A'    | true              |      false         |  false      |
    |'Account_B'    | false             |      true          |  true       |
  `)
  run() {
    return (
      <Scenario desc="Check Account Access Restriction">
        <Given desc="User login with {account}" />
        <Given
          desc="User change network with {containsRealmId}"
          action={[
            this.CreateMock,
            async (props: any) => {
              if (!props.containsRealmId) {
                return <MockPostOauthToken {...props} />;
              }
            },
            MockExtensionInfo,
            MockGetPhoneNumber,
            this.Login,
          ]}
        />

        <When desc="User refresh token" action={AARRefresh} />
        <Then desc="Check login result " action={CheckLogInResult} />
        <Then
          desc="Check alert "
          action={<CheckAARAlert dataSign={this.AARAlertDataSign} />}
        />
      </Scenario>
    );
  }
}
