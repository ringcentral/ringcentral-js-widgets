import Module, { state, action, computed } from '../../lib/usm';
import createCase from './case';
import caseResult from './caseResult';

const logs = [];
console.log = (...args) => {
  logs.push(JSON.parse(JSON.stringify(args)));
};
test('usm: simple case', async () => {
  await createCase(Module, state, action, computed);
  expect(logs).toEqual(caseResult);
});
