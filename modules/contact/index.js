'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

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

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _redux = require('redux');

var _companyContact = require('./company-contact');

var _companyContact2 = _interopRequireDefault(_companyContact);

var _addressBook = require('./address-book');

var _addressBook2 = _interopRequireDefault(_addressBook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO refactor

var symbols = new _symbolMap2.default(['api', 'platform', 'settings']);

/**
 * @class
 * @description Contact module
 */

var Contact = function (_RcModule) {
  (0, _inherits3.default)(Contact, _RcModule);

  /**
   * @function
   */
  function Contact(options) {
    (0, _classCallCheck3.default)(this, Contact);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Contact.__proto__ || (0, _getPrototypeOf2.default)(Contact)).call(this, (0, _extends3.default)({}, options)));

    var api = options.api;
    var platform = options.platform;
    var settings = options.settings;
    var prefix = options.prefix;


    _this[symbols.api] = api;
    _this[symbols.platform] = platform;
    _this[symbols.settings] = settings;

    _RcModule2.addModule.call(_this, 'companyContact', new _companyContact2.default({
      getState: function getState() {
        return _this.state.companyContact;
      },
      prefix: prefix,
      api: api,
      platform: platform,
      settings: settings
    }));

    _RcModule2.addModule.call(_this, 'addressBook', new _addressBook2.default({
      getState: function getState() {
        return _this.state.addressBook;
      },
      prefix: prefix,
      api: api,
      platform: platform,
      settings: settings
    }));
    return _this;
  }

  (0, _createClass3.default)(Contact, [{
    key: 'reducer',
    get: function get() {
      console.log('reducer');
      return (0, _redux.combineReducers)({
        companyContact: this.companyContact.reducer,
        addressBook: this.addressBook.reducer
      });
    }
  }]);
  return Contact;
}(_RcModule3.default);

exports.default = Contact;
//# sourceMappingURL=index.js.map
