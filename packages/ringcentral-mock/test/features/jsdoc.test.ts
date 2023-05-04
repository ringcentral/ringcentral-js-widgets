import { jsdocTests } from 'jsdoc-tests';

test('test base PlatformMock', () => {
  jsdocTests('../../src/PlatformMock.ts', __dirname, require);
});

test('test base RcMock', () => {
  jsdocTests('../../src/RcMock.ts', __dirname, require);
});
