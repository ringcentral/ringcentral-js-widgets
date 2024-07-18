"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.includes");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subBrands = exports.AccountInfo = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _permissionsMessages = require("../../enums/permissionsMessages");
var _di = require("../../lib/di");
var _Auth = require("../Auth");
var _DataFetcherV = require("../DataFetcherV2");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2;
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
var subBrands = ['3000.Zayo', '3000.NWNC', '2000.Optus', '3000.Brightspeed'];
exports.subBrands = subBrands;
var AccountInfo = (_dec = (0, _di.Module)({
  name: 'AccountInfo',
  deps: ['Auth', 'Client', 'Alert', 'ExtensionFeatures', 'DataFetcherV2', {
    dep: 'TierChecker',
    optional: true
  }, {
    dep: 'AccountInfoOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(function (that) {
  return function (analytics) {
    var _analytics$identify, _that$_deps$auth, _that$_deps$tierCheck;
    // @ts-expect-error TS(2339): Property 'identify' does not exist on type 'IAnaly... Remove this comment to see the full error message
    (_analytics$identify = analytics.identify) === null || _analytics$identify === void 0 ? void 0 : _analytics$identify.call(analytics, {
      userId: (_that$_deps$auth = that._deps.auth) === null || _that$_deps$auth === void 0 ? void 0 : _that$_deps$auth.ownerId,
      accountId: that.id,
      servicePlanId: that.servicePlan.id,
      edition: that.servicePlan.edition,
      CRMEnabled: (_that$_deps$tierCheck = that._deps.tierChecker) === null || _that$_deps$tierCheck === void 0 ? void 0 : _that$_deps$tierCheck.isCRMEnabled
    });
  };
}), _dec3 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec4 = (0, _core.computed)(function (_ref2) {
  var info = _ref2.info;
  return [info];
}), _dec5 = (0, _core.computed)(function (_ref3) {
  var serviceInfo = _ref3.serviceInfo;
  return [serviceInfo];
}), _dec6 = (0, _core.computed)(function (_ref4) {
  var serviceInfo = _ref4.serviceInfo;
  return [serviceInfo];
}), _dec7 = (0, _core.computed)(function (_ref5) {
  var serviceInfo = _ref5.serviceInfo;
  return [serviceInfo];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(AccountInfo, _DataFetcherV2Consume);
  var _super = _createSuper(AccountInfo);
  function AccountInfo(deps) {
    var _this;
    _classCallCheck(this, AccountInfo);
    _this = _super.call(this, {
      deps: deps
    });
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, deps.accountInfoOptions), {}, {
      key: 'accountInfo',
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this._deps.client.account().get();
                case 2:
                  return _context.abrupt("return", _context.sent);
                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return !!_this._deps.extensionFeatures.ready;
      },
      permissionCheckFunction: function permissionCheckFunction() {
        return _this._checkPermission();
      },
      cleanOnReset: true
    }));
    _this._deps.dataFetcherV2.register(_this._source);
    return _this;
  }
  _createClass(AccountInfo, [{
    key: "_checkPermission",
    value: function _checkPermission() {
      var _this$_deps$extension, _this$_deps$extension2;
      return !!((_this$_deps$extension = this._deps.extensionFeatures.features) === null || _this$_deps$extension === void 0 ? void 0 : (_this$_deps$extension2 = _this$_deps$extension.ReadCompanyInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : _this$_deps$extension2.available);
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this._deps.auth.loginStatus === _Auth.loginStatus.loggedIn && this.ready && !this._checkPermission())) {
                  _context2.next = 4;
                  break;
                }
                _context2.next = 3;
                return this._deps.auth.logout();
              case 3:
                this._deps.alert.danger({
                  message: _permissionsMessages.permissionsMessages.insufficientPrivilege,
                  ttl: 0
                });
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }
      return onStateChange;
    }()
  }, {
    key: "onInitSuccess",
    value: function onInitSuccess() {}
  }, {
    key: "isCRMEnabled",
    get: function get() {
      var _this$_deps$tierCheck;
      return (_this$_deps$tierCheck = this._deps.tierChecker) === null || _this$_deps$tierCheck === void 0 ? void 0 : _this$_deps$tierCheck.isCRMEnabled;
    }
  }, {
    key: "info",
    get: function get() {
      var _this$data;
      return (_this$data = this.data) !== null && _this$data !== void 0 ? _this$data : {};
    }
  }, {
    key: "serviceInfo",
    get: function get() {
      var _this$info$serviceInf;
      return (_this$info$serviceInf = this.info.serviceInfo) !== null && _this$info$serviceInf !== void 0 ? _this$info$serviceInf : {};
    }
  }, {
    key: "servicePlan",
    get: function get() {
      var _this$serviceInfo$ser;
      return (_this$serviceInfo$ser = this.serviceInfo.servicePlan) !== null && _this$serviceInfo$ser !== void 0 ? _this$serviceInfo$ser : {};
    }
  }, {
    key: "billingPlan",
    get: function get() {
      var _this$serviceInfo$bil;
      return (_this$serviceInfo$bil = this.serviceInfo.billingPlan) !== null && _this$serviceInfo$bil !== void 0 ? _this$serviceInfo$bil : {};
    }
  }, {
    key: "id",
    get: function get() {
      return this.info.id;
    }
  }, {
    key: "country",
    get: function get() {
      var _this$serviceInfo$bra;
      return (_this$serviceInfo$bra = this.serviceInfo.brand) === null || _this$serviceInfo$bra === void 0 ? void 0 : _this$serviceInfo$bra.homeCountry;
    }
  }, {
    key: "countryCode",
    get: function get() {
      var _this$country$isoCode, _this$country;
      return (_this$country$isoCode = (_this$country = this.country) === null || _this$country === void 0 ? void 0 : _this$country.isoCode) !== null && _this$country$isoCode !== void 0 ? _this$country$isoCode : 'US';
    }
  }, {
    key: "mainCompanyNumber",
    get: function get() {
      return this.info.mainNumber;
    }
  }, {
    key: "maxExtensionNumberLength",
    get: function get() {
      var _this$info$limits$max, _this$info$limits;
      return (_this$info$limits$max = (_this$info$limits = this.info.limits) === null || _this$info$limits === void 0 ? void 0 : _this$info$limits.maxExtensionNumberLength) !== null && _this$info$limits$max !== void 0 ? _this$info$limits$max : 6;
    }
  }, {
    key: "userBrandId",
    get: function get() {
      var _serviceInfo$uBrand, _serviceInfo$brand;
      var serviceInfo = this.serviceInfo;
      var uBrandId = (_serviceInfo$uBrand = serviceInfo.uBrand) === null || _serviceInfo$uBrand === void 0 ? void 0 : _serviceInfo$uBrand.id;
      var brandId = uBrandId && subBrands.includes(uBrandId) ? uBrandId : (_serviceInfo$brand = serviceInfo.brand) === null || _serviceInfo$brand === void 0 ? void 0 : _serviceInfo$brand.id;
      return brandId;
    }
  }]);
  return AccountInfo;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "onInitSuccess", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "onInitSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "info", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "info"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "serviceInfo", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "serviceInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "servicePlan", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "servicePlan"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "billingPlan", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "billingPlan"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "userBrandId", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "userBrandId"), _class2.prototype)), _class2)) || _class);
exports.AccountInfo = AccountInfo;
//# sourceMappingURL=AccountInfo.js.map
