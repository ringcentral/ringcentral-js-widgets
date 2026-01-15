import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { sliceExecute } from '../../src';

interface IExampleData {
  count: number;
  sliceSize: number;
  delay?: number;
  expectedSliced: number[][];
}

const examplesData: IExampleData[] = [
  {
    count: 20,
    sliceSize: 10,
    expectedSliced: [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
  },
  {
    count: 10,
    sliceSize: 3,
    expectedSliced: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]],
  },
  {
    count: 8,
    sliceSize: 5,
    delay: 100,
    expectedSliced: [
      [1, 2, 3, 4, 5],
      [6, 7, 8],
    ],
  },
];

@autorun(test)
@title('sliceExecute')
class SliceExecuteTest extends Step {
  @examples(examplesData)
  run() {
    return (
      <Scenario desc="sliceExecute helper">
        <When desc="setup" />
        <Then
          desc="should slice correct times"
          action={async ({
            count,
            sliceSize,
            delay,
            expectedSliced,
          }: IExampleData) => {
            const sliced: number[][] = [];
            await sliceExecute({
              items: Array.from({ length: count }, (_, i) => i + 1),
              sliceSize,
              delay,
              handler: (slicedItems) => {
                expect(slicedItems.length).toBeGreaterThan(0);
                expect(slicedItems.length).toBeLessThanOrEqual(sliceSize);
                sliced.push(slicedItems);
              },
            });
            expect(sliced.length).toBe(expectedSliced.length);
            for (let i = 0; i < sliced.length; i++) {
              expect(sliced[i]).toEqual(expectedSliced[i]);
            }
          }}
        />
      </Scenario>
    );
  }
}
