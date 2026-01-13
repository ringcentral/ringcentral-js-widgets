import {
  fireEvent,
  screen,
  userEvent,
  waitFor,
} from '@ringcentral-integration/test-utils';
import { connect } from 'testing-mcp';

const timeout = 5 * 60 * 1000;

jest.setTimeout(timeout);

const originalWebSocket = global.WebSocket;

afterEach(async () => {
  const state = expect.getState();
  globalThis.WebSocket = originalWebSocket;
  await connect({
    port: 3001,
    filePath: state.testPath,
    context: {
      userEvent,
      screen,
      fireEvent,
      waitFor,
    },
  });
}, timeout);
