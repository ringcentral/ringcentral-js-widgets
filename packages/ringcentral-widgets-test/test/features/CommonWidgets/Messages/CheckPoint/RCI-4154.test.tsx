/**
 * RCI-4154: Check action buttons when offline
 * https://test_it_domain/test-cases/RCI-4154
 */
import { mockMessageListData } from '../../../../__mock__';
import type { StepFunction } from '../../../../lib/step';
import {
  p2,
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
} from '../../../../lib/step';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import {
  CheckAllActionButtonsStatusWhenOffline,
  ExpandTheActionMenu,
} from '../../../../steps/Messages';
import {
  CreateMock as CommonCreateMock,
  MockAddressBookSync,
  MockMessageList,
  MockMessageSync,
} from '../../../../steps/Mock';
import {
  NavigateToMessagesTab,
  NavigateToTypeTabUnderMessage,
} from '../../../../steps/Navigate';

@autorun(test)
@common
@p2
@title('Check action buttons in ${type} when offline')
export class MessageActionButtonWhenOffline extends Step {
  CustomLogin: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CustomCreateMock: StepFunction<any, any> = CommonCreateMock;

  @examples(`
    | actionButtons                                                          | type    | number         |
    | ['Call','View Details']                                                | 'Text'  | '+18662105111' |
    | ['View', 'download','mark','Delete','View Details']                    | 'Fax'   | '+18662105111' |
    | ['play','download','Call','clickToSms','mark','Delete','View Details'] | 'Voice' | '+18662105111' |
  `)
  run() {
    const { type, actionButtons, number } = this.context.example;

    const { CustomLogin, CustomCreateMock } = this;

    return (
      <Scenario
        desc="Check action buttons when offline"
        action={CustomCreateMock}
      >
        <Given
          desc="init mock"
          action={() => [
            <MockMessageList
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData(null),
              })}
            />,
            <MockAddressBookSync
              page={1}
              handler={(personalUsers) => {
                personalUsers[0].homePhone = number;
                return personalUsers;
              }}
            />,
            <MockMessageSync
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData([
                  {
                    direction: 'Inbound',
                    type: 'SMS',
                    fromNumber: number,
                  },
                  {
                    direction: 'Inbound',
                    type: 'VoiceMail',
                    fromNumber: number,
                  },
                  {
                    direction: 'Inbound',
                    type: 'Fax',
                    fromNumber: number,
                  },
                ]),
              })}
            />,
          ]}
        />
        <Given desc="Logged in Third-part APP and CTI" action={CustomLogin} />
        <When desc="User go to Messages tab" action={NavigateToMessagesTab} />
        <And
          desc="User click expand action menu in ${type} tab and make the network offline"
          action={[
            <NavigateToTypeTabUnderMessage type={type} />,
            ExpandTheActionMenu,
            async (_: any, { phone }: any) => {
              const client =
                phone.connectivityMonitor._deps.client.service.client();
              client.off(
                client.events.requestSuccess,
                phone.connectivityMonitor._requestSuccessHandler,
              );
              phone.connectivityMonitor._networkErrorHandler();
            },
          ]}
        />
        <Then
          desc="User should be see that ${actionButtons} disabled"
          action={
            <CheckAllActionButtonsStatusWhenOffline
              actionButtons={actionButtons}
            />
          }
        />
      </Scenario>
    );
  }
}
