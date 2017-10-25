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
 * @description Extension device list module
 */
var ExtensionDevice = (_dec = (0, _di.Module)({
  deps: ['Client', { dep: 'ExtensionDeviceOptions', optional: true }]
}), _dec(_class = function (_DataFetcher) {
  (0, _inherits3.default)(ExtensionDevice, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  function ExtensionDevice(_ref) {
    var client = _ref.client,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client']);
    (0, _classCallCheck3.default)(this, ExtensionDevice);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ExtensionDevice.__proto__ || (0, _getPrototypeOf2.default)(ExtensionDevice)).call(this, (0, _extends3.default)({
      name: 'extensionDevice',
      client: client,
      fetchFunction: function fetchFunction() {
        return (0, _fetchList2.default)(function (params) {
          return client.account().extension().device().list(params);
        });
      }
    }, options)));

    _this.addSelector('devices', function () {
      return _this.data;
    }, function (data) {
      return data || [];
    });

    _this.addSelector('phoneLines', function () {
      return _this.devices;
    }, function (devices) {
      var phoneLines = [];
      devices.forEach(function (device) {
        if (!device.phoneLines || device.phoneLines.length === 0) {
          return;
        }
        phoneLines = phoneLines.concat(device.phoneLines);
      });
      return phoneLines;
    });
    return _this;
  }

  (0, _createClass3.default)(ExtensionDevice, [{
    key: 'devices',
    get: function get() {
      return this._selectors.devices();
    }
  }, {
    key: 'phoneLines',
    get: function get() {
      return this._selectors.phoneLines();
    }
  }]);
  return ExtensionDevice;
}(_DataFetcher3.default)) || _class);
exports.default = ExtensionDevice;
//# sourceMappingURL=index.js.map
