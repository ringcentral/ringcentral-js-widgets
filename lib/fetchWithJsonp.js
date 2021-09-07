"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchWithJsonp = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var callback = '__rc_config_data_callback__';

var fetchWithJsonp = function fetchWithJsonp(url) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = url;

    script.onerror = function () {
      reject(new Error("'".concat(url, "' jsonp fetch failed")));
      document.body.removeChild(script);
    }; // TODO: add type


    window[callback] = function (data) {
      resolve(data);
      document.body.removeChild(script);
    };

    document.body.appendChild(script);
  });
};

exports.fetchWithJsonp = fetchWithJsonp;
//# sourceMappingURL=fetchWithJsonp.js.map
