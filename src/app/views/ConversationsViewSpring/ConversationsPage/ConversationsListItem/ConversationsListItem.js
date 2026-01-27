"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationsListItem = void 0;
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _useThreadInfoDisplay2 = require("../../../MessageThreadsView/useThreadInfoDisplay");
var _useConversationActionButtons = require("../../useConversationActionButtons");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _ConversationsListItem = function _ConversationsListItem(_ref) {
  var typeFilter = _ref.typeFilter,
    conversation = _ref.conversation,
    index = _ref.index,
    useConversationItemInfo = _ref.useConversationItemInfo,
    useActionsHandler = _ref.useActionsHandler,
    useItemRender = _ref.useItemRender,
    showLogPopover = _ref.showLogPopover,
    createNewEntityTooltip = _ref.createNewEntityTooltip;
  var _useConversationItemI = useConversationItemInfo(conversation),
    info = _useConversationItemI.info,
    actions = _useConversationItemI.actions,
    extensionId = _useConversationItemI.extensionId,
    threadInfo = _useConversationItemI.threadInfo;
  var onAction = useActionsHandler(conversation, info, typeFilter === 'Text' ? 'Text list' : typeFilter === 'Fax' ? 'Fax list' : 'Voicemail list');
  useItemRender === null || useItemRender === void 0 ? void 0 : useItemRender(conversation, index);
  var DisplayName = info.DisplayName,
    displayType = info.displayType,
    Avatar = info.Avatar,
    Unread = info.Unread,
    unreadCounts = info.unreadCounts,
    displayDescription = info.displayDescription,
    isFax = info.isFax,
    creationTime = info.creationTime,
    logged = info.logged;
  var _useThreadInfoDisplay = (0, _useThreadInfoDisplay2.useThreadInfoDisplay)({
      info: threadInfo,
      extensionId: extensionId,
      onAction: onAction
    }),
    ThreadStatus = _useThreadInfoDisplay.ThreadStatus,
    queueName = _useThreadInfoDisplay.queueName;
  var buttons = (0, _useConversationActionButtons.useConversationActionButtons)({
    actions: actions,
    conversation: conversation,
    showLogPopover: showLogPopover,
    onAction: onAction,
    createNewEntityTooltip: createNewEntityTooltip
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.ListItem, {
    key: conversation.conversationId,
    "data-sign": "conversationItem",
    size: "auto",
    className: "group",
    clickable: !isFax,
    classes: {
      content: 'bg-inherit !px-3 !py-2' // need ! because its not overriding SpringUI styles without it
    },
    onClick: function onClick() {
      onAction('viewDetail');
    }
  }, /*#__PURE__*/_react["default"].createElement(Unread, {
    className: "mr-1 -ml-3",
    "data-sign": "unread-conversationItem"
  }), /*#__PURE__*/_react["default"].createElement(Avatar, null), /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
    primary: /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx["default"])('flex items-center gap-1 truncate', {
        'font-bold': unreadCounts > 0
      }),
      "data-sign": "currentName",
      "data-display-type": displayType
    }, /*#__PURE__*/_react["default"].createElement(DisplayName, {
      displayControl: {
        maybe: true,
        matchCounts: true
      }
    })),
    secondary: queueName ? /*#__PURE__*/_react["default"].createElement("div", null, displayDescription, queueName) : displayDescription
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-right min-h-11"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/_react["default"].createElement(Unread, {
    type: "standard",
    color: "secondary",
    size: "small"
  }), /*#__PURE__*/_react["default"].createElement(ThreadStatus, null), /*#__PURE__*/_react["default"].createElement("span", {
    className: "typography-descriptor text-neutral-b2",
    "data-sign": "conversationItemTime"
  }, creationTime)), logged), buttons));
};
var ConversationsListItem = exports.ConversationsListItem = /*#__PURE__*/(0, _react.memo)(_ConversationsListItem);
//# sourceMappingURL=ConversationsListItem.js.map
