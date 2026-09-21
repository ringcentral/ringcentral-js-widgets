import {
  act,
  fireEvent,
  render,
  screen,
} from '@ringcentral-integration/test-utils';
import React from 'react';

import { AnchorOverlay } from '../../src/app/components';

const originalResizeObserver = global.ResizeObserver;
const originalWindowResizeObserver = window.ResizeObserver;
const originalIntersectionObserver = global.IntersectionObserver;

let resizeCallback: ResizeObserverCallback = () => undefined;
let observeMock = jest.fn();
let disconnectMock = jest.fn();
let intersectionCallback: IntersectionObserverCallback = () => undefined;
let intersectionObserveMock = jest.fn();
let intersectionDisconnectMock = jest.fn();

function createRect({
  top,
  left,
  width,
  height,
}: {
  top: number;
  left: number;
  width: number;
  height: number;
}): DOMRect {
  return {
    top,
    left,
    width,
    height,
    x: left,
    y: top,
    right: left + width,
    bottom: top + height,
    toJSON: () => ({}),
  } as DOMRect;
}

function createAnchor(rectGetter: () => DOMRect) {
  const anchor = document.createElement('div');
  document.body.appendChild(anchor);
  jest.spyOn(anchor, 'getBoundingClientRect').mockImplementation(rectGetter);
  return anchor;
}

describe('AnchorOverlay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    resizeCallback = () => undefined;
    observeMock = jest.fn();
    disconnectMock = jest.fn();
    intersectionCallback = () => undefined;
    intersectionObserveMock = jest.fn();
    intersectionDisconnectMock = jest.fn();

    global.ResizeObserver = class ResizeObserverMock {
      constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback;
      }

      observe(element: Element) {
        observeMock(element);
      }

      unobserve() {}

      disconnect() {
        disconnectMock();
      }
    } as unknown as typeof ResizeObserver;
    window.ResizeObserver = global.ResizeObserver;

    global.IntersectionObserver = class IntersectionObserverMock {
      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback;
      }

      observe(element: Element) {
        intersectionObserveMock(element);
      }

      unobserve() {}

      disconnect() {
        intersectionDisconnectMock();
      }

      takeRecords() {
        return [];
      }

      root = null;

      rootMargin = '';

      thresholds = [0, 0.1];
    };
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    global.ResizeObserver = originalResizeObserver;
    window.ResizeObserver = originalWindowResizeObserver;
    global.IntersectionObserver = originalIntersectionObserver;
    jest.restoreAllMocks();
  });

  test('renders children in a fixed overlay positioned from the anchor', async () => {
    let anchorRect = createRect({
      top: 10,
      left: 20,
      width: 200,
      height: 100,
    });
    const anchor = createAnchor(() => anchorRect);

    const { unmount } = render(
      <AnchorOverlay
        anchorEl={() => anchor}
        className="custom-overlay"
        style={{ opacity: 0.5 }}
        layer={3}
      >
        <div data-sign="overlay-content">overlay content</div>
      </AnchorOverlay>,
    );

    const overlay = screen.getByTestId('overlay-content').parentElement!;
    expect(overlay).toHaveClass(
      'bg-neutral-base',
      'overflow-hidden',
      'custom-overlay',
    );
    expect(overlay).toHaveStyle({
      position: 'fixed',
      top: '10px',
      left: '20px',
      width: '100%',
      height: '100%',
      zIndex: '1203',
      opacity: '0.5',
    });
    expect(observeMock).toHaveBeenCalledWith(anchor);

    anchorRect = createRect({
      top: 30,
      left: 40,
      width: 240,
      height: 120,
    });
    act(() => {
      resizeCallback([], {} as ResizeObserver);
    });
    await act(async () => {
      await jest.advanceTimersByTimeAsync(200);
    });

    expect(overlay).toHaveStyle({
      top: '30px',
      left: '40px',
    });

    unmount();
    expect(disconnectMock).toHaveBeenCalledTimes(1);
    expect(intersectionDisconnectMock).toHaveBeenCalledTimes(1);
  });

  test('does not render or observe when anchor is missing', () => {
    render(
      <AnchorOverlay anchorEl={null}>
        <div data-sign="overlay-content">overlay content</div>
      </AnchorOverlay>,
    );

    expect(screen.queryByTestId('overlay-content')).not.toBeInTheDocument();
    expect(observeMock).not.toHaveBeenCalled();
  });

  test('stops click and keydown propagation from the overlay root', () => {
    const anchor = createAnchor(() =>
      createRect({
        top: 0,
        left: 0,
        width: 100,
        height: 100,
      }),
    );
    const onClick = jest.fn();
    const onKeyDown = jest.fn();

    render(
      <div role="presentation" onClick={onClick} onKeyDown={onKeyDown}>
        <AnchorOverlay anchorEl={anchor}>
          <button type="button" data-sign="overlay-action">
            Action
          </button>
        </AnchorOverlay>
      </div>,
    );

    fireEvent.click(screen.getByTestId('overlay-action'));
    fireEvent.keyDown(screen.getByTestId('overlay-action'), { key: 'Enter' });

    expect(onClick).not.toHaveBeenCalled();
    expect(onKeyDown).not.toHaveBeenCalled();
  });

  test('keeps the last rect while hidden and refreshes it when visible', async () => {
    let anchorRect = createRect({
      top: 10,
      left: 20,
      width: 200,
      height: 100,
    });
    const anchor = createAnchor(() => anchorRect);

    const { unmount } = render(
      <AnchorOverlay anchorEl={anchor}>
        <div data-sign="overlay-content">overlay content</div>
      </AnchorOverlay>,
    );

    const overlay = screen.getByTestId('overlay-content').parentElement!;
    expect(intersectionObserveMock).toHaveBeenCalledWith(document.body);

    act(() => {
      intersectionCallback(
        [
          {
            isIntersecting: false,
            intersectionRatio: 0,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    anchorRect = createRect({
      top: 30,
      left: 40,
      width: 240,
      height: 120,
    });
    act(() => {
      resizeCallback([], {} as ResizeObserver);
    });
    await act(async () => {
      await jest.advanceTimersByTimeAsync(200);
    });

    expect(overlay).toHaveStyle({
      top: '10px',
      left: '20px',
    });

    act(() => {
      intersectionCallback(
        [
          {
            isIntersecting: true,
            intersectionRatio: 1,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    expect(overlay).toHaveStyle({
      top: '30px',
      left: '40px',
    });

    unmount();
    expect(jest.getTimerCount()).toBe(0);
  });
});
