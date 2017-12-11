'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _Enum2 = _interopRequireDefault(_Enum);

var _di = require('ringcentral-integration/lib/di');

var _redux = require('redux');

var _reselect = require('reselect');

var _proxify = require('ringcentral-integration/lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _getter = require('ringcentral-integration/lib/getter');

var _getter2 = _interopRequireDefault(_getter);

var _ensureExist = require('ringcentral-integration/lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _getModuleStatusReducer = require('ringcentral-integration/lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _moduleActionTypes = require('ringcentral-integration/enums/moduleActionTypes');

var _moduleActionTypes2 = _interopRequireDefault(_moduleActionTypes);

var _callErrors = require('ringcentral-integration/modules/Call/callErrors');

var _callErrors2 = _interopRequireDefault(_callErrors);

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

function getToNumberFieldReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var _ref = arguments[1];
    var type = _ref.type,
        phoneNumber = _ref.phoneNumber;

    switch (type) {
      case types.setToNumberField:
      case types.loadLastCallState:
      case types.call:
        return phoneNumber;
      case types.setRecipient:
      case types.clearToNumberField:
      case types.resetSuccess:
      case types.callSuccess:
        return '';
      default:
        return state;
    }
  };
}
function getRecipientReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        recipient = _ref2.recipient;

    switch (type) {
      case types.setRecipient:
      case types.loadLastCallState:
      case types.call:
        return recipient;
      case types.clearRecipient:
      case types.resetSuccess:
      case types.callSuccess:
        return null;
      default:
        return state;
    }
  };
}

var DialerUI = (_dec = (0, _di.Module)({
  name: 'DialerUI',
  deps: ['Call', 'Alert', { dep: 'DialerUIOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(DialerUI, _RcModule);

  function DialerUI(_ref3) {
    var call = _ref3.call,
        alert = _ref3.alert,
        options = (0, _objectWithoutProperties3.default)(_ref3, ['call', 'alert']);
    (0, _classCallCheck3.default)(this, DialerUI);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialerUI.__proto__ || (0, _getPrototypeOf2.default)(DialerUI)).call(this, (0, _extends3.default)({}, options)));

    _this._call = _ensureExist2.default.call(_this, call, 'call');
    _this._alert = _ensureExist2.default.call(_this, alert, 'alert');
    _this._storageKey = 'dialerUIData';
    return _this;
  }

  (0, _createClass3.default)(DialerUI, [{
    key: '_onStateChange',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.pending && this._call.ready) {
                  this.store.dispatch({
                    type: this.actionTypes.init
                  });
                  this.store.dispatch({
                    type: this.actionTypes.initSuccess
                  });
                } else if (this.ready && !this._call.ready) {
                  this.store.dispatch({
                    type: this.actionTypes.reset
                  });
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref4.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: 'clearToNumberField',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.clearToNumberField
                });

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function clearToNumberField() {
        return _ref5.apply(this, arguments);
      }

      return clearToNumberField;
    }()
  }, {
    key: 'setToNumberField',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(phoneNumber) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.toNumberField !== phoneNumber) {
                  this.store.dispatch({
                    type: this.actionTypes.setToNumberField,
                    phoneNumber: phoneNumber
                  });
                }

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setToNumberField(_x3) {
        return _ref6.apply(this, arguments);
      }

      return setToNumberField;
    }()
  }, {
    key: 'setRecipient',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(recipient) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.setRecipient,
                  recipient: recipient
                });

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setRecipient(_x4) {
        return _ref7.apply(this, arguments);
      }

      return setRecipient;
    }()
  }, {
    key: 'clearRecipient',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.clearRecipient
                });

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function clearRecipient() {
        return _ref8.apply(this, arguments);
      }

      return clearRecipient;
    }()
  }, {
    key: 'call',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_ref10) {
        var _ref10$phoneNumber = _ref10.phoneNumber,
            phoneNumber = _ref10$phoneNumber === undefined ? '' : _ref10$phoneNumber,
            _ref10$recipient = _ref10.recipient,
            recipient = _ref10$recipient === undefined ? null : _ref10$recipient;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(phoneNumber || recipient)) {
                  _context6.next = 11;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.call,
                  phoneNumber: phoneNumber,
                  recipient: recipient
                });
                _context6.prev = 2;
                _context6.next = 5;
                return this._call.call({
                  phoneNumber: this.toNumberField,
                  recipient: this.recipient
                });

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.callSuccess
                });
                _context6.next = 11;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6['catch'](2);

                this.store.dispatch({
                  type: this.actionTypes.callError,
                  error: _context6.t0
                });

              case 11:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 8]]);
      }));

      function call(_x5) {
        return _ref9.apply(this, arguments);
      }

      return call;
    }()
  }, {
    key: 'onCallButtonClick',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(('' + this.toNumberField).trim().length === 0 && !this.recipient)) {
                  _context7.next = 4;
                  break;
                }

                if (!this._call.lastRecipient && !this._call.lastPhoneNumber) {
                  this._alert.warning({
                    message: _callErrors2.default.noToNumber
                  });
                } else {
                  this.store.dispatch({
                    type: this.actionTypes.loadLastCallState,
                    phoneNumber: this._call.lastPhoneNumber,
                    recipient: this._call.lastRecipient
                  });
                }
                _context7.next = 6;
                break;

              case 4:
                _context7.next = 6;
                return this.call({
                  phoneNumber: this.toNumberField,
                  recipient: this.recipient
                });

              case 6:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function onCallButtonClick() {
        return _ref11.apply(this, arguments);
      }

      return onCallButtonClick;
    }()
  }, {
    key: '_actionTypes',
    get: function get() {
      return new _Enum2.default([].concat((0, _toConsumableArray3.default)((0, _keys2.default)(_moduleActionTypes2.default)), ['setToNumberField', 'clearToNumberField', 'setRecipient', 'clearRecipient', 'loadLastCallState', 'call', 'callError', 'callSuccess']), 'dialerUI');
    }
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _redux.combineReducers)({
        status: (0, _getModuleStatusReducer2.default)(this.actionTypes),
        toNumberField: getToNumberFieldReducer(this.actionTypes),
        recipient: getRecipientReducer(this.actionTypes)
      });
    }
  }, {
    key: 'lastDialedState',
    get: function get() {
      return this._storage.getItem(this._storageKey);
    }
  }, {
    key: 'toNumberField',
    get: function get() {
      return this.state.toNumberField;
    }
  }, {
    key: 'recipient',
    get: function get() {
      return this.state.recipient;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }]);
  return DialerUI;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'clearToNumberField', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'clearToNumberField'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'setToNumberField', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'setToNumberField'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'setRecipient', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'setRecipient'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'clearRecipient', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'clearRecipient'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'call', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'call'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onCallButtonClick', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'onCallButtonClick'), _class2.prototype)), _class2)) || _class);
exports.default = DialerUI;
//# sourceMappingURL=index.js.map
