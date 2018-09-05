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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _di = require('../../lib/di');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getQuickAccessReducer = require('./getQuickAccessReducer');

var _getQuickAccessReducer2 = _interopRequireDefault(_getQuickAccessReducer);

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

var QuickAccess = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Storage', 'Webphone']
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(QuickAccess, _RcModule);

  function QuickAccess(_ref) {
    var auth = _ref.auth,
        webphone = _ref.webphone,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'webphone']);
    (0, _classCallCheck3.default)(this, QuickAccess);

    var _this = (0, _possibleConstructorReturn3.default)(this, (QuickAccess.__proto__ || (0, _getPrototypeOf2.default)(QuickAccess)).call(this, (0, _extends3.default)({
      actionTypes: _actionTypes2.default
    }, options)));

    _this._auth = auth;
    _this._webphone = webphone;
    _this._reducer = (0, _getQuickAccessReducer2.default)(_this.actionTypes);
    return _this;
  }

  (0, _createClass3.default)(QuickAccess, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this._auth.ready && !this.ready) {
                  this.store.dispatch({
                    type: this.actionTypes.initSuccess
                  });
                } else if (!this._auth.ready && this.ready) {
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                }
                // When there is an incoming call,
                // the page should be dismissed
                if (this._webphone.ready && this._webphone.ringSession && this._webphone.ringSession !== this._lastRingSession) {
                  this._lastRingSession = this._webphone.ringSession;
                  this.exit();
                }

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: 'enter',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updatePage,
                  entered: true
                });

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function enter() {
        return _ref3.apply(this, arguments);
      }

      return enter;
    }()
  }, {
    key: 'exit',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updatePage,
                  entered: false
                });

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function exit() {
        return _ref4.apply(this, arguments);
      }

      return exit;
    }()
  }, {
    key: 'entered',
    get: function get() {
      return this.state.entered;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }]);
  return QuickAccess;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'enter', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'enter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'exit', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'exit'), _class2.prototype)), _class2)) || _class);
exports.default = QuickAccess;
//# sourceMappingURL=index.js.map
