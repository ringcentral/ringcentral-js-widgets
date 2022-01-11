"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchWithJsonp = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var callback = '__rc_config_data_callback__';
var RUNTIME = {
  lastPromise: null
};

var fetchWithJsonp = function fetchWithJsonp(url) {
  var lastPromise = RUNTIME.lastPromise;

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
                window[callback] = null;

                if (RUNTIME.lastPromise === promise) {
                  RUNTIME.lastPromise = null;
                }

                reject(new Error("'".concat(url, "' jsonp fetch failed")));
              }; // TODO: add type


              // TODO: add type
              window[callback] = function (data) {
                document.body.removeChild(script);
                window[callback] = null;

                if (RUNTIME.lastPromise === promise) {
                  RUNTIME.lastPromise = null;
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

  RUNTIME.lastPromise = promise;
  return promise;
};

exports.fetchWithJsonp = fetchWithJsonp;
//# sourceMappingURL=fetchWithJsonp.js.map
