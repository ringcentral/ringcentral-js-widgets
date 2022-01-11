"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

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

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtensionFeatures = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _ramda = require("ramda");

var _core = require("@ringcentral-integration/core");

var _permissionsMessages = require("../../enums/permissionsMessages");

var _subscriptionFilters = require("../../enums/subscriptionFilters");

var _subscriptionHints = require("../../enums/subscriptionHints");

var _di = require("../../lib/di");

var _loginStatus = _interopRequireDefault(require("../Auth/loginStatus"));

var _DataFetcherV = require("../DataFetcherV2");

var _dec, _dec2, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var ExtensionFeatures = (_dec = (0, _di.Module)({
  name: 'ExtensionFeatures',
  deps: ['Auth', 'Alert', 'Client', 'DataFetcherV2', {
    dep: 'Subscription',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'ExtensionFeaturesOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(ExtensionFeatures, _DataFetcherV2Consume);

  var _super = _createSuper(ExtensionFeatures);

  function ExtensionFeatures(deps) {
    var _deps$extensionFeatur, _deps$extensionFeatur2;

    var _this;

    _classCallCheck(this, ExtensionFeatures);

    _this = _super.call(this, {
      deps: deps
    });
    _this._stopWatchingSubscription = null;

    _this._handleSubscription = function (message) {
      var _this$_deps$tabManage, _this$_deps$tabManage2, _message$body;

      if (_this.ready && (_this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = _this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true)) && (message === null || message === void 0 ? void 0 : (_message$body = message.body) === null || _message$body === void 0 ? void 0 : _message$body.hints) && (message.body.hints.includes(_subscriptionHints.subscriptionHints.limits) || message.body.hints.includes(_subscriptionHints.subscriptionHints.features) || message.body.hints.includes(_subscriptionHints.subscriptionHints.permissions))) {
        _this.fetchData();
      }
    };

    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({
      polling: (_deps$extensionFeatur = (_deps$extensionFeatur2 = deps.extensionFeaturesOptions) === null || _deps$extensionFeatur2 === void 0 ? void 0 : _deps$extensionFeatur2.polling) !== null && _deps$extensionFeatur !== void 0 ? _deps$extensionFeatur : true
    }, deps.extensionFeaturesOptions), {}, {
      key: 'extensionFeatures',
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var response, _response;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _this._deps.client.service.platform().get('/restapi/v1.0/account/~/extension/~/features');

                case 3:
                  response = _context.sent;
                  return _context.abrupt("return", response.json());

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);

                  if (!(((_response = _context.t0.response) === null || _response === void 0 ? void 0 : _response.status) === 403)) {
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
        var _this$_deps$subscript, _this$_deps$subscript2;

        return (_this$_deps$subscript = (_this$_deps$subscript2 = _this._deps.subscription) === null || _this$_deps$subscript2 === void 0 ? void 0 : _this$_deps$subscript2.ready) !== null && _this$_deps$subscript !== void 0 ? _this$_deps$subscript : true;
      }
    }));

    _this._deps.dataFetcherV2.register(_this._source);

    return _this;
  }

  _createClass(ExtensionFeatures, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      (0, _core.watch)(this, function () {
        var _this2$features, _this2$features$ReadE;

        return [_this2.ready, !!_this2.data, !!((_this2$features = _this2.features) === null || _this2$features === void 0 ? void 0 : (_this2$features$ReadE = _this2$features.ReadExtensionInfo) === null || _this2$features$ReadE === void 0 ? void 0 : _this2$features$ReadE.available), _this2._deps.auth.loginStatus === _loginStatus["default"].loggedIn];
      }, /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
          var _ref4, ready, hasData, readExtensionInfo, loggedIn;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _ref4 = _slicedToArray(_ref2, 4), ready = _ref4[0], hasData = _ref4[1], readExtensionInfo = _ref4[2], loggedIn = _ref4[3];

                  if (!(ready && loggedIn && !readExtensionInfo)) {
                    _context2.next = 5;
                    break;
                  }

                  _context2.next = 4;
                  return _this2._deps.auth.logout();

                case 4:
                  if (hasData) {
                    // only show alert if featuresList was successfully fetched,
                    // but the user has no ReadExtensionInfo feature
                    _this2._deps.alert.danger({
                      message: _permissionsMessages.permissionsMessages.insufficientPrivilege,
                      ttl: 0
                    });
                  }

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }(), {
        multiple: true
      });
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this3 = this;

      if (this._deps.subscription) {
        this._deps.subscription.subscribe([_subscriptionFilters.subscriptionFilters.extensionInfo]);

        this._stopWatchingSubscription = (0, _core.watch)(this, function () {
          return _this3._deps.subscription.message;
        }, this._handleSubscription);
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatchingSu;

      (_this$_stopWatchingSu = this._stopWatchingSubscription) === null || _this$_stopWatchingSu === void 0 ? void 0 : _this$_stopWatchingSu.call(this);
      this._stopWatchingSubscription = null;
    }
  }, {
    key: "features",
    get: function get() {
      var _this$data$records, _this$data;

      return (0, _ramda.reduce)(function (features, item) {
        features[item.id] = item;
        return features;
      }, {}, (_this$data$records = (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.records) !== null && _this$data$records !== void 0 ? _this$data$records : []);
    }
  }]);

  return ExtensionFeatures;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "features", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "features"), _class2.prototype)), _class2)) || _class);
exports.ExtensionFeatures = ExtensionFeatures;
//# sourceMappingURL=ExtensionFeatures.js.map
