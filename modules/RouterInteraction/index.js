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

var _di = require('ringcentral-integration/lib/di');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _proxify = require('ringcentral-integration/lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _moduleStatuses = require('ringcentral-integration/enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

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

function getDefaultHistory() {
  return (0, _reactRouter.useRouterHistory)(_reactRouter.createMemoryHistory)();
}

var RouterInteraction = (_dec = (0, _di.Module)({
  deps: [{ dep: 'RouterInteractionOptions', optional: true, spread: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(RouterInteraction, _RcModule);

  function RouterInteraction(_ref) {
    var _ref$history = _ref.history,
        history = _ref$history === undefined ? getDefaultHistory() : _ref$history,
        options = (0, _objectWithoutProperties3.default)(_ref, ['history']);
    (0, _classCallCheck3.default)(this, RouterInteraction);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RouterInteraction.__proto__ || (0, _getPrototypeOf2.default)(RouterInteraction)).call(this, (0, _extends3.default)({}, options)));

    _this._reducer = _reactRouterRedux.routerReducer;
    _this._history = history;
    return _this;
  }

  (0, _createClass3.default)(RouterInteraction, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this._history = (0, _reactRouterRedux.syncHistoryWithStore)(this._history, this.store, {
        selectLocationState: function selectLocationState() {
          return _this2.state;
        }
      });
    }
  }, {
    key: 'initializeProxy',
    value: function initializeProxy() {
      var _this3 = this;

      this._history = (0, _reactRouterRedux.syncHistoryWithStore)(this._history, this.store, {
        selectLocationState: function selectLocationState() {
          return _this3.state;
        }
      });
    }
  }, {
    key: '_onStateChange',
    value: function _onStateChange() {
      /* do nothing */
    }
  }, {
    key: 'push',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var _history;

        var _args = arguments;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (_history = this._history).push.apply(_history, _args);

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function push() {
        return _ref2.apply(this, arguments);
      }

      return push;
    }()
  }, {
    key: 'replace',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _history2;

        var _args2 = arguments;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (_history2 = this._history).replace.apply(_history2, _args2);

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function replace() {
        return _ref3.apply(this, arguments);
      }

      return replace;
    }()
  }, {
    key: 'goBack',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _history3;

        var _args3 = arguments;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                (_history3 = this._history).goBack.apply(_history3, _args3);

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function goBack() {
        return _ref4.apply(this, arguments);
      }

      return goBack;
    }()
  }, {
    key: '_actionTypes',
    get: function get() {
      /* no action types */
      return null;
    }
  }, {
    key: 'history',
    get: function get() {
      return this._history;
    }
  }, {
    key: 'currentPath',
    get: function get() {
      return this.state.locationBeforeTransitions.pathname;
    }
  }, {
    key: 'status',
    get: function get() {
      return _moduleStatuses2.default.ready;
    }
  }, {
    key: 'actionTypes',
    get: function get() {
      return {
        locationChange: _reactRouterRedux.LOCATION_CHANGE
      };
    }
  }]);
  return RouterInteraction;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'push', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'push'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'replace', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'replace'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'goBack', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'goBack'), _class2.prototype)), _class2)) || _class);
exports.default = RouterInteraction;
//# sourceMappingURL=index.js.map
