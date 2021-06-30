"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericMeetingPanel = void 0;

require("core-js/modules/es6.object.define-property");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _sleep = _interopRequireDefault(require("@ringcentral-integration/commons/lib/sleep"));

var _SpinnerOverlay = require("../SpinnerOverlay");

var _MeetingConfigs = _interopRequireDefault(require("../MeetingConfigs"));

var _isSafari = _interopRequireDefault(require("../../lib/isSafari"));

var _VideoConfig = require("../VideoPanel/VideoConfig");

var _InnerTopic = require("../InnerTopic");

var _MeetingConfigsV = require("../MeetingConfigsV2");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GenericMeetingPanel = function GenericMeetingPanel(props) {
  var topicRef = (0, _react.useRef)(null);
  var showCustom = props.showCustom,
      CustomPanel = props.CustomPanel;

  if (showCustom) {
    return CustomPanel;
  }

  var useRcmV2 = props.useRcmV2,
      meeting = props.meeting,
      disabled = props.disabled,
      configDisabled = props.configDisabled,
      currentLocale = props.currentLocale,
      ScheduleButton = props.scheduleButton,
      recipientsSection = props.recipientsSection,
      showTopic = props.showTopic,
      showWhen = props.showWhen,
      showDuration = props.showDuration,
      showRecurringMeeting = props.showRecurringMeeting,
      openNewWindow = props.openNewWindow,
      meetingOptionToggle = props.meetingOptionToggle,
      passwordPlaceholderEnable = props.passwordPlaceholderEnable,
      audioOptionToggle = props.audioOptionToggle,
      onOK = props.onOK,
      init = props.init,
      showSaveAsDefault = props.showSaveAsDefault,
      disableSaveAsDefault = props.disableSaveAsDefault,
      updateMeetingSettings = props.updateMeetingSettings,
      validatePasswordSettings = props.validatePasswordSettings,
      isRCM = props.isRCM,
      isRCV = props.isRCV,
      datePickerSize = props.datePickerSize,
      timePickerSize = props.timePickerSize,
      checkboxSize = props.checkboxSize,
      showLaunchMeetingBtn = props.showLaunchMeetingBtn,
      launchMeeting = props.launchMeeting,
      scheduleButtonLabel = props.scheduleButtonLabel,
      appCode = props.appCode,
      schedule = props.schedule,
      showSpinner = props.showSpinner,
      showRcvAdminLock = props.showRcvAdminLock,
      showPmiAlert = props.showPmiAlert,
      enablePersonalMeeting = props.enablePersonalMeeting,
      enableWaitingRoom = props.enableWaitingRoom,
      personalMeetingId = props.personalMeetingId,
      switchUsePersonalMeetingId = props.switchUsePersonalMeetingId,
      updateHasSettingsChanged = props.updateHasSettingsChanged,
      showScheduleOnBehalf = props.showScheduleOnBehalf,
      delegators = props.delegators,
      updateScheduleFor = props.updateScheduleFor,
      labelPlacement = props.labelPlacement,
      showSpinnerInConfigPanel = props.showSpinnerInConfigPanel,
      enableServiceWebSettings = props.enableServiceWebSettings,
      recurringMeetingPosition = props.recurringMeetingPosition,
      defaultTopic = props.defaultTopic;

  if (showSpinner) {
    return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null);
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].wrapper
  }, isRCM && !useRcmV2 && /*#__PURE__*/_react["default"].createElement(_MeetingConfigs["default"], {
    useTimePicker: true,
    update: updateMeetingSettings,
    init: init,
    meeting: meeting,
    disabled: configDisabled,
    currentLocale: currentLocale,
    recipientsSection: recipientsSection,
    showWhen: showWhen,
    showTopic: showTopic,
    showDuration: showDuration,
    showRecurringMeeting: showRecurringMeeting,
    meetingOptionToggle: meetingOptionToggle,
    passwordPlaceholderEnable: passwordPlaceholderEnable,
    audioOptionToggle: audioOptionToggle,
    enablePersonalMeeting: enablePersonalMeeting,
    personalMeetingId: personalMeetingId,
    switchUsePersonalMeetingId: switchUsePersonalMeetingId
  }), isRCM && useRcmV2 && /*#__PURE__*/_react["default"].createElement(_MeetingConfigsV.MeetingConfigs, {
    disabled: configDisabled,
    defaultTopic: defaultTopic,
    showSpinnerInConfigPanel: showSpinnerInConfigPanel,
    updateMeetingSettings: updateMeetingSettings,
    personalMeetingId: personalMeetingId,
    switchUsePersonalMeetingId: switchUsePersonalMeetingId,
    init: init,
    labelPlacement: labelPlacement,
    meeting: meeting,
    currentLocale: currentLocale,
    recipientsSection: recipientsSection,
    showTopic: showTopic,
    showWhen: showWhen,
    showDuration: showDuration,
    showRecurringMeeting: showRecurringMeeting,
    meetingOptionToggle: meetingOptionToggle,
    audioOptionToggle: audioOptionToggle,
    showScheduleOnBehalf: showScheduleOnBehalf,
    delegators: delegators,
    updateScheduleFor: updateScheduleFor,
    enableServiceWebSettings: enableServiceWebSettings,
    recurringMeetingPosition: recurringMeetingPosition,
    datePickerSize: datePickerSize,
    timePickerSize: timePickerSize,
    checkboxSize: checkboxSize
  }, showTopic && /*#__PURE__*/_react["default"].createElement(_InnerTopic.Topic, {
    name: meeting.topic,
    updateMeetingTopic: function updateMeetingTopic(topic) {
      updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), {}, {
        topic: topic
      }));
    },
    currentLocale: currentLocale,
    ref: topicRef,
    defaultTopic: defaultTopic
  })), isRCV && /*#__PURE__*/_react["default"].createElement(_VideoConfig.VideoConfig, {
    disabled: configDisabled,
    currentLocale: currentLocale,
    labelPlacement: labelPlacement,
    meeting: meeting,
    updateScheduleFor: updateScheduleFor,
    updateMeetingSettings: updateMeetingSettings,
    validatePasswordSettings: validatePasswordSettings,
    recipientsSection: recipientsSection,
    showTopic: showTopic,
    showWhen: showWhen,
    showDuration: showDuration,
    init: init,
    datePickerSize: datePickerSize,
    timePickerSize: timePickerSize,
    checkboxSize: checkboxSize,
    showRcvAdminLock: showRcvAdminLock,
    showPmiAlert: showPmiAlert,
    enableWaitingRoom: enableWaitingRoom,
    enablePersonalMeeting: enablePersonalMeeting,
    personalMeetingId: personalMeetingId,
    switchUsePersonalMeetingId: switchUsePersonalMeetingId,
    updateHasSettingsChanged: updateHasSettingsChanged,
    showScheduleOnBehalf: showScheduleOnBehalf,
    showSpinnerInConfigPanel: showSpinnerInConfigPanel,
    delegators: delegators
  }, showTopic && /*#__PURE__*/_react["default"].createElement(_InnerTopic.Topic, {
    name: meeting.name,
    updateMeetingTopic: function updateMeetingTopic(name) {
      updateMeetingSettings({
        name: name
      });
    },
    currentLocale: currentLocale,
    ref: topicRef,
    defaultTopic: defaultTopic
  })), (isRCM || isRCV) && ScheduleButton && /*#__PURE__*/_react["default"].createElement(ScheduleButton, {
    currentLocale: currentLocale,
    disabled: disabled,
    meeting: meeting,
    onOK: onOK,
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _topicRef$current, _topicRef$current2, opener, meetingSetting;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (disabled) {
                _context.next = 7;
                break;
              }

              _context.next = 3;
              return (0, _sleep["default"])(100);

            case 3:
              opener = openNewWindow && (0, _isSafari["default"])() ? window.open() : null;
              meetingSetting = isRCM ? _objectSpread(_objectSpread({}, meeting), {}, {
                topic: useRcmV2 ? (_topicRef$current = topicRef.current) === null || _topicRef$current === void 0 ? void 0 : _topicRef$current.value : meeting.topic
              }) : _objectSpread(_objectSpread({}, meeting), {}, {
                name: (_topicRef$current2 = topicRef.current) === null || _topicRef$current2 === void 0 ? void 0 : _topicRef$current2.value
              });
              _context.next = 7;
              return schedule(meetingSetting, opener);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    update: updateMeetingSettings,
    showSaveAsDefault: showSaveAsDefault,
    disableSaveAsDefault: disableSaveAsDefault,
    launchMeeting: launchMeeting,
    showLaunchMeetingBtn: showLaunchMeetingBtn,
    appCode: appCode,
    scheduleButtonLabel: scheduleButtonLabel
  }));
};

exports.GenericMeetingPanel = GenericMeetingPanel;
GenericMeetingPanel.defaultProps = {
  launchMeeting: function launchMeeting() {},
  disabled: false,
  showWhen: true,
  showTopic: true,
  showDuration: true,
  showRecurringMeeting: true,
  openNewWindow: true,
  meetingOptionToggle: false,
  passwordPlaceholderEnable: false,
  audioOptionToggle: false,
  onOK: undefined,
  scheduleButton: undefined,
  showRcvAdminLock: false,
  showPmiAlert: false,
  enableWaitingRoom: false,
  enablePersonalMeeting: false,
  showSaveAsDefault: true,
  disableSaveAsDefault: false,
  showCustom: false,
  showLaunchMeetingBtn: false,
  appCode: '',
  scheduleButtonLabel: '',
  personalMeetingId: undefined,
  showSpinner: false,
  useRcmV2: false,
  labelPlacement: 'start',
  enableServiceWebSettings: false,
  recurringMeetingPosition: 'middle'
};
//# sourceMappingURL=GenericMeetingPanel.js.map
