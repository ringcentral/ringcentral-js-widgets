"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var _renameTurkey = require("../../helpers/renameTurkey");
var _permissionsMessages = require("../../enums/permissionsMessages");
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _subscriptionHints = require("../../enums/subscriptionHints");
var _di = require("../../lib/di");
var _DataFetcherV = require("../DataFetcherV2");
var _dec, _dec2, _dec3, _class, _class2;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
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
    var _this$_deps$extension;
    var _this;
    _classCallCheck(this, ExtensionInfo);
    _this = _super.call(this, {
      deps: deps
    });
    // @ts-expect-error
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
    return _this;
  }
  _createClass(ExtensionInfo, [{
    key: "_handleSubscription",
    value: function _handleSubscription(message) {
      var _this$_deps$tabManage, _this$_deps$tabManage2, _message$body, _message$body$hints, _message$body2, _message$body2$hints, _message$body3, _message$body3$hints, _message$body4, _message$body4$hints, _message$body5, _message$body5$hints;
      if (this.ready && (this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true)) &&
      // @ts-expect-error
      extensionRegExp.test(message === null || message === void 0 ? void 0 : message.event) && !(((_message$body = message.body) === null || _message$body === void 0 ? void 0 : (_message$body$hints = _message$body.hints) === null || _message$body$hints === void 0 ? void 0 : _message$body$hints.includes(_subscriptionHints.subscriptionHints.companyNumbers)) || ((_message$body2 = message.body) === null || _message$body2 === void 0 ? void 0 : (_message$body2$hints = _message$body2.hints) === null || _message$body2$hints === void 0 ? void 0 : _message$body2$hints.includes(_subscriptionHints.subscriptionHints.limits)) || ((_message$body3 = message.body) === null || _message$body3 === void 0 ? void 0 : (_message$body3$hints = _message$body3.hints) === null || _message$body3$hints === void 0 ? void 0 : _message$body3$hints.includes(_subscriptionHints.subscriptionHints.features)) || ((_message$body4 = message.body) === null || _message$body4 === void 0 ? void 0 : (_message$body4$hints = _message$body4.hints) === null || _message$body4$hints === void 0 ? void 0 : _message$body4$hints.includes(_subscriptionHints.subscriptionHints.permissions)) || ((_message$body5 = message.body) === null || _message$body5 === void 0 ? void 0 : (_message$body5$hints = _message$body5.hints) === null || _message$body5$hints === void 0 ? void 0 : _message$body5$hints.includes(_subscriptionHints.subscriptionHints.videoConfiguration)))) {
        this.fetchData();
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this2 = this;
      if (this._deps.subscription) {
        this._deps.subscription.subscribe([_subscriptionFilters.subscriptionFilters.extensionInfo]);
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
      // @ts-expect-error
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
