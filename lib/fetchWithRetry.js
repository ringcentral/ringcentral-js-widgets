"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.parse-int");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRetirableStatus = exports.fetchWithRetry = exports.backoffDelay = void 0;
require("regenerator-runtime/runtime");
var _utils = require("../utils");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// regex to match 429, 500...599
var isRetirableStatus = function isRetirableStatus(status) {
  return /(?:5\d{2}|429)/.test("".concat(status));
};
exports.isRetirableStatus = isRetirableStatus;
var backoffDelay = function backoffDelay(retries) {
  return 1 * Math.pow(2, retries) * 1000;
};
/**
 * Fetches a resource from the network with retry logic for handling timeouts and server errors.
 *
 * This function will retry the fetch operation up to a maximum of 2 times with exponential backoff
 * for timeouts or 5XX responses. If the retries fail, it will retry after a specified polling interval.
 * It also respects the `Retry-After` header for 429 (Too Many Requests) or 503 (Service Unavailable) responses.
 *
 * @param url - The URL to fetch.
 * @param args - The options for the fetch request.
 * @returns The response from the fetch request.
 * @throws Will throw an error if the fetch operation fails after the maximum number of retries.
 */
exports.backoffDelay = backoffDelay;
var fetchWithRetry = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, args) {
    var maxRetries, retries, delay, response, error, isMatched, retryAfter;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            maxRetries = 2;
            retries = 0;
            delay = 0;
            error = null;
          case 4:
            if (!(retries <= maxRetries)) {
              _context.next = 30;
              break;
            }
            _context.prev = 5;
            error = null;
            _context.next = 9;
            return fetch(url, args);
          case 9:
            response = _context.sent;
            // now only retry on those status
            isMatched = isRetirableStatus(response.status);
            if (!isMatched) {
              _context.next = 16;
              break;
            }
            retryAfter = response.headers.get('Retry-After');
            if (retryAfter) {
              delay = parseInt(retryAfter) * 1000;
            } else {
              delay = backoffDelay(retries);
            }
            _context.next = 17;
            break;
          case 16:
            return _context.abrupt("break", 30);
          case 17:
            _context.next = 23;
            break;
          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](5);
            // timeout etc.
            error = _context.t0;
            delay = backoffDelay(retries);
          case 23:
            retries++;
            if (!(retries > maxRetries)) {
              _context.next = 26;
              break;
            }
            return _context.abrupt("break", 30);
          case 26:
            _context.next = 28;
            return (0, _utils.sleep)(delay);
          case 28:
            _context.next = 4;
            break;
          case 30:
            if (!error) {
              _context.next = 32;
              break;
            }
            throw error;
          case 32:
            return _context.abrupt("return", response);
          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 19]]);
  }));
  return function fetchWithRetry(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.fetchWithRetry = fetchWithRetry;
//# sourceMappingURL=fetchWithRetry.js.map
