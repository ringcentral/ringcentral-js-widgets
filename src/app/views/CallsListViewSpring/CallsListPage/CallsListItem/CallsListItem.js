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
exports.CallsListItem = void 0;
var _components = require("@ringcentral-integration/next-widgets/components");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var _CallsListItem = function _CallsListItem(_ref) {
  var call = _ref.call,
    index = _ref.index,
    useCallHistoryItemInfo = _ref.useCallHistoryItemInfo,
    useActionsHandler = _ref.useActionsHandler,
    useItemRender = _ref.useItemRender;
  var _useCallHistoryItemIn = useCallHistoryItemInfo(call, {
      // TODO: support select contact
      selectIndex: 0,
      variant: 'list'
    }),
    info = _useCallHistoryItemIn.info,
    actions = _useCallHistoryItemIn.actions;
  var onAction = useActionsHandler(call, info, 'Call history list');
  useItemRender === null || useItemRender === void 0 ? void 0 : useItemRender(call, index);
  var Avatar = info.Avatar,
    DisplayName = info.DisplayName,
    Status = info.Status,
    startTime = info.startTime,
    logged = info.logged,
    answeredByDelegate = info.answeredByDelegate,
    ringingElsewhere = info.ringingElsewhere;
  var buttons = (0, _components.useHistoryActionButtons)(actions, onAction);
  return /*#__PURE__*/_react["default"].createElement(_springUi.ListItem, {
    key: call.id,
    size: "auto",
    className: "group",
    classes: {
      content: 'bg-inherit !px-3 !py-2' // need ! because its not overriding SpringUI styles without it
    },
    onClick: function onClick() {
      return onAction('viewDetail');
    },
    "data-sign": "callsListItem"
  }, /*#__PURE__*/_react["default"].createElement(Avatar, null), /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
    classes: {
      primaryPrimaryText: ringingElsewhere &&
      // when no delegate target, means that call still ringing, show green
      !answeredByDelegate ? 'text-success-f' : undefined
    },
    primary: /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex flex-col items-start gap-0.5 truncate"
    }, /*#__PURE__*/_react["default"].createElement(DisplayName, {
      displayControl: {
        maybe: true,
        matchCounts: true
      }
    })),
    secondary: Status ? /*#__PURE__*/_react["default"].createElement(Status, {
      mode: "icon"
    }) : undefined
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-right min-h-11 max-w-[30%]"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "typography-descriptor text-neutral-b2",
    "data-sign": "callStartTime"
  }, startTime), logged), /*#__PURE__*/_react["default"].createElement(_components.ActionMenuList, {
    buttons: buttons
  }));
};
var CallsListItem = exports.CallsListItem = /*#__PURE__*/(0, _react.memo)(_CallsListItem);
//# sourceMappingURL=CallsListItem.js.map
