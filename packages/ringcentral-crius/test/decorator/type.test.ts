import { it, ut, e2e, manual } from '../../src';
import { Step } from '../../src/step';

test('test with type decorator', () => {
  Object.entries({ it, ut, e2e, manual }).forEach(([key, decorator]) => {
    @decorator
    class Bar extends Step {
      run() {
        //
      }
    }
    expect(Bar.type).toEqual(key);
  });
});
