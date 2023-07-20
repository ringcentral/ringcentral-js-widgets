"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomingCallView = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireWildcard(require("react"));
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _juno = require("@ringcentral/juno");
var _IncomingCallPanel = _interopRequireDefault(require("../IncomingCallPanel"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
    name = props.name;
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
    return function updateAvatarUrl(_x2) {
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
    name: name,
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
