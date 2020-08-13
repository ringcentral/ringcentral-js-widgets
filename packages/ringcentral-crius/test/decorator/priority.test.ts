import { priority } from '../../src';
import { Step } from '../../src/step';

test('test @priority', () => {
  for (const item of ['p0', 'p1', 'p2', 'p3']) {
    @priority(item as any)
    class Bar extends Step {}
    expect(Bar.priority).toEqual(item);
  }

  for (const item of ['p01', 'p4', 'p00', '00']) {
    try {
      @priority(item as any)
      class Bar extends Step {}
    } catch (e) {
      expect(e.toString()).toEqual(
        "Error: Priority value should be in ['p0', 'p1', 'p2', 'p3'].",
      );
    }
  }

  for (const item of [null, undefined]) {
    try {
      @priority(item as any)
      class Bar extends Step {}
    } catch (e) {
      expect(e.toString()).toEqual('Error: Priority value is required.');
    }
  }
});
