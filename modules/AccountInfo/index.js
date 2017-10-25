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

var _jsonMask = require('json-mask');

var _jsonMask2 = _interopRequireDefault(_jsonMask);

var _di = require('../../lib/di');

var _DataFetcher2 = require('../../lib/DataFetcher');

var _DataFetcher3 = _interopRequireDefault(_DataFetcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_MASK = ['id,mainNumber,status', 'operator(id,extensionNumber)', 'serviceInfo(brand(id,homeCountry(isoCode)))', 'regionalSettings(' + ['timezone(id,name,bias)', 'homeCountry(id)', 'language(localeCode)', 'formattingLocale(localeCode)', 'timeFormat'].join(',') + ')'].join(',');

/**
 * @class
 * @description Accound info managing module.
 */
var AccountInfo = (_dec = (0, _di.Module)({
  deps: ['Client', { dep: 'AccountInfoOptions', optional: true }]
}), _dec(_class = function (_DataFetcher) {
  (0, _inherits3.default)(AccountInfo, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  function AccountInfo(_ref) {
    var _this2 = this;

    var client = _ref.client,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client']);
    (0, _classCallCheck3.default)(this, AccountInfo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AccountInfo.__proto__ || (0, _getPrototypeOf2.default)(AccountInfo)).call(this, (0, _extends3.default)({
      name: 'accountInfo',
      client: client,
      fetchFunction: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.t0 = _jsonMask2.default;
                  _context.next = 3;
                  return client.account().get();

                case 3:
                  _context.t1 = _context.sent;
                  _context.t2 = DEFAULT_MASK;
                  return _context.abrupt('return', (0, _context.t0)(_context.t1, _context.t2));

                case 6:
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

    _this.addSelector('info', function () {
      return _this.data;
    }, function (data) {
      return data || {};
    });
    return _this;
  }

  (0, _createClass3.default)(AccountInfo, [{
    key: 'info',
    get: function get() {
      return this._selectors.info();
    }
  }, {
    key: 'id',
    get: function get() {
      return this.info.id;
    }
  }, {
    key: 'country',
    get: function get() {
      return this.info.serviceInfo && this.info.serviceInfo.brand.homeCountry;
    }
  }, {
    key: 'countryCode',
    get: function get() {
      return this.country && this.country.isoCode || 'US';
    }
  }, {
    key: 'mainCompanyNumber',
    get: function get() {
      return this.info.mainNumber;
    }
  }]);
  return AccountInfo;
}(_DataFetcher3.default)) || _class);
exports.default = AccountInfo;
//# sourceMappingURL=index.js.map
