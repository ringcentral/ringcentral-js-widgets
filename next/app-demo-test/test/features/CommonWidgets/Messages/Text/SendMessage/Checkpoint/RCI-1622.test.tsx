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
import { AddressBook } from '@ringcentral-integration/micro-contacts/src/app/services';
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
  type Context,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

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
  const addressBook = context.app.container.got(AddressBook)!;
  jest.spyOn(addressBook, 'data', 'get').mockReturnValue({
    syncToken: '123',
    records: [
      {
        id: Math.floor(Math.random() * 1000),
        firstName: mockEntity.name,
        homePhone: mockEntity.phoneNumber,
      },
    ],
  });
};

@autorun(test)
@it
@p2
@title('Support pasting multiple numbers in Compose Text recipient input')
@common
export class PastingMultipleNumbersInComposeText extends Step {
  Login: StepFunction<any, any> = CommonLoginEntry;
  MockContactSearch: StepFunction<
    { mockEntity: { name: string; phoneNumber: string } },
    any
  > = MockAddressBookData;
  userNewSearchList = false;

  @examples(`
    | pasteData                                     | dataShowAsCard               | showAtInputBox  | showSearchTab | searchSuccessful |
    | '(866) 557-3245'                              | ['(866) 557-3245']           | null            | false         | false            |
    | 'Test'                                        | []                           | 'Test'          | true          | true             |
    | 'hello2 world3'                               | []                           | 'hello2 world3' | true          | false            |
    | 'hello2 world3, +1 (866) 557-3246, Test, 102' | ['+1 (866) 557-3246', '102'] | null            | false         | false            |
  `)
  run() {
    const { Login, MockContactSearch } = this;
    return (
      <Scenario desc="Verify recipient input support pasting multiple numbers">
        <Given
          desc="Login"
          action={[
            Login,
            <MockContactSearch
              mockEntity={{ name: 'Test', phoneNumber: '+18445573246' }}
            />,
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
            <CheckPastingAction
              {...example}
              userNewSearchList={this.userNewSearchList}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
