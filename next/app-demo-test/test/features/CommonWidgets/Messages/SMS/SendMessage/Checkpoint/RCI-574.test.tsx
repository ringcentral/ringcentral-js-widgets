/**
 * RCI-574: Compose text page
 * https://test_it_domain/test-cases/RCI-574
 */
import phoneNumberData from '@ringcentral-integration/mock/src/platform/data/phoneNumber.json';
import {
  autorun,
  common,
  Given,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  CheckComposeTestButton,
  CheckComposeTestPage,
  CheckMessageInput,
  CheckRecipientsInput,
  CheckRecipientsInputDeleteButton,
  CheckRecipientsInputRemoveButton,
  EntryTheLongestCharacter,
} from '../../../../../../steps/Messages';
import { CreateMock, MockPhoneNumber } from '../../../../../../steps/Mock';
import {
  NavigateToComposeText,
  NavigateToMessagesTab,
} from '../../../../../../steps/Navigate';

@autorun(test)
@common
@p2
@title('Compose text page')
export class ComposeTextPage extends Step {
  CustomLogin?: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CustomCreateMock?: StepFunction<any, any> = CreateMock;
  CheckRecipientsInputDeleteButton?: StepFunction<any, any> =
    CheckRecipientsInputRemoveButton;
  run() {
    return (
      <Scenario
        desc="Check Compose text page"
        action={[
          this.CustomCreateMock,
          <MockPhoneNumber isDefaultInit handler={() => phoneNumberData} />,
        ]}
      >
        <Given
          desc="Logged in Third-part APP and CTI"
          action={this.CustomLogin}
        />
        <When
          desc="Check the total unread message count from the right-top side of Message tab"
          action={NavigateToMessagesTab}
        />
        <Then
          desc="User should see that tooltips 'Compose text' and Compose text icon is highlighted"
          action={CheckComposeTestButton}
        />
        <Then
          desc="User click the Compose text icon"
          action={NavigateToComposeText}
        />
        <Then
          desc="User should see that open the compose text page and ghoest text on 'to' Field and Text area with ghost text 'Type message...' and send button(Disable by default)"
          action={CheckComposeTestPage}
        />
        <Then
          desc="User entry an over 30 characters value on the 'To' field"
          action={
            <EntryTheLongestCharacter dataSign="recipientsInput" longest={30} />
          }
        />
        <Then
          desc="User should see that ghost text disappears and The 'To' field maximum length is 30 characters, cannot enter any more "
          action={[CheckRecipientsInput, this.CheckRecipientsInputDeleteButton]}
        />
        <Then
          desc="User entry an more than 100 characters value on text area"
          action={
            <EntryTheLongestCharacter dataSign="messageInput" longest={1000} />
          }
        />
        <Then
          desc="User should see that ext area maximum length is 1000 characters,cannot enter any more and ghost text disappears "
          action={CheckMessageInput}
        />
      </Scenario>
    );
  }
}
