"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresenceDropdown = void 0;
var _react = _interopRequireWildcard(require("react"));
var _juno = require("@ringcentral/juno");
var _getPresenceStatusName = require("../../lib/getPresenceStatusName");
var _usePresenceItems2 = require("./usePresenceItems");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  padding-left: ", ";\n  z-index: 2;\n  cursor: pointer;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var Wrapper = _juno.styled.div(_templateObject(), (0, _juno.spacing)(5));
var PresenceDropdown = function PresenceDropdown(_ref) {
  var userStatus = _ref.userStatus,
    dndStatus = _ref.dndStatus,
    currentLocale = _ref.currentLocale,
    setAvailable = _ref.setAvailable,
    setBusy = _ref.setBusy,
    setDoNotDisturb = _ref.setDoNotDisturb,
    setInvisible = _ref.setInvisible,
    isReady = _ref.isReady,
    className = _ref.className;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    anchorEl = _useState2[0],
    setAnchorEl = _useState2[1];
  var handleClick = function handleClick(event) {
    if (!isReady) return;
    setAnchorEl(event.currentTarget);
  };
  var handleClose = function handleClose() {
    return setAnchorEl(null);
  };
  var _usePresenceItems = (0, _usePresenceItems2.usePresenceItems)({
      currentLocale: currentLocale,
      userStatus: userStatus,
      dndStatus: dndStatus,
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
        handleClose();
      }
    }),
    presenceElements = _usePresenceItems.elements,
    selectedItem = _usePresenceItems.selectedItem;
  var type = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.type;
  if (!type) {
    return null;
  }

  // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
  var title = (0, _getPresenceStatusName.getPresenceStatusName)(userStatus, dndStatus, currentLocale);
  return /*#__PURE__*/_react["default"].createElement(Wrapper, null, /*#__PURE__*/_react["default"].createElement(_juno.RcPresence, {
    role: "button",
    "aria-label": "presence state",
    size: "large",
    type: type,
    title: title,
    onClick: handleClick,
    className: className
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcMenu, {
    open: Boolean(anchorEl),
    anchorEl: anchorEl,
    onClose: handleClose,
    "aria-label": "choice a presence state"
  }, presenceElements));
};
exports.PresenceDropdown = PresenceDropdown;
//# sourceMappingURL=index.js.map
