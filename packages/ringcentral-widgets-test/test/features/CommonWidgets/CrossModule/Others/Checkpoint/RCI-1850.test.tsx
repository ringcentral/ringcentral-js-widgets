/**
 * RCI-1850: Check call/sms to short ext begin with 0
 * https://test_id_domain/test-cases/RCI-1850
 * Preconditions:
 * User has logged into 3rd party.
 * User has logged into RC CTI App
 * Web Phone is enabled and 'Browser' is selected in Settings > Calling > Make my calls with
 * Account A has 23 and 22(Company- own site)site, and has extension numbers below:22701, 220707,220000, 230707,230000
 *
  | Site code |Ext. |Format |
  | 22 |22701 |701 |
	| 22 |220707 |707 |
	| 22 |220000 |0 |
	| 23 |230707 |230707 |
	| 23 |230000 |230000 |

 * Entry point(/s):
 *
 */

import {
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import accountInfoBody from '@ringcentral-integration/mock/src/platform/data/accountInfo.json';

import { StepProp } from '../../../../../lib/step';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import {
  CreateMock,
  MockExtensionInfo,
  MockExtensionsList,
} from '../../../../../steps/Mock';
import { NavigateToContacts } from '../../../../../steps/Navigate';
import { CheckContactItemExistInList } from '../../../../../steps/ContactsView';
import { CreateInstance } from '../../../../../steps/CreateInstance';

@autorun(test)
@it
@p2
@title('Check call/sms to short ext begin with 0')
export class RCI1850 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;

  exampleData = [
    {
      siteCode: '22',
      siteName: 'Main Site',
      extensionNumber: '22701',
      format: '701',
    },
    {
      siteCode: '22',
      siteName: 'Main Site',
      extensionNumber: '220707',
      format: '707',
    },
    {
      siteCode: '22',
      siteName: 'Main Site',
      extensionNumber: '220000',
      format: '0',
    },
    {
      siteCode: '23',
      siteName: 'site2',
      extensionNumber: '230707',
      format: '230707',
    },
    {
      siteCode: '23',
      siteName: 'site2',
      extensionNumber: '230000',
      format: '230000',
    },
  ];

  generateContacts() {
    return this.exampleData.map((item, index) => ({
      id: Math.random().toString().slice(2, 10),
      extensionNumber: item.extensionNumber,
      type: 'User',
      status: 'Enabled',
      firstName: 'John',
      lastName: `${index}`,
      name: `John ${index}`,
      account: { id: accountInfoBody.id.toString() },
      email: `something+${Math.random().toString().slice(2, 5)}@test.com`,
      site: { name: item.siteName, code: item.siteCode },
    }));
  }

  run() {
    const { Login, CreateMock } = this;
    const mockContacts = this.generateContacts();
    return (
      <Scenario
        desc="Check call/sms to short ext begin with 0"
        action={[
          CreateMock,
          <MockExtensionInfo
            handle={(mockData) => ({
              ...mockData,
              site: { name: 'Main Site', code: '22' },
            })}
          />,
          <MockExtensionsList
            repeat={0}
            handler={(mockData) => ({
              ...mockData,
              records: mockContacts,
            })}
          />,
        ]}
      >
        <When
          desc="> Check contact {Ext.} on Entry page"
          action={[Login, NavigateToContacts]}
        />
        <Then
          desc="The contact will show like:{Format}"
          action={() => {
            return this.exampleData.map((item, index) => {
              return (
                <CheckContactItemExistInList
                  userName={mockContacts[index].name}
                  extensionNumber={item.format}
                />
              );
            });
          }}
        />
      </Scenario>
    );
  }
}
