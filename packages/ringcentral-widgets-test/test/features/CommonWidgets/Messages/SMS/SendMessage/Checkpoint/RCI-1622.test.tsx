import {
  autorun,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CheckPastingAction } from '../../../../../../steps/Messages';
import { NavigateToComposeText } from '../../../../../../steps/Navigate';

@autorun(test.skip)
@it
@p2
@title('Support pasting multiple numbers in Compose Text recipient input')
export class PastingMultipleNumbersInComposeText extends Step {
  Login?: StepFunction<any, any>;
  MockContactSearch: StepFunction<
    { mockEntity: { name: string; phoneNumber: string } },
    any
  >;

  @examples(`
    | pasteData                                     | dataShowAsCard               | showAtInputBox  | searchSuccessful |
    | '(866) 557-3245'                              | ['(866) 557-3245']           | null            | false            |
    | 'Test'                                        | []                           | 'Test'          | true             |
    | 'hello2 world3'                               | []                           | 'hello2 world3' | false            |
    | 'hello2 world3, +1 (866) 557-3246, Test, 102' | ['+1 (866) 557-3246', '102'] | null            | false            |
  `)
  run() {
    const { Login = CommonLogin, MockContactSearch } = this;
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
        <When desc="Go to message tab" action={NavigateToComposeText} />
        <Then
          desc="1. paste ${pasteData} to input box
                2. ${dataShowAsCard} data show as card
                3. ${showAtInputBox} data show at input box
                4. dropdown menu show successfully: ${searchSuccessful}"
          action={CheckPastingAction}
        />
      </Scenario>
    );
  }
}
