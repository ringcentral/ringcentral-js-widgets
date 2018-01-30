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

var _di = require('../../lib/di');

var _DataFetcher2 = require('../../lib/DataFetcher');

var _DataFetcher3 = _interopRequireDefault(_DataFetcher2);

var _fetchList = require('../../lib/fetchList');

var _fetchList2 = _interopRequireDefault(_fetchList);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @description Extension forwarding number list module
 */
var ForwardingNumber = (_dec = (0, _di.Module)({
  deps: ['Client', 'RolesAndPermissions', { dep: 'ForwardingNumberOptions', optional: true }]
}), _dec(_class = function (_DataFetcher) {
  (0, _inherits3.default)(ForwardingNumber, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  function ForwardingNumber(_ref) {
    var _this2 = this;

    var client = _ref.client,
        rolesAndPermissions = _ref.rolesAndPermissions,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'rolesAndPermissions']);
    (0, _classCallCheck3.default)(this, ForwardingNumber);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ForwardingNumber.__proto__ || (0, _getPrototypeOf2.default)(ForwardingNumber)).call(this, (0, _extends3.default)({
      name: 'forwardingNumber',
      client: client,
      fetchFunction: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (_this._rolesAndPermissions.permissions.ReadUserForwardingFlipNumbers) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt('return', []);

                case 2:
                  return _context.abrupt('return', (0, _fetchList2.default)(function (params) {
                    return _this._client.account().extension().forwardingNumber().list(params);
                  }).catch(function (error) {
                    if (error && error.apiResponse && error.apiResponse._response && error.apiResponse._response.status === 403) {
                      return [];
                    }
                    throw error;
                  }));

                case 3:
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
        return _this._rolesAndPermissions.ready;
      }
    }, options)));

    _this._rolesAndPermissions = _ensureExist2.default.call(_this, rolesAndPermissions, 'rolesAndPermissions');

    _this.addSelector('flipNumbers', function () {
      return _this.numbers;
    }, function (phoneNumbers) {
      return phoneNumbers.filter(function (p) {
        return p.features.indexOf('CallFlip') !== -1 && p.phoneNumber;
      });
    });
    _this.addSelector('numbers', function () {
      return _this.data;
    }, function (data) {
      return data || [];
    });
    _this.addSelector('forwardingNumbers', function () {
      return _this.numbers;
    }, function (phoneNumbers) {
      return phoneNumbers.filter(function (p) {
        return p.features.indexOf('CallForwarding') !== -1 && p.phoneNumber;
      });
    });
    return _this;
  }

  (0, _createClass3.default)(ForwardingNumber, [{
    key: 'numbers',
    get: function get() {
      return this._selectors.numbers();
    }
  }, {
    key: 'flipNumbers',
    get: function get() {
      return this._selectors.flipNumbers();
    }
  }, {
    key: 'forwardingNumbers',
    get: function get() {
      return this._selectors.forwardingNumbers();
    }
  }]);
  return ForwardingNumber;
}(_DataFetcher3.default)) || _class);
exports.default = ForwardingNumber;
//# sourceMappingURL=index.js.map
