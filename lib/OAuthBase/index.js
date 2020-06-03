"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

var _RcModule2 = _interopRequireDefault(require("ringcentral-integration/lib/RcModule"));

var _Enum = require("ringcentral-integration/lib/Enum");

var _di = require("ringcentral-integration/lib/di");

var _ensureExist = _interopRequireDefault(require("ringcentral-integration/lib/ensureExist"));

var _proxify = _interopRequireDefault(require("ringcentral-integration/lib/proxy/proxify"));

var _authMessages = _interopRequireDefault(require("ringcentral-integration/modules/Auth/authMessages"));

var _required = _interopRequireDefault(require("ringcentral-integration/lib/required"));

var _qs = _interopRequireDefault(require("qs"));

var _url = _interopRequireDefault(require("url"));

var _parseCallbackUri = _interopRequireDefault(require("../parseCallbackUri"));

var _baseActionTypes = _interopRequireDefault(require("./baseActionTypes"));

var _getOAuthBaseReducer = _interopRequireDefault(require("./getOAuthBaseReducer"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DEFAULT_UI_OPTIONS = ['hide_remember_me', 'hide_tos'];
var OAuthBase = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Alert', 'Locale', 'Brand', {
    dep: 'TabManager',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(OAuthBase, _RcModule);

  var _super = _createSuper(OAuthBase);

  function OAuthBase(_ref) {
    var _context;

    var _this;

    var alert = _ref.alert,
        auth = _ref.auth,
        brand = _ref.brand,
        locale = _ref.locale,
        tabManager = _ref.tabManager,
        redirectUri = _ref.redirectUri,
        _ref$extralUIOptions = _ref.extralUIOptions,
        extralUIOptions = _ref$extralUIOptions === void 0 ? DEFAULT_UI_OPTIONS : _ref$extralUIOptions,
        options = _objectWithoutProperties(_ref, ["alert", "auth", "brand", "locale", "tabManager", "redirectUri", "extralUIOptions"]);

    _classCallCheck(this, OAuthBase);

    _this = _super.call(this, _objectSpread({}, options));
    _this._alert = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, alert, 'alert');
    _this._auth = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, auth, 'auth');
    _this._brand = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, brand, 'brand');
    _this._locale = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, locale, 'locale');
    _this._tabManager = tabManager;
    _this._redirectUri = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, redirectUri, 'redirectUri');
    _this._reducer = (0, _getOAuthBaseReducer["default"])(_this.actionTypes);
    _this._extralUIOptions = extralUIOptions;
    return _this;
  }

  _createClass(OAuthBase, [{
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this.pending && this._auth.ready && this._locale.ready && this._alert.ready && (!this._tabManager || this._tabManager.ready)) {
        this.store.dispatch({
          type: this.actionTypes.init
        });
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      }
    }
  }, {
    key: "_handleCallbackUri",
    value: function () {
      var _handleCallbackUri2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callbackUri) {
        var refresh,
            query,
            message,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                refresh = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
                _context2.prev = 1;
                query = (0, _parseCallbackUri["default"])(callbackUri);

                if (!refresh) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 6;
                return this._refreshWithCallbackQuery(query);

              case 6:
                _context2.next = 10;
                break;

              case 8:
                _context2.next = 10;
                return this._loginWithCallbackQuery(query);

              case 10:
                _context2.next = 23;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](1);
                console.error('oauth error: ', _context2.t0);
                _context2.t1 = _context2.t0.message;
                _context2.next = _context2.t1 === 'invalid_request' ? 18 : _context2.t1 === 'unauthorized_client' ? 18 : _context2.t1 === 'access_denied' ? 18 : _context2.t1 === 'unsupported_response_type' ? 18 : _context2.t1 === 'invalid_scope' ? 18 : _context2.t1 === 'interaction_required' ? 18 : _context2.t1 === 'login_required' ? 18 : _context2.t1 === 'server_error' ? 20 : _context2.t1 === 'temporarily_unavailable' ? 20 : 20;
                break;

              case 18:
                message = _authMessages["default"].accessDenied;
                return _context2.abrupt("break", 22);

              case 20:
                message = _authMessages["default"].internalError;
                return _context2.abrupt("break", 22);

              case 22:
                this._alert.danger({
                  message: message,
                  payload: _context2.t0
                });

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this, [[1, 12]]);
      }));

      function _handleCallbackUri(_x) {
        return _handleCallbackUri2.apply(this, arguments);
      }

      return _handleCallbackUri;
    }()
  }, {
    key: "_loginWithCallbackQuery",
    value: function () {
      var _loginWithCallbackQuery2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (query.code || query.access_token) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                _context3.next = 4;
                return this._auth.login({
                  code: query.code,
                  accessToken: query.access_token,
                  expiresIn: query.expires_in,
                  endpointId: query.endpoint_id,
                  redirectUri: this.redirectUri,
                  tokenType: query.token_type,
                  scope: query.scope
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function _loginWithCallbackQuery(_x2) {
        return _loginWithCallbackQuery2.apply(this, arguments);
      }

      return _loginWithCallbackQuery;
    }()
  }, {
    key: "_refreshWithCallbackQuery",
    value: function () {
      var _refreshWithCallbackQuery2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query) {
        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (query.access_token) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                _context4.next = 4;
                return this._auth.refreshImplicitToken({
                  tokenType: query.token_type,
                  accessToken: query.access_token,
                  expiresIn: query.expires_in,
                  endpointId: query.endpoint_id
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, this);
      }));

      function _refreshWithCallbackQuery(_x3) {
        return _refreshWithCallbackQuery2.apply(this, arguments);
      }

      return _refreshWithCallbackQuery;
    }()
  }, {
    key: "prepareOAuth",
    value: function () {
      var _prepareOAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4);
      }));

      function prepareOAuth() {
        return _prepareOAuth.apply(this, arguments);
      }

      return prepareOAuth;
    }()
  }, {
    key: "destroyOAuth",
    value: function () {
      var _destroyOAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee5);
      }));

      function destroyOAuth() {
        return _destroyOAuth.apply(this, arguments);
      }

      return destroyOAuth;
    }()
  }, {
    key: "openOAuthPage",
    value: function openOAuthPage() {}
  }, {
    key: "_actionTypes",
    get: function get() {
      return (0, _Enum.prefixEnum)({
        enumMap: _baseActionTypes["default"],
        prefix: this.name
      });
    }
  }, {
    key: "name",
    get: function get() {
      /* require implementation in descendent */
      return null;
    }
  }, {
    key: "oAuthUri",
    get: function get() {
      var extendedQuery = _qs["default"].stringify({
        force: true,
        localeId: this._locale.currentLocale,
        ui_options: this._extralUIOptions.join(' ')
      });

      return "".concat(this._auth.getLoginUrl({
        redirectUri: this.redirectUri,
        brandId: this._brand.id,
        state: this.authState,
        display: 'page',
        implicit: this._auth.isImplicit
      }), "&").concat(extendedQuery);
    }
  }, {
    key: "implictRefreshOAuthUri",
    get: function get() {
      return "".concat(this._auth.getLoginUrl({
        redirectUri: this.redirectUri,
        brandId: this._brand.id,
        state: this.authState,
        display: 'page',
        prompt: 'none',
        implicit: this._auth.isImplicit
      }));
    }
  }, {
    key: "authState",
    get: function get() {
      return btoa(Date.now());
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "oAuthReady",
    get: function get() {
      return this.state.oAuthReady;
    }
  }, {
    key: "redirectUri",
    get: function get() {
      return _url["default"].resolve(window.location.href, this._redirectUri);
    }
  }]);

  return OAuthBase;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "name", [_required["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "name"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_handleCallbackUri", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_handleCallbackUri"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "prepareOAuth", [_required["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "prepareOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "destroyOAuth", [_required["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "destroyOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openOAuthPage", [_required["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "openOAuthPage"), _class2.prototype)), _class2)) || _class);
exports["default"] = OAuthBase;
//# sourceMappingURL=index.js.map
