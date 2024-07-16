import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';

import { mockMessageListData } from '../../__mock__';
import { ClickBackButton } from '../../steps/Call';
import { CommonLogin } from '../../steps/CommonLogin';
import { CreateInstance } from '../../steps/CreateInstance';
import {
  ExpandTheActionMenu,
  CheckClickToCallButton,
  CheckClickToSmsButton,
} from '../../steps/Messages';
import { CreateMock, MockMessageList, MockMessageSync } from '../../steps/Mock';
import { NavigateToMessagesTab } from '../../steps/Navigate/actions/NavigateToMessages';

interface IVoicemailProps {
  CustomLogin: StepFunction<any>;
  CustomCreateMock: StepFunction<any>;
}
@autorun(test)
@it
@p2
@title('Verify make call and send SMS from voicemail action button')
export class VoicemailCallAndSmsAction extends Step<IVoicemailProps> {
  CustomLogin: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CustomCreateMock: StepFunction<any, any> = CreateMock;

  @examples(`
    | user    | number        |
    | 'UserB' | '18662105111' |
  `)
  run() {
    return (
      <Scenario
        desc="Verify make call and send SMS from voicemail action button"
        action={this.CustomCreateMock}
      >
        <Given
          desc="init message mock"
          action={({ user, number }: any) => [
            <MockMessageList
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData(null),
              })}
              repeat={0}
              isDefaultInit
            />,
            <MockMessageSync
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData({
                  direction: 'Inbound',
                  type: 'VoiceMail',
                  fromName: user,
                  fromNumber: number,
                }),
              })}
            />,
          ]}
        />
        <Given
          desc="User has logged in RC CTI App, mock a voicemail from UserB"
          action={this.CustomLogin}
        />
        <When
          desc="> Go to the Entry point
								> Check the voicemail from UserB
								> Expand the voicemail"
          action={[NavigateToMessagesTab, ExpandTheActionMenu]}
        />
        <Then
          desc="click 'Click to call' button should initiate an outbound call to UserB"
          action={({ number }: any) => (
            <CheckClickToCallButton phoneNumber={number} fromType="VoiceMail" />
          )}
        />
        <When
          desc="> Go to the Entry point
								> Check the voicemail from UserB
								> Expand the voicemail"
          action={[
            async () => {
              await waitFor(() => {
                expect(screen.queryByTestId('backButton')).toBeInTheDocument();
              });
            },
            ClickBackButton,
            NavigateToMessagesTab,
            ExpandTheActionMenu,
          ]}
        />
        <Then
          desc="click 'Click to sms' button should:
              1. navigated to compose text page
              2. 'To' field is filled with phone number"
          action={({ number }: any) => (
            <CheckClickToSmsButton phoneNumber={number} />
          )}
        />
      </Scenario>
    );
  }
}
