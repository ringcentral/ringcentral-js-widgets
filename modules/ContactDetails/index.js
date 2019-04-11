"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.find");

var _ramda = require("ramda");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getContactDetailsReducer = _interopRequireDefault(require("./getContactDetailsReducer"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _background = _interopRequireDefault(require("../../lib/background"));

var _phoneTypes = _interopRequireDefault(require("../../enums/phoneTypes"));

var _phoneTypeHelper = require("../../lib/phoneTypeHelper");

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

var ContactDetails = (_dec = (0, _di.Module)({
  deps: ['Contacts', {
    dep: 'ContactDetailsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(ContactDetails, _RcModule);

  function ContactDetails(_ref) {
    var _this;

    var contacts = _ref.contacts,
        options = _objectWithoutProperties(_ref, ["contacts"]);

    _classCallCheck(this, ContactDetails);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContactDetails).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes.default
    })));
    _this._contacts = contacts;
    _this._reducer = (0, _getContactDetailsReducer.default)(_this.actionTypes);

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

    _this.addSelector('currentSortedContact', function () {
      return _this.currentContact;
    }, function (currentContact) {
      if (!currentContact) return null;
      var phoneNumbers;

      if (currentContact.rawPhoneNumbers && currentContact.rawPhoneNumbers.length > 0) {
        phoneNumbers = currentContact.rawPhoneNumbers;
      } else {
        phoneNumbers = currentContact.phoneNumbers;
      }

      var phoneMaps = (0, _ramda.reduce)(function (acc, phoneNumberElm) {
        acc[phoneNumberElm.phoneType] = acc[phoneNumberElm.phoneType] || [];
        acc[phoneNumberElm.phoneType].push(phoneNumberElm);
        return acc;
      }, {}, phoneNumbers);
      var schema = (0, _ramda.filter)(function (key) {
        return !!_phoneTypes.default[key] && Array.isArray(phoneMaps[key]);
      }, _phoneTypeHelper.phoneTypeOrder);
      return _objectSpread({}, currentContact, {
        schema: schema,
        phoneMaps: phoneMaps
      });
    });

    return _this;
  }

  _createClass(ContactDetails, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
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
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._contacts.ready && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !this._contacts.ready && this.ready;
    }
    /**
     * Find contact from all contacts by given conditions.
     * Stores search conditions to reducers.
     */

  }, {
    key: "find",
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
    key: "clear",
    value: function clear() {
      this.store.dispatch({
        type: this.actionTypes.resetCondition
      });
    }
  }, {
    key: "getProfileImage",
    value: function getProfileImage(contact) {
      return this._contacts.getProfileImage(contact, false);
    }
  }, {
    key: "getPresence",
    value: function getPresence(contact) {
      return this._contacts.getPresence(contact, false);
    } // for track click to sms in contact detail

  }, {
    key: "onClickToSMS",
    value: function onClickToSMS() {
      this.store.dispatch({
        type: this.actionTypes.clickToSMS
      });
    } // for track click to call in contact detail

  }, {
    key: "onClickToCall",
    value: function onClickToCall() {
      this.store.dispatch({
        type: this.actionTypes.clickToCall
      });
    }
  }, {
    key: "currentContact",
    get: function get() {
      return this._selectors.currentContact();
    }
  }, {
    key: "contact",
    get: function get() {
      return this._selectors.currentSortedContact();
    }
  }, {
    key: "condition",
    get: function get() {
      return this.state.condition;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }]);

  return ContactDetails;
}(_RcModule2.default), (_applyDecoratedDescriptor(_class2.prototype, "find", [_background.default], Object.getOwnPropertyDescriptor(_class2.prototype, "find"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clear", [_background.default], Object.getOwnPropertyDescriptor(_class2.prototype, "clear"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getProfileImage", [_background.default], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfileImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_background.default], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToSMS", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToCall", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToCall"), _class2.prototype)), _class2)) || _class);
exports.default = ContactDetails;
//# sourceMappingURL=index.js.map
