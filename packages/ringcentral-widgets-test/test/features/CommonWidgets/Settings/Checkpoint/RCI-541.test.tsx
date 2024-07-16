/**
 * RCI-541: Default page after successful login
 * https://test_it_domain/test-cases/RCI-541
 * Preconditions:
 * The user has login 3rd party
 * CTI app is integrated
 * There are 2 kinds of accounts which are the first-time login to the RC CTI app( clear browser history and local storage)
	AccountA
 * AccountB
 * AccountA
 * AccountB
 * Entry point(/s):
 *
  | App |Default page |
  | Google |Dialer page |
	| Firefox |Dialer page |
	| Outlook |Dialer page |
	| Salesforce |Settings page |
	| Dynamics |Settings page |

 */
import {
  p2,
  it,
  autorun,
  StepProp,
  Scenario,
  Step,
  Then,
  title,
  When,
  WaitForRenderReady,
  common,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../steps/Login';
import { CreateMock, MockExtensionInfo } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';
import { ClickLogoutButton } from '../../../../steps/Settings';
import { CheckInDialPage } from '../../../../steps/dialer';

@autorun(test)
@common
@it
@p2
@title('Default page after successful login')
export class DefaultPage extends Step {
  Login = CommonLogin;
  CreateMock: StepProp = CreateMock;
  ReOpenInNewTab: StepProp = () => ({});
  CheckDefaultPage: StepProp = CheckInDialPage;
  run() {
    const { CreateMock, Login, ReOpenInNewTab, CheckDefaultPage } = this;
    return (
      <Scenario desc="Default page after successful login">
        <When
          desc="Login CTI app with the account A"
          action={[
            CreateMock,
            <MockExtensionInfo
              // login userA twice time
              repeat={2}
              handle={(mockData) => {
                mockData.id = '208594111';
                mockData.extensionNumber = '101';
                return mockData;
              }}
            />,
            <MockExtensionInfo
              // login userA 1 time
              repeat={1}
              handle={(mockData) => {
                mockData.id = '208594222';
                mockData.extensionNumber = '102';
                return mockData;
              }}
            />,
            Login,
          ]}
        />
        <Then
          desc="App auto navigates to {Default page}"
          action={CheckDefaultPage}
        />
        <When desc="Open another tab with CTI" action={ReOpenInNewTab} />
        <Then
          desc="App auto re-redirects to{Default page}"
          action={CheckDefaultPage}
        />
        <When
          desc="Logout and login with Account A again<br>"
          action={[
            <NavigateTo path="/settings" />,
            ClickLogoutButton,
            WaitForRenderReady,
            <Login reLogin={true} />,
            WaitForRenderReady,
          ]}
        />
        <Then
          desc="App auto re-redirects to{Default page}"
          action={CheckDefaultPage}
        />
        <When
          desc="Logout and login with Account B"
          action={[
            <NavigateTo path="/settings" />,
            ClickLogoutButton,
            WaitForRenderReady,
            <Login reLogin={true} />,
            WaitForRenderReady,
          ]}
        />
        <Then
          desc="App auto navigates to{Default page}"
          action={CheckDefaultPage}
        />
      </Scenario>
    );
  }
}
