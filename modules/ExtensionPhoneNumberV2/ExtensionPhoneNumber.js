"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

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

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.filter");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtensionPhoneNumber = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _core = require("@ringcentral-integration/core");

var _subscriptionFilters = require("../../enums/subscriptionFilters");

var _subscriptionHints = require("../../enums/subscriptionHints");

var _usageTypes = require("../../enums/usageTypes");

var _di = require("../../lib/di");

var _fetchList = _interopRequireDefault(require("../../lib/fetchList"));

var _DataFetcherV = require("../DataFetcherV2");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var ExtensionPhoneNumber = (_dec = (0, _di.Module)({
  name: 'ExtensionPhoneNumber',
  deps: ['Client', 'DataFetcherV2', 'ExtensionFeatures', 'Subscription', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'ExtensionPhoneNumberOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var numbers = _ref2.numbers;
  return [numbers];
}), _dec4 = (0, _core.computed)(function (_ref3) {
  var numbers = _ref3.numbers;
  return [numbers];
}), _dec5 = (0, _core.computed)(function (_ref4) {
  var numbers = _ref4.numbers;
  return [numbers];
}), _dec6 = (0, _core.computed)(function (_ref5) {
  var numbers = _ref5.numbers;
  return [numbers];
}), _dec7 = (0, _core.computed)(function (_ref6) {
  var numbers = _ref6.numbers;
  return [numbers];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(ExtensionPhoneNumber, _DataFetcherV2Consume);

  var _super = _createSuper(ExtensionPhoneNumber);

  function ExtensionPhoneNumber(deps) {
    var _this;

    _classCallCheck(this, ExtensionPhoneNumber);

    _this = _super.call(this, {
      deps: deps
    });
    _this._stopWatching = void 0;
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, deps.extensionPhoneNumberOptions), {}, {
      key: 'extensionPhoneNumber',
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", (0, _fetchList["default"])(function (params) {
                    return _this._deps.client.account().extension().phoneNumber().list(params);
                  }));

                case 1:
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
        return !!(_this._deps.extensionFeatures.ready && _this._deps.subscription.ready);
      },
      permissionCheckFunction: function permissionCheckFunction() {
        var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3;

        return (_this$_deps$extension = (_this$_deps$extension2 = _this._deps.extensionFeatures.features) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.ReadExtensionPhoneNumbers) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.available) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : false;
      }
    }));

    _this._deps.dataFetcherV2.register(_this._source);

    return _this;
  }

  _createClass(ExtensionPhoneNumber, [{
    key: "_handleSubscription",
    value: function _handleSubscription(message) {
      var _this$_deps$tabManage, _this$_deps$tabManage2, _message$body, _message$body$hints;

      if (this.ready && (this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true)) && (message === null || message === void 0 ? void 0 : (_message$body = message.body) === null || _message$body === void 0 ? void 0 : (_message$body$hints = _message$body.hints) === null || _message$body$hints === void 0 ? void 0 : _message$body$hints.includes(_subscriptionHints.subscriptionHints.companyNumbers))) {
        this.fetchData();
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this2 = this;

      this._deps.subscription.subscribe([_subscriptionFilters.subscriptionFilters.extensionInfo]);

      this._stopWatching = (0, _core.watch)(this, function () {
        return _this2._deps.subscription.message;
      }, function (newMessage) {
        return _this2._handleSubscription(newMessage);
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatching;

      (_this$_stopWatching = this._stopWatching) === null || _this$_stopWatching === void 0 ? void 0 : _this$_stopWatching.call(this);
      this._stopWatching = null;
    }
  }, {
    key: "numbers",
    get: function get() {
      var _this$data;

      return (_this$data = this.data) !== null && _this$data !== void 0 ? _this$data : [];
    }
  }, {
    key: "companyNumbers",
    get: function get() {
      return (0, _ramda.filter)(function (phoneNumber) {
        return phoneNumber.usageType === _usageTypes.usageTypes.CompanyNumber;
      }, this.numbers);
    }
  }, {
    key: "mainCompanyNumber",
    get: function get() {
      return (0, _ramda.find)(function (phoneNumber) {
        return phoneNumber.usageType === _usageTypes.usageTypes.MainCompanyNumber;
      }, this.numbers);
    }
  }, {
    key: "directNumbers",
    get: function get() {
      return (0, _ramda.filter)(function (phoneNumber) {
        return phoneNumber.usageType === _usageTypes.usageTypes.DirectNumber;
      }, this.numbers);
    }
  }, {
    key: "callerIdNumbers",
    get: function get() {
      return (0, _ramda.filter)(function (phoneNumber) {
        var _phoneNumber$features;

        return ((_phoneNumber$features = phoneNumber.features) === null || _phoneNumber$features === void 0 ? void 0 : _phoneNumber$features.indexOf('CallerId')) !== -1 || (phoneNumber.usageType === _usageTypes.usageTypes.ForwardedNumber || phoneNumber.usageType === _usageTypes.usageTypes.ForwardedCompanyNumber) && (phoneNumber.status === 'PortedIn' || phoneNumber.status === 'Normal');
      }, this.numbers);
    }
  }, {
    key: "smsSenderNumbers",
    get: function get() {
      return (0, _ramda.filter)(function (phoneNumber) {
        var _phoneNumber$features2;

        return ((_phoneNumber$features2 = phoneNumber.features) === null || _phoneNumber$features2 === void 0 ? void 0 : _phoneNumber$features2.indexOf('SmsSender')) !== -1;
      }, this.numbers);
    }
  }]);

  return ExtensionPhoneNumber;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "numbers", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "numbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "companyNumbers", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "companyNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mainCompanyNumber", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "mainCompanyNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "directNumbers", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "directNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callerIdNumbers", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "callerIdNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "smsSenderNumbers", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "smsSenderNumbers"), _class2.prototype)), _class2)) || _class);
exports.ExtensionPhoneNumber = ExtensionPhoneNumber;
//# sourceMappingURL=ExtensionPhoneNumber.js.map
