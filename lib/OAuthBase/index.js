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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _desc, _value, _class2;

var _RcModule2 = require('ringcentral-integration/lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _Enum = require('ringcentral-integration/lib/Enum');

var _di = require('ringcentral-integration/lib/di');

var _ensureExist = require('ringcentral-integration/lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _proxify = require('ringcentral-integration/lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _parseCallbackUri = require('ringcentral-integration/lib/parseCallbackUri');

var _parseCallbackUri2 = _interopRequireDefault(_parseCallbackUri);

var _popWindow = require('ringcentral-integration/lib/popWindow');

var _popWindow2 = _interopRequireDefault(_popWindow);

var _required = require('ringcentral-integration/lib/required');

var _required2 = _interopRequireDefault(_required);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _baseActionTypes = require('./baseActionTypes');

var _baseActionTypes2 = _interopRequireDefault(_baseActionTypes);

var _getOAuthBaseReducer = require('./getOAuthBaseReducer');

var _getOAuthBaseReducer2 = _interopRequireDefault(_getOAuthBaseReducer);

var _oAuthMessages = require('./oAuthMessages');

var _oAuthMessages2 = _interopRequireDefault(_oAuthMessages);

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

var OAuth = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Alert', 'Locale', 'Brand', { dep: 'TabManager', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(OAuth, _RcModule);

  function OAuth(_ref) {
    var alert = _ref.alert,
        auth = _ref.auth,
        brand = _ref.brand,
        locale = _ref.locale,
        tabManager = _ref.tabManager,
        redirectUri = _ref.redirectUri,
        options = (0, _objectWithoutProperties3.default)(_ref, ['alert', 'auth', 'brand', 'locale', 'tabManager', 'redirectUri']);
    (0, _classCallCheck3.default)(this, OAuth);

    var _this = (0, _possibleConstructorReturn3.default)(this, (OAuth.__proto__ || (0, _getPrototypeOf2.default)(OAuth)).call(this, (0, _extends3.default)({}, options)));

    _this._alert = _ensureExist2.default.call(_this, alert, 'alert');
    _this._auth = _ensureExist2.default.call(_this, auth, 'auth');
    _this._brand = _ensureExist2.default.call(_this, brand, 'brand');
    _this._locale = _ensureExist2.default.call(_this, locale, 'locale');
    _this._tabManager = tabManager;
    _this._redirectUri = _url2.default.resolve(location.href, _ensureExist2.default.call(_this, redirectUri, 'redirectUri'));
    _this._reducer = (0, _getOAuthBaseReducer2.default)(_this.actionTypes);
    return _this;
  }

  (0, _createClass3.default)(OAuth, [{
    key: '_onStateChange',
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
    key: '_handleCallbackUri',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(callbackUri) {
        var code, message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                code = (0, _parseCallbackUri2.default)(callbackUri);

                if (!code) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return this._auth.login({
                  code: code,
                  redirectUri: this.redirectUri
                });

              case 5:
                _context.next = 18;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);
                message = void 0;
                _context.t1 = _context.t0.message;
                _context.next = _context.t1 === 'invalid_request' ? 13 : _context.t1 === 'unauthorized_client' ? 13 : _context.t1 === 'access_denied' ? 13 : _context.t1 === 'unsupported_response_type' ? 13 : _context.t1 === 'invalid_scope' ? 13 : _context.t1 === 'server_error' ? 15 : _context.t1 === 'temporarily_unavailable' ? 15 : 15;
                break;

              case 13:
                message = _oAuthMessages2.default.accessDenied;
                return _context.abrupt('break', 17);

              case 15:
                message = _oAuthMessages2.default.internalError;
                return _context.abrupt('break', 17);

              case 17:
                this._alert.danger({
                  message: message,
                  payload: _context.t0
                });

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function _handleCallbackUri(_x) {
        return _ref2.apply(this, arguments);
      }

      return _handleCallbackUri;
    }()
  }, {
    key: 'prepareOAuth',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function prepareOAuth() {
        return _ref3.apply(this, arguments);
      }

      return prepareOAuth;
    }()
  }, {
    key: 'destroyOAuth',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function destroyOAuth() {
        return _ref4.apply(this, arguments);
      }

      return destroyOAuth;
    }()
  }, {
    key: 'openOAuthPage',
    value: function openOAuthPage() {}
  }, {
    key: '_actionTypes',
    get: function get() {
      return (0, _Enum.prefixEnum)({ enumMap: _baseActionTypes2.default, prefix: this.name });
    }
  }, {
    key: 'name',
    get: function get() {
      /* require implementation in descendent */
    }
  }, {
    key: 'oAuthUri',
    get: function get() {
      var extendedQuery = _qs2.default.stringify({
        force: true,
        localeId: this._locale.currentLocale,
        ui_options: 'hide_remember_me hide_tos'
      });
      return this._auth.getLoginUrl({
        redirectUri: this.redirectUri,
        brandId: this._brand.id,
        state: btoa(Date.now()),
        display: 'page'
      }) + '&' + extendedQuery;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'oAuthReady',
    get: function get() {
      return this.state.oAuthReady;
    }
  }, {
    key: 'redirectUri',
    get: function get() {
      return _url2.default.resolve(location.href, this._redirectUri);
    }
  }]);
  return OAuth;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'name', [_required2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'name'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_handleCallbackUri', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_handleCallbackUri'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'prepareOAuth', [_required2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'prepareOAuth'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'destroyOAuth', [_required2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'destroyOAuth'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'openOAuthPage', [_required2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'openOAuthPage'), _class2.prototype)), _class2)) || _class);
exports.default = OAuth;
//# sourceMappingURL=index.js.map
