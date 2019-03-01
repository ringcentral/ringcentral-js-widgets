"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _getPresenceReducer = _interopRequireWildcard(require("./getPresenceReducer"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _dndStatus = _interopRequireDefault(require("./dndStatus"));

var _presenceStatus = _interopRequireDefault(require("./presenceStatus"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _dec, _class, _class2;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

var presenceEndPoint = /.*\/presence(\?.*)?/;
/**
 * @class
 * @description Presence info module
 */

var Presence = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Client', 'Subscription', 'RolesAndPermissions', {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'ConnectivityMonitor',
    optional: true
  }, {
    dep: 'PresenceOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(Presence, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Storage} params.storage - storage module instance
   * @param {Subscription} params.subscription - subscription module instance
   * @param {Object} params.actionTypes - actionTypes enums
   */
  function Presence(_ref) {
    var _context;

    var _this;

    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        subscription = _ref.subscription,
        rolesAndPermissions = _ref.rolesAndPermissions,
        connectivityMonitor = _ref.connectivityMonitor,
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === void 0 ? _actionTypes.default : _ref$actionTypes,
        _ref$getReducer = _ref.getReducer,
        getReducer = _ref$getReducer === void 0 ? _getPresenceReducer.default : _ref$getReducer,
        _ref$subscriptionFilt = _ref.subscriptionFilter,
        subscriptionFilter = _ref$subscriptionFilt === void 0 ? _subscriptionFilters.default.presence : _ref$subscriptionFilt,
        _ref$lastNotDisturbDn = _ref.lastNotDisturbDndStatusStorageKey,
        lastNotDisturbDndStatusStorageKey = _ref$lastNotDisturbDn === void 0 ? 'lastNotDisturbDndStatus' : _ref$lastNotDisturbDn,
        options = _objectWithoutProperties(_ref, ["auth", "client", "storage", "subscription", "rolesAndPermissions", "connectivityMonitor", "actionTypes", "getReducer", "subscriptionFilter", "lastNotDisturbDndStatusStorageKey"]);

    _classCallCheck(this, Presence);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Presence).call(this, _objectSpread({}, options, {
      actionTypes: actionTypes
    })));
    _this._auth = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, auth, 'auth');
    _this._client = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, client, 'client');
    _this._subscription = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, subscription, 'subscription');
    _this._rolesAndPermissions = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, rolesAndPermissions, 'rolesAndPermissions');
    _this._storage = storage;
    _this._connectivityMonitor = connectivityMonitor;
    _this._subscriptionFilter = subscriptionFilter;
    _this._lastMessage = null;
    _this._delayTimeoutId = null;
    _this._lastNotDisturbDndStatusStorageKey = lastNotDisturbDndStatusStorageKey;

    if (_this._storage) {
      _this._reducer = getReducer(_this.actionTypes);

      _this._storage.registerReducer({
        key: _this._lastNotDisturbDndStatusStorageKey,
        reducer: (0, _getPresenceReducer.getLastNotDisturbDndStatusReducer)(_this.actionTypes)
      });
    } else {
      _this._reducer = getReducer(_this.actionTypes, {
        lastNotDisturbDndStatus: (0, _getPresenceReducer.getLastNotDisturbDndStatusReducer)(_this.actionTypes)
      });
    }

    _this._lastSequence = 0;
    return _this;
  }

  _createClass(Presence, [{
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 3;
                return this._init();

              case 3:
                _context2.next = 6;
                break;

              case 5:
                if (this._shouldReset()) {
                  this._reset();
                } else if (this.ready && this._subscription.ready && this._subscription.message && this._subscription.message !== this._lastMessage) {
                  this._lastMessage = this._subscription.message;

                  this._subscriptionHandler(this._lastMessage);
                } else if (this.ready && this._connectivityMonitor && this._connectivityMonitor.ready && this._connectivity !== this._connectivityMonitor.connectivity) {
                  this._connectivity = this._connectivityMonitor.connectivity; // fetch data on regain connectivity

                  if (this._connectivity) {
                    if (this._rolesAndPermissions.hasPresencePermission) {
                      this._fetch();
                    }
                  }
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_subscriptionHandler",
    value: function _subscriptionHandler(message) {
      if (message && presenceEndPoint.test(message.event) && message.body) {
        if (message.body.sequence) {
          if (message.body.sequence < this._lastSequence) {
            return;
          }

          this._lastSequence = message.body.sequence;
        }

        this.store.dispatch(_objectSpread({
          type: this.actionTypes.notification
        }, message.body));
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._auth.loggedIn && (!this._storage || this._storage.ready) && (!this._connectivityMonitor || this._connectivityMonitor.ready) && this._subscription.ready && this._rolesAndPermissions.ready && this.status === _moduleStatuses.default.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !!this._storage && !this._storage.ready || !this._rolesAndPermissions.ready || this._connectivityMonitor && !this._connectivityMonitor.ready || !this._subscription.ready) && this.ready;
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.init
                });

                if (this._connectivityMonitor) {
                  this._connectivity = this._connectivityMonitor.connectivity;
                }

                if (!this._rolesAndPermissions.hasPresencePermission) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 5;
                return this.fetch();

              case 5:
                this._subscription.subscribe(this._subscriptionFilter);

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function _init() {
        return _init2.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: "_reset",
    value: function _reset() {
      this.store.dispatch({
        type: this.actionTypes.reset
      });
      this._lastSequence = 0;
      this._lastMessage = null;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "_fetch",
    value: function () {
      var _fetch2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var ownerId, data;
        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.fetch
                });
                _context4.prev = 1;
                ownerId = this._auth.ownerId;
                _context4.next = 5;
                return this._client.account().extension().presence().get();

              case 5:
                data = _context4.sent;

                if (ownerId === this._auth.ownerId) {
                  this.store.dispatch(_objectSpread({
                    type: this.actionTypes.fetchSuccess
                  }, data, {
                    lastDndStatus: this.dndStatus
                  }));
                }

                this._promise = null;
                _context4.next = 15;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](1);
                this._promise = null;
                this.store.dispatch({
                  type: this.actionTypes.fetchError,
                  error: _context4.t0
                });
                throw _context4.t0;

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, this, [[1, 10]]);
      }));

      function _fetch() {
        return _fetch2.apply(this, arguments);
      }

      return _fetch;
    }()
  }, {
    key: "fetch",
    value: function () {
      var _fetch3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this._promise) {
                  this._promise = this._fetch();
                }

                return _context5.abrupt("return", this._promise);

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetch() {
        return _fetch3.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: "_update",
    value: function () {
      var _update2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(params) {
        var ownerId, platform, response, data;
        return regeneratorRuntime.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this._rolesAndPermissions.hasEditPresencePermission) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                _context6.prev = 2;
                ownerId = this._auth.ownerId;
                platform = this._client.service.platform();
                _context6.next = 7;
                return platform.put('/account/~/extension/~/presence', params);

              case 7:
                response = _context6.sent;
                data = response.json();

                if (ownerId === this._auth.ownerId) {
                  this.store.dispatch(_objectSpread({
                    type: this.actionTypes.updateSuccess
                  }, data, {
                    lastDndStatus: this.dndStatus
                  }));
                }

                _context6.next = 16;
                break;

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](2);
                this.store.dispatch({
                  type: this.actionTypes.updateError,
                  error: _context6.t0
                });
                throw _context6.t0;

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee5, this, [[2, 12]]);
      }));

      function _update(_x) {
        return _update2.apply(this, arguments);
      }

      return _update;
    }()
  }, {
    key: "_getUpdateStatusParams",
    value: function _getUpdateStatusParams(userStatusParams) {
      var params = {
        dndStatus: this.dndStatus,
        userStatus: userStatusParams
      };

      if (params.dndStatus !== _dndStatus.default.takeAllCalls && params.dndStatus !== _dndStatus.default.doNotAcceptDepartmentCalls) {
        params.dndStatus = this.lastNotDisturbDndStatus || _dndStatus.default.takeAllCalls;
      }

      return params;
    }
  }, {
    key: "setAvailable",
    value: function () {
      var _setAvailable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var params;
        return regeneratorRuntime.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(this.userStatus === _presenceStatus.default.available && this.dndStatus !== _dndStatus.default.doNotAcceptAnyCalls)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return");

              case 2:
                params = this._getUpdateStatusParams(_presenceStatus.default.available);
                _context7.next = 5;
                return this._update(params);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee6, this);
      }));

      function setAvailable() {
        return _setAvailable.apply(this, arguments);
      }

      return setAvailable;
    }()
  }, {
    key: "setBusy",
    value: function () {
      var _setBusy = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var params;
        return regeneratorRuntime.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(this.userStatus === _presenceStatus.default.busy && this.dndStatus !== _dndStatus.default.doNotAcceptAnyCalls)) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return");

              case 2:
                params = this._getUpdateStatusParams(_presenceStatus.default.busy);
                _context8.next = 5;
                return this._update(params);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee7, this);
      }));

      function setBusy() {
        return _setBusy.apply(this, arguments);
      }

      return setBusy;
    }()
  }, {
    key: "setDoNotDisturb",
    value: function () {
      var _setDoNotDisturb = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var params;
        return regeneratorRuntime.wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(this.dndStatus === _dndStatus.default.doNotAcceptAnyCalls)) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt("return");

              case 2:
                params = {
                  dndStatus: _dndStatus.default.doNotAcceptAnyCalls,
                  userStatus: _presenceStatus.default.busy
                };
                _context9.next = 5;
                return this._update(params);

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee8, this);
      }));

      function setDoNotDisturb() {
        return _setDoNotDisturb.apply(this, arguments);
      }

      return setDoNotDisturb;
    }()
  }, {
    key: "setInvisible",
    value: function () {
      var _setInvisible = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9() {
        var params;
        return regeneratorRuntime.wrap(function _callee9$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(this.userStatus === _presenceStatus.default.offline && this.dndStatus !== _dndStatus.default.doNotAcceptAnyCalls)) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return");

              case 2:
                params = this._getUpdateStatusParams(_presenceStatus.default.offline);
                _context10.next = 5;
                return this._update(params);

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee9, this);
      }));

      function setInvisible() {
        return _setInvisible.apply(this, arguments);
      }

      return setInvisible;
    }()
  }, {
    key: "setPresence",
    value: function () {
      var _setPresence = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(presenceData) {
        return regeneratorRuntime.wrap(function _callee10$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.t0 = presenceData;
                _context11.next = _context11.t0 === _presenceStatus.default.available ? 3 : _context11.t0 === _presenceStatus.default.busy ? 6 : _context11.t0 === _dndStatus.default.doNotAcceptAnyCalls ? 9 : _context11.t0 === _presenceStatus.default.offline ? 12 : 15;
                break;

              case 3:
                _context11.next = 5;
                return this.setAvailable();

              case 5:
                return _context11.abrupt("break", 18);

              case 6:
                _context11.next = 8;
                return this.setBusy();

              case 8:
                return _context11.abrupt("break", 18);

              case 9:
                _context11.next = 11;
                return this.setDoNotDisturb();

              case 11:
                return _context11.abrupt("break", 18);

              case 12:
                _context11.next = 14;
                return this.setInvisible();

              case 14:
                return _context11.abrupt("break", 18);

              case 15:
                _context11.next = 17;
                return this.setAvailable();

              case 17:
                return _context11.abrupt("break", 18);

              case 18:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee10, this);
      }));

      function setPresence(_x2) {
        return _setPresence.apply(this, arguments);
      }

      return setPresence;
    }()
  }, {
    key: "toggleAcceptCallQueueCalls",
    value: function () {
      var _toggleAcceptCallQueueCalls = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11() {
        var params;
        return regeneratorRuntime.wrap(function _callee11$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                params = {
                  userStatus: this.userStatus
                };

                if (this.dndStatus === _dndStatus.default.takeAllCalls) {
                  params.dndStatus = _dndStatus.default.doNotAcceptDepartmentCalls;
                } else if (this.dndStatus === _dndStatus.default.doNotAcceptDepartmentCalls) {
                  params.dndStatus = _dndStatus.default.takeAllCalls;
                }

                if (!params.dndStatus) {
                  _context12.next = 5;
                  break;
                }

                _context12.next = 5;
                return this._update(params);

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee11, this);
      }));

      function toggleAcceptCallQueueCalls() {
        return _toggleAcceptCallQueueCalls.apply(this, arguments);
      }

      return toggleAcceptCallQueueCalls;
    }()
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses.default.ready;
    }
  }, {
    key: "dndStatus",
    get: function get() {
      return this.state.dndStatus;
    }
  }, {
    key: "lastNotDisturbDndStatus",
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._lastNotDisturbDndStatusStorageKey);
      }

      return this.state.lastNotDisturbDndStatus;
    }
  }, {
    key: "userStatus",
    get: function get() {
      return this.state.userStatus;
    }
  }, {
    key: "message",
    get: function get() {
      return this.state.message;
    }
  }, {
    key: "presenceStatus",
    get: function get() {
      return this.state.presenceStatus;
    }
  }, {
    key: "presenceOption",
    get: function get() {
      // available
      if (this.state.userStatus === _presenceStatus.default.available && this.state.dndStatus !== _dndStatus.default.doNotAcceptAnyCalls) {
        return _presenceStatus.default.available;
      } // busy


      if (this.state.userStatus === _presenceStatus.default.busy && this.state.dndStatus !== _dndStatus.default.doNotAcceptAnyCalls) {
        return _presenceStatus.default.busy;
      } // doNotDisturb


      if (this.state.dndStatus === _dndStatus.default.doNotAcceptAnyCalls) {
        return _dndStatus.default.doNotAcceptAnyCalls;
      } // invisible


      if (this.state.userStatus === _presenceStatus.default.offline && this.state.dndStatus !== _dndStatus.default.doNotAcceptAnyCalls) {
        return _presenceStatus.default.offline;
      }

      return _presenceStatus.default.available;
    }
  }]);

  return Presence;
}(_RcModule2.default), (_applyDecoratedDescriptor(_class2.prototype, "_fetch", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetch", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "fetch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_update", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "_update"), _class2.prototype)), _class2)) || _class);
exports.default = Presence;
//# sourceMappingURL=index.js.map
