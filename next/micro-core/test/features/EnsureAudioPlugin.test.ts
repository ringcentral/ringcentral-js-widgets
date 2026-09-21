import {
  App,
  SharedAppOptions,
  testBed,
} from '@ringcentral-integration/next-core';
import {
  render,
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

import { EnsureAudio } from '../../src/app/services';
import { AppRootView } from '../../src/app/views';

async function initApp(app: App<any, any, any>) {
  jest.spyOn(EnsureAudio.prototype, 'ensure');
  app = testBed({
    modules: [
      {
        provide: SharedAppOptions,
        useValue: {
          name: 'internal-test',
          type: 'Base',
        },
      },
    ],
    main: AppRootView,
    render: render,
  });

  app.bootstrap();

  await waitForRenderReady();

  global.instance = {
    app: {
      unmount: app.destroy,
    },
  } as never;
  return app;
}

describe('EnsureAudio in safari', () => {
  let app: App<any, any, any>;
  beforeEach(async () => {
    Object.defineProperty(global.navigator, 'userAgent', {
      value: 'safari',
      configurable: true,
    });

    app = await initApp(app);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.each([{ event: 'click' }, { event: 'keydown' }])(
    '$event event should trigger ensure check only once',
    async ({ event }) => {
      const ensureAudioPlugin = app.container.got(EnsureAudio)!;

      expect(ensureAudioPlugin.ensure).toHaveBeenCalled();

      jest.spyOn(global, 'Audio');

      if (event === 'click') {
        await userEvent.click(document.body);

        expect(global.Audio).toHaveBeenCalled();

        await userEvent.click(document.body);
      } else {
        await userEvent.keyboard('1');

        expect(global.Audio).toHaveBeenCalled();

        await userEvent.keyboard('1');
      }

      // only called once so keep 1
      expect(ensureAudioPlugin.ensure).toHaveBeenCalledTimes(1);
    },
  );
});

describe('EnsureAudio in chrome', () => {
  let app: App<any, any, any>;
  beforeEach(async () => {
    Object.defineProperty(global.navigator, 'userAgent', {
      value: 'chrome',
      configurable: true,
    });

    app = await initApp(app);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('event should not trigger below non safari browser', () => {
    const ensureAudioPlugin = app.container.got(EnsureAudio)!;

    expect(ensureAudioPlugin.ensure).not.toHaveBeenCalled();
  });
});
