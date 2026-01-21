import { waitTickFor } from '@ringcentral-integration/core/test';
import {
  autorun,
  Given,
  mockAllLogs,
  Scenario,
  Step,
  Then,
  When,
  title,
} from '@ringcentral-integration/test-utils';

import {
  ISharedAppOptions,
  PortalHost,
  PortManager,
  SharedAppOptions,
  testBed,
} from '../../';
import { DehydratedPortal } from '../../src/modules/PortalHost/utils';
import { Reload } from '../../src/modules/Reload';

mockAllLogs();

@autorun(test)
@title('PortalHost')
class PortalHostTest extends Step {
  run() {
    const portalHostReason = 'test reason';

    const app = testBed({
      modules: [
        {
          provide: SharedAppOptions,
          useValue: {
            name: 'internal-test',
            type: 'Base',
          } satisfies ISharedAppOptions,
        },
      ],
      main: PortalHost,
    });

    const testPortal = new DehydratedPortal({
      props: (props) => props,
    });

    const portal = app.container.got(PortalHost)!;

    portal['_typeMap'].set('example', testPortal);

    return (
      <>
        <Scenario desc="Open and Close Portal">
          <Given
            desc="Initialize PortalHost"
            action={() => {
              const portalHost = app.container.got(PortalHost);
              expect(portalHost).toBeInstanceOf(PortalHost);
            }}
          />
          <When
            desc="Open a portal"
            action={async () => {
              const portalHost = app.container.got(PortalHost)!;
              const { id, closed } = portalHost.open(
                testPortal,
                { test: 'data' },
                (id, type, payload) => {
                  expect(id).toBeTruthy();
                  expect(type).toBe(undefined);
                  expect(payload).toEqual({ test: 'data' });
                },
              );
              expect(id).toBeTruthy();
              expect(closed).toBeInstanceOf(Promise);
            }}
          />
          <Then
            desc="Close portal"
            action={async () => {
              const portalHost = app.container.got(PortalHost)!;
              const { id } = portalHost.open(
                testPortal,
                { test: 'data' },
                () => {},
              );
              await portalHost.close([{ id }], id, async () => {});
              expect(portalHost.getMap(id)).toBeUndefined();
            }}
          />
        </Scenario>

        <Scenario desc="Timer Management">
          <When
            desc="Start timer"
            action={async () => {
              const portalHost = app.container.got(PortalHost)!;
              const testId = 'test-timer';
              await portalHost.startTimer(testId, 100);
              expect(portalHost['_timerCancelMap'].size).toBe(1);
            }}
          />
          <Then
            desc="Clear timer"
            action={async () => {
              const portalHost = app.container.got(PortalHost)!;
              const testId = 'test-timer';
              await portalHost.clearTimer(testId);
              expect(portalHost['_timerCancelMap'].size).toBe(0);
            }}
          />
        </Scenario>

        <Scenario desc="Event Handling">
          <When
            desc="Call event handler"
            action={async () => {
              const portalHost = app.container.got(PortalHost)!;
              const eventHandler = jest.fn();
              testPortal.handlerRegister.set('test-event', eventHandler);

              testPortal.type = 'example';

              const { id } = portalHost.open(
                testPortal,
                { test: 'data' },
                (id, type) => {
                  portalHost.setIdTypeMap(id, type);
                },
              );

              await portalHost.callOnEvent(id, 'test-event', 'test-arg');
              expect(eventHandler).toHaveBeenCalledWith('test-arg');
            }}
          />
          <Then desc="Check event handler" action={async () => {}} />
        </Scenario>

        <Scenario desc="Resolver Management">
          <When
            desc="Add resolver"
            action={async () => {
              const portalHost = app.container.got(PortalHost)!;
              const testId = 'test-resolver';
              const closed = portalHost.addResolver(testId);
              expect(closed).toBeInstanceOf(Promise);

              // Test resolution
              await portalHost.resolveFn(testId, { result: 'success' });
              const result = await closed;
              expect(result).toEqual({ result: 'success' });
            }}
          />
          <Then desc="Check resolver handler" action={async () => {}} />
        </Scenario>

        <Scenario desc="Should throw error when data not able to serialize">
          <When
            desc="Call event handler"
            action={async () => {
              const portalHost = app.container.got(PortalHost)!;

              const a = { b: '123', c: null };
              const b = { a };
              a.c = b as any;

              expect(() =>
                portalHost.open(testPortal, { test: 'data', a }, (id, type) => {
                  portalHost.setIdTypeMap(id, type);
                }),
              ).toThrow('[PortalHost] payload must be serializable');
            }}
          />
          <Then desc="Check event handler" action={async () => {}} />
        </Scenario>
      </>
    );
  }
}
