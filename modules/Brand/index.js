'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @description Brand managing module
 */
var Brand = (_dec = (0, _di.Module)({
  deps: [{ dep: 'BrandOptions', optional: true }]
}), _dec(_class = function (_RcModule) {
  (0, _inherits3.default)(Brand, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {String} params.id - brand id
   * @param {String} params.name - brand name
   * @param {String} params.fullName - full brand name
   * @param {String} params.application - application name
   */
  function Brand(_ref) {
    var id = _ref.id,
        name = _ref.name,
        fullName = _ref.fullName,
        application = _ref.application,
        code = _ref.code,
        brandConfig = _ref.brandConfig,
        options = (0, _objectWithoutProperties3.default)(_ref, ['id', 'name', 'fullName', 'application', 'code', 'brandConfig']);
    (0, _classCallCheck3.default)(this, Brand);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Brand.__proto__ || (0, _getPrototypeOf2.default)(Brand)).call(this, options));

    _this._reducer = function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        id: id,
        name: name,
        fullName: fullName,
        application: application,
        code: code,
        brandConfig: brandConfig
      };
      return state;
    };
    return _this;
  }

  (0, _createClass3.default)(Brand, [{
    key: '_onStateChange',
    value: function _onStateChange() {
      /* do nothing */
    }
  }, {
    key: '_actionTypes',
    get: function get() {
      /* no action types */
    }
  }, {
    key: 'id',
    get: function get() {
      return this.state.id;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.state.name;
    }
  }, {
    key: 'fullName',
    get: function get() {
      return this.state.fullName;
    }
  }, {
    key: 'application',
    get: function get() {
      return this.state.application;
    }
  }, {
    key: 'code',
    get: function get() {
      return this.state.code;
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'status',
    get: function get() {
      return _moduleStatuses2.default.ready;
    }
  }, {
    key: 'brandConfig',
    get: function get() {
      return this.state.brandConfig;
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'ready',
    get: function get() {
      return true;
    }
  }]);
  return Brand;
}(_RcModule3.default)) || _class);
exports.default = Brand;
//# sourceMappingURL=index.js.map
