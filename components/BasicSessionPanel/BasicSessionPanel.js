"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicSessionPanel = void 0;
var _AnimationPanel = require("@ringcentral-integration/widgets/components/AnimationPanel");
var _CustomArrowButton = require("@ringcentral-integration/widgets/components/Rcui/CustomArrowButton");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _InboundQueuesPanel = require("../InboundQueuesPanel");
var _PickList = require("../PickList");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
