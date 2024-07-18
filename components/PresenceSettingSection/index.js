"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
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
var _usePresenceItems2 = require("../PresenceDropdown/usePresenceItems");
var _Switch = _interopRequireDefault(require("../Switch"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  color: ", ";\n\n  ", " {\n    margin-right: ", ";\n  }\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n\n  ", " {\n    padding-left: ", ";\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledList = (0, _juno.styled)(_juno.RcList)(_templateObject(), (0, _juno.palette2)('neutral', 'elevation'), _juno.RcListItem, (0, _juno.spacing)(5));

// TODO: when full page refactor, remove this
var StyledPresenceWrap = _juno.styled.div(_templateObject2(), _juno.flexCenterStyle, (0, _juno.palette2)('neutral', 'f05'), _juno.RcPresence, (0, _juno.spacing)(2));
var PresenceSettingSection = function PresenceSettingSection(_ref) {
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
    setInvisible = _ref.setInvisible;
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
  var acceptQueueCalls = isCallQueueMember ? /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
    dataSign: "acceptQueueSwitch",
    icon: /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
      disable: dndStatusProp === _Presence.dndStatus.doNotAcceptAnyCalls,
      checked: dndStatusProp === _Presence.dndStatus.takeAllCalls,
      onChange: onCallQueueChange
    })
  }, _i18n["default"].getString('acceptQueueCalls', currentLocale)) : null;
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
  }, presenceElements), acceptQueueCalls);
};

// export default class PresenceSettingSection extends Component<
//   PresenceSettingSectionProps,
//   PresenceSettingSectionState
// > {
//   constructor(props) {
//     super(props);
//   }
// }
exports.PresenceSettingSection = PresenceSettingSection;
//# sourceMappingURL=index.js.map
