"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.index-of");

require("regenerator-runtime/runtime");

var _background = _interopRequireDefault(require("ringcentral-integration/lib/background"));

var _di = require("ringcentral-integration/lib/di");

var _proxify = _interopRequireDefault(require("ringcentral-integration/lib/proxy/proxify"));

var _ensureExist = _interopRequireDefault(require("ringcentral-integration/lib/ensureExist"));

var _uuid = _interopRequireDefault(require("uuid"));

var _popWindow = _interopRequireDefault(require("../../lib/popWindow"));

var _OAuthBase2 = _interopRequireDefault(require("../../lib/OAuthBase"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var OAuth = (_dec = (0, _di.Module)({
  name: 'OAuth',
  deps: ['RouterInteraction', {
    dep: 'OAuthOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_OAuthBase) {
  _inherits(OAuth, _OAuthBase);

  function OAuth(_ref) {
    var _this;

    var _ref$loginPath = _ref.loginPath,
        loginPath = _ref$loginPath === void 0 ? '/' : _ref$loginPath,
        _ref$redirectUri = _ref.redirectUri,
        redirectUri = _ref$redirectUri === void 0 ? './redirect.html' : _ref$redirectUri,
        routerInteraction = _ref.routerInteraction,
        options = _objectWithoutProperties(_ref, ["loginPath", "redirectUri", "routerInteraction"]);

    _classCallCheck(this, OAuth);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OAuth).call(this, _objectSpread({
      redirectUri: redirectUri
    }, options)));
    _this._routerInteraction = (0, _ensureExist["default"])(routerInteraction, 'routerInteraction');
    _this._loginPath = loginPath;
    _this._loginWindow = null;
    _this._redirectCheckTimeout = null;
    _this._uuid = _uuid["default"].v4();
    return _this;
  }

  _createClass(OAuth, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      _get(_getPrototypeOf(OAuth.prototype), "initialize", this).call(this); // close login window when unload and login window exist


      window.addEventListener('beforeunload', function () {
        if (_this2._loginWindow) {
          try {
            _this2._loginWindow.close();
          } catch (error) {
            /* ignore error */
          }
        }
      }); // listen callback uri from redirect page, works with coss origin redirect page

      window.addEventListener('message', function (_ref2) {
        var _ref2$data = _ref2.data,
            data = _ref2$data === void 0 ? {} : _ref2$data;

        if (!data) {
          return;
        }

        var callbackUri = data.callbackUri;

        if (callbackUri) {
          _this2._clearRedirectCheckTimeout();

          _this2._handleCallbackUri(callbackUri);
        }
      }); // listen callback uri from storage, works only with same origin

      window.addEventListener('storage', function (e) {
        if (e.key === _this2.callbackUriStorageKey && e.newValue && e.newValue !== '') {
          var callbackUri = e.newValue;
          localStorage.removeItem(_this2.callbackUriStorageKey);

          _this2._clearRedirectCheckTimeout();

          _this2._handleCallbackUri(callbackUri);
        }
      });
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      _get(_getPrototypeOf(OAuth.prototype), "_onStateChange", this).call(this);

      if (this.ready && !this._auth.loggedIn && this._routerInteraction.currentPath === this._loginPath && !this.oAuthReady) {
        this.setupOAuth();
      }

      if (this._auth.loggedIn || this._routerInteraction.currentPath !== this._loginPath) {
        this.destroyOAuth();
      }
    }
  }, {
    key: "setupOAuth",
    value: function setupOAuth() {
      var _this3 = this;

      return regeneratorRuntime.async(function setupOAuth$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.oAuthReady) {
                window.oAuthCallback = function (callbackUri) {
                  _this3._clearRedirectCheckTimeout();

                  _this3._handleCallbackUri(callbackUri);
                };

                this.store.dispatch({
                  type: this.actionTypes.setupOAuth
                });
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "destroyOAuth",
    value: function destroyOAuth() {
      return regeneratorRuntime.async(function destroyOAuth$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.oAuthReady) {
                window.oAuthCallback = null;
                this.store.dispatch({
                  type: this.actionTypes.destroyOAuth
                });
              }

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openOAuthPage",
    value: function openOAuthPage() {
      if (this.oAuthReady) {
        this._loginWindow = (0, _popWindow["default"])(this.oAuthUri, 'rc-oauth', 600, 600);

        if (this.isRedirectUriSameOrigin) {
          this._setupRedirectCheckTimeout();
        }
      }
    }
  }, {
    key: "_clearRedirectCheckTimeout",
    value: function _clearRedirectCheckTimeout() {
      if (this._redirectCheckTimeout) {
        clearTimeout(this._redirectCheckTimeout);
      }
    }
  }, {
    key: "_setupRedirectCheckTimeout",
    value: function _setupRedirectCheckTimeout() {
      var _this4 = this;

      this._clearRedirectCheckTimeout();

      this._redirectCheckTimeout = setTimeout(function () {
        _this4._redirectCheckTimeout = null;

        if (!_this4._loginWindow || !_this4._loginWindow.window || _this4._loginWindow.closed) {
          _this4._loginWindow = null;
          return;
        }

        try {
          var callbackUri = _this4._loginWindow.location.href;

          if (callbackUri.indexOf(_this4.redirectUri) !== -1) {
            _this4._loginWindow.close();

            _this4._loginWindow = null;

            _this4._handleCallbackUri(callbackUri);

            return;
          }
        } catch (e) {// ignore e
          // console.log('checking redirect uri');
        }

        _this4._setupRedirectCheckTimeout();
      }, 1000);
    }
  }, {
    key: "name",
    get: function get() {
      return 'OAuth';
    }
  }, {
    key: "isRedirectUriSameOrigin",
    get: function get() {
      return this.redirectUri.indexOf(window.origin) === 0;
    }
  }, {
    key: "authState",
    get: function get() {
      return "".concat(btoa(Date.now()), "-").concat(this.prefix, "-").concat(encodeURIComponent(btoa(this._uuid)));
    }
  }, {
    key: "callbackUriStorageKey",
    get: function get() {
      return "".concat(this.prefix, "-").concat(encodeURIComponent(btoa(this._uuid)), "-callbackUri");
    }
  }]);

  return OAuth;
}(_OAuthBase2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "setupOAuth", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setupOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "destroyOAuth", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "destroyOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openOAuthPage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "openOAuthPage"), _class2.prototype)), _class2)) || _class);
exports["default"] = OAuth;
//# sourceMappingURL=index.js.map
