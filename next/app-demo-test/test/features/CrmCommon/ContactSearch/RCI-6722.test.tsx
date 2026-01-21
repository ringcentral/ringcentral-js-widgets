/**
 * RCI-6722: Pages with search results are displayed first except 3rd party contact
 * https://test_it_domain/test-cases/RCI-6722
 * Preconditions:
 * 1. The user is logged into 3rd party app andRC CTI
 * 2. The user company has the following :
 * call queue: 'Tech Support' Ext. 10092 with a direct number(855) 324-2201
 * call queue: 'Business Support' Ext. 10093 with no direct number
 * company: 'I am company' with a direct number(855) 324-2202
 * personal: 'I am personal'with a direct number(866) 324-2202
 *
  | Search string |Display |
  | Support |3rd party, Other, Company, Personal |
	| 220 |3rd party, Company, Personal,Other |
	| 855 |3rd party, Company,Other,Personal |
	| 866 |3rd party, Personal,Company,Other |
	| 999 |3rd party, Company, Personal,Other |

 * Extension type(/s):
 * Entry point(/s):
 *
 */
import {
  p2,
  it,
  autorun,
  examples,
  type StepFunction,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../steps/CommonLogin';
import { CheckContactSearchByOrder } from '../../../steps/ContactSearch/checks/CheckContactSearchByOrder';
import { CreateInstance } from '../../../steps/CreateInstance';
import { TypingWordingInSearch } from '../../../steps/Messages';
import {
  CreateMock,
  MockAddressBookSync,
  MockExtensionsListPublicApi,
} from '../../../steps/Mock';
import { NavigateToDialer } from '../../../steps/Navigate';

const CALL_QUEUE_TECH_SUPPORT = {
  id: '1',
  type: 'Department',
  status: 'Enabled',
  name: 'Tech Support',
  extensionNumber: '10092',
  account: {
    id: '1737819004',
  },
  phoneNumbers: [
    {
      phoneNumber: '+18553242201',
      type: 'VoiceFax',
      formattedPhoneNumber: '+1(855)324-2201',
      usageType: 'DirectNumber',
    },
  ],
};

const CALL_QUEUE_BUSINESS_SUPPORT = {
  id: '2',
  type: 'Department',
  status: 'Enabled',
  name: 'Business Support',
  extensionNumber: '10093',
  account: {
    id: '1737819004',
  },
};

@autorun(test.skip)
@it
@p2
@title('Pages with search results are displayed first except 3rd party contact')
@common
export class RCI6722 extends Step {
  CreateMock: StepFunction<any, any> = CreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );

  @examples([
    {
      searchString: 'Support',
      display: ['3rd party', 'Other', 'Company', 'Personal'],
    },
    {
      searchString: '220',
      display: ['3rd party', 'Company', 'Personal', 'Other'],
    },
    {
      searchString: '855',
      display: ['3rd party', 'Company', 'Other', 'Personal'],
    },
    {
      searchString: '866',
      display: ['3rd party', 'Personal', 'Company', 'Other'],
    },
    {
      searchString: '999',
      display: ['3rd party', 'Company', 'Personal', 'Other'],
    },
  ])
  run() {
    return (
      <Scenario desc="Pages with search results are displayed first except 3rd party contact">
        <When
          desc="User is on dialer, input {Search string} on To field"
          action={[
            this.CreateMock,
            <MockAddressBookSync
              page={1}
              handler={(personalUsers) => {
                const firstPersonalUser = personalUsers[0];
                firstPersonalUser.firstName = 'I am personal';
                firstPersonalUser.middleName = '';
                firstPersonalUser.lastName = '';
                firstPersonalUser.homePhone = '(866) 324-2202';
                return [firstPersonalUser]; // take the first one only for avoid multiple match
              }}
            />,
            <MockExtensionsListPublicApi
              handler={(mockData) => {
                return {
                  ...mockData,
                  records: [
                    {
                      ...mockData.records[0],
                      firstName: 'I am company',
                      lastName: '',
                      phoneNumbers: [
                        {
                          phoneNumber: '+18553242202',
                          type: 'VoiceFax',
                          usageType: 'DirectNumber',
                          primary: true,
                        },
                      ],
                    },
                    CALL_QUEUE_TECH_SUPPORT,
                    CALL_QUEUE_BUSINESS_SUPPORT,
                  ],
                };
              }}
            />,
            this.Login,
            NavigateToDialer,
            <TypingWordingInSearch
              chars={this.example.searchString}
              dataSign="recipientsInput"
            />,
          ]}
        />
        <Then
          desc="Pages with search results are displayed as {Display}"
          action={<CheckContactSearchByOrder tabs={this.example.display} />}
        />
      </Scenario>
    );
  }
}
