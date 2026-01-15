"use strict";

require("core-js/modules/es.array.some");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeTextPanel = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireDefault(require("react"));
var _CommunicationSetupPanel = require("../CommunicationSetupPanel");
var _NoSenderAlert = _interopRequireDefault(require("../ComposeTextPanel/NoSenderAlert"));
var _MessageInput = _interopRequireDefault(require("../MessageInput"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _styles = require("./styles");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // TODO: Re implement this component by function component
var ComposeTextPanel = function ComposeTextPanel(_ref) {
  var showSpinner = _ref.showSpinner,
    currentLocale = _ref.currentLocale,
    brand = _ref.brand,
    outboundSMS = _ref.outboundSMS,
    messageText = _ref.messageText,
    updateMessageText = _ref.updateMessageText,
    sendButtonDisabled = _ref.sendButtonDisabled,
    send = _ref.send,
    inputExpandable = _ref.inputExpandable,
    attachments = _ref.attachments,
    supportAttachment = _ref.supportAttachment,
    supportEmoji = _ref.supportEmoji,
    removeAttachment = _ref.removeAttachment,
    addAttachments = _ref.addAttachments,
    typingToNumber = _ref.typingToNumber,
    updateTypingToNumber = _ref.updateTypingToNumber,
    addToNumber = _ref.addToNumber,
    autoFocus = _ref.autoFocus,
    toNumbers = _ref.toNumbers,
    senderNumber = _ref.senderNumber,
    senderNumbers = _ref.senderNumbers,
    hintInfo = _ref.hintInfo,
    formatPhone = _ref.formatPhone,
    updateSenderNumber = _ref.updateSenderNumber,
    cleanTypingToNumber = _ref.cleanTypingToNumber,
    removeToNumber = _ref.removeToNumber,
    detectPhoneNumbers = _ref.detectPhoneNumbers,
    contactSearch = _ref.contactSearch,
    triggerEventTracking = _ref.triggerEventTracking;
  var hasSenderNumbers = senderNumbers.length > 0;
  var hasPersonalRecipient = toNumbers.some(function (x) {
    return x && x.type !== 'company';
  });
  // TODO:, double check the logic here.
  var showAlert = !!(!hasSenderNumbers && outboundSMS && hasPersonalRecipient);
  var addToRecipients = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(receiver) {
      var isAdded;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return addToNumber(receiver);
            case 2:
              isAdded = _context.sent;
              if (isAdded) {
                cleanTypingToNumber();
              }
            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function addToRecipients(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement(_styles.Root, null, showSpinner && /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null), /*#__PURE__*/_react["default"].createElement(_CommunicationSetupPanel.CommunicationSetupPanel, {
    triggerEventTracking: triggerEventTracking
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    ,
    toNumber: typingToNumber,
    onToNumberChange: updateTypingToNumber,
    directlyProceedType: "message",
    multiple: true,
    autoFocus: autoFocus,
    recipients: toNumbers,
    setRecipient: addToRecipients,
    clearRecipient: removeToNumber,
    currentLocale: currentLocale,
    detectPhoneNumbers: detectPhoneNumbers
    // from field
    ,
    showAnonymous: false,
    fromNumber: senderNumber,
    fromNumbers: senderNumbers,
    formatPhone: formatPhone,
    changeFromNumber: updateSenderNumber,
    showFromField: hasSenderNumbers,
    inputFullWidth: !!hintInfo,
    ContactSearch: contactSearch,
    filterCallQueueExtension: true
  }, /*#__PURE__*/_react["default"].createElement(_NoSenderAlert["default"], {
    currentLocale: currentLocale,
    showAlert: showAlert,
    brand: brand
  }), hintInfo, /*#__PURE__*/_react["default"].createElement(_MessageInput["default"]
  // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
  , {
    value: messageText,
    onChange: updateMessageText,
    sendButtonDisabled: sendButtonDisabled,
    currentLocale: currentLocale,
    onSend: send,
    inputExpandable: inputExpandable,
    attachments: attachments,
    supportAttachment: supportAttachment,
    supportEmoji: supportEmoji,
    addAttachments: addAttachments,
    removeAttachment: removeAttachment
  })));
};
exports.ComposeTextPanel = ComposeTextPanel;
//# sourceMappingURL=ComposeTextPanel.js.map
