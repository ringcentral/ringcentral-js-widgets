"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
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
exports.FeedbackPanel = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var FeedbackPanel = exports.FeedbackPanel = function FeedbackPanel(_ref) {
  var brandName = _ref.brandName,
    onBackClick = _ref.onBackClick,
    onRevertClick = _ref.onRevertClick,
    emailProp = _ref.email,
    topicProp = _ref.topic,
    subjectProp = _ref.subject,
    descriptionProp = _ref.description,
    onEmailChangeProp = _ref.onEmailChange,
    onTopicChangeProp = _ref.onTopicChange,
    onSubjectChangeProp = _ref.onSubjectChange,
    onDescriptionChangeProp = _ref.onDescriptionChange,
    sendFeedback = _ref.sendFeedback;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useAsyncState = (0, _reactHooks.useAsyncState)(emailProp, onEmailChangeProp),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    email = _useAsyncState2[0],
    setEmail = _useAsyncState2[1];
  var _useAsyncState3 = (0, _reactHooks.useAsyncState)(topicProp, onTopicChangeProp),
    _useAsyncState4 = _slicedToArray(_useAsyncState3, 2),
    topic = _useAsyncState4[0],
    setTopic = _useAsyncState4[1];
  var _useAsyncState5 = (0, _reactHooks.useAsyncState)(subjectProp, onSubjectChangeProp),
    _useAsyncState6 = _slicedToArray(_useAsyncState5, 2),
    subject = _useAsyncState6[0],
    setSubject = _useAsyncState6[1];
  var _useAsyncState7 = (0, _reactHooks.useAsyncState)(descriptionProp, onDescriptionChangeProp),
    _useAsyncState8 = _slicedToArray(_useAsyncState7, 2),
    description = _useAsyncState8[0],
    setDescription = _useAsyncState8[1];
  var topicOptions = (0, _react.useMemo)(function () {
    return [t('bugReport'), t('featureRequest'), t('others')];
  }, [t]);
  var selectedTopicIndex = (0, _react.useMemo)(function () {
    return topicOptions.findIndex(function (t) {
      return t === topic;
    });
  }, [topic, topicOptions]);
  var handleSendClick = function handleSendClick() {
    var SERVICE_MAIL = 'integration.service@ringcentral.com';
    var FEEDBACK_SUBJECT = 'Google User Feedback';
    var content = "Hi Integration Team,\n\n" + "You've got feedback from customer on ".concat(brandName, " for Google extension. This customer could be contacted via email ").concat(email, "\n\n") + "Customer Feedback Topic\n".concat(topic, "\n\n") + "Subject\n".concat(subject, "\n\n") + "Description\n".concat(description, "\n\n") + "Regards,\n".concat(brandName, " for Google Extension");
    var mailToUrl = "mailto:".concat(SERVICE_MAIL, "?subject=").concat(window.encodeURIComponent(FEEDBACK_SUBJECT), "&body=").concat(window.encodeURIComponent(content));
    sendFeedback(mailToUrl);
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
    override: true
  }, /*#__PURE__*/_react["default"].createElement(_components2.PageHeader, {
    onBackClick: onBackClick,
    endAdornment: /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
      symbol: _springIcon.RefreshMd,
      color: "secondary",
      variant: "icon",
      size: "small",
      onClick: onRevertClick,
      TooltipProps: {
        title: t('revert')
      }
    })
  }, t('feedbackHeader'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-auto overflow-y-auto overflow-x-hidden px-4 py-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "py-2 typography-subtitle"
  }, /*#__PURE__*/_react["default"].createElement("div", null, t('instruction')), /*#__PURE__*/_react["default"].createElement("div", null, t('fillForm'), /*#__PURE__*/_react["default"].createElement("i", null, t('send')), t('useMailBox'), /*#__PURE__*/_react["default"].createElement("i", null, "integration.service@ringcentral.com."))), /*#__PURE__*/_react["default"].createElement(_springUi.TextField, {
    label: t('email'),
    helperText: t('reply'),
    fullWidth: true,
    size: "medium",
    variant: "outlined",
    placeholder: t('emailPlaceHolder'),
    value: email,
    onChange: function onChange(e) {
      setEmail(e.currentTarget.value);
    },
    inputProps: {
      maxLength: 60
    }
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Select, {
    label: t('feedbackTopic'),
    value: selectedTopicIndex,
    placeholder: t('topicPlaceHolder'),
    renderValue: function renderValue(idx) {
      return topicOptions[idx];
    },
    size: "medium",
    variant: "outlined",
    onChange: function onChange(e) {
      setTopic(e.target.value);
    }
  }, topicOptions.map(function (option, index) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
      key: index,
      value: option
    }, option);
  })), /*#__PURE__*/_react["default"].createElement(_springUi.TextField, {
    label: t('subject'),
    fullWidth: true,
    size: "medium",
    variant: "outlined",
    placeholder: t('subjectPlaceHolder'),
    value: subject,
    inputProps: {
      maxLength: 60
    },
    onChange: function onChange(e) {
      setSubject(e.currentTarget.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Textarea, {
    label: t('description'),
    fullWidth: true,
    variant: "outlined",
    minRows: 4,
    placeholder: t('descriptionPlaceHolder'),
    value: description,
    inputProps: {
      maxLength: 1200
    },
    onChange: function onChange(e) {
      setDescription(e.currentTarget.value);
    }
  })), /*#__PURE__*/_react["default"].createElement(_components.AppFooterNav
  // -16px for the bottom have padding 16px
  , {
    additionalHeight: -16
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-4"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    fullWidth: true,
    onClick: handleSendClick,
    color: "primary"
  }, t('send')))));
};
//# sourceMappingURL=FeedbackPanel.js.map
