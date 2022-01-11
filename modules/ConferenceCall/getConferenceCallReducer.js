"use strict";

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

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
exports["default"] = getConferenceCallReducer;
exports.getConferenceCallStatusReducer = getConferenceCallStatusReducer;
exports.getCurrentConferenceIdReducer = getCurrentConferenceIdReducer;
exports.getMakeConferenceCallReducer = getMakeConferenceCallReducer;
exports.getMergingPairReducer = getMergingPairReducer;
exports.getMergingStatusReducer = getMergingStatusReducer;

require("core-js/modules/es6.object.define-property");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _conferenceCallStatus = _interopRequireDefault(require("./conferenceCallStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getConferenceCallStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _conferenceCallStatus["default"].idle;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.makeConference:
      case types.terminateConference:
      case types.updateConference:
      case types.bringInConference:
      case types.removeFromConference:
      case types.getParty:
        return _conferenceCallStatus["default"].requesting;

      case types.makeConferenceSucceeded:
      case types.makeConferenceFailed:
      case types.terminateConferenceSucceeded:
      case types.terminateConferenceFailed:
      case types.updateConferenceSucceeded:
      case types.updateConferenceFailed:
      case types.bringInConferenceSucceeded:
      case types.bringInConferenceFailed:
      case types.removeFromConferenceSucceeded:
      case types.removeFromConferenceFailed:
      case types.getPartySucceeded:
      case types.getPartyFailed:
      case types.resetSuccess:
        return _conferenceCallStatus["default"].idle;

      default:
        return state;
    }
  };
}

function getMakeConferenceCallReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        conference = _ref2.conference,
        sessionId = _ref2.sessionId,
        partyProfile = _ref2.partyProfile;

    var res = _objectSpread({}, state);

    switch (type) {
      case types.resetSuccess:
        return {};

      case types.makeConferenceSucceeded:
      case types.updateConferenceSucceeded:
        res[conference.id] = {
          conference: conference,
          sessionId: sessionId,
          profiles: res[conference.id] && res[conference.id].profiles || []
        };
        return res;

      case types.bringInConferenceSucceeded:
        res[conference.id] = {
          conference: conference,
          sessionId: sessionId,
          profiles: [].concat(_toConsumableArray(res[conference.id].profiles), [partyProfile])
        };
        return res;

      case types.terminateConferenceSucceeded:
        delete res[conference.id];
        return res;

      default:
        return state;
    }
  };
}

function getMergingStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type;

    switch (type) {
      case types.mergeStart:
        return true;

      case types.mergeSucceeded:
      case types.mergeFailed:
      case types.resetSuccess:
        return false;

      default:
        return state;
    }
  };
}
/**
 * interface MergingPairState = {fromSessionId:string, toSessionId:string}
 *
 * The `from` and `to` is relative to the [adding call](https://app.zeplin.io/project/59df2e4346294d03f96d15a9/screen/5b2c64f7db2860b90ddd5939) flow
 * which is in [RCINT-7378](https://jira.ringcentral.com/browse/RCINT-7378)
 */


function getMergingPairReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        fromSessionId = _ref4.fromSessionId,
        toSessionId = _ref4.toSessionId;

    switch (type) {
      case types.updateFromSession:
        return {
          fromSessionId: fromSessionId
        };

      case types.updateToSession:
        return _objectSpread(_objectSpread({}, state), {}, {
          toSessionId: toSessionId
        });

      case types.closeMergingPair:
      case types.mergeSucceeded:
      case types.resetSuccess:
        return {};
      // restore the pair when failure

      default:
        return state;
    }
  };
}

function getCurrentConferenceIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        conferenceId = _ref5.conferenceId;

    switch (type) {
      case types.updateCurrentConferenceId:
        return conferenceId;

      case types.initSuccess:
      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}

function getConferenceCallReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer["default"])(types),
    conferences: getMakeConferenceCallReducer(types),
    conferenceCallStatus: getConferenceCallStatusReducer(types),
    isMerging: getMergingStatusReducer(types),
    mergingPair: getMergingPairReducer(types),
    currentConferenceId: getCurrentConferenceIdReducer(types)
  });
}
//# sourceMappingURL=getConferenceCallReducer.js.map
