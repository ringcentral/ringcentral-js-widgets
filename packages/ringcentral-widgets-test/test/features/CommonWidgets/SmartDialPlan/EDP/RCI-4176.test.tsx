import {
  And,
  autorun,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { StepProp } from '../../../../lib/step';
import {
  CheckParseApiCalledWithParams,
  MakeCall,
} from '../../../../steps/Call';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { SendSMS } from '../../../../steps/Messages/actions';
import { MockAccountInfo } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router/action';
import { SetAreaCode } from '../../../../steps/Settings';

@autorun(test.skip)
@it
@p2
@title('EDP:Send requests to the API when making a call/sms')
export class RCI4176 extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;
  @examples(`
      | maxExtensionNumberLength | areaCode | phoneNumber    |
      | 7                        | '251'    | '+12513734253' |
      | 7                        | '205'    | '2430001'      |
      | 8                        | '251'    | '2630002'      |
      | 7                        | null     | '2630002'      |
    `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="OCP disable and dialed number ambiguous"
        action={[
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength =
                this.context.example.maxExtensionNumberLength;
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="Login APP" action={Login} />
        <And
          desc="1. navigate to region setting page
                     2. set area code"
          action={async ({ areaCode }: any) => {
            return !areaCode ? null : (
              <>
                <NavigateTo path="/settings/region" />
                <SetAreaCode areaCode={this.context.example.areaCode} />
              </>
            );
          }}
        />
        <When
          desc="Send message"
          action={[<NavigateTo path="/composeText" />, SendSMS]}
        />
        <Then
          desc="Check passed parameters to API request number-parser/parse"
          action={CheckParseApiCalledWithParams}
        />
        <When
          desc="Make an outbound call"
          action={[<NavigateTo path="/dialer" />, MakeCall]}
        />
        <Then
          desc="Check passed parameters to API request number-parser/parse"
          action={CheckParseApiCalledWithParams}
        />
      </Scenario>
    );
  }
}
