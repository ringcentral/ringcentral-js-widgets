'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _dec, _class, _desc, _value, _class2;

var _jsonMask = require('json-mask');

var _jsonMask2 = _interopRequireDefault(_jsonMask);

var _di = require('../../lib/di');

var _DataFetcher2 = require('../../lib/DataFetcher');

var _DataFetcher3 = _interopRequireDefault(_DataFetcher2);

var _createSimpleReducer = require('../../lib/createSimpleReducer');

var _createSimpleReducer2 = _interopRequireDefault(_createSimpleReducer);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var DEFAULT_MASK = 'phoneNumber,hostCode,participantCode,phoneNumbers(country,phoneNumber,location),allowJoinBeforeHost';

/**
 * @class
 * @description Conference managing module
 */
var Conference = (_dec = (0, _di.Module)({
  deps: ['Client', 'Storage', 'RegionSettings', 'RolesAndPermissions', { dep: 'ConferenceOptions', optional: true }]
}), _dec(_class = (_class2 = function (_DataFetcher) {
  (0, _inherits3.default)(Conference, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {RegionSettings} params.regionSettings - regionSettings module instance
   * @param {Client} params.client - client module instance
   */
  function Conference(_ref) {
    var _this2 = this;

    var client = _ref.client,
        regionSettings = _ref.regionSettings,
        storage = _ref.storage,
        rolesAndPermissions = _ref.rolesAndPermissions,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'regionSettings', 'storage', 'rolesAndPermissions']);
    (0, _classCallCheck3.default)(this, Conference);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Conference.__proto__ || (0, _getPrototypeOf2.default)(Conference)).call(this, (0, _extends3.default)({
      name: 'conference',
      client: client,
      fetchFunction: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.t0 = _jsonMask2.default;
                  _context.next = 3;
                  return client.account().extension().conferencing().get();

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
      }(),
      actionTypes: _actionTypes2.default,
      storage: storage
    }, options)));

    _this._dialInNumberStorageKey = 'conferenceDialInNumber';
    _this._additionalNumbersStorageKey = 'conferenceAdditionalNumbers';
    _this._regionSetting = regionSettings;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._lastCountryCode = null;
    _this._storage.registerReducer({
      key: _this._dialInNumberStorageKey,
      reducer: (0, _createSimpleReducer2.default)(_this.actionTypes.updateDialInNumber, 'dialInNumber')
    });
    _this._storage.registerReducer({
      key: _this._additionalNumbersStorageKey,
      reducer: (0, _createSimpleReducer2.default)(_this.actionTypes.updateAdditionalNumbers, 'additionalNumbers')
    });
    return _this;
  }

  (0, _createClass3.default)(Conference, [{
    key: '_onStateChange',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this3 = this;

        var matchedPhoneNumber;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _get3.default)(Conference.prototype.__proto__ || (0, _getPrototypeOf2.default)(Conference.prototype), '_onStateChange', this).call(this);

                if (!(!this.data || !this._regionSetting.ready || this._lastCountryCode === this._regionSetting.countryCode)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return');

              case 3:
                this._lastCountryCode = this._regionSetting.countryCode;
                matchedPhoneNumber = this.data.phoneNumbers.find(function (e) {
                  return e.country.isoCode === _this3._lastCountryCode;
                });

                if (matchedPhoneNumber && matchedPhoneNumber.phoneNumber !== this.dialInNumber) {
                  this.updateDialInNumber(matchedPhoneNumber.phoneNumber);
                }

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _onStateChange() {
        return _ref3.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return (0, _get3.default)(Conference.prototype.__proto__ || (0, _getPrototypeOf2.default)(Conference.prototype), '_shouldInit', this).call(this) && this._rolesAndPermissions.ready;
    }
  }, {
    key: 'updateEnableJoinBeforeHost',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(allowJoinBeforeHost) {
        var data;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._client.account().extension().conferencing().put({ allowJoinBeforeHost: allowJoinBeforeHost });

              case 2:
                data = _context3.sent;

                this._store.dispatch({ type: this.actionTypes.fetchSuccess, data: data });

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateEnableJoinBeforeHost(_x) {
        return _ref4.apply(this, arguments);
      }

      return updateEnableJoinBeforeHost;
    }()
  }, {
    key: 'updateDialInNumber',
    value: function updateDialInNumber(dialInNumber) {
      this._store.dispatch({ type: this.actionTypes.updateDialInNumber, dialInNumber: dialInNumber });
    }
  }, {
    key: 'updateAdditionalNumbers',
    value: function updateAdditionalNumbers(additionalNumbers) {
      this._store.dispatch({ type: this.actionTypes.updateAdditionalNumbers, additionalNumbers: additionalNumbers });
    }

    // for track invite with text

  }, {
    key: 'onInviteWithText',
    value: function onInviteWithText() {
      this.store.dispatch({
        type: this.actionTypes.inviteWithText
      });
    }
    // for track join as host

  }, {
    key: 'onJoinAsHost',
    value: function onJoinAsHost() {
      this.store.dispatch({
        type: this.actionTypes.joinAsHost
      });
    }
  }, {
    key: '_shouldFetch',
    value: function _shouldFetch() {
      return !this._tabManager || this._tabManager.active;
    }
  }, {
    key: 'additionalNumbers',
    get: function get() {
      return this._storage.getItem(this._additionalNumbersStorageKey) || [];
    }
  }, {
    key: 'dialInNumber',
    get: function get() {
      return this._storage.getItem(this._dialInNumberStorageKey) || this.data.phoneNumber;
    }
  }, {
    key: '_hasPermission',
    get: function get() {
      return !!this._rolesAndPermissions.permissions.OrganizeConference;
    }
  }]);
  return Conference;
}(_DataFetcher3.default), (_applyDecoratedDescriptor(_class2.prototype, 'updateEnableJoinBeforeHost', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateEnableJoinBeforeHost'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateDialInNumber', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateDialInNumber'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateAdditionalNumbers', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateAdditionalNumbers'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onInviteWithText', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'onInviteWithText'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onJoinAsHost', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'onJoinAsHost'), _class2.prototype)), _class2)) || _class);
exports.default = Conference;
//# sourceMappingURL=index.js.map
