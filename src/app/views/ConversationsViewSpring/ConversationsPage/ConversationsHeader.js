"use strict";

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
exports.ConversationsHeader = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _messageTypes = require("@ringcentral-integration/commons/enums/messageTypes");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ConversationsHeader = exports.ConversationsHeader = function ConversationsHeader(_ref) {
  var typeFilter = _ref.typeFilter,
    showNewButton = _ref.showNewButton,
    disableLinks = _ref.disableLinks,
    onNewClick = _ref.onNewClick;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var faxMode = typeFilter === _messageTypes.messageTypes.fax;
  var voiceMailMode = typeFilter === _messageTypes.messageTypes.voiceMail;
  var title = (0, _react.useMemo)(function () {
    return _defineProperty(_defineProperty({}, _messageTypes.messageTypes.fax, t('faxTitle')), _messageTypes.messageTypes.text, t('textTitle'))[typeFilter];
  }, [t, typeFilter]);
  return /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
    title: title
  }, !voiceMailMode && showNewButton && onNewClick ? /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    variant: "contained",
    color: "secondary",
    size: "medium",
    symbol: faxMode ? _springIcon.AddFaxMd : _springIcon.NewSmsmd,
    "data-sign": "edit",
    TooltipProps: {
      title: faxMode ? t('composeFax') : t('composeText')
    },
    onClick: function onClick() {
      onNewClick(typeFilter);
    },
    disabled: disableLinks
  }) : null);
};
//# sourceMappingURL=ConversationsHeader.js.map
