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

var _jsonMask = require('json-mask');

var _jsonMask2 = _interopRequireDefault(_jsonMask);

var _DataFetcher2 = require('../../lib/DataFetcher');

var _DataFetcher3 = _interopRequireDefault(_DataFetcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_MASK = ['id', 'extensionNumber', 'contact(*)', 'name', 'type', 'status', 'permissions', 'profileImage', 'departments', 'regionalSettings(' + ['timezone(id,name,bias)', 'homeCountry(id,isoCode,callingCode)', 'language(localeCode)', 'formattingLocale(localeCode)', 'timeFormat'].join(',') + ')'].join(',');

var DEFAULT_COUNTRY = {
  id: '1',
  isoCode: 'US',
  callingCode: '1'
};

function extractData(info) {
  var serviceFeatures = {};
  info.serviceFeatures.forEach(function (f) {
    serviceFeatures[f.featureName] = {
      enabled: f.enabled
    };
    if (!f.enabled) {
      serviceFeatures[f.featureName].reason = f.reason;
    }
  });
  var output = (0, _jsonMask2.default)(info, DEFAULT_MASK);
  output.serviceFeatures = serviceFeatures;
  return output;
}

/**
 * @class
 * @description Extension info module
 */

var ExtensionInfo = function (_DataFetcher) {
  (0, _inherits3.default)(ExtensionInfo, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  function ExtensionInfo(_ref) {
    var _this2 = this;

    var client = _ref.client,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client']);
    (0, _classCallCheck3.default)(this, ExtensionInfo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ExtensionInfo.__proto__ || (0, _getPrototypeOf2.default)(ExtensionInfo)).call(this, (0, _extends3.default)({
      name: 'extensionInfo',
      client: client,
      fetchFunction: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.t0 = extractData;
                  _context.next = 3;
                  return _this._client.account().extension().get();

                case 3:
                  _context.t1 = _context.sent;
                  return _context.abrupt('return', (0, _context.t0)(_context.t1));

                case 5:
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
    _this.addSelector('serviceFeatures', _this._selectors.info, function (info) {
      return info.serviceFeatures || {};
    });
    return _this;
  }

  (0, _createClass3.default)(ExtensionInfo, [{
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
    key: 'extensionNumber',
    get: function get() {
      return this.info.extensionNumber;
    }
  }, {
    key: 'serviceFeatures',
    get: function get() {
      return this._selectors.serviceFeatures();
    }
  }, {
    key: 'country',
    get: function get() {
      return this.info.regionalSettings && this.info.regionalSettings.homeCountry || DEFAULT_COUNTRY;
    }
  }, {
    key: 'departments',
    get: function get() {
      return this.info.departments;
    }
  }, {
    key: 'isCallQueueMember',
    get: function get() {
      return !!this.departments;
    }
  }]);
  return ExtensionInfo;
}(_DataFetcher3.default);

exports.default = ExtensionInfo;
//# sourceMappingURL=index.js.map
