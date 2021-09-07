"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPanel = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _sleep = _interopRequireDefault(require("@ringcentral-integration/commons/lib/sleep"));

var _isSafari = _interopRequireDefault(require("../../lib/isSafari"));

var _InnerTopic = require("../InnerTopic");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _VideoConfig = require("./VideoConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/** @deprecated */
var VideoPanel = function VideoPanel(_ref) {
  var ScheduleButton = _ref.scheduleButton,
      datePickerSize = _ref.datePickerSize,
      timePickerSize = _ref.timePickerSize,
      checkboxSize = _ref.checkboxSize,
      meeting = _ref.meeting,
      hidden = _ref.hidden,
      currentLocale = _ref.currentLocale,
      onOK = _ref.onOK,
      showSaveAsDefault = _ref.showSaveAsDefault,
      disableSaveAsDefault = _ref.disableSaveAsDefault,
      disabled = _ref.disabled,
      openNewWindow = _ref.openNewWindow,
      schedule = _ref.schedule,
      updateMeetingSettings = _ref.updateMeetingSettings,
      init = _ref.init,
      recipientsSection = _ref.recipientsSection,
      showWhen = _ref.showWhen,
      showDuration = _ref.showDuration,
      brandName = _ref.brandName,
      showRcvAdminLock = _ref.showRcvAdminLock,
      showPmiAlert = _ref.showPmiAlert,
      showWaitingRoom = _ref.showWaitingRoom,
      showE2EE = _ref.showE2EE,
      isE2EEDisabled = _ref.isE2EEDisabled,
      enablePersonalMeeting = _ref.enablePersonalMeeting,
      enableJoinAfterMeCopy = _ref.enableJoinAfterMeCopy,
      personalMeetingId = _ref.personalMeetingId,
      isPersonalMeetingDisabled = _ref.isPersonalMeetingDisabled,
      configDisabled = _ref.configDisabled,
      labelPlacement = _ref.labelPlacement,
      switchUsePersonalMeetingId = _ref.switchUsePersonalMeetingId,
      updateHasSettingsChanged = _ref.updateHasSettingsChanged,
      e2eeInteractFunc = _ref.e2eeInteractFunc,
      updateScheduleFor = _ref.updateScheduleFor,
      delegators = _ref.delegators,
      joinBeforeHostLabel = _ref.joinBeforeHostLabel,
      authUserTypeValue = _ref.authUserTypeValue,
      isJoinBeforeHostDisabled = _ref.isJoinBeforeHostDisabled,
      isAuthenticatedCanJoinDisabled = _ref.isAuthenticatedCanJoinDisabled,
      isAuthUserTypeDisabled = _ref.isAuthUserTypeDisabled,
      isSignedInUsersDisabled = _ref.isSignedInUsersDisabled,
      isSignedInCoWorkersDisabled = _ref.isSignedInCoWorkersDisabled,
      isWaitingRoomNotCoworkerDisabled = _ref.isWaitingRoomNotCoworkerDisabled,
      isWaitingRoomGuestDisabled = _ref.isWaitingRoomGuestDisabled,
      isWaitingRoomAllDisabled = _ref.isWaitingRoomAllDisabled,
      isWaitingRoomDisabled = _ref.isWaitingRoomDisabled,
      isRequirePasswordDisabled = _ref.isRequirePasswordDisabled,
      showScheduleOnBehalf = _ref.showScheduleOnBehalf,
      showSpinnerInConfigPanel = _ref.showSpinnerInConfigPanel;
  var topicRef = (0, _react.useRef)(null);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].videoPanel
  }, /*#__PURE__*/_react["default"].createElement(_VideoConfig.VideoConfig, {
    currentLocale: currentLocale,
    meeting: meeting,
    updateMeetingSettings: updateMeetingSettings,
    recipientsSection: recipientsSection,
    init: init,
    showWhen: showWhen,
    showDuration: showDuration,
    brandName: brandName,
    showRcvAdminLock: showRcvAdminLock,
    showPmiAlert: showPmiAlert,
    showWaitingRoom: showWaitingRoom,
    showE2EE: showE2EE,
    isE2EEDisabled: isE2EEDisabled,
    enablePersonalMeeting: enablePersonalMeeting,
    enableJoinAfterMeCopy: enableJoinAfterMeCopy,
    personalMeetingId: personalMeetingId,
    switchUsePersonalMeetingId: switchUsePersonalMeetingId,
    updateHasSettingsChanged: updateHasSettingsChanged,
    disabled: configDisabled,
    isPersonalMeetingDisabled: isPersonalMeetingDisabled,
    labelPlacement: labelPlacement,
    e2eeInteractFunc: e2eeInteractFunc,
    updateScheduleFor: updateScheduleFor,
    datePickerSize: datePickerSize,
    timePickerSize: timePickerSize,
    checkboxSize: checkboxSize,
    isWaitingRoomNotCoworkerDisabled: isWaitingRoomNotCoworkerDisabled,
    isWaitingRoomGuestDisabled: isWaitingRoomGuestDisabled,
    isWaitingRoomAllDisabled: isWaitingRoomAllDisabled,
    isAuthUserTypeDisabled: isAuthUserTypeDisabled,
    isSignedInUsersDisabled: isSignedInUsersDisabled,
    isSignedInCoWorkersDisabled: isSignedInCoWorkersDisabled,
    showScheduleOnBehalf: showScheduleOnBehalf,
    showSpinnerInConfigPanel: showSpinnerInConfigPanel,
    delegators: delegators,
    joinBeforeHostLabel: joinBeforeHostLabel,
    authUserTypeValue: authUserTypeValue,
    isJoinBeforeHostDisabled: isJoinBeforeHostDisabled,
    isAuthenticatedCanJoinDisabled: isAuthenticatedCanJoinDisabled,
    isWaitingRoomDisabled: isWaitingRoomDisabled,
    isRequirePasswordDisabled: isRequirePasswordDisabled
  }, /*#__PURE__*/_react["default"].createElement(_InnerTopic.Topic, {
    name: meeting.name,
    updateMeetingTopic: function updateMeetingTopic(name) {
      updateMeetingSettings({
        name: name
      });
    },
    currentLocale: currentLocale,
    ref: topicRef
  })), ScheduleButton ? /*#__PURE__*/_react["default"].createElement(ScheduleButton, {
    currentLocale: currentLocale,
    hidden: hidden,
    disabled: disabled,
    meeting: meeting,
    onOK: onOK,
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _opener;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (disabled) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return (0, _sleep["default"])(100);

            case 3:
              _opener = openNewWindow && (0, _isSafari["default"])() ? window.open() : null;
              _context.next = 6;
              return schedule(_objectSpread(_objectSpread({}, meeting), {}, {
                name: topicRef.current.value
              }), _opener);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    update: updateMeetingSettings,
    showSaveAsDefault: showSaveAsDefault,
    disableSaveAsDefault: disableSaveAsDefault
  }) : null);
};

exports.VideoPanel = VideoPanel;
//# sourceMappingURL=VideoPanel.js.map
