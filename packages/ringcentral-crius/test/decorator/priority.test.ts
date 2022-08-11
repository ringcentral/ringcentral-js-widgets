import { p0, p1, p2, p3 } from '../../src';
import { Step } from '../../src/step';

test('test with priority decorator', () => {
  Object.entries({ p0, p1, p2, p3 }).forEach(([key, decorator]) => {
    @decorator
    class Bar extends Step {
      run() {
        //
      }
    }
    expect(Bar.priority).toEqual(key);
  });
});
