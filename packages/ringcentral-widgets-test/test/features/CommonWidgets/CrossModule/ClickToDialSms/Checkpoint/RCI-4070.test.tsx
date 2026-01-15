/**
 * RCI-4070: Auto-fill new phone number into "To" field when click to SMS
 * https://test_it_domain/test-cases/RCI-4070
 * Preconditions:
 * User has logged into 3rd party.
 * User has logged into RC CTI App
 * Settings > Turn on 'Click to Dial/SMS'
 * There is a phone number 1(+12057101188)filled in the Send SMS To field
 * Entry point(/s):
 * > Open Google
 * > Search an valid phone number 2(+16503860025)
 * > Hover on the phone number 2
 */
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
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
  And,
  common,
} from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import type { StepProp } from '../../../../../lib/step';
import { TurnOnToggle } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CheckInputToRecipients,
  CheckMessageToFieldValue,
  InputRecipients,
  InputSMS,
} from '../../../../../steps/Messages';
import { CreateMock } from '../../../../../steps/Mock';
import {
  NavigateToComposeText,
  NavigateToSettings,
} from '../../../../../steps/Navigate';

export interface ExampleProps {
  firstNumber: string;
  c2textNumber: string;
}

@autorun(test.skip)
@it
@p2
@common
@title('Auto-fill new phone number into "To" field when click to SMS')
export class RCI4070 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  TriggerClickToSms: StepProp = () => {};

  @examples(`
    | firstNumber    | c2textNumber   |
    | '+12057101188' | '+16503860025' |
  `)
  run() {
    const { CreateMock, Login, TriggerClickToSms } = this;
    return (
      <Scenario
        desc="Auto-fill new phone number into 'To' field when click to SMS"
        action={CreateMock}
      >
        <Given desc="User has logged into RC CTI App" action={Login} />
        <And
          desc="Settings > Turn on 'Click to Dial/SMS'"
          action={[
            NavigateToSettings,
            <TurnOnToggle dataSign="switchClickToDialSMS" />,
          ]}
        />
        <And
          desc="There is a phone number 1(+12057101188) filled in the Send SMS 'To' field"
          action={({ firstNumber }: ExampleProps) => [
            NavigateToComposeText,
            <InputRecipients content={firstNumber} />,
            () => {
              // click anywhere to trigger RecipientsInput.clickHandler
              fireEvent.click(screen.getByTestId('messageInput'));
            },
          ]}
        />
        <When
          desc="User clicks on the click to sms icon"
          action={TriggerClickToSms}
        />
        <Then
          desc="The <brand> app should be brought to the front
										CTI will navigate to Compose Text page with the phone number 2 added in the 'To' field
										There are both phone number 1 and phone number 2 in the 'To' field"
          action={(
            { firstNumber, c2textNumber }: ExampleProps,
            { phone }: any,
          ) => {
            const formattedNumber = phone.appFeatures.isEDPEnabled
              ? formatNumber({
                  phoneNumber: c2textNumber,
                  countryCode: phone.regionSettings.countryCode,
                  areaCode: phone.regionSettings.areaCode,
                })
              : c2textNumber;
            return [
              <CheckInputToRecipients recipients={[firstNumber]} />,
              <CheckMessageToFieldValue value={formattedNumber as string} />,
            ];
          }}
        />
      </Scenario>
    );
  }
}
