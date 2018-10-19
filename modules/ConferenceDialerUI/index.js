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

var _di = require('ringcentral-integration/lib/di');

var _proxify = require('ringcentral-integration/lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _DialerUI2 = require('../DialerUI');

var _DialerUI3 = _interopRequireDefault(_DialerUI2);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getReducer = require('./getReducer');

var _getReducer2 = _interopRequireDefault(_getReducer);

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

var ConferenceDialerUI = (_dec = (0, _di.Module)({
  name: 'ConferenceDialerUI',
  deps: ['ConferenceCall']
}), _dec(_class = (_class2 = function (_DialerUI) {
  (0, _inherits3.default)(ConferenceDialerUI, _DialerUI);

  function ConferenceDialerUI(_ref) {
    var conferenceCall = _ref.conferenceCall,
        options = (0, _objectWithoutProperties3.default)(_ref, ['conferenceCall']);
    (0, _classCallCheck3.default)(this, ConferenceDialerUI);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConferenceDialerUI.__proto__ || (0, _getPrototypeOf2.default)(ConferenceDialerUI)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._conferenceCall = conferenceCall;
    _this._reducer = (0, _getReducer2.default)(_this.actionTypes);
    return _this;
  }

  (0, _createClass3.default)(ConferenceDialerUI, [{
    key: 'setLastSessionId',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(sessionId) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.lastSessionId !== sessionId) {
                  this.clearRecipient();
                  this.clearToNumberField();
                }
                this.store.dispatch({
                  type: this.actionTypes.setLastSessionId,
                  sessionId: sessionId
                });

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setLastSessionId(_x) {
        return _ref2.apply(this, arguments);
      }

      return setLastSessionId;
    }()
  }, {
    key: '_onBeforeCall',
    value: function _onBeforeCall(fromSessionId) {
      if (fromSessionId && this._conferenceCall.mergingPair && !this._conferenceCall.mergingPair.fromSessionId) {
        // set mergingPair if has
        this._conferenceCall.setMergeParty({
          fromSessionId: fromSessionId
        });
      }
    }
  }, {
    key: 'lastSessionId',
    get: function get() {
      return this.state.lastSessionId;
    }
  }]);
  return ConferenceDialerUI;
}(_DialerUI3.default), (_applyDecoratedDescriptor(_class2.prototype, 'setLastSessionId', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'setLastSessionId'), _class2.prototype)), _class2)) || _class);
exports.default = ConferenceDialerUI;
//# sourceMappingURL=index.js.map
