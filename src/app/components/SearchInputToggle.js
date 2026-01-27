"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
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
exports.SearchInputToggle = void 0;
require("core-js/modules/web.timers.js");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["expanded", "alwaysExpanded", "onExpandedChange", "searchInput", "onSearchInputChange", "placeholder", "className"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var SearchInputToggle = exports.SearchInputToggle = function SearchInputToggle(_ref) {
  var controlledExpanded = _ref.expanded,
    _ref$alwaysExpanded = _ref.alwaysExpanded,
    alwaysExpanded = _ref$alwaysExpanded === void 0 ? false : _ref$alwaysExpanded,
    onExpandedChange = _ref.onExpandedChange,
    searchInput = _ref.searchInput,
    onSearchInputChange = _ref.onSearchInputChange,
    placeholder = _ref.placeholder,
    className = _ref.className,
    rest = _objectWithoutProperties(_ref, _excluded);
  var searchInputRef = (0, _react.useRef)(null);

  // If always expanded, ignore expansion logic
  var expanded = alwaysExpanded ? true : controlledExpanded !== null && controlledExpanded !== void 0 ? controlledExpanded : false;
  var handleSearchButtonClick = function handleSearchButtonClick() {
    if (!alwaysExpanded) {
      var newExpanded = true;
      onExpandedChange === null || onExpandedChange === void 0 ? void 0 : onExpandedChange(newExpanded);
    }

    // Focus input after state update
    setTimeout(function () {
      var _searchInputRef$curre;
      (_searchInputRef$curre = searchInputRef.current) === null || _searchInputRef$curre === void 0 ? void 0 : _searchInputRef$curre.focus();
    }, 0);
  };
  var handleSearchBlur = function handleSearchBlur(e) {
    var _e$relatedTarget;
    if (((_e$relatedTarget = e.relatedTarget) === null || _e$relatedTarget === void 0 ? void 0 : _e$relatedTarget.getAttribute('data-prevent-blur')) === 'true') {
      return;
    }
    if (!alwaysExpanded && searchInput.length === 0) {
      var newExpanded = false;
      onExpandedChange === null || onExpandedChange === void 0 ? void 0 : onExpandedChange(newExpanded);
    }
  };

  // Update expanded state when searchInput changes externally
  (0, _react.useEffect)(function () {
    if (!alwaysExpanded && searchInput.length > 0 && !expanded) {
      var newExpanded = true;
      onExpandedChange === null || onExpandedChange === void 0 ? void 0 : onExpandedChange(newExpanded);
    }
  }, [searchInput, expanded, alwaysExpanded, onExpandedChange]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: className
  }, expanded ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "overflow-hidden flex-1 min-w-0"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.TextField, {
    inputRef: searchInputRef,
    placeholder: placeholder,
    startAdornment: /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      symbol: _springIcon.SearchMd,
      size: "small"
    }),
    variant: "standard",
    size: "medium",
    RootProps: {
      classes: {
        focusEffect: 'hidden',
        content: 'border-none'
      }
    },
    fullWidth: true,
    value: searchInput,
    inputProps: {
      'data-sign': rest['data-sign']
    },
    onChange: onSearchInputChange,
    onBlur: handleSearchBlur
  })) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "h-8 -ml-1 flex items-center"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    variant: "icon",
    size: "small",
    color: "secondary",
    onClick: handleSearchButtonClick,
    "data-sign": "".concat(rest['data-sign'], "-button"),
    TooltipProps: {
      title: placeholder
    }
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    symbol: _springIcon.SearchMd,
    size: "small"
  }))));
};
//# sourceMappingURL=SearchInputToggle.js.map
