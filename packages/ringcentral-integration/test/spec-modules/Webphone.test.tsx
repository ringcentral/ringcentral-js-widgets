import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import Webphone from '../../modules/Webphone';

import { mockModuleGenerator } from '../lib/mockModule';

@autorun(test)
@title('Check forward data')
export class CheckforwardData extends Step {
  @examples(`
    | sessionId | permissionCheck |
    | 'testId'  | false           |
    | null      | false           |
  `)
  run() {
    return (
      <Scenario desc="Check forward data">
        <When
          desc="Execute forward menthod"
          action={(props: any, context: any) => {
            const { sessionId, permissionCheck } = props;
            context.mockModule = mockModuleGenerator({
              _sessions: {
                get: (sessionId: string) => sessionId,
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
            expect(context.mockModule._permissionCheck).not.toBeNull();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check transfer data')
export class ChecktransferData extends Step {
  @examples(`
    | sessionId | permissionCheck |
    | 'testId'  | false           |
    | null      | false           |
  `)
  run() {
    return (
      <Scenario desc="Check transfer data">
        <When
          desc="Execute transfer menthod"
          action={(props: any, context: any) => {
            const { sessionId, permissionCheck } = props;
            context.mockModule = mockModuleGenerator({
              _sessions: {
                get: (sessionId: string) => {
                  return sessionId
                    ? { __rc_isOnTransfer: sessionId }
                    : sessionId;
                },
              },
              _updateSessions: () => null,
              _permissionCheck: permissionCheck,
            });

            Webphone.prototype.transfer.call(
              context.mockModule,
              '+16504222222',
              sessionId,
            );
          }}
        />
        <Then
          desc="The check was successfule"
          action={(_: any, context: any) => {
            expect(context.mockModule._permissionCheck).not.toBeNull();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check startWarmTransfer data')
export class CheckStartWarmTransfer extends Step {
  @examples(`
    | sessionId |
    | 'testId'  |
    | null      |
  `)
  run() {
    return (
      <Scenario desc="Check startWarmTransfer data">
        <When
          desc="Execute startWarmTransfer menthod"
          action={(props: any, context: any) => {
            const { sessionId } = props;
            context.mockModule = mockModuleGenerator({
              _sessions: {
                get: (sessionId: string) => {
                  return sessionId
                    ? { __rc_isOnTransfer: sessionId }
                    : sessionId;
                },
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
          desc="The check was successfule"
          action={(_: any, context: any) => {
            expect(context.mockModule._permissionCheck).not.toBeNull();
          }}
        />
      </Scenario>
    );
  }
}
