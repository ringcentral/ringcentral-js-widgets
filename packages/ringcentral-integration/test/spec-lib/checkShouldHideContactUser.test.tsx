import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { checkShouldHideContactUser } from '../../../ringcentral-widgets/lib/checkShouldHideContactUser';

@autorun(test)
@title('checkShouldHideContactUser::basic')
export class CheckShouldHideContactUserBasic extends Step {
  @examples(`
    | contactMatches                               | shouldHideContactUser |
    | null                                         | true                  |
    | []                                           | true                  |
    | {}                                           | true                  |
    | [{ id: '123', name: 'test1', hidden: true }] | true                  |
    | [{ id: '456', name: 'test2' }]               | false                 |
  `)
  run() {
    return (
      <Scenario desc="Check checkShouldHideContactUser functionality">
        <When
          desc="Basic checkShouldHideContactUser setup"
          action={(_: any, context: any) => {
            expect(typeof checkShouldHideContactUser).toBe('function');
          }}
        />
        <Then
          desc="Should return ${shouldHideContactUser} when callWith ${contactMatches}"
          action={(_: any, { example }: any) => {
            expect(checkShouldHideContactUser(example.contactMatches)).toBe(
              example.shouldHideContactUser,
            );
          }}
        />
      </Scenario>
    );
  }
}
