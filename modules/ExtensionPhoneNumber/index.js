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

var _dec, _class;

require('core-js/fn/array/find');

var _di = require('../../lib/di');

var _fetchList = require('../../lib/fetchList');

var _fetchList2 = _interopRequireDefault(_fetchList);

var _DataFetcher2 = require('../../lib/DataFetcher');

var _DataFetcher3 = _interopRequireDefault(_DataFetcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @description Extension phone number list module
 */
var ExtensionPhoneNumber = (_dec = (0, _di.Module)({
  deps: ['Client', { dep: 'ExtensionPhoneNumberOptions', optional: true }]
}), _dec(_class = function (_DataFetcher) {
  (0, _inherits3.default)(ExtensionPhoneNumber, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  function ExtensionPhoneNumber(_ref) {
    var client = _ref.client,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client']);
    (0, _classCallCheck3.default)(this, ExtensionPhoneNumber);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ExtensionPhoneNumber.__proto__ || (0, _getPrototypeOf2.default)(ExtensionPhoneNumber)).call(this, (0, _extends3.default)({
      name: 'extensionPhoneNumber',
      client: client,
      fetchFunction: function fetchFunction() {
        return (0, _fetchList2.default)(function (params) {
          return client.account().extension().phoneNumber().list(params);
        });
      }
    }, options)));

    _this.addSelector('numbers', function () {
      return _this.data;
    }, function (data) {
      return data || [];
    });

    _this.addSelector('companyNumbers', function () {
      return _this.numbers;
    }, function (phoneNumbers) {
      return phoneNumbers.filter(function (p) {
        return p.usageType === 'CompanyNumber';
      });
    });

    _this.addSelector('mainCompanyNumber', function () {
      return _this.numbers;
    }, function (phoneNumbers) {
      return phoneNumbers.find(function (p) {
        return p.usageType === 'MainCompanyNumber';
      });
    });

    _this.addSelector('directNumbers', function () {
      return _this.numbers;
    }, function (phoneNumbers) {
      return phoneNumbers.filter(function (p) {
        return p.usageType === 'DirectNumber';
      });
    });

    _this.addSelector('callerIdNumbers', function () {
      return _this.numbers;
    }, function (phoneNumbers) {
      return phoneNumbers.filter(function (p) {
        return p.features && p.features.indexOf('CallerId') !== -1 || p.usageType === 'ForwardedNumber' && p.status === 'PortedIn';
      });
    });

    _this.addSelector('smsSenderNumbers', function () {
      return _this.numbers;
    }, function (phoneNumbers) {
      return phoneNumbers.filter(function (p) {
        return p.features && p.features.indexOf('SmsSender') !== -1;
      });
    });
    return _this;
  }

  (0, _createClass3.default)(ExtensionPhoneNumber, [{
    key: 'numbers',
    get: function get() {
      return this._selectors.numbers();
    }
  }, {
    key: 'mainCompanyNumber',
    get: function get() {
      return this._selectors.mainCompanyNumber();
    }
  }, {
    key: 'companyNumbers',
    get: function get() {
      return this._selectors.companyNumbers();
    }
  }, {
    key: 'directNumbers',
    get: function get() {
      return this._selectors.directNumbers();
    }
  }, {
    key: 'callerIdNumbers',
    get: function get() {
      return this._selectors.callerIdNumbers();
    }
  }, {
    key: 'smsSenderNumbers',
    get: function get() {
      return this._selectors.smsSenderNumbers();
    }
  }]);
  return ExtensionPhoneNumber;
}(_DataFetcher3.default)) || _class);
exports.default = ExtensionPhoneNumber;
//# sourceMappingURL=index.js.map
