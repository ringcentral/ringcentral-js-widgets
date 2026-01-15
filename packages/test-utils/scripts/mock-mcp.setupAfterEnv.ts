import { connect } from 'mock-mcp';

const timeout = 5 * 60 * 1000;

jest.setTimeout(timeout);

beforeEach(async () => {
  const mockMcpClient = await connect({
    port: 3002,
  });
  global.mockMcpClient = mockMcpClient;
});

afterEach(async () => {
  // TODO: implement finish mock client
  // @ts-ignore
  await global.mockMcpClient?.finish?.();
}, timeout);
