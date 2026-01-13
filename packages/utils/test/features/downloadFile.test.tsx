import {
  createMockAction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

import {
  downloadFileWithIframeCors,
  downloadFile,
  downloadFileWithIframe,
} from '../../src/utils';
import * as utils from '../../src/utils/isSafari';
import * as sleep from '../../src/utils/sleep';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('downloadFile', () => {
  it('should call window.open with url and _self when isSafari returns true', () => {
    const spy = jest.spyOn(global.window, 'open');
    jest.spyOn(utils, 'isSafari').mockReturnValue(true);
    const url = 'http://example.com';
    const filename = 'test.txt';
    downloadFile(url, filename);
    expect(spy).toHaveBeenCalledWith(url, '_self');
  });

  it('should create a link element and dispatch a click event when isSafari returns false', () => {
    const spy = jest.spyOn(global.window.document, 'createElement');
    jest.spyOn(utils, 'isSafari').mockReturnValue(false);
    const url = 'http://example.com';
    const filename = 'test.txt';
    downloadFile(url, filename);
    expect(spy).toHaveBeenCalledWith('a');
  });
});

describe('downloadFileWithIframe', () => {
  it('should call window.open with url and _self when isSafari returns true', () => {
    const spy = jest.spyOn(global.window, 'open');
    jest.spyOn(utils, 'isSafari').mockReturnValue(true);
    const url = 'http://example.com';
    const filename = 'test.txt';
    downloadFileWithIframe(url, filename);
    expect(spy).toHaveBeenCalledWith(url, '_self');
  });

  it('should create an iframe element and append it to the body when isSafari returns false', () => {
    const spy = jest.spyOn(global.window.document, 'createElement');
    jest.spyOn(utils, 'isSafari').mockReturnValue(false);
    const url = 'http://example.com';
    const filename = 'test.txt';
    downloadFileWithIframe(url, filename);
    expect(spy).toHaveBeenCalledWith('iframe');
  });

  it('should call sleep with the given serverResponseTime', async () => {
    const spy = jest.spyOn(sleep, 'sleep');
    const url = 'http://example.com';
    const filename = 'test.txt';
    const serverResponseTime = 20000;
    jest.useFakeTimers();
    const iframe = document.createElement('iframe') as HTMLIFrameElement;
    const action = createMockAction();
    jest
      .spyOn(iframe, 'addEventListener')
      .mockImplementation(action.addListener);
    Object.defineProperty(iframe, 'contentWindow', {
      writable: true,
      value: {
        postMessage: jest.fn(),
        document: {
          createElement: jest.fn(),
        },
      },
    });

    jest
      .spyOn(global.window.document, 'createElement')
      .mockImplementation(() => {
        return iframe as any;
      });

    const promise = downloadFileWithIframe(url, filename, serverResponseTime);
    expect(document.querySelector('iframe')).toBeInTheDocument();
    const removeSpy = jest.spyOn(HTMLIFrameElement.prototype, 'remove');

    jest.advanceTimersByTime(serverResponseTime);
    expect(spy).toHaveBeenCalledWith(serverResponseTime);
    action.action$.next(['load', undefined]);

    expect(iframe.contentWindow!.document.createElement).toHaveBeenCalled();
    jest.useRealTimers();
    await promise;
    await waitForRenderReady();

    expect(removeSpy).toHaveBeenCalled();
    jest.clearAllMocks();
  });
});

describe('downloadFileWithIframeCors', () => {
  it('should create an iframe element and append it to the body', () => {
    const iframe = document.createElement('iframe') as HTMLIFrameElement;
    const action = createMockAction();
    jest
      .spyOn(iframe, 'addEventListener')
      .mockImplementation(action.addListener);
    Object.defineProperty(iframe, 'contentWindow', {
      writable: true,
      value: {
        postMessage: jest.fn(),
      },
    });

    const spy = jest
      .spyOn(global.window.document, 'createElement')
      .mockImplementation(() => {
        return iframe as any;
      });
    const url = 'http://example.com';
    const filename = 'test.txt';
    downloadFileWithIframeCors(url, filename);
    expect(spy).toHaveBeenCalledWith('iframe');

    expect(action.addListener).toHaveBeenCalledWith(
      'load',
      expect.any(Function),
    );

    action.action$.next(['load', undefined]);
    expect(iframe.contentWindow?.postMessage).toHaveBeenCalledWith({
      key: 'ɵɵ.rc-download',
      url,
      filename,
    });

    jest.clearAllMocks();
  });

  it('should set the iframe src to the provided URL', () => {
    const url = 'http://example.com';
    const filename = 'test.txt';
    downloadFileWithIframeCors(url, filename);
    const iframe = document.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.src).toBe('http://localhost/hidden-download.html');
  });

  it('should append the iframe to the document body', () => {
    const url = 'http://example.com';
    const filename = 'test.txt';
    downloadFileWithIframeCors(url, filename);
    const iframe = document.querySelector('iframe');
    expect(document.body.contains(iframe)).toBe(true);
  });

  it('should call sleep with the given serverResponseTime', async () => {
    const spy = jest.spyOn(sleep, 'sleep');
    const url = 'http://example.com';
    const filename = 'test.txt';
    const serverResponseTime = 20000;
    jest.useFakeTimers();

    const promise = downloadFileWithIframeCors(
      url,
      filename,
      serverResponseTime,
    );
    expect(document.querySelector('iframe')).toBeInTheDocument();
    const removeSpy = jest.spyOn(HTMLIFrameElement.prototype, 'remove');

    jest.advanceTimersByTime(serverResponseTime);
    expect(spy).toHaveBeenCalledWith(serverResponseTime);

    jest.useRealTimers();
    await promise;
    await waitForRenderReady();

    expect(removeSpy).toHaveBeenCalled();
  });
});
