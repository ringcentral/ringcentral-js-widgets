"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtensionInfo = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _permissionsMessages = require("../../enums/permissionsMessages");
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _subscriptionHints = require("../../enums/subscriptionHints");
var _renameTurkey = require("../../helpers/renameTurkey");
var _di = require("../../lib/di");
var _DataFetcherV = require("../DataFetcherV2");
var _dec, _dec2, _dec3, _class, _class2;
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
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var extensionRegExp = /.*\/extension\/\d+$/;
var DEFAULT_COUNTRY = {
  id: '1',
  isoCode: 'US',
  callingCode: '1'
};
var ExtensionInfo = (_dec = (0, _di.Module)({
  name: 'ExtensionInfo',
  deps: ['Auth', 'Client', 'DataFetcherV2', 'ExtensionFeatures', {
    dep: 'Subscription',
    optional: true
  }, 'Alert', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'ExtensionInfoOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var info = _ref2.info;
  return [info];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(ExtensionInfo, _DataFetcherV2Consume);
  var _super = _createSuper(ExtensionInfo);
  function ExtensionInfo(deps) {
    var _this$_deps$extension, _this$_deps$subscript;
    var _this;
    _classCallCheck(this, ExtensionInfo);
    _this = _super.call(this, {
      deps: deps
    });
    // @ts-expect-error TS(2564): Property '_stopWatching' has no initializer and is... Remove this comment to see the full error message
    _this._stopWatching = void 0;
    var extensionInfoOptions = (_this$_deps$extension = _this._deps.extensionInfoOptions) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : {};
    var _extensionInfoOptions = extensionInfoOptions.polling,
      polling = _extensionInfoOptions === void 0 ? true : _extensionInfoOptions;
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, extensionInfoOptions), {}, {
      key: 'extensionInfo',
      polling: polling,
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var result, _error$response;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _this._deps.client.account().extension().get();
                case 3:
                  result = _context.sent;
                  return _context.abrupt("return", result);
                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);
                  if (!(((_error$response = _context.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 403)) {
                    _context.next = 14;
                    break;
                  }
                  _context.next = 12;
                  return _this._deps.auth.logout();
                case 12:
                  _this._deps.alert.danger({
                    message: _permissionsMessages.permissionsMessages.insufficientPrivilege,
                    ttl: 0
                  });
                  return _context.abrupt("return", {});
                case 14:
                  throw _context.t0;
                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 7]]);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return _this._deps.auth.loggedIn;
      }
    }));
    _this._deps.dataFetcherV2.register(_this._source);
    (_this$_deps$subscript = _this._deps.subscription) === null || _this$_deps$subscript === void 0 ? void 0 : _this$_deps$subscript.register(_assertThisInitialized(_this), {
      filters: [_subscriptionFilters.subscriptionFilters.extensionInfo]
    });
    return _this;
  }
  _createClass(ExtensionInfo, [{
    key: "_handleSubscription",
    value: function _handleSubscription(message) {
      var _this$_deps$tabManage, _this$_deps$tabManage2, _message$body, _message$body$hints, _message$body2, _message$body2$hints, _message$body3, _message$body3$hints, _message$body4, _message$body4$hints, _message$body5, _message$body5$hints;
      if (this.ready && (this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true)) && (message === null || message === void 0 ? void 0 : message.event) && extensionRegExp.test(message.event) && !(((_message$body = message.body) === null || _message$body === void 0 ? void 0 : (_message$body$hints = _message$body.hints) === null || _message$body$hints === void 0 ? void 0 : _message$body$hints.includes(_subscriptionHints.subscriptionHints.companyNumbers)) || ((_message$body2 = message.body) === null || _message$body2 === void 0 ? void 0 : (_message$body2$hints = _message$body2.hints) === null || _message$body2$hints === void 0 ? void 0 : _message$body2$hints.includes(_subscriptionHints.subscriptionHints.limits)) || ((_message$body3 = message.body) === null || _message$body3 === void 0 ? void 0 : (_message$body3$hints = _message$body3.hints) === null || _message$body3$hints === void 0 ? void 0 : _message$body3$hints.includes(_subscriptionHints.subscriptionHints.features)) || ((_message$body4 = message.body) === null || _message$body4 === void 0 ? void 0 : (_message$body4$hints = _message$body4.hints) === null || _message$body4$hints === void 0 ? void 0 : _message$body4$hints.includes(_subscriptionHints.subscriptionHints.permissions)) || ((_message$body5 = message.body) === null || _message$body5 === void 0 ? void 0 : (_message$body5$hints = _message$body5.hints) === null || _message$body5$hints === void 0 ? void 0 : _message$body5$hints.includes(_subscriptionHints.subscriptionHints.videoConfiguration)))) {
        this.fetchData();
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this2 = this;
      if (this._deps.subscription) {
        this._stopWatching = (0, _core.watch)(this, function () {
          return _this2._deps.subscription.message;
        }, function (message) {
          return _this2._handleSubscription(message);
        });
      }
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
    key: "info",
    get: function get() {
      var _this$data, _this$data$regionalSe, _this$data2;
      if ((_this$data = this.data) === null || _this$data === void 0 ? void 0 : (_this$data$regionalSe = _this$data.regionalSettings) === null || _this$data$regionalSe === void 0 ? void 0 : _this$data$regionalSe.homeCountry) {
        (0, _renameTurkey.renameTurkeyCountry)(this.data.regionalSettings.homeCountry);
      }
      return (_this$data2 = this.data) !== null && _this$data2 !== void 0 ? _this$data2 : {};
    }
  }, {
    key: "id",
    get: function get() {
      return this.info.id;
    }
  }, {
    key: "extensionNumber",
    get: function get() {
      return this.info.extensionNumber;
    }
  }, {
    key: "country",
    get: function get() {
      var _this$info$regionalSe;
      return ((_this$info$regionalSe = this.info.regionalSettings) === null || _this$info$regionalSe === void 0 ? void 0 : _this$info$regionalSe.homeCountry) || DEFAULT_COUNTRY;
    }
  }, {
    key: "departments",
    get: function get() {
      return this.info.departments;
    }
  }, {
    key: "isMultipleSiteEnabled",
    get: function get() {
      var _this$_deps$extension2, _this$_deps$extension3;
      return !!((_this$_deps$extension2 = (_this$_deps$extension3 = this._deps.extensionInfoOptions) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.isMultipleSiteEnabled) !== null && _this$_deps$extension2 !== void 0 ? _this$_deps$extension2 : false);
    }
  }, {
    key: "site",
    get: function get() {
      var _this$_deps$extension4, _this$_deps$extension5;
      if (!this.isMultipleSiteEnabled) {
        return null;
      }
      if (((_this$_deps$extension4 = this._deps.extensionFeatures.features) === null || _this$_deps$extension4 === void 0 ? void 0 : (_this$_deps$extension5 = _this$_deps$extension4.SiteCodes) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.available) && !this.info.site) {
        console.warn('site code enabled, but cannot retrieve site info');
      }
      return this.info.site || null;
    }
  }, {
    key: "isCallQueueMember",
    get: function get() {
      return !!this.departments && Array.isArray(this.departments) && this.departments.length > 0;
    }
  }, {
    key: "isoCode",
    get: function get() {
      var _this$info$regionalSe2, _this$info$regionalSe3;
      return (_this$info$regionalSe2 = this.info.regionalSettings) === null || _this$info$regionalSe2 === void 0 ? void 0 : (_this$info$regionalSe3 = _this$info$regionalSe2.homeCountry) === null || _this$info$regionalSe3 === void 0 ? void 0 : _this$info$regionalSe3.isoCode;
    }
  }]);
  return ExtensionInfo;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "info", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "info"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "site", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "site"), _class2.prototype)), _class2)) || _class);
exports.ExtensionInfo = ExtensionInfo;
//# sourceMappingURL=ExtensionInfo.js.map
