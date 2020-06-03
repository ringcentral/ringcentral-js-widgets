"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvInboundQueuesUI = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.map");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _sortByName = require("../../lib/sortByName");

var _dec, _class, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var EvInboundQueuesUI = (_dec = (0, _di.Module)({
  name: 'EvInboundQueuesUI',
  deps: ['Locale', 'RouterInteraction', 'EvSessionConfig', 'EvClient']
}), _dec(_class = (_temp = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(EvInboundQueuesUI, _RcUIModuleV);

  var _super = _createSuper(EvInboundQueuesUI);

  function EvInboundQueuesUI(_ref) {
    var _this;

    var locale = _ref.locale,
        routerInteraction = _ref.routerInteraction,
        evSessionConfig = _ref.evSessionConfig,
        evClient = _ref.evClient;

    _classCallCheck(this, EvInboundQueuesUI);

    _this = _super.call(this, {
      modules: {
        locale: locale,
        routerInteraction: routerInteraction,
        evClient: evClient,
        evSessionConfig: evSessionConfig
      }
    });
    _this.getInboundQueues = (0, _core.createSelector)(function () {
      return _this._modules.evSessionConfig.selectedInboundQueueIds;
    }, function () {
      return _this._modules.evSessionConfig.getInboundQueues();
    }, function (selectedInboundQueueIds, inboundQueues) {
      return (0, _sortByName.sortByName)(inboundQueues.map(function (inboundQueue) {
        return _objectSpread(_objectSpread({}, inboundQueue), {}, {
          checked: !!selectedInboundQueueIds.find(function (id) {
            return id === inboundQueue.gateId;
          })
        });
      }), 'gateName');
    });
    return _this;
  }

  _createClass(EvInboundQueuesUI, [{
    key: "_checkBoxOnChange",
    value: function _checkBoxOnChange(gateId, inboundQueuesState, setInboundQueuesState) {
      var inboundQueues = _toConsumableArray(inboundQueuesState);

      var index = inboundQueues.findIndex(function (option) {
        return option.gateId === gateId;
      });
      var selectedInboundQueue = inboundQueues[index];
      inboundQueues[index] = _objectSpread(_objectSpread({}, selectedInboundQueue), {}, {
        checked: !selectedInboundQueue.checked
      });
      setInboundQueuesState(inboundQueues);
    }
  }, {
    key: "_allCheckBoxOnChange",
    value: function _allCheckBoxOnChange(severalAssign, inboundQueuesState, setInboundQueuesState) {
      var inboundQueues = _toConsumableArray(inboundQueuesState).map(function (option) {
        return _objectSpread(_objectSpread({}, option), {}, {
          // new object
          checked: severalAssign || !option.checked
        });
      });

      setInboundQueuesState(inboundQueues);
    }
  }, {
    key: "submitInboundQueues",
    value: function submitInboundQueues(queues) {
      this._modules.evSessionConfig.setInboundQueueIds(queues.map(function (inboundQueue) {
        return inboundQueue.gateId;
      }));

      this._modules.routerInteraction.push('/sessionConfig');
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      return {
        currentLocale: this._modules.locale.currentLocale,
        inboundQueues: this.getInboundQueues()
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;

      return {
        renderFunction: function renderFunction(option) {
          return option.gateName;
        },
        searchOption: function searchOption(option, text) {
          return option.gateName && option.gateName.toLowerCase().includes(text.toLowerCase());
        },
        submitInboundQueues: function submitInboundQueues(queues) {
          return _this2.submitInboundQueues(queues);
        },
        goBack: function goBack() {
          return _this2._modules.routerInteraction.goBack();
        },
        getAssignedInboundQueues: function getAssignedInboundQueues(inboundQueues) {
          return inboundQueues.filter(function (_ref2) {
            var checked = _ref2.checked;
            return checked;
          });
        },
        isAllAssign: function isAllAssign(assignedInboundQueues, inboundQueues) {
          return !!assignedInboundQueues.length && assignedInboundQueues.length === inboundQueues.length;
        },
        isSeveralAssign: function isSeveralAssign(assignedInboundQueues, inboundQueues) {
          return !!assignedInboundQueues.length && assignedInboundQueues.length !== inboundQueues.length;
        },
        checkBoxOnChange: function checkBoxOnChange() {
          return _this2._checkBoxOnChange.apply(_this2, arguments);
        },
        allCheckBoxOnChange: function allCheckBoxOnChange() {
          return _this2._allCheckBoxOnChange.apply(_this2, arguments);
        }
      };
    }
  }]);

  return EvInboundQueuesUI;
}(_core.RcUIModuleV2), _temp)) || _class);
exports.EvInboundQueuesUI = EvInboundQueuesUI;
//# sourceMappingURL=EvInboundQueuesUI.js.map
