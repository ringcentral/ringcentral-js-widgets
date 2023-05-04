/**
 * RCI-574: Compose text page
 * https://test_id_domain/test-cases/RCI-574
 */
import phoneNumberData from '@ringcentral-integration/mock/src/platform/data/phoneNumber.json';
import {
  p2,
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  StepFunction,
} from '../../../../../../lib/step';
import {
  NavigateToComposeText,
  NavigateToMessagesTab,
} from '../../../../../../steps/Navigate';
import {
  CheckComposeTestButton,
  CheckComposeTestPage,
  CheckMessageInput,
  CheckRecipientsInput,
  EntryTheLongestCharacter,
} from '../../../../../../steps/Messages';
import { MockPhoneNumber } from '../../../../../../steps/Mock';

@autorun(test.skip)
@p2
@title('Compose text page')
export class ComposeTextPage extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;
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
          action={CheckRecipientsInput}
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
