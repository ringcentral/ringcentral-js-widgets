/**
 * RCI-4049: Should show tooltip for Click to Dial/SMS
 * https://test_it_domain/test-cases/RCI-4049
 * Preconditions:
 * The user has logged into 3rd party.
 * The user has logged into {Brand} CTI App
 * Settings > Turn on the'Click to Dial/SMS'
 * There is {Phone number}with {Hyperlink} on the website
 *
  | Phone number |Hyperlink |
  | 1234567 | |
	| 7654321 |https://test_it_domain |

 * Entry point(/s):
 *
  | Brand |Brand name |
  | RC |RingCentral |
	| BT |BT Cloud Work |
	| Telus |TELUS Business Connect™ |

 */
import {
  p2,
  it,
  Given,
  autorun,
  examples,
  StepProp,
  Scenario,
  Step,
  title,
  Then,
  common,
  When,
  WaitForRenderReady,
} from '@ringcentral-integration/test-utils';

import { TurnOnToggle } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockAccountInfo,
  MockGetPhoneNumber,
} from '../../../../../steps/Mock';
import { NavigateToSettings } from '../../../../../steps/Navigate';

@autorun(test.skip)
@it
@p2
@title('Should show tooltip for Click to Dial/SMS')
@common
export class TooltipForC2DOrC2Sms extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  CheckC2DTooltip: StepProp = () => ({});
  @examples(`
    | phoneNumber    | brandId | brandName                | brand   |
    | '+15067654321' | '1210'  | 'RingCentral'            | 'rc'    |
    | '+12091234567' | '7710'  | 'BT Cloud Work'          | 'bt'    |
    | '+15067654321' | '7310'  | 'TELUS Business Connect™' | 'telus' |
  `)
  run() {
    const { CreateMock, Login, CheckC2DTooltip } = this;
    return (
      <Scenario
        desc="Should show tooltip for Click to Dial/SMS"
        action={[
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.serviceInfo.brand.id = this.example.brandId;
              return mockData;
            }}
          />,
          MockGetPhoneNumber,
        ]}
      >
        <Given
          desc="User has logged into RC CTI App"
          action={[
            Login,
            NavigateToSettings,
            <TurnOnToggle dataSign="switchClickToDialSMS" />,
            WaitForRenderReady,
          ]}
        />
        <When
          desc="> Go to the website (not in block lists)
                  > Mouse hover the{Phone number}
                  > Mouse hover the Click to Dial icon"
          action={CheckC2DTooltip}
        />
        {/* Following steps checked in  CheckC2DTooltip */}
        <Then desc="Tooltip 'Call with {Brand name}' should be display" />
        <When desc="> Mouse hover the Click to SMS icon" />
        <Then desc="Tooltip 'SMS with {Brand name}' should be display" />
        <When desc="> Mouse leave the{Phone number}" />
        <Then desc="The Click to Dial and Click to SMS icon should be disappeared" />
        <Then desc="Log out" />
      </Scenario>
    );
  }
}
