"use strict";

require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePresence = void 0;
require("regenerator-runtime/runtime");
var _juno = require("@ringcentral/juno");
var _react = require("react");
var _reactUse = require("react-use");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
  var mounted = (0, _reactUse.usePromise)();
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
                  _context.next = 7;
                  break;
                }
                _context.next = 3;
                return mounted(fetch(contact, true));
              case 3:
                result = _context.sent;
                setPresence(result);
                _context.next = 8;
                break;
              case 7:
                setPresence(null);
              case 8:
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
