"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lockRefresh = lockRefresh;
require("regenerator-runtime/runtime");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function lockRefresh(sdk) {
  if (!navigator.locks) {
    return sdk;
  }
  var platform = sdk.platform();
  platform._$$refresh = platform._refresh;
  var refreshWithLock = function refreshWithLock() {
    var _navigator$locks;
    return (_navigator$locks = navigator.locks) === null || _navigator$locks === void 0 ? void 0 : _navigator$locks.request('token_refresh', {
      mode: 'exclusive'
    }, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var isRefreshed, authData, res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return platform._auth.accessTokenValid();
            case 2:
              isRefreshed = _context.sent;
              if (!isRefreshed) {
                _context.next = 8;
                break;
              }
              _context.next = 6;
              return platform._auth.data();
            case 6:
              authData = _context.sent;
              return _context.abrupt("return", new Response(JSON.stringify(authData), {
                status: 200
              }));
            case 8:
              _context.next = 10;
              return platform._$$refresh();
            case 10:
              res = _context.sent;
              return _context.abrupt("return", res);
            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  };
  platform._refresh = refreshWithLock;
  return sdk;
}
//# sourceMappingURL=lockRefresh.js.map
