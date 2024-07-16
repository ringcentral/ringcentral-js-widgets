/**
 * RCI-4641: 7 digit numbers for RC-US and PR could not click to dial/SMS
 * https://test_it_domain/test-cases/RCI-4641
 * Preconditions:
 * The user has logged into 3rd party.
 * The user has logged into RC CTI App
 * The status of Click to Dial/SMS is ON
 * Entry point(/s):
 *
  | Phone number |Icons display |
  | 1234567 |False |
	| +16501234567 |True |
	| 6501234567 |True |

 */
import {
  p2,
  it,
  Given,
  And,
  autorun,
  examples,
  StepProp,
  Scenario,
  Step,
  title,
  common,
  When,
} from '@ringcentral-integration/test-utils';

import { generateDialPlanData } from '../../../../../__mock__/generateDialPlanData';
import { TurnOnToggle } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockAccountInfo,
  MockDialingPlan,
  MockGetPhoneNumber,
} from '../../../../../steps/Mock';
import { NavigateToSettings } from '../../../../../steps/Navigate';
import { NavigateTo } from '../../../../../steps/Router';
import { SetCountryCode } from '../../../../../steps/Settings';

jest.mock(
  'ringcentral-c2d/src/lib/NodeObserver/RangeMatch/HoverRangeMatch',
  () => {
    const { HoverRangeMatch: BaseHoverRangeMatch } = jest.requireActual(
      'ringcentral-c2d/src/lib/NodeObserver/RangeMatch/HoverRangeMatch',
    );
    class HoverRangeMatch extends BaseHoverRangeMatch {
      // mock mouse is hover on rect
      isMatch() {
        return true;
      }
    }
    return {
      __esModule: true,
      ...jest.requireActual(
        'ringcentral-c2d/src/lib/NodeObserver/RangeMatch/HoverRangeMatch',
      ),
      HoverRangeMatch,
    };
  },
);

window.Range.prototype.getBoundingClientRect = jest.fn(
  () =>
    ({
      bottom: 196,
      height: 23,
      left: 139.1328125,
      right: 283.15625,
      top: 173,
      width: 144.0234375,
      x: 139.1328125,
      y: 173,
    } as DOMRect),
);
// not enable c2d for common
@autorun(test.skip)
@it
@p2
@title('7 digit numbers for RC-US and PR could not click to dial/SMS')
@common
export class C2DDisabledForUSAndPR extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  HandleC2D: StepProp = () => {};
  @examples(`
    | phoneNumber    | c2dIsDisplayed | isoCode | countryName     | countryCallingCode |
    | '+16503051287' | true           | 'US'    | 'United States' | '1'                |
    | '6503051287'   | true           | 'US'    | 'United States' | '1'                |
    | '3051287'      | false          | 'US'    | 'United States' | '1'                |
    | '+16503051288' | true           | 'PR'    | 'Puerto Rico'   | '1'                |
    | '6503051288'   | true           | 'PR'    | 'Puerto Rico'   | '1'                |
    | '3051288'      | false          | 'PR'    | 'Puerto Rico'   | '1'                |
    | '+16503051289' | true           | 'CA'    | 'Canada'        | '1'                |
    | '6503051289'   | true           | 'CA'    | 'Canada'        | '1'                |
    | '3051289'      | false          | 'CA'    | 'Canada'        | '1'                |
  `)
  run() {
    const { CreateMock, Login, HandleC2D } = this;
    return (
      <Scenario
        desc="7 digit numbers for RC-US and PR could not click to dial/SMS"
        action={({ isoCode }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.serviceInfo.brand.homeCountry.isoCode = isoCode;
              return mockData;
            }}
          />,
          MockGetPhoneNumber,
          <MockDialingPlan
            handler={() => {
              return [
                generateDialPlanData('1', '1', 'United States', 'US'),
                generateDialPlanData('1', '179', 'Puerto Rico', 'PR'),
                generateDialPlanData('1', '39', 'Canada', 'CA'),
              ];
            }}
          />,
        ]}
      >
        <Given desc="User has logged into RC CTI App" action={Login} />
        <And
          desc="The status of Click to Dial/SMS is ON'"
          action={[
            NavigateToSettings,
            <TurnOnToggle dataSign="switchClickToDialSMS" />,
          ]}
        />
        <And
          desc="Set region settings as {countryName}"
          action={[<NavigateTo path="/settings/region" />, SetCountryCode]}
        />
        <When
          desc="> Go to any website (not in block lists) with {Phone number}
										> Mouse hover{Phone number}
										> Wait for 5 seconds
                    There is {Icons display}"
          action={HandleC2D}
        />
      </Scenario>
    );
  }
}
