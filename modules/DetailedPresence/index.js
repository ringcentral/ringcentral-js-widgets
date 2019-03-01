"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.bind");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.date.now");

var _di = require("../../lib/di");

var _Presence2 = _interopRequireDefault(require("../Presence"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getDetailedPresenceReducer = _interopRequireDefault(require("./getDetailedPresenceReducer"));

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _throttle = _interopRequireDefault(require("../../lib/throttle"));

var _callLogHelpers = require("../../lib/callLogHelpers");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

var presenceRegExp = /.*\/presence\?detailedTelephonyState=true&sipData=true/;
var FETCH_THRESHOLD = 2000;
/**
 * @class
 * @description Presence detail info managing module
 */

var DetailedPresence = (_dec = (0, _di.Module)({
  deps: [{
    dep: 'DetailedPresenceOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Presence) {
  _inherits(DetailedPresence, _Presence);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Subscription} params.subscription - subscription module instance
   * @param {ConnectivityMonitor} params.connectivityMonitor - connectivityMonitor module instance
   */
  function DetailedPresence(options) {
    var _context;

    var _this;

    _classCallCheck(this, DetailedPresence);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DetailedPresence).call(this, _objectSpread({
      getReducer: _getDetailedPresenceReducer.default,
      subscriptionFilter: _subscriptionFilters.default.detailedPresence,
      actionTypes: _actionTypes.default,
      lastNotDisturbDndStatusStorageKey: 'lastNotDisturbDndStatusDetailPresence'
    }, options)));

    _this._subscriptionHandler = function (message) {
      if (presenceRegExp.test(message.event) && message.body) {
        if (message.body.sequence) {
          if (message.body.sequence < _this._lastSequence) {
            return;
          }

          _this._lastSequence = message.body.sequence;
        }

        var body = message.body;

        _this.store.dispatch(_objectSpread({}, body, {
          type: _this.actionTypes.notification,
          lastDndStatus: _this.dndStatus,
          timestamp: Date.now()
        }));
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
    };

    _this.addSelector('sessionIdList', function () {
      return _this.state.calls;
    }, function (calls) {
      return calls.map(function (call) {
        return call.sessionId;
      });
    });

    _this.addSelector('calls', function () {
      return _this.state.data;
    }, function (data) {
      return (0, _callLogHelpers.removeInboundRingOutLegs)(data).filter(function (call) {
        return !(0, _callLogHelpers.isEnded)(call);
      });
    });

    _this._fetchRemainingCalls = (0, _throttle.default)((_context = _assertThisInitialized(_assertThisInitialized(_this)), _this._fetch).bind(_context), FETCH_THRESHOLD);
    return _this;
  }

  _createClass(DetailedPresence, [{
    key: "_fetch",
    value: function () {
      var _fetch2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var ownerId, body, _body$activeCalls2, activeCalls, _body$totalActiveCall2, totalActiveCalls;

        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.fetch
                });
                ownerId = this._auth.ownerId;
                _context2.prev = 2;
                _context2.next = 5;
                return this._client.service.platform().get(_subscriptionFilters.default.detailedPresence);

              case 5:
                body = _context2.sent.json();

                if (this._auth.ownerId === ownerId) {
                  _body$activeCalls2 = body.activeCalls, activeCalls = _body$activeCalls2 === void 0 ? [] : _body$activeCalls2, _body$totalActiveCall2 = body.totalActiveCalls, totalActiveCalls = _body$totalActiveCall2 === void 0 ? 0 : _body$totalActiveCall2;
                  this.store.dispatch(_objectSpread({}, body, {
                    // api get doesn't response 'totalActiveCalls' currently
                    // because not like notification, here 'activeCalls' contains all the calls
                    totalActiveCalls: totalActiveCalls || activeCalls.length,
                    type: this.actionTypes.fetchSuccess,
                    lastDndStatus: this.dndStatus,
                    timestamp: Date.now()
                  }));
                  this._promise = null;
                }

                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](2);

                if (this._auth.ownerId === ownerId) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchError,
                    error: _context2.t0
                  });
                  this._promise = null;
                }

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function _fetch() {
        return _fetch2.apply(this, arguments);
      }

      return _fetch;
    }()
  }, {
    key: "data",
    get: function get() {
      return this.state.data;
    }
  }, {
    key: "calls",
    get: function get() {
      return this._selectors.calls();
    }
  }, {
    key: "telephonyStatus",
    get: function get() {
      return this.state.telephonyStatus;
    }
  }, {
    key: "sessionIdList",
    get: function get() {
      return this._selectors.sessionIdList();
    }
  }]);

  return DetailedPresence;
}(_Presence2.default), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_fetch", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetch"), _class2.prototype)), _class2)) || _class);
exports.default = DetailedPresence;
//# sourceMappingURL=index.js.map
