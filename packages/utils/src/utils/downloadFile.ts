import { isSafari } from './isSafari';
import { sleep, SleepPromise } from './sleep';

type DownloadLinkOptions = {
  href: string;
  download: string;
};

function appendAndClickDownloadLink(
  target: Window,
  { href, download }: DownloadLinkOptions,
) {
  const link = target.document.createElement('a');
  link.href = href;
  // that custom file name only support with same site origin
  link.download = download;

  target.document.body.appendChild(link); // required for firefox

  link.dispatchEvent(new MouseEvent('click', { bubbles: false }));

  return link;
}

/**
 * create browser download event
 *
 * ! Safari not support download a href, always open by window.open _self
 */
export const downloadFile = (url: string, filename: string) => {
  if (isSafari()) {
    return global.window.open(url, '_self');
  }

  const link = appendAndClickDownloadLink(global.window, {
    href: url,
    download: filename,
  });

  link.remove();
};

/**
 * with iframe mechanism
 * let you download multiple files in one browser tab.
 *
 * ! Safari not support download a href, always open by window.open _self
 */
export const downloadFileWithIframe = (
  url: string,
  filename: string,
  /**
   * server response time must in side this value
   *
   * if that server not start download stream in 20s, that event will be cancelled.
   *
   * @default 20000ms => 20s
   */
  serverResponseTime = 20 * 1000,
) => {
  if (isSafari()) {
    return global.window.open(url, '_self');
  }

  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';

  document.body.appendChild(iframe);

  iframe.addEventListener('load', () => {
    appendAndClickDownloadLink(iframe.contentWindow!, {
      href: url,
      download: filename,
    });
  });

  iframe.src = 'about:blank';

  // TODO: there is an only way to remove that download iframe, but need backend support
  // https://stackoverflow.com/a/4168965/7720164
  // remove that download iframe after 20s,
  // that download event will be keep in main tab.
  // sever response download stream event inside 20s can make this download work.

  // const id = encodeURIComponent(url);
  // const prevIframe = document.getElementById(id);

  // if (prevIframe) {
  //   // eslint-disable-next-line no-console
  //   console.log('continue previous download event');
  //   // continue previous download event
  //   return;
  // }
  // iframe.id = id;

  let sleepPromise!: SleepPromise;

  try {
    sleepPromise = sleep(serverResponseTime);

    sleepPromise.finally(() => {
      iframe.remove();
    });
  } catch (error) {
    //
  }

  return sleepPromise;
};
