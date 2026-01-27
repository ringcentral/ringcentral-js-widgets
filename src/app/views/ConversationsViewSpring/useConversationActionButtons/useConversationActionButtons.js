"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useConversationActionButtons = void 0;
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
var _components = require("@ringcentral-integration/next-widgets/components");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _ConversationLogPopover = require("./ConversationLogPopover");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var useConversationActionButtons = exports.useConversationActionButtons = function useConversationActionButtons(_ref) {
  var displayCount = _ref.displayCount,
    actions = _ref.actions,
    conversation = _ref.conversation,
    showLogPopover = _ref.showLogPopover,
    onAction = _ref.onAction,
    createNewEntityTooltip = _ref.createNewEntityTooltip,
    variant = _ref.variant,
    moreButtonProps = _ref.moreButtonProps;
  var loggedEntities = conversation.conversationMatches;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    logPopperOpened = _useState2[0],
    setLogPopperOpened = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    keepActions = _useState4[0],
    setKeepActions = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    anchor = _useState6[0],
    setMenuAnchor = _useState6[1];
  var logRef = (0, _react.useRef)(null);
  var buttons = (0, _components.useHistoryActionButtons)(actions, function (actionType, event) {
    if ((actionType === 'createLog' || actionType === 'selectRecordsForAutoLog') && showLogPopover) {
      setLogPopperOpened(true);
      return;
    }
    if (actionType === 'viewLog') {
      if ((loggedEntities === null || loggedEntities === void 0 ? void 0 : loggedEntities.length) === 1) {
        onAction('viewLog', loggedEntities[0]);
        return;
      } else {
        setMenuAnchor(event === null || event === void 0 ? void 0 : event.currentTarget);
        setKeepActions(true);
      }
      return;
    }
    onAction(actionType);
  });
  var viewCRMLogMenu = (0, _react.useMemo)(function () {
    if ((loggedEntities === null || loggedEntities === void 0 ? void 0 : loggedEntities.length) <= 1) {
      return null;
    }
    var menuList = loggedEntities.map(function (_ref2) {
      var id = _ref2.id,
        name = _ref2.name,
        url = _ref2.url;
      return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
        title: name,
        key: id,
        "data-sign": id,
        onClick: function onClick(e) {
          onAction('viewLog', {
            id: id,
            name: name,
            url: url
          });
          e.stopPropagation();
        }
      }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, {
        className: "truncate"
      }, name));
    });
    return /*#__PURE__*/_react["default"].createElement(_springUi.Menu, {
      open: !!anchor,
      anchorEl: anchor,
      onClose: function onClose() {
        setMenuAnchor(null);
      },
      onClick: function onClick(e) {
        e.stopPropagation();
      },
      onExitComplete: function onExitComplete() {
        setKeepActions(false);
      },
      "data-sign": "viewCRMLogMenu"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuList, null, menuList));
  }, [anchor, loggedEntities, onAction]);
  var renderButtons = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement(_components.ActionMenuList, {
      displayCount: displayCount,
      buttons: buttons,
      variant: variant,
      propsMap: variant === 'plain' ? {
        all: {
          variant: 'icon'
        }
      } : undefined,
      forceActionsOpen: logPopperOpened || keepActions,
      refMap: {
        createLog: logRef,
        viewLog: logRef,
        selectRecordsForAutoLog: logRef
      },
      moreButtonProps: moreButtonProps
    });
  }, [displayCount, buttons, variant, logPopperOpened, keepActions, moreButtonProps]);
  var logPopover = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement(_ConversationLogPopover.ConversationLogPopover, {
      anchorEl: logRef.current,
      opened: logPopperOpened,
      onClose: function onClose() {
        setLogPopperOpened(false);
      },
      conversation: conversation,
      createNewEntityTooltip: createNewEntityTooltip
    });
  }, [conversation, createNewEntityTooltip, logPopperOpened]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, renderButtons, logPopover, viewCRMLogMenu);
};
//# sourceMappingURL=useConversationActionButtons.js.map
