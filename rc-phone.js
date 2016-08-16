'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _addModule = require('./lib/add-module');

var _addModule2 = _interopRequireDefault(_addModule);

var _ringcentral = require('ringcentral');

var _ringcentral2 = _interopRequireDefault(_ringcentral);

var _ringcentralClient = require('ringcentral-client');

var _ringcentralClient2 = _interopRequireDefault(_ringcentralClient);

var _rcModule = require('./lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _settings = require('./modules/settings');

var _settings2 = _interopRequireDefault(_settings);

var _brand = require('./modules/brand');

var _brand2 = _interopRequireDefault(_brand);

var _auth = require('./modules/auth');

var _auth2 = _interopRequireDefault(_auth);

var _subscription = require('./modules/subscription');

var _subscription2 = _interopRequireDefault(_subscription);

var _user = require('./modules/user');

var _user2 = _interopRequireDefault(_user);

var _webphone = require('./modules/webphone');

var _webphone2 = _interopRequireDefault(_webphone);

var _contact = require('./modules/contact');

var _contact2 = _interopRequireDefault(_contact);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REDUCER = (0, _symbol2.default)();

var RcPhone = function (_RcModule) {
  (0, _inherits3.default)(RcPhone, _RcModule);

  function RcPhone(options) {
    (0, _classCallCheck3.default)(this, RcPhone);
    var getState = options.getState;
    var _options$prefix = options.prefix;
    var prefix = _options$prefix === undefined ? 'rc' : _options$prefix;
    var sdkSettings = options.sdkSettings;
    var defaultBrand = options.defaultBrand;
    var promiseForStore = options.promiseForStore;

    var resolver = void 0;
    if (!promiseForStore) {
      promiseForStore = new _promise2.default(function (resolve) {
        resolver = resolve;
      });
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RcPhone).call(this, {
      promiseForStore: promiseForStore,
      getState: getState
    }));

    _addModule2.default.call(_this, 'sdk', new _ringcentral2.default((0, _extends3.default)({

      cachePrefix: prefix + '-'
    }, sdkSettings)));

    _addModule2.default.call(_this, 'platform', _this.sdk.platform());

    _addModule2.default.call(_this, 'api', new _ringcentralClient2.default(_this.sdk));

    _addModule2.default.call(_this, 'auth', new _auth2.default({
      promiseForStore: promiseForStore,
      getState: function getState() {
        return _this.state.auth;
      },
      prefix: prefix,
      platform: _this.platform
    }));

    _addModule2.default.call(_this, 'settings', new _settings2.default({
      promiseForStore: promiseForStore,
      getState: function getState() {
        return _this.state.settings;
      }
    }));

    _addModule2.default.call(_this, 'defaultBrand', new _brand2.default((0, _extends3.default)({
      promiseForStore: promiseForStore,
      prefix: prefix + '-default',
      getState: function getState() {
        return _this.state.defaultBrand;
      }
    }, defaultBrand)));

    _addModule2.default.call(_this, 'subscription', new _subscription2.default({
      promiseForStore: promiseForStore,
      getState: function getState() {
        return _this.state.subscription;
      },
      prefix: prefix,
      api: _this.api,
      platform: _this.platform,
      sdk: _this.sdk,
      auth: _this.auth
    }));

    _addModule2.default.call(_this, 'user', new _user2.default({
      promiseForStore: promiseForStore,
      getState: function getState() {
        return _this.state.user;
      },
      prefix: prefix,
      api: _this.api,
      platform: _this.platform,
      settings: _this.settings
    }));

    _addModule2.default.call(_this, 'webphone', new _webphone2.default({
      promiseForStore: promiseForStore,
      getState: function getState() {
        return _this.state.webphone;
      },
      prefix: prefix,
      api: _this.api,
      platform: _this.platform,
      settings: _this.settings,
      auth: _this.auth
    }));

    _addModule2.default.call(_this, 'contact', new _contact2.default({
      promiseForStore: promiseForStore,
      getState: function getState() {
        return _this.state.contact;
      },
      prefix: prefix,
      api: _this.api,
      platform: _this.platform,
      settings: _this.settings
    }));

    // combine reducers
    _this[REDUCER] = (0, _redux.combineReducers)({
      auth: _this.auth.reducer,
      defaultBrand: _this.defaultBrand.reducer,
      subscription: _this.subscription.reducer,
      user: _this.user.reducer,
      webphone: _this.webphone.reducer,
      settings: _this.settings.reducer
    });
    if (resolver) {
      resolver((0, _redux.createStore)(_this.reducer));
    }
    return _this;
  }

  (0, _createClass3.default)(RcPhone, [{
    key: 'reducer',
    get: function get() {
      return this[REDUCER];
    }
  }]);
  return RcPhone;
}(_rcModule2.default);

exports.default = RcPhone;
//# sourceMappingURL=rc-phone.js.map
