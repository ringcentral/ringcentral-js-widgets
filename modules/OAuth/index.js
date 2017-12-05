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

var _background = require('ringcentral-integration/lib/background');

var _background2 = _interopRequireDefault(_background);

var _proxify = require('ringcentral-integration/lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _popWindow = require('ringcentral-integration/lib/popWindow');

var _popWindow2 = _interopRequireDefault(_popWindow);

var _di = require('ringcentral-integration/lib/di');

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

var OAuth = (_dec = (0, _di.Module)({
  name: 'OAuth',
  deps: [{ dep: 'OAuthOptions', optional: true }]
}), _dec(_class = (_class2 = function (_OAuthBase) {
  (0, _inherits3.default)(OAuth, _OAuthBase);

  function OAuth(_ref) {
    var _ref$redirectUri = _ref.redirectUri,
        redirectUri = _ref$redirectUri === undefined ? './redirect.html' : _ref$redirectUri,
        options = (0, _objectWithoutProperties3.default)(_ref, ['redirectUri']);
    (0, _classCallCheck3.default)(this, OAuth);
    return (0, _possibleConstructorReturn3.default)(this, (OAuth.__proto__ || (0, _getPrototypeOf2.default)(OAuth)).call(this, (0, _extends3.default)({
      redirectUri: redirectUri
    }, options)));
  }

  (0, _createClass3.default)(OAuth, [{
    key: 'setupOAuth',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.oAuthReady) {
                  window.oAuthCallback = function (callbackUri) {
                    return _this2._handleCallbackUri(callbackUri);
                  };
                  this.store.dispatch({
                    type: this.actionTypes.setupOAuth
                  });
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setupOAuth() {
        return _ref2.apply(this, arguments);
      }

      return setupOAuth;
    }()
  }, {
    key: 'destroyOAuth',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
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
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function destroyOAuth() {
        return _ref3.apply(this, arguments);
      }

      return destroyOAuth;
    }()
  }, {
    key: 'openOAuthPage',
    value: function openOAuthPage() {
      if (this.oAuthReady) {
        (0, _popWindow2.default)(this.oAuthUri, 'rc-oauth', 600, 600);
      }
    }
  }, {
    key: 'name',
    get: function get() {
      return 'OAuth';
    }
  }]);
  return OAuth;
}(_OAuthBase3.default), (_applyDecoratedDescriptor(_class2.prototype, 'setupOAuth', [_background2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'setupOAuth'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'destroyOAuth', [_background2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'destroyOAuth'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'openOAuthPage', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'openOAuthPage'), _class2.prototype)), _class2)) || _class);
exports.default = OAuth;
//# sourceMappingURL=index.js.map
