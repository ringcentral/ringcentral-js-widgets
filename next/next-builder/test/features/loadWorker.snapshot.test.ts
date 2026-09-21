import { runInNewContext } from 'vm';

import { getLoadWorkerTemplate } from '../../src/scriptsLoadFail';

describe('getLoadWorkerTemplate', () => {
  it('check output', () => {
    expect(
      getLoadWorkerTemplate(undefined, 'example.js', 'worker'),
    ).toMatchSnapshot();

    expect(
      getLoadWorkerTemplate('__rc_coworker__', 'example.js', 'coworker'),
    ).toMatchSnapshot();
  });

  it('can disable the unsupported user agent check', () => {
    expect(
      getLoadWorkerTemplate(undefined, 'example.js', 'worker', '', {
        shouldCheckUnsupportedWorkerUserAgent: false,
      }),
    ).toContain("const shouldCheckUnsupportedWorkerUserAgent =\n    ''");
  });

  it('can require BroadcastChannel before constructing a worker', () => {
    const SharedWorker = jest.fn();
    const template = getLoadWorkerTemplate(
      undefined,
      'example.js',
      'worker',
      '',
      { requireBroadcastChannel: true },
    );
    const [, script] = template.match(/^<script>([\s\S]*)<\/script>$/) || [];

    runInNewContext(script, {
      console,
      localStorage: { getItem: jest.fn() },
      navigator: { userAgent: 'Chrome' },
      SharedWorker,
      window: { SharedWorker: true },
    });

    expect(SharedWorker).not.toHaveBeenCalled();
  });

  it('can scope the browser SharedWorker name independently from the chunk', () => {
    const worker = { addEventListener: jest.fn() };
    const SharedWorker = jest.fn(() => worker);
    const template = getLoadWorkerTemplate(
      undefined,
      'example.js?rcOfficeRuntime=office-add-ins-v1-runtime',
      'worker',
      '',
      { workerName: 'office-add-ins-v1-runtime' },
    );
    const [, script] = template.match(/^<script>([\s\S]*)<\/script>$/) || [];
    const window = { SharedWorker: true };

    runInNewContext(script, {
      console,
      localStorage: { getItem: jest.fn() },
      navigator: { userAgent: 'Chrome' },
      SharedWorker,
      window,
    });

    expect(SharedWorker).toHaveBeenCalledWith(
      'example.js?rcOfficeRuntime=office-add-ins-v1-runtime',
      { name: 'office-add-ins-v1-runtime' },
    );
    expect(window).toEqual({
      SharedWorker: true,
      __rc_shared_worker__: {
        url: 'example.js?rcOfficeRuntime=office-add-ins-v1-runtime',
        worker,
      },
    });
  });

  it('sanitizes worker constructor and load errors when requested', () => {
    const sensitiveError =
      'https://callback.example.test/?code=secret&token=secret';
    const renderLoadFail = jest.fn();
    const consoleError = jest.fn();
    const template = getLoadWorkerTemplate(
      undefined,
      'example.js',
      'worker',
      '',
      {
        requireBroadcastChannel: true,
        sanitizeWorkerErrors: true,
      },
    );
    const [, script] = template.match(/^<script>([\s\S]*)<\/script>$/) || [];
    const run = (SharedWorker: jest.Mock) =>
      runInNewContext(script, {
        BroadcastChannel: jest.fn(),
        console: { error: consoleError },
        localStorage: { getItem: jest.fn() },
        navigator: { userAgent: 'Chrome' },
        SharedWorker,
        window: {
          SharedWorker: true,
          workerScriptsFail: { renderLoadFail },
        },
      });

    run(
      jest.fn(() => {
        throw new Error(sensitiveError);
      }),
    );

    let errorListener:
      | ((event: { preventDefault: jest.Mock }) => void)
      | undefined;
    run(
      jest.fn(() => ({
        addEventListener: (
          _type: string,
          listener: (event: { preventDefault: jest.Mock }) => void,
        ) => {
          errorListener = listener;
        },
      })),
    );
    const errorEvent = { preventDefault: jest.fn() };
    errorListener?.(errorEvent);
    errorListener?.(errorEvent);

    expect(renderLoadFail).toHaveBeenCalledTimes(2);
    expect(errorEvent.preventDefault).toHaveBeenCalledTimes(2);
    expect(consoleError).toHaveBeenNthCalledWith(
      1,
      'load __rc_shared_worker__ worker fail',
    );
    expect(consoleError).toHaveBeenNthCalledWith(
      2,
      'load __rc_shared_worker__ worker fail',
    );
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain(
      sensitiveError,
    );
    expect(template).not.toContain("worker fail', event");
  });

  it('does not add MFE dependency markers when MFE config is empty', () => {
    const template = getLoadWorkerTemplate(undefined, 'example.js', 'worker');

    expect(template).toMatch(
      /const hasMfeDependencies =\s+Object\.keys\(dependencies\)\.length > 0;/,
    );
    expect(template).toContain('if (!hasMfeDependencies) {');
    expect(template).toContain(
      "url: hasMfeDependencies ? url + '?' + name : url",
    );
    expect(template).not.toContain("console.log('rc worker mfe:'");
    expect(template).not.toContain('url: dependencies ?');
  });

  it('keeps MFE dependency markers when MFE config has dependencies without a name', () => {
    const localStorage = {
      getItem: jest.fn(),
    };
    const windowObject: {
      SharedWorker: boolean;
      __rc_shared_worker__?: { url: string; worker: unknown };
    } = {
      SharedWorker: true,
    };
    const workers: Array<{ url: string; options: { name: string } }> = [];
    const mfeConfig = JSON.stringify({
      dependencies: {
        jupiter_platform: {
          entry: 'https://example.com/remoteEntry.js',
          dependencyVersion: '*',
        },
      },
    });
    const template = getLoadWorkerTemplate(
      undefined,
      'example.js',
      'worker',
      mfeConfig,
    );

    const [, script] = template.match(/^<script>([\s\S]*)<\/script>$/) || [];
    runInNewContext(script, {
      btoa: (value: string) => Buffer.from(value).toString('base64'),
      console,
      localStorage,
      navigator: { userAgent: 'Chrome' },
      SharedWorker: function SharedWorker(
        url: string,
        options: { name: string },
      ) {
        workers.push({ url, options });
        return { addEventListener: jest.fn() };
      },
      window: windowObject,
    });

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith('disableRcSharedWorker');
    expect(workers).toHaveLength(1);
    expect(workers[0].url).toBe('example.js');
    expect(workers[0].options.name).toMatch(/^worker#/);
    expect(workers[0].options.name).toContain(
      Buffer.from(
        JSON.stringify({
          jupiter_platform: {
            entry: 'https://example.com/remoteEntry.js',
            dependencyVersion: '*',
          },
        }),
      ).toString('base64'),
    );
    expect(windowObject.__rc_shared_worker__?.url).toBe(
      `example.js?${workers[0].options.name}`,
    );
  });
});
