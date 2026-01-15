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
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConferenceCallParticipants = exports.ConferenceAvatar = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.split.js");
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _templateObject;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var InnerContainer = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: grid;\n  gap: ", ";\n  padding: ", ";\n  margin: ", ";\n\n  ", " {\n    margin-top: ", ";\n    padding: 0;\n  }\n\n  ", " {\n    overflow: hidden;\n\n    ", " {\n      padding-left: 0;\n      padding-right: 0;\n    }\n  }\n"])), (0, _juno.spacing)(3), (0, _juno.spacing)(0, 4), (0, _juno.spacing)(4, 0), _juno.RcDialogActions, (0, _juno.spacing)(2), _juno.RcList, _juno.RcListItem);
var ConferenceCallParticipants = exports.ConferenceCallParticipants = function ConferenceCallParticipants(_ref) {
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
    onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return onRemoveParticipant(currentTelephonySessionId, removeData === null || removeData === void 0 ? void 0 : removeData.removedPartyId);
          case 1:
            closeRemoveModal();
          case 2:
            return _context.a(2);
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
var ConferenceAvatar = exports.ConferenceAvatar = function ConferenceAvatar(_ref4) {
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
//# sourceMappingURL=ConferenceCallParticipants.js.map
