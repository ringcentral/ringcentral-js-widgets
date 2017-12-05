'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _callIconMap;
// import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';

// import Button from '../Button';


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('core-js/fn/array/find');

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _callLogHelpers = require('ringcentral-integration/lib/callLogHelpers');

var _parseNumber = require('ringcentral-integration/lib/parseNumber');

var _parseNumber2 = _interopRequireDefault(_parseNumber);

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _DurationCounter = require('../DurationCounter');

var _DurationCounter2 = _interopRequireDefault(_DurationCounter);

var _ContactDisplay = require('../ContactDisplay');

var _ContactDisplay2 = _interopRequireDefault(_ContactDisplay);

var _formatDuration = require('../../lib/formatDuration');

var _formatDuration2 = _interopRequireDefault(_formatDuration);

var _ActionMenu = require('../ActionMenu');

var _ActionMenu2 = _interopRequireDefault(_ActionMenu);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var callIconMap = (_callIconMap = {}, (0, _defineProperty3.default)(_callIconMap, _callDirections2.default.inbound, _DynamicsFont2.default.inbound), (0, _defineProperty3.default)(_callIconMap, _callDirections2.default.outbound, _DynamicsFont2.default.outbound), (0, _defineProperty3.default)(_callIconMap, 'missed', _DynamicsFont2.default.missed), _callIconMap);

function CallIcon(_ref) {
  var direction = _ref.direction,
      missed = _ref.missed,
      active = _ref.active,
      ringing = _ref.ringing,
      inboundTitle = _ref.inboundTitle,
      outboundTitle = _ref.outboundTitle,
      missedTitle = _ref.missedTitle;

  var title = missed ? missedTitle : direction === _callDirections2.default.inbound ? inboundTitle : outboundTitle;
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.callIcon },
    _react2.default.createElement('span', {
      className: (0, _classnames2.default)(missed ? callIconMap.missed : callIconMap[direction], active && _styles2.default.activeCall, ringing && _styles2.default.ringing, missed && _styles2.default.missed),
      title: title
    })
  );
}
CallIcon.propTypes = {
  direction: _propTypes2.default.string.isRequired,
  missed: _propTypes2.default.bool,
  active: _propTypes2.default.bool,
  ringing: _propTypes2.default.bool
};
CallIcon.defaultProps = {
  missed: false,
  active: false,
  ringing: false
};

var CallItem = function (_Component) {
  (0, _inherits3.default)(CallItem, _Component);

  function CallItem(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, CallItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallItem.__proto__ || (0, _getPrototypeOf2.default)(CallItem)).call(this, props));

    _this.onSelectContact = function (value, idx) {
      var selected = _this.props.showContactDisplayPlaceholder ? parseInt(idx, 10) - 1 : parseInt(idx, 10);
      _this._userSelection = true;
      _this.setState({
        selected: selected
      });
      if (_this.props.call.activityMatches.length > 0 && _this.props.autoLog) {
        _this.logCall({ redirect: false, selected: selected });
      }
    };

    _this.toggleExtended = function (e) {
      if (_this.contactDisplay && _this.contactDisplay.contains(e.target)) {
        return;
      }
      _this.setState(function (preState) {
        return {
          extended: !preState.extended
        };
      });
    };

    _this.getSelectedContact = function () {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.selected;

      var contactMatches = _this.getContactMatches();
      return selected > -1 && contactMatches[selected] || contactMatches.length === 1 && contactMatches[0] || null;
    };

    _this.logCall = _this.logCall.bind(_this);

    _this.viewSelectedContact = function () {
      if (typeof _this.props.onViewContact === 'function') {
        _this.props.onViewContact({
          contact: _this.getSelectedContact()
        });
      }
    };

    _this.createSelectedContact = function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(entityType) {
        var phoneNumber;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof _this.props.onCreateContact === 'function' && _this._mounted && !_this.state.isCreating)) {
                  _context.next = 6;
                  break;
                }

                _this.setState({
                  isCreating: true
                });
                // console.log('start to create: isCreating...', this.state.isCreating);
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
                  });
                  // console.log('created: isCreating...', this.state.isCreating);
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x2) {
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
          _this.props.onClickToSms((0, _extends3.default)({}, contact, {
            phoneNumber: phoneNumber
          }));
        } else {
          var formatted = (0, _formatNumber2.default)({
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
          _this.props.onClickToDial((0, _extends3.default)({}, contact, {
            phoneNumber: phoneNumber
          }));
        }
      }
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

  (0, _createClass3.default)(CallItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this._mounted = true;
      this._loadingTimeout = setTimeout(function () {
        // clear timeout is probably not necessary
        if (_this3._mounted) {
          _this3.setState({
            loading: false
          });
        }
      }, 10);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this._userSelection && (nextProps.call.activityMatches !== this.props.call.activityMatches || nextProps.call.fromMatches !== this.props.call.fromMatches || nextProps.call.toMatches !== this.props.call.toMatches)) {
        this.setState({
          selected: this.getInitialContactIndex(nextProps)
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
      if (this._loadingTimeout) {
        clearTimeout(this._loadingTimeout);
        this._loadingTimeout = null;
      }
    }
  }, {
    key: 'getInitialContactIndex',
    value: function getInitialContactIndex() {
      var _this4 = this;

      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var contactMatches = this.getContactMatches(nextProps);
      var activityMatches = nextProps.call.activityMatches;
      // console.log('getInitialContactIndex:', nextProps.call.toNumberEntity);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var activity = _step.value;

          var index = contactMatches.findIndex(function (contact) {
            return (
              // TODO find a better name or mechanism...
              _this4.props.isLoggedContact(nextProps.call, activity, contact)
            );
          });
          if (index > -1) return {
              v: index
            };
        };

        for (var _iterator = (0, _getIterator3.default)(activityMatches), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ret = _loop();

          if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
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
    key: 'getPhoneNumber',
    value: function getPhoneNumber() {
      return (0, _callLogHelpers.isInbound)(this.props.call) ? this.props.call.from.phoneNumber || this.props.call.from.extensionNumber : this.props.call.to.phoneNumber || this.props.call.to.extensionNumber;
    }
  }, {
    key: 'getContactMatches',
    value: function getContactMatches() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      return (0, _callLogHelpers.isInbound)(nextProps.call) ? nextProps.call.fromMatches : nextProps.call.toMatches;
    }
  }, {
    key: 'getFallbackContactName',
    value: function getFallbackContactName() {
      return (0, _callLogHelpers.isInbound)(this.props.call) ? this.props.call.from.name : this.props.call.to.name;
    }
  }, {
    key: 'logCall',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref5) {
        var _ref5$redirect = _ref5.redirect,
            redirect = _ref5$redirect === undefined ? true : _ref5$redirect,
            selected = _ref5.selected;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(typeof this.props.onLogCall === 'function' && this._mounted && !this.state.isLogging)) {
                  _context2.next = 5;
                  break;
                }

                this.setState({
                  isLogging: true
                });
                _context2.next = 4;
                return this.props.onLogCall({
                  contact: this.getSelectedContact(selected),
                  call: this.props.call,
                  redirect: redirect
                });

              case 4:
                if (this._mounted) {
                  this.setState({
                    isLogging: false
                  });
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function logCall(_x5) {
        return _ref4.apply(this, arguments);
      }

      return logCall;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      if (this.state.loading) {
        return _react2.default.createElement('div', { className: _styles2.default.root });
      }
      var _props = this.props,
          _props$call = _props.call,
          direction = _props$call.direction,
          telephonyStatus = _props$call.telephonyStatus,
          result = _props$call.result,
          startTime = _props$call.startTime,
          duration = _props$call.duration,
          activityMatches = _props$call.activityMatches,
          offset = _props$call.offset,
          brand = _props.brand,
          currentLocale = _props.currentLocale,
          areaCode = _props.areaCode,
          countryCode = _props.countryCode,
          disableLinks = _props.disableLinks,
          disableClickToDial = _props.disableClickToDial,
          outboundSmsPermission = _props.outboundSmsPermission,
          internalSmsPermission = _props.internalSmsPermission,
          active = _props.active,
          onViewContact = _props.onViewContact,
          onCreateContact = _props.onCreateContact,
          onLogCall = _props.onLogCall,
          onClickToDial = _props.onClickToDial,
          onClickToSms = _props.onClickToSms,
          dateTimeFormatter = _props.dateTimeFormatter,
          isLogging = _props.isLogging,
          enableContactFallback = _props.enableContactFallback,
          showContactDisplayPlaceholder = _props.showContactDisplayPlaceholder,
          sourceIcons = _props.sourceIcons;

      var phoneNumber = this.getPhoneNumber();
      var contactMatches = this.getContactMatches();
      var fallbackContactName = this.getFallbackContactName();
      var ringing = (0, _callLogHelpers.isRinging)(this.props.call);
      var missed = (0, _callLogHelpers.isInbound)(this.props.call) && (0, _callLogHelpers.isMissed)(this.props.call);
      var parsedInfo = (0, _parseNumber2.default)(phoneNumber);
      var isExtension = !parsedInfo.hasPlus && parsedInfo.number.length <= 6;
      var showClickToSms = !!(onClickToSms && (isExtension ? internalSmsPermission : outboundSmsPermission));

      var durationEl = void 0;
      if (typeof duration === 'undefined') {
        durationEl = disableLinks ? _i18n2.default.getString('unavailable', currentLocale) : _react2.default.createElement(_DurationCounter2.default, { startTime: startTime, offset: offset });
      } else {
        durationEl = (0, _formatDuration2.default)(duration);
      }
      var dateEl = void 0;
      if (!active) {
        dateEl = dateTimeFormatter({ utcTimestamp: startTime });
      }
      var statusEl = void 0;
      if (active) {
        statusEl = _i18n2.default.getString(result || telephonyStatus, currentLocale);
      }
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root, onClick: this.toggleExtended },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.wrapper },
          _react2.default.createElement(CallIcon, {
            direction: direction,
            ringing: ringing,
            active: active,
            missed: missed,
            inboundTitle: _i18n2.default.getString('inboundCall', currentLocale),
            outboundTitle: _i18n2.default.getString('outboundCall', currentLocale),
            missedTitle: _i18n2.default.getString('missedCall', currentLocale)
          }),
          _react2.default.createElement(_ContactDisplay2.default, {
            reference: function reference(ref) {
              _this5.contactDisplay = ref;
            },
            className: (0, _classnames2.default)(_styles2.default.contactDisplay, missed && _styles2.default.missed, active && _styles2.default.active),
            selectClassName: _styles2.default.dropdownSelect,
            brand: brand,
            sourceIcons: sourceIcons,
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
          }),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.details },
            durationEl,
            ' | ',
            dateEl,
            statusEl
          )
        ),
        _react2.default.createElement(_ActionMenu2.default, {
          extended: this.state.extended,
          onToggle: this.toggleExtended,
          currentLocale: currentLocale,
          onLog: onLogCall && this.logCall,
          onViewEntity: onViewContact && this.viewSelectedContact,
          onCreateEntity: onCreateContact && this.createSelectedContact,
          hasEntity: !!contactMatches.length,
          onClickToDial: onClickToDial && this.clickToDial,
          onClickToSms: showClickToSms ? function () {
            return _this5.clickToSms({ countryCode: countryCode, areaCode: areaCode });
          } : undefined,
          phoneNumber: phoneNumber,
          disableLinks: disableLinks,
          disableClickToDial: disableClickToDial,
          isLogging: isLogging || this.state.isLogging,
          isLogged: activityMatches.length > 0,
          isCreating: this.state.isCreating,
          addLogTitle: _i18n2.default.getString('addLog', currentLocale),
          editLogTitle: _i18n2.default.getString('editLog', currentLocale),
          textTitle: _i18n2.default.getString('text', currentLocale),
          callTitle: _i18n2.default.getString('call', currentLocale),
          createEntityTitle: _i18n2.default.getString('addEntity', currentLocale),
          viewEntityTitle: _i18n2.default.getString('viewDetails', currentLocale)
        })
      );
    }
  }]);
  return CallItem;
}(_react.Component);

exports.default = CallItem;


CallItem.propTypes = {
  call: _propTypes2.default.shape({
    direction: _propTypes2.default.string.isRequired,
    telephonyStatus: _propTypes2.default.string,
    startTime: _propTypes2.default.number.isRequired,
    activityMatches: _propTypes2.default.array.isRequired,
    fromMatches: _propTypes2.default.array.isRequired,
    toMatches: _propTypes2.default.array.isRequired,
    from: _propTypes2.default.shape({
      phoneNumber: _propTypes2.default.string,
      extensionNumber: _propTypes2.default.string,
      name: _propTypes2.default.string
    }).isRequired,
    to: _propTypes2.default.shape({
      phoneNumber: _propTypes2.default.string,
      extensionNumber: _propTypes2.default.string,
      name: _propTypes2.default.string
    }),
    webphoneSession: _propTypes2.default.object
  }).isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  brand: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  onLogCall: _propTypes2.default.func,
  onViewContact: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  onClickToDial: _propTypes2.default.func,
  onClickToSms: _propTypes2.default.func,
  isLoggedContact: _propTypes2.default.func,
  disableLinks: _propTypes2.default.bool,
  disableClickToDial: _propTypes2.default.bool,
  outboundSmsPermission: _propTypes2.default.bool,
  internalSmsPermission: _propTypes2.default.bool,
  active: _propTypes2.default.bool.isRequired,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  isLogging: _propTypes2.default.bool,
  enableContactFallback: _propTypes2.default.bool,
  autoLog: _propTypes2.default.bool,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object
};

CallItem.defaultProps = {
  onLogCall: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
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
  sourceIcons: undefined
};
//# sourceMappingURL=index.js.map
