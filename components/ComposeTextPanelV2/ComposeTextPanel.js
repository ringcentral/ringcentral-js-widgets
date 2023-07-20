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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // TODO: Re implement this component by function component
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
    removeAttachment = _ref.removeAttachment,
    addAttachment = _ref.addAttachment,
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
    detectPhoneNumbers = _ref.detectPhoneNumbers;
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
  return /*#__PURE__*/_react["default"].createElement(_styles.Root, null, showSpinner && /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null), /*#__PURE__*/_react["default"].createElement(_CommunicationSetupPanel.CommunicationSetupPanel
  // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
  , {
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
    inputFullWidth: !!hintInfo
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
    addAttachment: addAttachment,
    removeAttachment: removeAttachment
  })));
};
exports.ComposeTextPanel = ComposeTextPanel;
//# sourceMappingURL=ComposeTextPanel.js.map
