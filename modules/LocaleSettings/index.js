'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _dec, _class, _desc, _value, _class2, _descriptor;

var _defaultConfig = require('locale-loader/defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _reselect = require('reselect');

var _redux = require('redux');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _Enum = require('../../lib/Enum');

var _Enum2 = _interopRequireDefault(_Enum);

var _moduleActionTypes = require('../../enums/moduleActionTypes');

var _moduleActionTypes2 = _interopRequireDefault(_moduleActionTypes);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _di = require('../../lib/di');

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _getter = require('../../lib/getter');

var _getter2 = _interopRequireDefault(_getter);

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _reducers = require('./reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty2.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

/* eslint-disable global-require */

/**
 * @class
 * @description Locale managing module
 */
var LocaleSettings = (_dec = (0, _di.Module)({
  name: 'LocaleSettings',
  deps: ['GlobalStorage', 'Locale', { dep: 'LocaleSettingsOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(LocaleSettings, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {String} params.defaultLocale - default 'en-US'
   */
  function LocaleSettings() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var globalStorage = _ref.globalStorage,
        locale = _ref.locale,
        _ref$supportedLocales = _ref.supportedLocales,
        supportedLocales = _ref$supportedLocales === undefined ? _defaultConfig2.default.supportedLocales : _ref$supportedLocales,
        options = (0, _objectWithoutProperties3.default)(_ref, ['globalStorage', 'locale', 'supportedLocales']);
    (0, _classCallCheck3.default)(this, LocaleSettings);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LocaleSettings.__proto__ || (0, _getPrototypeOf2.default)(LocaleSettings)).call(this, (0, _extends3.default)({}, options)));

    _initDefineProp(_this, 'supportedLocales', _descriptor, _this);

    _this._globalStorage = _ensureExist2.default.call(_this, globalStorage, 'globalStorage');
    _this._locale = _ensureExist2.default.call(_this, locale, 'locale');
    _this._supportedLocales = supportedLocales;
    _this._storageKey = 'localeSettingsData';
    _this._globalStorage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _reducers.getSavedLocaleReducer)(_this.actionTypes)
    });
    return _this;
  }

  (0, _createClass3.default)(LocaleSettings, [{
    key: '_onStateChange',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.pending && this._globalStorage.ready && this._locale.ready)) {
                  _context.next = 10;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });

                if (this.savedLocale) {
                  _context.next = 6;
                  break;
                }

                this.saveLocale(this._locale.currentLocale);
                _context.next = 9;
                break;

              case 6:
                if (!(this.savedLocale !== this._locale.currentLocale)) {
                  _context.next = 9;
                  break;
                }

                _context.next = 9;
                return this._locale.setLocale(this.savedLocale);

              case 9:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: 'saveLocale',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(locale) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._locale.setLocale(locale);

              case 2:
                this.store.dispatch({
                  type: this.actionTypes.saveLocale,
                  locale: locale
                });

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function saveLocale(_x2) {
        return _ref3.apply(this, arguments);
      }

      return saveLocale;
    }()
  }, {
    key: '_actionTypes',
    get: function get() {
      return new _Enum2.default([].concat((0, _toConsumableArray3.default)((0, _keys2.default)(_moduleActionTypes2.default)), ['saveLocale']), 'localeSettings');
    }
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _redux.combineReducers)({
        status: (0, _getModuleStatusReducer2.default)(this.actionTypes)
      });
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'savedLocale',
    get: function get() {
      return this._globalStorage.getItem(this._storageKey);
    }
  }]);
  return LocaleSettings;
}(_RcModule3.default), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'supportedLocales', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return (0, _reselect.createSelector)(function () {
      return _this2._supportedLocales;
    }, function (s) {
      return s.slice().sort();
    });
  }
}), _applyDecoratedDescriptor(_class2.prototype, 'saveLocale', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'saveLocale'), _class2.prototype)), _class2)) || _class);
exports.default = LocaleSettings;
//# sourceMappingURL=index.js.map
