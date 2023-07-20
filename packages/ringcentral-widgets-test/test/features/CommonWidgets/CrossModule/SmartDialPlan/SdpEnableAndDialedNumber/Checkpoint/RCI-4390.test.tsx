/**
 * RCI-4390: Can call Special Service number when match (DT<MEL)
 * https://test_it_domain/test-cases/RCI-4390
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
  | RC-UK |7 |3 |999 |Match SpecialService |11 |999 |SpecialService |999 |

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

import type { StepProp } from '../../../../../../lib/step';
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
@common
@title('Can call Special Service number when match (DT<MEL)')
export class RCI4390 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp | null = CreateMock;
  CheckCallControlPage: typeof BaseCheckCallControlPage =
    BaseCheckCallControlPage;

  @examples(`
    | maxExtensionLength | phoneNumber | parsedNumber |
    | 7                  | '999'       | '999'        |
  `)
  run() {
    const { Login, CreateMock, CheckCallControlPage } = this;
    return (
      <Scenario
        desc="SDP enabled and make call to 999"
        action={({ maxExtensionLength, parsedNumber }: any) => [
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
              mockData.results[0].category = Category.SpecialService;
              mockData.results[0].formats[0] = {
                ...mockData.results[0].formats[0],
                national: parsedNumber,
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
