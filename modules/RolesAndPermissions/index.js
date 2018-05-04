'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _permissionsMessages = require('./permissionsMessages');

var _permissionsMessages2 = _interopRequireDefault(_permissionsMessages);

var _loginStatus = require('../Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TTL = 24 * 60 * 60 * 1000;

function extractData(permissions) {
  var output = {};
  permissions.permissions.forEach(function (item) {
    output[item.permission.id] = true;
  });
  return output;
}

/**
 * @class
 * @description Roles and permission module
 */
var RolesAndPermissions = (_dec = (0, _di.Module)({
  deps: ['Client', 'Alert', 'ExtensionInfo', { dep: 'RolesAndPermissionsOptions', optional: true }]
}), _dec(_class = function (_DataFetcher) {
  (0, _inherits3.default)(RolesAndPermissions, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Alert} params.alert - alert module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {Bool} params.isCRM - if it is CRM
   * @param {String} params.flag - app flag
   * @param {Number} params.ttl - local cache time
   */
  function RolesAndPermissions(_ref) {
    var _this2 = this;

    var isCRM = _ref.isCRM,
        flag = _ref.flag,
        client = _ref.client,
        alert = _ref.alert,
        extensionInfo = _ref.extensionInfo,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['isCRM', 'flag', 'client', 'alert', 'extensionInfo', 'ttl']);
    (0, _classCallCheck3.default)(this, RolesAndPermissions);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RolesAndPermissions.__proto__ || (0, _getPrototypeOf2.default)(RolesAndPermissions)).call(this, (0, _extends3.default)({}, options, {
      name: 'rolesAndPermissions',
      client: client,
      ttl: ttl,
      fetchFunction: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
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
      },
      forbiddenHandler: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this._auth.logout();

                case 2:
                  _this._alert.danger({
                    message: _permissionsMessages2.default.insufficientPrivilege,
                    ttl: 0
                  });
                  return _context2.abrupt('return', {});

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function forbiddenHandler() {
          return _ref3.apply(this, arguments);
        };
      }(),
      cleanOnReset: true
    })));

    _this._isCRM = !!isCRM;
    _this._flag = flag || 'SalesForce';
    _this._alert = (0, _ensureExist2.default)(alert, 'alert');
    _this._extensionInfo = (0, _ensureExist2.default)(extensionInfo, 'extensionInfo');
    _this._onDataReadyHandler = [];
    _this.addSelector('permissions', function () {
      return _this.data;
    }, function (data) {
      return data || {};
    });
    return _this;
  }

  (0, _createClass3.default)(RolesAndPermissions, [{
    key: '_onStateChange',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, handler;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._isDataReady()) {
                  _context3.next = 20;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 4;

                for (_iterator = (0, _getIterator3.default)(this._onDataReadyHandler); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  handler = _step.value;

                  handler();
                }
                _context3.next = 12;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 12:
                _context3.prev = 12;
                _context3.prev = 13;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 15:
                _context3.prev = 15;

                if (!_didIteratorError) {
                  _context3.next = 18;
                  break;
                }

                throw _iteratorError;

              case 18:
                return _context3.finish(15);

              case 19:
                return _context3.finish(12);

              case 20:
                _context3.next = 22;
                return (0, _get3.default)(RolesAndPermissions.prototype.__proto__ || (0, _getPrototypeOf2.default)(RolesAndPermissions.prototype), '_onStateChange', this).call(this);

              case 22:
                if (!(this.ready && this._auth.loginStatus === _loginStatus2.default.loggedIn && this._isCRM && this.tierEnabled !== null && !this.tierEnabled)) {
                  _context3.next = 26;
                  break;
                }

                _context3.next = 25;
                return this._auth.logout();

              case 25:
                this._alert.danger({
                  message: _permissionsMessages2.default.invalidTier,
                  ttl: 0
                });

              case 26:
                if (!(this.ready && this._auth.loginStatus === _loginStatus2.default.loggedIn && !this.permissions.ReadUserInfo)) {
                  _context3.next = 30;
                  break;
                }

                _context3.next = 29;
                return this._auth.logout();

              case 29:
                this._alert.danger({
                  message: _permissionsMessages2.default.insufficientPrivilege,
                  ttl: 0
                });

              case 30:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 8, 12, 20], [13,, 15, 19]]);
      }));

      function _onStateChange() {
        return _ref4.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: 'onDataReady',
    value: function onDataReady(fn) {
      this._onDataReadyHandler.push(fn);
    }
  }, {
    key: 'refreshServiceFeatures',
    value: function refreshServiceFeatures() {
      if (this._extensionInfo.ready) {
        this._extensionInfo.fetchData();
      }
    }
  }, {
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
  }, {
    key: 'callingEnabled',
    get: function get() {
      return this.webphoneEnabled || this.ringoutEnabled;
    }
  }, {
    key: 'tierEnabled',
    get: function get() {
      if (!this._extensionInfo.serviceFeatures || !this._extensionInfo.serviceFeatures[this._flag]) {
        return null;
      }
      return this._extensionInfo.serviceFeatures[this._flag].enabled;
    }
  }, {
    key: 'hasReadCallLogPermission',
    get: function get() {
      return !!(this.ready && this.permissions && this.permissions.ReadCallLog);
    }
  }, {
    key: 'hasPresencePermission',
    get: function get() {
      return !!(this.ready && this.callingEnabled && this.permissions && this.permissions.ReadPresenceStatus);
    }
  }, {
    key: 'hasEditPresencePermission',
    get: function get() {
      return !!(this.ready && this.callingEnabled && this.permissions && this.permissions.EditPresenceStatus);
    }
  }, {
    key: 'hasComposeTextPermission',
    get: function get() {
      return !!(this.serviceFeatures && (this.serviceFeatures.Pager && this.serviceFeatures.Pager.enabled || this.serviceFeatures.SMS && this.serviceFeatures.SMS.enabled));
    }
  }, {
    key: 'onlyPagerPermission',
    get: function get() {
      return !!(this.serviceFeatures && this.serviceFeatures.Pager && this.serviceFeatures.Pager.enabled && this.serviceFeatures.SMS && !this.serviceFeatures.SMS.enabled);
    }
  }, {
    key: 'hasReadMessagesPermission',
    get: function get() {
      return this.ready && (this.readTextPermissions || this.voicemailPermissions || this.readFaxPermissions);
    }
  }, {
    key: 'readTextPermissions',
    get: function get() {
      return !!(this.serviceFeatures && (this.serviceFeatures.PagerReceiving && this.serviceFeatures.PagerReceiving.enabled || this.serviceFeatures.SMSReceiving && this.serviceFeatures.SMSReceiving.enabled));
    }
  }, {
    key: 'voicemailPermissions',
    get: function get() {
      return !!(this.permissions && this.permissions.Voicemail && this.serviceFeatures && this.serviceFeatures.Voicemail && this.serviceFeatures.Voicemail.enabled);
    }
  }, {
    key: 'readFaxPermissions',
    get: function get() {
      return !!(this.serviceFeatures && this.serviceFeatures.FaxReceiving && this.serviceFeatures.FaxReceiving.enabled);
    }
  }, {
    key: 'hasUserGuidePermission',
    get: function get() {
      return !!(this.callingEnabled || this.hasReadMessagesPermission);
    }
  }, {
    key: 'hasConferencingPermission',
    get: function get() {
      return !!(this.serviceFeatures && this.serviceFeatures.Conferencing && this.serviceFeatures.Conferencing.enabled);
    }
  }]);
  return RolesAndPermissions;
}(_DataFetcher3.default)) || _class);
exports.default = RolesAndPermissions;
//# sourceMappingURL=index.js.map
