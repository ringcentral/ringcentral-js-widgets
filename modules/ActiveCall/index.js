'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getActiveCallReducer = require('./getActiveCallReducer');

var _getActiveCallReducer2 = _interopRequireDefault(_getActiveCallReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActiveCall = function (_RcModule) {
  (0, _inherits3.default)(ActiveCall, _RcModule);

  function ActiveCall(_ref) {
    var webphone = _ref.webphone,
        options = (0, _objectWithoutProperties3.default)(_ref, ['webphone']);
    (0, _classCallCheck3.default)(this, ActiveCall);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveCall.__proto__ || (0, _getPrototypeOf2.default)(ActiveCall)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._webphone = webphone;
    _this._reducer = (0, _getActiveCallReducer2.default)(_this.actionTypes);

    _this._session = null;

    _this.toggleMinimized = _this.toggleMinimized.bind(_this);
    _this.hangup = _this.hangup.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ActiveCall, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this._shouldReset()) {
        this.store.dispatch({
          type: this.actionTypes.resetSuccess
        });
      } else if (this.ready) {
        if (this._session !== this._webphone.activeSession) {
          this._session = this._webphone.activeSession;
          if (this._session === null) {
            this.store.dispatch({
              type: this.actionTypes.destroySession
            });
          } else {
            this.store.dispatch({
              type: this.actionTypes.newSession,
              id: this._session.id
            });
          }
        }
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return !this.ready && this._webphone.ready;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return this.ready && !this._webphone.ready;
    }
  }, {
    key: 'toggleMinimized',
    value: function toggleMinimized() {
      this.store.dispatch({
        type: this.actionTypes.toggleMinimized
      });
    }
  }, {
    key: 'hangup',
    value: function hangup() {
      if (!this._session || !this._webphone) {
        return;
      }
      this._webphone.hangup(this._webphone.activeSession);
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatus2.default.ready;
    }
  }, {
    key: 'minimized',
    get: function get() {
      return this.state.minimized;
    }
  }, {
    key: 'active',
    get: function get() {
      return !!this.state.sessionId;
    }
  }]);
  return ActiveCall;
}(_RcModule3.default);

exports.default = ActiveCall;
//# sourceMappingURL=index.js.map
