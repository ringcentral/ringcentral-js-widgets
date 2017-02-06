'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _isBlank = require('../../lib/isBlank');

var _isBlank2 = _interopRequireDefault(_isBlank);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _composeTextActionTypes = require('./composeTextActionTypes');

var _composeTextActionTypes2 = _interopRequireDefault(_composeTextActionTypes);

var _getComposeTextReducer = require('./getComposeTextReducer');

var _getComposeTextReducer2 = _interopRequireDefault(_getComposeTextReducer);

var _getCacheReducer = require('./getCacheReducer');

var _getCacheReducer2 = _interopRequireDefault(_getCacheReducer);

var _messageSenderMessages = require('../MessageSender/messageSenderMessages');

var _messageSenderMessages2 = _interopRequireDefault(_messageSenderMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComposeText = function (_RcModule) {
  (0, _inherits3.default)(ComposeText, _RcModule);

  function ComposeText(_ref) {
    var alert = _ref.alert,
        storage = _ref.storage,
        messageSender = _ref.messageSender,
        numberValidate = _ref.numberValidate,
        options = (0, _objectWithoutProperties3.default)(_ref, ['alert', 'storage', 'messageSender', 'numberValidate']);
    (0, _classCallCheck3.default)(this, ComposeText);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ComposeText.__proto__ || (0, _getPrototypeOf2.default)(ComposeText)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _composeTextActionTypes2.default
    })));

    _this._alert = alert;
    _this._storage = storage;
    _this._storageKey = 'composeText';
    _this._reducer = (0, _getComposeTextReducer2.default)(_this.actionTypes);
    _this._cacheReducer = (0, _getCacheReducer2.default)(_this.actionTypes);
    _this._messageSender = messageSender;
    _this._numberValidate = numberValidate;
    _this.send = _this.send.bind(_this);
    _this.updateSenderNumber = _this.updateSenderNumber.bind(_this);
    _this.updateTypingToNumber = _this.updateTypingToNumber.bind(_this);
    _this.cleanTypingToNumber = _this.cleanTypingToNumber.bind(_this);
    _this.addToNumber = _this.addToNumber.bind(_this);
    _this.removeToNumber = _this.removeToNumber.bind(_this);
    _this.updateMessageText = _this.updateMessageText.bind(_this);
    _this.clean = _this.clean.bind(_this);
    storage.registerReducer({ key: _this._storageKey, reducer: _this._cacheReducer });
    return _this;
  }

  (0, _createClass3.default)(ComposeText, [{
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
        this._initSenderNumber();
      } else if (this._shouldReset()) {
        this._resetModuleStatus();
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._messageSender.ready && !this.ready;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return !this._messageSender.ready && this.ready;
    }
  }, {
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: '_initSenderNumber',
    value: function _initSenderNumber() {
      var defaultPhoneNumber = null;
      var cachedPhoneNumber = this.cache && this.cache.senderNumber;
      if (cachedPhoneNumber) {
        defaultPhoneNumber = cachedPhoneNumber;
      } else {
        defaultPhoneNumber = this._messageSender.senderNumbersList[0];
      }
      this.updateSenderNumber(defaultPhoneNumber);
    }
  }, {
    key: '_alertWarning',
    value: function _alertWarning(message) {
      if (message) {
        this._alert.warning({
          message: message
        });
        return true;
      }
      return false;
    }
  }, {
    key: '_validatePhoneNumber',
    value: function _validatePhoneNumber(phoneNumber) {
      var validateResult = this._numberValidate.validateFormat([phoneNumber]);
      if (!validateResult.result) {
        var error = validateResult.errors[0];
        if (error && this._alertWarning(_messageSenderMessages2.default[error.type])) {
          return false;
        }
        this._alertWarning(_messageSenderMessages2.default.recipientNumberInvalids);
        return false;
      }
      return true;
    }
  }, {
    key: 'send',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var text, fromNumber, toNumbers, typingToNumber;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                text = this.messageText;
                fromNumber = this.senderNumber;
                toNumbers = this.toNumbers.map(function (number) {
                  return number.phoneNumber;
                });
                typingToNumber = this.typingToNumber;

                if ((0, _isBlank2.default)(typingToNumber)) {
                  _context.next = 10;
                  break;
                }

                if (!this._validatePhoneNumber(typingToNumber)) {
                  _context.next = 9;
                  break;
                }

                toNumbers.push(typingToNumber);
                _context.next = 10;
                break;

              case 9:
                return _context.abrupt('return', null);

              case 10:
                _context.next = 12;
                return this._messageSender.send({ fromNumber: fromNumber, toNumbers: toNumbers, text: text });

              case 12:
                return _context.abrupt('return', _context.sent);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function send() {
        return _ref2.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: 'updateSenderNumber',
    value: function updateSenderNumber(number) {
      this.store.dispatch({
        type: this.actionTypes.updateSenderNumber,
        number: number || ''
      });
    }
  }, {
    key: 'updateTypingToNumber',
    value: function updateTypingToNumber(number) {
      if (number.length > 30) {
        this._alertWarning(_messageSenderMessages2.default.recipientNumberInvalids);
        return;
      }
      this.store.dispatch({
        type: this.actionTypes.updateTypingToNumber,
        number: number
      });
    }
  }, {
    key: 'cleanTypingToNumber',
    value: function cleanTypingToNumber() {
      this.store.dispatch({
        type: this.actionTypes.cleanTypingToNumber
      });
    }
  }, {
    key: 'addToNumber',
    value: function addToNumber(number) {
      if ((0, _isBlank2.default)(number.phoneNumber)) {
        return;
      }
      if (!this._validatePhoneNumber(number.phoneNumber)) {
        return;
      }
      this.store.dispatch({
        type: this.actionTypes.addToNumber,
        number: number
      });
    }
  }, {
    key: 'removeToNumber',
    value: function removeToNumber(number) {
      this.store.dispatch({
        type: this.actionTypes.removeToNumber,
        number: number
      });
    }
  }, {
    key: 'updateMessageText',
    value: function updateMessageText(text) {
      if (text.length > 1000) {
        this._alertWarning(_messageSenderMessages2.default.textTooLong);
        return;
      }
      this.store.dispatch({
        type: this.actionTypes.updateMessageText,
        text: text
      });
    }
  }, {
    key: 'clean',
    value: function clean() {
      this.store.dispatch({
        type: this.actionTypes.clean
      });
    }
  }, {
    key: 'cache',
    get: function get() {
      return this._storage.getItem(this._storageKey);
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.status === _moduleStatus2.default.ready;
    }
  }, {
    key: 'senderNumber',
    get: function get() {
      return this.state.senderNumber;
    }
  }, {
    key: 'typingToNumber',
    get: function get() {
      return this.state.typingToNumber;
    }
  }, {
    key: 'toNumbers',
    get: function get() {
      return this.state.toNumbers;
    }
  }, {
    key: 'messageText',
    get: function get() {
      return this.state.messageText;
    }
  }]);
  return ComposeText;
}(_RcModule3.default);

exports.default = ComposeText;
//# sourceMappingURL=index.js.map
