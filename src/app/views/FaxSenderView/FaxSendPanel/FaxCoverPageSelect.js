"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
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
exports.FaxCoverPageSelect = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _constant = require("../../../services/Fax/constant");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var getCoverNameById = function getCoverNameById(covers, targetId) {
  var cover = covers === null || covers === void 0 ? void 0 : covers.find(function (_ref) {
    var id = _ref.id;
    return id === targetId;
  });
  return cover ? cover.name : '';
};
var FaxCoverPageSelect = exports.FaxCoverPageSelect = function FaxCoverPageSelect(_ref2) {
  var covers = _ref2.covers,
    _ref2$label = _ref2.label,
    label = _ref2$label === void 0 ? 'Cover page' : _ref2$label,
    selectedCoverId = _ref2.selectedCoverId,
    className = _ref2.className,
    onSelectChange = _ref2.onSelectChange;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useState = (0, _react.useState)(-1),
    _useState2 = _slicedToArray(_useState, 2),
    focusVisibleIdx = _useState2[0],
    setFocusVisibleIdx = _useState2[1];
  var renderValue = (0, _react.useCallback)(function (value) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
      flexFull: true
    }, getCoverNameById(covers, Number(value)));
  }, [covers]);
  return /*#__PURE__*/_react["default"].createElement(_springUi.Select, {
    variant: "outlined",
    className: (0, _clsx["default"])('w-full', className),
    "data-sign": "fax-cover-page-select",
    onChange: function onChange(_ref3) {
      var value = _ref3.target.value;
      var id = Number(value);
      onSelectChange === null || onSelectChange === void 0 ? void 0 : onSelectChange(id);
    },
    label: label,
    value: String(selectedCoverId),
    renderValue: renderValue,
    id: "fax-coverPage",
    size: "medium"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-h-60 overflow-y-auto overflow-x-hidden"
  }, covers === null || covers === void 0 ? void 0 : covers.map(function (cover, idx) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
      "data-sign": "fax-cover-page-select-item",
      value: cover.id,
      key: cover.id,
      onMouseEnter: function onMouseEnter() {
        return setFocusVisibleIdx(idx);
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-full flex justify-between align-middle"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
      className: "leading-6"
    }, cover.id === _constant.FAX_COVER_NONE_VALUE ? t('coverNone') : cover.name), cover.url && /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
      className: focusVisibleIdx === idx ? '' : 'hidden',
      TooltipProps: {
        title: t('preview')
      },
      variant: "icon",
      "data-sign": "fax-cover-page-select-button",
      "data-value": cover.url,
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      onClick: function onClick(event) {
        event.preventDefault();
        event.stopPropagation();
        window.open(cover.url, '_blank');
      },
      size: "small",
      symbol: _springIcon.ShowMd
    })));
  })));
};
//# sourceMappingURL=FaxCoverPageSelect.js.map
