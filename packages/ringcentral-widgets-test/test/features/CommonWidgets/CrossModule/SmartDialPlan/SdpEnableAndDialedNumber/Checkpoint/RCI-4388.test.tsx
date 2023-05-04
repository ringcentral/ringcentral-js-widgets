/**
 * RCI-4388: Can call PSTN when dialed number match valid PSTN (DT>MEL)
 * https://test_id_domain/test-cases/RCI-4388
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in to 3rd party
 * The user has logged in to the CTI app
 * Set 'Smart Dial Plan Routing' to enable inSCP
 * User has 'Max extension number length' as{maxExtensionLength}digits
 * User has default area code as{Default area code}
 * User is not RC-US/RC-PR
 * Note:
 * DT=Dialing text
 * MEL=MaxExtensionLength
 * SCP(https://scp-xmnup.rc-lab-mock-domain.com/) > Accounts > Active Accounts>[phone number]>Account>Features & Settings
 * Entry point(/s):
 * Open CTI >Go to Settings page >Set Calling setting with Browser/{Brandname} App/{Brandname} Phone/RingOut> Set region country same with account country/ Navigate to dial page
 * Note:
 * Only choose one of entry points to execute
 * Entry point(/s):
 * Open CTI >Go to Settings page >Set Calling setting with Browser/{Brandname} App/{Brandname} Phone/RingOut> Set region country same with account country/ Navigate to dial page
 * Note:
 * Only choose one of entry points to execute
 *
  | Country |MaxExtensionLength |Dialing Length |Dialing text |Matching logic |Default area code |parsed number |NPC category |Contact |
  | RC-UK |6 |8 |3135 0033 |Match valid PSTN |12 |(12) 3135 0033 |PSTN |(12) 3135 0033 |

 */

import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import {
  autorun,
  common,
  examples,
  Given,
  it,
  p1,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { StepFunction } from '../../../../../../lib/step';
import {
  CheckCallControlPage as BaseCheckCallControlPage,
  MakeCall,
} from '../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockAccountInfo,
  MockGetPhoneNumber,
  MockNumberParserV2,
  MockPermission,
} from '../../../../../../steps/Mock';

@autorun(test)
@it
@p1
@title('Can call PSTN when dialed number match valid PSTN (DT>MEL)')
@common
export class RCI4388 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> | StepFunction<any, any>[] | null =
    CreateMock;
  CheckCallControlPage: typeof BaseCheckCallControlPage =
    BaseCheckCallControlPage;
  @examples(`
    | maxExtensionLength | phoneNumber | areaCode | parsedNumber     | e164ParsedNumber |
    | 6                  | '3130033'   | '310'    | '(310) 313-0033' | '+13103130033'   |
  `)
  run() {
    const { Login, CreateMock, CheckCallControlPage } = this;
    return (
      <Scenario
        desc="SDP enabled and make an outbound call"
        action={({
          maxExtensionLength,
          e164ParsedNumber,
          parsedNumber,
        }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
              return mockData;
            }}
          />,
          <MockPermission
            handler={(features) => {
              return features
                .filter((feature) => feature.id !== 'SmartDialPlanRouting')
                .concat([
                  {
                    id: 'SmartDialPlanRouting',
                    available: true,
                  },
                ]);
            }}
          />,
          MockGetPhoneNumber,
          <MockNumberParserV2
            isDefaultInit
            handler={(mockData) => {
              mockData.results[0].category = Category.Regular;
              mockData.results[0].formats[0] = {
                ...mockData.results[0].formats[0],
                e164Extended: e164ParsedNumber,
              };
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="login App" action={Login} />
        <When
          desc="> Input{dialing text}in 'To' filed
										> Click call button"
          action={MakeCall}
        />
        <Then
          desc="Checked the dialing number on call control page is {parsed number}
										Checked Contact on the call control page is{Contact}"
          action={CheckCallControlPage}
        />
      </Scenario>
    );
  }
}
