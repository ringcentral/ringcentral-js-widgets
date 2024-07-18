"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TransferPanel = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _Transfer = _interopRequireDefault(require("../../assets/images/Transfer.svg"));
var _ActiveCallButton = _interopRequireDefault(require("../ActiveCallButton"));
var _PageHeader = require("../BackHeader/PageHeader");
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _DialPad = _interopRequireDefault(require("../DialPad"));
var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));
var _i18n = require("./i18n");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var TransferPanel = function TransferPanel(_ref) {
  var _ref$setActiveSession = _ref.setActiveSessionId,
    setActiveSessionId = _ref$setActiveSession === void 0 ? function () {
      //
    } : _ref$setActiveSession,
    onTransfer = _ref.onTransfer,
    onWarmTransfer = _ref.onWarmTransfer,
    currentLocale = _ref.currentLocale,
    onBack = _ref.onBack,
    _ref$onCallEnd = _ref.onCallEnd,
    onCallEnd = _ref$onCallEnd === void 0 ? _rxjs.noop : _ref$onCallEnd,
    _ref$searchContactLis = _ref.searchContactList,
    searchContactList = _ref$searchContactLis === void 0 ? [] : _ref$searchContactLis,
    searchContact = _ref.searchContact,
    formatPhone = _ref.formatPhone,
    phoneTypeRenderer = _ref.phoneTypeRenderer,
    phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
    recipientsContactInfoRenderer = _ref.recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer = _ref.recipientsContactPhoneRenderer,
    _ref$autoFocus = _ref.autoFocus,
    autoFocus = _ref$autoFocus === void 0 ? true : _ref$autoFocus,
    sessionId = _ref.sessionId,
    _ref$session = _ref.session,
    session = _ref$session === void 0 ? null : _ref$session,
    _ref$controlBusy = _ref.controlBusy,
    controlBusy = _ref$controlBusy === void 0 ? false : _ref$controlBusy,
    _ref$enableWarmTransf = _ref.enableWarmTransfer,
    enableWarmTransfer = _ref$enableWarmTransf === void 0 ? false : _ref$enableWarmTransf;
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    toNumber = _useState2[0],
    setToNumber = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    _useState4 = _slicedToArray(_useState3, 2),
    recipient = _useState4[0],
    setRecipient = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isLastInputFromDialpad = _useState6[0],
    setIsLastInputFromDialpad = _useState6[1];
  (0, _react.useEffect)(function () {
    setActiveSessionId(sessionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var prevSession = (0, _juno.usePrevious)(function () {
    return session;
  });
  (0, _react.useEffect)(function () {
    if (prevSession && !session) {
      onCallEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  var getTransferNumber = function getTransferNumber() {
    return (recipient === null || recipient === void 0 ? void 0 : recipient.phoneNumber) || toNumber;
  };
  var onButtonOutput = function onButtonOutput(key) {
    setIsLastInputFromDialpad(true);
    if (recipient) {
      return;
    }
    setToNumber(function (prevState) {
      return prevState + key;
    });
  };
  var onTransferClick = function onTransferClick() {
    onTransfer(getTransferNumber(), sessionId);
  };
  var onWarmTransferClick = function onWarmTransferClick() {
    onWarmTransfer(getTransferNumber(), sessionId);
  };
  var onToNumberChange = function onToNumberChange(toNumber) {
    setIsLastInputFromDialpad(false);
    setToNumber(toNumber);
  };
  var clearToNumber = function clearToNumber() {
    setToNumber('');
  };
  var clearRecipient = function clearRecipient() {
    setRecipient(undefined);
  };
  var addToRecipients = function addToRecipients(recipient) {
    setRecipient(recipient);
    clearToNumber();
  };
  if (!session) {
    return null;
  }
  var isOnTransfer = !!session.isOnTransfer;
  var _getTransferButtons = getTransferButtons(),
    warmTransferButton = _getTransferButtons.warmTransferButton,
    transferButton = _getTransferButtons.transferButton;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeader, null, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderBack, {
    onClick: onBack,
    className: _styles["default"].backHeader
  }), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderTitle, null, (0, _i18n.t)('transferTo')), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderRemain, null)), /*#__PURE__*/_react["default"].createElement(_RecipientsInput["default"], {
    className: _styles["default"].dialInput,
    value: toNumber,
    onChange: onToNumberChange,
    onClean: clearToNumber,
    recipient: recipient,
    addToRecipients: addToRecipients,
    removeFromRecipients: clearRecipient,
    searchContact: searchContact,
    searchContactList: searchContactList,
    formatContactPhone: formatPhone,
    currentLocale: currentLocale,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    contactInfoRenderer: recipientsContactInfoRenderer,
    contactPhoneRenderer: recipientsContactPhoneRenderer,
    isLastInputFromDialpad: isLastInputFromDialpad,
    titleEnabled: true,
    autoFocus: autoFocus
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].padContainer
  }, /*#__PURE__*/_react["default"].createElement(_DialPad["default"], {
    dataSign: "transfer",
    className: _styles["default"].dialPad,
    onButtonOutput: onButtonOutput
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].buttonRow
  }, warmTransferButton, transferButton)));
  function getTransferButtons() {
    var transferButton;
    var warmTransferButton;
    if (enableWarmTransfer) {
      transferButton = /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].button, _styles["default"].buttonGroupItem)
      }, /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        dataSign: "transferBtn",
        className: isOnTransfer ? _styles["default"].disabled : undefined,
        onClick: onTransferClick,
        icon: _Transfer["default"],
        disabled: isOnTransfer || controlBusy,
        title: (0, _i18n.t)('blindTransfer')
      }));
      warmTransferButton = /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].button, _styles["default"].buttonGroupItem)
      }, /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        dataSign: "warmTransferBtn",
        className: isOnTransfer ? _styles["default"].disabled : undefined,
        onClick: onWarmTransferClick,
        icon: _junoIcon.Askfirst,
        disabled: isOnTransfer || controlBusy,
        title: (0, _i18n.t)('warmTransfer')
      }));
    } else {
      transferButton = /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
        className: _styles["default"].button,
        disabled: isOnTransfer || controlBusy,
        "data-sign": "transferBtnWrap"
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        dataSign: "transferBtn",
        className: isOnTransfer ? _styles["default"].disabled : undefined,
        onClick: onTransferClick,
        icon: _Transfer["default"],
        disabled: isOnTransfer || controlBusy
      }));
    }
    return {
      warmTransferButton: warmTransferButton,
      transferButton: transferButton
    };
  }
};
exports.TransferPanel = TransferPanel;
var _default = TransferPanel;
exports["default"] = _default;
//# sourceMappingURL=TransferPanel.js.map
