"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConferenceCallParticipants = exports.ConferenceAvatar = void 0;
require("regenerator-runtime/runtime");
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: grid;\n  gap: ", ";\n  padding: ", ";\n  margin: ", ";\n\n  ", " {\n    margin-top: ", ";\n    padding: 0;\n  }\n\n  ", " {\n    overflow: hidden;\n\n    ", " {\n      padding-left: 0;\n      padding-right: 0;\n    }\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var InnerContainer = _juno.styled.div(_templateObject(), (0, _juno.spacing)(3), (0, _juno.spacing)(0, 4), (0, _juno.spacing)(4, 0), _juno.RcDialogActions, (0, _juno.spacing)(2), _juno.RcList, _juno.RcListItem);
var ConferenceCallParticipants = function ConferenceCallParticipants(_ref) {
  var isOpen = _ref.isOpen,
    currentLocale = _ref.currentLocale,
    _ref$participants = _ref.participants,
    participants = _ref$participants === void 0 ? [] : _ref$participants,
    toggleConference = _ref.toggleConference,
    currentTelephonySessionId = _ref.currentTelephonySessionId,
    getContactNameInfo = _ref.getContactNameInfo,
    renderAvatar = _ref.renderAvatar,
    onRemoveParticipant = _ref.onRemoveParticipant,
    clickRemoveParticipantTrack = _ref.clickRemoveParticipantTrack,
    openEntityDetailLink = _ref.openEntityDetailLink;
  var _useState = (0, _react.useState)(),
    _useState2 = _slicedToArray(_useState, 2),
    removeData = _useState2[0],
    setRemoveData = _useState2[1];
  var closeRemoveModal = function closeRemoveModal() {
    setRemoveData(undefined);
  };
  var length = participants.length;
  var removedModalOpen = !!removeData && isOpen;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcDrawer, {
    "data-sign": "removeParticipantModal",
    radius: "xl",
    anchor: "bottom",
    open: removedModalOpen,
    onClose: closeRemoveModal
  }, /*#__PURE__*/_react["default"].createElement(InnerContainer, null, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "subheading2"
  }, _i18n["default"].getString('removeTitle', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "body1"
  }, (0, _utils.format)(_i18n["default"].getString('removeDescription', currentLocale), {
    name: removeData === null || removeData === void 0 ? void 0 : removeData.name
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcDialogActions, {
    direction: "vertical",
    reverse: false
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "confirmRemoveButton",
    variant: "contained",
    color: "primary",
    size: "xlarge",
    fullWidth: true,
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return onRemoveParticipant(currentTelephonySessionId, removeData === null || removeData === void 0 ? void 0 : removeData.removedPartyId);
            case 2:
              closeRemoveModal();
            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))
  }, _i18n["default"].getString('confirmButtonText', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "cancelRemoveButton",
    variant: "text",
    size: "xlarge",
    fullWidth: true,
    onClick: closeRemoveModal
  }, _i18n["default"].getString('cancelButtonText', currentLocale))))), /*#__PURE__*/_react["default"].createElement(_juno.RcDrawer, {
    "data-sign": "participantsListModal",
    radius: "xl",
    anchor: "bottom",
    open: isOpen,
    onClose: function onClose() {
      return toggleConference(false);
    }
  }, /*#__PURE__*/_react["default"].createElement(InnerContainer, null, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "subheading2",
    "data-sign": "participantsHeader"
  }, "".concat(_i18n["default"].getString('participants', currentLocale), " (").concat(length, ")")), /*#__PURE__*/_react["default"].createElement(_juno.RcList, null, participants.map(function (_ref3) {
    var telephonySessionId = _ref3.telephonySessionId,
      sessionId = _ref3.sessionId,
      partyId = _ref3.partyId,
      isHost = _ref3.isHost,
      sessionName = _ref3.sessionName;
    var _getContactNameInfo = getContactNameInfo(sessionId, isHost),
      _getContactNameInfo$l = _getContactNameInfo.logName,
      logName = _getContactNameInfo$l === void 0 ? sessionName : _getContactNameInfo$l,
      entityDetailLink = _getContactNameInfo.entityDetailLink,
      displayEntity = _getContactNameInfo.displayEntity,
      entityType = _getContactNameInfo.entityType,
      entityDetailLinkId = _getContactNameInfo.entityDetailLinkId;
    var ConferenceAvatarIcon = renderAvatar ? renderAvatar({
      displayEntity: displayEntity,
      entityType: entityType,
      name: logName
    }) : /*#__PURE__*/_react["default"].createElement(ConferenceAvatar, {
      name: logName
    });
    var displayName = isHost ? "".concat(logName, " ").concat(_i18n["default"].getString('host', currentLocale)) : logName;
    return /*#__PURE__*/_react["default"].createElement(_juno.RcListItem, {
      singleLine: true,
      button: false,
      canHover: false,
      key: telephonySessionId,
      "data-sign": isHost ? "participantItemHost" : "participantItem"
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcListItemAvatar, {
      "data-sign": "participantAvatar"
    }, ConferenceAvatarIcon), /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
      "data-sign": "participantName",
      isEllipsis: true,
      title: displayName,
      primary: entityDetailLinkId ? /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
        variant: "inherit",
        onClick: function onClick() {
          return openEntityDetailLink ? openEntityDetailLink(entityDetailLinkId) : window.open(entityDetailLink, '_blank');
        }
      }, displayName) : displayName
    }), !isHost && /*#__PURE__*/_react["default"].createElement(_juno.RcListItemSecondaryAction, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
      "data-sign": "removeParticipantButton",
      variant: "round",
      size: "small",
      color: "action.grayLight",
      symbol: _junoIcon.RemoveMemberBorder,
      title: _i18n["default"].getString('removeParticipant', currentLocale),
      onClick: function onClick() {
        clickRemoveParticipantTrack === null || clickRemoveParticipantTrack === void 0 ? void 0 : clickRemoveParticipantTrack();
        setRemoveData({
          removedPartyId: partyId,
          name: logName
        });
      }
    })));
  })))));
};
exports.ConferenceCallParticipants = ConferenceCallParticipants;
var ConferenceAvatar = function ConferenceAvatar(_ref4) {
  var name = _ref4.name;
  var _ref5 = (name === null || name === void 0 ? void 0 : name.split(/\s+/)) || [],
    _ref6 = _slicedToArray(_ref5, 2),
    firstName = _ref6[0],
    lastName = _ref6[1];
  var presentAvatarName = (0, _juno.useAvatarShortName)({
    firstName: firstName,
    lastName: lastName
  });
  return /*#__PURE__*/_react["default"].createElement(_juno.RcAvatar, {
    color: "action.primary",
    size: "xsmall"
  }, presentAvatarName);
};
exports.ConferenceAvatar = ConferenceAvatar;
//# sourceMappingURL=ConferenceCallParticipants.js.map
