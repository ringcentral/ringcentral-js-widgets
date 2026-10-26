/**
 * RCI-4125: Outbound call - from ${BrandName} Phone(RC phone)
 * https://test_it_domain/test-cases/RCI-4125
 * Preconditions:
 * User is logged-in into 3rd party
 * CTI app is integerated,
 * User has log in CTI app and softphone with the same account
 * <BrandName> :
	RC:- RingCentral Phone
 * ATT: - Office@Hand for Desktop
 * BT: -BT Cloud Work Phone
 * Telus: - Business Connect Phone
 * Avaya: Avaya Cloud Phone
 * <BrandName> :
 * RC:- RingCentral Phone
 * ATT: - Office@Hand for Desktop
 * BT: -BT Cloud Work Phone
 * Telus: - Business Connect Phone
 * Avaya: Avaya Cloud Phone
 * Entry point(/s):
 *
  | Brand |Brand Name |Link |
  | RC |'RingCentral Phone' |'rcmobile://call?number={phoneNumber}' |
	| AT&T |'AT&T Office@Hand Phone' |'https://app.officeathand.att.com/r/call?number={phoneNumber}' |
	| BT |'BT Cloud Work Phone' |'rcbtmobile://call?number={phoneNumber}' |
	| Telus |'Business Connect Phone' |'rctelus://call?number={phoneNumber}' |

 * Settings > Calling > Make my calls with > {BrandName Phone }
 */
import { Softphone } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  autorun,
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
  common,
} from '@ringcentral-integration/test-utils';

import { MakeOutboundCall } from '../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { CreateMock as CommonCreateMock } from '../../../../../../steps/Mock';
import { NavigateToDialer } from '../../../../../../steps/Navigate';
import { NavigateTo } from '../../../../../../steps/Router';
import {
  ClickSaveButton,
  ExpandCallingSettingDropdown,
  SelectCallingSetting,
} from '../../../../../../steps/Settings';

const exampleData = [
  {
    brand: 'rc',
    brandName: 'RingCentral Phone',
    link: /rcmobile:\/\/call\?number=.+/,
  },
];

beforeEach(() => {
  window.open = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

@autorun(test.skip)
@common
@it
@p2
@title('Outbound call - from ${brandName} Phone(RC phone)')
export class RCI4125 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CheckCallWithSoftphone: StepFunction<any, any> = async ({ link }: any) => {
    const url = jest.mocked(window.open).mock.calls[0][0];
    expect(url).toMatch(link);
  };

  @examples(exampleData)
  run() {
    const { Login, CheckCallWithSoftphone } = this;
    return (
      <Scenario
        desc="Outbound call - from ${brandName} Phone(RC phone)"
        action={Login}
      >
        <Given
          desc="Settings > Calling > Make my calls with > {BrandName Phone}"
          action={
            (({ brandName }, { app }) => [
              <NavigateTo path="/settings/calling" />,
              ExpandCallingSettingDropdown,
              <SelectCallingSetting settingName={brandName} />,
              ClickSaveButton,
            ]) as StepFunction<{ brandName: string }>
          }
        />
        <When
          desc="Direct to Phone page, check the dial page, fill the following{phonenumber}type in 'To' field, click the call button
										Local number
										International number
										Ext
										DID
										Digital line number
										Company number * Ext"
          action={[NavigateToDialer, <MakeOutboundCall />]}
        />
        <Then desc="Open URL with {Link}" action={CheckCallWithSoftphone} />
      </Scenario>
    );
  }
}
