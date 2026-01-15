"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresenceSettingSection = void 0;
var _Presence = require("@ringcentral-integration/commons/modules/Presence");
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _getPresenceStatusName = require("../../lib/getPresenceStatusName");
var _IconLine = _interopRequireDefault(require("../IconLine"));
var _LinkLine = require("../LinkLine");
var _usePresenceItems2 = require("../PresenceDropdown/usePresenceItems");
var _SwitchLineItem = require("../SettingsPanel/SwitchLineItem");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _templateObject, _templateObject2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledList = (0, _juno.styled)(_juno.RcList)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background-color: ", ";\n\n  ", " {\n    padding-left: ", ";\n  }\n"])), (0, _juno.palette2)('neutral', 'elevation'), _juno.RcListItem, (0, _juno.spacing)(5));

// TODO: when full page refactor, remove this
var StyledPresenceWrap = _juno.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  ", ";\n  color: ", ";\n\n  ", " {\n    margin-right: ", ";\n  }\n"])), _juno.flexCenterStyle, (0, _juno.palette2)('neutral', 'f05'), _juno.RcPresence, (0, _juno.spacing)(2));
var PresenceSettingSection = exports.PresenceSettingSection = function PresenceSettingSection(_ref) {
  var _ref$showPresenceSett = _ref.showPresenceSettings,
    showPresenceSettings = _ref$showPresenceSett === void 0 ? false : _ref$showPresenceSett,
    toggleAcceptCallQueueCalls = _ref.toggleAcceptCallQueueCalls,
    isCallQueueMember = _ref.isCallQueueMember,
    dndStatusProp = _ref.dndStatus,
    userStatus = _ref.userStatus,
    currentLocale = _ref.currentLocale,
    setAvailable = _ref.setAvailable,
    setBusy = _ref.setBusy,
    setDoNotDisturb = _ref.setDoNotDisturb,
    setInvisible = _ref.setInvisible,
    _ref$enableAcceptQueu = _ref.enableAcceptQueueCallsControl,
    enableAcceptQueueCallsControl = _ref$enableAcceptQueu === void 0 ? true : _ref$enableAcceptQueu,
    onCallQueueManagementClick = _ref.onCallQueueManagementClick;
  var _useState = (0, _react.useState)(showPresenceSettings),
    _useState2 = _slicedToArray(_useState, 2),
    showSelects = _useState2[0],
    setShowSelects = _useState2[1];
  var toggleShow = function toggleShow() {
    setShowSelects(function (prev) {
      return !prev;
    });
  };
  var onCallQueueChange = function onCallQueueChange() {
    toggleAcceptCallQueueCalls();
  };
  var sectionClass = (0, _clsx["default"])(_styles["default"].section, showSelects ? _styles["default"].showDropdown : null);
  var acceptQueueCalls = isCallQueueMember ? /*#__PURE__*/_react["default"].createElement(_SwitchLineItem.SwitchLineItem, {
    dataSign: "acceptQueueSwitch",
    tooltip: !enableAcceptQueueCallsControl ? _i18n["default"].getString('callQueueDisabledReason', currentLocale) : undefined,
    customTitle: _i18n["default"].getString('acceptQueueCalls', currentLocale),
    show: true,
    checked: dndStatusProp === _Presence.dndStatus.takeAllCalls,
    onChange: onCallQueueChange,
    disabled: dndStatusProp === _Presence.dndStatus.doNotAcceptAnyCalls || !enableAcceptQueueCallsControl
  }) : null;
  var showCallQueueManagement = enableAcceptQueueCallsControl && onCallQueueManagementClick && dndStatusProp !== _Presence.dndStatus.doNotAcceptAnyCalls && dndStatusProp !== _Presence.dndStatus.doNotAcceptDepartmentCalls;
  var callQueueManagement = showCallQueueManagement ? /*#__PURE__*/_react["default"].createElement(_LinkLine.LinkLine, {
    dataSign: "callQueueManagementSwitch",
    onClick: onCallQueueManagementClick
  }, _i18n["default"].getString('callQueueManagement', currentLocale)) : null;
  var currentStatus = (0, _getPresenceStatusName.getPresenceStatusName)(userStatus, dndStatusProp, currentLocale);
  var _usePresenceItems = (0, _usePresenceItems2.usePresenceItems)({
      currentLocale: currentLocale,
      userStatus: userStatus,
      dndStatus: dndStatusProp,
      onChange: function onChange(type) {
        switch (type) {
          case 'available':
            setAvailable();
            break;
          case 'busy':
            setBusy();
            break;
          case 'DND':
            setDoNotDisturb();
            break;
          case 'offline':
            setInvisible();
            break;
          default:
            break;
        }
      }
    }),
    presenceElements = _usePresenceItems.elements,
    selectedItem = _usePresenceItems.selectedItem;
  return /*#__PURE__*/_react["default"].createElement("section", {
    className: sectionClass
  }, /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
    dataSign: "statusToggleShow",
    icon: /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].dropdownIcon
    }, /*#__PURE__*/_react["default"].createElement("i", {
      className: _DynamicsFont["default"].arrow
    })),
    onClick: toggleShow,
    className: _styles["default"].iconLine
  }, /*#__PURE__*/_react["default"].createElement(StyledPresenceWrap, null, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "status"
  }, _i18n["default"].getString('status', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcBox, {
    flex: "1 1 auto"
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcPresence, {
    size: "medium",
    type: selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.type
  }), /*#__PURE__*/_react["default"].createElement("span", null, currentStatus))), /*#__PURE__*/_react["default"].createElement(StyledList, {
    className: _styles["default"].presenceList
  }, presenceElements), acceptQueueCalls, callQueueManagement);
};

// export default class PresenceSettingSection extends Component<
//   PresenceSettingSectionProps,
//   PresenceSettingSectionState
// > {
//   constructor(props) {
//     super(props);
//   }
// }
//# sourceMappingURL=index.js.map
