import {
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { QuickAccess } from '../../modules/QuickAccessV2';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    entered: false,
  });

@autorun(test)
@title('QuickAccess Module "updatePageStatus" action')
export class UpdatePageStatus extends Step {
  @examples(`
    | status                 | entered |
    | { entered: undefined } | false   |
    | { entered: true }      | true    |
    | { entered: false }     | false   |
  `)
  run() {
    return (
      <Scenario desc="QuickAccess Module 'updatePageStatus' action">
        <Given
          desc="Create an QuickAccess instance with default value"
          action={(_: any, context: any) => {
            const quickAccess = new QuickAccess({} as any);
            expect(quickAccess.entered).toBe(false);
            context.instance = quickAccess;
          }}
        />
        <When
          desc="Call QuickAccess 'updatePageStatus' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.updatePageStatus.call(
              context.mockModule,
              context.example.status,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.entered).toBe(context.example.entered);
          }}
        />
      </Scenario>
    );
  }
}
