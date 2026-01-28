"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
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
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanyContacts = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
var _extensionStatusTypes = require("@ringcentral-integration/commons/enums/extensionStatusTypes");
var _extensionTypes = require("@ringcentral-integration/commons/enums/extensionTypes");
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
var _subscriptionFilters = require("@ringcentral-integration/commons/enums/subscriptionFilters");
var _fetchList = _interopRequireDefault(require("@ringcentral-integration/commons/lib/fetchList"));
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ramda = require("ramda");
var _excluded = ["eventType", "oldEtag", "newEtag"];
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
/**
 * TODO:
 * 1. Consider moving the filters to some UI module for display contact list
 * 2. Find out whether there are other types should be searchable/matchable, but hidden in contact lists
 * 3. Find out whether isAvailableExtension can be better defined in our business logic layer
 * 4. Standardize and remove the IVR contacts special treatments
 */

var contactsRegExp = /.*\/directory\/contacts$/;
var DEFAULT_TTL = 24 * 60 * 60 * 1000;
var DEFAULT_SELECTED_TYPES = [_extensionTypes.extensionTypes.digitalUser, _extensionTypes.extensionTypes.user, _extensionTypes.extensionTypes.department
// extensionTypes.limited,
// extensionTypes.announcement,
// extensionTypes.applicationExtension,
// extensionTypes.bot,
// extensionTypes.faxUser,
// extensionTypes.ivrMenu,
// extensionTypes.pagingOnly,
// extensionTypes.parkLocation,
// extensionTypes.sharedLinesGroup,
];
var CompanyContacts = exports.CompanyContacts = (_dec = (0, _nextCore.injectable)({
  name: 'CompanyContacts'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('Subscription')(target, undefined, 4);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('TabManager')(target, undefined, 5);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('CompanyContactsOptions')(target, undefined, 6);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services.Client === "undefined" ? Object : _services.Client, typeof _services.ExtensionFeatures === "undefined" ? Object : _services.ExtensionFeatures, typeof _services.DataFetcher === "undefined" ? Object : _services.DataFetcher, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof Subscription === "undefined" ? Object : Subscription, Object, typeof CompanyContactsOptions === "undefined" ? Object : CompanyContactsOptions]), _dec7 = (0, _nextCore.delegate)('server'), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [Object]), _dec0 = Reflect.metadata("design:type", Boolean), _dec1 = Reflect.metadata("design:type", Boolean), _dec10 = Reflect.metadata("design:type", Array), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [Boolean]), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [Boolean]), _dec15 = (0, _nextCore.computed)(function (_ref) {
  var selectedTypes = _ref.selectedTypes,
    showDisabled = _ref.showDisabled,
    showNotActivated = _ref.showNotActivated;
  return [selectedTypes, showDisabled, showNotActivated];
}), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", []), _dec18 = (0, _nextCore.computed)(function (_ref2) {
  var data = _ref2.data,
    _extensionFilter = _ref2._extensionFilter;
  return [data, _extensionFilter];
}), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", []), _dec21 = (0, _nextCore.computed)(function (_ref3) {
  var data = _ref3.data;
  return [data];
}), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", []), _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", []), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_DataFetcherConsumer) {
  function CompanyContacts(_client, _extensionFeatures, _dataFetcher, _storage, _subscription, _tabManager, _companyContactsOptions) {
    var _this$_companyContact, _this$_companyContact2, _this$_companyContact3, _this$_subscription;
    var _this;
    _classCallCheck(this, CompanyContacts);
    _this = _callSuper(this, CompanyContacts, [_dataFetcher]);
    _this._client = _client;
    _this._extensionFeatures = _extensionFeatures;
    _this._dataFetcher = _dataFetcher;
    _this._storage = _storage;
    _this._subscription = _subscription;
    _this._tabManager = _tabManager;
    _this._companyContactsOptions = _companyContactsOptions;
    _this._stopWatching = null;
    _initializerDefineProperty(_this, "_showDisabled", _descriptor, _this);
    _initializerDefineProperty(_this, "_showNotActivated", _descriptor2, _this);
    _initializerDefineProperty(_this, "_selectedTypes", _descriptor3, _this);
    var disableCache = (_this$_companyContact = (_this$_companyContact2 = _this._companyContactsOptions) === null || _this$_companyContact2 === void 0 ? void 0 : _this$_companyContact2.disableCache) !== null && _this$_companyContact !== void 0 ? _this$_companyContact : false;
    if (!disableCache) {
      _this._storage.enable(_this);
    }
    var _ref4 = (_this$_companyContact3 = _this._companyContactsOptions) !== null && _this$_companyContact3 !== void 0 ? _this$_companyContact3 : {},
      _ref4$ttl = _ref4.ttl,
      ttl = _ref4$ttl === void 0 ? DEFAULT_TTL : _ref4$ttl,
      _ref4$polling = _ref4.polling,
      polling = _ref4$polling === void 0 ? true : _ref4$polling;
    _this._source = new _services.DataSource(_objectSpread(_objectSpread({}, _this._companyContactsOptions), {}, {
      key: 'companyContacts',
      polling: polling,
      ttl: ttl,
      cleanOnReset: true,
      fetchFunction: function fetchFunction() {
        return _this._fetchData();
      },
      readyCheckFunction: function readyCheckFunction() {
        return _this.isFetchingReady;
      },
      permissionCheckFunction: function permissionCheckFunction() {
        var _this$_extensionFeatu, _this$_extensionFeatu2, _this$_extensionFeatu3;
        return (_this$_extensionFeatu = (_this$_extensionFeatu2 = _this._extensionFeatures.features) === null || _this$_extensionFeatu2 === void 0 ? void 0 : (_this$_extensionFeatu3 = _this$_extensionFeatu2.ReadExtensions) === null || _this$_extensionFeatu3 === void 0 ? void 0 : _this$_extensionFeatu3.available) !== null && _this$_extensionFeatu !== void 0 ? _this$_extensionFeatu : false;
      }
    }));
    _this._dataFetcher.register(_this._source);
    (_this$_subscription = _this._subscription) === null || _this$_subscription === void 0 ? void 0 : _this$_subscription.register(_this, {
      filters: [_subscriptionFilters.subscriptionFilters.companyContacts]
    });
    return _this;
  }
  _inherits(CompanyContacts, _DataFetcherConsumer);
  return _createClass(CompanyContacts, [{
    key: "isFetchingReady",
    get: function get() {
      return this._extensionFeatures.ready;
    }
  }, {
    key: "fetchContacts",
    value: function () {
      var _fetchContacts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(params) {
        var response, item;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!this.enableCompanyPublicApi) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return this._client.service.platform().get('/restapi/v1.0/account/~/directory/entries', params);
            case 1:
              response = _context.v;
              return _context.a(2, response.json());
            case 2:
              item = this._client.account().directory().contacts().list(params);
              return _context.a(2, item);
          }
        }, _callee, this);
      }));
      function fetchContacts(_x) {
        return _fetchContacts.apply(this, arguments);
      }
      return fetchContacts;
    }()
  }, {
    key: "_fetchData",
    value: function () {
      var _fetchData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _this2 = this;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              return _context2.a(2, (0, _fetchList["default"])(function (params) {
                return _this2.fetchContacts(params);
              }));
          }
        }, _callee2);
      }));
      function _fetchData() {
        return _fetchData2.apply(this, arguments);
      }
      return _fetchData;
    }() // To update the consistency for the data
    // When in coworker mode, the server process will send this WSG subscription message to coworker to update the status of CompanyContacts data
    // And then sync back to the CompanyContacts module state in the server process.
  }, {
    key: "_handleSubscription",
    value: function () {
      var _handleSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(message) {
        var _this$_tabManager$act, _this$_tabManager, _message$body;
        var _this$data, data;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (this.ready && (this._source.disableCache || ((_this$_tabManager$act = (_this$_tabManager = this._tabManager) === null || _this$_tabManager === void 0 ? void 0 : _this$_tabManager.active) !== null && _this$_tabManager$act !== void 0 ? _this$_tabManager$act : true)) && (message === null || message === void 0 ? void 0 : message.event) && contactsRegExp.test(message.event) && ((_message$body = message.body) === null || _message$body === void 0 ? void 0 : _message$body.contacts)) {
                data = (_this$data = this.data) !== null && _this$data !== void 0 ? _this$data : []; // eslint-disable-next-line @typescript-eslint/no-unused-vars
                (0, _ramda.forEach)(function (_ref5) {
                  var eventType = _ref5.eventType,
                    oldEtag = _ref5.oldEtag,
                    newEtag = _ref5.newEtag,
                    contact = _objectWithoutProperties(_ref5, _excluded);
                  if (eventType === 'Create' || eventType === 'Update') {
                    data = [].concat(_toConsumableArray((0, _ramda.reject)(function (item) {
                      return item.id === contact.id;
                    }, data)), [contact]);
                  } else if (eventType === 'Delete') {
                    data = _toConsumableArray((0, _ramda.reject)(function (item) {
                      return item.id === contact.id;
                    }, data));
                  }
                }, message.body.contacts);
                this._dataFetcher.updateData(this._source, data, Date.now());
              }
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _handleSubscription(_x2) {
        return _handleSubscription2.apply(this, arguments);
      }
      return _handleSubscription;
    }()
  }, {
    key: "onInit",
    value: function onInit() {
      var _this3 = this;
      if (this._subscription) {
        this._stopWatching = (0, _nextCore.watch)(this, function () {
          return _this3._subscription.message;
        }, function (message) {
          return _this3._handleSubscription(message);
        });
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatching;
      (_this$_stopWatching = this._stopWatching) === null || _this$_stopWatching === void 0 ? void 0 : _this$_stopWatching.call(this);
      this._stopWatching = null;
    }
  }, {
    key: "enableCompanyPublicApi",
    get: function get() {
      var _this$_companyContact4;
      return !!((_this$_companyContact4 = this._companyContactsOptions) === null || _this$_companyContact4 === void 0 ? void 0 : _this$_companyContact4.enableCompanyPublicApi);
    }
  }, {
    key: "extensionTypes",
    get: function get() {
      return _extensionTypes.extensionTypes;
    }
  }, {
    key: "setShowDisabled",
    value: function setShowDisabled(showDisabled) {
      this._showDisabled = showDisabled;
    }
  }, {
    key: "setShowNotActivated",
    value: function setShowNotActivated(showNotActivated) {
      this._showNotActivated = showNotActivated;
    }
  }, {
    key: "showDisabled",
    get: function get() {
      // TODO: check the default value in spring-ui of showDisabled
      return false;
    }
  }, {
    key: "showNotActivated",
    get: function get() {
      // TODO: check the default value in spring-ui of showDisabled
      return process.env.THEME_SYSTEM === 'spring-ui';
    }
  }, {
    key: "selectedTypes",
    get: function get() {
      return DEFAULT_SELECTED_TYPES;
    }
  }, {
    key: "_extensionFilter",
    get: function get() {
      var _this4 = this;
      var typeFilter = (0, _ramda.reduce)(function (acc, type) {
        acc[type] = true;
        return acc;
      }, {}, this.selectedTypes);
      return (0, _ramda.filter)(function (item) {
        return !(!_this4.showDisabled && item.status === _extensionStatusTypes.extensionStatusTypes.disabled || !_this4.showNotActivated && item.status === _extensionStatusTypes.extensionStatusTypes.notActivated || !typeFilter[item.type]);
      });
    }
  }, {
    key: "filteredContacts",
    get: function get() {
      var _this$data2;
      return this._extensionFilter((_this$data2 = this.data) !== null && _this$data2 !== void 0 ? _this$data2 : []);
    }
  }, {
    key: "ivrContacts",
    get: function get() {
      var _this$data3;
      var ivrContacts = (0, _ramda.filter)(function (item) {
        return item.type === _extensionTypes.extensionTypes.ivrMenu;
      }, (_this$data3 = this.data) !== null && _this$data3 !== void 0 ? _this$data3 : []);
      return (0, _ramda.map)(function (item) {
        var _item$phoneNumbers;
        return _objectSpread(_objectSpread({}, item), {}, {
          phoneNumbers: [].concat(_toConsumableArray((_item$phoneNumbers = item.phoneNumbers) !== null && _item$phoneNumbers !== void 0 ? _item$phoneNumbers : []), [{
            phonetype: _phoneTypes.phoneTypes.extension,
            phoneNumber: item.extensionNumber
          }])
        });
      }, ivrContacts);
    }
  }, {
    key: "allContacts",
    get: function get() {
      return this.filteredContacts.concat(this.ivrContacts);
    }

    // TODO: should from source be the map data will be better, because we already have loop data at data process.
  }, {
    key: "allContactsMap",
    get: function get() {
      return this.allContacts.reduce(function (acc, contact) {
        acc[contact.id] = contact;
        return acc;
      }, {});
    }
  }, {
    key: "isAvailableExtension",
    value: function isAvailableExtension(extensionNumber) {
      return !!(0, _ramda.find)(function (item) {
        return item.extensionNumber === extensionNumber;
      }, this.allContacts);
    }
  }]);
}(_services.DataFetcherConsumer), _applyDecoratedDescriptor(_class2.prototype, "_handleSubscription", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "_handleSubscription"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_showDisabled", [_nextCore.storage, _nextCore.state, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_showNotActivated", [_nextCore.storage, _nextCore.state, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_selectedTypes", [_nextCore.storage, _nextCore.state, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setShowDisabled", [_nextCore.action, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "setShowDisabled"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setShowNotActivated", [_nextCore.action, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "setShowNotActivated"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_extensionFilter", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "_extensionFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filteredContacts", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "filteredContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ivrContacts", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "ivrContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allContacts", [_nextCore.computed, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "allContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allContactsMap", [_nextCore.computed, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "allContactsMap"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CompanyContacts.js.map
