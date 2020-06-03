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

require("core-js/modules/es6.reflect.get");

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

require("core-js/modules/es6.array.index-of");

require("regenerator-runtime/runtime");

var _background = _interopRequireDefault(require("ringcentral-integration/lib/background"));

var _proxify = _interopRequireDefault(require("ringcentral-integration/lib/proxy/proxify"));

var _di = require("ringcentral-integration/lib/di");

var _ensureExist = _interopRequireDefault(require("ringcentral-integration/lib/ensureExist"));

var _url = _interopRequireDefault(require("url"));

var _uuid = _interopRequireDefault(require("uuid"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getProxyFrameOAuthReducer = _interopRequireDefault(require("./getProxyFrameOAuthReducer"));

var _OAuthBase2 = _interopRequireDefault(require("../../lib/OAuthBase"));

var _dec, _class, _class2, _temp;

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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DEFAULT_PROXY_RETRY = 5000;
var ProxyFrameOAuth = (_dec = (0, _di.Module)({
  name: 'OAuth',
  deps: ['RouterInteraction', {
    dep: 'OAuthOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_OAuthBase) {
  _inherits(ProxyFrameOAuth, _OAuthBase);

  var _super = _createSuper(ProxyFrameOAuth);

  function ProxyFrameOAuth(_ref) {
    var _this;

    var _ref$loginPath = _ref.loginPath,
        loginPath = _ref$loginPath === void 0 ? '/' : _ref$loginPath,
        _ref$redirectUri = _ref.redirectUri,
        redirectUri = _ref$redirectUri === void 0 ? './redirect.html' : _ref$redirectUri,
        _ref$proxyUri = _ref.proxyUri,
        proxyUri = _ref$proxyUri === void 0 ? './proxy.html' : _ref$proxyUri,
        _ref$defaultProxyRetr = _ref.defaultProxyRetry,
        defaultProxyRetry = _ref$defaultProxyRetr === void 0 ? DEFAULT_PROXY_RETRY : _ref$defaultProxyRetr,
        routerInteraction = _ref.routerInteraction,
        options = _objectWithoutProperties(_ref, ["loginPath", "redirectUri", "proxyUri", "defaultProxyRetry", "routerInteraction"]);

    _classCallCheck(this, ProxyFrameOAuth);

    _this = _super.call(this, _objectSpread({
      redirectUri: redirectUri
    }, options));

    _this._callbackHandler = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var origin, data, callbackUri, proxyLoaded;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                origin = _ref2.origin, data = _ref2.data;

                // TODO origin check
                if (data) {
                  callbackUri = data.callbackUri, proxyLoaded = data.proxyLoaded;

                  if (callbackUri) {
                    _this._handleCallbackUri(callbackUri);
                  } else if (proxyLoaded) {
                    clearTimeout(_this._retryTimeoutId);
                    _this._retryTimeoutId = null;

                    _this.store.dispatch({
                      type: _this.actionTypes.setupOAuth
                    });
                  }
                }

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this._createProxyFrame = function () {
      _this._proxyFrame = document.createElement('iframe');
      _this._proxyFrame.src = _this.proxyUri;
      _this._proxyFrame.style.display = 'none';
      var isEdge = window && window.navigator && window.navigator.userAgent.indexOf('Edge') > -1;
      var isIE = window && window.navigator && /MSIE|Trident/i.test(window.navigator.userAgent);

      if (!isEdge && !isIE) {
        _this._proxyFrame.setAttribute('sandbox', ['allow-scripts', 'allow-popups', 'allow-same-origin', 'allow-forms'].join(' '));
      }

      document.body.appendChild(_this._proxyFrame);
      window.addEventListener('message', _this._callbackHandler);
      _this._retryTimeoutId = setTimeout(function () {
        _this._retrySetupProxyFrame();
      }, _this._defaultProxyRetry);
    };

    _this._uuid = _uuid["default"].v4();
    _this._proxyUri = (0, _ensureExist["default"])(proxyUri, 'proxyUri');
    _this._routerInteraction = (0, _ensureExist["default"])(routerInteraction, 'routerInteraction');
    _this._defaultProxyRetry = defaultProxyRetry;
    _this._loginPath = loginPath;
    _this._reducer = (0, _getProxyFrameOAuthReducer["default"])(_this.actionTypes);
    _this._loggedIn = false;
    return _this;
  }

  _createClass(ProxyFrameOAuth, [{
    key: "_onStateChange",
    value: function _onStateChange() {
      _get(_getPrototypeOf(ProxyFrameOAuth.prototype), "_onStateChange", this).call(this);

      if (this.ready && !this._auth.loggedIn && this._routerInteraction.currentPath === this._loginPath && !this.oAuthReady && !this._proxyFrame) {
        this.setupOAuth();
      }

      if (this._proxyFrame && (this._auth.loggedIn || this._routerInteraction.currentPath !== this._loginPath)) {
        this.destroyOAuth();
      }

      if (this._auth.loggedIn === this._loggedIn) {
        return;
      }

      this._loggedIn = this._auth.loggedIn;

      if (this._loggedIn && this._auth.isImplicit) {
        this._createImplicitRefreshTimeout();
      }

      if (!this._loggedIn && this._auth.isImplicit) {
        this._clearImplicitRefreshIframe();

        if (this._implicitRefreshTimeoutId) {
          clearTimeout(this._implicitRefreshTimeoutId);
        }
      }
    }
  }, {
    key: "_handleCallbackUri",
    value: function () {
      var _handleCallbackUri2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(callbackUri, refresh) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _get(_getPrototypeOf(ProxyFrameOAuth.prototype), "_handleCallbackUri", this).call(this, callbackUri, refresh);

              case 2:
                if (this._auth.isImplicit && this._auth.loggedIn) {
                  this._createImplicitRefreshTimeout();
                }

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _handleCallbackUri(_x2, _x3) {
        return _handleCallbackUri2.apply(this, arguments);
      }

      return _handleCallbackUri;
    }()
  }, {
    key: "_retrySetupProxyFrame",
    value: function _retrySetupProxyFrame() {
      this._retryTimeoutId = null;

      if (!this.oAuthReady) {
        this.store.dispatch({
          type: this.actionTypes.proxyRetry
        });

        this._destroyProxyFrame();

        this._createProxyFrame();
      }
    }
  }, {
    key: "_destroyProxyFrame",
    value: function _destroyProxyFrame() {
      document.body.removeChild(this._proxyFrame);
      this._proxyFrame = null;
      window.removeEventListener('message', this._callbackHandler);
    }
  }, {
    key: "setupOAuth",
    value: function () {
      var _setupOAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._proxyFrame) {
                  this._createProxyFrame();

                  this.store.dispatch({
                    type: this.actionTypes.setupProxy
                  });
                }

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setupOAuth() {
        return _setupOAuth.apply(this, arguments);
      }

      return setupOAuth;
    }()
  }, {
    key: "destroyOAuth",
    value: function () {
      var _destroyOAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this._proxyFrame) {
                  if (this._retryTimeoutId) {
                    clearTimeout(this._retryTimeoutId);
                    this._retryTimeoutId = null;
                  }

                  this._destroyProxyFrame();

                  this.store.dispatch({
                    type: this.actionTypes.destroyOAuth
                  });
                }

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function destroyOAuth() {
        return _destroyOAuth.apply(this, arguments);
      }

      return destroyOAuth;
    }()
  }, {
    key: "openOAuthPage",
    value: function openOAuthPage() {
      if (this.oAuthReady) {
        this._proxyFrame.contentWindow.postMessage({
          oAuthUri: this.oAuthUri
        }, '*');
      }
    }
  }, {
    key: "_createImplicitRefreshIframe",
    value: function _createImplicitRefreshIframe() {
      var _this2 = this;

      this._clearImplicitRefreshIframe();

      this._implicitRefreshFrame = document.createElement('iframe');
      this._implicitRefreshFrame.src = this.implictRefreshOAuthUri;
      this._implicitRefreshFrame.style.display = 'none';
      document.body.appendChild(this._implicitRefreshFrame); // eslint-disable-next-line

      this._implictitRefreshCallBack = function (_ref4) {
        var origin = _ref4.origin,
            data = _ref4.data;
        var refreshCallbackUri = data.refreshCallbackUri;

        if (refreshCallbackUri && _this2._auth.loggedIn) {
          _this2._handleCallbackUri(refreshCallbackUri, true);

          _this2._clearImplicitRefreshIframe();
        }
      };

      window.addEventListener('message', this._implictitRefreshCallBack);
    }
  }, {
    key: "_clearImplicitRefreshIframe",
    value: function _clearImplicitRefreshIframe() {
      if (this._implicitRefreshFrame) {
        document.body.removeChild(this._implicitRefreshFrame);
        this._implicitRefreshFrame = null;
        window.removeEventListener('message', this._implictitRefreshCallBack);
        this._callbackHandler = null;
      }
    } // create a time out to refresh implicit flow token

  }, {
    key: "_createImplicitRefreshTimeout",
    value: function _createImplicitRefreshTimeout() {
      var _this3 = this;

      if (this._implicitRefreshTimeoutId) {
        clearTimeout(this._implicitRefreshTimeoutId);
      }

      var authData = this._auth.token;
      var refreshTokenExpiresIn = authData.expiresIn;
      var expireTime = authData.expireTime;

      if (!refreshTokenExpiresIn || !expireTime) {
        return;
      } // set refresh time to (token exposre time) / 3


      var refreshTokenTimeoutTime = parseInt(refreshTokenExpiresIn, 10) * 1000 / 3;

      if (refreshTokenTimeoutTime + Date.now() > expireTime) {
        refreshTokenTimeoutTime = expireTime - Date.now() - 5000;

        if (refreshTokenTimeoutTime < 0) {
          return;
        }
      }

      this._implicitRefreshTimeoutId = setTimeout(function () {
        if (!_this3._auth.loggedIn) {
          return;
        }

        if (_this3._tabManager && !_this3._tabManager.active) {
          _this3._createImplicitRefreshTimeout();

          return;
        }

        _this3._createImplicitRefreshIframe();

        _this3._implicitRefreshTimeoutId = null;
      }, refreshTokenTimeoutTime);
    }
  }, {
    key: "name",
    get: function get() {
      return 'proxyFrameOAuth';
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      return _actionTypes["default"];
    }
  }, {
    key: "proxyUri",
    get: function get() {
      return "".concat(_url["default"].resolve(window.location.href, this._proxyUri), "?hash=").concat(encodeURIComponent(btoa(this._uuid)), "&prefix=").concat(encodeURIComponent(this.prefix));
    }
  }, {
    key: "proxyRetryCount",
    get: function get() {
      return this.state.proxyRetryCount;
    }
  }]);

  return ProxyFrameOAuth;
}(_OAuthBase2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "setupOAuth", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setupOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "destroyOAuth", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "destroyOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openOAuthPage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "openOAuthPage"), _class2.prototype)), _class2)) || _class);
exports["default"] = ProxyFrameOAuth;
//# sourceMappingURL=index.js.map
