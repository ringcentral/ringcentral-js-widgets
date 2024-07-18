"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ContactItem = void 0;
require("regenerator-runtime/runtime");
var _format = require("@ringcentral-integration/phone-number/lib/format");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _DefaultAvatar = _interopRequireDefault(require("../../assets/images/DefaultAvatar.svg"));
var _usePresence = require("../../react-hooks/usePresence");
var _PlaceholderImage = _interopRequireDefault(require("../PlaceholderImage"));
var _PresenceStatusIcon = _interopRequireDefault(require("../PresenceStatusIcon"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
