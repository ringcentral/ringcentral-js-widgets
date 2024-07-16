/**
 * RCI-1622: Support pasting multiple numbers in Compose Text recipient input
 * https://test_it_domain/test-cases/RCI-1622
 * Preconditions:
 * The user has logged into the 3rd party
 * CTI app is integrated.
 * The user has logged into the CTI app
 * The login account:
	Should have SMS permission
 * Has a contact name: Test
 * Should have SMS permission
 * Has a contact name: Test
 * Entry point(/s):
 *
  | Paste data |Show card |To filed show |Search list |
  | (866) 557-3245 |['(866) 557-3245'] |- |false |
	| Test |- |Test |true |
	| hello2 world3 |- |hello2 world3 |false |
	| hello2 world3,+1(866) 557-3246, Test, 102 |['+1(866) 557-3246', '102'] |- |false |

 * > Login CTI app with the account which can send sms successfully > Compose Text
 */
import type { AddressBook } from '@ringcentral-integration/commons/modules/AddressBook';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  And,
  Given,
  Scenario,
  Step,
  Then,
  When,
  autorun,
  common,
  examples,
  it,
  p2,
  title,
} from '@ringcentral-integration/test-utils';

import { Context } from '../../../../../../interfaces';
import { CommonLoginEntry } from '../../../../../../steps/CommonLogin';
import {
  CheckPastingAction,
  PasteMessageRecipients,
} from '../../../../../../steps/Messages';
import { NavigateToComposeText } from '../../../../../../steps/Navigate';

interface ExampleItem {
  pasteData: string;
  dataShowAsCard: string[];
  showAtInputBox: string | null;
  searchSuccessful: boolean;
}

export interface MockContactSearchProps {
  mockEntity: { name: string; phoneNumber: string };
}

export const MockAddressBookData: StepFunction<
  MockContactSearchProps,
  Context
> = ({ mockEntity }, context) => {
  const addressBook: AddressBook = context.phone.addressBook;
  const records = addressBook.addressBookData.records ?? [];
  records.push({
    id: Math.floor(Math.random() * 1000),
    firstName: mockEntity.name,
    homePhone: mockEntity.phoneNumber,
  });
  addressBook.setAddressBookData({
    ...addressBook.addressBookData,
    records,
  });
};

@autorun(test)
@common
@it
@p2
@title('Support pasting multiple numbers in Compose Text recipient input')
export class PastingMultipleNumbersInComposeText extends Step {
  Login: StepFunction<any, any> = CommonLoginEntry;
  MockContactSearch: StepFunction<
    { mockEntity: { name: string; phoneNumber: string } },
    any
  > = MockAddressBookData;

  @examples(`
    | pasteData                                     | dataShowAsCard               | showAtInputBox  | searchSuccessful |
    | '(866) 557-3245'                              | ['(866) 557-3245']           | null            | false            |
    | 'Test'                                        | []                           | 'Test'          | true             |
    | 'hello2 world3'                               | []                           | 'hello2 world3' | false            |
    | 'hello2 world3, +1 (866) 557-3246, Test, 102' | ['+1 (866) 557-3246', '102'] | null            | false            |
  `)
  run() {
    const { Login, MockContactSearch } = this;
    return (
      <Scenario desc="Verify recipient input support pasting multiple numbers">
        <Given
          desc="Login"
          action={() => [
            Login,
            MockContactSearch && (
              <MockContactSearch
                mockEntity={{ name: 'Test', phoneNumber: '+18445573246' }}
              />
            ),
          ]}
        />
        <And desc="Go to message tab" action={() => [NavigateToComposeText]} />
        <When
          desc="Paste {Paste data} in the To field"
          action={(example: ExampleItem) => [
            /*
             * 1. Paste ${pasteData} to recipients box
             */
            <PasteMessageRecipients pasteData={example.pasteData} />,
          ]}
        />
        <Then
          desc="The data filled in the To field should be {Show card} or {To filed show}
                  There is {Search list} show
                  Note(/s):
                  Search list: Zendesk not support contact search, no suitable for Zendesk"
          action={(example: ExampleItem) => [
            /*
             * 2. Check ${dataShowAsCard} data show as card
             * 3. Check ${showAtInputBox} data show at input box
             * 4. Check dropdown menu show successfully: ${searchSuccessful}
             */
            <CheckPastingAction {...example} />,
          ]}
        />
      </Scenario>
    );
  }
}
