"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ContactItem = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireWildcard(require("react"));
var _format = require("@ringcentral-integration/phone-number/lib/format");
var _juno = require("@ringcentral/juno");
var _DefaultAvatar = _interopRequireDefault(require("../../assets/images/DefaultAvatar.svg"));
var _PlaceholderImage = _interopRequireDefault(require("../PlaceholderImage"));
var _PresenceStatusIcon = _interopRequireDefault(require("../PresenceStatusIcon"));
var _usePresence = require("../../react-hooks/usePresence");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var AvatarNode = function AvatarNode(_ref) {
  var name = _ref.name,
    avatarUrl = _ref.avatarUrl,
    isInactive = _ref.isInactive;
  var avatarStyle = isInactive ? _styles["default"].inactiveAvatarNode : _styles["default"].avatarNode;
  return /*#__PURE__*/_react["default"].createElement(_PlaceholderImage["default"]
  // @ts-expect-error TS(2322): Type '{ className: string; alt: any; src: any; pla... Remove this comment to see the full error message
  , {
    className: avatarStyle,
    alt: name,
    src: avatarUrl,
    placeholder: /*#__PURE__*/_react["default"].createElement(_DefaultAvatar["default"], {
      "data-sign": "profile",
      "data-inactive": isInactive,
      className: avatarStyle
    })
  });
};
var defaultSourceNodeRenderer = function defaultSourceNodeRenderer() {
  return null;
};
var ContactItem = function ContactItem(_ref2) {
  var contact = _ref2.contact,
    currentLocale = _ref2.currentLocale,
    getPresence = _ref2.getPresence,
    getAvatarUrl = _ref2.getAvatarUrl,
    onSelect = _ref2.onSelect,
    _ref2$currentSiteCode = _ref2.currentSiteCode,
    currentSiteCode = _ref2$currentSiteCode === void 0 ? '' : _ref2$currentSiteCode,
    _ref2$isMultipleSiteE = _ref2.isMultipleSiteEnabled,
    isMultipleSiteEnabled = _ref2$isMultipleSiteE === void 0 ? false : _ref2$isMultipleSiteE,
    _ref2$sourceNodeRende = _ref2.sourceNodeRenderer,
    sourceNodeRenderer = _ref2$sourceNodeRende === void 0 ? defaultSourceNodeRenderer : _ref2$sourceNodeRende;
  var _useState = (0, _react.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useSleep = (0, _juno.useSleep)(),
    sleepForLoading = _useSleep.sleep;
  var _useSleep2 = (0, _juno.useSleep)(),
    sleepForGettingInfo = _useSleep2.sleep;
  var presence = (0, _usePresence.usePresence)(contact, {
    fetch: getPresence,
    timeout: 500
  });
  var onItemSelected = function onItemSelected() {
    if (onSelect) {
      onSelect(contact);
    }
  };
  var renderMiddle = function renderMiddle() {
    var name = contact.name,
      contactStatus = contact.contactStatus;
    if (contactStatus === 'NotActivated') {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].infoWrapper
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].inactiveContactName,
        "data-inactive": true,
        title: name
      }, name), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].inactiveText
      }, _i18n["default"].getString('notActivated', currentLocale)));
    }
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].contactName,
      title: name
    }, name);
  };
  (0, _react.useEffect)(function () {
    // TODO: should know why need 3s delay
    sleepForLoading(3).then(function () {
      setLoading(false);
    });
    sleepForGettingInfo(500).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              getAvatarUrl(contact);
            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].root
    });
  }
  var name = contact.name,
    extensionNumber = contact.extensionNumber,
    type = contact.type,
    profileImageUrl = contact.profileImageUrl,
    contactStatus = contact.contactStatus;
  var displayingNumber = extensionNumber;
  if (isMultipleSiteEnabled) {
    displayingNumber = (0, _format.formatSameSiteExtension)({
      currentSiteCode: currentSiteCode,
      extension: extensionNumber
    });
  }
  var sourceNode = sourceNodeRenderer({
    sourceType: type
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root,
    onClick: onItemSelected,
    "data-sign": "contactItem"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].contactProfile
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].avatarNodeContainer
  }, /*#__PURE__*/_react["default"].createElement(AvatarNode, {
    name: name,
    avatarUrl: profileImageUrl,
    isInactive: contactStatus === 'NotActivated'
  })), sourceNode ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].sourceNodeContainer
  }, sourceNode) : null, contactStatus !== 'NotActivated' && presence ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].presenceNodeContainer
  }, /*#__PURE__*/_react["default"].createElement(_PresenceStatusIcon["default"], _extends({
    className: _styles["default"].presenceNode
  }, presence))) : null), renderMiddle(), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].phoneNumber,
    title: displayingNumber
  }, displayingNumber));
};
exports.ContactItem = ContactItem;
var _default = ContactItem;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
