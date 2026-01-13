/**
 * RCI-3596: Tooltip verification in Messages_Voice
 * https://test_it_domain/test-cases/RCI-3596
 * Preconditions:
 * UserA has logged into the CTI app
 * UserA has the following voice record with UserB
 * UserB has the following settings
	AI CDC > Off
 * AI CDC > On;Include user > On; Publish number> On
 * AI CDC > Off
 * AI CDC > On;Include user > On; Publish number> On
 *
  | No.1 |Record name |Voice message duration |
  | 1 |TextFirst test_last name | RingCentral Extension 103 |01:10 |

 * AICDC:search number > description > FindCompany Directory Controls
 * SWAdmin:
	Include user: Users > User list with Extensions>Include User in Company Directory
 * Publish number:
	Contact number/Mobile number: Users > User list with Extensions>Publish in Company Directory
 * DID: Users > User list with Extensions> Phones & Numbers > Phones tab > DID item >Publish toggle
 * Include user: Users > User list with Extensions>Include User in Company Directory
 * Publish number:
 * Contact number/Mobile number: Users > User list with Extensions>Publish in Company Directory
 * DID: Users > User list with Extensions> Phones & Numbers > Phones tab > DID item >Publish toggle
 * 3. For Hubspot, no need the preconditions 3
 * Entry point(/s):
 *
  | No. |Button |Tooltip |
  | 1 |Play |Play |
	| 2 |Pause |Pause |
	| 3 |Download |Download |
	| 4 |Call |Call |
	| 5 |Text |Text |
	| 6 |View Details |View Details |
	| 7 |Mark as Read |Mark as Read |
	| 8 |Mark as Unread |Mark as UnRead |
	| 9 |Delete |Delete |
	| 10 |Item name |TextFirst test_last name | RingCentral Extension 103 |
	| 11 |Voice message of item |Voice message(01:10) |
	| 12 |Voice tab |Voice |

 * Note(s/):
 * Pause: Click the play first so the play button can change to pause status
 * Mark as Unread:Click the read first so the read button can change to unread
 * > Go to 'Messages' tab> Go to 'Voice' tab> Open the dropdown for one item
 */
import type { StepProp } from '@ringcentral-integration/test-utils';
import {
  autorun,
  common,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../../__mock__';
import { ForceContactMatch } from '../../../../../../steps/ContactMatch';
import {
  CheckVoiceMailItemTooltips,
  ClickActionButton,
  PlayAndCheckVoiceMailItemTooltips,
} from '../../../../../../steps/Messages';
import {
  MockMessageList,
  MockMessageSync,
  MockReadMessage,
  MockExtensionsList,
  mockExtensionsListData,
} from '../../../../../../steps/Mock';
import { NavigateToVoiceMail } from '../../../../../../steps/Navigate';
import { CheckConversationTabTooltip } from '../../../../../../steps/Navigate/checks/CheckConversationTabsTooltip';

@autorun(test.skip)
@common
@it
@p2
@title('Tooltip verification in Messages_Voice')
export class VoiceMailTooltip extends Step {
  CustomLogin: StepProp | null = null;
  CustomCreateMock: StepProp | null = null;
  expectShowEntityButton = false;
  mockCDC = false;
  @examples(`
    | contactName     | phoneNumber    | durationTime |
    | 'Test ContactA' | '+18662100000' | '01:25'      |
  `)
  run() {
    const mockVoiceMailData = mockMessageListData({
      direction: 'Inbound',
      type: 'VoiceMail',
      fromName: 'Test ContactA',
      fromNumber: '+18662100000',
      readStatus: 'Unread',
      attachments: [
        {
          id: 1217329004,
          uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/account/1090441004/extension/1090441004/message-store/1217329004/content/1217329004',
          type: 'AudioRecording',
          contentType: 'audio/x-wav',
          vmDuration: 85,
        },
      ],
    });
    return (
      <Scenario
        desc="Tooltip verification in Messages_Voice"
        action={({ contactName, phoneNumber }: any) => [
          async () => {
            window.HTMLMediaElement.prototype.play = async function () {
              this.dispatchEvent(new window.Event('play'));
            };
          },
          this.CustomCreateMock,
          this.mockCDC ? (
            <MockExtensionsList
              handler={(mockData) => {
                const data = mockExtensionsListData([
                  {
                    firstName: contactName.split(' ')[0],
                    lastName: contactName.split(' ')[1],
                    hidden: false,
                    extensionNumber: phoneNumber,
                    phoneNumber,
                    phoneNumberUsageType: 'ContactNumber',
                    phoneNumberHidden: false,
                  },
                ]);
                return {
                  ...mockData,
                  ...data,
                };
              }}
            />
          ) : (
            () => {}
          ),
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
              ...mockVoiceMailData,
            })}
          />,
        ]}
      >
        <Given desc="User login" action={this.CustomLogin} />
        <Then
          desc="Hover on {Button}
                  There is {Tooltip} for that[L10N] "
          action={[
            ForceContactMatch,
            NavigateToVoiceMail,
            <ClickActionButton testId="VoiceMailMessageItem" />,
            <CheckVoiceMailItemTooltips
              contactName={this.context.example.contactName}
              durationTime={this.context.example.durationTime}
              expectShowEntityButton={this.expectShowEntityButton}
            />,
          ]}
        />
        <Then
          desc="Hover on {Button}
                  There is {Tooltip} for that[L10N] "
          action={[
            <MockReadMessage
              handler={(mockData) => ({
                ...mockData,
                ...mockVoiceMailData.records[0],
                readStatus: 'Read',
                lastModifiedTime: new Date().toISOString(),
              })}
              repeat={2}
            />,
            <CheckConversationTabTooltip title="Voice" />,
            PlayAndCheckVoiceMailItemTooltips,
          ]}
        />
      </Scenario>
    );
  }
}
