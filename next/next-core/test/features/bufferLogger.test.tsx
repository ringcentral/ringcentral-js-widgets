/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';

import { loggerInstance } from '../../src/lib/logger';
import {
  getBufferLogItems,
  overrideBufferLogger,
  useBufferLogger,
} from '../../src/lib/logger/bufferLogger';

@autorun(test)
@title('test bufferLogger getBufferLogs')
class Base extends Step {
  run() {
    let items;
    return (
      <Scenario desc="bufferLogger">
        <Given
          desc="some log items"
          action={async () => {
            useBufferLogger();
            // log some items
            loggerInstance.fn('log')('hello', { world: 'world' });
            loggerInstance.fn('info')('pwd', '123456');
          }}
        />
        <When
          desc="call getBufferLogItems"
          action={() => {
            items = getBufferLogItems();
          }}
        />
        <Then
          desc="should return the items"
          action={() => {
            expect(items!).toEqual([
              [
                'log',
                [
                  'hello',
                  {
                    world: 'world',
                  },
                ],
              ],
              ['info', ['pwd', '123456']],
            ]);
          }}
        />
        <When
          desc="override with another log, and not clear buffer"
          action={() => {
            overrideBufferLogger(console, () => true, false);
          }}
        />
        <Then
          desc="should not clear buffer"
          action={() => {
            expect(getBufferLogItems()).toEqual([
              [
                'log',
                [
                  'hello',
                  {
                    world: 'world',
                  },
                ],
              ],
              ['info', ['pwd', '123456']],
            ]);
          }}
        />
      </Scenario>
    );
  }
}
