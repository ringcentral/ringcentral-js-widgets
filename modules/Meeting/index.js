'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getDefaultMeetingSettings = exports.MeetingType = exports.UTC_TIMEZONE_ID = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _dec, _class, _desc, _value, _class2;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _background = require('../../lib/background');

var _background2 = _interopRequireDefault(_background);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _scheduleStatus = require('./scheduleStatus');

var _scheduleStatus2 = _interopRequireDefault(_scheduleStatus);

var _meetingStatus = require('./meetingStatus');

var _meetingStatus2 = _interopRequireDefault(_meetingStatus);

var _getMeetingReducer = require('./getMeetingReducer');

var _getMeetingReducer2 = _interopRequireDefault(_getMeetingReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var UTC_TIMEZONE_ID = exports.UTC_TIMEZONE_ID = '1';
var MeetingType = exports.MeetingType = {
  SCHEDULED: 'Scheduled',
  RECURRING: 'Recurring',
  INSTANT: 'Instant'
};

// Basic default meeting type information
var getDefaultMeetingSettings = exports.getDefaultMeetingSettings = function getDefaultMeetingSettings(extensionName, startTime) {
  return {
    topic: extensionName + '\'s Meeting',
    meetingType: MeetingType.SCHEDULED,
    password: null,
    schedule: {
      startTime: startTime,
      durationInMinutes: 60,
      timeZone: {
        id: UTC_TIMEZONE_ID
      }
    },
    host: {
      id: null
    },
    allowJoinBeforeHost: false,
    startHostVideo: false,
    startParticipantsVideo: false,
    audioOptions: ['Phone', 'ComputerAudio'],
    _requireMeetingPassword: false,
    _showDate: false,
    _showTime: false,
    _saved: false
  };
};

var MeetingErrors = function () {
  function MeetingErrors(type) {
    (0, _classCallCheck3.default)(this, MeetingErrors);

    this._errors = [];
    if (type) this._errors.push({ message: type });
  }

  (0, _createClass3.default)(MeetingErrors, [{
    key: 'push',
    value: function push(type) {
      if (type) this._errors.push({ message: type });
    }
  }, {
    key: 'all',
    get: function get() {
      return this._errors;
    }
  }, {
    key: 'length',
    get: function get() {
      return this._errors.length;
    }
  }]);
  return MeetingErrors;
}();

var Meeting = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', 'ExtensionInfo', 'Storage', { dep: 'MeetingOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(Meeting, _RcModule);

  function Meeting(_ref) {
    var alert = _ref.alert,
        client = _ref.client,
        extensionInfo = _ref.extensionInfo,
        storage = _ref.storage,
        options = (0, _objectWithoutProperties3.default)(_ref, ['alert', 'client', 'extensionInfo', 'storage']);
    (0, _classCallCheck3.default)(this, Meeting);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Meeting.__proto__ || (0, _getPrototypeOf2.default)(Meeting)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: options.actionTypes || _actionTypes2.default
    })));

    _this._alert = alert;
    _this._client = client;
    _this._extensionInfo = extensionInfo;
    _this._storage = storage;
    _this._reducer = (0, _getMeetingReducer2.default)(_this.actionTypes);
    _this._lastMeetingSettingKey = 'lastMeetingSetting';
    _this._storage.registerReducer({
      key: _this._lastMeetingSettingKey,
      reducer: (0, _getMeetingReducer.getMeetingStorageReducer)(_this.actionTypes)
    });
    return _this;
  }

  (0, _createClass3.default)(Meeting, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this._init();
      } else if (this._shouldReset()) {
        this._reset();
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._alert.ready && this._storage.ready && this._extensionInfo.ready && this.pending;
    }
  }, {
    key: '_init',
    value: function _init() {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._alert.ready || !this._storage.ready || !this._extensionInfo.ready) && this.ready;
    }
  }, {
    key: '_reset',
    value: function _reset() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }

    /**
     * Init basic meeting information
     * also load meeting settings from previous one.
     */

  }, {
    key: 'init',
    value: function init() {
      this._initMeeting();
    }
  }, {
    key: 'reload',
    value: function reload() {
      this._initMeeting();
    }
  }, {
    key: '_initMeeting',
    value: function _initMeeting() {
      var extensionName = this._extensionInfo.info.name || '';
      var now = new Date();
      var startTime = now.setHours(now.getHours() + 1, 0, 0);
      this.store.dispatch({
        type: this.actionTypes.updateMeeting,
        meeting: (0, _extends3.default)({}, getDefaultMeetingSettings(extensionName, startTime), this.lastMeetingInfo)
      });
    }
  }, {
    key: 'update',
    value: function update(meeting) {
      this.store.dispatch({
        type: this.actionTypes.updateMeeting,
        meeting: meeting
      });
    }
  }, {
    key: 'getMobileDialingNumberTpl',
    value: function getMobileDialingNumberTpl(dialInNumbers, meetingId) {
      return dialInNumbers.map(function (_ref2) {
        var country = _ref2.country,
            formattedNumber = _ref2.formattedNumber,
            _ref2$location = _ref2.location,
            location = _ref2$location === undefined ? '' : _ref2$location;

        var filterFormattedNumber = formattedNumber.replace(/\s|-/g, '');
        return '+' + country.callingCode + filterFormattedNumber + ',,' + meetingId + '# ' + location;
      }).join('\n    ');
    }
  }, {
    key: 'getPhoneDialingNumberTpl',
    value: function getPhoneDialingNumberTpl(dialInNumbers) {
      return dialInNumbers.map(function (_ref3) {
        var country = _ref3.country,
            formattedNumber = _ref3.formattedNumber,
            _ref3$location = _ref3.location,
            location = _ref3$location === undefined ? '' : _ref3$location;

        var filterFormattedNumber = formattedNumber.replace(/-/g, ' ');
        return '+' + country.callingCode + ' ' + filterFormattedNumber + location;
      }).join('\n    ');
    }
  }, {
    key: 'schedule',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(meeting) {
        var _this3 = this;

        var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref5$isAlertSuccess = _ref5.isAlertSuccess,
            isAlertSuccess = _ref5$isAlertSuccess === undefined ? true : _ref5$isAlertSuccess;

        var opener = arguments[2];

        var formattedMeeting, _ref6, _ref7, resp, serviceInfo, mobileDialingNumberTpl, phoneDialingNumberTpl, result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, error, _errors$apiResponse$j, errorCode, permissionName;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.isScheduling) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', null);

              case 2:
                meeting = meeting || this.meeting;
                _context.prev = 3;

                this.store.dispatch({
                  type: this.actionTypes.initScheduling
                });
                // Validate meeting
                this._validate(meeting);
                formattedMeeting = this._format(meeting);
                _context.next = 9;
                return _promise2.default.all([this._client.account().extension().meeting().post(formattedMeeting), this._client.account().extension().meeting().serviceInfo().get()]);

              case 9:
                _ref6 = _context.sent;
                _ref7 = (0, _slicedToArray3.default)(_ref6, 2);
                resp = _ref7[0];
                serviceInfo = _ref7[1];


                this.store.dispatch({
                  type: this.actionTypes.scheduled,
                  meeting: (0, _extends3.default)({}, formattedMeeting, {
                    _saved: meeting._saved
                  })
                });
                mobileDialingNumberTpl = this.getMobileDialingNumberTpl(serviceInfo.dialInNumbers, resp.id);
                phoneDialingNumberTpl = this.getPhoneDialingNumberTpl(serviceInfo.dialInNumbers, resp.id);

                serviceInfo.mobileDialingNumberTpl = mobileDialingNumberTpl;
                serviceInfo.phoneDialingNumberTpl = phoneDialingNumberTpl;
                result = {
                  meeting: resp,
                  serviceInfo: serviceInfo,
                  extensionInfo: this.extensionInfo
                };

                if (!(typeof this.scheduledHook === 'function')) {
                  _context.next = 22;
                  break;
                }

                _context.next = 22;
                return this.scheduledHook(result, opener);

              case 22:
                // Reload meeting info
                this._initMeeting();
                // Notify user the meeting has been scheduled
                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this3._alert.info({
                      message: _meetingStatus2.default.scheduledSuccess
                    });
                  }, 50);
                }
                return _context.abrupt('return', result);

              case 27:
                _context.prev = 27;
                _context.t0 = _context['catch'](3);

                this.store.dispatch({
                  type: this.actionTypes.resetScheduling
                });

                if (!(_context.t0 instanceof MeetingErrors)) {
                  _context.next = 52;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 34;

                for (_iterator = (0, _getIterator3.default)(_context.t0.all); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  error = _step.value;

                  this._alert.warning(error);
                }
                _context.next = 42;
                break;

              case 38:
                _context.prev = 38;
                _context.t1 = _context['catch'](34);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 42:
                _context.prev = 42;
                _context.prev = 43;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 45:
                _context.prev = 45;

                if (!_didIteratorError) {
                  _context.next = 48;
                  break;
                }

                throw _iteratorError;

              case 48:
                return _context.finish(45);

              case 49:
                return _context.finish(42);

              case 50:
                _context.next = 53;
                break;

              case 52:
                if (_context.t0 && _context.t0.apiResponse) {
                  _errors$apiResponse$j = _context.t0.apiResponse.json(), errorCode = _errors$apiResponse$j.errorCode, permissionName = _errors$apiResponse$j.permissionName;

                  if (errorCode === 'InsufficientPermissions' && permissionName) {
                    this._alert.danger({
                      message: _meetingStatus2.default.insufficientPermissions,
                      payload: {
                        permissionName: permissionName
                      }
                    });
                  }
                }

              case 53:
                return _context.abrupt('return', null);

              case 54:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 27], [34, 38, 42, 50], [43,, 45, 49]]);
      }));

      function schedule(_x2) {
        return _ref4.apply(this, arguments);
      }

      return schedule;
    }()

    /**
     * Format meeting information.
     * @param {Object} meeting
     */

  }, {
    key: '_format',
    value: function _format(meeting) {
      var topic = meeting.topic,
          meetingType = meeting.meetingType,
          allowJoinBeforeHost = meeting.allowJoinBeforeHost,
          startHostVideo = meeting.startHostVideo,
          startParticipantsVideo = meeting.startParticipantsVideo,
          audioOptions = meeting.audioOptions,
          password = meeting.password,
          schedule = meeting.schedule;

      var formatted = {
        topic: topic,
        meetingType: meetingType,
        allowJoinBeforeHost: allowJoinBeforeHost,
        startHostVideo: startHostVideo,
        startParticipantsVideo: startParticipantsVideo,
        audioOptions: audioOptions
      };
      if (password) {
        formatted.password = password;
      }
      // Recurring meetings do not have schedule info
      if (meetingType !== MeetingType.RECURRING) {
        var _schedule = {
          durationInMinutes: schedule.durationInMinutes,
          timeZone: { id: UTC_TIMEZONE_ID }
        };
        if (schedule.startTime) {
          // Format selected startTime to utc standard time
          // Timezone information is not included here
          _schedule.startTime = _moment2.default.utc(schedule.startTime).format();
        }
        formatted.schedule = _schedule;
      }
      return formatted;
    }

    /**
     * Validate meeting information format.
     * @param {Object} meeting
     * @throws
     */

  }, {
    key: '_validate',
    value: function _validate(meeting) {
      if (!meeting) {
        throw new MeetingErrors(_meetingStatus2.default.invalidMeetingInfo);
      }
      var topic = meeting.topic,
          password = meeting.password,
          schedule = meeting.schedule,
          _requireMeetingPassword = meeting._requireMeetingPassword;

      var errors = new MeetingErrors();
      if (topic.length <= 0) {
        errors.push(_meetingStatus2.default.emptyTopic);
      }
      if (_requireMeetingPassword && (!password || password.length <= 0)) {
        errors.push(_meetingStatus2.default.noPassword);
      }
      if (schedule) {
        if (schedule.durationInMinutes < 0) {
          errors.push(_meetingStatus2.default.durationIncorrect);
        }
      }
      if (errors.length > 0) {
        throw errors;
      }
    }
  }, {
    key: 'extensionInfo',
    get: function get() {
      return this._extensionInfo.info;
    }
  }, {
    key: 'meeting',
    get: function get() {
      return this.state.meeting;
    }
  }, {
    key: 'lastMeetingInfo',
    get: function get() {
      var state = this._storage.getItem(this._lastMeetingSettingKey);
      return state;
    }
  }, {
    key: 'isScheduling',
    get: function get() {
      return this.state.schedulingStatus === _scheduleStatus2.default.scheduling;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }]);
  return Meeting;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'init', [_background2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'init'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'reload', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'reload'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'update', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'update'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'schedule', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'schedule'), _class2.prototype)), _class2)) || _class);
exports.default = Meeting;
//# sourceMappingURL=index.js.map
