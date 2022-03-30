"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

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
exports.ProxyFrameOAuth = void 0;

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.index-of");

require("regenerator-runtime/runtime");

var _url = _interopRequireDefault(require("url"));

var uuid = _interopRequireWildcard(require("uuid"));

var _background = _interopRequireDefault(require("@ringcentral-integration/commons/lib/background"));

var _di = require("@ringcentral-integration/commons/lib/di");

var _proxify = _interopRequireDefault(require("@ringcentral-integration/commons/lib/proxy/proxify"));

var _core = require("@ringcentral-integration/core");

var _OAuthBase2 = require("../../lib/OAuthBase");

var _dec, _class, _class2, _descriptor;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_PROXY_RETRY = 5000;
var ProxyFrameOAuth = (_dec = (0, _di.Module)({
  name: 'OAuth',
  deps: ['Client', 'RouterInteraction', {
    dep: 'OAuthOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_OAuthBase) {
  _inherits(ProxyFrameOAuth, _OAuthBase);

  var _super = _createSuper(ProxyFrameOAuth);

  function ProxyFrameOAuth(_ref) {
    var _this;

    var _ref$oAuthOptions = _ref.oAuthOptions;
    _ref$oAuthOptions = _ref$oAuthOptions === void 0 ? {} : _ref$oAuthOptions;

    var _ref$oAuthOptions$log = _ref$oAuthOptions.loginPath,
        loginPath = _ref$oAuthOptions$log === void 0 ? '/' : _ref$oAuthOptions$log,
        _ref$oAuthOptions$red = _ref$oAuthOptions.redirectUri,
        redirectUri = _ref$oAuthOptions$red === void 0 ? './redirect.html' : _ref$oAuthOptions$red,
        _ref$oAuthOptions$pro = _ref$oAuthOptions.proxyUri,
        proxyUri = _ref$oAuthOptions$pro === void 0 ? './proxy.html' : _ref$oAuthOptions$pro,
        _ref$oAuthOptions$def = _ref$oAuthOptions.defaultProxyRetry,
        defaultProxyRetry = _ref$oAuthOptions$def === void 0 ? DEFAULT_PROXY_RETRY : _ref$oAuthOptions$def,
        restOAuthOptions = _objectWithoutProperties(_ref$oAuthOptions, ["loginPath", "redirectUri", "proxyUri", "defaultProxyRetry"]),
        deps = _objectWithoutProperties(_ref, ["oAuthOptions"]);

    _classCallCheck(this, ProxyFrameOAuth);

    _this = _super.call(this, _objectSpread(_objectSpread({}, deps), {}, {
      oAuthOptions: _objectSpread({
        loginPath: loginPath,
        redirectUri: redirectUri,
        proxyUri: proxyUri,
        defaultProxyRetry: defaultProxyRetry
      }, restOAuthOptions)
    }));
    _this._retryTimeoutId = null;
    _this._implicitRefreshTimeoutId = null;
    _this._uuid = uuid.v4();
    _this._proxyFrame = void 0;
    _this._implicitRefreshFrame = void 0;
    _this._loggedIn = false;

    _initializerDefineProperty(_this, "proxyRetryCount", _descriptor, _assertThisInitialized(_this));

    _this._callbackHandler = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var origin, data, callbackUri, proxyLoaded;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                origin = _ref2.origin, data = _ref2.data;

                if (data) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                callbackUri = data.callbackUri, proxyLoaded = data.proxyLoaded;

                if (callbackUri) {
                  _this._handleCallbackUri(callbackUri);
                } else if (proxyLoaded) {
                  clearTimeout(_this._retryTimeoutId);
                  _this._retryTimeoutId = null;

                  _this.setOAuthReady(true);
                }

              case 5:
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
      var _this$_deps$oAuthOpti;

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
      }, (_this$_deps$oAuthOpti = _this._deps.oAuthOptions) === null || _this$_deps$oAuthOpti === void 0 ? void 0 : _this$_deps$oAuthOpti.defaultProxyRetry);
    };

    _this._implicitRefreshCallBack = function (_ref4) {
      var data = _ref4.data;
      var refreshCallbackUri = data.refreshCallbackUri;

      if (refreshCallbackUri && _this._deps.auth.loggedIn) {
        _this._handleCallbackUri(refreshCallbackUri, true);

        _this._clearImplicitRefreshIframe();
      }
    };

    return _this;
  }

  _createClass(ProxyFrameOAuth, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      _get(_getPrototypeOf(ProxyFrameOAuth.prototype), "onInitOnce", this) && _get(_getPrototypeOf(ProxyFrameOAuth.prototype), "onInitOnce", this).call(this);
      (0, _core.watch)(this, function () {
        var _this2$_deps$oAuthOpt;

        return [_this2.ready, _this2._deps.auth.loggedIn, _this2._deps.routerInteraction.currentPath, (_this2$_deps$oAuthOpt = _this2._deps.oAuthOptions) === null || _this2$_deps$oAuthOpt === void 0 ? void 0 : _this2$_deps$oAuthOpt.loginPath, _this2.oAuthReady, _this2._proxyFrame];
      }, function () {
        var _this2$_deps$oAuthOpt2;

        var atLoginPage = _this2._deps.routerInteraction.currentPath === ((_this2$_deps$oAuthOpt2 = _this2._deps.oAuthOptions) === null || _this2$_deps$oAuthOpt2 === void 0 ? void 0 : _this2$_deps$oAuthOpt2.loginPath);

        if (_this2.ready && !_this2._deps.auth.loggedIn && atLoginPage && !_this2.oAuthReady && !_this2._proxyFrame) {
          _this2.setupOAuth();
        } else if (_this2._proxyFrame && (_this2._deps.auth.loggedIn || !atLoginPage)) {
          _this2.destroyOAuth();
        }

        if (_this2._deps.auth.loggedIn === _this2._loggedIn) return;
        _this2._loggedIn = _this2._deps.auth.loggedIn;

        if (_this2._deps.auth.isImplicit) {
          if (_this2._loggedIn) {
            _this2._createImplicitRefreshTimeout();
          } else if (!_this2._loggedIn) {
            _this2._clearImplicitRefreshIframe();

            if (_this2._implicitRefreshTimeoutId) {
              clearTimeout(_this2._implicitRefreshTimeoutId);
            }
          }
        }
      }, {
        multiple: true
      });
    }
  }, {
    key: "_handleCallbackUri",
    value: function () {
      var _handleCallbackUri2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(callbackUri) {
        var refresh,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                refresh = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
                _context2.next = 3;
                return _get(_getPrototypeOf(ProxyFrameOAuth.prototype), "_handleCallbackUri", this).call(this, callbackUri, refresh);

              case 3:
                if (this._deps.auth.isImplicit && this._deps.auth.loggedIn) {
                  this._createImplicitRefreshTimeout();
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _handleCallbackUri(_x2) {
        return _handleCallbackUri2.apply(this, arguments);
      }

      return _handleCallbackUri;
    }()
  }, {
    key: "setProxyRetryCount",
    value: function setProxyRetryCount(val) {
      this.proxyRetryCount = val;
    }
  }, {
    key: "setOAuthReady",
    value: function setOAuthReady(val) {
      _get(_getPrototypeOf(ProxyFrameOAuth.prototype), "setOAuthReady", this).call(this, val);

      this.setProxyRetryCount(0);
    }
  }, {
    key: "_retrySetupProxyFrame",
    value: function _retrySetupProxyFrame() {
      this._retryTimeoutId = null;
      if (this.oAuthReady) return;
      this.setProxyRetryCount(this.proxyRetryCount + 1);

      this._destroyProxyFrame();

      this._createProxyFrame();
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
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                this._createProxyFrame();

                this.setProxyRetryCount(0);

              case 4:
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
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                if (this._retryTimeoutId) {
                  clearTimeout(this._retryTimeoutId);
                  this._retryTimeoutId = null;
                }

                this._destroyProxyFrame();

                this.setOAuthReady(false);

              case 5:
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
    value: function () {
      var _openOAuthPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.oAuthReady) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                if (!this._deps.client.service.platform().discovery()) {
                  _context5.next = 5;
                  break;
                }

                _context5.next = 5;
                return this._deps.client.service.platform().loginUrlWithDiscovery();

              case 5:
                this._proxyFrame.contentWindow.postMessage({
                  oAuthUri: this.oAuthUri
                }, '*');

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function openOAuthPage() {
        return _openOAuthPage.apply(this, arguments);
      }

      return openOAuthPage;
    }()
  }, {
    key: "_createImplicitRefreshIframe",
    value: function _createImplicitRefreshIframe() {
      this._clearImplicitRefreshIframe();

      this._implicitRefreshFrame = document.createElement('iframe');
      this._implicitRefreshFrame.src = this.implicitRefreshOAuthUri;
      this._implicitRefreshFrame.style.display = 'none';
      document.body.appendChild(this._implicitRefreshFrame); // eslint-disable-next-line

      window.addEventListener('message', this._implicitRefreshCallBack);
    }
  }, {
    key: "_clearImplicitRefreshIframe",
    value: function _clearImplicitRefreshIframe() {
      if (!this._implicitRefreshFrame) return;
      document.body.removeChild(this._implicitRefreshFrame);
      this._implicitRefreshFrame = null;
      window.removeEventListener('message', this._implicitRefreshCallBack);
      this._callbackHandler = null;
    } // create a time out to refresh implicit flow token

  }, {
    key: "_createImplicitRefreshTimeout",
    value: function _createImplicitRefreshTimeout() {
      var _this3 = this;

      if (this._implicitRefreshTimeoutId) {
        clearTimeout(this._implicitRefreshTimeoutId);
      }

      var authData = this._deps.auth.token;
      var refreshTokenExpiresIn = authData.expiresIn;
      var expireTime = authData.expireTime;
      if (!refreshTokenExpiresIn || !expireTime) return; // * set refresh time to (token expose time) / 3

      var refreshTokenTimeoutTime = parseInt("".concat(refreshTokenExpiresIn), 10) * 1000 / 3;

      if (refreshTokenTimeoutTime + Date.now() > expireTime) {
        refreshTokenTimeoutTime = expireTime - Date.now() - 5000;
        if (refreshTokenTimeoutTime < 0) return;
      }

      this._implicitRefreshTimeoutId = setTimeout(function () {
        var _this3$_deps$tabManag;

        if (!_this3._deps.auth.loggedIn) return;

        if (!((_this3$_deps$tabManag = _this3._deps.tabManager) === null || _this3$_deps$tabManag === void 0 ? void 0 : _this3$_deps$tabManag.active)) {
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
    key: "prefix",
    get: function get() {
      var _this$_deps$oAuthOpti2;

      return (_this$_deps$oAuthOpti2 = this._deps.oAuthOptions) === null || _this$_deps$oAuthOpti2 === void 0 ? void 0 : _this$_deps$oAuthOpti2.prefix;
    }
  }, {
    key: "proxyUri",
    get: function get() {
      var _this$_deps$oAuthOpti3;

      var prefix = encodeURIComponent(this.prefix);

      var proxyUri = _url["default"].resolve(window.location.href, (_this$_deps$oAuthOpti3 = this._deps.oAuthOptions) === null || _this$_deps$oAuthOpti3 === void 0 ? void 0 : _this$_deps$oAuthOpti3.proxyUri);

      var hash = encodeURIComponent(btoa(this._uuid));
      return "".concat(proxyUri, "?hash=").concat(hash, "&prefix=").concat(prefix);
    }
  }]);

  return ProxyFrameOAuth;
}(_OAuthBase2.OAuthBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "proxyRetryCount", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setProxyRetryCount", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setProxyRetryCount"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOAuthReady", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOAuthReady"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setupOAuth", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setupOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "destroyOAuth", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "destroyOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openOAuthPage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "openOAuthPage"), _class2.prototype)), _class2)) || _class);
exports.ProxyFrameOAuth = ProxyFrameOAuth;
//# sourceMappingURL=ProxyFrameOAuth.js.map
