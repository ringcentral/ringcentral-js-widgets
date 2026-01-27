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
exports.MessageThreadPage = void 0;
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("../../ConversationsViewSpring/ConversationsPage/i18n");
var _Filter = require("./Filter");
var _MessageThreadList = require("./MessageThreadList");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var MessageThreadPage = exports.MessageThreadPage = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var form = _ref.form,
    threadConversations = _ref.threadConversations,
    lastPosition = _ref.lastPosition,
    loading = _ref.loading,
    showLogPopover = _ref.showLogPopover,
    createNewEntityTooltip = _ref.createNewEntityTooltip,
    onSharedSearchFormUpdate = _ref.onSharedSearchFormUpdate,
    setLastPosition = _ref.setLastPosition,
    useConversationItemInfo = _ref.useConversationItemInfo,
    useActionsHandler = _ref.useActionsHandler,
    useItemRender = _ref.useItemRender,
    onEndReached = _ref.onEndReached,
    callQueues = _ref.callQueues,
    assignmentOptions = _ref.assignmentOptions;
  var searchMode = form.searchInput.length > 0;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "MessageThreadPage",
    className: "flex flex-col h-full"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    className: "flex flex-col flex-auto overflow-hidden h-full"
  }, /*#__PURE__*/_react["default"].createElement(_Filter.Filter, {
    form: form,
    onSharedSearchFormUpdate: onSharedSearchFormUpdate,
    callQueues: callQueues,
    assignmentOptions: assignmentOptions
  }), /*#__PURE__*/_react["default"].createElement(_MessageThreadList.MessageThreadList, {
    threadConversations: threadConversations,
    className: "flex-auto overflow-auto",
    lastPosition: lastPosition,
    loading: loading,
    setLastPosition: setLastPosition,
    useConversationItemInfo: useConversationItemInfo,
    useActionsHandler: useActionsHandler,
    useItemRender: useItemRender,
    showLogPopover: showLogPopover,
    createNewEntityTooltip: createNewEntityTooltip,
    notFoundMessage: searchMode ? (0, _i18n.t)('noSearchResults') : (0, _i18n.t)('noText'),
    onEndReached: onEndReached
  })));
});
MessageThreadPage.displayName = 'MessageThreadPage';
//# sourceMappingURL=MessageThreadPage.js.map
