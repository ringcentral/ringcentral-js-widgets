"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingScheduleButton = void 0;

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

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _Button = require("../Button");

var _CheckBox = _interopRequireDefault(require("../CheckBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MeetingScheduleButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MeetingScheduleButton, _React$Component);

  function MeetingScheduleButton() {
    _classCallCheck(this, MeetingScheduleButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(MeetingScheduleButton).apply(this, arguments));
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
          update = _this$props.update,
          showLaunchMeetingBtn = _this$props.showLaunchMeetingBtn,
          onClick = _this$props.onClick,
          launchMeeting = _this$props.launchMeeting,
          scheduleButtonLabel = _this$props.scheduleButtonLabel,
          disabled = _this$props.disabled;
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].inviteBox, !hidden ? _styles["default"].withShadow : _styles["default"].onlyButton)
      }, hidden ? _react["default"].createElement("div", {
        className: _styles["default"].actionPrompt
      }, this.getI18nPromptString()) : null, showSaveAsDefault ? _react["default"].createElement(_CheckBox["default"], {
        dataSign: "saveAsDefault",
        checked: meeting.saveAsDefault,
        onChecked: function onChecked() {
          return update(_objectSpread({}, meeting, {
            saveAsDefault: !meeting.saveAsDefault
          }));
        },
        type: "checkbox",
        className: _styles["default"].notShowAgain
      }, _i18n["default"].getString('saveAsDefault', currentLocale)) : null, _react["default"].createElement(_Button.Button, {
        onClick: onClick,
        className: (0, _classnames["default"])(_styles["default"].isContainedType, disabled ? _styles["default"].isContainedTypeDisabled : null),
        dataSign: "meetingScheduleButton"
      }, scheduleButtonLabel || this.getI18nButtonString()), showLaunchMeetingBtn ? _react["default"].createElement(_Button.Button, {
        dataSign: "launchMeetingButton",
        className: (0, _classnames["default"])(_styles["default"].isOutlineType),
        onClick: function onClick() {
          return launchMeeting(meeting);
        }
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
  update: function update() {},
  showLaunchMeetingBtn: false,
  launchMeeting: function launchMeeting() {},
  onClick: function onClick() {}
};
//# sourceMappingURL=MeetingScheduleButton.js.map
