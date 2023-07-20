import { downloadFile, downloadFileWithIframe } from '../../src/utils';
import * as utils from '../../src/utils/isSafari';
import * as sleep from '../../src/utils/sleep';

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

    const promise = downloadFileWithIframe(url, filename, serverResponseTime);
    expect(document.querySelector('iframe')).toBeInTheDocument();
    const removeSpy = jest.spyOn(HTMLIFrameElement.prototype, 'remove');

    jest.advanceTimersByTime(serverResponseTime);
    expect(spy).toHaveBeenCalledWith(serverResponseTime);

    jest.useRealTimers();
    await promise;

    expect(removeSpy).toHaveBeenCalled();
  });
});
