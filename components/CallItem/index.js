"use strict";

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.find-index");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _messageTypes = _interopRequireDefault(require("ringcentral-integration/enums/messageTypes"));

var _messageDirection = _interopRequireDefault(require("ringcentral-integration/enums/messageDirection"));

var _callLogHelpers = require("ringcentral-integration/lib/callLogHelpers");

var _parseNumber = _interopRequireDefault(require("ringcentral-integration/lib/parseNumber"));

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _DurationCounter = _interopRequireDefault(require("../DurationCounter"));

var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));

var _formatDuration = _interopRequireDefault(require("../../lib/formatDuration"));

var _ActionMenu = _interopRequireDefault(require("../ActionMenu"));

var _FaxInbound = _interopRequireDefault(require("../../assets/images/FaxInbound.svg"));

var _FaxOutbound = _interopRequireDefault(require("../../assets/images/FaxOutbound.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _callIconMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var callIconMap = (_callIconMap = {}, _defineProperty(_callIconMap, _callDirections["default"].inbound, _DynamicsFont["default"].inbound), _defineProperty(_callIconMap, _callDirections["default"].outbound, _DynamicsFont["default"].outbound), _defineProperty(_callIconMap, "missed", _DynamicsFont["default"].missed), _callIconMap);

function CallIcon(_ref) {
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
          className: (0, _classnames["default"])(missed ? callIconMap.missed : callIconMap[direction], active && _styles["default"].activeCall, ringing && _styles["default"].ringing, missed && _styles["default"].missed),
          title: title
        });
      }
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callIcon
  }, icon);
}

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

    _this.onSelectContact = function (value, idx) {
      var _this$props = _this.props,
          showContactDisplayPlaceholder = _this$props.showContactDisplayPlaceholder,
          autoLog = _this$props.autoLog;
      var selected = showContactDisplayPlaceholder ? parseInt(idx, 10) - 1 : parseInt(idx, 10);
      _this._userSelection = true;

      _this.setState({
        selected: selected
      });

      if (autoLog) {
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

      var _this$props2 = _this.props,
          onSizeChanged = _this$props2.onSizeChanged,
          renderIndex = _this$props2.renderIndex;

      if (onSizeChanged) {
        onSizeChanged(renderIndex);
      } else {
        _this.setState(function (state) {
          return {
            extended: !state.extended
          };
        });
      }
    };

    _this.getSelectedContact = function () {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.selected;

      var contactMatches = _this.getContactMatches();

      return selected > -1 && contactMatches[selected] || contactMatches.length === 1 && contactMatches[0] || null;
    };

    _this.logCall = _this.logCall.bind(_assertThisInitialized(_this));

    _this.viewSelectedContact = function () {
      if (typeof _this.props.onViewContact === 'function') {
        var call = _this.props.call;
        var activityMatches = call && call.activityMatches || [];

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
                if (!(typeof _this.props.onCreateContact === 'function' && _this._mounted && !_this.state.isCreating)) {
                  _context.next = 6;
                  break;
                }

                _this.setState({
                  isCreating: true
                }); // console.log('start to create: isCreating...', this.state.isCreating);


                phoneNumber = _this.getPhoneNumber();
                _context.next = 5;
                return _this.props.onCreateContact({
                  phoneNumber: phoneNumber,
                  name: _this.props.enableContactFallback ? _this.getFallbackContactName() : '',
                  entityType: entityType
                });

              case 5:
                if (_this._mounted) {
                  _this.setState({
                    isCreating: false
                  }); // console.log('created: isCreating...', this.state.isCreating);

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

      if (_this.props.onClickToSms) {
        var phoneNumber = _this.getPhoneNumber();

        var contact = _this.getSelectedContact();

        if (contact) {
          _this.props.onClickToSms(_objectSpread(_objectSpread({}, contact), {}, {
            phoneNumber: phoneNumber
          }));
        } else {
          var formatted = (0, _formatNumber["default"])({
            phoneNumber: phoneNumber,
            countryCode: countryCode,
            areaCode: areaCode
          });

          _this.props.onClickToSms({
            name: _this.props.enableContactFallback ? _this.getFallbackContactName() : formatted,
            phoneNumber: phoneNumber
          }, true);
        }
      }
    };

    _this.clickToDial = function () {
      if (_this.props.onClickToDial) {
        var contact = _this.getSelectedContact() || {};

        var phoneNumber = _this.getPhoneNumber();

        if (phoneNumber) {
          _this.props.onClickToDial(_objectSpread(_objectSpread({}, contact), {}, {
            phoneNumber: phoneNumber
          }));
        }
      }
    };

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
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
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
    }
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
      var _this$props4 = this.props,
          isLoggedContact = _this$props4.isLoggedContact,
          showContactDisplayPlaceholder = _this$props4.showContactDisplayPlaceholder;
      var activityMatches = nextProps.call.activityMatches; // console.log('getInitialContactIndex:', nextProps.call.toNumberEntity);

      var _iterator = _createForOfIteratorHelper(activityMatches),
          _step;

      try {
        var _loop = function _loop() {
          var activity = _step.value;
          var index = contactMatches.findIndex(function (contact) {
            return (// TODO find a better name or mechanism...
              isLoggedContact(nextProps.call, activity, contact)
            );
          });
          if (index > -1) return {
            v: index
          };
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _ret = _loop();

          if (_typeof(_ret) === "object") return _ret.v;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (nextProps.call.toNumberEntity) {
        var index = contactMatches.findIndex(function (contact) {
          return contact.id === nextProps.call.toNumberEntity;
        });
        return index;
      }

      return showContactDisplayPlaceholder ? -1 : 0;
    }
  }, {
    key: "getPhoneNumber",
    value: function getPhoneNumber() {
      return (0, _callLogHelpers.isInbound)(this.props.call) ? this.props.call.from.phoneNumber || this.props.call.from.extensionNumber : this.props.call.to.phoneNumber || this.props.call.to.extensionNumber;
    }
  }, {
    key: "getContactMatches",
    value: function getContactMatches() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      return (0, _callLogHelpers.isInbound)(nextProps.call) ? nextProps.call.fromMatches : nextProps.call.toMatches;
    }
  }, {
    key: "getFallbackContactName",
    value: function getFallbackContactName() {
      return (0, _callLogHelpers.isInbound)(this.props.call) ? this.props.call.from.name : this.props.call.to.name;
    }
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

                if (!(typeof this.props.onLogCall === 'function' && this._mounted && !this.state.isLogging)) {
                  _context2.next = 7;
                  break;
                }

                this.setState({
                  isLogging: true
                });
                _context2.next = 6;
                return this.props.onLogCall({
                  contact: this.getSelectedContact(selected),
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
    value: function render() {
      var _this3 = this;

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
          renderExtraButton = _this$props5.renderExtraButton,
          contactDisplayStyle = _this$props5.contactDisplayStyle,
          externalViewEntity = _this$props5.externalViewEntity,
          externalHasEntity = _this$props5.externalHasEntity,
          readTextPermission = _this$props5.readTextPermission,
          withAnimation = _this$props5.withAnimation;
      var phoneNumber = this.getPhoneNumber();
      var contactMatches = this.getContactMatches();
      var fallbackContactName = this.getFallbackContactName();
      var ringing = (0, _callLogHelpers.isRinging)(this.props.call);
      var missed = (0, _callLogHelpers.isInbound)(this.props.call) && (0, _callLogHelpers.isMissed)(this.props.call);
      var parsedInfo = (0, _parseNumber["default"])({
        phoneNumber: phoneNumber,
        countryCode: countryCode,
        areaCode: areaCode
      });
      var isExtension = !parsedInfo.hasPlus && parsedInfo.number && parsedInfo.number.length <= 6;
      var disableClickToSms = !(onClickToSms && (isExtension ? internalSmsPermission : outboundSmsPermission));
      var durationEl = null;

      if (typeof duration === 'undefined') {
        durationEl = disableLinks ? _i18n["default"].getString('unavailable', currentLocale) : /*#__PURE__*/_react["default"].createElement(_DurationCounter["default"], {
          startTime: startTime,
          offset: offset
        });
      } else {
        durationEl = (0, _formatDuration["default"])(duration);
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

      var contactName = typeof renderContactName === 'function' ? renderContactName(this.props.call) : undefined;
      var extraButton = typeof renderExtraButton === 'function' ? renderExtraButton(this.props.call) : undefined;
      var menuExtended = this.props.extended || this.state.extended;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root,
        onClick: this.toggleExtended
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
        isOnConferenceCall: direction === _callDirections["default"].outbound && toName === 'Conference',
        contactName: contactName,
        reference: function reference(ref) {
          _this3.contactDisplay = ref;
        },
        className: (0, _classnames["default"])(_styles["default"].contactDisplay, contactDisplayStyle, missed && _styles["default"].missed, active && _styles["default"].active),
        selectClassName: _styles["default"].dropdownSelect,
        brand: brand,
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        contactMatches: contactMatches,
        selected: this.state.selected,
        onSelectContact: this.onSelectContact,
        disabled: disableLinks,
        isLogging: isLogging || this.state.isLogging,
        fallBackName: fallbackContactName,
        enableContactFallback: enableContactFallback,
        areaCode: areaCode,
        countryCode: countryCode,
        phoneNumber: phoneNumber,
        currentLocale: currentLocale,
        stopPropagation: false,
        showType: false,
        showPlaceholder: showContactDisplayPlaceholder
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
        onClickToDial: onClickToDial && this.clickToDial,
        onClickToSms: readTextPermission ? function () {
          return _this3.clickToSms({
            countryCode: countryCode,
            areaCode: areaCode
          });
        } : undefined,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks,
        disableCallButton: disableCallButton,
        disableClickToDial: disableClickToDial,
        isLogging: isLogging || this.state.isLogging,
        isLogged: activityMatches.length > 0,
        isCreating: this.state.isCreating,
        addLogTitle: _i18n["default"].getString('addLog', currentLocale),
        editLogTitle: _i18n["default"].getString('editLog', currentLocale),
        textTitle: _i18n["default"].getString('text', currentLocale),
        callTitle: _i18n["default"].getString('call', currentLocale),
        createEntityTitle: _i18n["default"].getString('addEntity', currentLocale),
        viewEntityTitle: _i18n["default"].getString('viewDetails', currentLocale),
        externalViewEntity: externalViewEntity && this.externalViewEntity,
        externalHasEntity: externalHasEntity && externalHasEntity(this.props.call),
        disableClickToSms: disableClickToSms,
        withAnimation: withAnimation
      }));
    }
  }]);

  return CallItem;
}(_react.Component);

exports["default"] = CallItem;
CallItem.propTypes = {
  renderIndex: _propTypes["default"].number,
  extended: _propTypes["default"].bool,
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
  renderExtraButton: _propTypes["default"].func,
  contactDisplayStyle: _propTypes["default"].string,
  externalViewEntity: _propTypes["default"].func,
  externalHasEntity: _propTypes["default"].func,
  readTextPermission: _propTypes["default"].bool,
  onSizeChanged: _propTypes["default"].func,
  withAnimation: _propTypes["default"].bool
};
CallItem.defaultProps = {
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
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
  onSizeChanged: undefined,
  withAnimation: true
};
//# sourceMappingURL=index.js.map
