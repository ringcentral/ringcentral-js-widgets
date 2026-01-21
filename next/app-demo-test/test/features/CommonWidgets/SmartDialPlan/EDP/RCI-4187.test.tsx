/**
 * RCI-4187: The priority of the default area code
 * https://test_it_domain/test-cases/RCI-4187
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in into 3rd party
 * Set 'Smart Dial Plan Routing' to enable inSCP
 * Set ' Outbound Call Prefix' to enable in admin web
 * User Set 'Outbound Call Prefix' as{outboundCallPrefix} inSW
 * User has 'Max extension number length' as{maxExtensionNumberLength}digits
 * User has set 'Area Code'as{Area Code}on the region setting pagein CTI
 * User details are listed below
 *
  | Country |maxExtensionNumberLength |outboundCallPrefix |Area Code |Area code by API |originalStrings |
  | US |7 |9 |205 |403 |92430001 |

 * Entry point(/s):
 * User log in to CTI app > Getdefault area code from api as{Area code by API} > Make a call/Send a message to {originalStrings}
 */
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
import { CheckPassAreaCode, MakeCall } from '../../../../steps/Call';
import { CommonLogin } from '../../../../steps/CommonLogin';
import {
  CreateMock,
  MockAccountInfo,
  MockDialingPlan,
  MockNumberParserV2,
  MockPermission,
} from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';
import { SetAreaCode } from '../../../../steps/Settings';

@autorun(test)
@it
@p2
@common
@title('The priority of the default area code')
export class RCI4187 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  @examples(`
    | areaCode | areaCodeByAPI | phoneNumber    | formattedPhoneNumber | direction  |
    | '205'    | '403'         | '+16505819954' | '(650) 581-9954'     | 'Outbound' |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="The priority of the default area code"
        action={[
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = 7;
              return mockData;
            }}
          />,
          <MockDialingPlan
            handler={() => {
              return [generateDialPlanData('33', '44', 'France', 'FR')];
            }}
          />,
          <MockNumberParserV2
            isDefaultInit
            repeat={0}
            handler={(mockData) => {
              mockData.results[0].numberDetails.areaCode =
                this.context.example.areaCodeByAPI;
              return mockData;
            }}
          />,
          <MockPermission
            handler={(features) => {
              const permission = features
                .filter((feature) => {
                  return feature.id !== 'OutboundCallPrefix';
                })
                .concat([
                  {
                    id: 'OutboundCallPrefix',
                    available: true,
                    params: [{ name: 'OutboundCallPrefix', value: '7' }],
                  },
                ]);
              return permission;
            }}
          />,
        ]}
      >
        <Given
          desc="Login APP"
          action={[
            Login,
            ((_: any, { app }) => {
              jest.spyOn(
                app.container.got(NumberValidate)!,
                '_parsingPhoneNumber',
              );
            }) as StepFunction,
          ]}
        />
        <And
          desc="1. navigate to region setting page
                     2. set area code"
          action={
            <>
              <NavigateTo path="/settings/region" />
              <SetAreaCode areaCode={this.context.example.areaCode} />
            </>
          }
        />
        <When
          desc="> Go to the Entry
                      > Check passed value to API request number-parser/parse
                      Note:
                      Can open the Network with inspect tool to check the data"
          action={[<NavigateTo path="/dialer" />, MakeCall]}
        />
        <Then
          desc="Our CTI passed the value {Area Code} as parameters default AreaCode"
          action={CheckPassAreaCode}
        />
      </Scenario>
    );
  }
}
