import { BannerPlugin } from 'webpack';

import { createWorkerScriptsErrorBannerPlugin } from '../../src/scriptsLoadFail/workerScriptsErrorBannerPlugin';

describe('createWorkerScriptsErrorBannerPlugin', () => {
  it('should return a BannerPlugin instance', () => {
    const plugin = createWorkerScriptsErrorBannerPlugin();
    expect(plugin).toBeInstanceOf(BannerPlugin);
  });

  it('should include the worker and coworker files', () => {
    const plugin = createWorkerScriptsErrorBannerPlugin();
    expect(plugin.options.include).toEqual([/worker|coworker/]);
  });

  it('should override the default options', () => {
    const options = {
      include: [/custom/],
    };
    const plugin = createWorkerScriptsErrorBannerPlugin(options);
    expect(plugin.options.include).toEqual([/custom/]);

    expect(plugin.options.banner).toMatchSnapshot();
  });
});
