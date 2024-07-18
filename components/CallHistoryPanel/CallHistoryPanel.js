"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.string.includes");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryPanel = void 0;
var _juno = require("@ringcentral/juno");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _react = _interopRequireWildcard(require("react"));
var _CallHistoryItem = require("./CallHistoryItem");
var _StickyVirtualizedList = require("./StickyVirtualizedList");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  border-top: 1px solid ", ";\n  background-color: ", ";\n  height: 100%;\n  box-sizing: border-box;\n  overflow: hidden;\n  position: relative;\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n\n  color: ", ";\n  text-align: center;\n  display: block;\n  height: ", "px;\n  line-height: ", "px;\n  background: ", ";\n  box-sizing: border-box;\n  border-bottom: 1px solid ", ";\n  position: sticky;\n  top: 0;\n  z-index: 2 !important;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var DATE_ITEM_HEIGHT = 32;
var CALL_ITEM_HEIGHT = 64; // ./CallHistoryItem/styles.scss .item

var ROOT_NODE = {
  id: 'root',
  height: DATE_ITEM_HEIGHT,
  isSticky: true
};
function formatCallDate(timestamp) {
  var now = (0, _dayjs["default"])();
  var today = now.clone().startOf('day');
  var yesterday = now.clone().subtract(1, 'days').startOf('day');
  var mTimestamp = (0, _dayjs["default"])(timestamp);
  if (mTimestamp.isSame(today, 'd')) {
    return 'today';
  }
  if (mTimestamp.isSame(yesterday, 'd')) {
    return 'yesterday';
  }
  return mTimestamp.format('MM/DD/YYYY');
}
function formatCallTime(timestamp) {
  return (0, _dayjs["default"])(timestamp).format('h:mm A');
}
var DateText = _juno.styled.div(_templateObject(), (0, _juno.typography)('caption1'), (0, _juno.palette2)('neutral', 'f06'), DATE_ITEM_HEIGHT, DATE_ITEM_HEIGHT, (0, _juno.palette2)('neutral', 'b01'), (0, _juno.palette2)('neutral', 'l02'));
var StyledCallHistoryPanel = _juno.styled.div(_templateObject2(), (0, _juno.palette2)('neutral', 'l02'), (0, _juno.palette2)('neutral', 'b01'));
var CallHistoryPanel = function CallHistoryPanel(_ref) {
  var _ref$calls = _ref.calls,
    calls = _ref$calls === void 0 ? [] : _ref$calls,
    currentLocale = _ref.currentLocale,
    _ref$getActionMenu = _ref.getActionMenu,
    getActionMenu = _ref$getActionMenu === void 0 ? function () {
      return [];
    } : _ref$getActionMenu,
    _ref$isWide = _ref.isWide,
    isWide = _ref$isWide === void 0 ? true : _ref$isWide,
    _ref$listScrollTop = _ref.listScrollTop,
    listScrollTop = _ref$listScrollTop === void 0 ? 0 : _ref$listScrollTop,
    _ref$changeListScroll = _ref.changeListScrollTop,
    changeListScrollTop = _ref$changeListScroll === void 0 ? function () {} : _ref$changeListScroll;
  var listRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var _listRef$current;
    // @ts-expect-error TS(2339): Property 'setScrollTop' does not exist on type 'ne... Remove this comment to see the full error message
    (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.setScrollTop(listScrollTop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var tree = (0, _react.useMemo)(function () {
    var _tree = {
      root: {
        name: 'root',
        depth: 0,
        children: []
      }
    };
    calls.forEach(function (call) {
      var id = call.id,
        startTime = call.startTime; // @ts-expect-error TS(2345): Argument of type 'number | undefined' is not assig... Remove this comment to see the full error message
      var callDate = formatCallDate(startTime);
      // @ts-expect-error TS(2345): Argument of type 'number | undefined' is not assig... Remove this comment to see the full error message
      var callTime = formatCallTime(startTime);
      var callWithFormattedDate = _objectSpread(_objectSpread({}, call), {}, {
        callDate: callDate,
        callTime: callTime
      });

      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (!_tree.root.children.includes(callDate)) {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        _tree.root.children.push(callDate);
      }
      if (!Object.keys(_tree).includes(callDate)) {
        _tree[callDate] = {
          name: callDate,
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          children: [id],
          depth: 1
        };
      } else {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        _tree[callDate].children.push(id);
      }

      // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
      _tree[id] = {
        name: id,
        depth: 2,
        call: callWithFormattedDate
      };
    });
    return _tree;
  }, [calls]);
  var getChildren = (0, _react.useCallback)(function (id) {
    var node = tree[id];
    if (node.children) {
      return node.children.map(function (childId) {
        var childNode = tree[childId];
        var height = CALL_ITEM_HEIGHT;
        if (childNode.depth === 1) {
          height = DATE_ITEM_HEIGHT;
        }
        return {
          id: childId,
          height: height,
          isSticky: childNode.depth === 1
        };
      });
    }
  }, [tree]);
  var rowRenderer = (0, _react.useCallback)(function (_ref2) {
    var id = _ref2.id,
      style = _ref2.style;
    var node = tree[id];
    if (node.children) {
      return /*#__PURE__*/_react["default"].createElement(DateText, {
        "data-sign": "dateText",
        style: style,
        key: node.name
      }, _i18n["default"].getString(node.name, currentLocale));
    }
    return (
      /*#__PURE__*/
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      _react["default"].createElement("div", {
        "data-sign": "historyItem",
        style: style,
        key: node.call.id
      }, /*#__PURE__*/_react["default"].createElement(_CallHistoryItem.CallHistoryItem
      // @ts-expect-error TS(2322): Type 'CallLog | undefined' is not assignable to ty... Remove this comment to see the full error message
      , {
        call: node.call
        // @ts-expect-error TS(2345): Argument of type 'CallLog | undefined' is not assi... Remove this comment to see the full error message
        ,
        actionMenu: getActionMenu(node.call),
        isWide: isWide
      }))
    );
  }, [tree, getActionMenu, isWide, currentLocale]);
  return /*#__PURE__*/_react["default"].createElement(StyledCallHistoryPanel, null, tree.root.children.length ? /*#__PURE__*/_react["default"].createElement(_StickyVirtualizedList.StickyVirtualizedList, {
    overscanRowCount: 20,
    root: ROOT_NODE
    // @ts-expect-error TS(2322): Type '(id: string) => { id: string; height: number... Remove this comment to see the full error message
    ,
    getChildren: getChildren,
    rowRenderer: rowRenderer,
    defaultRowHeight: 64,
    width: window.innerWidth,
    height: window.innerHeight,
    onScroll: function onScroll(_ref3) {
      var scrollTop = _ref3.scrollTop;
      changeListScrollTop(scrollTop);
    },
    ref: listRef
  }) : /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].empty
  }, _i18n["default"].getString('empty', currentLocale)));
};
exports.CallHistoryPanel = CallHistoryPanel;
//# sourceMappingURL=CallHistoryPanel.js.map
