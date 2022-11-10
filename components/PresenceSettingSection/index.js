"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresenceSettingSection = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dndStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Presence/dndStatus"));

var _juno = require("@ringcentral/juno");

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _getPresenceStatusName = require("../../lib/getPresenceStatusName");

var _IconLine = _interopRequireDefault(require("../IconLine"));

var _usePresenceItems2 = require("../PresenceDropdown/usePresenceItems");

var _Switch = _interopRequireDefault(require("../Switch"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledList = (0, _juno.styled)(_juno.RcList)(_templateObject(), (0, _juno.palette2)('neutral', 'elevation'), _juno.RcListItem, (0, _juno.spacing)(5)); // TODO: when full page refactor, remove this

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

  var sectionClass = (0, _classnames["default"])(_styles["default"].section, showSelects ? _styles["default"].showDropdown : null);
  var acceptQueueCalls = isCallQueueMember ? /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
    dataSign: "acceptQueueSwitch",
    icon: /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
      disable: dndStatusProp === _dndStatus["default"].doNotAcceptAnyCalls,
      checked: dndStatusProp === _dndStatus["default"].takeAllCalls,
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
}; // export default class PresenceSettingSection extends Component<
//   PresenceSettingSectionProps,
//   PresenceSettingSectionState
// > {
//   constructor(props) {
//     super(props);
//   }
// }


exports.PresenceSettingSection = PresenceSettingSection;
//# sourceMappingURL=index.js.map
