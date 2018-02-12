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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _di = require('../../lib/di');

var _DataFetcher2 = require('../../lib/DataFetcher');

var _DataFetcher3 = _interopRequireDefault(_DataFetcher2);

var _sleep = require('../../lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _fetchList = require('../../lib/fetchList');

var _fetchList2 = _interopRequireDefault(_fetchList);

var _subscriptionFilters = require('../../enums/subscriptionFilters');

var _subscriptionFilters2 = _interopRequireDefault(_subscriptionFilters);

var _getActiveCallsReducer = require('./getActiveCallsReducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var presenceRegExp = /\/presence\?detailedTelephonyState=true/;
var FETCH_DELAY = 1000;
var DEFAULT_TTL = 5 * 60 * 1000;

/**
 * @class
 * @description Active calls list manaing module
 */
var ActiveCalls = (_dec = (0, _di.Module)({
  deps: ['Client', 'RolesAndPermissions', { dep: 'TabManager', optional: true }, { dep: 'ActiveCallsOptions', optional: true }]
}), _dec(_class = function (_DataFetcher) {
  (0, _inherits3.default)(ActiveCalls, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Number} params.ttl - local cache timestamp, default 5 mins.
   */
  function ActiveCalls(_ref) {
    var _this2 = this;

    var client = _ref.client,
        rolesAndPermissions = _ref.rolesAndPermissions,
        tabManager = _ref.tabManager,
        _ref$fetchDelay = _ref.fetchDelay,
        fetchDelay = _ref$fetchDelay === undefined ? FETCH_DELAY : _ref$fetchDelay,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'rolesAndPermissions', 'tabManager', 'fetchDelay', 'ttl']);
    (0, _classCallCheck3.default)(this, ActiveCalls);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveCalls.__proto__ || (0, _getPrototypeOf2.default)(ActiveCalls)).call(this, (0, _extends3.default)({}, options, {
      name: 'activeCalls',
      client: client,
      ttl: ttl,
      getDataReducer: _getActiveCallsReducer.getDataReducer,
      subscriptionFilters: [_subscriptionFilters2.default.detailedPresenceWithSip],
      subscriptionHandler: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(message) {
          var ownerId;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!presenceRegExp.test(message.event)) {
                    _context.next = 7;
                    break;
                  }

                  ownerId = _this._auth.ownerId;
                  _context.next = 4;
                  return (0, _sleep2.default)(_this._fetchDelay);

                case 4:
                  if (!(ownerId === _this._auth.ownerId)) {
                    _context.next = 7;
                    break;
                  }

                  _context.next = 7;
                  return _this.fetchData();

                case 7:
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
                  return _context2.abrupt('return', (0, _fetchList2.default)(function (params) {
                    return _this._client.account().extension().activeCalls().list(params);
                  }));

                case 1:
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
    })));

    _this._fetchDelay = fetchDelay;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this.addSelector('calls', function () {
      return _this.data;
    }, function (data) {
      return data || [];
    });
    return _this;
  }

  (0, _createClass3.default)(ActiveCalls, [{
    key: '_shouldInit',
    value: function _shouldInit() {
      return (0, _get3.default)(ActiveCalls.prototype.__proto__ || (0, _getPrototypeOf2.default)(ActiveCalls.prototype), '_shouldInit', this).call(this) && this._rolesAndPermissions.ready;
    }
  }, {
    key: '_hasPermission',
    get: function get() {
      return this._rolesAndPermissions.permissions.ReadCallLog;
    }
  }, {
    key: 'calls',
    get: function get() {
      return this._selectors.calls();
    }
  }]);
  return ActiveCalls;
}(_DataFetcher3.default)) || _class);
exports.default = ActiveCalls;
//# sourceMappingURL=index.js.map
