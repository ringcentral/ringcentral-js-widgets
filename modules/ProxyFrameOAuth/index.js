'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _desc, _value, _class2;

var _background = require('ringcentral-integration/lib/background');

var _background2 = _interopRequireDefault(_background);

var _proxify = require('ringcentral-integration/lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _di = require('ringcentral-integration/lib/di');

var _ensureExist = require('ringcentral-integration/lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getProxyFrameOAuthReducer = require('./getProxyFrameOAuthReducer');

var _getProxyFrameOAuthReducer2 = _interopRequireDefault(_getProxyFrameOAuthReducer);

var _OAuthBase2 = require('../../lib/OAuthBase');

var _OAuthBase3 = _interopRequireDefault(_OAuthBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var DEFAULT_PROXY_RETRY = 5000;

var ProxyFrameOAuth = (_dec = (0, _di.Module)({
  name: 'OAuth',
  deps: [{ dep: 'OAuthOptions', optional: true }]
}), _dec(_class = (_class2 = function (_OAuthBase) {
  (0, _inherits3.default)(ProxyFrameOAuth, _OAuthBase);

  function ProxyFrameOAuth(_ref) {
    var _this2 = this;

    var _ref$redirectUri = _ref.redirectUri,
        redirectUri = _ref$redirectUri === undefined ? './redirect.html' : _ref$redirectUri,
        _ref$proxyUri = _ref.proxyUri,
        proxyUri = _ref$proxyUri === undefined ? './proxy.html' : _ref$proxyUri,
        _ref$defaultProxyRetr = _ref.defaultProxyRetry,
        defaultProxyRetry = _ref$defaultProxyRetr === undefined ? DEFAULT_PROXY_RETRY : _ref$defaultProxyRetr,
        options = (0, _objectWithoutProperties3.default)(_ref, ['redirectUri', 'proxyUri', 'defaultProxyRetry']);
    (0, _classCallCheck3.default)(this, ProxyFrameOAuth);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProxyFrameOAuth.__proto__ || (0, _getPrototypeOf2.default)(ProxyFrameOAuth)).call(this, (0, _extends3.default)({
      redirectUri: redirectUri
    }, options)));

    _this._callbackHandler = function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
        var origin = _ref3.origin,
            data = _ref3.data;
        var callbackUri, proxyLoaded;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
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

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this._createProxyFrame = function () {
      _this._proxyFrame = document.createElement('iframe');
      _this._proxyFrame.src = _this.proxyUri;
      _this._proxyFrame.style.display = 'none';
      _this._proxyFrame.setAttribute('sandbox', ['allow-scripts', 'allow-popups', 'allow-same-origin', 'allow-forms'].join(' '));
      document.body.appendChild(_this._proxyFrame);
      window.addEventListener('message', _this._callbackHandler);
      _this._retryTimeoutId = setTimeout(function () {
        _this._retrySetupProxyFrame();
      }, _this._defaultProxyRetry);
    };

    _this._uuid = _uuid2.default.v4();
    _this._proxyUri = (0, _ensureExist2.default)(proxyUri, 'proxyUri');
    _this._defaultProxyRetry = defaultProxyRetry;

    _this._reducer = (0, _getProxyFrameOAuthReducer2.default)(_this.actionTypes);

    _this._loggedIn = false;
    return _this;
  }

  (0, _createClass3.default)(ProxyFrameOAuth, [{
    key: '_onStateChange',
    value: function _onStateChange() {
      (0, _get3.default)(ProxyFrameOAuth.prototype.__proto__ || (0, _getPrototypeOf2.default)(ProxyFrameOAuth.prototype), '_onStateChange', this).call(this);
      if (this._auth.loggedIn === this._loggedIn) {
        return;
      }
      this._loggedIn = this._auth.loggedIn;
      if (this._loggedIn && this._auth.isImplicit) {
        console.log('new login, start refresh token timeout');
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
    key: '_handleCallbackUri',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(options) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _get3.default)(ProxyFrameOAuth.prototype.__proto__ || (0, _getPrototypeOf2.default)(ProxyFrameOAuth.prototype), '_handleCallbackUri', this).call(this, options);

              case 2:
                if (this._auth.isImplicit && this._auth.loggedIn) {
                  this._createImplicitRefreshTimeout();
                }

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _handleCallbackUri(_x2) {
        return _ref4.apply(this, arguments);
      }

      return _handleCallbackUri;
    }()
  }, {
    key: '_retrySetupProxyFrame',
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
    key: '_destroyProxyFrame',
    value: function _destroyProxyFrame() {
      document.body.removeChild(this._proxyFrame);
      this._proxyFrame = null;
      window.removeEventListener('message', this._callbackHandler);
    }
  }, {
    key: 'setupOAuth',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._proxyFrame) {
                  this.store.dispatch({
                    type: this.actionTypes.setupProxy
                  });
                  this._createProxyFrame();
                }

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setupOAuth() {
        return _ref5.apply(this, arguments);
      }

      return setupOAuth;
    }()
  }, {
    key: 'destroyOAuth',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
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
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function destroyOAuth() {
        return _ref6.apply(this, arguments);
      }

      return destroyOAuth;
    }()
  }, {
    key: 'openOAuthPage',
    value: function openOAuthPage() {
      if (this.oAuthReady) {
        this._proxyFrame.contentWindow.postMessage({
          oAuthUri: this.oAuthUri
        }, '*');
      }
    }
  }, {
    key: '_createImplicitRefreshIframe',
    value: function _createImplicitRefreshIframe() {
      var _this3 = this;

      this._clearImplicitRefreshIframe();
      this._implicitRefreshFrame = document.createElement('iframe');
      this._implicitRefreshFrame.src = this.implictRefreshOAuthUri;
      this._implicitRefreshFrame.style.display = 'none';
      document.body.appendChild(this._implicitRefreshFrame);
      // eslint-disable-next-line
      this._implictitRefreshCallBack = function (_ref7) {
        var origin = _ref7.origin,
            data = _ref7.data;
        var refreshCallbackUri = data.refreshCallbackUri;

        if (refreshCallbackUri && _this3._auth.loggedIn) {
          _this3._handleCallbackUri(refreshCallbackUri, true);
          _this3._clearImplicitRefreshIframe();
        }
      };
      window.addEventListener('message', this._implictitRefreshCallBack);
    }
  }, {
    key: '_clearImplicitRefreshIframe',
    value: function _clearImplicitRefreshIframe() {
      if (this._implicitRefreshFrame) {
        document.body.removeChild(this._implicitRefreshFrame);
        this._implicitRefreshFrame = null;
        window.removeEventListener('message', this._implictitRefreshCallBack);
        this._callbackHandler = null;
      }
    }

    // create a time out to refresh implicit flow token

  }, {
    key: '_createImplicitRefreshTimeout',
    value: function _createImplicitRefreshTimeout() {
      var _this4 = this;

      if (this._implicitRefreshTimeoutId) {
        clearTimeout(this._implicitRefreshTimeoutId);
      }
      var authData = this._auth.token;
      var refreshTokenExpiresIn = authData.expiresIn;
      var expireTime = authData.expireTime;

      if (!refreshTokenExpiresIn || !expireTime) {
        return;
      }
      // set refresh time to (token exposre time) / 3
      var refreshTokenTimeoutTime = parseInt(refreshTokenExpiresIn, 10) * 1000 / 3;
      if (refreshTokenTimeoutTime + Date.now() > expireTime) {
        refreshTokenTimeoutTime = expireTime - Date.now() - 5000;
        if (refreshTokenTimeoutTime < 0) {
          return;
        }
      }
      this._implicitRefreshTimeoutId = setTimeout(function () {
        if (!_this4._auth.loggedIn) {
          return;
        }
        if (_this4._tabManager && !_this4._tabManager.active) {
          _this4._createImplicitRefreshTimeout();
          return;
        }
        _this4._createImplicitRefreshIframe();
        _this4._implicitRefreshTimeoutId = null;
      }, refreshTokenTimeoutTime);
    }
  }, {
    key: 'name',
    get: function get() {
      return 'proxyFrameOAuth';
    }
  }, {
    key: '_actionTypes',
    get: function get() {
      return _actionTypes2.default;
    }
  }, {
    key: 'proxyUri',
    get: function get() {
      return _url2.default.resolve(window.location.href, this._proxyUri) + '?hash=' + encodeURIComponent(btoa(this._uuid)) + '&prefix=' + encodeURIComponent(this.prefix);
    }
  }, {
    key: 'proxyRetryCount',
    get: function get() {
      return this.state.proxyRetryCount;
    }
  }]);
  return ProxyFrameOAuth;
}(_OAuthBase3.default), (_applyDecoratedDescriptor(_class2.prototype, 'setupOAuth', [_background2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'setupOAuth'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'destroyOAuth', [_background2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'destroyOAuth'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'openOAuthPage', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'openOAuthPage'), _class2.prototype)), _class2)) || _class);
exports.default = ProxyFrameOAuth;
//# sourceMappingURL=index.js.map
