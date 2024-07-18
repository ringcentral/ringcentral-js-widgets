"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchWithJsonp = void 0;
require("regenerator-runtime/runtime");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
