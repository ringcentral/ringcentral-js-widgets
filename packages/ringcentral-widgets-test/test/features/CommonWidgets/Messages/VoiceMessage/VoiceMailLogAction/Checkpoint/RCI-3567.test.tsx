/**
 * RCI-3567: Cancel deletion of voice message
 * https://test_id_domain/test-cases/RCI-3567
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
import { StepProp } from '../../../../../../lib/step';
import {
  ClickCancelOnPopup,
  ClickCloseOnPopup,
} from '../../../../../../steps/Messages';
import { ClickActionButton } from '../../../../../../steps/Messages/actions/ClickActionButton';
import { CheckCurrentName } from '../../../../../../steps/Messages/checks/CheckCurrentName';
import { CheckDeleteModalClosed } from '../../../../../../steps/Messages/checks/CheckDeleteModal';
import { MockMessageSync } from '../../../../../../steps/Mock';
import { MockMessageList } from '../../../../../../steps/Mock/MockMessage/MockMessageList';
import { NavigateToVoiceMail } from '../../../../../../steps/Navigate';

@autorun(test.skip)
@it
@p2
@title('Cancel deletion of voice message')
export class CancelDeletionOfVoiceMessage extends Step {
  CustomLogin: StepProp | null = null;
  CustomCreateMock: StepProp | null = null;
  run() {
    const mockVoiceMailData = mockMessageListData({
      direction: 'Inbound',
      type: 'VoiceMail',
      fromName: 'UserB',
      fromNumber: '18662105111',
    });
    return (
      <Scenario
        desc="Cancel deletion of voice message"
        action={(_: any) => [
          this.CustomCreateMock,
          <MockMessageList
            handler={(mockData) => ({
              ...mockData,
              ...mockMessageListData(null),
            })}
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
          desc="> Click 'Delete' button
										> Click 'Cancel' button"
          action={[
            NavigateToVoiceMail,
            <ClickActionButton testId="VoiceMailMessageItem" />,
            <ClickActionButton testId="Delete" />,
            <ClickCancelOnPopup />,
          ]}
        />
        <Then
          desc="The popup closes
										VM1 is still exist on the list"
          action={[
            CheckDeleteModalClosed,
            <CheckCurrentName nameItem="(866) 210-5111" />,
          ]}
        />
        <When
          desc="> Click 'Delete' button
										> Click 'X' button from the popup"
          action={[<ClickActionButton testId="Delete" />, ClickCloseOnPopup]}
        />
        <Then
          desc="The popup closes
										VM1 is still exist on the list"
          action={[
            CheckDeleteModalClosed,
            <CheckCurrentName nameItem="(866) 210-5111" />,
          ]}
        />
      </Scenario>
    );
  }
}
