"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _DataFetcher2 = _interopRequireDefault(require("../../lib/DataFetcher"));

var _di = require("../../lib/di");

var _selector = require("../../lib/selector");

var _callLogHelpers = require("../../lib/callLogHelpers");

var _debounce = _interopRequireDefault(require("../../lib/debounce"));

var _getPresenceReducer = require("./getPresenceReducer");

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _dndStatus = _interopRequireDefault(require("./dndStatus"));

var _presenceStatus = require("../../enums/presenceStatus.enum");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var presenceRegExp = /.*\/presence(\?.*)?/;
var detailedPresenceRegExp = /.*\/presence\?detailedTelephonyState=true&sipData=true/;
var Presence = (_dec = (0, _di.Module)({
  deps: ['RolesAndPermissions', 'ConnectivityMonitor', {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'PresenceOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_DataFetcher) {
  _inherits(Presence, _DataFetcher);

  var _super = _createSuper(Presence);

  function Presence(_ref) {
    var _this;

    var _ref$detailed = _ref.detailed,
        detailed = _ref$detailed === void 0 ? true : _ref$detailed,
        _ref$fetchRemainingDe = _ref.fetchRemainingDelay,
        fetchRemainingDelay = _ref$fetchRemainingDe === void 0 ? 2000 : _ref$fetchRemainingDe,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? 62 * 1000 : _ref$ttl,
        _ref$polling = _ref.polling,
        polling = _ref$polling === void 0 ? false : _ref$polling,
        _ref$pollingInterval = _ref.pollingInterval,
        pollingInterval = _ref$pollingInterval === void 0 ? 3 * 60 * 1000 : _ref$pollingInterval,
        connectivityMonitor = _ref.connectivityMonitor,
        rolesAndPermissions = _ref.rolesAndPermissions,
        options = _objectWithoutProperties(_ref, ["detailed", "fetchRemainingDelay", "ttl", "polling", "pollingInterval", "connectivityMonitor", "rolesAndPermissions"]);

    _classCallCheck(this, Presence);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      polling: polling,
      ttl: ttl,
      pollingInterval: pollingInterval,
      getDataReducer: _getPresenceReducer.getDataReducer,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var endpoint, response;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  endpoint = _this._detailed ? _subscriptionFilters["default"].detailedPresence : _subscriptionFilters["default"].presence;
                  _context.next = 3;
                  return _this._client.service.platform().get(endpoint);

                case 3:
                  response = _context.sent;
                  return _context.abrupt("return", response.json());

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }

        return fetchFunction;
      }(),
      subscriptionFilters: [detailed ? _subscriptionFilters["default"].detailedPresence : _subscriptionFilters["default"].presence],
      subscriptionHandler: function subscriptionHandler(message) {
        var regExp = _this._detailed ? detailedPresenceRegExp : presenceRegExp;

        if (regExp.test(message.event) && message.body) {
          if (message.body.sequence) {
            if (message.body.sequence < _this.sequence) {
              return;
            }
          }

          var body = message.body;

          _this.store.dispatch({
            data: body,
            type: _this.actionTypes.notification,
            lastDndStatus: _this.dndStatus,
            timestamp: Date.now()
          });
          /**
           * as pointed out by Igor in https://jira.ringcentral.com/browse/PLA-33391,
           * when the real calls count larger than the active calls returned by the pubnub,
           * we need to pulling the calls manually.
           */


          var _body$activeCalls = body.activeCalls,
              activeCalls = _body$activeCalls === void 0 ? [] : _body$activeCalls,
              _body$totalActiveCall = body.totalActiveCalls,
              totalActiveCalls = _body$totalActiveCall === void 0 ? 0 : _body$totalActiveCall;

          if (activeCalls.length !== totalActiveCalls) {
            _this._fetchRemainingCalls();
          }
        }
      },
      readyCheckFn: function readyCheckFn() {
        return _this._rolesAndPermissions.ready && _this._connectivityMonitor.ready;
      }
    }));

    _initializerDefineProperty(_this, "activeCalls", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "calls", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "sessionIdList", _descriptor3, _assertThisInitialized(_this));

    _this._detailed = true;
    _this._connectivityMonitor = _ensureExist["default"].call(_assertThisInitialized(_this), connectivityMonitor, 'connectivityMonitor');
    _this._rolesAndPermissions = _ensureExist["default"].call(_assertThisInitialized(_this), rolesAndPermissions, 'rolesAndPermissions');
    _this._fetchRemainingCalls = (0, _debounce["default"])(function () {
      return _this.fetchData();
    }, fetchRemainingDelay);
    return _this;
  }

  _createClass(Presence, [{
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._shouldInit()) {
                  this._connectivity = this._connectivityMonitor.connectivity;
                }

                _get(_getPrototypeOf(Presence.prototype), "_onStateChange", this).call(this);

                if (this.ready && this._connectivityMonitor && this._connectivityMonitor.ready && this._connectivity !== this._connectivityMonitor.connectivity) {
                  this._connectivity = this._connectivityMonitor.connectivity; // fetch data on regain connectivity

                  if (this._connectivity && this._hasPermission) {
                    this.fetchData();
                  }
                }

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_update",
    value: function () {
      var _update2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {
        var ownerId, platform, response, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this._rolesAndPermissions.hasEditPresencePermission) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                _context3.prev = 2;
                ownerId = this._auth.ownerId;
                platform = this._client.service.platform();
                _context3.next = 7;
                return platform.put('/restapi/v1.0/account/~/extension/~/presence', params);

              case 7:
                response = _context3.sent;
                _context3.next = 10;
                return response.json();

              case 10:
                data = _context3.sent;

                if (ownerId === this._auth.ownerId) {
                  this.store.dispatch({
                    type: this.actionTypes.updateSuccess,
                    data: data,
                    lastDndStatus: this.dndStatus
                  });
                }

                _context3.next = 18;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](2);
                this.store.dispatch({
                  type: this.actionTypes.updateError,
                  error: _context3.t0
                });
                throw _context3.t0;

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 14]]);
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

      if (params.dndStatus !== _dndStatus["default"].takeAllCalls && params.dndStatus !== _dndStatus["default"].doNotAcceptDepartmentCalls) {
        params.dndStatus = this.lastNotDisturbDndStatus || _dndStatus["default"].takeAllCalls;
      }

      return params;
    }
  }, {
    key: "setAvailable",
    value: function () {
      var _setAvailable = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var params;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.userStatus === _presenceStatus.presenceStatus.available && this.dndStatus !== _dndStatus["default"].doNotAcceptAnyCalls)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                params = this._getUpdateStatusParams(_presenceStatus.presenceStatus.available);
                _context4.next = 5;
                return this._update(params);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setAvailable() {
        return _setAvailable.apply(this, arguments);
      }

      return setAvailable;
    }()
  }, {
    key: "setBusy",
    value: function () {
      var _setBusy = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var params;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this.userStatus === _presenceStatus.presenceStatus.busy && this.dndStatus !== _dndStatus["default"].doNotAcceptAnyCalls)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                params = this._getUpdateStatusParams(_presenceStatus.presenceStatus.busy);
                _context5.next = 5;
                return this._update(params);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setBusy() {
        return _setBusy.apply(this, arguments);
      }

      return setBusy;
    }()
  }, {
    key: "setDoNotDisturb",
    value: function () {
      var _setDoNotDisturb = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var params;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this.dndStatus === _dndStatus["default"].doNotAcceptAnyCalls)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                params = {
                  dndStatus: _dndStatus["default"].doNotAcceptAnyCalls
                };
                _context6.next = 5;
                return this._update(params);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function setDoNotDisturb() {
        return _setDoNotDisturb.apply(this, arguments);
      }

      return setDoNotDisturb;
    }()
  }, {
    key: "setInvisible",
    value: function () {
      var _setInvisible = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var params;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(this.userStatus === _presenceStatus.presenceStatus.offline && this.dndStatus !== _dndStatus["default"].doNotAcceptAnyCalls)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return");

              case 2:
                params = this._getUpdateStatusParams(_presenceStatus.presenceStatus.offline);
                _context7.next = 5;
                return this._update(params);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function setInvisible() {
        return _setInvisible.apply(this, arguments);
      }

      return setInvisible;
    }()
  }, {
    key: "setPresence",
    value: function () {
      var _setPresence = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(presenceData) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.t0 = presenceData;
                _context8.next = _context8.t0 === _presenceStatus.presenceStatus.available ? 3 : _context8.t0 === _presenceStatus.presenceStatus.busy ? 6 : _context8.t0 === _dndStatus["default"].doNotAcceptAnyCalls ? 9 : _context8.t0 === _presenceStatus.presenceStatus.offline ? 12 : 15;
                break;

              case 3:
                _context8.next = 5;
                return this.setAvailable();

              case 5:
                return _context8.abrupt("break", 18);

              case 6:
                _context8.next = 8;
                return this.setBusy();

              case 8:
                return _context8.abrupt("break", 18);

              case 9:
                _context8.next = 11;
                return this.setDoNotDisturb();

              case 11:
                return _context8.abrupt("break", 18);

              case 12:
                _context8.next = 14;
                return this.setInvisible();

              case 14:
                return _context8.abrupt("break", 18);

              case 15:
                _context8.next = 17;
                return this.setAvailable();

              case 17:
                return _context8.abrupt("break", 18);

              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function setPresence(_x2) {
        return _setPresence.apply(this, arguments);
      }

      return setPresence;
    }()
  }, {
    key: "toggleAcceptCallQueueCalls",
    value: function () {
      var _toggleAcceptCallQueueCalls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var params;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                params = {
                  userStatus: this.userStatus
                };

                if (this.dndStatus === _dndStatus["default"].takeAllCalls) {
                  params.dndStatus = _dndStatus["default"].doNotAcceptDepartmentCalls;
                } else if (this.dndStatus === _dndStatus["default"].doNotAcceptDepartmentCalls) {
                  params.dndStatus = _dndStatus["default"].takeAllCalls;
                }

                if (!params.dndStatus) {
                  _context9.next = 5;
                  break;
                }

                _context9.next = 5;
                return this._update(params);

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function toggleAcceptCallQueueCalls() {
        return _toggleAcceptCallQueueCalls.apply(this, arguments);
      }

      return toggleAcceptCallQueueCalls;
    }()
    /**
     * @override
     * @description make sure data returns object so that the property getters
     *  will not fail.
     * @returns {Object}
     */

  }, {
    key: "_name",
    get: function get() {
      return 'presence';
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      return _ObjectMap.ObjectMap.prefixKeys([].concat(_toConsumableArray(_ObjectMap.ObjectMap.keys(_get(_getPrototypeOf(Presence.prototype), "_actionTypes", this))), ['update', 'updateSuccess', 'updateError', 'notification']), this._name);
    }
  }, {
    key: "data",
    get: function get() {
      return _get(_getPrototypeOf(Presence.prototype), "data", this) || {};
    }
  }, {
    key: "sequence",
    get: function get() {
      return this.data.sequence;
    }
  }, {
    key: "telephonyStatus",
    get: function get() {
      return this.data.telephonyStatus;
    }
  }, {
    key: "dndStatus",
    get: function get() {
      return this.data.dndStatus;
    }
  }, {
    key: "lastNotDisturbDndStatus",
    get: function get() {
      return this.data.lastNotDisturbDndStatus;
    }
  }, {
    key: "userStatus",
    get: function get() {
      return this.data.userStatus;
    }
  }, {
    key: "presenceStatus",
    get: function get() {
      return this.data.presenceStatus;
    }
  }, {
    key: "meetingStatus",
    get: function get() {
      return this.data.meetingStatus;
    }
  }, {
    key: "presenceOption",
    get: function get() {
      // available
      if (this.data.userStatus === _presenceStatus.presenceStatus.available && this.data.dndStatus !== _dndStatus["default"].doNotAcceptAnyCalls) {
        return _presenceStatus.presenceStatus.available;
      } // busy


      if (this.data.userStatus === _presenceStatus.presenceStatus.busy && this.data.dndStatus !== _dndStatus["default"].doNotAcceptAnyCalls) {
        return _presenceStatus.presenceStatus.busy;
      } // doNotDisturb


      if (this.data.dndStatus === _dndStatus["default"].doNotAcceptAnyCalls) {
        return _dndStatus["default"].doNotAcceptAnyCalls;
      } // invisible


      if (this.data.userStatus === _presenceStatus.presenceStatus.offline && this.data.dndStatus !== _dndStatus["default"].doNotAcceptAnyCalls) {
        return _presenceStatus.presenceStatus.offline;
      }

      return _presenceStatus.presenceStatus.available;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._rolesAndPermissions.hasPresencePermission;
    }
  }]);

  return Presence;
}(_DataFetcher2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_update", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_update"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "activeCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return [function () {
      return _this2.data.activeCalls;
    }, function (calls) {
      return calls || [];
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "calls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return [function () {
      return _this3.activeCalls;
    }, function (activeCalls) {
      return (0, _callLogHelpers.removeInboundRingOutLegs)(activeCalls).filter(function (call) {
        return !(0, _callLogHelpers.isEnded)(call);
      });
    }];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sessionIdList", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return [function () {
      return _this4.calls;
    }, function (calls) {
      return calls.map(function (call) {
        return call.sessionId;
      });
    }];
  }
})), _class2)) || _class);
exports["default"] = Presence;
//# sourceMappingURL=index.js.map
