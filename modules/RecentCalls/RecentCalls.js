"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.date.to-iso-string");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentCalls = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _phoneTypes = require("../../enums/phoneTypes");
var _background = _interopRequireDefault(require("../../lib/background"));
var _concurrentExecute = _interopRequireDefault(require("../../lib/concurrentExecute"));
var _di = require("../../lib/di");
var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));
var _RecentCallsHelper = require("./RecentCallsHelper");
var _callStatus = require("./callStatus");
var _dec, _class, _class2, _descriptor, _descriptor2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var RecentCalls = (_dec = (0, _di.Module)({
  name: 'RecentCalls',
  deps: ['Client', 'Auth', 'CallHistory', {
    dep: 'RecentCallsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(RecentCalls, _RcModuleV);
  var _super = _createSuper(RecentCalls);
  function RecentCalls(deps) {
    var _this;
    _classCallCheck(this, RecentCalls);
    _this = _super.call(this, {
      deps: deps
    });
    _initializerDefineProperty(_this, "calls", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "callStatus", _descriptor2, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(RecentCalls, [{
    key: "initLoad",
    value: function initLoad() {
      this.callStatus = _callStatus.callStatus.loading;
    }
  }, {
    key: "loadSuccess",
    value: function loadSuccess(_ref) {
      var contact = _ref.contact,
        calls = _ref.calls,
        sessionId = _ref.sessionId;
      this.callStatus = _callStatus.callStatus.loaded;
      var contactId = String(contact && contact.id);
      this.calls[sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId] = calls;
    }
  }, {
    key: "cleanUpCalls",
    value: function cleanUpCalls(_ref2) {
      var contact = _ref2.contact,
        _ref2$sessionId = _ref2.sessionId,
        sessionId = _ref2$sessionId === void 0 ? null : _ref2$sessionId;
      this.callStatus = _callStatus.callStatus.loaded;
      var contactId = String(contact && contact.id);
      var id = sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId;
      delete this.calls[id];
    }
  }, {
    key: "getCalls",
    value: function () {
      var _getCalls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
        var currentContact, _ref3$sessionId, sessionId, contactId, calls;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                currentContact = _ref3.currentContact, _ref3$sessionId = _ref3.sessionId, sessionId = _ref3$sessionId === void 0 ? null : _ref3$sessionId;
                if (currentContact) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return");
              case 3:
                contactId = String(currentContact && currentContact.id);
                if (!this.calls[sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId]) {
                  _context.next = 6;
                  break;
                }
                return _context.abrupt("return");
              case 6:
                this.initLoad();
                _context.next = 9;
                return this._getRecentCalls(currentContact, this._deps.callHistory.calls);
              case 9:
                calls = _context.sent;
                this.loadSuccess({
                  calls: calls,
                  contact: currentContact,
                  sessionId: sessionId
                });
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function getCalls(_x) {
        return _getCalls.apply(this, arguments);
      }
      return getCalls;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_get(_getPrototypeOf(RecentCalls.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(RecentCalls.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.auth.loggedIn);
    }
    /**
     * Searching for recent calls of specific contact.
     * @param {Object} currentContact Current contact
     * @param {Array} calls Calls in callHistory
     * @param {Number} daySpan Find calls within certain days
     * @param {Number} length Maximum length of recent calls
     * @return {Array}
     * @private
     */
  }, {
    key: "_getRecentCalls",
    value: function () {
      var _getRecentCalls2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(currentContact) {
        var calls,
          daySpan,
          length,
          dateFrom,
          recentCalls,
          _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                calls = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
                daySpan = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 60;
                length = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : 5;
                dateFrom = (0, _getDateFrom["default"])(daySpan);
                recentCalls = this._getLocalRecentCalls(currentContact, calls, dateFrom); // If we could not find enough recent calls,
                // we need to search for calls on server.
                if (!(recentCalls.length < length)) {
                  _context2.next = 9;
                  break;
                }
                _context2.next = 8;
                return this._fetchRemoteRecentCalls(currentContact, dateFrom.toISOString(), length);
              case 8:
                recentCalls = _context2.sent;
              case 9:
                recentCalls.sort(_RecentCallsHelper.sortByTime);
                recentCalls = (0, _RecentCallsHelper.dedup)(recentCalls);
                return _context2.abrupt("return", recentCalls.length > length ? recentCalls.slice(0, length) : recentCalls);
              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _getRecentCalls(_x2) {
        return _getRecentCalls2.apply(this, arguments);
      }
      return _getRecentCalls;
    }()
  }, {
    key: "_getLocalRecentCalls",
    value: function _getLocalRecentCalls(_ref4, calls, dateFrom) {
      var phoneNumbers = _ref4.phoneNumbers;
      // Get all calls related to this contact
      return calls.reduce(function (acc, call) {
        if (call && call.to && call.from) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          var matches = phoneNumbers.find((0, _RecentCallsHelper.filterPhoneNumber)(call));

          // Check if calls is within certain days
          // @ts-expect-error TS(2769): No overload matches this call.
          if (!!matches && new Date(call.startTime) > dateFrom) {
            return acc.concat(call);
          }
        }
        return acc;
      }, []);
    }
    /**
     * Fetch recent calls from server by given current contact.
     */
  }, {
    key: "_fetchRemoteRecentCalls",
    value: function _fetchRemoteRecentCalls(_ref5, dateFrom, length) {
      var _this2 = this;
      var phoneNumbers = _ref5.phoneNumbers;
      var params = {
        dateFrom: dateFrom,
        perPage: length,
        type: 'Voice'
      };

      // CallLog API doesn't support plus sign in phoneNumber
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      var recentCallsPromises = phoneNumbers.reduce(function (acc, _ref6) {
        var phoneType = _ref6.phoneType,
          phoneNumber = _ref6.phoneNumber;
        phoneNumber = phoneNumber.replace('+', '');
        if (phoneType === _phoneTypes.phoneTypes.extension) {
          var _promise = _this2._fetchCallLogList(_objectSpread(_objectSpread({}, params), {}, {
            extensionNumber: phoneNumber
          }));
          return acc.concat(_promise);
        }
        var promise = _this2._fetchCallLogList(_objectSpread(_objectSpread({}, params), {}, {
          phoneNumber: phoneNumber
        }));
        return acc.concat(promise);
      }, []);
      return (0, _concurrentExecute["default"])(recentCallsPromises, 5, {
        delay: 500
      }).then(_RecentCallsHelper.flattenToRecords);
    }
  }, {
    key: "_fetchCallLogList",
    value: function _fetchCallLogList(params) {
      var _this3 = this;
      return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (_this3._deps.auth.loggedIn) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return", {
                  records: []
                });
              case 2:
                return _context3.abrupt("return", _this3._deps.client.account().extension().callLog().list(params));
              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
    }
  }, {
    key: "isCallsLoaded",
    get: function get() {
      return this.callStatus === _callStatus.callStatus.loaded;
    }
  }]);
  return RecentCalls;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "calls", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "callStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "initLoad", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "initLoad"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "loadSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanUpCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanUpCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getCalls", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getCalls"), _class2.prototype)), _class2)) || _class);
exports.RecentCalls = RecentCalls;
//# sourceMappingURL=RecentCalls.js.map
