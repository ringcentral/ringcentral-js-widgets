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

var _subscriptionFilters = require('../../enums/subscriptionFilters');

var _subscriptionFilters2 = _interopRequireDefault(_subscriptionFilters);

var _di = require('../../lib/di');

var _DataFetcher2 = require('../../lib/DataFetcher');

var _DataFetcher3 = _interopRequireDefault(_DataFetcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_MASK = ['id', 'extensionNumber', 'contact(*)', 'name', 'type', 'status', 'permissions', 'profileImage', 'departments', 'regionalSettings(' + ['timezone(id,name,bias)', 'homeCountry(id,isoCode,callingCode)', 'language(localeCode)', 'formattingLocale(localeCode)', 'timeFormat'].join(',') + ')'].join(',');

var DEFAULT_COUNTRY = {
  id: '1',
  isoCode: 'US',
  callingCode: '1'
};

var extensionRegExp = /.*\/extension\/\d+$/;

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

var DEFAULT_TTL = 30 * 60 * 1000; // half hour update
var DEFAULT_TIME_TO_RETRY = 62 * 1000;

/**
 * @class
 * @description Extension info module
 */
var ExtensionInfo = (_dec = (0, _di.Module)({
  deps: ['Client', { dep: 'ExtensionInfoOptions', optional: true }]
}), _dec(_class = function (_DataFetcher) {
  (0, _inherits3.default)(ExtensionInfo, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  function ExtensionInfo(_ref) {
    var _this2 = this;

    var client = _ref.client,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === undefined ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        _ref$polling = _ref.polling,
        polling = _ref$polling === undefined ? true : _ref$polling,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'ttl', 'timeToRetry', 'polling']);
    (0, _classCallCheck3.default)(this, ExtensionInfo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ExtensionInfo.__proto__ || (0, _getPrototypeOf2.default)(ExtensionInfo)).call(this, (0, _extends3.default)({
      name: 'extensionInfo',
      client: client,
      ttl: ttl,
      polling: polling,
      timeToRetry: timeToRetry,
      subscriptionFilters: [_subscriptionFilters2.default.extensionInfo],
      subscriptionHandler: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(message) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this._subscriptionHandleFn(message);

                case 2:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function subscriptionHandler(_x) {
          return _ref2.apply(this, arguments);
        };
      }(),
      fetchFunction: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.t0 = extractData;
                  _context2.next = 3;
                  return _this._client.account().extension().get();

                case 3:
                  _context2.t1 = _context2.sent;
                  return _context2.abrupt('return', (0, _context2.t0)(_context2.t1));

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function fetchFunction() {
          return _ref3.apply(this, arguments);
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
    key: '_subscriptionHandleFn',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(message) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(message && message.body && extensionRegExp.test(message.event))) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this.fetchData();

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _subscriptionHandleFn(_x2) {
        return _ref4.apply(this, arguments);
      }

      return _subscriptionHandleFn;
    }()
  }, {
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
      return !!this.departments && Array.isArray(this.departments) && this.departments.length > 0;
    }
  }]);
  return ExtensionInfo;
}(_DataFetcher3.default)) || _class);
exports.default = ExtensionInfo;
//# sourceMappingURL=index.js.map
