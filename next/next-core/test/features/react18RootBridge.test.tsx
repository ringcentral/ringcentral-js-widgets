import { act, createElement } from 'react';

import {
  createRoot,
  flushSync,
  render,
  unmountComponentAtNode,
} from '../..';

describe('React 18 root bridge', () => {
  let host: HTMLDivElement;

  beforeEach(() => {
    host = document.createElement('div');
    document.body.appendChild(host);
  });

  afterEach(() => {
    act(() => {
      unmountComponentAtNode(host);
    });
    host.remove();
  });

  test('exports React 18 root APIs through next-core', () => {
    expect(typeof createRoot).toBe('function');
    expect(typeof flushSync).toBe('function');
  });

  // Skipped: reactant-web 0.150.0's CommonJS `render` calls react-dom's
  // createRoot without its own client-entry guard, so React warns about
  // importing createRoot from "react-dom". Re-enable once reactant-web fixes it.
  test.skip('renders through the Reactant bridge without legacy root warnings', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      //
    });

    act(() => {
      render(createElement('div', { 'data-sign': 'root' }, 'ok'), host);
    });

    expect(host.querySelector('[data-sign="root"]')).toHaveTextContent('ok');
    expect(
      errorSpy.mock.calls.some((args) =>
        args.some((arg) =>
          String(arg).includes('ReactDOM.render is no longer supported'),
        ),
      ),
    ).toBe(false);
    expect(
      errorSpy.mock.calls.some((args) =>
        args.some((arg) =>
          String(arg).includes('importing createRoot from "react-dom"'),
        ),
      ),
    ).toBe(false);

    errorSpy.mockRestore();
  });

  test('reuses one bridge root per container and supports remount', () => {
    act(() => {
      render(createElement('div', { 'data-sign': 'root' }, 'v1'), host);
    });
    expect(host.querySelector('[data-sign="root"]')).toHaveTextContent('v1');

    act(() => {
      render(createElement('div', { 'data-sign': 'root' }, 'v2'), host);
    });
    expect(host.querySelector('[data-sign="root"]')).toHaveTextContent('v2');

    act(() => {
      expect(unmountComponentAtNode(host)).toBe(true);
    });
    expect(host.querySelector('[data-sign="root"]')).toBeNull();

    act(() => {
      render(createElement('div', { 'data-sign': 'root' }, 'v3'), host);
    });
    expect(host.querySelector('[data-sign="root"]')).toHaveTextContent('v3');
  });

  test('supports direct createRoot lifecycle', () => {
    const root = createRoot(host);

    act(() => {
      root.render(
        createElement('div', { 'data-sign': 'direct-root' }, 'direct'),
      );
    });
    expect(host.querySelector('[data-sign="direct-root"]')).toHaveTextContent(
      'direct',
    );

    act(() => {
      root.unmount();
    });
    expect(host.querySelector('[data-sign="direct-root"]')).toBeNull();
  });
});
