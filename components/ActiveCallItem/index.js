"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/web.timers.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _parseNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/parseNumber"));
var _sessionStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/sessionStatus"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));
var _End = _interopRequireDefault(require("../../assets/images/End.svg"));
var _Voicemail = _interopRequireDefault(require("../../assets/images/Voicemail.svg"));
var _ActionMenu = _interopRequireDefault(require("../ActionMenu"));
var _CallIcon = _interopRequireDefault(require("../CallIcon"));
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));
var _DurationCounter = require("../DurationCounter");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var WebphoneButtons = function WebphoneButtons(_ref) {
  var currentLocale = _ref.currentLocale,
    session = _ref.session,
    webphoneAnswer = _ref.webphoneAnswer,
    webphoneReject = _ref.webphoneReject,
    webphoneHangup = _ref.webphoneHangup,
    webphoneResume = _ref.webphoneResume,
    showAnswer = _ref.showAnswer;
  if (!session || !webphoneAnswer || !webphoneHangup) {
    return null;
  }
  var hangupFunc = webphoneHangup;
  var resumeFunc = webphoneResume;
  var endIcon = _End["default"];
  var rejectTitle = _i18n["default"].getString('hangup', currentLocale);
  var acceptTitle = _i18n["default"].getString('accept', currentLocale);
  if (session.direction === _callDirections["default"].inbound && session.callStatus === _sessionStatus["default"].connecting) {
    hangupFunc = webphoneReject;
    resumeFunc = webphoneAnswer;
    endIcon = _Voicemail["default"];
    rejectTitle = _i18n["default"].getString('toVoicemail', currentLocale);
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].webphoneButtons
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: rejectTitle,
    className: _styles["default"].webphoneButton
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    className: _styles["default"].rejectButton,
    onClick: function onClick(e) {
      e.stopPropagation();
      hangupFunc(session.id);
    },
    iconWidth: 260,
    iconX: 120,
    icon: endIcon,
    showBorder: false
  })), showAnswer ? /*#__PURE__*/_react["default"].createElement("span", {
    title: acceptTitle,
    className: _styles["default"].webphoneButton
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    className: _styles["default"].answerButton,
    onClick: function onClick(e) {
      e.stopPropagation();
      resumeFunc(session.id);
    },
    icon: _Answer["default"],
    showBorder: false
  })) : null);
};
WebphoneButtons.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  session: _propTypes["default"].object,
  webphoneAnswer: _propTypes["default"].func,
  webphoneReject: _propTypes["default"].func,
  webphoneHangup: _propTypes["default"].func,
  webphoneResume: _propTypes["default"].func,
  showAnswer: _propTypes["default"].bool
};
WebphoneButtons.defaultProps = {
  session: undefined,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  showAnswer: true
};
var ActiveCallItem = /*#__PURE__*/function (_Component) {
  function ActiveCallItem(props) {
    var _this;
    _classCallCheck(this, ActiveCallItem);
    _this = _callSuper(this, ActiveCallItem, [props]);
    _this._mounted = void 0;
    _this._userSelection = void 0;
    _this.contactDisplay = void 0;
    _this.toVoicemailTimeout = void 0;
    _this.toggleExtended = void 0;
    _this.webphoneToVoicemail = void 0;
    _this.onSelectContact = function (value) {
      var nameMatches = _this.getContactMatches();
      var selected = nameMatches.findIndex(function (match) {
        return match.id === value.id;
      });
      _this._userSelection = true;
      _this.setState({
        selected: selected
      });
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      if (_this.props.call.activityMatches.length > 0 && _this.props.autoLog) {
        _this.logCall({
          redirect: false,
          selected: selected
        });
      }
    };
    // @ts-expect-error TS(2339): Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
    _this.getSelectedContact = function () {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.selected;
      var contactMatches = _this.getContactMatches();
      return selected > -1 && contactMatches[selected] || contactMatches.length === 1 && contactMatches[0] || null;
    };
    _this.clickToSms = function () {
      // @ts-expect-error TS(2339): Property 'onClickToSms' does not exist on type 'Re... Remove this comment to see the full error message
      if (_this.props.onClickToSms) {
        var phoneNumber = _this.getPhoneNumber();
        var contact = _this.getSelectedContact();
        if (contact) {
          // @ts-expect-error TS(2339): Property 'onClickToSms' does not exist on type 'Re... Remove this comment to see the full error message
          _this.props.onClickToSms(_objectSpread(_objectSpread({}, contact), {}, {
            phoneNumber: phoneNumber
          }));
        } else {
          // @ts-expect-error TS(2339): Property 'formatPhone' does not exist on type 'Rea... Remove this comment to see the full error message
          var formatted = _this.props.formatPhone(phoneNumber);
          // @ts-expect-error TS(2339): Property 'onClickToSms' does not exist on type 'Re... Remove this comment to see the full error message
          _this.props.onClickToSms({
            // @ts-expect-error TS(2339): Property 'enableContactFallback' does not exist on... Remove this comment to see the full error message
            name: _this.props.enableContactFallback ? _this.getFallbackContactName() : formatted,
            phoneNumber: phoneNumber
          }, true);
        }
      }
    };
    _this.createSelectedContact = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(entityType) {
        var phoneNumber;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(
              // @ts-expect-error TS(2339): Property 'onCreateContact' does not exist on type ... Remove this comment to see the full error message
              typeof _this.props.onCreateContact === 'function' && _this._mounted &&
              // @ts-expect-error TS(2339): Property 'isCreating' does not exist on type 'Read... Remove this comment to see the full error message
              !_this.state.isCreating)) {
                _context.n = 2;
                break;
              }
              _this.setState({
                isCreating: true
              });
              // console.log('start to create: isCreating...', this.state.isCreating);
              phoneNumber = _this.getPhoneNumber(); // @ts-expect-error TS(2339): Property 'onCreateContact' does not exist on type ... Remove this comment to see the full error message
              _context.n = 1;
              return _this.props.onCreateContact({
                phoneNumber: phoneNumber,
                // @ts-expect-error TS(2339): Property 'enableContactFallback' does not exist on... Remove this comment to see the full error message
                name: _this.props.enableContactFallback ? _this.getFallbackContactName() : '',
                entityType: entityType
              });
            case 1:
              if (_this._mounted) {
                _this.setState({
                  isCreating: false
                });
                // console.log('created: isCreating...', this.state.isCreating);
              }
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    _this.viewSelectedContact = function () {
      // @ts-expect-error TS(2339): Property 'onViewContact' does not exist on type 'R... Remove this comment to see the full error message
      if (typeof _this.props.onViewContact === 'function') {
        // @ts-expect-error TS(2339): Property 'onViewContact' does not exist on type 'R... Remove this comment to see the full error message
        _this.props.onViewContact({
          contact: _this.getSelectedContact()
        });
      }
    };
    // @ts-expect-error TS(2300): Duplicate identifier 'logCall'.
    _this.logCall = _this.logCall.bind(_this);
    // @ts-expect-error TS(2339): Property 'externalViewEntity' does not exist on ty... Remove this comment to see the full error message
    _this.externalViewEntity = function () {
      return _this.props.externalViewEntity(_this.props.call);
    };
    _this.state = {
      selected: 0,
      isLogging: false,
      extended: false,
      isCreating: false
    };
    _this._userSelection = false;
    _this.contactDisplay = null;
    _this.toggleExtended = function (e) {
      // @ts-expect-error TS(2339): Property 'isOnConferenceCall' does not exist on ty... Remove this comment to see the full error message
      if (_this.props.isOnConferenceCall) {
        return;
      }
      if (_this.contactDisplay && _this.contactDisplay.contains(e.target)) {
        return;
      }
      _this.setState(function (preState) {
        return {
          // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
          extended: !preState.extended
        };
      });
    };
    _this.webphoneToVoicemail = function (sessionId) {
      // @ts-expect-error TS(2339): Property 'webphoneToVoicemail' does not exist on t... Remove this comment to see the full error message
      if (typeof _this.props.webphoneToVoicemail !== 'function') {
        return;
      }
      // @ts-expect-error TS(2339): Property 'webphoneToVoicemail' does not exist on t... Remove this comment to see the full error message
      _this.props.webphoneToVoicemail(sessionId);
      _this.toVoicemailTimeout = setTimeout(function () {
        // @ts-expect-error TS(2339): Property 'webphoneReject' does not exist on type '... Remove this comment to see the full error message
        _this.props.webphoneReject(sessionId);
      }, 3000);
    };
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _inherits(ActiveCallItem, _Component);
  return _createClass(ActiveCallItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      if (this.toVoicemailTimeout) {
        clearTimeout(this.toVoicemailTimeout);
        this.toVoicemailTimeout = null;
      }
    }
  }, {
    key: "getFallbackContactName",
    value: function getFallbackContactName() {
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      return (0, _callLogHelpers.isInbound)(this.props.call) ?
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      this.props.call.from.name :
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      this.props.call.to.name;
    }
  }, {
    key: "getContactMatches",
    value: function getContactMatches() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      return (0, _callLogHelpers.isInbound)(nextProps.call) ?
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      nextProps.call.fromMatches :
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      nextProps.call.toMatches;
    }
  }, {
    key: "getPhoneNumber",
    value: function getPhoneNumber() {
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      return (0, _callLogHelpers.isInbound)(this.props.call) ?
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      this.props.call.from.phoneNumber || this.props.call.from.extensionNumber :
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      this.props.call.to.phoneNumber || this.props.call.to.extensionNumber;
    }
  }, {
    key: "getMyPhoneNumber",
    value: function getMyPhoneNumber() {
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      return (0, _callLogHelpers.isInbound)(this.props.call) ?
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      this.props.call.to.phoneNumber || this.props.call.to.extensionNumber :
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      this.props.call.from.phoneNumber ||
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      this.props.call.from.extensionNumber;
    }
  }, {
    key: "getCallInfo",
    value: function getCallInfo() {
      var _this$props = this.props,
        _this$props$call = _this$props.call,
        telephonyStatus = _this$props$call.telephonyStatus,
        startTime = _this$props$call.startTime,
        webphoneSession = _this$props$call.webphoneSession,
        offset = _this$props$call.offset,
        disableLinks = _this$props.disableLinks,
        currentLocale = _this$props.currentLocale,
        formatPhone = _this$props.formatPhone,
        showCallDetail = _this$props.showCallDetail;
      if (!showCallDetail) {
        return null;
      }
      var myPhoneNumber = this.getMyPhoneNumber();
      if (webphoneSession) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].callDetail
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: _styles["default"].label
        }, (0, _callLogHelpers.isInbound)(this.props.call) ? _i18n["default"].getString('to', currentLocale) : _i18n["default"].getString('from', currentLocale), ":"), myPhoneNumber ? formatPhone(myPhoneNumber) : _i18n["default"].getString('anonymous', currentLocale));
      }
      var telephonyStatusInfo = _i18n["default"].getString(telephonyStatus, currentLocale);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callDetail
      }, disableLinks ? _i18n["default"].getString('unavailable', currentLocale) : /*#__PURE__*/_react["default"].createElement(_DurationCounter.DurationCounter, {
        startTime: startTime,
        offset: offset
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].split
      }, "|"), /*#__PURE__*/_react["default"].createElement("span", {
        title: telephonyStatusInfo
      }, telephonyStatusInfo));
    }
  }, {
    key: "logCall",
    value: function () {
      var _logCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref3) {
        var _ref3$redirect, redirect, selected;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _ref3$redirect = _ref3.redirect, redirect = _ref3$redirect === void 0 ? true : _ref3$redirect, selected = _ref3.selected;
              if (!(
              // @ts-expect-error TS(2339): Property 'onLogCall' does not exist on type 'Reado... Remove this comment to see the full error message
              typeof this.props.onLogCall === 'function' && this._mounted &&
              // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
              !this.state.isLogging)) {
                _context2.n = 2;
                break;
              }
              this.setState({
                isLogging: true
              });
              // @ts-expect-error TS(2339): Property 'onLogCall' does not exist on type 'Reado... Remove this comment to see the full error message
              _context2.n = 1;
              return this.props.onLogCall({
                contact: this.getSelectedContact(selected),
                // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                call: this.props.call,
                redirect: redirect
              });
            case 1:
              if (this._mounted) {
                this.setState({
                  isLogging: false
                });
              }
            case 2:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function logCall(_x2) {
        return _logCall.apply(this, arguments);
      }
      return logCall;
    }()
  }, {
    key: "render",
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        _this$props2$call = _this$props2.call,
        direction = _this$props2$call.direction,
        activityMatches = _this$props2$call.activityMatches,
        webphoneSession = _this$props2$call.webphoneSession,
        disableLinks = _this$props2.disableLinks,
        currentLocale = _this$props2.currentLocale,
        areaCode = _this$props2.areaCode,
        countryCode = _this$props2.countryCode,
        outboundSmsPermission = _this$props2.outboundSmsPermission,
        internalSmsPermission = _this$props2.internalSmsPermission,
        enableContactFallback = _this$props2.enableContactFallback,
        isLogging = _this$props2.isLogging,
        brand = _this$props2.brand,
        showContactDisplayPlaceholder = _this$props2.showContactDisplayPlaceholder,
        onClickToSms = _this$props2.onClickToSms,
        onViewContact = _this$props2.onViewContact,
        onCreateContact = _this$props2.onCreateContact,
        createEntityTypes = _this$props2.createEntityTypes,
        onLogCall = _this$props2.onLogCall,
        webphoneAnswer = _this$props2.webphoneAnswer,
        webphoneHangup = _this$props2.webphoneHangup,
        webphoneResume = _this$props2.webphoneResume,
        sourceIcons = _this$props2.sourceIcons,
        phoneTypeRenderer = _this$props2.phoneTypeRenderer,
        phoneSourceNameRenderer = _this$props2.phoneSourceNameRenderer,
        renderContactName = _this$props2.renderContactName,
        renderExtraButton = _this$props2.renderExtraButton,
        contactDisplayStyle = _this$props2.contactDisplayStyle,
        externalViewEntity = _this$props2.externalViewEntity,
        externalHasEntity = _this$props2.externalHasEntity,
        readTextPermission = _this$props2.readTextPermission,
        isOnConferenceCall = _this$props2.isOnConferenceCall,
        hasActionMenu = _this$props2.hasActionMenu,
        showAnswer = _this$props2.showAnswer,
        avatarUrl = _this$props2.avatarUrl,
        showAvatar = _this$props2.showAvatar,
        formatPhone = _this$props2.formatPhone;
      var phoneNumber = this.getPhoneNumber();
      var parsedInfo = (0, _parseNumber["default"])({
        phoneNumber: phoneNumber,
        countryCode: countryCode,
        areaCode: areaCode
      });
      var isExtension = !parsedInfo.hasPlus && parsedInfo.number && parsedInfo.number.length <= 6;
      var disableClickToSms = !(onClickToSms && (isExtension ? internalSmsPermission : outboundSmsPermission));
      var contactMatches = this.getContactMatches();
      var fallbackContactName = this.getFallbackContactName();
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      var ringing = (0, _callLogHelpers.isRinging)(this.props.call);
      var callDetail = this.getCallInfo();
      var contactName = typeof renderContactName === 'function' ?
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      renderContactName(this.props.call) : undefined;
      var extraButton = typeof renderExtraButton === 'function' ?
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      renderExtraButton(this.props.call) : undefined;
      return (
        /*#__PURE__*/
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        _react["default"].createElement("div", {
          className: _styles["default"].root,
          onClick: this.toggleExtended
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].wrapper
        }, /*#__PURE__*/_react["default"].createElement(_CallIcon["default"], {
          direction: direction,
          ringing: ringing
          // @ts-expect-error TS(2322): Type '{ direction: any; ringing: boolean; active: ... Remove this comment to see the full error message
          ,
          active: true,
          missed: false,
          inboundTitle: _i18n["default"].getString('inboundCall', currentLocale),
          outboundTitle: _i18n["default"].getString('outboundCall', currentLocale),
          missedTitle: _i18n["default"].getString('missedCall', currentLocale),
          isOnConferenceCall: isOnConferenceCall,
          showAvatar: showAvatar,
          avatarUrl: avatarUrl
        }), /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].infoWrapper
        }, /*#__PURE__*/_react["default"].createElement(_ContactDisplay["default"], {
          formatPhone: formatPhone,
          isOnConferenceCall: isOnConferenceCall,
          contactName: contactName,
          className: isOnConferenceCall ? (0, _clsx["default"])(_styles["default"].conferenceContactDisplay) : (0, _clsx["default"])(_styles["default"].contactDisplay, contactDisplayStyle),
          contactMatches: contactMatches
          // @ts-expect-error TS(2339): Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          selected: this.state.selected,
          onSelectContact: this.onSelectContact,
          disabled: disableLinks
          // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
          ,
          isLogging: isLogging || this.state.isLogging,
          fallBackName: fallbackContactName,
          enableContactFallback: enableContactFallback,
          areaCode: areaCode,
          countryCode: countryCode,
          phoneNumber: phoneNumber,
          currentLocale: currentLocale,
          brand: brand,
          showPlaceholder: showContactDisplayPlaceholder,
          showType: false,
          sourceIcons: sourceIcons
          // @ts-expect-error TS(2322): Type '{ formatPhone: any; isOnConferenceCall: any;... Remove this comment to see the full error message
          ,
          phoneTypeRenderer: phoneTypeRenderer,
          phoneSourceNameRenderer: phoneSourceNameRenderer,
          stopPropagation: true
        }), isOnConferenceCall ? null : callDetail), /*#__PURE__*/_react["default"].createElement(WebphoneButtons, {
          session: webphoneSession,
          webphoneAnswer: webphoneAnswer,
          webphoneReject: this.webphoneToVoicemail,
          webphoneHangup: webphoneHangup,
          webphoneResume: webphoneResume,
          currentLocale: currentLocale,
          showAnswer: showAnswer
        }), extraButton), hasActionMenu ? /*#__PURE__*/_react["default"].createElement(_ActionMenu["default"]
        // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
        , {
          extended: this.state.extended,
          onToggle: this.toggleExtended,
          currentLocale: currentLocale,
          disableLinks: disableLinks,
          phoneNumber: phoneNumber,
          onClickToSms: readTextPermission ?
          // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
          function () {
            return _this2.clickToSms({
              countryCode: countryCode,
              areaCode: areaCode
            });
          } : undefined,
          hasEntity: !!contactMatches.length,
          onViewEntity: onViewContact && this.viewSelectedContact,
          onCreateEntity: onCreateContact && this.createSelectedContact,
          createEntityTypes: createEntityTypes,
          textTitle: _i18n["default"].getString('text', currentLocale),
          onLog: onLogCall
          // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
          ,
          isLogging: isLogging || this.state.isLogging,
          isLogged: activityMatches.length > 0
          // @ts-expect-error TS(2339): Property 'isCreating' does not exist on type 'Read... Remove this comment to see the full error message
          ,
          isCreating: this.state.isCreating,
          addLogTitle: _i18n["default"].getString('addLog', currentLocale),
          editLogTitle: _i18n["default"].getString('editLog', currentLocale),
          createEntityTitle: _i18n["default"].getString('addEntity', currentLocale),
          viewEntityTitle: _i18n["default"].getString('viewDetails', currentLocale),
          externalViewEntity: externalViewEntity && this.externalViewEntity,
          externalHasEntity:
          // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
          externalHasEntity && externalHasEntity(this.props.call),
          disableClickToSms: disableClickToSms
        }) : null)
      );
    }
  }]);
}(_react.Component); // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ActiveCallItem.propTypes = {
  call: _propTypes["default"].shape({
    direction: _propTypes["default"].string.isRequired,
    telephonyStatus: _propTypes["default"].string,
    startTime: _propTypes["default"].number.isRequired,
    activityMatches: _propTypes["default"].array.isRequired,
    fromMatches: _propTypes["default"].array.isRequired,
    toMatches: _propTypes["default"].array.isRequired,
    from: _propTypes["default"].shape({
      phoneNumber: _propTypes["default"].string,
      extensionNumber: _propTypes["default"].string,
      name: _propTypes["default"].string
    }).isRequired,
    to: _propTypes["default"].shape({
      phoneNumber: _propTypes["default"].string,
      extensionNumber: _propTypes["default"].string,
      name: _propTypes["default"].string
    }),
    webphoneSession: _propTypes["default"].object
  }).isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  disableLinks: _propTypes["default"].bool,
  outboundSmsPermission: _propTypes["default"].bool,
  internalSmsPermission: _propTypes["default"].bool,
  isLogging: _propTypes["default"].bool,
  webphoneAnswer: _propTypes["default"].func,
  webphoneReject: _propTypes["default"].func,
  webphoneHangup: _propTypes["default"].func,
  webphoneResume: _propTypes["default"].func,
  webphoneToVoicemail: _propTypes["default"].func,
  enableContactFallback: _propTypes["default"].bool,
  autoLog: _propTypes["default"].bool,
  brand: _propTypes["default"].string,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  formatPhone: _propTypes["default"].func.isRequired,
  onClickToSms: _propTypes["default"].func,
  onCreateContact: _propTypes["default"].func,
  createEntityTypes: _propTypes["default"].array,
  onLogCall: _propTypes["default"].func,
  onViewContact: _propTypes["default"].func,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  renderContactName: _propTypes["default"].func,
  renderExtraButton: _propTypes["default"].func,
  contactDisplayStyle: _propTypes["default"].string,
  externalViewEntity: _propTypes["default"].func,
  externalHasEntity: _propTypes["default"].func,
  readTextPermission: _propTypes["default"].bool,
  isOnConferenceCall: _propTypes["default"].bool,
  hasActionMenu: _propTypes["default"].bool,
  showAnswer: _propTypes["default"].bool,
  avatarUrl: _propTypes["default"].string,
  showAvatar: _propTypes["default"].bool,
  showCallDetail: _propTypes["default"].bool
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ActiveCallItem.defaultProps = {
  onLogCall: undefined,
  onClickToSms: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  createEntityTypes: undefined,
  isLogging: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  disableLinks: false,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneToVoicemail: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
  isOnConferenceCall: false,
  hasActionMenu: true,
  showAnswer: true,
  avatarUrl: null,
  showAvatar: false,
  showCallDetail: true
};
var _default = exports["default"] = ActiveCallItem;
//# sourceMappingURL=index.js.map
