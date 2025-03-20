"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.some");
require("core-js/modules/es.array.splice");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogger = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _callLoggerTriggerTypes = require("../../enums/callLoggerTriggerTypes");
var _LoggerBase2 = require("../../lib/LoggerBase");
var _callLogHelpers = require("../../lib/callLogHelpers");
var _di = require("../../lib/di");
var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));
var _callLoggerHelper = require("./callLoggerHelper");
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_OPACITY = 20;
var CallLogger = (_dec = (0, _di.Module)({
  name: 'CallLogger',
  deps: ['Storage', 'CallHistory', 'CallMonitor', 'CallLoggerOptions', {
    dep: 'ActivityMatcher',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.transferredCallsList];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_LoggerBase) {
  _inherits(CallLogger, _LoggerBase);
  var _super = _createSuper(CallLogger);
  function CallLogger(deps) {
    var _this;
    _classCallCheck(this, CallLogger);
    _this = _super.call(this, deps, {
      enableCache: true,
      storageKey: 'CallLogger'
    });
    _this._customMatcherHooks = [];
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    _this._identityFunction = _callLoggerHelper.callIdentityFunction;
    _this._logFunction = _this._deps.callLoggerOptions.logFunction;
    _this._readyCheckFunction = _this._deps.callLoggerOptions.readyCheckFunction;
    _initializerDefineProperty(_this, "autoLog", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "logOnRinging", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "transferredCallsList", _descriptor3, _assertThisInitialized(_this));
    if (typeof _this._deps.callLoggerOptions.autoLog !== 'undefined') {
      _this.autoLog = _this._deps.callLoggerOptions.autoLog;
    }
    return _this;
  }
  _createClass(CallLogger, [{
    key: "_setLogOnRinging",
    value: function _setLogOnRinging(logOnRinging) {
      this.logOnRinging = !!logOnRinging;
    }
  }, {
    key: "_setAutoLog",
    value: function _setAutoLog(autoLog) {
      this.autoLog = !!autoLog;
    }
  }, {
    key: "_addTransferredCall",
    value: function _addTransferredCall(sessionId, transferredMiddleNumber) {
      this.transferredCallsList = [].concat(_toConsumableArray(this.transferredCallsList.slice(this.transferredCallsList.length >= DEFAULT_OPACITY ? 1 : 0, DEFAULT_OPACITY)), [_defineProperty({}, sessionId, {
        transferredMiddleNumber: transferredMiddleNumber
      })]);
    }
  }, {
    key: "log",
    value: function () {
      var _log = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var call, options;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                call = _ref2.call, options = _objectWithoutProperties(_ref2, ["call"]);
                return _context.abrupt("return", _get(_getPrototypeOf(CallLogger.prototype), "log", this).call(this, _objectSpread({
                  item: call
                }, options)));
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function log(_x) {
        return _log.apply(this, arguments);
      }
      return log;
    }()
  }, {
    key: "_ensureActive",
    value: function () {
      var _ensureActive2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var isActive;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = !this._deps.tabManager;
                if (_context2.t0) {
                  _context2.next = 5;
                  break;
                }
                _context2.next = 4;
                return this._deps.tabManager.checkIsMain();
              case 4:
                _context2.t0 = _context2.sent;
              case 5:
                isActive = _context2.t0;
                return _context2.abrupt("return", isActive);
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _ensureActive() {
        return _ensureActive2.apply(this, arguments);
      }
      return _ensureActive;
    }()
  }, {
    key: "_shouldLogNewCall",
    value: function () {
      var _shouldLogNewCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(call) {
        var isActive;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._ensureActive();
              case 2:
                isActive = _context3.sent;
                return _context3.abrupt("return", isActive && this.autoLog && (this.logOnRinging || !(0, _callLogHelpers.isRinging)(call)));
              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function _shouldLogNewCall(_x2) {
        return _shouldLogNewCall2.apply(this, arguments);
      }
      return _shouldLogNewCall;
    }()
  }, {
    key: "logCall",
    value: function () {
      var _logCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref3) {
        var call, contact, options, inbound, fromEntity, toEntity;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                call = _ref3.call, contact = _ref3.contact, options = _objectWithoutProperties(_ref3, ["call", "contact"]);
                inbound = (0, _callLogHelpers.isInbound)(call);
                fromEntity = inbound && contact || null;
                toEntity = !inbound && contact || null; // @ts-expect-error TS(2345): Argument of type 'Omit<LogCallOptions<T>, "call" |... Remove this comment to see the full error message
                _context4.next = 6;
                return this.log(_objectSpread(_objectSpread({}, options), {}, {
                  call: _objectSpread(_objectSpread({}, call), {}, {
                    duration: Object.prototype.hasOwnProperty.call(call, 'duration') ? call.duration :
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    Math.round((Date.now() - call.startTime) / 1000),
                    result: call.result || call.telephonyStatus
                  }),
                  fromEntity: fromEntity,
                  toEntity: toEntity
                }));
              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function logCall(_x3) {
        return _logCall.apply(this, arguments);
      }
      return logCall;
    }()
  }, {
    key: "_autoLogCall",
    value: function () {
      var _autoLogCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref4) {
        var call, fromEntity, toEntity, triggerType;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                call = _ref4.call, fromEntity = _ref4.fromEntity, toEntity = _ref4.toEntity, triggerType = _ref4.triggerType;
                if (this.ready) {
                  _context5.next = 3;
                  break;
                }
                return _context5.abrupt("return");
              case 3:
                _context5.next = 5;
                return this.log({
                  call: _objectSpread(_objectSpread({}, call), {}, {
                    // @ts-expect-error TS(2322): Type 'number | undefined' is not assignable to typ... Remove this comment to see the full error message
                    duration: Object.prototype.hasOwnProperty.call(call, 'duration') ? call.duration :
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    Math.round((Date.now() - call.startTime) / 1000),
                    result: call.result || call.telephonyStatus
                  }),
                  fromEntity: fromEntity,
                  toEntity: toEntity,
                  triggerType: triggerType
                });
              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function _autoLogCall(_x4) {
        return _autoLogCall2.apply(this, arguments);
      }
      return _autoLogCall;
    }()
  }, {
    key: "_activityMatcherCheck",
    value: function _activityMatcherCheck(sessionId) {
      return (
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        !this._deps.activityMatcher.dataMapping[sessionId] ||
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        !this._deps.activityMatcher.dataMapping[sessionId].length
      );
    }
  }, {
    key: "_customMatcherCheck",
    value: function _customMatcherCheck(sessionId) {
      if (!this._customMatcherHooks.length) {
        return true;
      }
      return this._customMatcherHooks.some(function (hook) {
        return hook(sessionId);
      });
    }
  }, {
    key: "addCustomMatcherHook",
    value: function addCustomMatcherHook(hook) {
      this._customMatcherHooks.push(hook);
    }
  }, {
    key: "_onNewCall",
    value: function () {
      var _onNewCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(call, triggerType) {
        var toNumberEntity, fromMatches, toMatches, fromEntity, toEntity;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._shouldLogNewCall(call);
              case 2:
                if (!_context6.sent) {
                  _context6.next = 20;
                  break;
                }
                _context6.next = 5;
                return this._deps.activityMatcher.triggerMatch();
              case 5:
                if (!(this._activityMatcherCheck(call.sessionId) && this._customMatcherCheck(call.sessionId))) {
                  _context6.next = 18;
                  break;
                }
                _context6.next = 8;
                return this._deps.contactMatcher.triggerMatch();
              case 8:
                toNumberEntity = call.toNumberEntity || '';
                fromMatches = call.from && call.from.phoneNumber &&
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                this._deps.contactMatcher.dataMapping[call.from.phoneNumber] || [];
                toMatches = call.to && call.to.phoneNumber &&
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                this._deps.contactMatcher.dataMapping[call.to.phoneNumber] || [];
                fromEntity = fromMatches && fromMatches.length === 1 && fromMatches[0] || null;
                toEntity = null;
                if (toMatches && toMatches.length === 1) {
                  /* eslint { "prefer-destructuring": 0 } */
                  toEntity = toMatches[0];
                } else if (toMatches && toMatches.length > 1 && toNumberEntity !== '') {
                  toEntity = toMatches.find(function (match) {
                    return toNumberEntity === match.id;
                  });
                }
                _context6.next = 16;
                return this._autoLogCall({
                  call: call,
                  // @ts-expect-error TS(2322): Type 'Entity | null' is not assignable to type 'En... Remove this comment to see the full error message
                  fromEntity: fromEntity,
                  // @ts-expect-error TS(2322): Type 'Entity | null | undefined' is not assignable... Remove this comment to see the full error message
                  toEntity: toEntity,
                  triggerType: triggerType
                });
              case 16:
                _context6.next = 20;
                break;
              case 18:
                _context6.next = 20;
                return this._autoLogCall({
                  call: call,
                  triggerType: triggerType
                });
              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function _onNewCall(_x5, _x6) {
        return _onNewCall2.apply(this, arguments);
      }
      return _onNewCall;
    }()
  }, {
    key: "_shouldLogUpdatedCall",
    value: function () {
      var _shouldLogUpdatedCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(call) {
        var isActive, activityMatches;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._ensureActive();
              case 2:
                isActive = _context7.sent;
                if (!(isActive && (this.logOnRinging || !(0, _callLogHelpers.isRinging)(call)))) {
                  _context7.next = 10;
                  break;
                }
                if (!this.autoLog) {
                  _context7.next = 6;
                  break;
                }
                return _context7.abrupt("return", true);
              case 6:
                _context7.next = 8;
                return this._deps.activityMatcher.triggerMatch();
              case 8:
                activityMatches =
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                this._deps.activityMatcher.dataMapping[call.sessionId] || [];
                return _context7.abrupt("return", activityMatches.length > 0);
              case 10:
                return _context7.abrupt("return", false);
              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function _shouldLogUpdatedCall(_x7) {
        return _shouldLogUpdatedCall2.apply(this, arguments);
      }
      return _shouldLogUpdatedCall;
    }()
  }, {
    key: "_onCallUpdated",
    value: function () {
      var _onCallUpdated2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(call, triggerType) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._shouldLogUpdatedCall(call);
              case 2:
                if (!_context8.sent) {
                  _context8.next = 5;
                  break;
                }
                _context8.next = 5;
                return this._autoLogCall({
                  call: call,
                  triggerType: triggerType
                });
              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function _onCallUpdated(_x8, _x9) {
        return _onCallUpdated2.apply(this, arguments);
      }
      return _onCallUpdated;
    }()
  }, {
    key: "_onCallAnswered",
    value: function () {
      var _onCallAnswered2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(call) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));
      function _onCallAnswered(_x10) {
        return _onCallAnswered2.apply(this, arguments);
      }
      return _onCallAnswered;
    }()
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _core.watch)(this, function () {
        return _this2._deps.callMonitor.calls;
      }, function (newCalls, oldCalls) {
        if (_this2.ready) {
          var _oldCalls;
          oldCalls = ((_oldCalls = oldCalls) === null || _oldCalls === void 0 ? void 0 : _oldCalls.slice()) || [];
          // @ts-expect-error TS(2345): Argument of type 'Call[]' is not assignable to par... Remove this comment to see the full error message
          (0, _callLogHelpers.removeDuplicateSelfCalls)(newCalls).forEach(function (call) {
            var oldCallIndex = oldCalls.findIndex(function (item) {
              return item.sessionId === call.sessionId;
            });
            if (oldCallIndex === -1) {
              // @ts-expect-error TS(2345): Argument of type 'ActiveCall' is not assignable to... Remove this comment to see the full error message
              _this2._onNewCall(call, _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
            } else {
              var oldCall = oldCalls[oldCallIndex];
              oldCalls.splice(oldCallIndex, 1);
              if (call.telephonyStatus !== oldCall.telephonyStatus) {
                _this2._onCallUpdated(_objectSpread(_objectSpread({}, call), {}, {
                  isTransferredCall:
                  // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
                  !!_this2.transferredCallsMap[call.sessionId],
                  transferredMiddleNumber: _this2.transferredCallsMap[
                  // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
                  call.sessionId] ?
                  // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
                  _this2.transferredCallsMap[call.sessionId].transferredMiddleNumber : null
                }), _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
                if (oldCall.telephonyStatus === 'Ringing' && call.telephonyStatus === 'CallConnected') {
                  _this2._onCallAnswered(call);
                }
              }
              if ((call.from && call.from.phoneNumber) !== (oldCall.from && oldCall.from.phoneNumber)) {
                var _oldCall$from;
                _this2._addTransferredCall(
                // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
                call.sessionId, (_oldCall$from = oldCall.from) === null || _oldCall$from === void 0 ? void 0 : _oldCall$from.phoneNumber);
                _this2._onCallUpdated(_objectSpread(_objectSpread({}, call), {}, {
                  isTransferredCall: true,
                  // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
                  transferredMiddleNumber: oldCall.from && oldCall.from.phoneNumber,
                  phoneNumberUpdated: true
                }), _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
              }
            }
          });
          oldCalls.forEach(function (call) {
            _this2._onCallUpdated(_objectSpread(_objectSpread({}, call), {}, {
              isTransferredCall: !!_this2.transferredCallsMap[call.sessionId],
              // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
              transferredMiddleNumber: _this2.transferredCallsMap[call.sessionId] ? _this2.transferredCallsMap[call.sessionId].transferredMiddleNumber : null
            }), _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
          });
        }
      });
      (0, _core.watch)(this, function () {
        return _this2._deps.callHistory.endedCalls;
      }, function (newCall, oldCalls) {
        if (_this2.ready) {
          var _oldCalls2;
          oldCalls = ((_oldCalls2 = oldCalls) === null || _oldCalls2 === void 0 ? void 0 : _oldCalls2.slice()) || [];
          var currentSessions = {};
          newCall.forEach(function (call) {
            currentSessions[call.sessionId] = true;
          });
          oldCalls.forEach(function (call) {
            if (!currentSessions[call.sessionId]) {
              // call log updated
              var callInfo = _this2._deps.callHistory.calls.find(function (item) {
                return item.sessionId === call.sessionId;
              });
              if (callInfo) {
                _this2._onCallUpdated(_objectSpread(_objectSpread({}, callInfo), {}, {
                  isTransferredCall:
                  // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
                  !!_this2.transferredCallsMap[callInfo.sessionId],
                  // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
                  transferredMiddleNumber: _this2.transferredCallsMap[call.sessionId] ? _this2.transferredCallsMap[call.sessionId].transferredMiddleNumber : null
                }), _callLoggerTriggerTypes.callLoggerTriggerTypes.callLogSync);
              }
            }
          });
        }
      });
    }
  }, {
    key: "setAutoLog",
    value: function () {
      var _setAutoLog2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(autoLog) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this.ready && autoLog !== this.autoLog) {
                  this._setAutoLog(autoLog);
                }
              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function setAutoLog(_x11) {
        return _setAutoLog2.apply(this, arguments);
      }
      return setAutoLog;
    }()
  }, {
    key: "setLogOnRinging",
    value: function () {
      var _setLogOnRinging2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(logOnRinging) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (this.ready && logOnRinging !== this.logOnRinging) {
                  this._setLogOnRinging(logOnRinging);
                }
              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function setLogOnRinging(_x12) {
        return _setLogOnRinging2.apply(this, arguments);
      }
      return setLogOnRinging;
    }()
  }, {
    key: "transferredCallsMap",
    get: function get() {
      return (0, _ramda.reduce)(function (mapping, matcher) {
        return _objectSpread(_objectSpread({}, mapping), matcher);
      }, {}, this.transferredCallsList);
    }
  }]);
  return CallLogger;
}(_LoggerBase2.LoggerBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "autoLog", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "logOnRinging", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "transferredCallsList", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setLogOnRinging", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLogOnRinging"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setAutoLog", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setAutoLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addTransferredCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addTransferredCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "log", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "log"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_shouldLogNewCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_shouldLogNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "logCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "logCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_autoLogCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_autoLogCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onNewCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_shouldLogUpdatedCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_shouldLogUpdatedCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCallUpdated", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCallUpdated"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCallAnswered", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCallAnswered"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoLog", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogOnRinging", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogOnRinging"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transferredCallsMap", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "transferredCallsMap"), _class2.prototype)), _class2)) || _class);
exports.CallLogger = CallLogger;
//# sourceMappingURL=CallLogger.js.map
