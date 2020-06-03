"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _bindDebounce = require("../../lib/bindDebounce");

var _FieldItem = require("./FieldItem");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var DEFAULT_INPUT_SAVE_TIMEOUT = 2e3;

var CallLogFields = /*#__PURE__*/function (_Component) {
  _inherits(CallLogFields, _Component);

  var _super = _createSuper(CallLogFields);

  function CallLogFields() {
    var _this;

    _classCallCheck(this, CallLogFields);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.debounce = (0, _bindDebounce.bindDebounce)(_assertThisInitialized(_this), DEFAULT_INPUT_SAVE_TIMEOUT);

    _this.renderFields = function () {
      var _this$props = _this.props,
          _this$props$currentLo = _this$props.currentLog,
          customLogFields = _this$props$currentLo.customLogFields,
          isAutoSave = _this$props$currentLo.currentLogCall.isAutoSave,
          call = _this$props$currentLo.call,
          _this$props$currentLo2 = _this$props$currentLo.task,
          task = _this$props$currentLo2 === void 0 ? {} : _this$props$currentLo2,
          onSaveCallLog = _this$props.onSaveCallLog;

      var onSave = function onSave() {
        return isAutoSave && task.id && onSaveCallLog(call);
      };

      return customLogFields.sort(function (a, b) {
        return a.sort - b.sort;
      }).map(function (fieldOption, i) {
        return /*#__PURE__*/_react["default"].createElement(_FieldItem.FieldItem, _extends({}, _this.props, {
          fieldOption: fieldOption,
          debounce: _this.debounce,
          "data-sign": "callLogField",
          key: "field-".concat(i),
          onSave: onSave,
          timeout: DEFAULT_INPUT_SAVE_TIMEOUT
        }));
      });
    };

    return _this;
  }

  _createClass(CallLogFields, [{
    key: "render",
    value: function render() {
      var currentLog = this.props.currentLog;

      if (!currentLog.task) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callLogFieldsSection
      }, this.renderFields());
    }
  }]);

  return CallLogFields;
}(_react.Component);

exports["default"] = CallLogFields;
CallLogFields.defaultProps = {
  currentLog: {},
  onUpdateCallLog: undefined,
  onSelectViewVisible: function onSelectViewVisible() {
    return null;
  },
  onSaveCallLog: undefined,
  customInputDataStruct: undefined,
  subjectDropdownsTracker: undefined,
  startAdornmentRender: function startAdornmentRender() {
    return null;
  },
  contactSearch: undefined
};
//# sourceMappingURL=CallLogFields.js.map
