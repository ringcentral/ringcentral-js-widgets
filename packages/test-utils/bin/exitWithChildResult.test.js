const assert = require('node:assert/strict');
const test = require('node:test');

const {
  exitWithChildResult,
  getChildExitCode,
} = require('./exitWithChildResult');

test('uses a child process exit code', () => {
  assert.equal(getChildExitCode({ exitCode: 3 }), 3);
  assert.equal(getChildExitCode({ exitCode: 0 }), 1);
  assert.equal(getChildExitCode(new Error('failed')), 1);
});

test('exits successfully when the child command succeeds', async () => {
  let exitCode;

  await exitWithChildResult(Promise.resolve(), (code) => {
    exitCode = code;
  });

  assert.equal(exitCode, 0);
});

test('preserves the child command failure exit code', async () => {
  let exitCode;

  await exitWithChildResult(Promise.reject({ exitCode: 7 }), (code) => {
    exitCode = code;
  });

  assert.equal(exitCode, 7);
});
