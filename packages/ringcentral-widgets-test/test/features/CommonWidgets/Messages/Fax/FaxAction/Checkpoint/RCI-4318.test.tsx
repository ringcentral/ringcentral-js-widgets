/**
 * RCI-4318: Download fax
 * https://test_it_domain/test-cases/RCI-4318
 * Preconditions:
 * The user has logged into the CTI app with AI CDC off
 * The user has authorized 3rd party
 * User has unread fax with 3rd party/Personal/Company contacts/unknown number users.
 * Note(/s):
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
} from '@ringcentral-integration/test-utils';
import type { StepProp } from '../../../../../../lib/step';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  CheckElementTitleById,
  CheckMessageDownload,
  ExpandTheActionMenu,
} from '../../../../../../steps/Messages';
import {
  CreateMock,
  MockMessageList,
  MockMessageSync,
} from '../../../../../../steps/Mock';
import { NavigateToFax } from '../../../../../../steps/Navigate';
import { mockMessageListData } from '../../../../../../__mock__';

@autorun(test.skip)
@it
@p2
@title('Download fax')
export class RCI4318 extends Step {
  Login: StepProp = CommonLogin;
  CreateMock: StepProp = CreateMock;

  @examples(`
    | fax    | direction | number         | contact | contactSource |
    | 'Fax3' | 'Inbound' | '+18662105333' | 'UserC' | '3rd party'   |
  `)
  run() {
    const CONVERSATION_ID = '28f6bb40-6417-4b6d-a60e-74b8519b7937';
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Download fax">
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
                  ...mockMessageListData(null),
                })}
                repeat={0}
              />
              <MockMessageSync
                useFaker
                handler={() =>
                  mockMessageListData({
                    id: CONVERSATION_ID,
                    direction,
                    type: 'Fax',
                    fromName: contact,
                    fromNumber: number,
                  })
                }
              />
              <Login />
              <NavigateToFax />
              <ExpandTheActionMenu />
            </>
          )}
        />
        <When desc="Hover on download icon" />
        <Then
          desc="'Download' should be shown
										[L10N]"
          action={
            <CheckElementTitleById dataSign="download" title="Download" />
          }
        />
        <When desc="Click the Download icon" />
        <Then
          desc="Users can download the fax, and the fax format is pdf
										For firefox: only can view, because of Firefox's security limitation."
          action={CheckMessageDownload}
        />
      </Scenario>
    );
  }
}
