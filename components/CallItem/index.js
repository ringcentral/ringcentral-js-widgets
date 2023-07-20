"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.parse-int");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _messageDirection = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageDirection"));
var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _formatDuration = require("@ringcentral-integration/commons/lib/formatDuration");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _parseNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/parseNumber"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _FaxInbound = _interopRequireDefault(require("../../assets/images/FaxInbound.svg"));
var _FaxOutbound = _interopRequireDefault(require("../../assets/images/FaxOutbound.svg"));
var _checkShouldHideContactUser = require("../../lib/checkShouldHideContactUser");
var _checkShouldHidePhoneNumber = require("../../lib/checkShouldHidePhoneNumber");
var _ActionMenu = _interopRequireDefault(require("../ActionMenu"));
var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));
var _DurationCounter = _interopRequireDefault(require("../DurationCounter"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _callIconMap;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* eslint-disable react/destructuring-assignment */
var callIconMap = (_callIconMap = {}, _defineProperty(_callIconMap, _callDirections["default"].inbound, _DynamicsFont["default"].inbound), _defineProperty(_callIconMap, _callDirections["default"].outbound, _DynamicsFont["default"].outbound), _defineProperty(_callIconMap, "missed", _DynamicsFont["default"].missed), _callIconMap);
var CallIcon = function CallIcon(_ref) {
  var direction = _ref.direction,
    missed = _ref.missed,
    active = _ref.active,
    ringing = _ref.ringing,
    inboundTitle = _ref.inboundTitle,
    outboundTitle = _ref.outboundTitle,
    missedTitle = _ref.missedTitle,
    type = _ref.type;
  var icon = null;
  switch (type) {
    case _messageTypes["default"].fax:
      {
        icon = direction === _messageDirection["default"].inbound ? /*#__PURE__*/_react["default"].createElement("span", {
          title: inboundTitle
        }, /*#__PURE__*/_react["default"].createElement(_FaxInbound["default"], {
          width: 21
        })) : /*#__PURE__*/_react["default"].createElement("span", {
          title: outboundTitle
        }, /*#__PURE__*/_react["default"].createElement(_FaxOutbound["default"], {
          width: 21
        }));
        break;
      }
    default:
      {
        var title = null;
        if (missed) {
          title = missedTitle;
        } else if (direction === _callDirections["default"].inbound) {
          title = inboundTitle;
        } else {
          title = outboundTitle;
        }
        icon = /*#__PURE__*/_react["default"].createElement("span", {
          className: (0, _classnames["default"])(
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          missed ? callIconMap.missed : callIconMap[direction], active && _styles["default"].activeCall, ringing && _styles["default"].ringing, missed && _styles["default"].missed),
          title: title
        });
      }
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callIcon
  }, icon);
};
CallIcon.propTypes = {
  direction: _propTypes["default"].string.isRequired,
  missed: _propTypes["default"].bool,
  active: _propTypes["default"].bool,
  ringing: _propTypes["default"].bool,
  inboundTitle: _propTypes["default"].string,
  outboundTitle: _propTypes["default"].string,
  missedTitle: _propTypes["default"].string,
  type: _propTypes["default"].string
};
CallIcon.defaultProps = {
  missed: false,
  active: false,
  ringing: false,
  inboundTitle: '',
  outboundTitle: '',
  missedTitle: '',
  type: ''
};
var CallItem = /*#__PURE__*/function (_Component) {
  _inherits(CallItem, _Component);
  var _super = _createSuper(CallItem);
  function CallItem(props) {
    var _this;
    _classCallCheck(this, CallItem);
    _this = _super.call(this, props);
    _this._loadingTimeout = void 0;
    _this._mounted = void 0;
    _this._userSelection = void 0;
    _this.contactDisplay = void 0;
    _this.onSelectContact = function (value, idx) {
      // @ts-expect-error TS(2339): Property 'showContactDisplayPlaceholder' does not ... Remove this comment to see the full error message
      var _this$props = _this.props,
        showContactDisplayPlaceholder = _this$props.showContactDisplayPlaceholder,
        autoLog = _this$props.autoLog;
      var selected = showContactDisplayPlaceholder ? parseInt(idx, 10) - 1 : parseInt(idx, 10);
      _this._userSelection = true;
      _this.setState({
        selected: selected
      });
      if (autoLog) {
        // @ts-expect-error TS(2345): Argument of type '{ redirect: boolean; selected: n... Remove this comment to see the full error message
        _this.logCall({
          redirect: false,
          selected: selected
        });
      }
    };
    _this.toggleExtended = function (e) {
      if (_this.contactDisplay && _this.contactDisplay.contains(e.target)) {
        return;
      }
      // @ts-expect-error TS(2339): Property 'onSizeChanged' does not exist on type 'R... Remove this comment to see the full error message
      var _this$props2 = _this.props,
        onSizeChanged = _this$props2.onSizeChanged,
        renderIndex = _this$props2.renderIndex;
      if (onSizeChanged) {
        onSizeChanged(renderIndex);
      } else {
        _this.setState(function (state) {
          return {
            // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
            extended: !state.extended
          };
        });
      }
    };
    // @ts-expect-error TS(2339): Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
    _this.getSelectedContact = function () {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.selected;
      var contactMatches = _this.getContactMatches();
      return selected > -1 && contactMatches[selected] || contactMatches.length === 1 && contactMatches[0] || null;
    };
    // @ts-expect-error TS(2300): Duplicate identifier 'logCall'.
    _this.logCall = _this.logCall.bind(_assertThisInitialized(_this));
    _this.viewSelectedContact = function () {
      // @ts-expect-error TS(2339): Property 'onViewContact' does not exist on type 'R... Remove this comment to see the full error message
      if (typeof _this.props.onViewContact === 'function') {
        // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        var call = _this.props.call;
        var activityMatches = call && call.activityMatches || [];
        // @ts-expect-error TS(2339): Property 'onViewContact' does not exist on type 'R... Remove this comment to see the full error message
        _this.props.onViewContact({
          activityMatches: activityMatches,
          contactMatches: _this.getContactMatches(),
          contact: _this.getSelectedContact(),
          phoneNumber: _this.getPhoneNumber()
        });
      }
    };
    _this.createSelectedContact = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(entityType) {
        var phoneNumber;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(
                // @ts-expect-error TS(2339): Property 'onCreateContact' does not exist on type ... Remove this comment to see the full error message
                typeof _this.props.onCreateContact === 'function' && _this._mounted &&
                // @ts-expect-error TS(2339): Property 'isCreating' does not exist on type 'Read... Remove this comment to see the full error message
                !_this.state.isCreating)) {
                  _context.next = 6;
                  break;
                }
                _this.setState({
                  isCreating: true
                });
                // console.log('start to create: isCreating...', this.state.isCreating);
                phoneNumber = _this.getPhoneNumber(); // @ts-expect-error TS(2339): Property 'onCreateContact' does not exist on type ... Remove this comment to see the full error message
                _context.next = 5;
                return _this.props.onCreateContact({
                  phoneNumber: phoneNumber,
                  // @ts-expect-error TS(2339): Property 'enableContactFallback' does not exist on... Remove this comment to see the full error message
                  name: _this.props.enableContactFallback ? _this.getFallbackContactName() : '',
                  entityType: entityType
                });
              case 5:
                if (_this._mounted) {
                  _this.setState({
                    isCreating: false
                  });
                  // console.log('created: isCreating...', this.state.isCreating);
                }
              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    _this.clickToSms = function (_ref3) {
      var countryCode = _ref3.countryCode,
        areaCode = _ref3.areaCode;
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
          var formatted = (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            countryCode: countryCode,
            areaCode: areaCode,
            // @ts-expect-error TS(2339): Property 'maxExtensionNumberLength' does not exist... Remove this comment to see the full error message
            maxExtensionLength: _this.props.maxExtensionNumberLength
          });
          // @ts-expect-error TS(2339): Property 'onClickToSms' does not exist on type 'Re... Remove this comment to see the full error message
          _this.props.onClickToSms({
            // @ts-expect-error TS(2339): Property 'enableContactFallback' does not exist on... Remove this comment to see the full error message
            name: _this.props.enableContactFallback ? _this.getFallbackContactName() : formatted,
            phoneNumber: phoneNumber
          }, true);
        }
      }
    };
    _this.clickToDial = function () {
      // @ts-expect-error TS(2339): Property 'onClickToDial' does not exist on type 'R... Remove this comment to see the full error message
      if (_this.props.onClickToDial) {
        var contact = _this.getSelectedContact() || {};
        var phoneNumber = _this.getPhoneNumber();
        if (phoneNumber) {
          // @ts-expect-error TS(2339): Property 'onClickToDial' does not exist on type 'R... Remove this comment to see the full error message
          _this.props.onClickToDial(_objectSpread(_objectSpread({}, contact), {}, {
            phoneNumber: phoneNumber
          }));
        }
      }
    };
    // @ts-expect-error TS(2339): Property 'externalViewEntity' does not exist on ty... Remove this comment to see the full error message
    _this.externalViewEntity = function () {
      return _this.props.externalViewEntity(_this.props.call);
    };
    _this.state = {
      selected: _this.getInitialContactIndex(),
      isLogging: false,
      isCreating: false,
      loading: true,
      extended: false
    };
    _this._userSelection = false;
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(CallItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this._mounted = true;
      this._loadingTimeout = setTimeout(function () {
        // clear timeout is probably not necessary
        if (_this2._mounted) {
          _this2.setState({
            loading: false
          });
        }
      }, 10);
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      var _this$props3 = this.props,
        call = _this$props3.call,
        extended = _this$props3.extended;
      if (!this._userSelection && (nextProps.call.activityMatches !== call.activityMatches || nextProps.call.fromMatches !== call.fromMatches || nextProps.call.toMatches !== call.toMatches)) {
        this.setState({
          selected: this.getInitialContactIndex(nextProps)
        });
      }
      if (extended !== nextProps.extended && extended !== nextProps.extended) {
        this.setState({
          extended: nextProps.extended
        });
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      if (this._loadingTimeout) {
        clearTimeout(this._loadingTimeout);
        this._loadingTimeout = null;
      }
    }
  }, {
    key: "getInitialContactIndex",
    value: function getInitialContactIndex() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var contactMatches = this.getContactMatches(nextProps);
      // @ts-expect-error TS(2339): Property 'isLoggedContact' does not exist on type ... Remove this comment to see the full error message
      var _this$props4 = this.props,
        isLoggedContact = _this$props4.isLoggedContact,
        showContactDisplayPlaceholder = _this$props4.showContactDisplayPlaceholder; // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      var activityMatches = nextProps.call.activityMatches;
      // console.log('getInitialContactIndex:', nextProps.call.toNumberEntity);
      var _iterator = _createForOfIteratorHelper(activityMatches),
        _step;
      try {
        var _loop = function _loop() {
          var activity = _step.value;
          var index = contactMatches.findIndex(function (contact // TODO: find a better name or mechanism...
          // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
          ) {
            return isLoggedContact(nextProps.call, activity, contact);
          });
          if (index > -1) return {
            v: index
          };
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _ret = _loop();
          if (_typeof(_ret) === "object") return _ret.v;
        }
        // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (nextProps.call.toNumberEntity) {
        var index = contactMatches.findIndex(
        // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        function (contact) {
          return contact.id === nextProps.call.toNumberEntity;
        });
        return index;
      }
      return showContactDisplayPlaceholder ? -1 : 0;
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
    key: "getFallbackContactName",
    value: function getFallbackContactName() {
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      return (0, _callLogHelpers.isInbound)(this.props.call) ?
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      this.props.call.from.name :
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      this.props.call.to.name;
    } // @ts-expect-error TS(2339): Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
  }, {
    key: "logCall",
    value: function () {
      var _logCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var redirect,
          selected,
          _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                redirect = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : true;
                selected = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : this.state.selected;
                if (!(
                // @ts-expect-error TS(2339): Property 'onLogCall' does not exist on type 'Reado... Remove this comment to see the full error message
                typeof this.props.onLogCall === 'function' && this._mounted &&
                // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
                !this.state.isLogging)) {
                  _context2.next = 7;
                  break;
                }
                this.setState({
                  isLogging: true
                });
                // @ts-expect-error TS(2339): Property 'onLogCall' does not exist on type 'Reado... Remove this comment to see the full error message
                _context2.next = 6;
                return this.props.onLogCall({
                  contact: this.getSelectedContact(selected),
                  // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                  call: this.props.call,
                  redirect: redirect
                });
              case 6:
                if (this._mounted) {
                  this.setState({
                    isLogging: false
                  });
                }
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function logCall() {
        return _logCall.apply(this, arguments);
      }
      return logCall;
    }()
  }, {
    key: "render",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var _this$getSelectedCont,
        _this$getSelectedCont2,
        _this3 = this;
      // @ts-expect-error TS(2339): Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message
      if (this.state.loading) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].root
        });
      }
      var _this$props5 = this.props,
        _this$props5$call = _this$props5.call,
        direction = _this$props5$call.direction,
        telephonyStatus = _this$props5$call.telephonyStatus,
        result = _this$props5$call.result,
        startTime = _this$props5$call.startTime,
        duration = _this$props5$call.duration,
        activityMatches = _this$props5$call.activityMatches,
        offset = _this$props5$call.offset,
        type = _this$props5$call.type,
        toName = _this$props5$call.toName,
        brand = _this$props5.brand,
        currentLocale = _this$props5.currentLocale,
        currentSiteCode = _this$props5.currentSiteCode,
        isMultipleSiteEnabled = _this$props5.isMultipleSiteEnabled,
        areaCode = _this$props5.areaCode,
        countryCode = _this$props5.countryCode,
        disableLinks = _this$props5.disableLinks,
        disableCallButton = _this$props5.disableCallButton,
        disableClickToDial = _this$props5.disableClickToDial,
        outboundSmsPermission = _this$props5.outboundSmsPermission,
        internalSmsPermission = _this$props5.internalSmsPermission,
        active = _this$props5.active,
        onViewContact = _this$props5.onViewContact,
        onCreateContact = _this$props5.onCreateContact,
        createEntityTypes = _this$props5.createEntityTypes,
        onLogCall = _this$props5.onLogCall,
        onClickToDial = _this$props5.onClickToDial,
        onClickToSms = _this$props5.onClickToSms,
        dateTimeFormatter = _this$props5.dateTimeFormatter,
        isLogging = _this$props5.isLogging,
        enableContactFallback = _this$props5.enableContactFallback,
        showContactDisplayPlaceholder = _this$props5.showContactDisplayPlaceholder,
        sourceIcons = _this$props5.sourceIcons,
        phoneTypeRenderer = _this$props5.phoneTypeRenderer,
        phoneSourceNameRenderer = _this$props5.phoneSourceNameRenderer,
        renderContactName = _this$props5.renderContactName,
        renderSubContactName = _this$props5.renderSubContactName,
        renderExtraButton = _this$props5.renderExtraButton,
        contactDisplayStyle = _this$props5.contactDisplayStyle,
        externalViewEntity = _this$props5.externalViewEntity,
        externalHasEntity = _this$props5.externalHasEntity,
        readTextPermission = _this$props5.readTextPermission,
        withAnimation = _this$props5.withAnimation,
        showChooseEntityModal = _this$props5.showChooseEntityModal,
        enableCDC = _this$props5.enableCDC,
        maxExtensionNumberLength = _this$props5.maxExtensionNumberLength,
        formatPhone = _this$props5.formatPhone;
      var phoneNumber = this.getPhoneNumber();
      var contactMatches = this.getContactMatches();
      var shouldHideNumber = enableCDC && (0, _checkShouldHidePhoneNumber.checkShouldHidePhoneNumber)(phoneNumber, contactMatches);
      var isContactMatchesHidden = enableCDC && (0, _checkShouldHideContactUser.checkShouldHideContactUser)(contactMatches);
      var fallbackContactName = this.getFallbackContactName();
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      var ringing = (0, _callLogHelpers.isRinging)(this.props.call);
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      var missed = (0, _callLogHelpers.isInbound)(this.props.call) && (0, _callLogHelpers.isMissed)(this.props.call);
      var parsedInfo = (0, _parseNumber["default"])({
        phoneNumber: phoneNumber,
        countryCode: countryCode,
        areaCode: areaCode
      });
      var isExtension = !parsedInfo.hasPlus && parsedInfo.number && parsedInfo.number.length <= maxExtensionNumberLength;
      var disableClickToSms = !(onClickToSms && (isExtension ? internalSmsPermission : outboundSmsPermission));
      var durationEl = null;
      if (typeof duration === 'undefined') {
        durationEl = disableLinks ? _i18n["default"].getString('unavailable', currentLocale) : /*#__PURE__*/_react["default"].createElement(_DurationCounter["default"], {
          startTime: startTime,
          offset: offset
        });
      } else {
        durationEl = (0, _formatDuration.formatDuration)(duration);
      }
      var dateEl = '';
      if (!active) {
        dateEl = dateTimeFormatter({
          utcTimestamp: startTime
        });
      }
      var statusEl = '';
      if (active) {
        statusEl = _i18n["default"].getString(result || telephonyStatus, currentLocale);
      }
      var contactName = typeof renderContactName === 'function' ?
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      renderContactName(this.props.call) : undefined;
      var subContactName = typeof renderSubContactName === 'function' ?
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      renderSubContactName(this.props.call) : undefined;
      var extraButton = typeof renderExtraButton === 'function' ?
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      renderExtraButton(this.props.call) : undefined;
      // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
      var menuExtended = this.props.extended || this.state.extended;
      var selectedMatchContactType = (_this$getSelectedCont = (_this$getSelectedCont2 = this.getSelectedContact()) === null || _this$getSelectedCont2 === void 0 ? void 0 : _this$getSelectedCont2.type) !== null && _this$getSelectedCont !== void 0 ? _this$getSelectedCont : '';
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root,
        onClick: this.toggleExtended,
        "data-sign": "calls_item_root"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "calls_item_wrapper",
        className: _styles["default"].wrapper
      }, /*#__PURE__*/_react["default"].createElement(CallIcon, {
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
      }, /*#__PURE__*/_react["default"].createElement(_ContactDisplay["default"], {
        formatPhone: formatPhone,
        missed: missed,
        isOnConferenceCall: direction === _callDirections["default"].outbound && toName === 'Conference',
        contactName: contactName,
        subContactName: subContactName,
        reference: function reference(ref) {
          _this3.contactDisplay = ref;
        },
        className: (0, _classnames["default"])(_styles["default"].contactDisplay, contactDisplayStyle, missed && _styles["default"].missed, active && _styles["default"].active),
        selectClassName: _styles["default"].dropdownSelect,
        brand: brand,
        sourceIcons: sourceIcons
        // @ts-expect-error TS(2322): Type '{ formatPhone: any; missed: boolean; isOnCon... Remove this comment to see the full error message
        ,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
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
        phoneNumber: shouldHideNumber ? null : phoneNumber,
        currentLocale: currentLocale,
        stopPropagation: false,
        showType: false,
        showPlaceholder: showContactDisplayPlaceholder,
        currentSiteCode: currentSiteCode,
        isMultipleSiteEnabled: isMultipleSiteEnabled
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].details
      }, durationEl, " | ".concat(dateEl).concat(statusEl))), extraButton), /*#__PURE__*/_react["default"].createElement(_ActionMenu["default"], {
        extended: menuExtended,
        onToggle: this.toggleExtended,
        currentLocale: currentLocale,
        onLog: onLogCall && this.logCall,
        onViewEntity: onViewContact && this.viewSelectedContact,
        onCreateEntity: onCreateContact && this.createSelectedContact,
        createEntityTypes: createEntityTypes,
        hasEntity: !!contactMatches.length,
        selectedMatchContactType: selectedMatchContactType,
        onClickToDial: onClickToDial && this.clickToDial,
        onClickToSms: readTextPermission ? function () {
          return _this3.clickToSms({
            countryCode: countryCode,
            areaCode: areaCode
          });
        } : undefined,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks,
        shouldHideEntityButton: isContactMatchesHidden,
        disableCallButton: disableCallButton,
        disableClickToDial: disableClickToDial
        // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
        ,
        isLogging: isLogging || this.state.isLogging,
        isLogged: activityMatches.length > 0
        // @ts-expect-error TS(2339): Property 'isCreating' does not exist on type 'Read... Remove this comment to see the full error message
        ,
        isCreating: this.state.isCreating,
        addLogTitle: _i18n["default"].getString('addLog', currentLocale),
        editLogTitle: _i18n["default"].getString('editLog', currentLocale),
        textTitle: _i18n["default"].getString('text', currentLocale),
        callTitle: _i18n["default"].getString('call', currentLocale),
        createEntityTitle: _i18n["default"].getString('addEntity', currentLocale),
        viewEntityTitle: _i18n["default"].getString('viewDetails', currentLocale),
        externalViewEntity: externalViewEntity && this.externalViewEntity,
        externalHasEntity:
        // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        externalHasEntity && externalHasEntity(this.props.call),
        disableClickToSms: disableClickToSms,
        withAnimation: withAnimation,
        showChooseEntityModal: showChooseEntityModal
      }));
    }
  }]);
  return CallItem;
}(_react.Component); // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
CallItem.propTypes = {
  renderIndex: _propTypes["default"].number,
  extended: _propTypes["default"].bool,
  call: _propTypes["default"].shape({
    result: _propTypes["default"].string,
    duration: _propTypes["default"].number,
    offset: _propTypes["default"].number,
    type: _propTypes["default"].string,
    toName: _propTypes["default"].string,
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
  brand: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  onLogCall: _propTypes["default"].func,
  onViewContact: _propTypes["default"].func,
  onCreateContact: _propTypes["default"].func,
  createEntityTypes: _propTypes["default"].array,
  onClickToDial: _propTypes["default"].func,
  onClickToSms: _propTypes["default"].func,
  isLoggedContact: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool,
  disableCallButton: _propTypes["default"].bool,
  disableClickToDial: _propTypes["default"].bool,
  outboundSmsPermission: _propTypes["default"].bool,
  internalSmsPermission: _propTypes["default"].bool,
  active: _propTypes["default"].bool.isRequired,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  isLogging: _propTypes["default"].bool,
  enableContactFallback: _propTypes["default"].bool,
  autoLog: _propTypes["default"].bool,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  renderContactName: _propTypes["default"].func,
  renderSubContactName: _propTypes["default"].func,
  renderExtraButton: _propTypes["default"].func,
  contactDisplayStyle: _propTypes["default"].string,
  externalViewEntity: _propTypes["default"].func,
  externalHasEntity: _propTypes["default"].func,
  readTextPermission: _propTypes["default"].bool,
  onSizeChanged: _propTypes["default"].func,
  withAnimation: _propTypes["default"].bool,
  currentSiteCode: _propTypes["default"].string,
  isMultipleSiteEnabled: _propTypes["default"].bool,
  showChooseEntityModal: _propTypes["default"].bool,
  enableCDC: _propTypes["default"].bool,
  maxExtensionNumberLength: _propTypes["default"].number,
  formatPhone: _propTypes["default"].func
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
CallItem.defaultProps = {
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  renderIndex: undefined,
  extended: false,
  onLogCall: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  createEntityTypes: undefined,
  isLoggedContact: function isLoggedContact() {
    return false;
  },
  isLogging: false,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  disableLinks: false,
  disableCallButton: false,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  autoLog: false,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  renderContactName: undefined,
  renderSubContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
  onSizeChanged: undefined,
  withAnimation: true,
  showChooseEntityModal: true,
  enableCDC: false,
  maxExtensionNumberLength: 6,
  formatPhone: function formatPhone(phoneNumber) {
    return phoneNumber;
  }
};
var _default = CallItem;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
