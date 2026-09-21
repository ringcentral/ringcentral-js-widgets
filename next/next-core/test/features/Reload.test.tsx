import { waitTickFor } from '@ringcentral-integration/core/test';
import {
  autorun,
  Given,
  mockAllLogs,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import {
  mockWindowLocation,
  restoreWindowLocation,
} from '@ringcentral-integration/test-utils/mock/locationMock.js';
import { firstValueFrom, Subject } from 'rxjs';

import { logger, SharedAppOptions, testBed } from '../../';
import { Reload } from '../../src/modules/Reload';

mockAllLogs();
let locationMock: ReturnType<typeof mockWindowLocation>;

beforeEach(() => {
  locationMock = mockWindowLocation();

  jest.spyOn(logger, 'log').mockImplementation((...args) => {
    console.log(...args);
  });
});

afterEach(() => {
  restoreWindowLocation();
  jest.restoreAllMocks();
});

@autorun(test)
@title('Reload')
class ReloadTest extends Step {
  run() {
    const reloadReason = 'test reason';

    const app = testBed({
      modules: [
        {
          provide: SharedAppOptions,
          useValue: {
            name: 'internal-test',
            type: 'Base',
          },
        },
      ],
      main: Reload,
    });

    return (
      <Scenario desc="Reload">
        <Given
          desc="Create Reload instance"
          action={() => {
            const reload = app.container.got(Reload);
            expect(reload).toBeInstanceOf(Reload);
          }}
        />
        <When
          desc="Trigger reload"
          action={() => {
            const reload = app.container.got(Reload)!;
            reload.reload(reloadReason);
          }}
        />
        <Then
          desc="Check reload process"
          action={async () => {
            await waitTickFor(() => {
              // eslint-disable-next-line no-console
              expect(console.log).toHaveBeenCalledWith(
                '[debug] refresh',
                reloadReason,
              );
              expect(locationMock.reload).toHaveBeenCalled();
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Reload Guard')
class ReloadGuardTest extends Step {
  run() {
    const reloadReason = 'test reason';

    const app = testBed({
      modules: [
        {
          provide: SharedAppOptions,
          useValue: {
            name: 'internal-test',
            type: 'Base',
          },
        },
      ],
      main: Reload,
    });

    const wait$ = new Subject<void>();

    return (
      <Scenario desc="Reload Guard">
        <Given
          desc="Create Reload instance"
          action={() => {
            const reload = app.container.got(Reload);
            expect(reload).toBeInstanceOf(Reload);
          }}
        />
        <When
          desc="Add reload guard"
          action={async () => {
            const reload = app.container.got(Reload)!;
            const guard = jest.fn(() => {
              return firstValueFrom(wait$);
            });
            reload.addReloadGuard(guard);

            reload.reload(reloadReason);

            await waitTickFor(() => {
              expect(guard).toHaveBeenCalledWith(reloadReason);
            });

            expect(locationMock.reload).not.toHaveBeenCalled();
          }}
        />
        <Then
          desc="Wait for guard to finish"
          action={async () => {
            wait$.next();

            await waitTickFor(() => {
              expect(locationMock.reload).toHaveBeenCalled();
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Reload Guard with multiple guards')
class ReloadGuardMultipleTest extends Step {
  run() {
    const reloadReason = 'test reason';

    const app = testBed({
      modules: [
        {
          provide: SharedAppOptions,
          useValue: {
            name: 'internal-test',
            type: 'Base',
          },
        },
      ],
      main: Reload,
    });

    const wait$ = new Subject<void>();

    return (
      <Scenario desc="Reload Guard">
        <Given
          desc="Create Reload instance"
          action={() => {
            const reload = app.container.got(Reload);
            expect(reload).toBeInstanceOf(Reload);
          }}
        />
        <When
          desc="Add multiple reload guard, and one of them throw error"
          action={async () => {
            const reload = app.container.got(Reload)!;
            const guard = jest.fn(() => {
              return firstValueFrom(wait$);
            });
            reload.addReloadGuard(guard);

            const guard2 = jest.fn(() => {
              return Promise.reject();
            });
            reload.addReloadGuard(guard2);

            reload.reload(reloadReason);

            await waitTickFor(() => {
              expect(guard).toHaveBeenCalledWith(reloadReason);
            });

            expect(locationMock.reload).not.toHaveBeenCalled();
          }}
        />
        <Then
          desc="Wait for guard to finish without error emit"
          action={async () => {
            wait$.next();

            await waitTickFor(() => {
              expect(locationMock.reload).toHaveBeenCalled();
            });
          }}
        />
      </Scenario>
    );
  }
}
