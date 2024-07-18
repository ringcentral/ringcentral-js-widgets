"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallsOnholdUI = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _ActiveCallsUI2 = require("../ActiveCallsUI");
var _dec, _dec2, _class, _class2;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var CallsOnholdUI = (_dec = (0, _di.Module)({
  name: 'CallsOnholdUI',
  deps: ['RouterInteraction', {
    dep: 'CallsOnholdUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.callMonitor.calls, that.fromSessionId];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_ActiveCallsUI) {
  _inherits(CallsOnholdUI, _ActiveCallsUI);
  var _super = _createSuper(CallsOnholdUI);
  function CallsOnholdUI() {
    var _this;
    _classCallCheck(this, CallsOnholdUI);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.fromSessionId = void 0;
    return _this;
  }
  _createClass(CallsOnholdUI, [{
    key: "getUIProps",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function getUIProps(options) {
      this.fromSessionId = options.params.fromSessionId;
      return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(CallsOnholdUI.prototype), "getUIProps", this).call(this, options)), {}, {
        calls: this.calls
      });
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(options) {
      var _this2 = this;
      return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(CallsOnholdUI.prototype), "getUIFunctions", this).call(this, options)), {}, {
        onMerge: function () {
          var _onMerge = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sessionId) {
            var sessions, confId, confSessionId;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // to track user click merge
                    _this2._deps.callMonitor.callsOnHoldClickMergeTrack();
                    if (_this2._deps.conferenceCall) {
                      _context.next = 4;
                      break;
                    }
                    console.warn('[CallsOnholdUI] _deps.conferenceCall is mandatory for merging calls.');
                    return _context.abrupt("return");
                  case 4:
                    _context.next = 6;
                    return _this2._deps.conferenceCall.parseMergingSessions({
                      sessionId: sessionId,
                      sessionIdToMergeWith: options.params.fromSessionId
                    });
                  case 6:
                    sessions = _context.sent;
                    if (!(sessions === null || sessions === void 0 ? void 0 : sessions.session)) {
                      _context.next = 12;
                      break;
                    }
                    confId = _this2._deps.conferenceCall.conferences && Object.keys(_this2._deps.conferenceCall.conferences)[0];
                    if (confId) {
                      confSessionId = _this2._deps.conferenceCall.conferences[confId].sessionId;
                      _this2._deps.routerInteraction.push("/calls/active/".concat(confSessionId));
                    } else {
                      _this2._deps.routerInteraction.goBack();
                    }
                    _context.next = 12;
                    return _this2._deps.conferenceCall.mergeSessions({
                      session: sessions.session,
                      sessionToMergeWith: sessions.sessionToMergeWith
                    });
                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
          function onMerge(_x) {
            return _onMerge.apply(this, arguments);
          }
          return onMerge;
        }(),
        onBackButtonClick: function onBackButtonClick() {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          if (_this2._deps.webphone.sessions.length) {
            _this2._deps.routerInteraction.goBack();
            return;
          }
          _this2._deps.routerInteraction.go(-2);
        },
        onAdd: function onAdd() {
          // to track use click add button
          _this2._deps.callMonitor.callsOnHoldClickAddTrack();
          _this2._deps.routerInteraction.push("/conferenceCall/dialer/".concat(options.params.fromNumber, "/").concat(options.params.fromSessionId));
        },
        getAvatarUrl: options.getAvatarUrl,
        webphoneHangup: function () {
          var _webphoneHangup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sessionId) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    // track user click hangup on calls onhold page
                    _this2._deps.callMonitor.callsOnHoldClickHangupTrack();
                    return _context2.abrupt("return", _this2._deps.webphone && _this2._deps.webphone.hangup(sessionId));
                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));
          function webphoneHangup(_x2) {
            return _webphoneHangup.apply(this, arguments);
          }
          return webphoneHangup;
        }()
      });
    }
  }, {
    key: "calls",
    get: function get() {
      var _this3 = this;
      return (0, _ramda.filter)(function (call) {
        return (
          // @ts-expect-error TS(2769): No overload matches this call.
          call.webphoneSession &&
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          !_this3._deps.conferenceCall.isConferenceSession(call.webphoneSession.id) && call.webphoneSession.id !== _this3.fromSessionId
        );
      }, this._deps.callMonitor.calls);
    }
  }]);
  return CallsOnholdUI;
}(_ActiveCallsUI2.ActiveCallsUI), (_applyDecoratedDescriptor(_class2.prototype, "calls", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype)), _class2)) || _class);
exports.CallsOnholdUI = CallsOnholdUI;
//# sourceMappingURL=CallsOnholdUI.js.map
