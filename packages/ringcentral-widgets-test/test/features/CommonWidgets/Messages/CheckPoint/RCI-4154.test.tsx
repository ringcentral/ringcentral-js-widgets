/**
 * RCI-4154: Check action buttons when offline
 * https://test_it_domain/test-cases/RCI-4154
 */
import { Login as CommonLogin } from '../../../../steps/Login';
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
} from '../../../../lib/step';
import {
  CreateMock as CommonCreateMock,
  MockMessageList,
  MockMessageSync,
} from '../../../../steps/Mock';
import {
  NavigateToMessagesTab,
  NavigateToTypeTabUnderMessage,
} from '../../../../steps/Navigate';
import { mockMessageListData } from '../../../../__mock__';
import {
  CheckAllActionButtonsStatusWhenOffline,
  ExpandTheActionMenu,
} from '../../../../steps/Messages';

@autorun(test.skip)
@p2
@title('Check action buttons in ${type} when offline')
export class MessageActionButtonWhenOffline extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomCreateMock?: StepFunction<any, any>;

  @examples(`
    | actionButtons                                                          | type    | number         |
    | ['Call','View Details']                                                | 'Text'  | '+18662105111' |
    | ['View', 'download','mark','Delete','View Details']                    | 'Fax'   | '+18662105111' |
    | ['play','download','Call','clickToSms','mark','Delete','View Details'] | 'Voice' | '+18662105111' |
  `)
  run() {
    const { type, actionButtons, number } = this.context.example;

    const { CustomLogin = CommonLogin, CustomCreateMock = CommonCreateMock } =
      this;

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
