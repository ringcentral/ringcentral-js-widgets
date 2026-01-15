"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownList = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _RecipientOption = require("./RecipientOption");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var DropdownList = exports.DropdownList = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var currentLocale = _ref.currentLocale,
    className = _ref.className,
    recipientOptions = _ref.recipientOptions,
    selectedIndex = _ref.selectedIndex,
    formatContactPhone = _ref.formatContactPhone,
    setSelectedIndex = _ref.setSelectedIndex,
    addToRecipients = _ref.addToRecipients,
    enableTitle = _ref.enableTitle,
    visibility = _ref.visibility,
    phoneTypeRenderer = _ref.phoneTypeRenderer,
    phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
    recipientInfoRenderer = _ref.recipientInfoRenderer,
    recipientPhoneRenderer = _ref.recipientPhoneRenderer;
  var listEl = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      scrollUp: function scrollUp() {
        if (listEl.current) {
          // @ts-expect-error TS(2339): Property 'scrollTop' does not exist on type 'never... Remove this comment to see the full error message
          listEl.current.scrollTop = Math.floor(
          // @ts-expect-error TS(2339): Property 'scrollTop' does not exist on type 'never... Remove this comment to see the full error message
          Math.max(listEl.current.scrollTop - 53, 0));
        }
      },
      scrollDown: function scrollDown() {
        if (listEl.current) {
          // @ts-expect-error TS(2339): Property 'scrollTop' does not exist on type 'never... Remove this comment to see the full error message
          listEl.current.scrollTop = Math.floor(Math.min(
          // @ts-expect-error TS(2339): Property 'scrollTop' does not exist on type 'never... Remove this comment to see the full error message
          listEl.current.scrollTop + 53,
          // @ts-expect-error TS(2339): Property 'scrollHeight' does not exist on type 'ne... Remove this comment to see the full error message
          listEl.current.scrollHeight));
        }
      },
      setScrollPosition: function setScrollPosition(scrollTop) {
        if (listEl.current) {
          // @ts-expect-error TS(2339): Property 'scrollTop' does not exist on type 'never... Remove this comment to see the full error message
          listEl.current.scrollTop = Math.floor(scrollTop);
        }
      }
    };
  });
  if (!visibility || recipientOptions.length === 0) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement("ul", {
    className: (0, _clsx["default"])(_styles["default"].dropdownList, className),
    ref: listEl,
    "data-sign": "dropdownList"
  }, recipientOptions.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement(_RecipientOption.RecipientOption, {
      currentLocale: currentLocale,
      active: selectedIndex === index,
      name: item.name,
      entityType: item.entityType,
      phoneType: item.phoneType,
      phoneNumber: item.phoneNumber,
      phoneTypeRenderer: phoneTypeRenderer,
      phoneSourceNameRenderer: phoneSourceNameRenderer,
      formatContactPhone: formatContactPhone,
      onHover: function onHover() {
        return setSelectedIndex(index);
      },
      onClick: function onClick() {
        return addToRecipients(item);
      },
      key: "".concat(index).concat(item.phoneNumber).concat(item.name).concat(item.phoneType),
      enableTitle: enableTitle,
      recipientInfoRenderer: recipientInfoRenderer,
      recipientPhoneRenderer: recipientPhoneRenderer,
      splitter: "|"
    });
  }));
});
DropdownList.displayName = 'DropdownList';
//# sourceMappingURL=DropdownList.js.map
