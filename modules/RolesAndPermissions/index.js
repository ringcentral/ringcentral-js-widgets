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

var _DataFetcher2 = require('../../lib/DataFetcher');

var _DataFetcher3 = _interopRequireDefault(_DataFetcher2);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TTL = 24 * 60 * 60 * 1000;

function extractData(permissions) {
  var output = {};
  permissions.permissions.forEach(function (item) {
    output[item.permission.id] = true;
  });
  return output;
}

var RolesAndPermissions = function (_DataFetcher) {
  (0, _inherits3.default)(RolesAndPermissions, _DataFetcher);

  function RolesAndPermissions(_ref) {
    var _this2 = this;

    var client = _ref.client,
        extensionInfo = _ref.extensionInfo,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'extensionInfo', 'ttl']);
    (0, _classCallCheck3.default)(this, RolesAndPermissions);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RolesAndPermissions.__proto__ || (0, _getPrototypeOf2.default)(RolesAndPermissions)).call(this, (0, _extends3.default)({}, options, {
      name: 'rolesAndPermissions',
      client: client,
      ttl: ttl,
      fetchFunction: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.t0 = extractData;
                  _context.next = 3;
                  return _this._client.account().extension().authzProfile().get();

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
      }(),
      readyCheckFn: function readyCheckFn() {
        return _this._extensionInfo.ready;
      }
    })));

    _this._extensionInfo = extensionInfo;
    _this.addSelector('permissions', function () {
      return _this.data;
    }, function (data) {
      return data || {};
    });
    return _this;
  }

  (0, _createClass3.default)(RolesAndPermissions, [{
    key: 'serviceFeatures',
    get: function get() {
      return this._extensionInfo.serviceFeatures;
    }
  }, {
    key: 'permissions',
    get: function get() {
      return this._selectors.permissions();
    }
  }, {
    key: 'ringoutEnabled',
    get: function get() {
      return !!(this._extensionInfo.serviceFeatures && this._extensionInfo.serviceFeatures.RingOut && this._extensionInfo.serviceFeatures.RingOut.enabled);
    }
  }, {
    key: 'webphoneEnabled',
    get: function get() {
      return !!(this._extensionInfo.serviceFeatures && this._extensionInfo.serviceFeatures.WebPhone && this._extensionInfo.serviceFeatures.WebPhone.enabled);
    }
  }]);
  return RolesAndPermissions;
}(_DataFetcher3.default);

exports.default = RolesAndPermissions;
//# sourceMappingURL=index.js.map
