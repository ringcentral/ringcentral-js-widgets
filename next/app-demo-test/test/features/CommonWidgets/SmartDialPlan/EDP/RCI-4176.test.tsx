import { NumberValidate } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  And,
  autorun,
  common,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { generateDialPlanData } from '../../../../__mock__/generateDialPlanData';
import {
  CheckParseApiCalledWithParams,
  MakeCall,
} from '../../../../steps/Call';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { SendSMS } from '../../../../steps/Messages/actions';
import {
  CreateMock,
  MockAccountInfo,
  MockDialingPlan,
  MockExtensionInfo,
} from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';
import { SetAreaCode } from '../../../../steps/Settings';

@autorun(test)
@common
@it
@p2
@title('EDP:Send requests to the API when making a call/sms')
export class RCI4176 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  @examples(`
    | country | maxExtensionNumberLength | areaCode | phoneNumber    |
    | 'GB'    | 7                        | '251'    | '2430001'      |
    | 'US'    | 7                        | ''       | '+12513734253' |
    | 'SG'    | 8                        | '251'    | '2630002'      |
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
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry.isoCode =
                this.example.country;
              return mockData;
            }}
          />,
          <MockDialingPlan
            handler={() => {
              return [
                generateDialPlanData('44', '44', 'United Kingdom', 'GB'),
                generateDialPlanData('1', '1', 'United States', 'US'),
              ];
            }}
          />,
        ]}
      >
        <Given
          desc="Login APP"
          action={[
            Login,
            ((_, { app }) => {
              const numberValidate = app.container.got(NumberValidate)!;
              jest.spyOn(numberValidate, '_parsingPhoneNumber');
            }) as StepFunction,
          ]}
        />
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
