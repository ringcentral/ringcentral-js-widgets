"use strict";

require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePresence = void 0;
require("regenerator-runtime/runtime");
var _juno = require("@ringcentral/juno");
var _react = require("react");
var _usePromise = _interopRequireDefault(require("./usePromise"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * get presence state from contact, and that will auto get data from that fetch callback
 * @param contact
 * @param fetch fetch presence
 * @param timeout -1 means not to use timeout
 * @returns
 */
var usePresence = function usePresence(contact, _ref) {
  var _contact$presence;
  var fetch = _ref.fetch,
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? -1 : _ref$timeout;
  var _useState = (0, _react.useState)((_contact$presence = contact === null || contact === void 0 ? void 0 : contact.presence) !== null && _contact$presence !== void 0 ? _contact$presence : null),
    _useState2 = _slicedToArray(_useState, 2),
    presence = _useState2[0],
    setPresence = _useState2[1];
  var mounted = (0, _usePromise["default"])();
  var _useSleep = (0, _juno.useSleep)(),
    sleep = _useSleep.sleep;
  (0, _react.useEffect)(function () {
    function fetchPresence() {
      return _fetchPresence.apply(this, arguments);
    }
    function _fetchPresence() {
      _fetchPresence = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(fetch && contact)) {
                  _context.next = 5;
                  break;
                }
                _context.next = 3;
                return mounted(fetch(contact, true));
              case 3:
                result = _context.sent;
                setPresence(result);
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _fetchPresence.apply(this, arguments);
    }
    if (timeout >= 0) {
      sleep(timeout).then(function () {
        fetchPresence();
      });
    } else {
      fetchPresence();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact, fetch]);
  return presence;
};
exports.usePresence = usePresence;
//# sourceMappingURL=usePresence.js.map
