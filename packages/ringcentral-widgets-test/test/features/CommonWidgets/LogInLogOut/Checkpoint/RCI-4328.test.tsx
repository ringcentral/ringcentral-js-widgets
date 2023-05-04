/**
 * RCI-4328: Check Account Access Restriction
 * https://test_id_domain/test-cases/RCI-4328
 * Preconditions:
 * The user has logged into 3rd party
 * The user hasn't login CTI app
 * Entry point(/s):
 * (Enable AAR settings: AW > Click 'Login to Account' > More > Security and Compliance >Account Access Restriction)
 * 1.Login to SW > More > Security and Compliance >Account Access Restriction >Input the Realm ID> Click Save
 */
import {
  StepProp,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
  Given,
  p1,
  common,
} from '@ringcentral-integration/test-utils';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CheckAlertMessage } from '../../../../steps/Alert';
import { StepFunction } from '../../../../lib/step';
import { MockPostOauthToken } from '../../../../steps/Mock/MockPostOauthToken';
import {
  CreateMock,
  MockExtensionInfo,
  MockGetPhoneNumber,
} from '../../../../steps/Mock';
import { CreateInstance } from '../../../../steps/CreateInstance';
import { Context } from '../../../../interfaces';

export const AARRefresh: StepFunction = async (_, { rcMock, phone }) => {
  try {
    await phone.auth.refreshToken();
  } catch (error) {
    console.error('refreshToken error', error);
  }
};

const CheckAARAlert: StepFunction<{
  dataSign?: string;
  ifAlert?: boolean;
}> = async ({ ifAlert, dataSign }, context) => {
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
}> = async (props, context) => {
  const { loggedIn } = context.phone.auth;
  expect(loggedIn).toBe(!props.loginFail);
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
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
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
            async (props: { containsRealmId: boolean }, context: Context) => {
              if (!props.containsRealmId) {
                MockPostOauthToken(props, context);
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
