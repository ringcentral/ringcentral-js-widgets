"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactAvatar = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _libs = require("./libs");
var _useAvatarColorToken = require("./useAvatarColorToken");
var _useContactAvatar = require("./useContactAvatar");
var _excluded = ["contact", "contactName", "textAvatarColor", "phoneNumber", "variant", "dataRef", "size", "url", "showPresence", "isDepartment"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// TODO: mini profile still not in this stage, so still not enable
// & Pick<MiniProfilePopperProps, 'preventMouseHoverEvents'> &
//    &
//   Pick<MiniProfilePopperProps, 'onOpen'>;

var ContactAvatar = exports.ContactAvatar = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var contact = props.contact,
    contactName = props.contactName,
    textAvatarColor = props.textAvatarColor,
    phoneNumber = props.phoneNumber,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'circle' : _props$variant,
    dataRef = props.dataRef,
    _props$size = props.size,
    size = _props$size === void 0 ? 'large' : _props$size,
    url = props.url,
    showPresenceProp = props.showPresence,
    isDepartment = props.isDepartment,
    rest = _objectWithoutProperties(props, _excluded);
  var showPresence = showPresenceProp &&
  // only company type contact can show presence
  (contact === null || contact === void 0 ? void 0 : contact.type) === 'company';
  var showPresenceRef = (0, _react.useRef)(showPresence);
  if (process.env.NODE_ENV !== 'production') {
    if (showPresence !== showPresenceRef.current) {
      // eslint-disable-next-line no-console
      console.warn('showPresence is static value, not able to change after initial, please ensure that value only use once in the component lifetime when initial');
    }
  }
  var contactId = contact === null || contact === void 0 ? void 0 : contact.id;
  var contractUrl = (0, _useContactAvatar.useContactAvatar)(contact,
  // in spring-ui largest avatar size is 64x64, use small is enough 90x90
  'xsmall') || url;
  var presenceProps = function () {
    // because the showPresenceRef.current is static value, so we can use it in condition
    if (showPresenceRef.current) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      var contacts = (0, _nextCore.useContainer)('Contacts');
      var presence = contacts.usePresence(contact);
      var presenceStatus = presence || 'unavailable';
      var _presenceProps = presence ? _defineProperty(_defineProperty(_defineProperty({
        variant: presenceStatus
      }, 'data-presence-server-status', presence), 'data-presence-status', presenceStatus), 'data-sign', 'presenceIndicator') : undefined;
      return _presenceProps;
    }
    return undefined;
  }();
  var colorId = (0, _react.useMemo)(function () {
    return (0, _libs.jRcContactAvatarColorId)(contactId, phoneNumber);
  }, [contactId, phoneNumber]);
  var avatarColor = (0, _useAvatarColorToken.useAvatarColorToken)(colorId);
  var shortName = (0, _react.useMemo)(function () {
    return contactName && (0, _libs.getAvatarLetter)(contactName);
  }, [contactName]);
  var avatarProps = (0, _react.useMemo)(function () {
    var _avatarProps$rootProp, _avatarProps$classes;
    var avatarProps = _objectSpread({
      src: contractUrl,
      size: size,
      IndicatorProps: presenceProps,
      showStatusIndicator: presenceProps && showPresence
    }, rest);
    (_avatarProps$rootProp = avatarProps.rootProps) !== null && _avatarProps$rootProp !== void 0 ? _avatarProps$rootProp : avatarProps.rootProps = {};
    avatarProps.rootProps['data-sign'] = 'contactAvatar';
    (_avatarProps$classes = avatarProps.classes) !== null && _avatarProps$classes !== void 0 ? _avatarProps$classes : avatarProps.classes = {};
    if (contractUrl) {
      avatarProps.imgProps = {
        loading: 'lazy'
      };
      avatarProps['data-sign'] = 'contactAvatarImg';
      avatarProps['onErrorCapture'] = function (err) {
        // eslint-disable-next-line no-console
        console.warn('avatar onErrorCapture error?', err);
      };
      return avatarProps;
    }
    if (contactName) {
      avatarProps['data-sign'] = 'contactAvatarText';
      avatarProps['data-color-id'] = colorId;
      var bgColor = textAvatarColor || avatarColor;
      if (variant === 'circle') {
        avatarProps.classes.content = (0, _clsx["default"])(avatarProps.classes.content, bgColor, bgColor ? 'text-neutral-static-w0' : undefined);
      } else {
        avatarProps.classes.shape = (0, _clsx["default"])(avatarProps.classes.shape, bgColor ? // that color able to use is because the tailwind static scan be scan in  apps/micro-contacts/src/app/components/ContactAvatar/useAvatarColorToken.ts
        "sui-squircle-bg-color-".concat(bgColor.replace('bg-', '')) : undefined, bgColor ? 'text-neutral-static-w0' : undefined);
      }
      avatarProps.children = shortName;
      return avatarProps;
    }

    // if isDepartment is true and custom avatar or contactName not set, use callQueue default department avatar
    if (isDepartment) {
      return _objectSpread(_objectSpread({
        symbol: _springIcon.CallQueueMd
      }, avatarProps), {}, {
        'data-sign': 'contactAvatarDepartmentDefault'
      });
    }
    return _objectSpread(_objectSpread({
      symbol: _springIcon.ProfileMd
    }, avatarProps), {}, {
      'data-sign': 'contactAvatarDefault'
    });
  }, [contractUrl, size, presenceProps, showPresence, rest, contactName, isDepartment, colorId, textAvatarColor, avatarColor, variant, shortName]);
  (0, _react.useImperativeHandle)(dataRef, function () {
    return avatarProps;
  });
  return /*#__PURE__*/_react["default"].createElement(_springUi.Avatar, _extends({
    variant: variant,
    ref: ref,
    "aria-label": "contact avatar"
  }, avatarProps));

  // TODO: clickable still not enable in any project
  // return clickable ? (
  //   <MiniProfileAvatar
  //     ref={ref as any}
  //     {...avatarProps}
  //     contactId={contactId}
  //     phoneNumber={phoneNumber}
  //     contactName={contactName}
  //     aria-label="Contact avatar clickable"
  //     preventMouseHoverEvents={preventMouseHoverEvents}
  //     trackFullProfileFn={trackFullProfileFn}
  //     trackMiniProfileFn={trackMiniProfileFn}
  //     trackProfileLocation={trackProfileLocation}
  //     contactSource={contactSource}
  //   />
  // ) : (
  //   <Avatar ref={ref as any} aria-label="contact avatar" {...avatarProps} />
  // );
});
ContactAvatar.displayName = 'ContactAvatar';
//# sourceMappingURL=ContactAvatar.js.map
