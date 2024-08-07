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
import type { StepProp } from '@ringcentral-integration/test-utils';
import {
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
import { waitUntilTo } from '@ringcentral-integration/utils';

import type { Context } from '../../../../interfaces';
import type { StepFunction } from '../../../../lib/step';
import { CheckAlertMessage } from '../../../../steps/Alert';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import {
  CreateMock,
  MockExtensionInfo,
  MockGetPhoneNumber,
  MockPostOauthToken,
} from '../../../../steps/Mock';

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
  await waitUntilTo(() => {
    const { loggedIn } = context.phone.auth;
    expect(loggedIn).toBe(!props.loginFail);
  });
};

interface CheckAARProps {
  CustomLogin: StepFunction<any>;
  CustomCreateMock: StepFunction<any>;
}

@autorun(test)
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
