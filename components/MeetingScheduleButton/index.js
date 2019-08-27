"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

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

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _Button = _interopRequireDefault(require("../Button"));

var _CheckBox = _interopRequireDefault(require("../CheckBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
function (_PureComponent) {
  _inherits(MeetingScheduleButton, _PureComponent);

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
          disabled = _this$props.disabled,
          meeting = _this$props.meeting,
          onClick = _this$props.onClick,
          brand = _this$props.brand,
          currentLocale = _this$props.currentLocale,
          showSaveAsDefault = _this$props.showSaveAsDefault,
          update = _this$props.update;
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].inviteBox, !hidden ? _styles["default"].withShadow : _styles["default"].onlyButton)
      }, hidden ? _react["default"].createElement("div", {
        className: _styles["default"].actionPrompt
      }, this.getI18nPromptString()) : null, showSaveAsDefault ? _react["default"].createElement(_CheckBox["default"], {
        checked: meeting.saveAsDefault,
        onChecked: function onChecked() {
          return update(_objectSpread({}, meeting, {
            saveAsDefault: !meeting.saveAsDefault
          }));
        },
        type: "checkbox",
        className: _styles["default"].notShowAgain
      }, _i18n["default"].getString('saveAsDefault', currentLocale)) : null, _react["default"].createElement(_Button["default"], {
        onClick: onClick,
        disabled: disabled,
        className: (0, _classnames["default"])(_styles["default"].button, disabled ? _styles["default"].disabled : null),
        dataSign: "meetingScheduleButton"
      }, this.getI18nButtonString()));
    }
  }]);

  return MeetingScheduleButton;
}(_react.PureComponent);

exports["default"] = MeetingScheduleButton;
MeetingScheduleButton.propTypes = {
  currentLocale: _propTypes["default"].string,
  meeting: _propTypes["default"].object,
  hidden: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  onClick: _propTypes["default"].func.isRequired,
  brand: _propTypes["default"].string,
  showSaveAsDefault: _propTypes["default"].bool,
  update: _propTypes["default"].func
};
MeetingScheduleButton.defaultProps = {
  meeting: null,
  hidden: false,
  disabled: false,
  brand: undefined,
  currentLocale: undefined,
  showSaveAsDefault: false,
  update: function update() {}
};
//# sourceMappingURL=index.js.map
