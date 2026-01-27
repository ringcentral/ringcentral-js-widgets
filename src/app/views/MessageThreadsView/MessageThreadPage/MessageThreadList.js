"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageThreadList = void 0;
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _no_text = _interopRequireDefault(require("@ringcentral-integration/next-core/assets/no_text.svg"));
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _ConversationsListItem = require("../../ConversationsViewSpring/ConversationsPage/ConversationsListItem");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Footer = function Footer() {
  return /*#__PURE__*/_react["default"].createElement(_springUi.SkeletonContainer, null, Array.from({
    length: 5
  }).map(function (_, i) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: i
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "px-4"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex gap-3 items-center py-3"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
      variant: "circular",
      className: "size-9"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex flex-col flex-1"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
      variant: "text",
      className: "w-3/4 typography-subtitle"
    }), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
      variant: "text",
      className: "w-1/2 typography-descriptor"
    }))), /*#__PURE__*/_react["default"].createElement(_springUi.Divider, null)));
  }));
};
var MessageThreadList = exports.MessageThreadList = function MessageThreadList(_ref) {
  var threadConversations = _ref.threadConversations,
    className = _ref.className,
    lastPosition = _ref.lastPosition,
    loading = _ref.loading,
    setLastPosition = _ref.setLastPosition,
    useConversationItemInfo = _ref.useConversationItemInfo,
    useActionsHandler = _ref.useActionsHandler,
    useItemRender = _ref.useItemRender,
    showLogPopover = _ref.showLogPopover,
    createNewEntityTooltip = _ref.createNewEntityTooltip,
    notFoundMessage = _ref.notFoundMessage,
    onEndReached = _ref.onEndReached;
  var _useVirtuosoScrollPos = (0, _reactHooks.useVirtuosoScrollPosition)(function (snapshot) {
      return setLastPosition('shared', snapshot);
    }),
    virtuosoActionsRef = _useVirtuosoScrollPos.virtuosoActionsRef,
    scrollerRef = _useVirtuosoScrollPos.scrollerRef;
  if (threadConversations.length === 0 && !loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-auto flex justify-center items-center overflow-y-auto overflow-x-hidden"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-col flex justify-center items-center gpa-4"
    }, notFoundMessage ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_no_text["default"], null), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-center text-14 text-gray-500 mt-4"
    }, notFoundMessage)) : /*#__PURE__*/_react["default"].createElement(_no_text["default"], null)));
  }
  var components = loading ? {
    Footer: Footer
  } : undefined;
  return /*#__PURE__*/_react["default"].createElement(_springUi.VirtualizedList, {
    key: "shared",
    className: className,
    data: threadConversations,
    "data-sign": "sharedMessageThreadList",
    virtuosoActions: virtuosoActionsRef,
    scrollerRef: scrollerRef,
    restoreStateFrom: lastPosition || undefined,
    increaseViewportBy: 200,
    endReached: onEndReached,
    components: components
  }, function (index, conversation) {
    return /*#__PURE__*/_react["default"].createElement(_ConversationsListItem.ConversationsListItem, {
      key: conversation.conversationId,
      conversation: conversation,
      index: index,
      useActionsHandler: useActionsHandler,
      useConversationItemInfo: useConversationItemInfo,
      useItemRender: useItemRender,
      showLogPopover: showLogPopover,
      typeFilter: "Text",
      createNewEntityTooltip: createNewEntityTooltip
    });
  });
};
//# sourceMappingURL=MessageThreadList.js.map
