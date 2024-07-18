import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { Webphone } from '../../modules/Webphone';
import { mockModuleGenerator } from '../lib/mockModule';

// TODO: Jest worker encountered 4 child process exceptions
@autorun(test.skip)
@title('Check forward data')
export class CheckforwardData extends Step {
  @examples(`
    | sessionId | permissionCheck |
    | 'testId'  | false           |
    | 'test'    | false           |
  `)
  run() {
    return (
      <Scenario desc="Check forward data">
        <When
          desc="Execute forward menthod"
          action={(props: any, context: any) => {
            const { sessionId, permissionCheck } = props;
            context.mockModule = mockModuleGenerator({
              originalSessions: {
                testId: 'testId',
              },
              _deps: {
                brand: {
                  brandConfig: {
                    allowRegionSettings: false,
                  },
                },
                regionSettings: {
                  areaCode: '650',
                  countryCode: 'US',
                },
              },
              _permissionCheck: permissionCheck,
            });

            Webphone.prototype.forward.call(
              context.mockModule,
              sessionId,
              '+16504222222',
            );
          }}
        />
        <Then
          desc="The check was successfule"
          action={(_: any, context: any) => {
            expect(context.mockModule.originalSessions.testId).not.toBeNull();
          }}
        />
      </Scenario>
    );
  }
}

// TODO: Jest worker encountered 4 child process exceptions
@autorun(test.skip)
@title('Check transfer data')
export class CheckInitialData1 extends Step {
  @examples(`
    | sessionId | permissionCheck |
    | 'testId'  | false           |
    | 'test'    | false           |
  `)
  run() {
    return (
      <Scenario desc="Check transfer data">
        <When
          desc="Execute transfer menthod"
          action={(props: any, context: any) => {
            const { sessionId, permissionCheck } = props;
            context.mockModule = mockModuleGenerator({
              originalSessions: {
                testId: { __rc_isOnTransfer: true },
              },
              _permissionCheck: permissionCheck,
              _updateSessions: () => null,
            });

            Webphone.prototype.transfer.call(
              context.mockModule,
              '+16504222222',
              sessionId,
            );
          }}
        />
        <Then
          desc="The check was successful"
          action={(_: any, context: any) => {
            expect(context.mockModule.originalSessions.testId).not.toBeNull();
          }}
        />
      </Scenario>
    );
  }
}

// TODO: Jest worker encountered 4 child process exceptions
@autorun(test.skip)
@title('Check startWarmTransfer data')
export class CheckInitialData12 extends Step {
  @examples(`
    | sessionId |
    | 'testId'  |
    | 'test'    |
  `)
  run() {
    return (
      <Scenario desc="Check startWarmTransfer data">
        <When
          desc="Execute startWarmTransfer menthod"
          action={(props: any, context: any) => {
            const { sessionId } = props;
            context.mockModule = mockModuleGenerator({
              originalSessions: {
                testId: { __rc_isOnTransfer: true },
              },
              _updateSessions: () => null,
            });

            Webphone.prototype.startWarmTransfer.call(
              context.mockModule,
              '+16504222222',
              sessionId,
            );
          }}
        />
        <Then
          desc="The check was successful"
          action={(_: any, context: any) => {
            expect(context.mockModule.originalSessions.testId).not.toBeNull();
          }}
        />
      </Scenario>
    );
  }
}
