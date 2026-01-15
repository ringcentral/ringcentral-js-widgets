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
require("core-js/modules/es.array.reduce.js");
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
require("core-js/modules/es.object.to-string.js");
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
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _extensionStatusTypes = require("../../enums/extensionStatusTypes");
var _extensionTypes = require("../../enums/extensionTypes");
var _phoneTypes = require("../../enums/phoneTypes");
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _di = require("../../lib/di");
var _fetchList = _interopRequireDefault(require("../../lib/fetchList"));
var _DataFetcherV = require("../DataFetcherV2");
var _excluded = ["eventType", "oldEtag", "newEtag"];
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
/**
 * TODO:
 * 1. Consider moving the filters to some UI module for display contact list
 * 2. Find out whether there are other types should be searchable/matchable, but hidden in contact lists
 * 3. Find out whether isAvailableExtension can be better defined in our business logic layer
 * 4. Standardize and remove the IVR contacts special treatments
 */

var contactsRegExp = /.*\/directory\/contacts$/;
var DEFAULT_TTL = 24 * 60 * 60 * 1000;
var DEFAULT_SHOW_DISABLED = false;
var DEFAULT_SHOW_NOT_ACTIVATED = false;
var DEFAULT_ALLOW_SETTINGS = false;
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
var CompanyContacts = exports.CompanyContacts = (_dec = (0, _di.Module)({
  name: 'CompanyContacts',
  deps: ['Client', 'ExtensionFeatures', 'DataFetcherV2', 'Subscription', 'Storage', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'CompanyContactsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var selectedTypes = _ref.selectedTypes,
    showDisabled = _ref.showDisabled,
    showNotActivated = _ref.showNotActivated;
  return [selectedTypes, showDisabled, showNotActivated];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var data = _ref2.data,
    _extensionFilter = _ref2._extensionFilter;
  return [data, _extensionFilter];
}), _dec4 = (0, _core.computed)(function (_ref3) {
  var data = _ref3.data;
  return [data];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  function CompanyContacts(deps) {
    var _deps$companyContacts, _deps$companyContacts2, _deps$companyContacts3;
    var _this;
    _classCallCheck(this, CompanyContacts);
    _this = _callSuper(this, CompanyContacts, [{
      deps: deps,
      enableCache: !((_deps$companyContacts = (_deps$companyContacts2 = deps.companyContactsOptions) === null || _deps$companyContacts2 === void 0 ? void 0 : _deps$companyContacts2.disableCache) !== null && _deps$companyContacts !== void 0 ? _deps$companyContacts : false),
      storageKey: 'CompanyContacts'
    }]);
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
    _this._stopWatching = null;
    _initializerDefineProperty(_this, "_showDisabled", _descriptor, _this);
    _initializerDefineProperty(_this, "_showNotActivated", _descriptor2, _this);
    _initializerDefineProperty(_this, "companyContactsData", _descriptor3, _this);
    _initializerDefineProperty(_this, "_selectedTypes", _descriptor4, _this);
    var _ref4 = (_deps$companyContacts3 = deps.companyContactsOptions) !== null && _deps$companyContacts3 !== void 0 ? _deps$companyContacts3 : {},
      _ref4$ttl = _ref4.ttl,
      ttl = _ref4$ttl === void 0 ? DEFAULT_TTL : _ref4$ttl,
      _ref4$polling = _ref4.polling,
      polling = _ref4$polling === void 0 ? true : _ref4$polling;
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, deps.companyContactsOptions), {}, {
      key: 'companyContacts',
      polling: polling,
      ttl: ttl,
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return _this.fetchDataCore();
              case 1:
                return _context.a(2, []);
            }
          }, _callee);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return _this._deps.extensionFeatures.ready;
      },
      permissionCheckFunction: function permissionCheckFunction() {
        var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3;
        return (_this$_deps$extension = (_this$_deps$extension2 = _this._deps.extensionFeatures.features) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.ReadExtensions) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.available) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : false;
      }
    }));
    _this._deps.dataFetcherV2.register(_this._source);
    _this._deps.subscription.register(_this, {
      filters: [_subscriptionFilters.subscriptionFilters.companyContacts]
    });
    return _this;
  }
  _inherits(CompanyContacts, _DataFetcherV2Consume);
  return _createClass(CompanyContacts, [{
    key: "fetchContacts",
    value: function () {
      var _fetchContacts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(params) {
        var response, item;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!this.enableCompanyPublicApi) {
                _context2.n = 2;
                break;
              }
              _context2.n = 1;
              return this._deps.client.service.platform().get('/restapi/v1.0/account/~/directory/entries', params);
            case 1:
              response = _context2.v;
              return _context2.a(2, response.json());
            case 2:
              item = this._deps.client.account().directory().contacts().list(params);
              return _context2.a(2, item);
          }
        }, _callee2, this);
      }));
      function fetchContacts(_x) {
        return _fetchContacts.apply(this, arguments);
      }
      return fetchContacts;
    }()
  }, {
    key: "fetchDataCore",
    value: function () {
      var _fetchDataCore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _this2 = this;
        var data;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return (0, _fetchList["default"])(function (params) {
                return _this2.fetchContacts(params);
              });
            case 1:
              data = _context3.v;
              // @ts-expect-error TS(2345): Argument of type 'unknown[]' is not assignable to ... Remove this comment to see the full error message
              this.setCompanyContactsData(data);
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function fetchDataCore() {
        return _fetchDataCore.apply(this, arguments);
      }
      return fetchDataCore;
    }() // company directory events is missing in official swagger spec
  }, {
    key: "_handleSubscription",
    value: function _handleSubscription(message) {
      var _this$_deps$tabManage, _this$_deps$tabManage2, _message$body;
      if (this.ready && (this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true)) && (message === null || message === void 0 ? void 0 : message.event) && contactsRegExp.test(message.event) && ((_message$body = message.body) === null || _message$body === void 0 ? void 0 : _message$body.contacts)) {
        var _this$data;
        var data = (_this$data = this.data) !== null && _this$data !== void 0 ? _this$data : [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        this._deps.dataFetcherV2.updateData(this._source, data, Date.now());
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this3 = this;
      // for compatibility with old version cache
      var data = this._deps.dataFetcherV2.getData(this._source);
      if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
        this._deps.dataFetcherV2.updateData(this._source, [], Date.now());
        this.setCompanyContactsData(data);
      }
      this._stopWatching = (0, _core.watch)(this, function () {
        return _this3._deps.subscription.message;
      }, function (message) {
        return _this3._handleSubscription(message);
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatching;
      (_this$_stopWatching = this._stopWatching) === null || _this$_stopWatching === void 0 ? void 0 : _this$_stopWatching.call(this);
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
      this._stopWatching = null;
    }
  }, {
    key: "allowSettings",
    get: function get() {
      var _this$_deps$companyCo, _this$_deps$companyCo2;
      return (_this$_deps$companyCo = (_this$_deps$companyCo2 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo2 === void 0 ? void 0 : _this$_deps$companyCo2.allowSettings) !== null && _this$_deps$companyCo !== void 0 ? _this$_deps$companyCo : DEFAULT_ALLOW_SETTINGS;
    }
  }, {
    key: "enableCompanyPublicApi",
    get: function get() {
      var _this$_deps$companyCo3;
      return !!((_this$_deps$companyCo3 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo3 === void 0 ? void 0 : _this$_deps$companyCo3.enableCompanyPublicApi);
    }
  }, {
    key: "setCompanyContactsData",
    value: function setCompanyContactsData(data) {
      this.companyContactsData = data;
    }

    // just a workaround for the update performance issue
    // TODO: refactor with type
  }, {
    key: "data",
    get: function get() {
      return this.companyContactsData;
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
      var _ref6, _this$_showDisabled, _this$_deps$companyCo4, _this$_deps$companyCo5;
      return (_ref6 = this.allowSettings ? (_this$_showDisabled = this._showDisabled) !== null && _this$_showDisabled !== void 0 ? _this$_showDisabled : (_this$_deps$companyCo4 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo4 === void 0 ? void 0 : _this$_deps$companyCo4.showDisabled : (_this$_deps$companyCo5 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo5 === void 0 ? void 0 : _this$_deps$companyCo5.showDisabled) !== null && _ref6 !== void 0 ? _ref6 : DEFAULT_SHOW_DISABLED;
    }
  }, {
    key: "showNotActivated",
    get: function get() {
      var _ref7, _this$_showNotActivat, _this$_deps$companyCo6, _this$_deps$companyCo7;
      return (_ref7 = this.allowSettings ? (_this$_showNotActivat = this._showNotActivated) !== null && _this$_showNotActivat !== void 0 ? _this$_showNotActivat : (_this$_deps$companyCo6 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo6 === void 0 ? void 0 : _this$_deps$companyCo6.showNotActivated : (_this$_deps$companyCo7 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo7 === void 0 ? void 0 : _this$_deps$companyCo7.showNotActivated) !== null && _ref7 !== void 0 ? _ref7 : DEFAULT_SHOW_NOT_ACTIVATED;
    }
  }, {
    key: "selectedTypes",
    get: function get() {
      var _ref8, _this$_selectedTypes, _this$_deps$companyCo8, _this$_deps$companyCo9;
      return (_ref8 = this.allowSettings ? (_this$_selectedTypes = this._selectedTypes) !== null && _this$_selectedTypes !== void 0 ? _this$_selectedTypes : (_this$_deps$companyCo8 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo8 === void 0 ? void 0 : _this$_deps$companyCo8.selectedTypes : (_this$_deps$companyCo9 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo9 === void 0 ? void 0 : _this$_deps$companyCo9.selectedTypes) !== null && _ref8 !== void 0 ? _ref8 : DEFAULT_SELECTED_TYPES;
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
        return !(!_this4.showDisabled && item.status === _extensionStatusTypes.extensionStatusTypes.disabled || !_this4.showNotActivated && item.status === _extensionStatusTypes.extensionStatusTypes.notActivated ||
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        !typeFilter[item.type]);
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
    key: "isAvailableExtension",
    value: function isAvailableExtension(extensionNumber) {
      return !!(0, _ramda.find)(function (item) {
        return item.extensionNumber === extensionNumber;
      }, this.filteredContacts.concat(this.ivrContacts));
    }
  }]);
}(_DataFetcherV.DataFetcherV2Consumer), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_showDisabled", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_showNotActivated", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "companyContactsData", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setCompanyContactsData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCompanyContactsData"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_selectedTypes", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setShowDisabled", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setShowDisabled"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setShowNotActivated", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setShowNotActivated"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_extensionFilter", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_extensionFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filteredContacts", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "filteredContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ivrContacts", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "ivrContacts"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=CompanyContacts.js.map
