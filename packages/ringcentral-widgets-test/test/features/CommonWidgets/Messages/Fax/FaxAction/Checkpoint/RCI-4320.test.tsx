/**
 * RCI-4320: Delete fax
 * https://test_it_domain/test-cases/RCI-4320
 * Preconditions:
 * The user has logged into the CTI app with AI CDC off
 * The user has authorized 3rd party
 * User has fax
 * AICDC:search number > description > FindCompany Directory Controls
 * 3rd party:Google/Office365/Outlook contacts
 * Entry point(/s):
 * > Messages tab > All/Fax >Click expand fax action menu ofthe fax
 */
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
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../../__mock__';
import type { StepFunction } from '../../../../../../lib/step';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  CheckElementTitleById,
  CheckFaxDeleteConfirmPopup,
  ClickActionButton,
  ClickCancelOnPopup,
  ClickCloseOnPopup,
  ClickConfirmOnPopup,
  ExpandTheActionMenu,
} from '../../../../../../steps/Messages';
import { CheckDeleteModalClosed } from '../../../../../../steps/Messages/checks/CheckDeleteModal';
import {
  CreateMock,
  MockMessageList,
  MockMessageSync,
} from '../../../../../../steps/Mock';
import { NavigateToFax } from '../../../../../../steps/Navigate';

@autorun(test.skip)
@common
@it
@p2
@title('Delete fax')
export class RCI4320 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> = CreateMock;

  @examples(`
    | fax    | direction | number         | contact | contactSource |
    | 'Fax3' | 'Inbound' | '+18662105333' | 'UserC' | '3rd party'   |
  `)
  run() {
    const { Login, CreateMock } = this;
    const CONVERSATION_ID = '28f6bb40-6417-4b6d-a60e-74b8519b7937';
    return (
      <Scenario desc="Delete fax">
        <Given
          desc="Messages tab > All/Fax > Click expand fax action menu of the fax"
          action={({
            direction,
            contact,
            number,
          }: {
            direction: string;
            contact: string;
            number: string;
          }) => (
            <>
              <CreateMock />
              <MockMessageList
                isDefaultInit
                handler={(mockData) => ({
                  ...mockData,
                  ...mockMessageListData(null),
                })}
                repeat={0}
              />
              <MockMessageSync
                useFaker
                handler={(mockData) => ({
                  ...mockData,
                  ...mockMessageListData({
                    id: CONVERSATION_ID,
                    direction,
                    type: 'Fax',
                    fromName: contact,
                    fromNumber: number,
                  }),
                })}
              />
              <Login />
              <NavigateToFax />
              <ExpandTheActionMenu />
            </>
          )}
        />
        <When desc="> Hover on the Delete icon" />
        <Then
          desc="'Delete' should be shown
										[L10N]"
          action={<CheckElementTitleById dataSign="Delete" title="Delete" />}
        />
        <When
          desc="> Click the Delete button"
          action={<ClickActionButton testId="Delete" />}
        />
        <Then
          desc="The Delete confirm dialog should show with:
										Text: Are you sure you want to delete this fax?
										'X' button on the right-top corner of the dialog
										Cancel button
										Confirm button(Highlighted)
										[L10N]"
          action={CheckFaxDeleteConfirmPopup}
        />
        <When desc="Click the 'X' button" action={ClickCloseOnPopup} />
        <Then
          desc="The dialog should disappear"
          action={CheckDeleteModalClosed}
        />
        <When
          desc="> Click the Delete button
										> Click the Cancel button"
          action={[<ClickActionButton testId="Delete" />, ClickCancelOnPopup]}
        />
        <Then
          desc="The dialog should disappear"
          action={CheckDeleteModalClosed}
        />
        <When
          desc="> Click the Delete button
										> Click the Confirm button"
          action={[
            (_: any, { phone }: any) => {
              jest.spyOn(phone.messageStore, 'deleteMessageApi');
            },
            <ClickActionButton testId="Delete" />,
            ClickConfirmOnPopup,
          ]}
        />
        <Then
          desc="The dialog should disappear
										The fax should be deleted from the fax list"
          action={[
            CheckDeleteModalClosed,
            (_: any, { phone }: any) => {
              expect(phone.messageStore.deleteMessageApi).toHaveBeenCalledWith(
                CONVERSATION_ID,
              );
            },
          ]}
        />
      </Scenario>
    );
  }
}
