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

var _di = require('../../lib/di');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _isBlank = require('../../lib/isBlank');

var _isBlank2 = _interopRequireDefault(_isBlank);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getComposeTextReducer = require('./getComposeTextReducer');

var _getComposeTextReducer2 = _interopRequireDefault(_getComposeTextReducer);

var _getCacheReducer = require('./getCacheReducer');

var _getCacheReducer2 = _interopRequireDefault(_getCacheReducer);

var _messageSenderMessages = require('../MessageSender/messageSenderMessages');

var _messageSenderMessages2 = _interopRequireDefault(_messageSenderMessages);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

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

/**
 * @class
 * @description Compose text managing module
 */
var ComposeText = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Auth', 'Storage', 'MessageSender', 'NumberValidate', 'ContactSearch', { dep: 'ComposeTextOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(ComposeText, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Storage} params.storage - storage module instance
   * @param {MessageSender} params.messageSender - messageSender module instance
   * @param {NumberValidate} params.numberValidate - numberValidate module instance
   * @param {ContactSearch} params.contactSearch - contactSearch module instance
   */
  function ComposeText(_ref) {
    var alert = _ref.alert,
        auth = _ref.auth,
        storage = _ref.storage,
        messageSender = _ref.messageSender,
        numberValidate = _ref.numberValidate,
        contactSearch = _ref.contactSearch,
        options = (0, _objectWithoutProperties3.default)(_ref, ['alert', 'auth', 'storage', 'messageSender', 'numberValidate', 'contactSearch']);
    (0, _classCallCheck3.default)(this, ComposeText);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ComposeText.__proto__ || (0, _getPrototypeOf2.default)(ComposeText)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._alert = alert;
    _this._auth = auth;
    _this._storage = storage;
    _this._storageKey = 'composeText';
    _this._reducer = (0, _getComposeTextReducer2.default)(_this.actionTypes);
    _this._cacheReducer = (0, _getCacheReducer2.default)(_this.actionTypes);
    _this._messageSender = messageSender;
    _this._numberValidate = numberValidate;
    _this._contactSearch = contactSearch;
    _this._lastContactSearchResult = [];
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
        if (this._auth.isFreshLogin) {
          this.clean();
        }
        this._initSenderNumber();
      } else if (this._shouldHandleRecipient()) {
        this._handleRecipient();
      } else if (this._shouldReset()) {
        this._resetModuleStatus();
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._messageSender.ready && this._auth.ready && !this.ready;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return !this._messageSender.ready && this.ready;
    }
  }, {
    key: '_shouldHandleRecipient',
    value: function _shouldHandleRecipient() {
      return this.ready && !!this._contactSearch && this._contactSearch.ready && this._contactSearch.searchResult.length > 0 && this._contactSearch.searchResult !== this._lastContactSearchResult;
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
      var cachedPhoneNumber = this.cache && this.cache.senderNumber;
      if (cachedPhoneNumber) {
        this.updateSenderNumber(cachedPhoneNumber);
      } else {
        this.updateSenderNumber(this._messageSender.senderNumbersList[0] && this._messageSender.senderNumbersList[0].phoneNumber);
      }
    }
  }, {
    key: '_handleRecipient',
    value: function _handleRecipient() {
      var dummy = this.toNumbers.find(function (toNumber) {
        return !toNumber.entityType;
      });
      if (dummy) {
        var recipient = this._contactSearch.searchResult.find(function (item) {
          return item.id === dummy.id;
        });
        if (recipient) {
          this.addToNumber(recipient);
          this._lastContactSearchResult = this._contactSearch.searchResult.slice();
        }
      }
    }
  }, {
    key: '_alertWarning',
    value: function _alertWarning(message) {
      if (message) {
        var ttlConfig = message !== _messageSenderMessages2.default.noAreaCode ? { ttl: 0 } : null;
        this._alert.warning((0, _extends3.default)({
          message: message
        }, ttlConfig));
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
                return _context.abrupt('return', this._messageSender.send({ fromNumber: fromNumber, toNumbers: toNumbers, text: text }));

              case 11:
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
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(number) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updateSenderNumber,
                  number: number || ''
                });

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateSenderNumber(_x) {
        return _ref3.apply(this, arguments);
      }

      return updateSenderNumber;
    }()
  }, {
    key: 'updateTypingToNumber',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(number) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(number.length > 30)) {
                  _context3.next = 3;
                  break;
                }

                this._alertWarning(_messageSenderMessages2.default.recipientNumberInvalids);
                return _context3.abrupt('return');

              case 3:
                this.store.dispatch({
                  type: this.actionTypes.updateTypingToNumber,
                  number: number
                });

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateTypingToNumber(_x2) {
        return _ref4.apply(this, arguments);
      }

      return updateTypingToNumber;
    }()
  }, {
    key: 'onToNumberMatch',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref6) {
        var entityId = _ref6.entityId;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.toNumberMatched,
                  entityId: entityId
                });

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onToNumberMatch(_x3) {
        return _ref5.apply(this, arguments);
      }

      return onToNumberMatch;
    }()
  }, {
    key: 'addToRecipients',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(recipient) {
        var shouldClean = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.addToNumber(recipient);

              case 2:
                if (!shouldClean) {
                  _context5.next = 5;
                  break;
                }

                _context5.next = 5;
                return this.cleanTypingToNumber();

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addToRecipients(_x4) {
        return _ref7.apply(this, arguments);
      }

      return addToRecipients;
    }()
  }, {
    key: 'cleanTypingToNumber',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.cleanTypingToNumber
                });

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function cleanTypingToNumber() {
        return _ref8.apply(this, arguments);
      }

      return cleanTypingToNumber;
    }()
  }, {
    key: 'addToNumber',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(number) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(0, _isBlank2.default)(number.phoneNumber)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt('return');

              case 2:
                if (this._validatePhoneNumber(number.phoneNumber)) {
                  _context7.next = 4;
                  break;
                }

                return _context7.abrupt('return');

              case 4:
                this.store.dispatch({
                  type: this.actionTypes.addToNumber,
                  number: number
                });

              case 5:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function addToNumber(_x6) {
        return _ref9.apply(this, arguments);
      }

      return addToNumber;
    }()
  }, {
    key: 'removeToNumber',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(number) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.removeToNumber,
                  number: number
                });

              case 1:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function removeToNumber(_x7) {
        return _ref10.apply(this, arguments);
      }

      return removeToNumber;
    }()
  }, {
    key: 'updateMessageText',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(text) {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(text.length > 1000)) {
                  _context9.next = 3;
                  break;
                }

                this._alertWarning(_messageSenderMessages2.default.textTooLong);
                return _context9.abrupt('return');

              case 3:
                this.store.dispatch({
                  type: this.actionTypes.updateMessageText,
                  text: text
                });

              case 4:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function updateMessageText(_x8) {
        return _ref11.apply(this, arguments);
      }

      return updateMessageText;
    }()
  }, {
    key: 'clean',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.clean
                });

              case 1:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function clean() {
        return _ref12.apply(this, arguments);
      }

      return clean;
    }()
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
      return this.status === _moduleStatuses2.default.ready;
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
    key: 'toNumberEntity',
    get: function get() {
      return this.state.toNumberEntity;
    }
  }, {
    key: 'messageText',
    get: function get() {
      return this.state.messageText;
    }
  }]);
  return ComposeText;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'send', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'send'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateSenderNumber', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateSenderNumber'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateTypingToNumber', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateTypingToNumber'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onToNumberMatch', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'onToNumberMatch'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'addToRecipients', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'addToRecipients'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'cleanTypingToNumber', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'cleanTypingToNumber'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'addToNumber', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'addToNumber'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'removeToNumber', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'removeToNumber'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateMessageText', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateMessageText'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'clean', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'clean'), _class2.prototype)), _class2)) || _class);
exports.default = ComposeText;
//# sourceMappingURL=index.js.map
