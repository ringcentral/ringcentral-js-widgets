"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchWithJsonp = void 0;
require("regenerator-runtime/runtime");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var RUNTIME = {};
var fetchWithJsonp = function fetchWithJsonp(url, key) {
  if (!RUNTIME[key]) {
    RUNTIME[key] = {
      lastPromise: null
    };
  }
  var runtime = RUNTIME[key];
  var lastPromise = runtime === null || runtime === void 0 ? void 0 : runtime.lastPromise;
  var promise = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return lastPromise;
          case 3:
            _context.next = 7;
            break;
          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
          case 7:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var script = document.createElement('script');
              script.src = url;
              script.onerror = function () {
                document.body.removeChild(script);
                window[key] = null;
                if (runtime.lastPromise === promise) {
                  runtime.lastPromise = null;
                }
                reject(new Error("'".concat(url, "' jsonp fetch failed")));
              };
              window[key] = function (data) {
                document.body.removeChild(script);
                window[key] = null;
                if (runtime.lastPromise === promise) {
                  runtime.lastPromise = null;
                }
                resolve(data);
              };
              document.body.appendChild(script);
            }));
          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }))();
  runtime.lastPromise = promise;
  return promise;
};
exports.fetchWithJsonp = fetchWithJsonp;
//# sourceMappingURL=fetchWithJsonp.js.map
