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
exports.DynamicConfig = exports.getRcvUriRegExp = exports.getRcmUriRegExp = void 0;

require("core-js/modules/es6.regexp.replace");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.regexp.constructor");

var _core = require("@ringcentral-integration/core");

var _ConfigData = _interopRequireDefault(require("./ConfigData.json"));

var _di = require("../../lib/di");

var _DataFetcherV = require("../DataFetcherV2");

var _fetchWithJsonp = require("../../lib/fetchWithJsonp");

var _dec, _dec2, _dec3, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var getRcmUriRegExp = function getRcmUriRegExp(regExpText) {
  return new RegExp("(https?):\\/\\/".concat(regExpText, "(\\/\\w+)?(\\/(\\d+))(\\?pwd=\\w+)?"), 'i');
};

exports.getRcmUriRegExp = getRcmUriRegExp;

var getRcvUriRegExp = function getRcvUriRegExp(regExpText) {
  return new RegExp("(https?):\\/\\/".concat(regExpText, "(\\/{1,2}\\w+)*(\\/{1,2}(\\d+))(\\?pw=\\w{32})?"), 'i');
};

exports.getRcvUriRegExp = getRcvUriRegExp;
var DEFAULT_CONFIG_URL = 'https://apps.ringcentral.com/integration/dynamic-config/ConfigData.js';
var DynamicConfig = (_dec = (0, _di.Module)({
  name: 'DynamicConfig',
  deps: ['Auth', 'Client', 'DataFetcherV2', {
    dep: 'DynamicConfigOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var _rcmUriRegExp = _ref._rcmUriRegExp;
  return [_rcmUriRegExp // data?.meetingUriReg.rcm,
  ];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var _rcvUriRegExp = _ref2._rcvUriRegExp,
      data = _ref2.data;
  return [_rcvUriRegExp, data === null || data === void 0 ? void 0 : data.meetingUriReg.rcv];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(DynamicConfig, _DataFetcherV2Consume);

  var _super = _createSuper(DynamicConfig);

  function DynamicConfig(deps) {
    var _this;

    _classCallCheck(this, DynamicConfig);

    _this = _super.call(this, {
      deps: deps
    });
    _this._rcmUriRegExp = _ConfigData["default"].meetingUriReg.rcm;
    _this._rcvUriRegExp = _ConfigData["default"].meetingUriReg.rcv;
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, deps.dynamicConfigOptions), {}, {
      key: 'dynamicConfig',
      readyCheckFunction: function readyCheckFunction() {
        return _this._deps.auth.loggedIn;
      },
      fetchFunction: function fetchFunction() {
        return (0, _fetchWithJsonp.fetchWithJsonp)(_this.configUrl);
      }
    }));

    _this._deps.dataFetcherV2.register(_this._source);

    return _this;
  }

  _createClass(DynamicConfig, [{
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.isDiscoveryApi) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this.updateDiscoveryConfig();

              case 3:
                _context.next = 5;
                return this.fetchData();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onInit() {
        return _onInit.apply(this, arguments);
      }

      return onInit;
    }()
  }, {
    key: "updateDiscoveryConfig",
    value: function () {
      var _updateDiscoveryConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this$_deps$client$se, data, _data$rcv$baseWebUri$, _data$rcv$baseWebUri;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.isDiscoveryApi) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 3;
                return (_this$_deps$client$se = this._deps.client.service.platform().discovery()) === null || _this$_deps$client$se === void 0 ? void 0 : _this$_deps$client$se.externalData();

              case 3:
                data = _context2.sent;

                if (data) {
                  // just use static regexp
                  // `data.rcm.sdkDomain` example: `ringcentral.zoom.us` -> `ringcentral\.zoom\.us`
                  // this._rcmUriRegExp =
                  //   data.rcm.sdkDomain?.replace(/\./g, '\\.') ?? this._rcmUriRegExp;
                  // `data.rcv.baseWebUri` example: `https://v.ringcentral.com` -> `v\.ringcentral\.com`
                  this._rcvUriRegExp = (_data$rcv$baseWebUri$ = (_data$rcv$baseWebUri = data.rcv.baseWebUri) === null || _data$rcv$baseWebUri === void 0 ? void 0 : _data$rcv$baseWebUri.replace(/^https?:\/\//, '').replace(/\./g, '\\.')) !== null && _data$rcv$baseWebUri$ !== void 0 ? _data$rcv$baseWebUri$ : this._rcvUriRegExp;
                } else {// handle discovery api  error in sdk
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateDiscoveryConfig() {
        return _updateDiscoveryConfig.apply(this, arguments);
      }

      return updateDiscoveryConfig;
    }()
  }, {
    key: "fetchConfig",
    value: function () {
      var _fetchConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.frequentUpdate) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                _context3.prev = 2;

                if (!this.isDiscoveryApi) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 6;
                return this.updateDiscoveryConfig();

              case 6:
                _context3.next = 8;
                return this.fetchData();

              case 8:
                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](2);
                console.warn("Failed to update meeting domain");

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 10]]);
      }));

      function fetchConfig() {
        return _fetchConfig.apply(this, arguments);
      }

      return fetchConfig;
    }()
  }, {
    key: "getMeetingUriRegExp",
    value: function () {
      var _getMeetingUriRegExp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.fetchConfig();

              case 2:
                return _context4.abrupt("return", {
                  rcvUriRegExp: this.rcvUriRegExp,
                  rcmUriRegExp: this.rcmUriRegExp
                });

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getMeetingUriRegExp() {
        return _getMeetingUriRegExp.apply(this, arguments);
      }

      return getMeetingUriRegExp;
    }()
  }, {
    key: "configUrl",
    get: function get() {
      var _this$_deps$dynamicCo, _this$_deps$dynamicCo2;

      return (_this$_deps$dynamicCo = (_this$_deps$dynamicCo2 = this._deps.dynamicConfigOptions) === null || _this$_deps$dynamicCo2 === void 0 ? void 0 : _this$_deps$dynamicCo2.configUrl) !== null && _this$_deps$dynamicCo !== void 0 ? _this$_deps$dynamicCo : DEFAULT_CONFIG_URL;
    }
  }, {
    key: "frequentUpdate",
    get: function get() {
      var _this$_deps$dynamicCo3, _this$_deps$dynamicCo4;

      return (_this$_deps$dynamicCo3 = (_this$_deps$dynamicCo4 = this._deps.dynamicConfigOptions) === null || _this$_deps$dynamicCo4 === void 0 ? void 0 : _this$_deps$dynamicCo4.frequentUpdate) !== null && _this$_deps$dynamicCo3 !== void 0 ? _this$_deps$dynamicCo3 : false;
    }
  }, {
    key: "isDiscoveryApi",
    get: function get() {
      return !!this._deps.client.service.platform().discovery();
    }
  }, {
    key: "rcmUriRegExp",
    get: function get() {
      // just use static regexp
      // const regExpText =
      // (this.isDiscoveryApi
      //   ? this._rcmUriRegExp
      //   : this.data?.meetingUriReg.rcm) ?? this._rcmUriRegExp;
      return getRcmUriRegExp(this._rcmUriRegExp);
    }
  }, {
    key: "rcvUriRegExp",
    get: function get() {
      var _ref3, _this$data, _this$data2;

      var regExpText = (_ref3 = this.isDiscoveryApi ? "(".concat(this._rcvUriRegExp, "|").concat((_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.meetingUriReg.rcv, ")") : (_this$data2 = this.data) === null || _this$data2 === void 0 ? void 0 : _this$data2.meetingUriReg.rcv) !== null && _ref3 !== void 0 ? _ref3 : this._rcvUriRegExp;
      return getRcvUriRegExp(regExpText);
    }
  }, {
    key: "callWithJupiter",
    get: function get() {
      return this.data.callWithJupiter;
    }
  }]);

  return DynamicConfig;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "rcmUriRegExp", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "rcmUriRegExp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rcvUriRegExp", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "rcvUriRegExp"), _class2.prototype)), _class2)) || _class);
exports.DynamicConfig = DynamicConfig;
//# sourceMappingURL=DynamicConfig.js.map
