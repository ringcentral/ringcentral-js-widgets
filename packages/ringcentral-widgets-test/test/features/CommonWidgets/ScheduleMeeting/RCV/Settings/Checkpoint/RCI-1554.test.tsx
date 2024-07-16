/**
 * RCI-1554: RCV - Support Meeting Password
 * https://test_it_domain/test-cases/RCI-1554
 * Preconditions:
 * RC CTI app is installed and enabled
 * User has logged in to RC CTI with RCV provider
 * Entry point(/s):
 * Commons app: Login > More > Schedule Video Meeting
 * CanvasLogin canvas > go to course > click RC meeting > click on the right side of 'Schedule meeting'
 * SfB: Login > Meeting
 * Office Add-in: Login
 */
import type { StepFunction } from '../../../../../../lib/step';
import {
  p2,
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
} from '../../../../../../lib/step';
import { Login as CommonLogin } from '../../../../../../steps/Login';
import {
  CheckPasswordEmptyErrorHint,
  CheckPasswordErrorHint,
  CheckPasswordHint,
  CheckPasswordHintNotExist,
  CheckPasswordIsValid,
  CheckPasswordPlaceholder,
  EnterPassword,
  FocusOnPasswordField,
  BlurPasswordField,
  TurnOnToggle,
  CheckScheduleButtonDisabled,
  CheckRCVPageDisplay,
} from '../../../../../../steps/Meeting';

@autorun(test.skip)
@common
@it
@p2
@title('RCV - Support Meeting Password')
export class RCI1554 extends Step {
  Login: StepFunction<any, any>;
  run() {
    const { Login = CommonLogin } = this;
    return (
      <Scenario desc="RCV - Support Meeting Password">
        <When
          desc="Mark ON the 'Require password' checkbox"
          action={[
            Login,
            CheckRCVPageDisplay,
            <TurnOnToggle dataSign="requirePassword" />,
          ]}
        />
        <Then
          desc="The password inputbox display
										10 random alpha-numeric characters {Combine letters (A-Z, a-z) and numbers (0-9)} is filled on field by default (e.g. Aa123456aA)
										[L10N][update 4.2.13]"
          action={CheckPasswordIsValid}
        />
        <When
          desc="Input invalid string on 'Require password' inputboxandfocus/dosen't focus on inputbox
										(e.g. !@#!@#)"
          action={<EnterPassword password="!@#!@#" />}
        />
        <Then
          desc="User is able to input invalid string.
										Hint text appears'Your password must be 1-10 letters and numbers long but canont contain symbols'and there is red highlight.
										'Invite with Google Calendar'/'Done' /Save' /'Add Meeting/ Update meeting' should be disabled
										[L10N]"
          action={[CheckPasswordErrorHint, CheckScheduleButtonDisabled]}
        />
        <When
          desc="Clear the value on inputbox and focus/dosen't focus on inputbox"
          action={<EnterPassword password="" />}
        />
        <Then
          desc="Inputbox show placeholder 'Enter Password'
										[L10N][Update OfficeAdd-in_21.1.1 Google_21.1.1]
										Hint text appears'Meeting password required' and there is red highlight.
										'Invite with Google Calendar'/'Done' /Save' /'Add Meeting/ Update meeting' should be disabled
										[L10N][Update OfficeAdd-in_21.1.1 Google_21.1.1]
										[L10N]"
          action={[
            CheckPasswordPlaceholder,
            CheckPasswordEmptyErrorHint,
            CheckScheduleButtonDisabled,
          ]}
        />
        <When
          desc="Set the correct password on inputbox (Aa36486c9L),and focus on inputbox"
          action={[
            <EnterPassword password="Aa36486c9L" />,
            FocusOnPasswordField,
          ]}
        />
        <Then
          desc="Hint text appears'Your password should be 1-10 letters and numbers long but canont contain symbols'and there is grey
										'Invite with Google Calendar'/'Done' /Save' /'Add Meeting/ Update meeting' should be enable"
          action={CheckPasswordHint}
        />
        <When
          desc="The cursor dosen't focus on password inputbox"
          action={BlurPasswordField}
        />
        <Then
          desc="The password hint text disappears
										'Add Meeting/Invite with Google Calendar' button is enabled"
          action={CheckPasswordHintNotExist}
        />
      </Scenario>
    );
  }
}
