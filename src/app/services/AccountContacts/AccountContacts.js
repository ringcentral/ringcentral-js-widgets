"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PRESENCE_ENQUEUE_DELAY = exports.DEFAULT_PRESENCE_TTL = exports.AccountContactsSourceName = exports.AccountContacts = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.link.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.timers.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
var _phoneSources = require("@ringcentral-integration/commons/enums/phoneSources");
var _batchApiHelper = require("@ringcentral-integration/commons/lib/batchApiHelper");
var _contactHelper = require("@ringcentral-integration/commons/lib/contactHelper");
var _isBlank = require("@ringcentral-integration/commons/lib/isBlank");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ramda = require("ramda");
var _rxjs = require("rxjs");
var _CompanyContacts = require("../CompanyContacts");
var _AccountContactsViewableManager = require("./AccountContactsViewableManager");
var _helper = require("./helper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
// one second to ensure after ttl the presence can become expired
var PRESENCE_ENQUEUE_DELAY = exports.PRESENCE_ENQUEUE_DELAY = 1 * 1000; // 1 second
var MAXIMUM_BATCH_GET_PRESENCE = 30;
var DEFAULT_PRESENCE_TTL = exports.DEFAULT_PRESENCE_TTL =
// TODO: in spring-ui, the viewable presence refetch every 10s
process.env.THEME_SYSTEM === 'spring-ui' ? 10 * 1000 : 30 * 1000; // 30 seconds
var AccountContactsSourceName = exports.AccountContactsSourceName = 'company';
var PRESENCE_DATA_KEY = ['dndStatus', 'presenceStatus', 'telephonyStatus', 'userStatus', 'meetingStatus'];
var AccountContacts = exports.AccountContacts = (_dec = (0, _nextCore.injectable)({
  name: 'AccountContacts'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('AccountContactsOptions')(target, undefined, 7);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _CompanyContacts.CompanyContacts === "undefined" ? Object : _CompanyContacts.CompanyContacts, typeof AccountContactsOptions === "undefined" ? Object : AccountContactsOptions]), _dec5 = (0, _nextCore.dynamic)('Presence'), _dec6 = Reflect.metadata("design:type", typeof Presence === "undefined" ? Object : Presence), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [typeof Record === "undefined" ? Object : Record]), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", []), _dec12 = (0, _nextCore.delegate)('server'), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [String]), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", []), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", []), _dec19 = (0, _nextCore.computed)(function (that) {
  return [that._companyContacts.filteredContacts];
}), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", []), _dec22 = (0, _nextCore.computed)(function (that) {
  return [that.contacts];
}), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", []), _dec25 = Reflect.metadata("design:type", typeof ProfileImages === "undefined" ? Object : ProfileImages), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [String, String]), _dec28 = (0, _nextCore.delegate)('server'), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [typeof IContact === "undefined" ? Object : IContact]), _dec31 = (0, _nextCore.delegate)('server'), _dec32 = Reflect.metadata("design:type", Function), _dec33 = Reflect.metadata("design:paramtypes", [typeof IContact === "undefined" ? Object : IContact, void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function AccountContacts(_auth, _client, _portManager, _extensionInfo, _appFeatures, _accountInfo, _companyContacts, _accountContactsOptions) {
    var _this;
    _classCallCheck(this, AccountContacts);
    _this = _callSuper(this, AccountContacts);
    _this._auth = _auth;
    _this._client = _client;
    _this._portManager = _portManager;
    _this._extensionInfo = _extensionInfo;
    _this._appFeatures = _appFeatures;
    _this._accountInfo = _accountInfo;
    _this._companyContacts = _companyContacts;
    _this._accountContactsOptions = _accountContactsOptions;
    _initializerDefineProperty(_this, "_presence", _descriptor, _this);
    _this._viewableManager = new _AccountContactsViewableManager.AccountContactsViewableManager(_this._portManager, _this._extensionInfo, {
      onViewable: function onViewable(distinctMap) {
        return _this.handlePresenceUpdate(distinctMap);
      },
      presenceTtl: _this._presenceTtl
    });
    _initializerDefineProperty(_this, "_presenceMap", _descriptor2, _this);
    /**
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     * # All Code Below is Deprecated
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     */
    /**
     * @deprecated
     */
    _this._getPresenceContexts = new Map();
    /**
     * @deprecated
     */
    _this._enqueueTimeoutId = void 0;
    /**
     * @deprecated
     *
     * TODO: spring-ui will be removed after all projects switch to spring-ui, should use presenceMap redux state instead
     */
    _this.presences = {};
    /**
     * @deprecated
     */
    _initializerDefineProperty(_this, "profileImages", _descriptor3, _this);
    _this._auth.afterLogout$.pipe((0, _rxjs.tap)(function () {
      _this.clear();
    }), _nextCore.takeUntilAppDestroy).subscribe();
    return _this;
  }
  _inherits(AccountContacts, _RcModule);
  return _createClass(AccountContacts, [{
    key: "presenceMap",
    get: function get() {
      var _this$_presence;
      var data = (_this$_presence = this._presence) === null || _this$_presence === void 0 ? void 0 : _this$_presence.data;
      // own presence use the presence data from presence service
      if (this._extensionInfo.id && data) {
        return _objectSpread(_objectSpread({}, this._presenceMap), {}, _defineProperty({}, this._extensionInfo.id, (0, _ramda.pick)(PRESENCE_DATA_KEY, data)));
      }
      return this._presenceMap;
    }
  }, {
    key: "_updatePresenceMap",
    value: function _updatePresenceMap(data) {
      var _this2 = this;
      Object.entries(data).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        if (_this2._presenceMap[key]) {
          // for ensure patch the smallest data
          Object.assign(_this2._presenceMap[key], value);
        } else {
          _this2._presenceMap[key] = value;
        }
      });
    }
  }, {
    key: "updatePresence",
    value: function updatePresence(responseList) {
      var successList = [];
      var _presenceMap = {};
      responseList.forEach(function (response) {
        response.forEach(function (data) {
          if (data.errorCode) {
            // eslint-disable-next-line no-console
            console.warn(data);
          } else {
            var _ref3 = data.extension,
              id = _ref3.id;
            var presence = (0, _ramda.pick)(PRESENCE_DATA_KEY, data);
            var extensionId = id;
            _presenceMap[extensionId] = presence;
            successList.push(extensionId.toString());
          }
        });
      });
      this._updatePresenceMap(_presenceMap);
      return successList;
    }
  }, {
    key: "clear",
    value: function clear() {
      this._presenceMap = {};
      this._viewableManager.clear();
    }
  }, {
    key: "handlePresenceUpdate",
    value: function () {
      var _handlePresenceUpdate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(distinctMap) {
        var _this3 = this;
        var responseList, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return Promise.all(distinctMap.map(/*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref4) {
                  var _ref6, accountId, extensionIdList, ids, result;
                  return _regenerator().w(function (_context) {
                    while (1) switch (_context.n) {
                      case 0:
                        _ref6 = _slicedToArray(_ref4, 2), accountId = _ref6[0], extensionIdList = _ref6[1];
                        ids = extensionIdList.join(',');
                        _context.n = 1;
                        return _this3.batchGetApi("/restapi/v1.0/account/".concat(accountId, "/extension/").concat(ids, "/presence"));
                      case 1:
                        result = _context.v;
                        return _context.a(2, result);
                    }
                  }, _callee);
                }));
                return function (_x2) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 1:
              responseList = _context2.v;
              return _context2.a(2, this.updatePresence(responseList));
            case 2:
              _context2.p = 2;
              _t = _context2.v;
              _nextCore.logger.error('batchGetApi error', _t);
              return _context2.a(2, []);
          }
        }, _callee2, this, [[0, 2]]);
      }));
      function handlePresenceUpdate(_x) {
        return _handlePresenceUpdate.apply(this, arguments);
      }
      return handlePresenceUpdate;
    }()
  }, {
    key: "batchGetApi",
    value: function () {
      var _batchGetApi = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(url) {
        var result;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this._client.multipart.get(url, {
                batch: true
              });
            case 1:
              result = _context3.v;
              return _context3.a(2, result);
          }
        }, _callee3, this);
      }));
      function batchGetApi(_x3) {
        return _batchGetApi.apply(this, arguments);
      }
      return batchGetApi;
    }()
  }, {
    key: "getProfileImageSync",
    value: function getProfileImageSync(contact, size) {
      if (!contact.profileImage) return undefined;
      return this._auth.getProfileImageSync(contact.profileImage, size);
    }
  }, {
    key: "getPresenceSync",
    value: function getPresenceSync(contact) {
      var _contact$account, _this$presenceMap$ext;
      if (!contact || !contact.id || contact.type !== 'company') {
        return null;
      }
      var extensionId = contact.id;
      var accountId = (_contact$account = contact.account) === null || _contact$account === void 0 ? void 0 : _contact$account.id;
      if (!accountId || !extensionId) return null;
      this._viewableManager.link({
        accountId: accountId,
        extensionId: extensionId
      });
      return (_this$presenceMap$ext = this.presenceMap[extensionId]) !== null && _this$presenceMap$ext !== void 0 ? _this$presenceMap$ext : null;
    }
  }, {
    key: "unlinkPresence",
    value: function unlinkPresence(contact) {
      var _contact$account2;
      if (!contact || !contact.id || contact.type !== 'company') {
        return null;
      }
      var extensionId = contact.id;
      var accountId = (_contact$account2 = contact.account) === null || _contact$account2 === void 0 ? void 0 : _contact$account2.id;
      if (!accountId || !extensionId) return null;
      this._viewableManager.unlink({
        accountId: accountId,
        extensionId: extensionId
      });
    }

    // URL.revokeObjectURL
  }, {
    key: "onReset",
    value: function onReset() {
      this.presences = {};
      clearTimeout(this._enqueueTimeoutId);
      this._getPresenceContexts.clear();
    }
  }, {
    key: "_presenceTtl",
    get: function get() {
      var _this$_accountContact, _this$_accountContact2;
      return (_this$_accountContact = (_this$_accountContact2 = this._accountContactsOptions) === null || _this$_accountContact2 === void 0 ? void 0 : _this$_accountContact2.presenceTtl) !== null && _this$_accountContact !== void 0 ? _this$_accountContact : DEFAULT_PRESENCE_TTL;
    }
  }, {
    key: "isCDCEnabled",
    get: function get() {
      var _this$_appFeatures;
      // TODO: default to true when cdc feature is ready for production.
      return (_this$_appFeatures = this._appFeatures) === null || _this$_appFeatures === void 0 ? void 0 : _this$_appFeatures.isCDCEnabled;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._companyContacts.ready && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !this._companyContacts.ready && this.ready;
    }

    // interface of ContactSource
  }, {
    key: "findContact",
    value: function findContact(contactId) {
      return this.contacts.find(function (x) {
        return x.id === contactId;
      });
    }

    // interface of ContactSource
  }, {
    key: "filterContacts",
    value: function filterContacts(searchFilter) {
      return (0, _contactHelper.getFilterContacts)(this.contacts, searchFilter);
    }

    // interface of ContactSource
  }, {
    key: "searchForPhoneNumbers",
    value: function searchForPhoneNumbers(searchString) {
      var _this$_extensionInfo = this._extensionInfo,
        isMultipleSiteEnabled = _this$_extensionInfo.isMultipleSiteEnabled,
        site = _this$_extensionInfo.site;
      return (0, _contactHelper.getSearchForPhoneNumbers)({
        contacts: this.contacts,
        searchString: searchString,
        entityType: _phoneSources.phoneSources.rcContact,
        options: {
          isMultipleSiteEnabled: isMultipleSiteEnabled,
          siteCode: site === null || site === void 0 ? void 0 : site.code
        }
      });
    }

    // interface of ContactSource
  }, {
    key: "matchContactsByPhoneNumber",
    value: function matchContactsByPhoneNumber(phoneNumber) {
      var _this$_extensionInfo2 = this._extensionInfo,
        isMultipleSiteEnabled = _this$_extensionInfo2.isMultipleSiteEnabled,
        site = _this$_extensionInfo2.site;
      var contacts = [].concat(process.env.THEME_SYSTEM === 'spring-ui' ? this.contacts :
      // TODO: this is old logic(wrong), should be removed after we full migrate to spring-ui in all projects
      this.directoryContacts.all, this._companyContacts.ivrContacts);
      var shouldMatchExtension = (0, _contactHelper.isAnExtension)(phoneNumber, this._accountInfo.maxExtensionNumberLength);
      return (0, _contactHelper.getMatchContactsByPhoneNumber)({
        contacts: contacts,
        phoneNumber: phoneNumber,
        entityType: _phoneSources.phoneSources.rcContact,
        findPhoneNumber: (0, _contactHelper.getFindPhoneNumber)({
          phoneNumber: phoneNumber,
          shouldMatchExtension: shouldMatchExtension,
          options: {
            isMultipleSiteEnabled: isMultipleSiteEnabled,
            siteCode: site === null || site === void 0 ? void 0 : site.code,
            maxExtensionLength: this._accountInfo.maxExtensionNumberLength
          }
        })
      });
    }

    // interface of ContactSource
  }, {
    key: "sourceName",
    get: function get() {
      return AccountContactsSourceName;
    }

    // interface of ContactSource
  }, {
    key: "directoryContacts",
    get: function get() {
      var _this4 = this;
      return (0, _ramda.reduce)(function (result, item) {
        if (!(0, _isBlank.isBlank)(item.extensionNumber)) {
          var contact = (0, _helper.produceContact)({
            item: item,
            profileImages: _this4.profileImages,
            presences: _this4.presences,
            sourceName: _this4.sourceName
          });
          // TODO: fix type in DirectoryContacts
          result.all.push(contact);
          if (!contact.hidden) {
            var _contact$phoneNumbers;
            var cdcContact = _objectSpread(_objectSpread({}, contact), {}, {
              phoneNumbers: ((_contact$phoneNumbers = contact.phoneNumbers) !== null && _contact$phoneNumbers !== void 0 ? _contact$phoneNumbers : []).filter(function (number) {
                return !number.hidden;
              })
            });
            // TODO: fix type in DirectoryContacts
            result.cdc.push(cdcContact);
          }
        }
        return result;
      }, {
        all: [],
        cdc: []
      }, this._companyContacts.filteredContacts);
    }

    // interface of ContactSource
  }, {
    key: "contacts",
    get: function get() {
      return this.isCDCEnabled ? this.directoryContacts.cdc : this.directoryContacts.all;
    }

    // interface of ContactSource
  }, {
    key: "rawContacts",
    get: function get() {
      return this._companyContacts.filteredContacts;
    }
  }, {
    key: "rcCompanyMapping",
    get: function get() {
      var rcCompanyMapping = {};
      this.contacts.forEach(function (item) {
        rcCompanyMapping[item.id] = item;
      });
      return rcCompanyMapping;
    }

    // interface of ContactSource
  }, {
    key: "sourceReady",
    get: function get() {
      return this.ready;
    }
  }, {
    key: "setProfileImages",
    value:
    /**
     * @deprecated
     */
    function setProfileImages(id, url) {
      this.profileImages[id] = {
        url: url
      };
    }
    /**
     * @deprecated
     *
     * 1. presence should not store in redux, which will make the CTI rerender once it has some changes and dispatch some action
     * 2. make sure this.presences's changes is immutable
     * 3. If the Record feature is stable, then we should use the below implementation to make sure change is immutable
     * ```
     *  data = {
     *      ...data,
     *      [key]: this.presences[key]
     *  }
     * ```
     */
  }, {
    key: "batchFetchPresenceSuccess",
    value: function batchFetchPresenceSuccess(_ref7) {
      var _this5 = this;
      var _ref7$presenceMap = _ref7.presenceMap,
        presenceMap = _ref7$presenceMap === void 0 ? {} : _ref7$presenceMap,
        ttl = _ref7.ttl;
      var data = {};
      var isUpdated = false;
      // TODO: refactor without side effect.
      Object.keys(this.presences).forEach(function (key) {
        var isExpired = Date.now() - _this5.presences[key].timestamp >= ttl;
        if (!isExpired) {
          // new key: use new reference: immutable
          data[key] = _this5.presences[key];
        } else {
          isUpdated = true;
        }
      });
      Object.keys(presenceMap).forEach(function (key) {
        isUpdated = true;
        data[key] = {
          presence: presenceMap[key],
          timestamp: Date.now()
        };
      });
      // need to make sure this.presences is immutable
      this.presences = isUpdated ? data : this.presences;
    }

    /**
     * @deprecated should use sync way `getProfileImageSync` instead, always get url in sync way to avoid the blank image a moment
     *
     * TODO: spring-ui will be removed after all projects switch to spring-ui
     */
  }, {
    key: "getProfileImage",
    value: (function () {
      var _getProfileImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(contact) {
        var response, value, _t2, _t3;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              if (!(!contact || !contact.id || contact.type !== 'company' || !contact.hasProfileImage)) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2, null);
            case 1:
              _context4.p = 1;
              _context4.n = 2;
              return this._client.account(contact.account.id).extension(contact.id).profileImage('195x195').get();
            case 2:
              response = _context4.v;
              _t2 = URL;
              _context4.n = 3;
              return response.blob();
            case 3:
              value = _t2.createObjectURL.call(_t2, _context4.v);
              /**
               * due to we get the profile image with cache at top Contact service, we can set the profile image directly
               */
              this.setProfileImages(contact.id, value);
              return _context4.a(2, value);
            case 4:
              _context4.p = 4;
              _t3 = _context4.v;
              _nextCore.logger.error("[".concat(this.identifier, "] getProfileImage fail"), _t3, contact);
              return _context4.a(2, null);
          }
        }, _callee4, this, [[1, 4]]);
      }));
      function getProfileImage(_x4) {
        return _getProfileImage.apply(this, arguments);
      }
      return getProfileImage;
    }()
    /**
     * @deprecated
     */
    // interface of ContactSource
    )
  }, {
    key: "getPresence",
    value: function getPresence(contact) {
      var _this6 = this;
      var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return new Promise(function (resolve) {
        var _contact$account3;
        if (!contact || !contact.id || contact.type !== 'company') {
          resolve(null);
          return;
        }
        var extensionId = contact.id;
        if (useCache && _this6.presences[extensionId] && Date.now() - _this6.presences[extensionId].timestamp < _this6._presenceTtl) {
          var presence = _this6.presences[extensionId].presence;
          resolve(presence);
          return;
        }
        var accountId = (_contact$account3 = contact.account) === null || _contact$account3 === void 0 ? void 0 : _contact$account3.id;
        if (!accountId) {
          resolve(null);
          return;
        }
        var contextKey = "".concat(accountId, "-").concat(extensionId);
        var context = _this6._getPresenceContexts.get(contextKey);
        if (context) {
          context.callbacks.push(resolve);
        } else {
          _this6._getPresenceContexts.set(contextKey, {
            accountId: accountId,
            extensionId: extensionId,
            callbacks: [resolve]
          });
        }
        var startProcessing = function startProcessing() {
          var contexts = Array.from(_this6._getPresenceContexts.values());
          _this6._getPresenceContexts.clear();
          _this6._fetchPresences(contexts);
        };
        clearTimeout(_this6._enqueueTimeoutId);
        if (_this6._getPresenceContexts.size === MAXIMUM_BATCH_GET_PRESENCE) {
          startProcessing();
        } else {
          _this6._enqueueTimeoutId = setTimeout(startProcessing, PRESENCE_ENQUEUE_DELAY);
        }
      });
    }

    /**
     * @deprecated
     */
  }, {
    key: "_fetchPresences",
    value: (function () {
      var _fetchPresences2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(contexts) {
        var _this7 = this;
        var responses, presenceMap;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this._batchFetchPresences(contexts);
            case 1:
              responses = _context5.v;
              // response
              presenceMap = (0, _ramda.reduce)(function (acc, _ref8) {
                var extensionId = _ref8.extensionId;
                var response = responses[extensionId];
                if (response) {
                  var dndStatus = response.dndStatus,
                    presenceStatus = response.presenceStatus,
                    telephonyStatus = response.telephonyStatus,
                    userStatus = response.userStatus,
                    meetingStatus = response.meetingStatus;
                  acc[extensionId] = {
                    dndStatus: dndStatus,
                    presenceStatus: presenceStatus,
                    telephonyStatus: telephonyStatus,
                    userStatus: userStatus,
                    meetingStatus: meetingStatus
                  };
                } else if (_this7.presences[extensionId]) {
                  // Should keep the previous state when fail to fetch
                  acc[extensionId] = _this7.presences[extensionId].presence;
                }
                return acc;
              }, {}, contexts); // update state
              this.batchFetchPresenceSuccess({
                presenceMap: presenceMap,
                ttl: this._presenceTtl
              });
              // callback
              contexts.forEach(function (_ref9) {
                var extensionId = _ref9.extensionId,
                  callbacks = _ref9.callbacks;
                var presence = presenceMap[extensionId];
                var _iterator = _createForOfIteratorHelper(callbacks),
                  _step;
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var resolve = _step.value;
                    try {
                      resolve(presence);
                    } catch (ex) {
                      console.error(ex);
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              });
            case 2:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _fetchPresences(_x5) {
        return _fetchPresences2.apply(this, arguments);
      }
      return _fetchPresences;
    }()
    /**
     * @deprecated
     */
    )
  }, {
    key: "_batchFetchPresences",
    value: (function () {
      var _batchFetchPresences2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(contexts) {
        var _this8 = this;
        var presenceSet, accountExtensionMap, batchResponses, _t6;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              presenceSet = {};
              _context8.p = 1;
              accountExtensionMap = (0, _ramda.reduce)(function (acc, _ref0) {
                var _acc$accountId;
                var accountId = _ref0.accountId,
                  extensionId = _ref0.extensionId;
                var extensionIds = (_acc$accountId = acc[accountId]) !== null && _acc$accountId !== void 0 ? _acc$accountId : [];
                if (!extensionIds.includes(extensionId)) {
                  extensionIds.push(extensionId);
                }
                acc[accountId] = extensionIds;
                return acc;
              }, {}, contexts);
              _context8.n = 2;
              return Promise.all((0, _ramda.keys)(accountExtensionMap).map(/*#__PURE__*/function () {
                var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(accountId) {
                  var extensionIds, extensionId, _t4, _t5;
                  return _regenerator().w(function (_context7) {
                    while (1) switch (_context7.n) {
                      case 0:
                        if (!(accountExtensionMap[accountId].length > 1)) {
                          _context7.n = 2;
                          break;
                        }
                        extensionIds = (0, _ramda.join)(',', accountExtensionMap[accountId]); // extract json data now so the data appears in the same format
                        // as single requests
                        _t4 = Promise;
                        _context7.n = 1;
                        return (0, _batchApiHelper.batchGetApi)({
                          platform: _this8._client.service.platform(),
                          url: "/restapi/v1.0/account/".concat(accountId, "/extension/").concat(extensionIds, "/presence")
                        });
                      case 1:
                        return _context7.a(2, _t4.all.call(_t4, _context7.v.map(/*#__PURE__*/function () {
                          var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(resp) {
                            return _regenerator().w(function (_context6) {
                              while (1) switch (_context6.n) {
                                case 0:
                                  return _context6.a(2, resp.json());
                              }
                            }, _callee6);
                          }));
                          return function (_x8) {
                            return _ref10.apply(this, arguments);
                          };
                        }())));
                      case 2:
                        // wrap single request response data in array to keep the same
                        // format as batch requests
                        extensionId = accountExtensionMap[accountId][0];
                        _context7.n = 3;
                        return _this8._client.account(accountId).extension(extensionId).presence().get();
                      case 3:
                        _t5 = _context7.v;
                        return _context7.a(2, [_t5]);
                    }
                  }, _callee7);
                }));
                return function (_x7) {
                  return _ref1.apply(this, arguments);
                };
              }()));
            case 2:
              batchResponses = _context8.v;
              // treat all data as batch since the data is normalized
              batchResponses.forEach(function (batch) {
                return batch.forEach(function (data) {
                  if (data.errorCode) {
                    console.warn(data);
                    return;
                  }
                  var _data = data;
                  var _ref11 = _data.extension,
                    id = _ref11.id;
                  presenceSet[id] = _data;
                });
              });
              _context8.n = 4;
              break;
            case 3:
              _context8.p = 3;
              _t6 = _context8.v;
              console.error(_t6);
            case 4:
              return _context8.a(2, presenceSet);
          }
        }, _callee8, null, [[1, 3]]);
      }));
      function _batchFetchPresences(_x6) {
        return _batchFetchPresences2.apply(this, arguments);
      }
      return _batchFetchPresences;
    }())
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_presence", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "presenceMap", [_nextCore.computed, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "presenceMap"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_presenceMap", [_nextCore.state, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updatePresenceMap", [_nextCore.action, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "_updatePresenceMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clear", [_nextCore.action, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "clear"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "batchGetApi", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "batchGetApi"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onReset", [_nextCore.action, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "onReset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "directoryContacts", [_nextCore.computed, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "directoryContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rawContacts", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "rawContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rcCompanyMapping", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "rcCompanyMapping"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "profileImages", [_nextCore.state, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setProfileImages", [_nextCore.action, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "setProfileImages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getProfileImage", [_dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfileImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=AccountContacts.js.map
