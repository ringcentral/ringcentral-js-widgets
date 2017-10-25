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

var _RcModule2 = require('../RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../di');

var _Enum = require('../Enum');

var _SynchronizedStorage = require('../../lib/SynchronizedStorage');

var _SynchronizedStorage2 = _interopRequireDefault(_SynchronizedStorage);

var _actionTypesBase = require('./actionTypesBase');

var _actionTypesBase2 = _interopRequireDefault(_actionTypesBase);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _getStorageReducer = require('./getStorageReducer');

var _getStorageReducer2 = _interopRequireDefault(_getStorageReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @description Alternative implementation of the Storage class.
 *  Allows registeration of reducers so that persisted states can be computed with reducers.
 */
var StorageBase = (_dec = (0, _di.Library)({
  deps: [{ dep: 'StorageBaseOptions', optional: true }]
}), _dec(_class = function (_RcModule) {
  (0, _inherits3.default)(StorageBase, _RcModule);

  function StorageBase(_ref) {
    var name = _ref.name,
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === undefined ? (0, _Enum.prefixEnum)({ enumMap: _actionTypesBase2.default, prefix: name }) : _ref$actionTypes,
        _ref$StorageProvider = _ref.StorageProvider,
        StorageProvider = _ref$StorageProvider === undefined ? _SynchronizedStorage2.default : _ref$StorageProvider,
        options = (0, _objectWithoutProperties3.default)(_ref, ['name', 'actionTypes', 'StorageProvider']);
    (0, _classCallCheck3.default)(this, StorageBase);

    if (!name) {
      throw new Error('name must be defined');
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (StorageBase.__proto__ || (0, _getPrototypeOf2.default)(StorageBase)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: actionTypes
    })));

    _this._StorageProvider = StorageProvider;
    _this._reducers = {};
    _this._reducer = (0, _getStorageReducer2.default)({ types: _this.actionTypes, reducers: _this._reducers });
    return _this;
  }

  (0, _createClass3.default)(StorageBase, [{
    key: 'registerReducer',
    value: function registerReducer(_ref2) {
      var key = _ref2.key,
          reducer = _ref2.reducer;

      if (this._initialized) {
        throw new Error('Reducers must be registered before initialize');
      }
      if (this._reducers[key]) {
        throw new Error('Reducer of key: \'' + key + '\' already exists');
      }
      this._reducers[key] = reducer;
    }
  }, {
    key: 'getItem',
    value: function getItem(key) {
      return this.state.data[key];
    }
  }, {
    key: 'data',
    get: function get() {
      return this.state.data;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'storageKey',
    get: function get() {
      return this.state.storageKey;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.status === _moduleStatuses2.default.ready;
    }
  }]);
  return StorageBase;
}(_RcModule3.default)) || _class);
exports.default = StorageBase;
//# sourceMappingURL=index.js.map
