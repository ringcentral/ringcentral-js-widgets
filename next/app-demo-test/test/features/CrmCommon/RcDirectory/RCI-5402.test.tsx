/* Check entrance of contact categories page
https://test_it_domain/test-cases/RCI-5402
*/
import {
  And,
  autorun,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

import { ClickMoreButton, MakeCall } from '../../../steps/Call';
import {
  CheckDialPadPage,
  ClickTheKeyOnTheDialPad,
} from '../../../steps/Dialer';
import { ClickCloseButtonOfToField } from '../../../steps/Dialer/actions/ClickCloseButtonOfToField';
import { FocusOnToField } from '../../../steps/Dialer/actions/FocusOnToField';
import { CheckValueInToField } from '../../../steps/Dialer/checks/CheckValueInToField';
import { TypingWordingInSearch } from '../../../steps/Messages';
import { CheckComposeTextPage } from '../../../steps/Messages/checks/CheckComposeTextPage';
import {
  NavigateToDialer,
  NavigateToComposeText,
  NavigateToTransferPage,
} from '../../../steps/Navigate';
import { CheckContactCategoriesTab } from '../../../steps/RCDirectory/checks/CheckContactCategoriesTab';

@autorun(test.skip)
@it
@p2
@common
@title('Check entrance of contact categories page')
export class CheckEntranceOfContactPage extends Step {
  Login?: StepFunction | StepFunction[];

  run() {
    const { Login } = this;

    return (
      <Scenario desc="Check entrance of contact categories page">
        <Given desc="When user login to Salesforce cti" action={Login} />
        <And desc="User navigate to dialer pager" action={NavigateToDialer} />
        <When
          desc="User input value and checks"
          action={() => (
            <TypingWordingInSearch chars="T" dataSign="recipientsInput" />
          )}
        />
        <And
          desc="User should see that the contact categories page of 'ThirdParty', 'Company', 'Personal' and 'Other' tab"
          action={CheckContactCategoriesTab}
        />
        <When
          desc="User navigate to compose text page"
          action={NavigateToComposeText}
        />
        <And desc="User come back to dialer page" action={NavigateToDialer} />
        <When
          desc="User should see that categories page disappear and dial pad shows and valus keep on 'To' field"
          action={[
            <CheckValueInToField inputValue="T" />,
            <CheckContactCategoriesTab isShow={false} />,
            CheckDialPadPage,
          ]}
        />
        <And desc="User focus cursor on 'To' field" action={FocusOnToField} />
        <Then
          desc="User should see that the contact categories page again"
          action={CheckContactCategoriesTab}
        />
        <Given
          desc="User navigate to compose text page"
          action={NavigateToComposeText}
        />
        <When
          desc="User input value and checks"
          action={() => (
            <TypingWordingInSearch chars="TT" dataSign="recipientsInput" />
          )}
        />
        <Then
          desc="User should see that the contact categories page of 'Salesforce', 'Company' and 'Personal' tab"
          action={CheckContactCategoriesTab}
        />
        <When
          desc="User click the close button of 'To' field"
          action={ClickCloseButtonOfToField}
        />
        <Then
          desc="User should see that categories page disappear and compose text shows and valus cleared on 'To' field"
          action={[
            CheckValueInToField,
            <CheckContactCategoriesTab isShow={false} />,
            CheckComposeTextPage,
          ]}
        />
        <When
          desc="User make a outbound or inbound call"
          action={() => (
            <MakeCall
              phoneNumber="18882556247"
              direction="Inbound"
              status="connected"
            />
          )}
        />
        <Then desc="User click more button" action={ClickMoreButton} />
        <When desc="User go to dialer page" action={NavigateToTransferPage} />
        <And
          desc="User click the dial key on the dial pad"
          action={<ClickTheKeyOnTheDialPad theDialValue="12" />}
        />
        <Then
          desc="User should stay on current dial pad and shows number in the 'To' field "
          action={[<CheckValueInToField inputValue="12" />, CheckDialPadPage]}
        />
      </Scenario>
    );
  }
}
