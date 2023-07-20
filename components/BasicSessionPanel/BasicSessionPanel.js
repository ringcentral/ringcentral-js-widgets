"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicSessionPanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _AnimationPanel = require("@ringcentral-integration/widgets/components/AnimationPanel");
var _CustomArrowButton = require("@ringcentral-integration/widgets/components/Rcui/CustomArrowButton");
var _juno = require("@ringcentral/juno");
var _InboundQueuesPanel = require("../InboundQueuesPanel");
var _PickList = require("../PickList");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var BasicSessionPanel = function BasicSessionPanel(_ref) {
  var currentLocale = _ref.currentLocale,
    selectedSkillProfileId = _ref.selectedSkillProfileId,
    skillProfileList = _ref.skillProfileList,
    setSkillProfileId = _ref.setSkillProfileId,
    loginTypeList = _ref.loginTypeList,
    loginType = _ref.loginType,
    setLoginType = _ref.setLoginType,
    extensionNumber = _ref.extensionNumber,
    setExtensionNumber = _ref.setExtensionNumber,
    inboundQueuesFieldText = _ref.inboundQueuesFieldText,
    isExtensionNumber = _ref.isExtensionNumber,
    searchOption = _ref.searchOption,
    inboundQueues = _ref.inboundQueues,
    submitInboundQueues = _ref.submitInboundQueues,
    getAssignedInboundQueues = _ref.getAssignedInboundQueues,
    isAllAssign = _ref.isAllAssign,
    isSeveralAssign = _ref.isSeveralAssign,
    checkBoxOnChange = _ref.checkBoxOnChange,
    allCheckBoxOnChange = _ref.allCheckBoxOnChange,
    setAutoAnswer = _ref.setAutoAnswer,
    autoAnswer = _ref.autoAnswer,
    showAutoAnswer = _ref.showAutoAnswer,
    classes = _ref.classes,
    showInboundQueues = _ref.showInboundQueues,
    showSkillProfile = _ref.showSkillProfile;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    inboundQueuesPageShow = _useState2[0],
    setInboundQueuesPageShow = _useState2[1];
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, showInboundQueues && /*#__PURE__*/_react["default"].createElement(_AnimationPanel.AnimationPanel, {
    open: inboundQueuesPageShow
  }, /*#__PURE__*/_react["default"].createElement(_InboundQueuesPanel.InboundQueuesPanel, {
    searchOption: searchOption,
    currentLocale: currentLocale,
    inboundQueues: inboundQueues,
    submitInboundQueues: submitInboundQueues,
    getAssignedInboundQueues: getAssignedInboundQueues,
    isAllAssign: isAllAssign,
    isSeveralAssign: isSeveralAssign,
    checkBoxOnChange: checkBoxOnChange,
    allCheckBoxOnChange: allCheckBoxOnChange,
    goBack: function goBack() {
      return setInboundQueuesPageShow(false);
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.root
  }, showInboundQueues && /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
    label: _i18n["default"].getString('inboundQueues', currentLocale),
    gutterBottom: true,
    title: inboundQueuesFieldText,
    value: inboundQueuesFieldText,
    fullWidth: true,
    classes: {
      root: _styles["default"].customSelect
    },
    inputProps: {
      'data-sign': 'inboundQueues'
    },
    InputProps: {
      readOnly: true,
      endAdornment: /*#__PURE__*/_react["default"].createElement(_CustomArrowButton.CustomArrowButton, null)
    },
    clearBtn: false,
    onClick: function onClick() {
      return setInboundQueuesPageShow(true);
    }
  }), showSkillProfile && /*#__PURE__*/_react["default"].createElement(_PickList.PickList, {
    "data-sign": "skillProfile",
    options: skillProfileList,
    label: _i18n["default"].getString('skillProfile', currentLocale),
    value: selectedSkillProfileId,
    optionValueKey: "profileId",
    optionLabelKey: "profileName",
    onChange: setSkillProfileId
  }), /*#__PURE__*/_react["default"].createElement(_PickList.PickList, {
    "data-sign": "loginType",
    options: loginTypeList,
    label: _i18n["default"].getString('voiceConnection', currentLocale),
    value: loginType,
    onChange: setLoginType
  }), isExtensionNumber && /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
    gutterBottom: true,
    label: _i18n["default"].getString('extensionNumber', currentLocale),
    fullWidth: true,
    value: extensionNumber,
    placeholder: _i18n["default"].getString('enterYourPhoneNumber', currentLocale),
    inputProps: {
      maxLength: 255,
      'data-sign': 'extensionNumber'
    },
    clearBtn: false,
    classes: {
      root: _styles["default"].customSelect
    },
    onChange: function onChange(_ref2) {
      var value = _ref2.target.value;
      setExtensionNumber(value);
    }
  }), showAutoAnswer && /*#__PURE__*/_react["default"].createElement(_juno.RcSwitch, {
    "data-sign": "autoAnswer",
    className: _styles["default"].switchRoot,
    formControlLabelProps: {
      labelPlacement: 'start',
      classes: {
        labelPlacementStart: _styles["default"].root,
        label: _styles["default"].label
      }
    },
    label: _i18n["default"].getString('answerCalls', currentLocale),
    onChange: function onChange() {
      setAutoAnswer(!autoAnswer);
    },
    checked: autoAnswer
  })));
};
exports.BasicSessionPanel = BasicSessionPanel;
BasicSessionPanel.defaultProps = {
  classes: {}
};
//# sourceMappingURL=BasicSessionPanel.js.map
