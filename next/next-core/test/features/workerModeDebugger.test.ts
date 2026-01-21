import { mockAllLogs } from '@ringcentral-integration/test-utils';

import {
  disableRcSharedWorkerKey,
  disableRcSharedWorkerLoggerKey,
} from '../../src/constant';
import { workerModeDebugger } from '../../src/createSharedApp';

beforeEach(() => {
  mockAllLogs();
});

describe('workerModeDebugger', () => {
  beforeEach(() => {
    // Mock SharedWorker
    (globalThis as any).SharedWorker = function () {};
  });

  afterEach(() => {
    delete (globalThis as any).SharedWorker;
  });

  it('should enable transport debugger if disableRcSharedWorkerLoggerKey is set', () => {
    localStorage.setItem(disableRcSharedWorkerLoggerKey, '1');
    const options: any = { share: { type: 'SharedWorker' } };
    workerModeDebugger(options);
    expect(options.share.enableTransportDebugger).toBe(true);
    expect(typeof options.share.transportLogger).toBe('function');
    // Should log with console.log or console.warn depending on size
    options.share.transportLogger({ type: 'test', foo: 'bar' });
    expect(console.log).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": [
          [
            "[next-core] [test] [size]",
            "0.0263671875 KB",
          ],
          [
            "[next-core] [transportLogger]",
            {
              "foo": "bar",
              "type": "test",
            },
          ],
        ],
        "results": [
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
        ],
      }
    `);
  });

  it('should switch to Base mode if disableRcSharedWorkerKey is set', () => {
    localStorage.setItem(disableRcSharedWorkerKey, '1');

    const options: any = { share: { type: 'SharedWorker', port: {} } };
    workerModeDebugger(options);
    expect(options.share.type).toBe('Base');
    expect(options.share.port).toBeUndefined();
    expect(console.warn).toHaveBeenCalled();
  });

  it('should do nothing if not SharedWorker type', () => {
    const options: any = { share: { type: 'Base' } };
    workerModeDebugger(options);
    expect(options.share.type).toBe('Base');
  });

  it('should do nothing if SharedWorker is not available', () => {
    delete (globalThis as any).SharedWorker;
    const options: any = { share: { type: 'SharedWorker' } };
    workerModeDebugger(options);
    expect(options.share.type).toBe('SharedWorker');
  });
});
