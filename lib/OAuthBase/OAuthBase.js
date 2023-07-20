"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuthBase = void 0;
require("regenerator-runtime/runtime");
var _url = _interopRequireDefault(require("url"));
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _required = _interopRequireDefault(require("@ringcentral-integration/commons/lib/required"));
var _Auth = require("@ringcentral-integration/commons/modules/Auth");
var _core = require("@ringcentral-integration/core");
var _parseCallbackUri = _interopRequireDefault(require("../parseCallbackUri"));
var _dec, _class, _class2, _descriptor;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
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
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
var DEFAULT_UI_OPTIONS = ['hide_remember_me', 'hide_tos'];
var OAuthBase = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Alert', 'Locale', 'Brand', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'OAuthOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(OAuthBase, _RcModuleV);
  var _super = _createSuper(OAuthBase);
  function OAuthBase(deps) {
    var _this;
    _classCallCheck(this, OAuthBase);
    _this = _super.call(this, {
      deps: deps
    });
    _initializerDefineProperty(_this, "oAuthReady", _descriptor, _assertThisInitialized(_this));
    if (!_this._redirectUri) {
      throw new Error('redirectUri is required');
    }
    return _this;
  }
  _createClass(OAuthBase, [{
    key: "setOAuthReady",
    value: function setOAuthReady(val) {
      this.oAuthReady = val;
    }
  }, {
    key: "_handleCallbackUri",
    value: function () {
      var _handleCallbackUri2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callbackUri) {
        var refresh,
          query,
          message,
          _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                refresh = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
                _context.prev = 1;
                query = (0, _parseCallbackUri["default"])(callbackUri);
                if (!refresh) {
                  _context.next = 8;
                  break;
                }
                _context.next = 6;
                return this._refreshWithCallbackQuery(query);
              case 6:
                _context.next = 10;
                break;
              case 8:
                _context.next = 10;
                return this._loginWithCallbackQuery(query);
              case 10:
                _context.next = 23;
                break;
              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](1);
                console.error('oauth error: ', _context.t0);
                _context.t1 = _context.t0.message;
                _context.next = _context.t1 === 'invalid_request' ? 18 : _context.t1 === 'unauthorized_client' ? 18 : _context.t1 === 'access_denied' ? 18 : _context.t1 === 'unsupported_response_type' ? 18 : _context.t1 === 'invalid_scope' ? 18 : _context.t1 === 'interaction_required' ? 18 : _context.t1 === 'login_required' ? 18 : _context.t1 === 'server_error' ? 20 : _context.t1 === 'temporarily_unavailable' ? 20 : 20;
                break;
              case 18:
                message = _Auth.authMessages.accessDenied;
                return _context.abrupt("break", 22);
              case 20:
                message = _Auth.authMessages.internalError;
                return _context.abrupt("break", 22);
              case 22:
                this._deps.alert.danger({
                  message: message,
                  payload: _context.t0
                });
              case 23:
              case "end":
                return _context.stop();
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
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (query.code || query.access_token) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                _context2.next = 4;
                return this._deps.auth.login({
                  code: query.code,
                  accessToken: query.access_token,
                  expiresIn: query.expires_in,
                  endpointId: query.endpoint_id,
                  redirectUri: this.redirectUri,
                  tokenType: query.token_type,
                  scope: query.scope,
                  tokenUri: query.token_uri,
                  discoveryUri: query.discovery_uri
                });
              case 4:
              case "end":
                return _context2.stop();
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
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (query.access_token) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                _context3.next = 4;
                return this._deps.auth.refreshImplicitToken({
                  tokenType: query.token_type,
                  accessToken: query.access_token,
                  expiresIn: query.expires_in,
                  endpointId: query.endpoint_id
                });
              case 4:
              case "end":
                return _context3.stop();
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
    key: "destroyOAuth",
    value: function () {
      var _destroyOAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      function destroyOAuth() {
        return _destroyOAuth.apply(this, arguments);
      }
      return destroyOAuth;
    }()
  }, {
    key: "openOAuthPage",
    value: function () {
      var _openOAuthPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
      function openOAuthPage() {
        return _openOAuthPage.apply(this, arguments);
      }
      return openOAuthPage;
    }()
  }, {
    key: "name",
    get: function get() {
      /* require implementation in descendent */
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
      return null;
    }
  }, {
    key: "_redirectUri",
    get: function get() {
      var _this$_deps$oAuthOpti;
      return (_this$_deps$oAuthOpti = this._deps.oAuthOptions) === null || _this$_deps$oAuthOpti === void 0 ? void 0 : _this$_deps$oAuthOpti.redirectUri;
    }
  }, {
    key: "_uiOptions",
    get: function get() {
      var _this$_deps$oAuthOpti2;
      return ((_this$_deps$oAuthOpti2 = this._deps.oAuthOptions) === null || _this$_deps$oAuthOpti2 === void 0 ? void 0 : _this$_deps$oAuthOpti2.uiOptions) || DEFAULT_UI_OPTIONS;
    }
  }, {
    key: "oAuthUri",
    get: function get() {
      return this._deps.auth.getLoginUrl({
        redirectUri: this.redirectUri,
        brandId: this._deps.brand.id,
        state: this.authState,
        display: 'page',
        localeId: this._deps.locale.currentLocale,
        uiOptions: this._uiOptions,
        implicit: this._deps.auth.isImplicit,
        force: true
      });
    }
  }, {
    key: "implicitRefreshOAuthUri",
    get: function get() {
      return this._deps.auth.getLoginUrl({
        redirectUri: this.redirectUri,
        brandId: this._deps.brand.id,
        state: this.authState,
        display: 'page',
        prompt: 'none',
        implicit: this._deps.auth.isImplicit
      });
    }
  }, {
    key: "authState",
    get: function get() {
      return btoa("".concat(Date.now()));
    }
  }, {
    key: "redirectUri",
    get: function get() {
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      return _url["default"].resolve(window.location.href, this._redirectUri);
    }
  }]);
  return OAuthBase;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "oAuthReady", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setOAuthReady", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOAuthReady"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "name", [_required["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "name"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_handleCallbackUri", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_handleCallbackUri"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "destroyOAuth", [_required["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "destroyOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openOAuthPage", [_required["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "openOAuthPage"), _class2.prototype)), _class2)) || _class);
exports.OAuthBase = OAuthBase;
//# sourceMappingURL=OAuthBase.js.map
