import { waitUntilTo } from '@ringcentral-integration/utils';

import { TabLife } from '../../lib/tabLife';
import {
  And,
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '../steps';
import { MockBroadcastChannel } from '../steps/MockBroadcastChannel';

@autorun(test)
@title('TabLife should work correctly, when many tab exist')
export class TabLifeWork extends Step {
  run() {
    const tabLifeA = new TabLife('A');
    const tabLifeB = new TabLife('A');
    let onLeave = false;
    let checkLeavePromise: Promise<boolean>;

    return (
      <Scenario
        desc="TabLife should work correctly, when many tab exist"
        action={MockBroadcastChannel}
      >
        <Given
          desc="Init two TabLife life"
          action={() => {
            tabLifeA.init();
            tabLifeB.init();
          }}
        />
        <When
          desc="Make TabA alive"
          action={() => {
            tabLifeA.alive();
          }}
        />
        <Then
          desc="TabA and TabB check isAlive should be true"
          action={async () => {
            expect(await tabLifeA.isAlive()).toBeTruthy();

            expect(await tabLifeB.isAlive()).toBeTruthy();
          }}
        />
        <When
          desc="Listen TabB isLeave and onLeave should be true"
          action={() => {
            checkLeavePromise = tabLifeB.isLeave();

            tabLifeB.onLeave(() => {
              onLeave = true;
            });
          }}
        />
        <When
          desc="Make TabA destroy"
          action={() => {
            tabLifeA.destroy();
          }}
        />
        <Then
          desc="TabA and TabB check isAlive should be false"
          action={async () => {
            expect(await tabLifeA.isAlive(0)).toBeFalsy();

            expect(await tabLifeB.isAlive(0)).toBeFalsy();
          }}
        />
        <And
          desc="onLeave should be true"
          action={async () => {
            await waitUntilTo(() => {
              expect(onLeave).toBeTruthy();
            });

            const result = await checkLeavePromise;

            expect(result).toBeFalsy();
          }}
        />
      </Scenario>
    );
  }
}
