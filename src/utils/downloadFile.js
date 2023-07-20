"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.promise.finally");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadFileWithIframe = exports.downloadFile = void 0;
var _isSafari = require("./isSafari");
var _sleep = require("./sleep");
function appendAndClickDownloadLink(target, _ref) {
  var href = _ref.href,
    download = _ref.download;
  var link = target.document.createElement('a');
  link.href = href;
  // that custom file name only support with same site origin
  link.download = download;
  target.document.body.appendChild(link); // required for firefox

  link.dispatchEvent(new MouseEvent('click', {
    bubbles: false
  }));
  return link;
}

/**
 * create browser download event
 *
 * ! Safari not support download a href, always open by window.open _self
 */
var downloadFile = function downloadFile(url, filename) {
  if ((0, _isSafari.isSafari)()) {
    return global.window.open(url, '_self');
  }
  var link = appendAndClickDownloadLink(global.window, {
    href: url,
    download: filename
  });
  link.remove();
};

/**
 * with iframe mechanism
 * let you download multiple files in one browser tab.
 *
 * ! Safari not support download a href, always open by window.open _self
 */
exports.downloadFile = downloadFile;
var downloadFileWithIframe = function downloadFileWithIframe(url, filename) {
  var serverResponseTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20 * 1000;
  if ((0, _isSafari.isSafari)()) {
    return global.window.open(url, '_self');
  }
  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  iframe.addEventListener('load', function () {
    appendAndClickDownloadLink(iframe.contentWindow, {
      href: url,
      download: filename
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

  var sleepPromise;
  try {
    sleepPromise = (0, _sleep.sleep)(serverResponseTime);
    sleepPromise["finally"](function () {
      iframe.remove();
    });
  } catch (error) {
    //
  }
  return sleepPromise;
};
exports.downloadFileWithIframe = downloadFileWithIframe;
//# sourceMappingURL=downloadFile.js.map
