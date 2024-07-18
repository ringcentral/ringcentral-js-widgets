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

import { generateDialPlanData } from '../../../../__mock__/generateDialPlanData';
import type { StepProp } from '../../../../lib/step';
import {
  CheckParseApiCalledWithParams,
  MakeCall,
} from '../../../../steps/Call';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { SendSMS } from '../../../../steps/Messages/actions';
import {
  MockAccountInfo,
  MockDialingPlan,
  MockExtensionInfo,
  MockPermission,
} from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';
import { SetAreaCode } from '../../../../steps/Settings';

@autorun(test.skip)
@it
@p2
@title('OCP enable and dialed number ambiguous')
export class RCI4103 extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp | null = null;
  @examples(`
    | country | maxExtensionNumberLength | areaCode | phoneNumber    | outboundCallPrefix |
    | 'US'    | 7                        | null     | '+12053135003' | null               |
    | 'US'    | 7                        | null     | '92430001'     | 9                  |
    | 'SG'    | 7                        | '205'    | '2430001'      | null               |
    | 'SG'    | 8                        | '205'    | '92430001'     | 9                  |
    | 'US'    | 8                        | null     | '2630002'      | 9                  |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="OCP enable and dialed number ambiguous"
        action={[
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength =
                this.context.example.maxExtensionNumberLength;
              return mockData;
            }}
          />,
          <MockPermission
            handler={(features) => {
              const outboundCallPrefix =
                this.context.example.outboundCallPrefix;
              const permission = features
                .filter((feature) => {
                  return feature.id !== 'OutboundCallPrefix';
                })
                .concat([
                  {
                    id: 'OutboundCallPrefix',
                    available: !!outboundCallPrefix,
                    params: [
                      { name: 'OutboundCallPrefix', value: outboundCallPrefix },
                    ],
                  },
                ]);
              return permission;
            }}
          />,
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry.isoCode = 'FR';
              return mockData;
            }}
          />,
          <MockDialingPlan
            handler={() => {
              return [generateDialPlanData('33', '44', 'France', 'FR')];
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
                <NavigateTo path="/settings/region" />,
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
