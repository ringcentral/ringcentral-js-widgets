import { fireEvent, screen } from '@testing-library/react';
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
import { MockMessageList, MockMessageSync } from '../../../../../../steps/Mock';
import { NavigateToMessagesTab } from '../../../../../../steps/Navigate';
import { mockMessageListData } from '../../../../../../__mock__';

const mockMessage = {
  direction: 'Outbound',
  type: 'SMS',
  toNumber: '+18882556247',
  conversationId: '777870405545935346',
};

const GoToDetailPage: StepFunction = () => {
  fireEvent.click(screen.queryAllByTestId('unread')[0]);
};

const CheckConversationPageDisplay: StepFunction = () => {
  expect(screen.getByText('7/22/2021, 17:03')).toBeInTheDocument();
  expect(screen.getByText('first test message')).toBeInTheDocument();

  expect(screen.queryByText('7/22/2021, 17:59')).toBeNull();
  expect(screen.getByText('second test message')).toBeInTheDocument();

  expect(screen.getByText('7/22/2021, 18:00')).toBeInTheDocument();
  expect(screen.getByText('third test message')).toBeInTheDocument();

  expect(screen.getByPlaceholderText('Type message...')).toBeInTheDocument();
  expect(screen.getByTestId('messageButton')).toBeInTheDocument();
};

@autorun(test.skip)
@p2
@title('To check message on the conversation detail page')
export class CheckConversationMessagePage extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;

  run() {
    return (
      <Scenario
        desc="To check message on the conversation detail page"
        action={this.CustomCreateMock}
      >
        <Given
          desc="init message mock"
          action={() => [
            <MockMessageList
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData(null),
              })}
            />,
            <MockMessageSync
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData([
                  {
                    ...mockMessage,
                    creationTime: new Date(
                      'July 22, 2021 17:03:00',
                    ).toISOString(),
                    subject: 'first test message',
                  },
                  {
                    ...mockMessage,
                    creationTime: new Date(
                      'July 22, 2021 17:59:00',
                    ).toISOString(),
                    subject: 'second test message',
                  },
                  {
                    ...mockMessage,
                    creationTime: new Date(
                      'July 22, 2021 18:00:00',
                    ).toISOString(),
                    subject: 'third test message',
                  },
                ]),
              })}
            />,
          ]}
        />
        <Given
          desc="Logged in Third-part APP and CTI"
          action={this.CustomLogin}
        />
        <When
          desc="Go to conversation detail page and check the display"
          action={[NavigateToMessagesTab, GoToDetailPage]}
        />
        <Then
          desc="1.The send time is shown as MM/DD/YYYY  hh: mm (e.g 7/22/2021 17:03 pm)
                2.The text that sent before is shown
                3.The ghost text 'Type message...' appears
                4.The 'Send' button
                Note: Sending time would be updated if the message was sent/received from a different hour."
          action={CheckConversationPageDisplay}
        />
      </Scenario>
    );
  }
}
