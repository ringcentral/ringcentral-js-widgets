"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadFileWithIframeCors = exports.downloadFileWithIframe = exports.downloadFile = void 0;
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
var _getHostPath = require("./getHostPath");
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
var downloadFile = exports.downloadFile = function downloadFile(url, filename) {
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
var downloadFileWithIframe = exports.downloadFileWithIframe = function downloadFileWithIframe(url, filename) {
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
  var sleepPromise = (0, _sleep.sleep)(serverResponseTime);
  sleepPromise["catch"](function () {
    // ignore cancel error
  })["finally"](function () {
    iframe.remove();
  });
  return sleepPromise;
};

/**
 * same function with downloadFileWithIframe, but use postMessage method to avoid the same origin policy
 *
 * ! must enable that `includeHiddenDownloadPage` in your project.config.json
 *
 * avoid the error:
 * Uncaught SecurityError: Failed to read a named property 'document' from 'Window': Blocked a frame with origin "
 */
var downloadFileWithIframeCors = exports.downloadFileWithIframeCors = function downloadFileWithIframeCors(url, filename) {
  var serverResponseTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20 * 1000;
  if ((0, _isSafari.isSafari)()) {
    return global.window.open(url, '_self');
  }
  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  iframe.addEventListener('load', function () {
    var _iframe$contentWindow;
    (_iframe$contentWindow = iframe.contentWindow) === null || _iframe$contentWindow === void 0 ? void 0 : _iframe$contentWindow.postMessage({
      key: 'ɵɵ.rc-download',
      url: url,
      filename: filename
    });
  });
  var hostUrl = (0, _getHostPath.getHostPath)();
  iframe.src = hostUrl + 'hidden-download.html';
  var sleepPromise = (0, _sleep.sleep)(serverResponseTime);
  sleepPromise["catch"](function () {
    // ignore cancel error
  })["finally"](function () {
    iframe.remove();
  });
  return sleepPromise;
};
//# sourceMappingURL=downloadFile.js.map
