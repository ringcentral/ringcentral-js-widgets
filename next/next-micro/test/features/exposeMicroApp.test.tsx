import { expose } from '@ringcentral/mfe-react';
import {
  createSharedApp,
  render,
  unmountComponentAtNode,
} from '@ringcentral-integration/next-core';
import React from 'react';

import { exposeMicroApp } from '../../src/exposeMicroApp';

jest.mock('@ringcentral/mfe-react', () => ({
  expose: jest.fn((config) => config),
}));

jest.mock('@ringcentral-integration/next-core', () => ({
  createSharedApp: jest.fn(),
  render: jest.fn(),
  unmountComponentAtNode: jest.fn(),
}));

describe('exposeMicroApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).app = {
      bootstrap: jest.fn(),
    };
  });

  test('configures createSharedApp with the next-core render bridge', async () => {
    const appElement = React.createElement('div');
    const directTarget = document.createElement('div');
    const mfeTarget = document.createElement('div');

    const microApp = exposeMicroApp({} as any) as any;

    await microApp.init();

    expect(expose).toHaveBeenCalled();
    expect(createSharedApp).toHaveBeenCalledWith(
      expect.objectContaining({
        render: expect.any(Function),
      }),
    );

    const renderBridge = jest.mocked(createSharedApp).mock.calls[0][0]
      .render as (...args: any[]) => unknown;

    renderBridge(appElement, directTarget);
    expect(render).toHaveBeenCalledWith(appElement, directTarget);

    renderBridge(appElement, 'mfe-id', mfeTarget);
    expect(render).toHaveBeenCalledWith(appElement, mfeTarget);
  });

  test('unmounts rendered micro app through the next-core bridge', () => {
    const host = document.createElement('div');
    const microApp = exposeMicroApp({ renderRoot: () => host } as any) as any;

    const cleanup = microApp.render();

    expect((global as any).app.bootstrap).toHaveBeenCalledWith(host);

    cleanup();

    expect(unmountComponentAtNode).toHaveBeenCalledWith(host);
  });

  test('skips bootstrap and unmount when renderRoot has no host', () => {
    const microApp = exposeMicroApp({ renderRoot: () => null } as any) as any;

    const cleanup = microApp.render();

    cleanup();

    expect((global as any).app.bootstrap).not.toHaveBeenCalled();
    expect(unmountComponentAtNode).not.toHaveBeenCalled();
  });
});
