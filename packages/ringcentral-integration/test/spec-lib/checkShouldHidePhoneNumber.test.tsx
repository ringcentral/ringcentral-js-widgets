import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { checkShouldHidePhoneNumber } from '../../../ringcentral-widgets/lib/checkShouldHidePhoneNumber';

@autorun(test)
@title('Unit test: checkShouldHidePhoneNumber')
export class checkShouldHidePhoneNumberTest extends Step {
  @examples(`
    | phoneNumber | contactMatches                                                                                                  | shouldHidePhoneNumber |
    | '701'       | null                                                                                                            | false                 |
    | '701'       | []                                                                                                              | false                 |
    | '701'       | [{ id: '123', name: 'test1', hidden: true }]                                                                    | true                  |
    | '701'       | [{ id: '456', name: 'test2', phoneNumbers: [{phoneNumber: '22701' }] }]                                         | false                 |
    | '101'       | [{ id: '456', name: 'test2', phoneNumbers: [{phoneNumber: '101' }] }]                                           | false                 |
    | '701'       | [{ id: '456', name: 'test2', phoneNumbers: [{phoneNumber: '22701', hidden: true }] }]                           | true                  |
    | '101'       | [{ id: '456', name: 'test2', phoneNumbers: [{phoneNumber: '101', hidden: true }] }]                             | true                  |
    | '701'       | [{ id: '456', name: 'test2', phoneNumbers: [{phoneNumber: '22701', hidden: true }, {phoneNumber: '123123' }] }] | false                 |
  `)
  run() {
    return (
      <Scenario desc="Check checkShouldHidePhoneNumber functionality">
        <When
          desc="Basic checkShouldHidePhoneNumber setup"
          action={(_: any, context: any) => {
            expect(typeof checkShouldHidePhoneNumber).toBe('function');
          }}
        />
        <Then
          desc="Should return ${shouldHidePhoneNumber} when callWith ${contactMatches}"
          action={(
            _: any,
            {
              example: { phoneNumber, contactMatches, shouldHidePhoneNumber },
            }: any,
          ) => {
            expect(
              checkShouldHidePhoneNumber(phoneNumber, contactMatches),
            ).toBe(shouldHidePhoneNumber);
          }}
        />
      </Scenario>
    );
  }
}
