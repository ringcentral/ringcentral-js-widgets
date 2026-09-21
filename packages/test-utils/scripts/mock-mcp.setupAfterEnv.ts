import { connect } from 'mock-mcp';

const timeout = 60 * 60 * 1000;

jest.setTimeout(timeout);

beforeEach(async () => {
  const state = expect.getState();
  const mockMcpClient = await connect({
    filePath: state.testPath,
    timeout,
    enableReconnect: true,
  });
  global.mockMcpClient = mockMcpClient;
}, timeout);
