"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDurationOptions = exports.constructPersonalMeetingLink = exports.WHO_CAN_JOIN_OPTIONS = exports.WAITING_ROOM_PARTICIPANTS_OPTIONS = exports.WAITING_ROOM_MODE = exports.MEETING_CONFIG = exports.DURATION_VALUES = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.pad-start.js");
var _utils = require("@ringcentral-integration/utils");
var _constants = require("../../services/RcVideo/constants");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var t = (0, _utils.getTranslateFn)(_i18n["default"]);
var MEETING_CONFIG = exports.MEETING_CONFIG = {
  DEFAULT_DURATION_MINUTES: 60,
  DEFAULT_MEETING_TITLE: 'RingCentral Video Meeting'
};

// Waiting Room Mode Constants (reusing existing constants)
var WAITING_ROOM_MODE = exports.WAITING_ROOM_MODE = {
  OFF: _constants.RCV_WAITING_ROOM_MODE.off,
  // 0
  ALL: _constants.RCV_WAITING_ROOM_MODE.all,
  // 1
  GUESTS: _constants.RCV_WAITING_ROOM_MODE.guests,
  // 2
  NOT_COWORKER: _constants.RCV_WAITING_ROOM_MODE.notcoworker // 3
};

// Who Can Join Options
var WHO_CAN_JOIN_OPTIONS = exports.WHO_CAN_JOIN_OPTIONS = {
  ANYONE_WITH_LINK: 'anyoneWithLink',
  ONLY_RINGCENTRAL_ACCOUNTS: 'onlyRingCentralAccounts',
  ONLY_MY_COWORKERS: 'onlyMyCoworkers'
};

// Waiting Room Participants Options
var WAITING_ROOM_PARTICIPANTS_OPTIONS = exports.WAITING_ROOM_PARTICIPANTS_OPTIONS = {
  ALL_PARTICIPANTS: 'allParticipants',
  FOR_ANYONE_OUTSIDE_MY_COMPANY: 'forAnyoneOutsideMyCompany',
  FOR_ANYONE_NOT_SIGNED_IN: 'forAnyoneNotSignedIn'
};
var DURATION_VALUES = exports.DURATION_VALUES = {
  HOURS: Array.from({
    length: 13
  }, function (_, i) {
    return i.toString().padStart(2, '0');
  }),
  MINUTES: ['00', '15', '30', '45']
};
var getDurationOptions = exports.getDurationOptions = function getDurationOptions() {
  return {
    HOURS: DURATION_VALUES.HOURS.map(function (value) {
      return {
        label: "".concat(value, " ").concat(t('hour')),
        value: value
      };
    }),
    MINUTES: DURATION_VALUES.MINUTES.map(function (value) {
      return {
        label: "".concat(value, " ").concat(t('minute')),
        value: value
      };
    })
  };
};
var constructPersonalMeetingLink = exports.constructPersonalMeetingLink = function constructPersonalMeetingLink(joinUrl) {
  return (joinUrl === null || joinUrl === void 0 ? void 0 : joinUrl.split('?')[0]) || '';
};
//# sourceMappingURL=constants.js.map
