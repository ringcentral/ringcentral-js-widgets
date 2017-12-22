'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _di = require('../../lib/di');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getContactDetailsReducer = require('./getContactDetailsReducer');

var _getContactDetailsReducer2 = _interopRequireDefault(_getContactDetailsReducer);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _background = require('../../lib/background');

var _background2 = _interopRequireDefault(_background);

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

var ContactDetails = (_dec = (0, _di.Module)({
  deps: ['Contacts', { dep: 'ContactDetailsOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(ContactDetails, _RcModule);

  function ContactDetails(_ref) {
    var contacts = _ref.contacts,
        options = (0, _objectWithoutProperties3.default)(_ref, ['contacts']);
    (0, _classCallCheck3.default)(this, ContactDetails);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ContactDetails.__proto__ || (0, _getPrototypeOf2.default)(ContactDetails)).call(this, (0, _extends3.default)({}, options, { actionTypes: _actionTypes2.default })));

    _this._contacts = contacts;
    _this._reducer = (0, _getContactDetailsReducer2.default)(_this.actionTypes);

    _this.addSelector('currentContact', function () {
      return _this.condition;
    }, function () {
      return _this._contacts.allContacts;
    }, function (condition) {
      if (condition) {
        return _this._contacts.find(condition);
      }
      return null;
    });
    return _this;
  }

  (0, _createClass3.default)(ContactDetails, [{
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
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._contacts.ready && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return !this._contacts.ready && this.ready;
    }

    /**
     * Find contact from all contacts by given conditions.
     * Stores search conditions to reducers.
     */

  }, {
    key: 'find',
    value: function find(_ref2) {
      var id = _ref2.id,
          type = _ref2.type;

      this.store.dispatch({
        type: this.actionTypes.updateCondition,
        condition: {
          id: id,
          type: type
        }
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.store.dispatch({
        type: this.actionTypes.resetCondition
      });
    }
  }, {
    key: 'getProfileImage',
    value: function getProfileImage(contact) {
      return this._contacts.getProfileImage(contact, false);
    }
  }, {
    key: 'getPresence',
    value: function getPresence(contact) {
      return this._contacts.getPresence(contact, false);
    }

    // for track click to sms in contact detail

  }, {
    key: 'onClickToSMS',
    value: function onClickToSMS() {
      this.store.dispatch({
        type: this.actionTypes.clickToSMS
      });
    }

    // for track click to call in contact detail

  }, {
    key: 'onClickToCall',
    value: function onClickToCall() {
      this.store.dispatch({
        type: this.actionTypes.clickToCall
      });
    }
  }, {
    key: 'contact',
    get: function get() {
      return this._selectors.currentContact();
    }
  }, {
    key: 'condition',
    get: function get() {
      return this.state.condition;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }]);
  return ContactDetails;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'find', [_background2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'find'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'clear', [_background2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'clear'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'getProfileImage', [_background2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'getProfileImage'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'getPresence', [_background2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'getPresence'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickToSMS', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'onClickToSMS'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickToCall', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'onClickToCall'), _class2.prototype)), _class2)) || _class);
exports.default = ContactDetails;
//# sourceMappingURL=index.js.map
