"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallItem = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.parse-int.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _formatDuration = require("@ringcentral-integration/commons/lib/formatDuration");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _parseNumber = require("@ringcentral-integration/commons/lib/parseNumber");
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _reactUse = require("react-use");
var _checkShouldHideContactUser = require("../../lib/checkShouldHideContactUser");
var _checkShouldHidePhoneNumber = require("../../lib/checkShouldHidePhoneNumber");
var _ActionMenu = _interopRequireDefault(require("../ActionMenu"));
var _ContactDisplay = require("../ContactDisplay");
var _CountdownTimer = require("../CountdownTimer");
var _DurationCounter = require("../DurationCounter");
var _CallIcon = require("./CallIcon");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /* eslint-disable jsx-a11y/no-static-element-interactions */ /* eslint-disable jsx-a11y/click-events-have-key-events */
var CallItem = exports.CallItem = function CallItem(_ref) {
  var _getSelectedContact$t, _getSelectedContact, _call$delegate;
  var _ref$currentSiteCode = _ref.currentSiteCode,
    currentSiteCode = _ref$currentSiteCode === void 0 ? '' : _ref$currentSiteCode,
    _ref$isMultipleSiteEn = _ref.isMultipleSiteEnabled,
    isMultipleSiteEnabled = _ref$isMultipleSiteEn === void 0 ? false : _ref$isMultipleSiteEn,
    _ref$extended = _ref.extended,
    extendedProp = _ref$extended === void 0 ? false : _ref$extended,
    _ref$isLoggedContact = _ref.isLoggedContact,
    isLoggedContact = _ref$isLoggedContact === void 0 ? function () {
      return false;
    } : _ref$isLoggedContact,
    _ref$isLogging = _ref.isLogging,
    isLoggingProp = _ref$isLogging === void 0 ? false : _ref$isLogging,
    _ref$disableClickToDi = _ref.disableClickToDial,
    disableClickToDial = _ref$disableClickToDi === void 0 ? false : _ref$disableClickToDi,
    _ref$outboundSmsPermi = _ref.outboundSmsPermission,
    outboundSmsPermission = _ref$outboundSmsPermi === void 0 ? false : _ref$outboundSmsPermi,
    _ref$internalSmsPermi = _ref.internalSmsPermission,
    internalSmsPermission = _ref$internalSmsPermi === void 0 ? false : _ref$internalSmsPermi,
    _ref$disableLinks = _ref.disableLinks,
    disableLinks = _ref$disableLinks === void 0 ? false : _ref$disableLinks,
    _ref$disableCallButto = _ref.disableCallButton,
    disableCallButton = _ref$disableCallButto === void 0 ? false : _ref$disableCallButto,
    _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
    showContactDisplayPlaceholder = _ref$showContactDispl === void 0 ? true : _ref$showContactDispl,
    _ref$showCallerIdName = _ref.showCallerIdName,
    showCallerIdName = _ref$showCallerIdName === void 0 ? false : _ref$showCallerIdName,
    _ref$autoLog = _ref.autoLog,
    autoLog = _ref$autoLog === void 0 ? false : _ref$autoLog,
    _ref$readTextPermissi = _ref.readTextPermission,
    readTextPermission = _ref$readTextPermissi === void 0 ? true : _ref$readTextPermissi,
    _ref$withAnimation = _ref.withAnimation,
    withAnimation = _ref$withAnimation === void 0 ? true : _ref$withAnimation,
    _ref$showChooseEntity = _ref.showChooseEntityModal,
    showChooseEntityModal = _ref$showChooseEntity === void 0 ? true : _ref$showChooseEntity,
    _ref$enableCDC = _ref.enableCDC,
    enableCDC = _ref$enableCDC === void 0 ? false : _ref$enableCDC,
    _ref$maxExtensionNumb = _ref.maxExtensionNumberLength,
    maxExtensionNumberLength = _ref$maxExtensionNumb === void 0 ? 6 : _ref$maxExtensionNumb,
    _ref$formatPhone = _ref.formatPhone,
    formatPhone = _ref$formatPhone === void 0 ? function (phoneNumber) {
      return phoneNumber;
    } : _ref$formatPhone,
    onSizeChanged = _ref.onSizeChanged,
    renderIndex = _ref.renderIndex,
    call = _ref.call,
    brand = _ref.brand,
    currentLocale = _ref.currentLocale,
    areaCode = _ref.areaCode,
    countryCode = _ref.countryCode,
    active = _ref.active,
    onViewContact = _ref.onViewContact,
    onCreateContact = _ref.onCreateContact,
    createEntityTypes = _ref.createEntityTypes,
    onLogCall = _ref.onLogCall,
    onClickToDial = _ref.onClickToDial,
    onClickToSms = _ref.onClickToSms,
    dateTimeFormatter = _ref.dateTimeFormatter,
    enableContactFallback = _ref.enableContactFallback,
    sourceIcons = _ref.sourceIcons,
    phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
    renderContactName = _ref.renderContactName,
    renderSubContactName = _ref.renderSubContactName,
    renderExtraButton = _ref.renderExtraButton,
    isSyncingActivityMatcher = _ref.isSyncingActivityMatcher,
    contactDisplayStyle = _ref.contactDisplayStyle,
    externalViewEntityProp = _ref.externalViewEntity,
    externalHasEntity = _ref.externalHasEntity,
    _shouldHideEntityButton = _ref.shouldHideEntityButton,
    currentDelaySavingState = _ref.currentDelaySavingState,
    onItemHeightChanged = _ref.onItemHeightChanged;
  var direction = call.direction,
    telephonyStatus = call.telephonyStatus,
    result = call.result,
    startTime = call.startTime,
    duration = call.duration,
    _call$activityMatches = call.activityMatches,
    activityMatches = _call$activityMatches === void 0 ? [] : _call$activityMatches,
    offset = call.offset,
    type = call.type,
    toName = call.toName;
  var _ref2 = currentDelaySavingState !== null && currentDelaySavingState !== void 0 ? currentDelaySavingState : {},
    delayUpdatingStartTime = _ref2.delayUpdatingStartTime,
    delayUpdatingMinutes = _ref2.delayUpdatingMinutes;
  (0, _react.useEffect)(function () {
    if (onItemHeightChanged) {
      onItemHeightChanged(renderIndex);
    }
  }, [currentDelaySavingState, onItemHeightChanged, renderIndex]);
  var getInitialContactIndex = (0, _juno.useEventCallback)(function () {
    var contactMatches = getContactMatches();
    var activityMatches = call.activityMatches || [];
    var _iterator = _createForOfIteratorHelper(activityMatches),
      _step;
    try {
      var _loop = function _loop() {
          var activity = _step.value;
          var index = contactMatches.findIndex(function (contact) {
            return isLoggedContact === null || isLoggedContact === void 0 ? void 0 : isLoggedContact(call, activity, contact);
          });
          if (index > -1) return {
            v: index
          };
        },
        _ret;
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _ret = _loop();
        if (_ret) return _ret.v;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (call.toNumberEntity) {
      var index = contactMatches.findIndex(function (contact) {
        return contact.id === call.toNumberEntity;
      });
      return index;
    }
    return showContactDisplayPlaceholder ? -1 : 0;
  });
  var onSelectContact = function onSelectContact(value, idx) {
    var selected = showContactDisplayPlaceholder ? parseInt(idx, 10) - 1 : parseInt(idx, 10);
    userSelectionRef.current = true;
    setSelected(selected);
    if (autoLog) {
      logCall(false, selected);
    }
  };
  var toggleExtended = function toggleExtended(e) {
    var contactDisplay = contactDisplayRef.current;
    if (contactDisplay && contactDisplay.contains(e.target)) {
      return;
    }
    if (onSizeChanged) {
      onSizeChanged(renderIndex);
    } else {
      setExtended(function (extended) {
        return !extended;
      });
    }
  };
  var getSelectedContact = function getSelectedContact() {
    var isSelected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : selected;
    var contactMatches = getContactMatches();
    return isSelected > -1 && contactMatches[isSelected] || contactMatches.length === 1 && contactMatches[0] || null;
  };
  var getPhoneNumber = function getPhoneNumber() {
    return (0, _callLogHelpers.isInbound)(call) ? call.from.phoneNumber || call.from.extensionNumber : call.to.phoneNumber || call.to.extensionNumber;
  };
  var getContactMatches = function getContactMatches() {
    return ((0, _callLogHelpers.isInbound)(call) ? call.fromMatches : call.toMatches) || [];
  };
  var getFallbackContactName = function getFallbackContactName() {
    var _call$to;
    return (0, _callLogHelpers.isInbound)(call) ? call.from.name : (_call$to = call.to) === null || _call$to === void 0 ? void 0 : _call$to.name;
  };
  var logCall = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var redirect,
        isSelected,
        _args = arguments;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            redirect = _args.length > 0 && _args[0] !== undefined ? _args[0] : true;
            isSelected = _args.length > 1 && _args[1] !== undefined ? _args[1] : selected;
            if (!(typeof onLogCall === 'function' && !isLogging)) {
              _context.n = 2;
              break;
            }
            setIsLogging(true);
            _context.n = 1;
            return mounted(onLogCall({
              contact: getSelectedContact(isSelected),
              call: call,
              redirect: redirect
            }));
          case 1:
            setIsLogging(false);
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function logCall() {
      return _ref3.apply(this, arguments);
    };
  }();
  var viewSelectedContact = function viewSelectedContact() {
    if (typeof onViewContact !== 'function') return;
    var activityMatches = call && call.activityMatches || [];
    onViewContact({
      activityMatches: activityMatches,
      contactMatches: getContactMatches(),
      contact: getSelectedContact(),
      phoneNumber: getPhoneNumber()
    });
  };
  var createSelectedContact = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(entityType) {
      var _phoneNumber;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (!(typeof onCreateContact === 'function' && !isCreating)) {
              _context2.n = 2;
              break;
            }
            setIsCreating(true);
            _phoneNumber = getPhoneNumber();
            _context2.n = 1;
            return mounted(onCreateContact({
              phoneNumber: _phoneNumber,
              name: enableContactFallback ? getFallbackContactName() : '',
              entityType: entityType
            }));
          case 1:
            setIsCreating(false);
          case 2:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return function createSelectedContact(_x) {
      return _ref4.apply(this, arguments);
    };
  }();
  var clickToSms = function clickToSms(_ref5) {
    var countryCode = _ref5.countryCode,
      areaCode = _ref5.areaCode;
    if (!onClickToSms) return;
    var phoneNumber = getPhoneNumber();
    var contact = getSelectedContact();
    if (contact) {
      onClickToSms(_objectSpread(_objectSpread({}, contact), {}, {
        phoneNumber: phoneNumber
      }));
    } else {
      var formatted = (0, _formatNumber.formatNumber)({
        phoneNumber: phoneNumber,
        countryCode: countryCode,
        areaCode: areaCode,
        maxExtensionLength: maxExtensionNumberLength
      });
      onClickToSms({
        name: enableContactFallback ? getFallbackContactName() : formatted,
        phoneNumber: phoneNumber
      }, true);
    }
  };
  var clickToDial = function clickToDial() {
    if (onClickToDial) {
      var contact = getSelectedContact() || {};
      var _phoneNumber2 = getPhoneNumber();
      if (_phoneNumber2) {
        onClickToDial(_objectSpread(_objectSpread({}, contact), {}, {
          phoneNumber: _phoneNumber2
        }));
      }
    }
  };
  var mounted = (0, _reactUse.usePromise)();
  var _useState = (0, _react.useState)(getInitialContactIndex()),
    _useState2 = _slicedToArray(_useState, 2),
    selected = _useState2[0],
    setSelected = _useState2[1];
  var _useState3 = (0, _react.useState)(extendedProp),
    _useState4 = _slicedToArray(_useState3, 2),
    extended = _useState4[0],
    setExtended = _useState4[1];
  var _useState5 = (0, _react.useState)(isLoggingProp),
    _useState6 = _slicedToArray(_useState5, 2),
    isLogging = _useState6[0],
    setIsLogging = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isCreating = _useState8[0],
    setIsCreating = _useState8[1];
  var contactDisplayRef = (0, _react.useRef)(null);
  var userSelectionRef = (0, _react.useRef)(false);
  var previousCall = (0, _juno.usePrevious)(function () {
    return call;
  });
  (0, _react.useEffect)(function () {
    setExtended(extendedProp);
  }, [extendedProp]);
  (0, _react.useEffect)(function () {
    setIsLogging(isLoggingProp);
  }, [isLoggingProp]);
  (0, _react.useEffect)(function () {
    if (!userSelectionRef.current && previousCall && (call.activityMatches !== (previousCall === null || previousCall === void 0 ? void 0 : previousCall.activityMatches) || call.fromMatches !== (previousCall === null || previousCall === void 0 ? void 0 : previousCall.fromMatches) || call.toMatches !== (previousCall === null || previousCall === void 0 ? void 0 : previousCall.toMatches))) {
      setSelected(getInitialContactIndex());
    }
  }, [call, getInitialContactIndex, previousCall]);
  var phoneNumber = getPhoneNumber();
  var contactMatches = getContactMatches();
  var shouldHideNumber = enableCDC && (0, _checkShouldHidePhoneNumber.checkShouldHidePhoneNumber)(phoneNumber, contactMatches);
  var isContactMatchesHidden = enableCDC && (0, _checkShouldHideContactUser.checkShouldHideContactUser)(contactMatches);
  var fallbackContactName = getFallbackContactName();
  var ringing = (0, _callLogHelpers.isRinging)(call);
  var missed = (0, _callLogHelpers.isInbound)(call) && (0, _callLogHelpers.isMissed)(call);
  var parsedInfo = (0, _parseNumber.parseNumber)({
    phoneNumber: phoneNumber,
    countryCode: countryCode,
    areaCode: areaCode
  });
  var isExtension = !parsedInfo.hasPlus && parsedInfo.number && parsedInfo.number.length <= maxExtensionNumberLength;
  var disableClickToSms = !(onClickToSms && (isExtension ? internalSmsPermission : outboundSmsPermission));
  var durationEl = typeof duration === 'undefined' ? disableLinks ? _i18n["default"].getString('unavailable', currentLocale) : /*#__PURE__*/_react["default"].createElement(_DurationCounter.DurationCounter, {
    startTime: startTime,
    offset: offset
  }) : (0, _formatDuration.formatDuration)(duration);
  var dateEl = !active ? dateTimeFormatter({
    utcTimestamp: startTime
  }) : '';
  var statusEl = active ? _i18n["default"].getString(result || telephonyStatus, currentLocale) : '';
  var contactName = renderContactName === null || renderContactName === void 0 ? void 0 : renderContactName(call);
  var subContactName = renderSubContactName === null || renderSubContactName === void 0 ? void 0 : renderSubContactName(call);
  var extraButton = renderExtraButton === null || renderExtraButton === void 0 ? void 0 : renderExtraButton(call, isSyncingActivityMatcher);
  var menuExtended = extended;
  var selectedMatchContactType = (_getSelectedContact$t = (_getSelectedContact = getSelectedContact()) === null || _getSelectedContact === void 0 ? void 0 : _getSelectedContact.type) !== null && _getSelectedContact$t !== void 0 ? _getSelectedContact$t : '';
  var callerIdName = showCallerIdName ? (0, _callLogHelpers.getTelephoneDisplayName)(call) : undefined;
  var isQueueCallAnsweredSomewhereElse = (call === null || call === void 0 ? void 0 : call.result) === 'Answered Elsewhere' && (call === null || call === void 0 ? void 0 : call.delegationType) === 'QueueForwarding';
  var answeredBy = call === null || call === void 0 ? void 0 : (_call$delegate = call.delegate) === null || _call$delegate === void 0 ? void 0 : _call$delegate.name;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root,
    onClick: toggleExtended,
    "data-sign": "calls_item_root"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "calls_item_wrapper",
    className: _styles["default"].wrapper
  }, /*#__PURE__*/_react["default"].createElement(_CallIcon.CallIcon, {
    direction: direction,
    ringing: ringing,
    active: active,
    missed: missed,
    inboundTitle: _i18n["default"].getString('inboundCall', currentLocale),
    outboundTitle: _i18n["default"].getString('outboundCall', currentLocale),
    missedTitle: _i18n["default"].getString('missedCall', currentLocale),
    type: type
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].infoWrapper
  }, /*#__PURE__*/_react["default"].createElement(_ContactDisplay.ContactDisplay, {
    showCallerIdIcon: true,
    callerIdName: callerIdName,
    formatPhone: formatPhone,
    missed: missed,
    isOnConferenceCall: direction === _callDirections["default"].outbound && toName === 'Conference',
    contactName: contactName,
    subContactName: subContactName,
    reference: function reference(ref) {
      contactDisplayRef.current = ref;
    },
    className: (0, _clsx["default"])(_styles["default"].contactDisplay, contactDisplayStyle, missed && _styles["default"].missed, active && _styles["default"].active),
    selectClassName: _styles["default"].dropdownSelect,
    brand: brand,
    sourceIcons: sourceIcons,
    phoneSourceNameRenderer: phoneSourceNameRenderer
    // TODO: find correct type
    ,
    contactMatches: contactMatches,
    selected: selected,
    onSelectContact: onSelectContact,
    disabled: disableLinks,
    isLogging: isLogging,
    fallBackName: fallbackContactName,
    enableContactFallback: enableContactFallback,
    areaCode: areaCode,
    countryCode: countryCode,
    phoneNumber: shouldHideNumber ? null : phoneNumber,
    currentLocale: currentLocale,
    stopPropagation: false,
    showType: false,
    showPlaceholder: showContactDisplayPlaceholder,
    currentSiteCode: currentSiteCode,
    isMultipleSiteEnabled: isMultipleSiteEnabled
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].details
  }, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "duration"
  }, durationEl), /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "date"
  }, " | ".concat(dateEl).concat(statusEl)), isQueueCallAnsweredSomewhereElse && answeredBy ? /*#__PURE__*/_react["default"].createElement("p", {
    "data-sign": "answered-by"
  }, _i18n["default"].getString('answeredBy', currentLocale), " ", answeredBy) : null), delayUpdatingStartTime && delayUpdatingMinutes && /*#__PURE__*/_react["default"].createElement(_CountdownTimer.CountdownTimer, {
    variant: "plain",
    currentLocale: currentLocale,
    creationTime: delayUpdatingStartTime,
    duration: delayUpdatingMinutes
  })), extraButton), /*#__PURE__*/_react["default"].createElement(_ActionMenu["default"], {
    extended: menuExtended,
    onToggle: toggleExtended,
    currentLocale: currentLocale,
    onLog: onLogCall && logCall,
    onViewEntity: onViewContact && viewSelectedContact,
    onCreateEntity: onCreateContact && createSelectedContact,
    createEntityTypes: createEntityTypes,
    hasEntity: !!contactMatches.length,
    selectedMatchContactType: selectedMatchContactType,
    onClickToDial: onClickToDial && clickToDial,
    onClickToSms: readTextPermission ? function () {
      return clickToSms({
        countryCode: countryCode,
        areaCode: areaCode
      });
    } : undefined,
    phoneNumber: phoneNumber,
    disableLinks: disableLinks,
    shouldHideEntityButton: function shouldHideEntityButton() {
      if (_shouldHideEntityButton) {
        return _shouldHideEntityButton(call);
      }
      return isContactMatchesHidden;
    },
    disableCallButton: disableCallButton,
    disableClickToDial: disableClickToDial,
    isLogging: isLogging || isLogging,
    isLogged: activityMatches.length > 0,
    isCreating: isCreating,
    addLogTitle: _i18n["default"].getString('addLog', currentLocale),
    editLogTitle: _i18n["default"].getString('editLog', currentLocale),
    textTitle: _i18n["default"].getString('text', currentLocale),
    callTitle: _i18n["default"].getString('call', currentLocale),
    createEntityTitle: _i18n["default"].getString('addEntity', currentLocale),
    viewEntityTitle: _i18n["default"].getString('viewDetails', currentLocale),
    externalViewEntity: externalViewEntityProp ? function () {
      return externalViewEntityProp === null || externalViewEntityProp === void 0 ? void 0 : externalViewEntityProp(call);
    } : undefined,
    externalHasEntity: externalHasEntity && externalHasEntity(call),
    disableClickToSms: disableClickToSms,
    withAnimation: withAnimation,
    showChooseEntityModal: showChooseEntityModal
  }));
};
//# sourceMappingURL=CallItem.js.map
