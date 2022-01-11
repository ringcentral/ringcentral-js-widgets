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
exports["default"] = void 0;

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.index-of");

require("regenerator-runtime/runtime");

var uuid = _interopRequireWildcard(require("uuid"));

var _background = _interopRequireDefault(require("@ringcentral-integration/commons/lib/background"));

var _di = require("@ringcentral-integration/commons/lib/di");

var _ensureExist = _interopRequireDefault(require("@ringcentral-integration/commons/lib/ensureExist"));

var _proxify = _interopRequireDefault(require("@ringcentral-integration/commons/lib/proxy/proxify"));

var _isElectron = require("../../lib/isElectron");

var _OAuthBase2 = _interopRequireDefault(require("../../lib/OAuthBase"));

var _popWindow = _interopRequireDefault(require("../../lib/popWindow"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var OAuth = (_dec = (0, _di.Module)({
  name: 'OAuth',
  deps: ['RouterInteraction', 'Client', {
    dep: 'OAuthOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_OAuthBase) {
  _inherits(OAuth, _OAuthBase);

  var _super = _createSuper(OAuth);

  function OAuth(_ref) {
    var _this;

    var _ref$loginPath = _ref.loginPath,
        loginPath = _ref$loginPath === void 0 ? '/' : _ref$loginPath,
        _ref$redirectUri = _ref.redirectUri,
        redirectUri = _ref$redirectUri === void 0 ? './redirect.html' : _ref$redirectUri,
        _ref$restrictSameOrig = _ref.restrictSameOriginRedirectUri,
        restrictSameOriginRedirectUri = _ref$restrictSameOrig === void 0 ? true : _ref$restrictSameOrig,
        routerInteraction = _ref.routerInteraction,
        client = _ref.client,
        options = _objectWithoutProperties(_ref, ["loginPath", "redirectUri", "restrictSameOriginRedirectUri", "routerInteraction", "client"]);

    _classCallCheck(this, OAuth);

    _this = _super.call(this, _objectSpread({
      redirectUri: redirectUri
    }, options));
    _this._routerInteraction = (0, _ensureExist["default"])(routerInteraction, 'routerInteraction');
    _this._client = (0, _ensureExist["default"])(client, 'client');
    _this._loginPath = loginPath;
    _this._loginWindow = null;
    _this._redirectCheckTimeout = null;
    _this._isInElectron = (0, _isElectron.isElectron)();
    _this._restrictSameOriginRedirectUri = restrictSameOriginRedirectUri;
    _this._uuid = uuid.v4();
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
    value: function () {
      var _setupOAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
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
        }, _callee, this);
      }));

      function setupOAuth() {
        return _setupOAuth.apply(this, arguments);
      }

      return setupOAuth;
    }()
  }, {
    key: "destroyOAuth",
    value: function () {
      var _destroyOAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
        }, _callee2, this);
      }));

      function destroyOAuth() {
        return _destroyOAuth.apply(this, arguments);
      }

      return destroyOAuth;
    }()
  }, {
    key: "openOAuthPage",
    value: function () {
      var _openOAuthPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.oAuthReady) {
                  _context3.next = 6;
                  break;
                }

                if (!this._client.service.platform().discovery()) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 4;
                return this._client.service.platform().loginUrlWithDiscovery();

              case 4:
                this._loginWindow = (0, _popWindow["default"])(this.oAuthUri, 'rc-oauth', 600, 600);

                if (this.isRedirectUriSameOrigin) {
                  this._setupRedirectCheckTimeout();
                }

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function openOAuthPage() {
        return _openOAuthPage.apply(this, arguments);
      }

      return openOAuthPage;
    }()
  }, {
    key: "openOAuthPageInOtherRouter",
    value: function () {
      var _openOAuthPageInOtherRouter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this._client.service.platform().discovery()) {
                  _context4.next = 3;
                  break;
                }

                _context4.next = 3;
                return this._client.service.platform().loginUrlWithDiscovery();

              case 3:
                this._loginWindow = (0, _popWindow["default"])(this.oAuthUri, 'rc-oauth', 600, 600);

                if (this.isRedirectUriSameOrigin) {
                  this._setupRedirectCheckTimeout();
                }

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function openOAuthPageInOtherRouter() {
        return _openOAuthPageInOtherRouter.apply(this, arguments);
      }

      return openOAuthPageInOtherRouter;
    }()
  }, {
    key: "_clearRedirectCheckTimeout",
    value: function _clearRedirectCheckTimeout() {
      if (this._redirectCheckTimeout === null) {
        return;
      }

      clearTimeout(this._redirectCheckTimeout);
    }
  }, {
    key: "_setupRedirectCheckTimeout",
    value: function _setupRedirectCheckTimeout() {
      var _this4 = this;

      this._clearRedirectCheckTimeout();

      this._redirectCheckTimeout = setTimeout(function () {
        _this4._redirectCheckTimeout = null;

        if (!_this4._loginWindow || _this4._loginWindow.closed || // for electron, the .window is always undefined
        !_this4._isInElectron && !_this4._loginWindow.window) {
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
      return this.restrictSameOriginRedirectUri ? this.redirectUri.indexOf(window.origin) === 0 : true;
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
}(_OAuthBase2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "setupOAuth", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setupOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "destroyOAuth", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "destroyOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openOAuthPage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "openOAuthPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openOAuthPageInOtherRouter", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "openOAuthPageInOtherRouter"), _class2.prototype)), _class2)) || _class);
exports["default"] = OAuth;
//# sourceMappingURL=index.js.map
