import {
  autorun,
  Scenario,
  Step,
  Then,
  title,
  Given,
  When,
} from '@ringcentral-integration/test-utils';
import { clone } from 'ramda';

import { Storage } from '../../modules/Storage';

const storageData = {
  cachedData: {
    module1: { id: 'module1' },
    module2: { id: 'module2' },
    module3: { id: 'module3' },
  },
  cachedTimestamps: {
    module1: 1,
    module2: 2,
    module3: 3,
  },
};

const storageData2 = {
  cachedData: {
    module1: { id: 'module11' },
    module2: { id: 'module22' },
    module3: { id: 'module33' },
    module4: { id: 'module44' },
    module5: { id: 'module55' },
    module6: { id: 'module66' },
  },
  cachedTimestamps: {
    module1: 11,
    module2: 22,
    module3: 33,
    module4: 44,
    module5: 55,
    module6: 66,
  },
};

@autorun(test)
@title('Storage Module "updateMinimumSet" action')
class updateMinimumSet extends Step {
  run() {
    return (
      <Scenario desc="Storage Module 'updateMinimumSet' action">
        <Given
          desc="Create an Storage instance with default value"
          action={(_: any, context: any) => {
            context.instance = new Storage({} as any);
          }}
        />
        <When desc="New data has more properties than old data" />
        <Then
          desc="Call 'updateMinimumSet' action"
          action={(_: any, context: any) => {
            const result = context.instance.updateMinimumSet(
              clone(storageData),
              clone(storageData2),
              2,
            );
            expect(result).toEqual(storageData2);
          }}
        />
        <When desc="Old data has more properties than new data" />
        <Then
          desc="Call 'updateMinimumSet' action"
          action={(_: any, context: any) => {
            const result2 = context.instance.updateMinimumSet(
              clone(storageData2),
              clone(storageData),
              2,
            );
            expect(result2).toEqual({
              cachedData: {
                module1: { id: 'module1' },
                module2: { id: 'module2' },
                module3: { id: 'module3' },
                module4: { id: 'module44' },
                module5: { id: 'module55' },
                module6: { id: 'module66' },
              },
              cachedTimestamps: {
                module1: 1,
                module2: 2,
                module3: 3,
                module4: 44,
                module5: 55,
                module6: 66,
              },
            });
          }}
        />
      </Scenario>
    );
  }
}
