/* Check status of control button in transfer page
https://test_it_domain/test-cases/RCI-5149
*/
import { StepFunction } from '@ringcentral-integration/crius';
import {
  And,
  autorun,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { MakeCall } from '../../../../steps/Call';
import {
  ClickCloseChipButton,
  CheckRecipientsChipInToField,
  ClickTheKeyOnTheDialPad,
} from '../../../../steps/Dialer';
import { TypingWordingInSearch } from '../../../../steps/Messages';
import { MockExtensionsListPublicApi } from '../../../../steps/Mock';
import { NavigateToTransferPage } from '../../../../steps/Navigate';
import { SelectContactFromTabs } from '../../../../steps/RCDirectory';
import {
  CheckControlButtonStatus,
  ClickMoreButton,
} from '../../../../steps/Transfer';

const filterCompanyMatch = {
  extensionsListData: {
    records: [
      {
        id: '129832007',
        type: 'User',
        status: 'Enabled',
        firstName: 'Albee',
        lastName: 'test',
        email: 'dean.chen@ringcentral.com',
        extensionNumber: '3489',
        account: {
          id: '129832006',
        },
        phoneNumbers: [{}],
      },
    ],
    paging: {
      page: 1,
      totalPages: 1,
      perPage: 2000,
      totalElements: 1,
      pageStart: 0,
      pageEnd: 2,
    },
  },
  show: true,
};

@autorun(test.skip)
@common
@it
@p2
@title('Check status of control button in transfer page')
export class RCI5419 extends Step {
  Login?: StepFunction<any, any>;
  CreateMock?: StepFunction<any, any>;
  run() {
    const { Login, CreateMock } = this;

    return (
      <Scenario desc="Check status of control button in transfer page">
        <Given
          desc="User login to Salesforce cti"
          action={[
            CreateMock,
            <MockExtensionsListPublicApi
              mockResponse={filterCompanyMatch.extensionsListData}
            />,
            Login,
          ]}
        />
        <When
          desc="User make a outbound or inbound call"
          action={() => (
            <MakeCall
              phoneNumber="18882556247"
              direction="Inbound"
              status="connected"
            />
          )}
        />
        <And desc="User click more button" action={ClickMoreButton} />
        <And
          desc="User navigate to transfer page"
          action={NavigateToTransferPage}
        />
        <Then
          desc="User should be see that control button is disabled status"
          action={() => (
            <CheckControlButtonStatus
              controlButtons={{
                name: ['warmTransferBtn', 'transferBtn', 'toVoicemailBtn'],
                status: 'disabled',
              }}
            />
          )}
        />
        <When
          desc="User input character(eg. Al)  in 'To:' field and click a company contact on tab page"
          action={[
            <TypingWordingInSearch chars="Al" dataSign="recipientsInput" />,
            <SelectContactFromTabs type="company" />,
          ]}
        />
        <Then
          desc="User should to see that contact name in 'To:' field "
          action={[
            <CheckRecipientsChipInToField ChipValue="Albee test" />,
            <CheckControlButtonStatus
              controlButtons={{
                name: ['warmTransferBtn', 'transferBtn', 'toVoicemailBtn'],
                status: 'enabled',
              }}
            />,
          ]}
        />
        <When
          desc="User click the close button of 'To' field"
          action={ClickCloseChipButton}
        />
        <Then
          desc="User should be see that control button is disabled status"
          action={() => (
            <CheckControlButtonStatus
              controlButtons={{
                name: ['warmTransferBtn', 'transferBtn', 'toVoicemailBtn'],
                status: 'disabled',
              }}
            />
          )}
        />
        <And
          desc="User input number by click number on dial pad"
          action={() => <ClickTheKeyOnTheDialPad theDialValue="1" />}
        />
        <Then
          desc="User should be see that control button is enable status"
          action={() => (
            <CheckControlButtonStatus
              controlButtons={{
                name: ['warmTransferBtn', 'transferBtn', 'toVoicemailBtn'],
                status: 'enabled',
              }}
            />
          )}
        />
      </Scenario>
    );
  }
}
