"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingScheduleButton = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _juno = require("@ringcentral/juno");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    }
  }, {
    key: "getI18nTermsString",
    value: function getI18nTermsString() {
      return _i18n["default"].getString('terms');
    }
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
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].inviteBox, !hidden ? _styles["default"].withShadow : _styles["default"].onlyButton)
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
          return update(_objectSpread(_objectSpread({}, meeting), {}, {
            saveAsDefault: !(meeting === null || meeting === void 0 ? void 0 : meeting.saveAsDefault)
          }));
        },
        label: _i18n["default"].getString('saveAsDefault', currentLocale)
      }) : null, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
        onClick: onClick,
        disabled: disabled,
        "data-sign": "meetingScheduleButton",
        fullWidth: true
      }, scheduleButtonLabel || this.getI18nButtonString()), showLaunchMeetingBtn ? /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
        className: _styles["default"].gutter,
        onClick: function onClick() {
          return launchMeeting(meeting);
        },
        "data-sign": "launchMeetingButton",
        variant: "text",
        fullWidth: true
      }, _i18n["default"].getString('launchMeeting', currentLocale)) : null);
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
