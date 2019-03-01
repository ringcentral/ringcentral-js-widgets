"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.find-index");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

require("core-js/fn/array/find");

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var callIconMap = (_callIconMap = {}, _defineProperty(_callIconMap, _callDirections.default.inbound, _DynamicsFont.default.inbound), _defineProperty(_callIconMap, _callDirections.default.outbound, _DynamicsFont.default.outbound), _defineProperty(_callIconMap, "missed", _DynamicsFont.default.missed), _callIconMap);

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
    case _messageTypes.default.fax:
      {
        icon = direction === _messageDirection.default.inbound ? _react.default.createElement("span", {
          title: inboundTitle
        }, _react.default.createElement(_FaxInbound.default, {
          width: 21
        })) : _react.default.createElement("span", {
          title: outboundTitle
        }, _react.default.createElement(_FaxOutbound.default, {
          width: 21
        }));
        break;
      }

    default:
      {
        var title = null;

        if (missed) {
          title = missedTitle;
        } else if (direction === _callDirections.default.inbound) {
          title = inboundTitle;
        } else {
          title = outboundTitle;
        }

        icon = _react.default.createElement("span", {
          className: (0, _classnames.default)(missed ? callIconMap.missed : callIconMap[direction], active && _styles.default.activeCall, ringing && _styles.default.ringing, missed && _styles.default.missed),
          title: title
        });
      }
  }

  return _react.default.createElement("div", {
    className: _styles.default.callIcon
  }, icon);
}

CallIcon.propTypes = {
  direction: _propTypes.default.string.isRequired,
  missed: _propTypes.default.bool,
  active: _propTypes.default.bool,
  ringing: _propTypes.default.bool,
  inboundTitle: _propTypes.default.string,
  outboundTitle: _propTypes.default.string,
  missedTitle: _propTypes.default.string,
  type: _propTypes.default.string
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

var CallItem =
/*#__PURE__*/
function (_Component) {
  _inherits(CallItem, _Component);

  function CallItem(props) {
    var _this;

    _classCallCheck(this, CallItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CallItem).call(this, props));

    _this.onSelectContact = function (value, idx) {
      var selected = _this.props.showContactDisplayPlaceholder ? parseInt(idx, 10) - 1 : parseInt(idx, 10);
      _this._userSelection = true;

      _this.setState({
        selected: selected
      });

      if (_this.props.autoLog) {
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

      var _this$props = _this.props,
          onSizeChanged = _this$props.onSizeChanged,
          renderIndex = _this$props.renderIndex;

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

    _this.logCall = _this.logCall.bind(_assertThisInitialized(_assertThisInitialized(_this)));

    _this.viewSelectedContact = function () {
      if (typeof _this.props.onViewContact === 'function') {
        _this.props.onViewContact({
          contact: _this.getSelectedContact()
        });
      }
    };

    _this.createSelectedContact =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(entityType) {
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
          _this.props.onClickToSms(_objectSpread({}, contact, {
            phoneNumber: phoneNumber
          }));
        } else {
          var formatted = (0, _formatNumber.default)({
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
          _this.props.onClickToDial(_objectSpread({}, contact, {
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
      if (!this._userSelection && (nextProps.call.activityMatches !== this.props.call.activityMatches || nextProps.call.fromMatches !== this.props.call.fromMatches || nextProps.call.toMatches !== this.props.call.toMatches)) {
        this.setState({
          selected: this.getInitialContactIndex(nextProps)
        });
      }

      if (this.props.extended !== nextProps.extended && this.state.extended !== nextProps.extended) {
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
      var _this3 = this;

      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var contactMatches = this.getContactMatches(nextProps);
      var activityMatches = nextProps.call.activityMatches; // console.log('getInitialContactIndex:', nextProps.call.toNumberEntity);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var activity = _step.value;
          var index = contactMatches.findIndex(function (contact) {
            return (// TODO find a better name or mechanism...
              _this3.props.isLoggedContact(nextProps.call, activity, contact)
            );
          });
          if (index > -1) return {
            v: index
          };
        };

        for (var _iterator = activityMatches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ret = _loop();

          if (_typeof(_ret) === "object") return _ret.v;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (nextProps.call.toNumberEntity) {
        var index = contactMatches.findIndex(function (contact) {
          return contact.id === nextProps.call.toNumberEntity;
        });
        return index;
      }

      return this.props.showContactDisplayPlaceholder ? -1 : 0;
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
      var _logCall = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref4) {
        var _ref4$redirect, redirect, selected;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref4$redirect = _ref4.redirect, redirect = _ref4$redirect === void 0 ? true : _ref4$redirect, selected = _ref4.selected;

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
      var _this4 = this;

      if (this.state.loading) {
        return _react.default.createElement("div", {
          className: _styles.default.root
        });
      }

      var _this$props2 = this.props,
          _this$props2$call = _this$props2.call,
          direction = _this$props2$call.direction,
          telephonyStatus = _this$props2$call.telephonyStatus,
          result = _this$props2$call.result,
          startTime = _this$props2$call.startTime,
          duration = _this$props2$call.duration,
          activityMatches = _this$props2$call.activityMatches,
          offset = _this$props2$call.offset,
          type = _this$props2$call.type,
          toName = _this$props2$call.toName,
          brand = _this$props2.brand,
          currentLocale = _this$props2.currentLocale,
          areaCode = _this$props2.areaCode,
          countryCode = _this$props2.countryCode,
          disableLinks = _this$props2.disableLinks,
          disableClickToDial = _this$props2.disableClickToDial,
          outboundSmsPermission = _this$props2.outboundSmsPermission,
          internalSmsPermission = _this$props2.internalSmsPermission,
          active = _this$props2.active,
          onViewContact = _this$props2.onViewContact,
          onCreateContact = _this$props2.onCreateContact,
          createEntityTypes = _this$props2.createEntityTypes,
          onLogCall = _this$props2.onLogCall,
          onClickToDial = _this$props2.onClickToDial,
          onClickToSms = _this$props2.onClickToSms,
          dateTimeFormatter = _this$props2.dateTimeFormatter,
          isLogging = _this$props2.isLogging,
          enableContactFallback = _this$props2.enableContactFallback,
          showContactDisplayPlaceholder = _this$props2.showContactDisplayPlaceholder,
          sourceIcons = _this$props2.sourceIcons,
          phoneTypeRenderer = _this$props2.phoneTypeRenderer,
          phoneSourceNameRenderer = _this$props2.phoneSourceNameRenderer,
          renderContactName = _this$props2.renderContactName,
          renderExtraButton = _this$props2.renderExtraButton,
          contactDisplayStyle = _this$props2.contactDisplayStyle,
          externalViewEntity = _this$props2.externalViewEntity,
          externalHasEntity = _this$props2.externalHasEntity,
          readTextPermission = _this$props2.readTextPermission,
          withAnimation = _this$props2.withAnimation;
      var phoneNumber = this.getPhoneNumber();
      var contactMatches = this.getContactMatches();
      var fallbackContactName = this.getFallbackContactName();
      var ringing = (0, _callLogHelpers.isRinging)(this.props.call);
      var missed = (0, _callLogHelpers.isInbound)(this.props.call) && (0, _callLogHelpers.isMissed)(this.props.call);
      var parsedInfo = (0, _parseNumber.default)({
        phoneNumber: phoneNumber,
        countryCode: countryCode,
        areaCode: areaCode
      });
      var isExtension = !parsedInfo.hasPlus && parsedInfo.number && parsedInfo.number.length <= 6;
      var disableClickToSms = !(onClickToSms && (isExtension ? internalSmsPermission : outboundSmsPermission));
      var durationEl = null;

      if (typeof duration === 'undefined') {
        durationEl = disableLinks ? _i18n.default.getString('unavailable', currentLocale) : _react.default.createElement(_DurationCounter.default, {
          startTime: startTime,
          offset: offset
        });
      } else {
        durationEl = (0, _formatDuration.default)(duration);
      }

      var dateEl = '';

      if (!active) {
        dateEl = dateTimeFormatter({
          utcTimestamp: startTime
        });
      }

      var statusEl = '';

      if (active) {
        statusEl = _i18n.default.getString(result || telephonyStatus, currentLocale);
      }

      var contactName = typeof renderContactName === 'function' ? renderContactName(this.props.call) : undefined;
      var extraButton = typeof renderExtraButton === 'function' ? renderExtraButton(this.props.call) : undefined;
      var menuExtended = this.props.extended || this.state.extended;
      return _react.default.createElement("div", {
        className: _styles.default.root,
        onClick: this.toggleExtended
      }, _react.default.createElement("div", {
        className: _styles.default.wrapper
      }, _react.default.createElement(CallIcon, {
        direction: direction,
        ringing: ringing,
        active: active,
        missed: missed,
        inboundTitle: _i18n.default.getString('inboundCall', currentLocale),
        outboundTitle: _i18n.default.getString('outboundCall', currentLocale),
        missedTitle: _i18n.default.getString('missedCall', currentLocale),
        type: type
      }), _react.default.createElement("div", {
        className: _styles.default.infoWrapper
      }, _react.default.createElement(_ContactDisplay.default, {
        isOnConferenceCall: direction === _callDirections.default.outbound && toName === 'Conference',
        contactName: contactName,
        reference: function reference(ref) {
          _this4.contactDisplay = ref;
        },
        className: (0, _classnames.default)(_styles.default.contactDisplay, contactDisplayStyle, missed && _styles.default.missed, active && _styles.default.active),
        selectClassName: _styles.default.dropdownSelect,
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
      }), _react.default.createElement("div", {
        className: _styles.default.details
      }, durationEl, " | ".concat(dateEl).concat(statusEl))), extraButton), _react.default.createElement(_ActionMenu.default, {
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
          return _this4.clickToSms({
            countryCode: countryCode,
            areaCode: areaCode
          });
        } : undefined,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks,
        disableClickToDial: disableClickToDial,
        isLogging: isLogging || this.state.isLogging,
        isLogged: activityMatches.length > 0,
        isCreating: this.state.isCreating,
        addLogTitle: _i18n.default.getString('addLog', currentLocale),
        editLogTitle: _i18n.default.getString('editLog', currentLocale),
        textTitle: _i18n.default.getString('text', currentLocale),
        callTitle: _i18n.default.getString('call', currentLocale),
        createEntityTitle: _i18n.default.getString('addEntity', currentLocale),
        viewEntityTitle: _i18n.default.getString('viewDetails', currentLocale),
        externalViewEntity: externalViewEntity && this.externalViewEntity,
        externalHasEntity: externalHasEntity && externalHasEntity(this.props.call),
        disableClickToSms: disableClickToSms,
        withAnimation: withAnimation
      }));
    }
  }]);

  return CallItem;
}(_react.Component);

exports.default = CallItem;
CallItem.propTypes = {
  renderIndex: _propTypes.default.number,
  extended: _propTypes.default.bool,
  call: _propTypes.default.shape({
    direction: _propTypes.default.string.isRequired,
    telephonyStatus: _propTypes.default.string,
    startTime: _propTypes.default.number.isRequired,
    activityMatches: _propTypes.default.array.isRequired,
    fromMatches: _propTypes.default.array.isRequired,
    toMatches: _propTypes.default.array.isRequired,
    from: _propTypes.default.shape({
      phoneNumber: _propTypes.default.string,
      extensionNumber: _propTypes.default.string,
      name: _propTypes.default.string
    }).isRequired,
    to: _propTypes.default.shape({
      phoneNumber: _propTypes.default.string,
      extensionNumber: _propTypes.default.string,
      name: _propTypes.default.string
    }),
    webphoneSession: _propTypes.default.object
  }).isRequired,
  areaCode: _propTypes.default.string.isRequired,
  brand: _propTypes.default.string.isRequired,
  countryCode: _propTypes.default.string.isRequired,
  currentLocale: _propTypes.default.string.isRequired,
  onLogCall: _propTypes.default.func,
  onViewContact: _propTypes.default.func,
  onCreateContact: _propTypes.default.func,
  createEntityTypes: _propTypes.default.array,
  onClickToDial: _propTypes.default.func,
  onClickToSms: _propTypes.default.func,
  isLoggedContact: _propTypes.default.func,
  disableLinks: _propTypes.default.bool,
  disableClickToDial: _propTypes.default.bool,
  outboundSmsPermission: _propTypes.default.bool,
  internalSmsPermission: _propTypes.default.bool,
  active: _propTypes.default.bool.isRequired,
  dateTimeFormatter: _propTypes.default.func.isRequired,
  isLogging: _propTypes.default.bool,
  enableContactFallback: _propTypes.default.bool,
  autoLog: _propTypes.default.bool,
  showContactDisplayPlaceholder: _propTypes.default.bool,
  sourceIcons: _propTypes.default.object,
  phoneTypeRenderer: _propTypes.default.func,
  phoneSourceNameRenderer: _propTypes.default.func,
  renderContactName: _propTypes.default.func,
  renderExtraButton: _propTypes.default.func,
  contactDisplayStyle: _propTypes.default.string,
  externalViewEntity: _propTypes.default.func,
  externalHasEntity: _propTypes.default.func,
  readTextPermission: _propTypes.default.bool,
  onSizeChanged: _propTypes.default.func,
  withAnimation: _propTypes.default.bool
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
