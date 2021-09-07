"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountInfo = void 0;

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _AuthV = require("../AuthV2");

var _DataFetcherV = require("../DataFetcherV2");

var _permissionsMessages = require("../../enums/permissionsMessages");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

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
                if (!(this._deps.auth.loginStatus === _AuthV.loginStatus.loggedIn && this.ready && !this._checkPermission())) {
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
  }]);

  return AccountInfo;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "onInitSuccess", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "onInitSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "info", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "info"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "serviceInfo", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "serviceInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "servicePlan", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "servicePlan"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "billingPlan", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "billingPlan"), _class2.prototype)), _class2)) || _class);
exports.AccountInfo = AccountInfo;
//# sourceMappingURL=AccountInfo.js.map
