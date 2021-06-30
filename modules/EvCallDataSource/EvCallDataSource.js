"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCallDataSource = void 0;

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.string.ends-with");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

var _moment = _interopRequireDefault(require("moment"));

var _core = require("@ringcentral-integration/core");

var _events = require("events");

var _di = require("@ringcentral-integration/commons/lib/di");

var _enums = require("../../enums");

var _helper = require("./helper");

var _dec, _class, _class2, _descriptor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var EvCallDataSource = (_dec = (0, _di.Module)({
  name: 'EvCallDataSource',
  deps: ['EvAuth', 'EvClient', 'Storage', 'TabManager', {
    dep: 'EvCallDataSourceOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvCallDataSource, _RcModuleV);

  var _super = _createSuper(EvCallDataSource);

  function EvCallDataSource(deps) {
    var _this;

    _classCallCheck(this, EvCallDataSource);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvCallDataSource'
    });
    _this.eventEmitter = new _events.EventEmitter();

    _initializerDefineProperty(_this, "data", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(EvCallDataSource, [{
    key: "changeCallsLimited",
    value: function changeCallsLimited(value) {
      var _window$localStorage;

      (_window$localStorage = window.localStorage) === null || _window$localStorage === void 0 ? void 0 : _window$localStorage.setItem('callsLimited', value === null || value === void 0 ? void 0 : value.toString());
    }
  }, {
    key: "addNewCall",
    value: function addNewCall(call) {
      var rawAgentRecording = call === null || call === void 0 ? void 0 : call.agentRecording;
      rawAgentRecording && (rawAgentRecording = _objectSpread(_objectSpread({}, rawAgentRecording), {}, {
        pause: rawAgentRecording.pause ? Number(rawAgentRecording.pause) : null
      })); // note: rawCallsMapping index is raw call uii.

      this.data.rawCallsMapping[call.uii] = _objectSpread(_objectSpread({}, call), {}, {
        // input timezone in second arg if EV reponse has timezone propoty
        // default timezone is 'America/New_York'
        timestamp: (0, _helper.getTimeStamp)(call.queueDts),
        gate: this._getCurrentGateData(call),
        agentRecording: rawAgentRecording
      });
    }
  }, {
    key: "setNewSession",
    value: function setNewSession(session) {
      var id = this._deps.evClient.encodeUii(session);

      if (session.agentId === this._deps.evAuth.agentId) {
        // related to current agent session
        var index = this.callIds.indexOf(id);

        if (index === -1) {
          this.data.callIds.unshift(id);
        }
      } else {
        // other session without current agent
        var _index = this.otherCallIds.indexOf(id);

        if (_index === -1) {
          this.data.otherCallIds.unshift(id);
        }
      }

      this.data.callsMapping[id] = _objectSpread(_objectSpread({}, this.rawCallsMapping[session.uii]), {}, {
        session: session
      });
    }
  }, {
    key: "addNewSession",
    value: function addNewSession(session) {
      this.setNewSession(session); // check with other phone

      if (session.agentId === '') {
        // ringing
        this.eventEmitter.emit(_enums.callStatus.RINGING, session);
      }
    }
  }, {
    key: "dropSession",
    value: function dropSession(_dropSession) {
      var id = this._getCallEncodeId(_dropSession);

      this.data.otherCallIds = this.otherCallIds.filter(function (callId) {
        return callId !== id;
      });
    }
  }, {
    key: "removeEndedCall",
    value: function removeEndedCall(endedCall) {
      var id = this._getCallEncodeId(endedCall); // remove current agent session call with uii.


      this.data.callIds = this.callIds.filter(function (callId) {
        return callId !== id;
      }); // remove other call session with uii.

      this.data.otherCallIds = this.otherCallIds.filter(function (callId) {
        return !callId.includes(endedCall.uii);
      }); // add call with id (encodeUii({ uii, sessionId }))

      var callLogsIndex = this.callLogsIds.indexOf(id);

      if (callLogsIndex === -1) {
        this.data.callLogsIds.unshift(id);
      }

      if (this.callsMapping[id]) {
        this.data.callsMapping[id].endedCall = JSON.parse(JSON.stringify(endedCall));
      }
    }
  }, {
    key: "clearCalls",
    value: function clearCalls() {
      this.data.callIds = [];
      this.data.otherCallIds = [];
    }
  }, {
    key: "setCallHoldStatus",
    value: function setCallHoldStatus(res) {
      var id = this._deps.evClient.encodeUii(res);

      this.data.callsMapping[id].isHold = res.holdState;
    }
  }, {
    key: "limitCalls",
    value: function limitCalls() {
      var _this2 = this;

      // max 250 and 7 days
      var lastWeekDayTimestamp = this._getLastWeekDayTimestamp();

      var storageCallData = {
        callIds: [],
        otherCallIds: [],
        callLogsIds: [],
        callsMapping: {},
        rawCallsMapping: {}
      };
      var fullCallLogsIds = this.callLogsIds.slice(0, 250).reduce(function (acc, curr) {
        return [].concat(_toConsumableArray(acc), [curr.substr(0, curr.length - 2)]);
      }, []); // valid rawCallsMapping

      storageCallData.rawCallsMapping = Object.keys(this.rawCallsMapping).reduce(function (acc, id) {
        if (fullCallLogsIds.includes(id) && (0, _helper.getTimeStamp)(_this2.rawCallsMapping[id].queueDts) >= lastWeekDayTimestamp) {
          acc[id] = _this2.rawCallsMapping[id];
        }

        return acc;
      }, {}); // valid callsMapping

      storageCallData.callsMapping = Object.keys(this.callsMapping).reduce(function (acc, id) {
        if (fullCallLogsIds.includes(id.substr(0, id.length - 2)) && (0, _helper.getTimeStamp)(_this2.callsMapping[id].queueDts) >= lastWeekDayTimestamp) {
          acc[id] = _this2.callsMapping[id];

          if (!id.endsWith('$1')) {
            storageCallData.callLogsIds.unshift(id);
          }
        }

        return acc;
      }, {});
      this.data = storageCallData;
      this.changeCallsLimited(true);
    }
  }, {
    key: "_getCallEncodeId",
    value: function _getCallEncodeId(session) {
      return this._deps.evClient.encodeUii(session);
    }
  }, {
    key: "_getCurrentGateData",
    value: function _getCurrentGateData(call) {
      var currentGateId = call.queue.number;

      var currentQueueGroup = this._deps.evAuth.availableRequeueQueues.find(function (_ref) {
        var gates = _ref.gates;
        return gates.some(function (_ref2) {
          var gateId = _ref2.gateId;
          return gateId === currentGateId;
        });
      });

      return {
        gateId: currentGateId,
        gateGroupId: currentQueueGroup === null || currentQueueGroup === void 0 ? void 0 : currentQueueGroup.gateGroupId
      };
    }
  }, {
    key: "_getLastWeekDayTimestamp",
    value: function _getLastWeekDayTimestamp() {
      var now = (0, _moment["default"])();
      var lastWeekDay = now.clone().subtract(7, 'days').startOf('day');
      return lastWeekDay.valueOf();
    }
  }, {
    key: "callIds",
    get: function get() {
      return this.data.callIds;
    }
  }, {
    key: "otherCallIds",
    get: function get() {
      return this.data.otherCallIds;
    }
  }, {
    key: "callLogsIds",
    get: function get() {
      return this.data.callLogsIds;
    }
  }, {
    key: "callsMapping",
    get: function get() {
      return this.data.callsMapping;
    }
  }, {
    key: "rawCallsMapping",
    get: function get() {
      return this.data.rawCallsMapping;
    }
  }, {
    key: "callsLimited",
    get: function get() {
      var _window$localStorage2;

      return ((_window$localStorage2 = window.localStorage) === null || _window$localStorage2 === void 0 ? void 0 : _window$localStorage2.getItem('callsLimited')) === 'true';
    }
  }]);

  return EvCallDataSource;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      callIds: [],
      otherCallIds: [],
      callLogsIds: [],
      callsMapping: {},
      rawCallsMapping: {}
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "addNewCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "addNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setNewSession", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNewSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dropSession", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "dropSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeEndedCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeEndedCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "clearCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCallHoldStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCallHoldStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "limitCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "limitCalls"), _class2.prototype)), _class2)) || _class);
exports.EvCallDataSource = EvCallDataSource;
//# sourceMappingURL=EvCallDataSource.js.map
