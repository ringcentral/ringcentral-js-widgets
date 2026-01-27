"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationsList = void 0;
require("core-js/modules/es.array.concat.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _no_fax = _interopRequireDefault(require("@ringcentral-integration/next-core/assets/no_fax.svg"));
var _no_text = _interopRequireDefault(require("@ringcentral-integration/next-core/assets/no_text.svg"));
var _no_voicemail = _interopRequireDefault(require("@ringcentral-integration/next-core/assets/no_voicemail.svg"));
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _ConversationsListItem = require("./ConversationsListItem");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var noDataComponentMap = {
  All: function All() {
    return null;
  },
  SMS: function SMS() {
    return null;
  },
  Pager: function Pager() {
    return null;
  },
  Text: function Text(_ref) {
    var message = _ref.message;
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_no_text["default"], null), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-center text-14 text-gray-500 mt-2"
    }, message));
  },
  Fax: function Fax(_ref2) {
    var message = _ref2.message;
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_no_fax["default"], null), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-center text-14 text-gray-500 mt-2"
    }, message));
  },
  VoiceMail: function VoiceMail(_ref3) {
    var message = _ref3.message;
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_no_voicemail["default"], null), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-center text-14 text-gray-500 mt-2"
    }, message));
  }
};
var noDataHintMap = {
  All: {
    Read: 'noMessages',
    Unread: 'noMessages',
    All: 'noMessages'
  },
  Fax: {
    Read: 'noFaxes',
    Unread: 'noUnreadFaxes',
    All: 'noFaxes'
  },
  SMS: {
    Read: 'noMessages',
    Unread: 'noMessages',
    All: 'noMessages'
  },
  VoiceMail: {
    Read: 'noVoicemail',
    Unread: 'noVoicemail',
    All: 'noVoicemail'
  },
  Pager: {
    Read: 'noMessages',
    Unread: 'noMessages',
    All: 'noMessages'
  },
  Text: {
    Read: 'noText',
    Unread: 'noUnreadText',
    All: 'noText'
  }
};
var ConversationsList = exports.ConversationsList = function ConversationsList(props) {
  var conversations = props.conversations,
    className = props.className,
    notFoundMessage = props.notFoundMessage,
    useActionsHandler = props.useActionsHandler,
    useConversationItemInfo = props.useConversationItemInfo,
    useItemRender = props.useItemRender,
    lastPosition = props.lastPosition,
    setLastPosition = props.setLastPosition,
    showLogPopover = props.showLogPopover,
    typeFilter = props.typeFilter,
    readStatusFilter = props.readStatusFilter,
    createNewEntityTooltip = props.createNewEntityTooltip;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useVirtuosoScrollPos = (0, _reactHooks.useVirtuosoScrollPosition)(function (snapshot) {
      return setLastPosition("".concat(typeFilter, "-").concat(readStatusFilter), snapshot);
    }),
    virtuosoActionsRef = _useVirtuosoScrollPos.virtuosoActionsRef,
    scrollerRef = _useVirtuosoScrollPos.scrollerRef;
  if (conversations.length === 0) {
    var NoComponent = noDataComponentMap[typeFilter];
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-auto flex justify-center items-center overflow-y-auto overflow-x-hidden"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-col flex justify-center items-center gpa-4"
    }, NoComponent ? /*#__PURE__*/_react["default"].createElement(NoComponent, {
      message: notFoundMessage !== null && notFoundMessage !== void 0 ? notFoundMessage : t(noDataHintMap[typeFilter][readStatusFilter])
    }) : null));
  }
  return /*#__PURE__*/_react["default"].createElement(_springUi.VirtualizedList, {
    key: "".concat(typeFilter, "-").concat(readStatusFilter),
    className: className,
    data: conversations,
    "data-sign": "conversationList",
    virtuosoActions: virtuosoActionsRef,
    scrollerRef: scrollerRef
    // null is not a valid type for restoreStateFrom, if lastPosition is null, it should use undefined
    ,
    restoreStateFrom: lastPosition || undefined
  }, function (index, conversation) {
    return /*#__PURE__*/_react["default"].createElement(_ConversationsListItem.ConversationsListItem, {
      key: conversation.conversationId,
      conversation: conversation,
      index: index,
      useActionsHandler: useActionsHandler,
      useConversationItemInfo: useConversationItemInfo,
      useItemRender: useItemRender,
      showLogPopover: showLogPopover,
      typeFilter: typeFilter,
      createNewEntityTooltip: createNewEntityTooltip
    });
  });
};
//# sourceMappingURL=ConversationsList.js.map
