import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

registerRequireContextHook();

/* global jest */
// Date.now = jest.fn(() => 1542620329248);
jest.mock('uuid', () => () => 'test');
