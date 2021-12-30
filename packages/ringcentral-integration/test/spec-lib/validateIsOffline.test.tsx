import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import validateIsOffline from '../../lib/validateIsOffline';

@autorun(test)
@title('validateIsOffline::basic')
export class ValidateIsOfflineBasic extends Step {
  @examples(`
    | message                                                                          | result |
    | 'Failed to fetch'                                                                | true   |
    | 'Network Error'                                                                  | true   |
    | 'Unable to access the network'                                                   | true   |
    | 'Your connection was interrupted'                                                | true   |
    | 'The Internet connection appears to be offline.'                                 | true   |
    | 'NetworkError when attempting to fetch resource.'                                | true   |
    | 'Network Error 0x2ee7, Could not complete the operation due to error 00002ee7.'  | true   |
    | 'A server with the specified hostname could not be found.'                       | true   |
    | 'Network request failed'                                                         | true   |
    | 'Type error'                                                                     | true   |
    | 'The request timed out.'                                                         | true   |
    | null                                                                             | false  |
    | undefined                                                                        | false  |
    | ''                                                                               | false  |
    | 'test error'                                                                     | false  |
  `)
  run() {
    return (
      <Scenario desc="">
        <When
          desc="Basic validateIsOffline setup"
          action={(_: any, context: any) => {
            context.validateIsOffline = validateIsOffline;
            expect(typeof validateIsOffline).toBe('function');
          }}
        />
        <Then
          desc="should return ${result} when error message is ${message}"
          action={(_: any, { validateIsOffline, example }: any) => {
            expect(validateIsOffline(example.message)).toBe(example.result);
          }}
        />
      </Scenario>
    );
  }
}
