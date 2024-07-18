/**
 * RCI-4402: Can call Special Service number when match (DT<MEL)
 * https://test_it_domain/test-cases/RCI-4402
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in into 3rd party
 * The user has logged in to the CTI app
 * User has 'Max extension number length' as{maxExtensionLength}digits
 * User has default area code as{Default area code}
 * User is not RC-US/RC-PR not support in 22.2.20
 * Note:
 * DT=Dialing text
 * MEL=MaxExtensionLength
 * Entry point(/s):
 * Open CTI >Go to Settings page >Set Calling setting with Browser/{Brandname} App/{Brandname} Phone/RingOut> Set region country same with account country/ Navigate to dial page
 * Note:
 * Only choose one of entry points to execute
 *
  | Country |MaxExtensionLength |Dialing Length |Dialing text |Matching logic |Default area code |parsed number |NPC category |Contact |
  | RC-UK |7 |3 |999 |Match Special Service |11 |999 |SpecialService |999 |

 * Entry point(/s):
 * Open CTI >Go to Settings page >Set Calling setting with Browser/{Brandname} App/{Brandname} Phone/RingOut> Set region country same with account country/ Navigate to dial page
 * Note:
 * Only choose one of entry points to execute
 *
  | Country |MaxExtensionLength |Dialing Length |Dialing text |Matching logic |Default area code |parsed number |NPC category |Contact |
  | RC-UK |7 |3 |999 |Match Special Service |11 |999 |SpecialService |999 |

 */
import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import {
  p1,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import type { StepProp } from '../../../../../../lib/step';
import { CheckCallControlPage, MakeCall } from '../../../../../../steps/Call';
import { CheckLogBaseInfoActive } from '../../../../../../steps/CallLog';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { CheckIsCRM } from '../../../../../../steps/IDB';
import {
  CreateMock,
  MockAccountInfo,
  MockGetPhoneNumber,
  MockNumberParserV2,
} from '../../../../../../steps/Mock';

@autorun(test)
@it
@p1
@title('Can call Special Service number when match (DT<MEL)')
@common
export class MakeEmergencyCallEDPEnabled extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp | null = CreateMock;
  appName = 'common';

  @examples(`
    | maxExtensionLength | phoneNumber | parsedNumber |
    | 7                  | '999'       | '999'        |
  `)
  run() {
    const { Login, CreateMock, appName } = this;
    return (
      <Scenario
        desc="make a emergency call when edp enabled"
        action={({ maxExtensionLength, parsedNumber }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
              return mockData;
            }}
          />,
          MockGetPhoneNumber,
          <MockNumberParserV2
            isDefaultInit={false}
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
          desc="Checked the dialing number on call control page is{parsed number}
										Checked Contact on the call control pageis{Contact}"
          action={() => {
            if (CheckIsCRM(appName)) {
              return (
                <CheckLogBaseInfoActive
                  phoneNumber={this.example.parsedNumber}
                />
              );
            }
            return (
              <CheckCallControlPage parsedNumber={this.example.parsedNumber} />
            );
          }}
        />
      </Scenario>
    );
  }
}
