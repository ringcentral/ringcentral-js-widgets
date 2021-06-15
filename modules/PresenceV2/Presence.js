"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Presence = exports.detailedPresenceRegExp = exports.presenceRegExp = exports.DEFAULT_MAX_FETCH_DELAY = exports.DEFAULT_FETCH_DELAY = exports.DEFAULT_POLLING_INTERVAL = exports.DEFAULT_TTL = void 0;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _ramda = require("ramda");

var _presenceStatus2 = require("../../enums/presenceStatus.enum");

var _subscriptionFilters = require("../../enums/subscriptionFilters");

var _callLogHelpers = require("../../lib/callLogHelpers");

var _debounceThrottle = require("../../lib/debounce-throttle");

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _DataFetcherV = require("../DataFetcherV2");

var _dndStatus2 = require("../Presence/dndStatus");

var _getPresenceReducer = require("../Presence/getPresenceReducer");

var _dec, _dec2, _dec3, _dec4, _class, _class2;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DEFAULT_TTL = 62 * 1000;
exports.DEFAULT_TTL = DEFAULT_TTL;
var DEFAULT_POLLING_INTERVAL = 3 * 60 * 1000;
exports.DEFAULT_POLLING_INTERVAL = DEFAULT_POLLING_INTERVAL;
var DEFAULT_FETCH_DELAY = 2 * 1000;
exports.DEFAULT_FETCH_DELAY = DEFAULT_FETCH_DELAY;
var DEFAULT_MAX_FETCH_DELAY = 4 * 1000;
exports.DEFAULT_MAX_FETCH_DELAY = DEFAULT_MAX_FETCH_DELAY;
var presenceRegExp = /.*\/presence(\?.*)?/;
exports.presenceRegExp = presenceRegExp;
var detailedPresenceRegExp = /.*\/presence\?detailedTelephonyState=true&sipData=true/;
exports.detailedPresenceRegExp = detailedPresenceRegExp;
var Presence = (_dec = (0, _di.Module)({
  name: 'Presence',
  deps: ['Auth', 'Client', 'ConnectivityMonitor', 'DataFetcherV2', 'ExtensionFeatures', 'Subscription', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'PresenceOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var activeCalls = _ref2.activeCalls;
  return [activeCalls];
}), _dec4 = (0, _core.computed)(function (_ref3) {
  var calls = _ref3.calls;
  return [calls];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(Presence, _DataFetcherV2Consume);

  var _super = _createSuper(Presence);

  function Presence(deps) {
    var _deps$presenceOptions;

    var _this;

    _classCallCheck(this, Presence);

    _this = _super.call(this, {
      deps: deps
    });
    _this._debouncedFetchData = void 0;
    _this._stopWatchingConnectivity = null;
    _this._stopWatchingSubscription = null;
    var presenceOptions = (_deps$presenceOptions = deps.presenceOptions) !== null && _deps$presenceOptions !== void 0 ? _deps$presenceOptions : {};
    var _presenceOptions$ttl = presenceOptions.ttl,
        ttl = _presenceOptions$ttl === void 0 ? DEFAULT_TTL : _presenceOptions$ttl,
        _presenceOptions$poll = presenceOptions.pollingInterval,
        pollingInterval = _presenceOptions$poll === void 0 ? DEFAULT_POLLING_INTERVAL : _presenceOptions$poll;
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, presenceOptions), {}, {
      key: 'presence',
      cleanOnReset: true,
      ttl: ttl,
      pollingInterval: pollingInterval,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var response, data, _data$dndStatus, dndStatus, _data$meetingStatus, meetingStatus, _data$presenceStatus, presenceStatus, _data$telephonyStatus, telephonyStatus, _data$userStatus, userStatus, activeCalls;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this._deps.client.service.platform().get(_this._endPoint);

                case 2:
                  response = _context.sent;
                  _context.next = 5;
                  return response.json();

                case 5:
                  data = _context.sent;
                  _data$dndStatus = data.dndStatus, dndStatus = _data$dndStatus === void 0 ? _this.dndStatus : _data$dndStatus, _data$meetingStatus = data.meetingStatus, meetingStatus = _data$meetingStatus === void 0 ? _this.meetingStatus : _data$meetingStatus, _data$presenceStatus = data.presenceStatus, presenceStatus = _data$presenceStatus === void 0 ? _this.presenceStatus : _data$presenceStatus, _data$telephonyStatus = data.telephonyStatus, telephonyStatus = _data$telephonyStatus === void 0 ? _this.telephonyStatus : _data$telephonyStatus, _data$userStatus = data.userStatus, userStatus = _data$userStatus === void 0 ? _this.userStatus : _data$userStatus;
                  activeCalls = _this._processRawActiveCalls(data.activeCalls, data.totalActiveCalls, Date.now());
                  return _context.abrupt("return", {
                    lastDndStatus: _this._lastDndStatus,
                    sequence: _this._sequence,
                    activeCalls: activeCalls,
                    dndStatus: dndStatus,
                    meetingStatus: meetingStatus,
                    presenceStatus: presenceStatus,
                    telephonyStatus: telephonyStatus,
                    userStatus: userStatus
                  });

                case 9:
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
      readyCheckFunction: function readyCheckFunction() {
        return _this._deps.auth.ready && _this._deps.auth.loggedIn && _this._deps.subscription.ready && _this._deps.extensionFeatures.ready && _this._deps.connectivityMonitor.ready && _this._deps.dataFetcherV2.ready;
      },
      permissionCheckFunction: function permissionCheckFunction() {
        return _this._checkPermission();
      }
    }));

    _this._deps.dataFetcherV2.register(_this._source);

    _this._debouncedFetchData = (0, _debounceThrottle.debounce)({
      fn: _this.fetchData,
      threshold: _this._fetchDelay,
      maxThreshold: _this._maxFetchDelay
    });
    return _this;
  }

  _createClass(Presence, [{
    key: "_checkPermission",
    value: function _checkPermission() {
      var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3;

      return (_this$_deps$extension = (_this$_deps$extension2 = this._deps.extensionFeatures.features) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.ReadPresenceStatus) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.available) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : false;
    }
  }, {
    key: "_processRawActiveCalls",
    value: function _processRawActiveCalls() {
      var _this2 = this;

      var activeCalls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var totalActiveCalls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var timestamp = arguments.length > 2 ? arguments[2] : undefined;

      if (activeCalls.length < totalActiveCalls) {
        return this.activeCalls;
      }

      return (0, _ramda.map)(function (activeCall) {
        var existingCall = _this2.activeCalls.find(function (call) {
          return call.sessionId === activeCall.sessionId;
        });

        if (!existingCall) {
          var normalizedCall = (0, _callLogHelpers.normalizeStartTime)((0, _callLogHelpers.normalizeFromTo)(activeCall));
          var startTime = normalizedCall.startTime || timestamp;
          var offset = Math.min(timestamp - startTime, 0);
          return _objectSpread(_objectSpread({}, normalizedCall), {}, {
            startTime: startTime,
            offset: offset
          });
        }

        return _objectSpread(_objectSpread({}, existingCall), (0, _callLogHelpers.normalizeStartTime)((0, _callLogHelpers.normalizeFromTo)(activeCall)));
      }, (0, _getPresenceReducer.removeIntermediateCall)([], activeCalls));
    }
  }, {
    key: "_handleSubscription",
    value: function _handleSubscription(message) {
      var _this$_deps$tabManage, _this$_deps$tabManage2;

      var regExp = this._detailed ? detailedPresenceRegExp : presenceRegExp;

      if (this.ready && (this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true)) && regExp.test(message.event) && message.body) {
        var _message$body$activeC, _message$body$activeC2, _message$body$totalAc;

        if (message.body.sequence && message.body.sequence < this._sequence) {
          return;
        }

        var timestamp = Date.now();

        var _message$body = message.body,
            _message$body$sequenc = _message$body.sequence,
            sequence = _message$body$sequenc === void 0 ? this._sequence : _message$body$sequenc,
            _message$body$dndStat = _message$body.dndStatus,
            _dndStatus = _message$body$dndStat === void 0 ? this.dndStatus : _message$body$dndStat,
            _message$body$meeting = _message$body.meetingStatus,
            meetingStatus = _message$body$meeting === void 0 ? this.meetingStatus : _message$body$meeting,
            _message$body$presenc = _message$body.presenceStatus,
            _presenceStatus = _message$body$presenc === void 0 ? this.presenceStatus : _message$body$presenc,
            _message$body$telepho = _message$body.telephonyStatus,
            telephonyStatus = _message$body$telepho === void 0 ? this.telephonyStatus : _message$body$telepho,
            _message$body$userSta = _message$body.userStatus,
            userStatus = _message$body$userSta === void 0 ? this.userStatus : _message$body$userSta;

        var activeCalls = this._processRawActiveCalls(message.body.activeCalls, message.body.totalActiveCalls, timestamp);

        this._updateData({
          sequence: sequence,
          activeCalls: activeCalls,
          dndStatus: _dndStatus,
          meetingStatus: meetingStatus,
          presenceStatus: _presenceStatus,
          telephonyStatus: telephonyStatus,
          userStatus: userStatus,
          lastDndStatus: this._calculateLastDndStatus(_dndStatus)
        }, timestamp);
        /**
         * as pointed out by Igor in https://jira.ringcentral.com/browse/PLA-33391,
         * when the real calls count larger than the active calls returned by the pubnub,
         * we need to pulling the calls manually.
         */


        var activeCallsLength = (_message$body$activeC = (_message$body$activeC2 = message.body.activeCalls) === null || _message$body$activeC2 === void 0 ? void 0 : _message$body$activeC2.length) !== null && _message$body$activeC !== void 0 ? _message$body$activeC : 0;
        var totalActiveCalls = (_message$body$totalAc = message.body.totalActiveCalls) !== null && _message$body$totalAc !== void 0 ? _message$body$totalAc : 0;

        if (this._detailed && activeCallsLength < totalActiveCalls) {
          this._debouncedFetchData();
        }
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this3 = this;

      this._deps.subscription.subscribe([this._endPoint]);

      this._stopWatchingConnectivity = (0, _core.watch)(this, function () {
        return _this3._deps.connectivityMonitor.connectivity;
      }, function (connectivity) {
        return _this3._handleConnectivity(connectivity);
      });
      this._stopWatchingSubscription = (0, _core.watch)(this, function () {
        return _this3._deps.subscription.message;
      }, function (message) {
        return _this3._handleSubscription(message);
      });
    }
  }, {
    key: "_handleConnectivity",
    value: function _handleConnectivity(connectivity) {
      var _this$_deps$tabManage3, _this$_deps$tabManage4;

      if (this.ready && (this._source.disableCache || ((_this$_deps$tabManage3 = (_this$_deps$tabManage4 = this._deps.tabManager) === null || _this$_deps$tabManage4 === void 0 ? void 0 : _this$_deps$tabManage4.active) !== null && _this$_deps$tabManage3 !== void 0 ? _this$_deps$tabManage3 : true)) && connectivity && this._checkPermission()) {
        this.fetchData();
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatchingCo, _this$_stopWatchingSu;

      (_this$_stopWatchingCo = this._stopWatchingConnectivity) === null || _this$_stopWatchingCo === void 0 ? void 0 : _this$_stopWatchingCo.call(this);
      this._stopWatchingConnectivity = null;
      (_this$_stopWatchingSu = this._stopWatchingSubscription) === null || _this$_stopWatchingSu === void 0 ? void 0 : _this$_stopWatchingSu.call(this);
      this._stopWatchingSubscription = null;

      this._debouncedFetchData.cancel();
    }
  }, {
    key: "_calculateLastDndStatus",
    value: function _calculateLastDndStatus(newDndStatus) {
      return newDndStatus !== this.dndStatus && newDndStatus !== _dndStatus2.dndStatus.doNotAcceptAnyCalls ? newDndStatus : this._lastDndStatus;
    }
  }, {
    key: "_update",
    value: function () {
      var _update2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {
        var _this$_deps$extension4, _this$_deps$extension5;

        var ownerId, response, data, _ref4, newDndStatus;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if ((_this$_deps$extension4 = this._deps.extensionFeatures.features) === null || _this$_deps$extension4 === void 0 ? void 0 : (_this$_deps$extension5 = _this$_deps$extension4.EditPresenceStatus) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.available) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                ownerId = this._deps.auth.ownerId;
                _context2.next = 5;
                return this._deps.client.service.platform().put('/restapi/v1.0/account/~/extension/~/presence', params);

              case 5:
                response = _context2.sent;
                _context2.next = 8;
                return response.json();

              case 8:
                data = _context2.sent;

                if (ownerId === this._deps.auth.ownerId) {
                  newDndStatus = (_ref4 = data.dndStatus !== 'Unknown' && data.dndStatus) !== null && _ref4 !== void 0 ? _ref4 : this.data.dndStatus;

                  this._updateData({
                    presenceStatus: data.presenceStatus,
                    userStatus: data.userStatus,
                    telephonyStatus: data.telephonyStatus,
                    dndStatus: newDndStatus,
                    meetingStatus: data.meetingStatus,
                    lastDndStatus: this._calculateLastDndStatus(newDndStatus)
                  });
                }

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _update(_x) {
        return _update2.apply(this, arguments);
      }

      return _update;
    }()
  }, {
    key: "_updateData",
    value: function () {
      var _updateData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
        var timestamp,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                timestamp = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : Date.now();

                this._deps.dataFetcherV2.updateData(this._source, _objectSpread(_objectSpread({}, this.data), data), timestamp);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _updateData(_x2) {
        return _updateData2.apply(this, arguments);
      }

      return _updateData;
    }()
  }, {
    key: "_getUpdateStatusParams",
    value: function _getUpdateStatusParams(userStatus) {
      var params = {
        dndStatus: this.dndStatus,
        userStatus: userStatus
      };

      if (params.dndStatus !== _dndStatus2.dndStatus.takeAllCalls && params.dndStatus !== _dndStatus2.dndStatus.doNotAcceptDepartmentCalls) {
        var _this$_lastDndStatus;

        params.dndStatus = (_this$_lastDndStatus = this._lastDndStatus) !== null && _this$_lastDndStatus !== void 0 ? _this$_lastDndStatus : _dndStatus2.dndStatus.takeAllCalls;
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
                if (!(this.userStatus === _presenceStatus2.presenceStatus.available && this.dndStatus !== _dndStatus2.dndStatus.doNotAcceptAnyCalls)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                params = this._getUpdateStatusParams(_presenceStatus2.presenceStatus.available);
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
                if (!(this.userStatus === _presenceStatus2.presenceStatus.busy && this.dndStatus !== _dndStatus2.dndStatus.doNotAcceptAnyCalls)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                params = this._getUpdateStatusParams(_presenceStatus2.presenceStatus.busy);
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
                if (!(this.dndStatus === _dndStatus2.dndStatus.doNotAcceptAnyCalls)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                params = {
                  dndStatus: _dndStatus2.dndStatus.doNotAcceptAnyCalls
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
                if (!(this.userStatus === _presenceStatus2.presenceStatus.offline && this.dndStatus !== _dndStatus2.dndStatus.doNotAcceptAnyCalls)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return");

              case 2:
                params = this._getUpdateStatusParams(_presenceStatus2.presenceStatus.offline);
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
                _context8.next = _context8.t0 === _presenceStatus2.presenceStatus.available ? 3 : _context8.t0 === _presenceStatus2.presenceStatus.busy ? 6 : _context8.t0 === _dndStatus2.dndStatus.doNotAcceptAnyCalls ? 9 : _context8.t0 === _presenceStatus2.presenceStatus.offline ? 12 : 15;
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

      function setPresence(_x3) {
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

                if (this.dndStatus === _dndStatus2.dndStatus.takeAllCalls) {
                  params.dndStatus = _dndStatus2.dndStatus.doNotAcceptDepartmentCalls;
                } else if (this.dndStatus === _dndStatus2.dndStatus.doNotAcceptDepartmentCalls) {
                  params.dndStatus = _dndStatus2.dndStatus.takeAllCalls;
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
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this._debouncedFetchData.cancel();

                return _context10.abrupt("return", this._deps.dataFetcherV2.fetchData(this._source));

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function fetchData() {
        return _fetchData.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "_endPoint",
    get: function get() {
      return this._detailed ? _subscriptionFilters.subscriptionFilters.detailedPresence : _subscriptionFilters.subscriptionFilters.presence;
    }
  }, {
    key: "_detailed",
    get: function get() {
      var _this$_deps$presenceO, _this$_deps$presenceO2;

      return !!((_this$_deps$presenceO = (_this$_deps$presenceO2 = this._deps.presenceOptions) === null || _this$_deps$presenceO2 === void 0 ? void 0 : _this$_deps$presenceO2.detailed) !== null && _this$_deps$presenceO !== void 0 ? _this$_deps$presenceO : true);
    }
  }, {
    key: "_fetchDelay",
    get: function get() {
      var _this$_deps$presenceO3, _this$_deps$presenceO4;

      return Math.max(0, (_this$_deps$presenceO3 = (_this$_deps$presenceO4 = this._deps.presenceOptions) === null || _this$_deps$presenceO4 === void 0 ? void 0 : _this$_deps$presenceO4.fetchDelay) !== null && _this$_deps$presenceO3 !== void 0 ? _this$_deps$presenceO3 : DEFAULT_FETCH_DELAY);
    }
  }, {
    key: "_maxFetchDelay",
    get: function get() {
      var _this$_deps$presenceO5, _this$_deps$presenceO6;

      return Math.max(this._fetchDelay, (_this$_deps$presenceO5 = (_this$_deps$presenceO6 = this._deps.presenceOptions) === null || _this$_deps$presenceO6 === void 0 ? void 0 : _this$_deps$presenceO6.maxFetchDelay) !== null && _this$_deps$presenceO5 !== void 0 ? _this$_deps$presenceO5 : DEFAULT_MAX_FETCH_DELAY);
    }
  }, {
    key: "_lastDndStatus",
    get: function get() {
      var _this$data$lastDndSta, _this$data;

      return (_this$data$lastDndSta = (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.lastDndStatus) !== null && _this$data$lastDndSta !== void 0 ? _this$data$lastDndSta : null;
    }
  }, {
    key: "_sequence",
    get: function get() {
      var _this$data$sequence, _this$data2;

      return (_this$data$sequence = (_this$data2 = this.data) === null || _this$data2 === void 0 ? void 0 : _this$data2.sequence) !== null && _this$data$sequence !== void 0 ? _this$data$sequence : 0;
    }
  }, {
    key: "activeCalls",
    get: function get() {
      var _this$data$activeCall, _this$data3;

      return (_this$data$activeCall = (_this$data3 = this.data) === null || _this$data3 === void 0 ? void 0 : _this$data3.activeCalls) !== null && _this$data$activeCall !== void 0 ? _this$data$activeCall : [];
    }
  }, {
    key: "calls",
    get: function get() {
      return (0, _ramda.filter)(function (call) {
        return !(0, _callLogHelpers.isEnded)(call);
      }, (0, _callLogHelpers.removeInboundRingOutLegs)(this.activeCalls));
    }
  }, {
    key: "sessionIdList",
    get: function get() {
      return (0, _ramda.map)(function (call) {
        return call.sessionId;
      }, this.calls);
    }
  }, {
    key: "telephonyStatus",
    get: function get() {
      var _this$data$telephonyS, _this$data4;

      return (_this$data$telephonyS = (_this$data4 = this.data) === null || _this$data4 === void 0 ? void 0 : _this$data4.telephonyStatus) !== null && _this$data$telephonyS !== void 0 ? _this$data$telephonyS : null;
    }
  }, {
    key: "dndStatus",
    get: function get() {
      var _this$data$dndStatus, _this$data5;

      return (_this$data$dndStatus = (_this$data5 = this.data) === null || _this$data5 === void 0 ? void 0 : _this$data5.dndStatus) !== null && _this$data$dndStatus !== void 0 ? _this$data$dndStatus : null;
    }
  }, {
    key: "userStatus",
    get: function get() {
      var _this$data$userStatus, _this$data6;

      return (_this$data$userStatus = (_this$data6 = this.data) === null || _this$data6 === void 0 ? void 0 : _this$data6.userStatus) !== null && _this$data$userStatus !== void 0 ? _this$data$userStatus : null;
    }
  }, {
    key: "presenceStatus",
    get: function get() {
      var _this$data$presenceSt, _this$data7;

      return (_this$data$presenceSt = (_this$data7 = this.data) === null || _this$data7 === void 0 ? void 0 : _this$data7.presenceStatus) !== null && _this$data$presenceSt !== void 0 ? _this$data$presenceSt : null;
    }
  }, {
    key: "meetingStatus",
    get: function get() {
      var _this$data$meetingSta, _this$data8;

      return (_this$data$meetingSta = (_this$data8 = this.data) === null || _this$data8 === void 0 ? void 0 : _this$data8.meetingStatus) !== null && _this$data$meetingSta !== void 0 ? _this$data$meetingSta : null;
    }
  }, {
    key: "presenceOption",
    get: function get() {
      // doNotDisturb
      if (this.dndStatus === _dndStatus2.dndStatus.doNotAcceptAnyCalls) {
        return _dndStatus2.dndStatus.doNotAcceptAnyCalls;
      } // busy


      if (this.userStatus === _presenceStatus2.presenceStatus.busy) {
        return _presenceStatus2.presenceStatus.busy;
      } // invisible


      if (this.userStatus === _presenceStatus2.presenceStatus.offline) {
        return _presenceStatus2.presenceStatus.offline;
      } // available


      return _presenceStatus2.presenceStatus.available;
    }
  }]);

  return Presence;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "activeCalls", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "activeCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "calls", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_update", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionIdList", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionIdList"), _class2.prototype)), _class2)) || _class);
exports.Presence = Presence;
//# sourceMappingURL=Presence.js.map
