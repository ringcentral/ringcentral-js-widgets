"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingScheduleButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _juno = require("@ringcentral/juno");
var _i18n = _interopRequireDefault(require("./i18n"));
var _MeetingScheduleButtonWrapper = require("./MeetingScheduleButtonWrapper");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var MeetingScheduleButton = /*#__PURE__*/function (_React$Component) {
  _inherits(MeetingScheduleButton, _React$Component);
  var _super = _createSuper(MeetingScheduleButton);
  function MeetingScheduleButton() {
    _classCallCheck(this, MeetingScheduleButton);
    return _super.apply(this, arguments);
  }
  _createClass(MeetingScheduleButton, [{
    key: "getI18nButtonString",
    value: function getI18nButtonString() {
      return _i18n["default"].getString('schedule');
    }
  }, {
    key: "getI18nPromptString",
    value: function getI18nPromptString() {
      return _i18n["default"].getString('prompt');
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        hidden = _this$props.hidden,
        meeting = _this$props.meeting,
        currentLocale = _this$props.currentLocale,
        showSaveAsDefault = _this$props.showSaveAsDefault,
        disableSaveAsDefault = _this$props.disableSaveAsDefault,
        update = _this$props.update,
        showLaunchMeetingBtn = _this$props.showLaunchMeetingBtn,
        onClick = _this$props.onClick,
        launchMeeting = _this$props.launchMeeting,
        scheduleButtonLabel = _this$props.scheduleButtonLabel,
        disabled = _this$props.disabled;
      return (
        /*#__PURE__*/
        // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
        _react["default"].createElement(_MeetingScheduleButtonWrapper.MeetingScheduleButtonWrapper, {
          $hidden: hidden
        }, hidden ? /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].actionPrompt
        }, this.getI18nPromptString()) : null, showSaveAsDefault ? /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
          "data-sign": "saveAsDefault",
          checked: meeting === null || meeting === void 0 ? void 0 : meeting.saveAsDefault,
          disabled: disableSaveAsDefault,
          className: _styles["default"].saveAsDefault,
          formControlLabelProps: {
            classes: {
              label: _styles["default"].saveAsDefaultLabel
            }
          },
          onChange: function onChange() {
            return (
              // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
              update(_objectSpread(_objectSpread({}, meeting), {}, {
                saveAsDefault: !(meeting === null || meeting === void 0 ? void 0 : meeting.saveAsDefault)
              }))
            );
          },
          label: _i18n["default"].getString('saveAsDefault', currentLocale)
        }) : null, /*#__PURE__*/_react["default"].createElement(_MeetingScheduleButtonWrapper.ScheduleButton, {
          onClick: onClick,
          disabled: disabled,
          "data-sign": "meetingScheduleButton",
          fullWidth: true
        }, scheduleButtonLabel || this.getI18nButtonString()), showLaunchMeetingBtn ? /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
          className: _styles["default"].gutter
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          ,
          onClick: function onClick() {
            return launchMeeting(meeting);
          },
          "data-sign": "launchMeetingButton",
          variant: "text",
          fullWidth: true
        }, _i18n["default"].getString('launchMeeting', currentLocale)) : null)
      );
    }
  }]);
  return MeetingScheduleButton;
}(_react["default"].Component);
exports.MeetingScheduleButton = MeetingScheduleButton;
MeetingScheduleButton.defaultProps = {
  meeting: null,
  hidden: false,
  disabled: false,
  currentLocale: undefined,
  showSaveAsDefault: false,
  disableSaveAsDefault: false,
  update: function update() {},
  showLaunchMeetingBtn: false,
  launchMeeting: function launchMeeting() {},
  onClick: function onClick() {}
};
//# sourceMappingURL=MeetingScheduleButton.js.map
