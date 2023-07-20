import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  hasClickToCallPermission,
  callingOptions,
} from '../../modules/CallingSettings';

// would run it in RCI-4779
@autorun(test.skip)
@title('ClickToCallPermission::basic')
export class ClickToCallPermissionBasic extends Step {
  @examples(`
    | callWith    | ringoutEnabled | webphoneEnabled | permission |
    | 'browser'   | true           | true            | true       |
    | 'browser'   | true           | false           | false      |
    | 'browser'   | false          | true            | true       |
    | 'browser'   | false          | false           | false      |
    | 'softphone' | true           | true            | true       |
    | 'softphone' | true           | false           | true       |
    | 'softphone' | false          | true            | true       |
    | 'softphone' | false          | false           | false      |
    | 'ringout'   | true           | true            | true       |
    | 'ringout'   | true           | false           | true       |
    | 'ringout'   | false          | true            | false      |
    | 'ringout'   | false          | false           | false      |
    | 'jupiter'   | true           | true            | true       |
    | 'jupiter'   | true           | false           | true       |
    | 'jupiter'   | false          | true            | true       |
    | 'jupiter'   | false          | false           | false      |
  `)
  run() {
    return (
      <Scenario desc="">
        <When
          desc="Basic ClickToCallPermission setup"
          action={(_: any, context: any) => {
            const { browser, softphone, ringout, jupiter } = callingOptions;
            context.callingOptions = callingOptions;
            context.hasClickToCallPermission = hasClickToCallPermission;
            expect(typeof browser).toBe('string');
            expect(typeof softphone).toBe('string');
            expect(typeof ringout).toBe('string');
            expect(typeof jupiter).toBe('string');
            expect(typeof hasClickToCallPermission).toBe('function');
          }}
        />
        <Then
          desc="should return ${permission} when callWith is ${callWith} and ringoutEnabled is ${ringoutEnabled} and webphoneEnabled is ${webphoneEnabled}"
          action={(
            _: any,
            { callingOptions, hasClickToCallPermission, example }: any,
          ) => {
            expect(
              hasClickToCallPermission({
                ringoutEnabled: example.ringoutEnabled,
                webphoneEnabled: example.webphoneEnabled,
                callWith: callingOptions[example.callWith],
              }),
            ).toBe(example.permission);
          }}
        />
      </Scenario>
    );
  }
}
