/**
 * RCI-3566: Delete voice message
 * https://test_it_domain/test-cases/RCI-3566
 * Preconditions:
 * RC CTI app is installed and enabled
 * User must have login 3rd party
 * Must have a voicemail (VM1)
 * User have login RC CTI App
 * The user has at least a voice message (VM1)
 * Entry point(/s):
 * Messages > All/Voice tab > Expand VM1
 */

import {
  autorun,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../../__mock__';
import type { StepProp } from '../../../../../../lib/step';
import {
  CheckNoMessagesDisplay,
  CheckVoicemailDeleteConfirmPopup,
  ClickConfirmOnPopup,
} from '../../../../../../steps/Messages';
import { ClickActionButton } from '../../../../../../steps/Messages/actions/ClickActionButton';
import { MockMessageList, MockMessageSync } from '../../../../../../steps/Mock';
import { NavigateToVoiceMail } from '../../../../../../steps/Navigate';

@autorun(test.skip)
@it
@p2
@title('Delete voice message')
export class DeleteVoiceMessage extends Step {
  CustomLogin: StepProp | null = null;
  CustomCreateMock: StepProp | null = null;
  run() {
    const mockVoiceMailData = mockMessageListData({
      direction: 'Inbound',
      type: 'VoiceMail',
      fromName: 'UserB',
      fromNumber: '18662105111',
    });
    let deleteMessageApi: any;
    return (
      <Scenario
        desc="Delete voice message"
        action={(_: any) => [
          this.CustomCreateMock,
          <MockMessageList
            handler={(mockData) => ({
              ...mockData,
              ...mockMessageListData(null),
            })}
            isDefaultInit
            repeat={0}
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
        <When
          desc="Click 'Delete' button"
          action={[
            NavigateToVoiceMail,
            <ClickActionButton testId="VoiceMailMessageItem" />,
            <ClickActionButton testId="Delete" />,
          ]}
        />
        <Then
          desc="There should be a pop up:
										Text: 'Are you sure you want to delete this voicemail?'
										Button: 'Cancel'
										Button: 'Confirm'
										[L10N]"
          action={CheckVoicemailDeleteConfirmPopup}
        />
        <When
          desc="Click 'Confirm' button"
          action={[
            () => {
              deleteMessageApi = jest.spyOn(
                this.context.phone.messageStore,
                'deleteMessageApi',
              );
            },
            ClickConfirmOnPopup,
          ]}
        />
        <Then
          desc="VM1 disappears from message list
										VM1 disappears from SW/other devices"
          action={[
            CheckNoMessagesDisplay,
            () => {
              expect(deleteMessageApi).toHaveBeenCalledWith(
                `${mockVoiceMailData.records[0].id}`,
              );
            },
          ]}
        />
      </Scenario>
    );
  }
}
