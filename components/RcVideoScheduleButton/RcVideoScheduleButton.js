"use strict";

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcVideoScheduleButton = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _react = _interopRequireDefault(require("react"));

var _Button = require("@ringcentral/juno/es6/components/Buttons/Button/Button.js");

var _Checkbox = require("@ringcentral/juno/es6/components/Forms/Checkbox/Checkbox.js");

var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");

var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));

var _MeetingScheduleButtonWrapper = require("../MeetingScheduleButton/MeetingScheduleButtonWrapper");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding: ", " 16px 16px\n    16px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function getI18nButtonString() {
  return _i18n["default"].getString('schedule');
}

var RcVideoScheduleButtonWrapper = (0, _styledComponents["default"])(_MeetingScheduleButtonWrapper.MeetingScheduleButtonWrapper)(_templateObject(), function (_ref) {
  var $noCheckbox = _ref.$noCheckbox;
  return $noCheckbox ? (0, _spacing.spacing)(4) : '5px';
});

var RcVideoScheduleButton = function RcVideoScheduleButton(props) {
  var hidden = props.hidden,
      disabled = props.disabled,
      meeting = props.meeting,
      onClick = props.onClick,
      currentLocale = props.currentLocale,
      showSaveAsDefault = props.showSaveAsDefault,
      disableSaveAsDefault = props.disableSaveAsDefault,
      update = props.update,
      buttonLabel = props.buttonLabel;
  return /*#__PURE__*/_react["default"].createElement(RcVideoScheduleButtonWrapper, {
    $hidden: hidden,
    $noCheckbox: !showSaveAsDefault
  }, showSaveAsDefault ? /*#__PURE__*/_react["default"].createElement(_Checkbox.RcCheckbox, {
    label: _i18n["default"].getString('saveAsDefault', currentLocale),
    "data-sign": "saveAsDefault",
    checked: meeting.saveAsDefault,
    disabled: disableSaveAsDefault,
    onChange: function onChange() {
      update(_objectSpread(_objectSpread({}, meeting), {}, {
        saveAsDefault: !meeting.saveAsDefault
      }));
    }
  }) : null, /*#__PURE__*/_react["default"].createElement(_Button.RcButton, {
    onClick: onClick,
    disabled: disabled,
    "data-sign": "videoScheduleButton",
    fullWidth: true
  }, buttonLabel || getI18nButtonString()));
};

exports.RcVideoScheduleButton = RcVideoScheduleButton;
//# sourceMappingURL=RcVideoScheduleButton.js.map
