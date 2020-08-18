import { type } from '../../src';
import { Step } from '../../src/step';

test('test @type', () => {
  for (const item of ['ut', 'it', 'e2e']) {
    @type(item as any)
    class Bar extends Step {}
    expect(Bar.type).toEqual(item);
  }

  for (const item of ['test', 't0', '']) {
    try {
      @type(item as any)
      class Bar extends Step {}
    } catch (e) {
      expect(e.toString()).toEqual(
        "Error: TestType value should be in ['ut', 'it', 'e2e'].",
      );
    }
  }

  for (const item of [null, undefined]) {
    try {
      @type(item as any)
      class Bar extends Step {}
    } catch (e) {
      expect(e.toString()).toEqual('Error: TestType value is required.');
    }
  }
});
