'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _RcModule2 = require('ringcentral-integration/lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDefaultHistory() {
  // if (typeof window !== 'undefined') {
  //   console.debug('hashHistory');
  //   return hashHistory;
  // }
  // console.debug('memoryHistory');
  return (0, _reactRouter.useRouterHistory)(_reactRouter.createMemoryHistory)();
}

var RouterInteraction = function (_RcModule) {
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

      (0, _reactRouterRedux.syncHistoryWithStore)(this._history, this.store, {
        selectLocationState: function selectLocationState() {
          return _this2.state;
        }
      });
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
  }]);
  return RouterInteraction;
}(_RcModule3.default);

exports.default = RouterInteraction;
//# sourceMappingURL=index.js.map
