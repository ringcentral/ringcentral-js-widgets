"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomingCallView = void 0;
require("regenerator-runtime/runtime");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _IncomingCallPanel = _interopRequireDefault(require("../IncomingCallPanel"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var IncomingCallView = function IncomingCallView(props) {
  var currentLocale = props.currentLocale,
    _props$nameMatches = props.nameMatches,
    nameMatches = _props$nameMatches === void 0 ? [] : _props$nameMatches,
    phoneNumber = props.phoneNumber,
    formatPhone = props.formatPhone,
    areaCode = props.areaCode,
    countryCode = props.countryCode,
    forwardingNumbers = props.forwardingNumbers,
    brand = props.brand,
    showContactDisplayPlaceholder = props.showContactDisplayPlaceholder,
    sourceIcons = props.sourceIcons,
    searchContact = props.searchContact,
    searchContactList = props.searchContactList,
    children = props.children,
    session = props.session,
    activeSessionId = props.activeSessionId,
    showCallQueueName = props.showCallQueueName,
    rejectProp = props.reject,
    toVoiceMailProp = props.toVoiceMail,
    replyWithMessageProp = props.replyWithMessage,
    toggleMinimizedProp = props.toggleMinimized,
    hangupProp = props.hangup,
    answerProp = props.answer,
    onHoldProp = props.onHold,
    onForwardProp = props.onForward,
    getAvatarUrl = props.getAvatarUrl,
    updateSessionMatchedContact = props.updateSessionMatchedContact,
    phoneTypeRenderer = props.phoneTypeRenderer,
    phoneSourceNameRenderer = props.phoneSourceNameRenderer,
    callerIdName = props.callerIdName;
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    selectedMatcherIndex = _useState2[0],
    setSelectedMatcherIndex = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    avatarUrl = _useState4[0],
    setAvatarUrl = _useState4[1];
  var _useMountState = (0, _juno.useMountState)(),
    mounted = _useMountState.current;
  var hasOtherActiveCall = !!activeSessionId;
  var answer = function answer() {
    return answerProp(session.id);
  };
  var reject = function reject() {
    return rejectProp(session.id);
  };
  var toVoiceMail = function toVoiceMail() {
    return toVoiceMailProp(session.id);
  };
  var replyWithMessage = function replyWithMessage(message) {
    return replyWithMessageProp(session.id, message);
  };
  var toggleMinimized = function toggleMinimized() {
    return toggleMinimizedProp(session.id);
  };
  var answerAndEnd = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return hangupProp(activeSessionId);
            case 2:
              _context.next = 4;
              return answerProp(session.id);
            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function answerAndEnd() {
      return _ref.apply(this, arguments);
    };
  }();
  var answerAndHold = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return onHoldProp(activeSessionId);
            case 2:
              _context2.next = 4;
              return answerProp(session.id);
            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function answerAndHold() {
      return _ref2.apply(this, arguments);
    };
  }();
  var onForward = function onForward(forwardNumber) {
    return onForwardProp(session.id, forwardNumber);
  };
  var updateAvatarUrl = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(contact) {
      var _avatarUrl;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              avatarUrl && setAvatarUrl(null);
              if (!contact) {
                _context3.next = 8;
                break;
              }
              _context3.next = 4;
              return getAvatarUrl(contact);
            case 4:
              _avatarUrl = _context3.sent;
              if (mounted) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return");
            case 7:
              setAvatarUrl(_avatarUrl);
            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return function updateAvatarUrl(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var getSelectedMatcherItem = function getSelectedMatcherItem(currContact) {
    var index = nameMatches.findIndex(function (match) {
      return match.id === (currContact === null || currContact === void 0 ? void 0 : currContact.id);
    });
    if (index < 0) index = 0;
    if (index !== selectedMatcherIndex) {
      setSelectedMatcherIndex(index);
    }
    return nameMatches[index];
  };
  var handleSelectMatcherName = function handleSelectMatcherName(currContact) {
    var contact = getSelectedMatcherItem(currContact);
    if (contact) {
      updateAvatarUrl(contact);
      updateSessionMatchedContact(session.id, contact);
    }
  };
  (0, _react.useEffect)(function () {
    var contact = getSelectedMatcherItem(session.contactMatch || ( // zero index maybe null
    nameMatches === null || nameMatches === void 0 ? void 0 : nameMatches[0]));
    updateAvatarUrl(contact);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.id]);
  var active = !!session.id;
  if (!active || session.minimized) {
    return null;
  }
  var fallbackUserName;
  if (session.direction === _callDirections["default"].inbound && session.from === 'anonymous') {
    fallbackUserName = _i18n["default"].getString('anonymous', currentLocale);
  }
  if (!fallbackUserName) {
    fallbackUserName = _i18n["default"].getString('unknown', currentLocale);
  }
  return /*#__PURE__*/_react["default"].createElement(_IncomingCallPanel["default"], {
    currentLocale: currentLocale,
    nameMatches: nameMatches,
    callerIdName: callerIdName,
    fallBackName: fallbackUserName,
    callQueueName: showCallQueueName ? session.callQueueName : null,
    phoneNumber: phoneNumber,
    answer: answer,
    reject: reject,
    replyWithMessage: replyWithMessage,
    toVoiceMail: toVoiceMail,
    formatPhone: formatPhone,
    areaCode: areaCode,
    countryCode: countryCode,
    selectedMatcherIndex: selectedMatcherIndex,
    onSelectMatcherName: handleSelectMatcherName,
    avatarUrl: avatarUrl,
    onBackButtonClick: toggleMinimized,
    forwardingNumbers: forwardingNumbers,
    onForward: onForward,
    brand: brand,
    showContactDisplayPlaceholder: showContactDisplayPlaceholder,
    hasOtherActiveCall: hasOtherActiveCall,
    answerAndEnd: answerAndEnd,
    answerAndHold: answerAndHold,
    sessionId: session.id,
    sourceIcons: sourceIcons,
    searchContact: searchContact,
    searchContactList: searchContactList,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer
  }, children);
};
exports.IncomingCallView = IncomingCallView;
//# sourceMappingURL=IncomingCallView.js.map
