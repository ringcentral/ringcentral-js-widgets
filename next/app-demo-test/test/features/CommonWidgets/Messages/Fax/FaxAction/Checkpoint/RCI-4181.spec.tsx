/**
 * RCI-4181: Fax status sync between different clients
 * https://test_it_domain/test-cases/RCI-4181
 * Preconditions:
 * The user has logged into the CTI app
 * The user has authorized 3rd party
 * User has unread fax with 3rd party/Personal/Company contacts/unknown number users.
 *
  | AI CDC |Include user |Publish number |Contact type |Contact |Number |
  | - |- |- |3rd party |UserA |2051020000 |
	| On |On |On |Company |UserB |2051021111 |
	| Off |- |- |Company |UserC |2051022222 |
	| - |- |- |Personal |UserD |2051023333 |
	| - |- |- |Unknown number |UserF |2051024444 |

 * AICDC:search number > description > FindCompany Directory Controls
 * SWAdmin:
	Include user: Users > User list with Extensions>Include User in Company Directory
 * Publish number:
	Contact number/Mobile number: Users > User list with Extensions>Publish in Company Directory
 * DID: Users > User list with Extensions> Phones & Numbers > Phones tab > DID item >Publish toggle
 * 3rd party:Google/Office365/Outlook contacts
 * HubSpot needn't to set this precondition 3
 * Include user: Users > User list with Extensions>Include User in Company Directory
 * Publish number:
 * Contact number/Mobile number: Users > User list with Extensions>Publish in Company Directory
 * DID: Users > User list with Extensions> Phones & Numbers > Phones tab > DID item >Publish toggle
 * Entry point(/s):
 * > Messages tab > All/Fax
 */
import { whenStateChange } from '@ringcentral-integration/next-core/test';
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
  screen,
  userEvent,
  WaitForRenderReady,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../../__mock__';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateMock, MockMessageSync } from '../../../../../../steps/Mock';
import messageChangeEvent from '../../../../../../steps/Mock/MockMessage/MockMessageChangeEvent.json';

@common
@autorun(test)
@p2
@title('Fax status sync between different clients')
export class RCI4181 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Check fax status sync status">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CreateMock,
            <MockMessageSync
              repeat={1}
              isDefaultInit
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData([
                  {
                    direction: 'Inbound',
                    type: 'Fax',
                    toName: 'test',
                    toNumber: '+1234567890',
                    readStatus: 'Unread',
                    id: 123456,
                  },
                ]),
              })}
            />,
            Login,
          ]}
        />
        <When
          desc="Mark as read/unread or view in other client"
          action={[
            async () => {
              // go to message tab
              // {"action":"click","test_id":"Messages","expected_value":"go to message tab"}
              userEvent.click(await screen.findByTestId('messagesTab'));

              // wait for unread message item
              // {"action":"wait","wait_type":"Selector","test_id":"Messages","expected_value":"","wait_parameter":"Messages"}
              await whenStateChange(() => {
                expect(
                  screen.queryAllByTestId('unread')[0],
                ).toBeInTheDocument();
              });
            },
            <MockMessageSync
              repeat={1}
              isDefaultInit={false}
              handler={(mockData) => ({
                ...mockData,
                ...mockMessageListData([
                  {
                    direction: 'Inbound',
                    type: 'Fax',
                    toName: 'test',
                    toNumber: '+1234567890',
                    readStatus: 'Read',
                    id: 123456,
                  },
                ]),
              })}
            />,
            (async (_: any, { rcMock }) => {
              await rcMock.subscription.trigger(messageChangeEvent);
            }) as StepFunction,
          ]}
        />
        <Then
          desc="The status of current fax message should sync with other client"
          action={[
            WaitForRenderReady,
            async () => {
              await whenStateChange(() => {
                expect(
                  screen.queryByTestId('navigationNoticeCount'),
                ).not.toBeInTheDocument();
              });
            },
          ]}
        />
      </Scenario>
    );
  }
}
