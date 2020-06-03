"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.function.bind");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find-index");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _sessionStatus = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/sessionStatus"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _callLogHelpers = require("ringcentral-integration/lib/callLogHelpers");

var _parseNumber = _interopRequireDefault(require("ringcentral-integration/lib/parseNumber"));

var _DurationCounter = _interopRequireDefault(require("../DurationCounter"));

var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));

var _ActionMenu = _interopRequireDefault(require("../ActionMenu"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));

var _Voicemail = _interopRequireDefault(require("../../assets/images/Voicemail.svg"));

var _CallIcon = _interopRequireDefault(require("../CallIcon"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function WebphoneButtons(_ref) {
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
}

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
  _inherits(ActiveCallItem, _Component);

  var _super = _createSuper(ActiveCallItem);

  function ActiveCallItem(props) {
    var _this;

    _classCallCheck(this, ActiveCallItem);

    _this = _super.call(this, props);

    _this.onSelectContact = function (value) {
      var nameMatches = _this.getContactMatches();

      var selected = nameMatches.findIndex(function (match) {
        return match.id === value.id;
      });
      _this._userSelection = true;

      _this.setState({
        selected: selected
      });

      if (_this.props.call.activityMatches.length > 0 && _this.props.autoLog) {
        _this.logCall({
          redirect: false,
          selected: selected
        });
      }
    };

    _this.getSelectedContact = function () {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.selected;

      var contactMatches = _this.getContactMatches();

      return selected > -1 && contactMatches[selected] || contactMatches.length === 1 && contactMatches[0] || null;
    };

    _this.clickToSms = function () {
      if (_this.props.onClickToSms) {
        var phoneNumber = _this.getPhoneNumber();

        var contact = _this.getSelectedContact();

        if (contact) {
          _this.props.onClickToSms(_objectSpread(_objectSpread({}, contact), {}, {
            phoneNumber: phoneNumber
          }));
        } else {
          var formatted = _this.props.formatPhone(phoneNumber);

          _this.props.onClickToSms({
            name: _this.props.enableContactFallback ? _this.getFallbackContactName() : formatted,
            phoneNumber: phoneNumber
          }, true);
        }
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

    _this.viewSelectedContact = function () {
      if (typeof _this.props.onViewContact === 'function') {
        _this.props.onViewContact({
          contact: _this.getSelectedContact()
        });
      }
    };

    _this.logCall = _this.logCall.bind(_assertThisInitialized(_this));

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
      if (_this.props.isOnConferenceCall) {
        return;
      }

      if (_this.contactDisplay && _this.contactDisplay.contains(e.target)) {
        return;
      }

      _this.setState(function (preState) {
        return {
          extended: !preState.extended
        };
      });
    };

    _this.webphoneToVoicemail = function (sessionId) {
      if (typeof _this.props.webphoneToVoicemail !== 'function') {
        return;
      }

      _this.props.webphoneToVoicemail(sessionId);

      _this.toVoicemailTimeout = setTimeout(function () {
        _this.props.webphoneReject(sessionId);
      }, 3000);
    };

    return _this;
  }

  _createClass(ActiveCallItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    }
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
      return (0, _callLogHelpers.isInbound)(this.props.call) ? this.props.call.from.name : this.props.call.to.name;
    }
  }, {
    key: "getContactMatches",
    value: function getContactMatches() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      return (0, _callLogHelpers.isInbound)(nextProps.call) ? nextProps.call.fromMatches : nextProps.call.toMatches;
    }
  }, {
    key: "getPhoneNumber",
    value: function getPhoneNumber() {
      return (0, _callLogHelpers.isInbound)(this.props.call) ? this.props.call.from.phoneNumber || this.props.call.from.extensionNumber : this.props.call.to.phoneNumber || this.props.call.to.extensionNumber;
    }
  }, {
    key: "getMyPhoneNumber",
    value: function getMyPhoneNumber() {
      return (0, _callLogHelpers.isInbound)(this.props.call) ? this.props.call.to.phoneNumber || this.props.call.to.extensionNumber : this.props.call.from.phoneNumber || this.props.call.from.extensionNumber;
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
      }, disableLinks ? _i18n["default"].getString('unavailable', currentLocale) : /*#__PURE__*/_react["default"].createElement(_DurationCounter["default"], {
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
      var _logCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
        var _ref3$redirect, redirect, selected;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref3$redirect = _ref3.redirect, redirect = _ref3$redirect === void 0 ? true : _ref3$redirect, selected = _ref3.selected;

                if (!(typeof this.props.onLogCall === 'function' && this._mounted && !this.state.isLogging)) {
                  _context2.next = 6;
                  break;
                }

                this.setState({
                  isLogging: true
                });
                _context2.next = 5;
                return this.props.onLogCall({
                  contact: this.getSelectedContact(selected),
                  call: this.props.call,
                  redirect: redirect
                });

              case 5:
                if (this._mounted) {
                  this.setState({
                    isLogging: false
                  });
                }

              case 6:
              case "end":
                return _context2.stop();
            }
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
    value: function render() {
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
          showAvatar = _this$props2.showAvatar;
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
      var ringing = (0, _callLogHelpers.isRinging)(this.props.call);
      var callDetail = this.getCallInfo();
      var contactName = typeof renderContactName === 'function' ? renderContactName(this.props.call) : undefined;
      var extraButton = typeof renderExtraButton === 'function' ? renderExtraButton(this.props.call) : undefined;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root,
        onClick: this.toggleExtended
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].wrapper
      }, /*#__PURE__*/_react["default"].createElement(_CallIcon["default"], {
        direction: direction,
        ringing: ringing,
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
        isOnConferenceCall: isOnConferenceCall,
        contactName: contactName,
        className: isOnConferenceCall ? (0, _classnames["default"])(_styles["default"].conferenceContactDisplay) : (0, _classnames["default"])(_styles["default"].contactDisplay, contactDisplayStyle),
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
        brand: brand,
        showPlaceholder: showContactDisplayPlaceholder,
        showType: false,
        sourceIcons: sourceIcons,
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
      }), extraButton), hasActionMenu ? /*#__PURE__*/_react["default"].createElement(_ActionMenu["default"], {
        extended: this.state.extended,
        onToggle: this.toggleExtended,
        currentLocale: currentLocale,
        disableLinks: disableLinks,
        phoneNumber: phoneNumber,
        onClickToSms: readTextPermission ? function () {
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
        onLog: onLogCall,
        isLogging: isLogging || this.state.isLogging,
        isLogged: activityMatches.length > 0,
        isCreating: this.state.isCreating,
        addLogTitle: _i18n["default"].getString('addLog', currentLocale),
        editLogTitle: _i18n["default"].getString('editLog', currentLocale),
        createEntityTitle: _i18n["default"].getString('addEntity', currentLocale),
        viewEntityTitle: _i18n["default"].getString('viewDetails', currentLocale),
        externalViewEntity: externalViewEntity && this.externalViewEntity,
        externalHasEntity: externalHasEntity && externalHasEntity(this.props.call),
        disableClickToSms: disableClickToSms
      }) : null);
    }
  }]);

  return ActiveCallItem;
}(_react.Component);

exports["default"] = ActiveCallItem;
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
//# sourceMappingURL=index.js.map
