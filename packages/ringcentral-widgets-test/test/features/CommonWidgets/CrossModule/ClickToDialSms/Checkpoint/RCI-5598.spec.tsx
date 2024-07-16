/**
 * RCI-5598: Should not keep area code value when area code field is hidden
 * https://test_it_domain/test-cases/RCI-5598
 * Preconditions:
 * The user has logged into 3rd party.
 * The user has logged into RC CTI App
 * The status of Click to Dial/SMS isON
 * The userregionisCA
 * Entry point(/s):
 * 1.User is on a old version
 * 2. User change area code to '280' in area code field
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
  Then,
} from '@ringcentral-integration/test-utils';

import { generateDialPlanData } from '../../../../../__mock__/generateDialPlanData';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockDialingPlan,
  MockExtensionInfo,
} from '../../../../../steps/Mock';
import { NavigateToSettings } from '../../../../../steps/Navigate';
import { ClickLogoutButton } from '../../../../../steps/Settings';

@autorun(test.skip)
@p2
@title('Should not keep area code value when area code field is hidden')
export class RCI5598 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  Logout: StepProp = ClickLogoutButton;
  run() {
    const { CreateMock, Login, Entry, Logout } = this;
    return (
      <Scenario desc="Check if area code is cleared">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CreateMock,
            <MockExtensionInfo
              handle={(mockData) => {
                mockData.regionalSettings.homeCountry.isoCode = 'CA';
                return mockData;
              }}
            />,
            <MockDialingPlan
              handler={() => {
                return [generateDialPlanData('1', '39', 'Canada', 'CA')];
              }}
            />,
            Login,
            () => {
              this.context.phone.regionSettings._setData({
                areaCode: '841',
              });
              expect(this.context.phone.regionSettings.areaCode).toBe('841');
            },
            NavigateToSettings,
            Logout,
            <CreateMock relogin />,
            <MockExtensionInfo
              handle={(mockData) => {
                mockData.regionalSettings.homeCountry.isoCode = 'CA';
                return mockData;
              }}
            />,
            <MockDialingPlan
              handler={() => {
                return [generateDialPlanData('1', '39', 'Canada', 'CA')];
              }}
            />,
          ]}
        />
        <When desc="User upgrade to new version" action={[Login]} />
        <Then
          desc="The area code field is hidden and areaCode value is ''"
          action={() => {
            expect(this.context.phone.regionSettings.areaCode).toBe('');
          }}
        />
      </Scenario>
    );
  }
}
