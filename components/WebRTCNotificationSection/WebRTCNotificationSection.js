"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebRTCNotificationSection = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx2 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));
var _EndAnswer = _interopRequireDefault(require("../../assets/images/EndAnswer.svg"));
var _Forward_white = _interopRequireDefault(require("../../assets/images/Forward_white.svg"));
var _HoldAnswer = _interopRequireDefault(require("../../assets/images/HoldAnswer.svg"));
var _MoreActionWithIncomingCall = require("../CallLogCallCtrlComponent/MoreActionWithIncomingCall");
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _templateObject;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var ForwardActiveList = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  max-width: 170px;\n"])));
var WebRTCNotificationSection = exports.WebRTCNotificationSection = function WebRTCNotificationSection(_ref) {
  var call = _ref.call,
    onCloseNotification = _ref.onCloseNotification,
    currentNotificationIdentify = _ref.currentNotificationIdentify,
    logName = _ref.logName,
    subContactNameDisplay = _ref.subContactNameDisplay,
    currentLocale = _ref.currentLocale,
    isWide = _ref.isWide,
    onIgnore = _ref.onIgnore,
    endAndAnswer = _ref.endAndAnswer,
    holdAndAnswer = _ref.holdAndAnswer,
    showToVoicemail = _ref.showToVoicemail,
    toVoicemail = _ref.toVoicemail,
    hasActiveSession = _ref.hasActiveSession,
    answer = _ref.answer,
    forwardingNumbers = _ref.forwardingNumbers,
    onForward = _ref.onForward,
    _ref$clickForwardTrac = _ref.clickForwardTrack,
    clickForwardTrack = _ref$clickForwardTrac === void 0 ? function () {} : _ref$clickForwardTrac,
    renderCallNotificationAvatar = _ref.renderCallNotificationAvatar,
    displayEntity = _ref.displayEntity,
    entityType = _ref.entityType,
    getAvatarUrl = _ref.getAvatarUrl,
    entityDetailLinkId = _ref.entityDetailLinkId,
    openEntityDetailLinkTrack = _ref.openEntityDetailLinkTrack,
    openEntityDetailLink = _ref.openEntityDetailLink,
    _reply = _ref.reply,
    enableReply = _ref.enableReply,
    _ref$disableLinks = _ref.disableLinks,
    disableLinks = _ref$disableLinks === void 0 ? false : _ref$disableLinks;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    anchorEl = _useState2[0],
    setAnchorEl = _useState2[1];
  var _useState3 = (0, _react.useState)(displayEntity === null || displayEntity === void 0 ? void 0 : displayEntity.profileImageUrl),
    _useState4 = _slicedToArray(_useState3, 2),
    avatarUrl = _useState4[0],
    setAvatarUrl = _useState4[1];
  (0, _react.useEffect)(function () {
    if (currentNotificationIdentify) {
      var result = call.result;
      if (result) {
        onCloseNotification();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call.result]);
  (0, _react.useEffect)(function () {
    if (displayEntity && displayEntity.hasProfileImage) {
      getAvatarUrl(displayEntity).then(function (url) {
        setAvatarUrl(url);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayEntity]);
  var displayMatchedEntity = displayEntity ? _objectSpread(_objectSpread({}, displayEntity), {}, {
    profileImageUrl: avatarUrl
  }) : null;
  var renderLogSection = function renderLogSection() {
    var telephonySessionId = call.telephonySessionId;
    var handleClick = function handleClick(event) {
      clickForwardTrack();
      // @ts-expect-error TS(2345): Argument of type 'EventTarget & HTMLButtonElement'... Remove this comment to see the full error message
      setAnchorEl(event.currentTarget);
    };
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].layer
    }, /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "inboundNotification",
      className: (0, _clsx2["default"])(!isWide ? _styles["default"].classic : null, _styles["default"].content)
    }, renderCallNotificationAvatar === null || renderCallNotificationAvatar === void 0 ? void 0 : renderCallNotificationAvatar(displayMatchedEntity, entityType), /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "inboundNotificationLogName",
      title: logName,
      className: _styles["default"].contact
    }, entityDetailLinkId ? /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
      variant: "inherit",
      onClick: function onClick() {
        openEntityDetailLink === null || openEntityDetailLink === void 0 ? void 0 : openEntityDetailLink(entityDetailLinkId);
        openEntityDetailLinkTrack === null || openEntityDetailLinkTrack === void 0 ? void 0 : openEntityDetailLinkTrack();
      }
    }, logName) : logName), subContactNameDisplay && /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "subName",
      className: _styles["default"].number
    }, subContactNameDisplay), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].control
    }, /*#__PURE__*/_react["default"].createElement("ul", {
      className: (0, _clsx2["default"])(_styles["default"].buttonsGroup, _defineProperty({}, _styles["default"].singleCallCtrl, !hasActiveSession))
    }, /*#__PURE__*/_react["default"].createElement("li", {
      className: _styles["default"].callButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "ignore",
      icon: _junoIcon.Ignore,
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      className: _styles["default"].button,
      onClick: function onClick() {
        return onIgnore(telephonySessionId);
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('ignore', currentLocale),
      className: _styles["default"].firstLineText
    }, _i18n["default"].getString('ignore', currentLocale))), /*#__PURE__*/_react["default"].createElement("li", {
      className: _styles["default"].callButton
    }, enableReply ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_MoreActionWithIncomingCall.MoreActionWithIncomingCall, {
      currentLocale: currentLocale,
      disabled: disableLinks,
      forwardingNumbers: forwardingNumbers,
      forward: (/*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(phoneNumber) {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                return _context.a(2, onForward(phoneNumber, telephonySessionId));
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }()),
      enableReply: true,
      reply: function reply() {
        return _reply === null || _reply === void 0 ? void 0 : _reply(telephonySessionId);
      },
      clickForwardTrack: clickForwardTrack,
      isWebRTCNotification: true
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('more', currentLocale),
      className: _styles["default"].firstLineText
    }, _i18n["default"].getString('more', currentLocale))) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: !anchorEl ? 'forward' : 'forwardActive',
      icon: _Forward_white["default"],
      className: _styles["default"].button,
      onClick: handleClick
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('forward', currentLocale),
      className: _styles["default"].firstLineText
    }, _i18n["default"].getString('forward', currentLocale)))), showToVoicemail && !isWide && hasActiveSession && /*#__PURE__*/_react["default"].createElement("li", {
      className: (0, _clsx2["default"])(_styles["default"].callButton, _styles["default"].voicemail)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "toVoiceMail",
      icon: _junoIcon.Voicemail,
      className: (0, _clsx2["default"])(_styles["default"].button, _styles["default"].hangup),
      showBorder: false,
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      onClick: function onClick() {
        return toVoicemail(telephonySessionId);
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('toVoicemail', currentLocale),
      className: _styles["default"].firstLineText
    }, _i18n["default"].getString('toVoicemail', currentLocale)))), /*#__PURE__*/_react["default"].createElement("ul", {
      className: _styles["default"].buttonsGroup
    }, !hasActiveSession && /*#__PURE__*/_react["default"].createElement("li", {
      className: (0, _clsx2["default"])(_styles["default"].callButton, _styles["default"].answerButton)
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "answer",
      icon: _Answer["default"],
      className: (0, _clsx2["default"])(_styles["default"].button, _styles["default"].answer),
      showBorder: false,
      onClick: function onClick() {
        return answer(telephonySessionId);
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('answer', currentLocale),
      className: _styles["default"].secondLineText
    }, _i18n["default"].getString('answer', currentLocale))), hasActiveSession && /*#__PURE__*/_react["default"].createElement("li", {
      className: _styles["default"].callButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "endAndAnswer",
      icon: _EndAnswer["default"],
      className: (0, _clsx2["default"])(_styles["default"].button, _styles["default"].multipleButton),
      showBorder: false,
      iconWidth: 500,
      iconHeight: 500,
      iconX: 0,
      iconY: 0,
      onClick: function onClick() {
        return endAndAnswer(telephonySessionId);
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('endAndAnswer', currentLocale),
      className: _styles["default"].secondLineText
    }, _i18n["default"].getString('endAndAnswer', currentLocale))), (isWide || !hasActiveSession) && showToVoicemail && /*#__PURE__*/_react["default"].createElement("li", {
      className: _styles["default"].callButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "toVoiceMail",
      icon: _junoIcon.Voicemail,
      className: (0, _clsx2["default"])(_styles["default"].button, _styles["default"].hangup),
      showBorder: false,
      iconWidth: 250,
      iconHeight: 250,
      iconX: 125,
      iconY: 125,
      onClick: function onClick() {
        return toVoicemail(telephonySessionId);
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('toVoicemail', currentLocale),
      className: _styles["default"].secondLineText
    }, _i18n["default"].getString('toVoicemail', currentLocale))), hasActiveSession && /*#__PURE__*/_react["default"].createElement("li", {
      className: _styles["default"].callButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      dataSign: "holdAndAnswer",
      icon: _HoldAnswer["default"],
      className: (0, _clsx2["default"])(_styles["default"].button, _styles["default"].multipleButton),
      showBorder: false,
      iconWidth: 500,
      iconHeight: 500,
      iconX: 0,
      iconY: 0,
      onClick: function onClick() {
        return holdAndAnswer(telephonySessionId);
      }
    }), /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('holdAndAnswer', currentLocale),
      className: _styles["default"].secondLineText
    }, _i18n["default"].getString('holdAndAnswer', currentLocale)))))));
  };
  var renderForwardList = function renderForwardList() {
    var handleClose = function handleClose() {
      setAnchorEl(null);
    };
    var forward = function forward(e) {
      e.stopPropagation();
      handleClose();
      // TODO: check that type, should switch to getAttribute
      // @ts-expect-error TS(7015): Element implicitly has an 'any' type because index... Remove this comment to see the full error message
      var selectedValue = e.currentTarget.attributes['data-value'].value;
      onForward(selectedValue, call === null || call === void 0 ? void 0 : call.telephonySessionId);
    };
    var forwardList = forwardingNumbers.map(function (phoneNumber) {
      return {
        key: phoneNumber.phoneNumber,
        text: phoneNumber.label,
        subText: phoneNumber.phoneNumber,
        onClick: forward
      };
    });
    forwardList.push({
      key: 'custom',
      text: _i18n["default"].getString('custom', currentLocale),
      subText: null,
      onClick: forward
    });
    return /*#__PURE__*/_react["default"].createElement(_juno.RcPopover, {
      anchorOrigin: {
        vertical: 'center',
        horizontal: isWide ? 'left' : 'center'
      },
      transformOrigin: {
        vertical: 'center',
        horizontal: isWide ? 'right' : 'center'
      },
      marginThreshold: isWide ? 0 : 15,
      anchorEl: anchorEl,
      open: !!anchorEl,
      onClose: function onClose() {
        return handleClose();
      },
      classes: {
        paper: _styles["default"].forwardPopover
      }
    }, /*#__PURE__*/_react["default"].createElement(ForwardActiveList, {
      "data-sign": "forwardActiveList"
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuList, null, forwardList.map(function (_ref3) {
      var text = _ref3.text,
        subText = _ref3.subText,
        onClick = _ref3.onClick,
        key = _ref3.key;
      return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        key: key,
        onClick: onClick,
        "data-value": key
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].moreActionItem,
        "data-sign": key
      }, text && /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].actionText
      }, text), subText && /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].subText
      }, subText, " ")));
    }))));
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, renderLogSection(), renderForwardList());
};
//# sourceMappingURL=WebRTCNotificationSection.js.map
