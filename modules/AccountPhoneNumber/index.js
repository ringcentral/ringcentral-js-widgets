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

var _dec, _class;

require('core-js/fn/array/find');

var _di = require('../../lib/di');

var _fetchList = require('../../lib/fetchList');

var _fetchList2 = _interopRequireDefault(_fetchList);

var _DataFetcher2 = require('../../lib/DataFetcher');

var _DataFetcher3 = _interopRequireDefault(_DataFetcher2);

var _removeUri = require('../../lib/removeUri');

var _removeUri2 = _interopRequireDefault(_removeUri);

var _getReducer = require('./getReducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function simplifyPhoneNumber(number) {
  return (0, _removeUri2.default)(number);
}

/**
 * @class
 * @description Accound phone number module to get account phone number list
 */
var AccountPhoneNumber = (_dec = (0, _di.Module)({
  deps: ['Client', { dep: 'AccountPhoneNumberOptions', optional: true }]
}), _dec(_class = function (_DataFetcher) {
  (0, _inherits3.default)(AccountPhoneNumber, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  function AccountPhoneNumber(_ref) {
    var _this2 = this;

    var client = _ref.client,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client']);
    (0, _classCallCheck3.default)(this, AccountPhoneNumber);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AccountPhoneNumber.__proto__ || (0, _getPrototypeOf2.default)(AccountPhoneNumber)).call(this, (0, _extends3.default)({
      name: 'accountPhoneNumber',
      client: client,
      getDataReducer: _getReducer.getDataReducer,
      fetchFunction: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _fetchList2.default)(function (params) {
                    return client.account().phoneNumber().list(params);
                  });

                case 2:
                  _context.t0 = simplifyPhoneNumber;
                  return _context.abrupt('return', _context.sent.map(_context.t0));

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function fetchFunction() {
          return _ref2.apply(this, arguments);
        };
      }()
    }, options)));

    _this.addSelector('numbers', function () {
      return _this.data;
    }, function (data) {
      return data || [];
    });

    _this.addSelector('extensionToPhoneNumberMap', function () {
      return _this.numbers;
    }, function (numbers) {
      var numberMap = {};
      numbers.forEach(function (number) {
        if (number.extension && number.extension.extensionNumber) {
          if (!numberMap[number.extension.extensionNumber]) {
            numberMap[number.extension.extensionNumber] = [];
          }
          numberMap[number.extension.extensionNumber].push(number);
        }
      });
      return numberMap;
    });
    return _this;
  }

  (0, _createClass3.default)(AccountPhoneNumber, [{
    key: 'numbers',
    get: function get() {
      return this._selectors.numbers();
    }
  }, {
    key: 'extensionToPhoneNumberMap',
    get: function get() {
      return this._selectors.extensionToPhoneNumberMap();
    }
  }]);
  return AccountPhoneNumber;
}(_DataFetcher3.default)) || _class);
exports.default = AccountPhoneNumber;
//# sourceMappingURL=index.js.map
