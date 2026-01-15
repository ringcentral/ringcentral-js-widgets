"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentCalls = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.to-iso-string.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
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
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var RecentCalls = exports.RecentCalls = (_dec = (0, _di.Module)({
  name: 'RecentCalls',
  deps: ['Client', 'Auth', 'CallHistory', {
    dep: 'RecentCallsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function RecentCalls(deps) {
    var _this;
    _classCallCheck(this, RecentCalls);
    _this = _callSuper(this, RecentCalls, [{
      deps: deps
    }]);
    _initializerDefineProperty(_this, "calls", _descriptor, _this);
    _initializerDefineProperty(_this, "callStatus", _descriptor2, _this);
    return _this;
  }
  _inherits(RecentCalls, _RcModuleV);
  return _createClass(RecentCalls, [{
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
    key: "isCallsLoaded",
    get: function get() {
      return this.callStatus === _callStatus.callStatus.loaded;
    }
  }, {
    key: "getCalls",
    value: function () {
      var _getCalls = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref3) {
        var currentContact, _ref3$sessionId, sessionId, contactId, calls;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              currentContact = _ref3.currentContact, _ref3$sessionId = _ref3.sessionId, sessionId = _ref3$sessionId === void 0 ? null : _ref3$sessionId;
              if (currentContact) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              contactId = String(currentContact && currentContact.id);
              if (!this.calls[sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId]) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              this.initLoad();
              _context.n = 3;
              return this._getRecentCalls(currentContact, this._deps.callHistory.calls);
            case 3:
              calls = _context.v;
              this.loadSuccess({
                calls: calls,
                contact: currentContact,
                sessionId: sessionId
              });
            case 4:
              return _context.a(2);
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
      return !!(_superPropGet(RecentCalls, "_shouldInit", this, 3)([]) && this._deps.auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_superPropGet(RecentCalls, "_shouldReset", this, 3)([]) || this.ready && !this._deps.auth.loggedIn);
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
    value: (function () {
      var _getRecentCalls2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(currentContact) {
        var calls,
          daySpan,
          length,
          dateFrom,
          recentCalls,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              calls = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
              daySpan = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 60;
              length = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : 5;
              dateFrom = (0, _getDateFrom["default"])(daySpan);
              recentCalls = this._getLocalRecentCalls(currentContact, calls, dateFrom); // If we could not find enough recent calls,
              // we need to search for calls on server.
              if (!(recentCalls.length < length)) {
                _context2.n = 2;
                break;
              }
              _context2.n = 1;
              return this._fetchRemoteRecentCalls(currentContact, dateFrom.toISOString(), length);
            case 1:
              recentCalls = _context2.v;
            case 2:
              recentCalls.sort(_RecentCallsHelper.sortByTime);
              recentCalls = (0, _RecentCallsHelper.dedup)(recentCalls);
              return _context2.a(2, recentCalls.length > length ? recentCalls.slice(0, length) : recentCalls);
          }
        }, _callee2, this);
      }));
      function _getRecentCalls(_x2) {
        return _getRecentCalls2.apply(this, arguments);
      }
      return _getRecentCalls;
    }())
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
      return /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (_this3._deps.auth.loggedIn) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2, {
                records: []
              });
            case 1:
              return _context3.a(2, _this3._deps.client.account().extension().callLog().list(params));
          }
        }, _callee3);
      }));
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "calls", [_core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "initLoad", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "initLoad"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "loadSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanUpCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanUpCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getCalls", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getCalls"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=RecentCalls.js.map
