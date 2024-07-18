"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ringout = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _ringoutErrors = require("./ringoutErrors");
var _ringoutStatus = require("./ringoutStatus");
var _dec, _class, _class2, _descriptor;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_MONITOR_INTERVAL = 2500;
var DEFAULT_TIME_BETWEEN_CALLS = 10000;
var Ringout = (_dec = (0, _di.Module)({
  name: 'Ringout',
  deps: ['Auth', 'Client', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'RingoutOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Ringout, _RcModuleV);
  var _super = _createSuper(Ringout);
  function Ringout(deps) {
    var _this$_deps$ringoutOp, _this$_deps$ringoutOp2, _this$_deps$ringoutOp3, _this$_deps$ringoutOp4;
    var _this;
    _classCallCheck(this, Ringout);
    _this = _super.call(this, {
      deps: deps
    });
    _this._monitorInterval = void 0;
    _this._timeBetweenCalls = void 0;
    _initializerDefineProperty(_this, "ringoutStatus", _descriptor, _assertThisInitialized(_this));
    _this._monitorInterval = (_this$_deps$ringoutOp = (_this$_deps$ringoutOp2 = _this._deps.ringoutOptions) === null || _this$_deps$ringoutOp2 === void 0 ? void 0 : _this$_deps$ringoutOp2.monitorInterval) !== null && _this$_deps$ringoutOp !== void 0 ? _this$_deps$ringoutOp : DEFAULT_MONITOR_INTERVAL;
    _this._timeBetweenCalls = (_this$_deps$ringoutOp3 = (_this$_deps$ringoutOp4 = _this._deps.ringoutOptions) === null || _this$_deps$ringoutOp4 === void 0 ? void 0 : _this$_deps$ringoutOp4.timeBetweenCalls) !== null && _this$_deps$ringoutOp3 !== void 0 ? _this$_deps$ringoutOp3 : DEFAULT_TIME_BETWEEN_CALLS;
    return _this;
  }
  _createClass(Ringout, [{
    key: "setRingoutStatus",
    value: function setRingoutStatus(ringoutStatus) {
      this.ringoutStatus = ringoutStatus;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.auth.loggedIn && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !this._deps.auth.loggedIn && this.ready;
    }
  }, {
    key: "makeCall",
    value: function () {
      var _makeCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var fromNumber, toNumber, prompt, resp, _this$_deps$contactMa, startTime;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fromNumber = _ref.fromNumber, toNumber = _ref.toNumber, prompt = _ref.prompt;
                if (!this.ready) {
                  _context.next = 21;
                  break;
                }
                this.setRingoutStatus(_ringoutStatus.ringoutStatus.connecting);
                _context.prev = 3;
                _context.next = 6;
                return this._deps.client.account().extension().ringOut().post({
                  from: {
                    phoneNumber: fromNumber
                  },
                  to: {
                    phoneNumber: toNumber
                  },
                  playPrompt: prompt
                });
              case 6:
                resp = _context.sent;
                try {
                  (_this$_deps$contactMa = this._deps.contactMatcher) === null || _this$_deps$contactMa === void 0 ? void 0 : _this$_deps$contactMa.forceMatchBatchNumbers({
                    phoneNumbers: [fromNumber, toNumber]
                  });
                } catch (error) {
                  console.error('makeCall forceMatchBatchNumbers error', error);
                }
                startTime = Date.now();
                _context.next = 11;
                return this._monitorRingout(resp.id, startTime);
              case 11:
                this.setRingoutStatus(_ringoutStatus.ringoutStatus.idle);
                _context.next = 19;
                break;
              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](3);
                this.setRingoutStatus(_ringoutStatus.ringoutStatus.idle);
                if (!(_context.t0.message !== _ringoutErrors.ringoutErrors.pollingCancelled)) {
                  _context.next = 19;
                  break;
                }
                throw _context.t0;
              case 19:
                _context.next = 21;
                break;
              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 14]]);
      }));
      function makeCall(_x) {
        return _makeCall.apply(this, arguments);
      }
      return makeCall;
    }()
  }, {
    key: "_monitorRingout",
    value: function () {
      var _monitorRingout2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ringoutId, startTime) {
        var callerStatus;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._fetchRingoutStatus(ringoutId);
              case 2:
                callerStatus = _context2.sent;
              case 3:
                if (!(callerStatus === 'InProgress')) {
                  _context2.next = 13;
                  break;
                }
                if (!(Date.now() - startTime > this._timeBetweenCalls)) {
                  _context2.next = 6;
                  break;
                }
                throw new Error(_ringoutErrors.ringoutErrors.pollingCancelled);
              case 6:
                _context2.next = 8;
                return (0, _utils.sleep)(this._monitorInterval);
              case 8:
                _context2.next = 10;
                return this._fetchRingoutStatus(ringoutId);
              case 10:
                callerStatus = _context2.sent;
                _context2.next = 3;
                break;
              case 13:
                if (!(callerStatus !== 'Success' && callerStatus !== 'NoAnswer')) {
                  _context2.next = 15;
                  break;
                }
                throw new Error(_ringoutErrors.ringoutErrors.firstLegConnectFailed);
              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _monitorRingout(_x2, _x3) {
        return _monitorRingout2.apply(this, arguments);
      }
      return _monitorRingout;
    }()
  }, {
    key: "_fetchRingoutStatus",
    value: function () {
      var _fetchRingoutStatus2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ringoutId) {
        var callStatus, resp;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this._deps.client.account().extension().ringOut(ringoutId).get()["catch"](function (error) {
                  if (error && error.response && error.response.status === 404) {
                    callStatus = 'Success';
                  }
                });
              case 3:
                resp = _context3.sent;
                return _context3.abrupt("return", callStatus || resp.status.callerStatus);
              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                throw new Error(_ringoutErrors.ringoutErrors.pollingFailed);
              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));
      function _fetchRingoutStatus(_x4) {
        return _fetchRingoutStatus2.apply(this, arguments);
      }
      return _fetchRingoutStatus;
    }()
  }]);
  return Ringout;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ringoutStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _ringoutStatus.ringoutStatus.idle;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setRingoutStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setRingoutStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_monitorRingout", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_monitorRingout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchRingoutStatus", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchRingoutStatus"), _class2.prototype)), _class2)) || _class);
exports.Ringout = Ringout;
//# sourceMappingURL=Ringout.js.map
