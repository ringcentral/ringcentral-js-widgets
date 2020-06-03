"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGlipPostsStatusReducer = getGlipPostsStatusReducer;
exports.getGlipPostsCreateStatusReducer = getGlipPostsCreateStatusReducer;
exports.getGlipPostsStoreReducer = getGlipPostsStoreReducer;
exports.getGlipPostsInputsReducer = getGlipPostsInputsReducer;
exports.getGlipPostsReadTimeReducer = getGlipPostsReadTimeReducer;
exports.getGlipPostsPageInfoReducer = getGlipPostsPageInfoReducer;
exports.getGlipPostsFetchTimeReducer = getGlipPostsFetchTimeReducer;
exports["default"] = getGlipPostsReducer;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.find-index");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _status = _interopRequireDefault(require("./status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getGlipPostsStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _status["default"].idle;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.fetch:
        return _status["default"].fetching;

      case types.fetchError:
      case types.fetchSuccess:
        return _status["default"].idle;

      default:
        return state;
    }
  };
}

function getGlipPostsCreateStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _status["default"].idle;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type;

    switch (type) {
      case types.create:
        return _status["default"].creating;

      case types.createError:
      case types.createSuccess:
        return _status["default"].idle;

      default:
        return state;
    }
  };
}

function getGlipPostsStoreReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        groupId = _ref3.groupId,
        records = _ref3.records,
        record = _ref3.record,
        oldRecordId = _ref3.oldRecordId,
        isSendByMe = _ref3.isSendByMe,
        lastPageToken = _ref3.lastPageToken;

    var newState;
    var newPosts;
    var oldPostIndex;

    switch (type) {
      case types.fetchSuccess:
        newState = _objectSpread({}, state);

        if (!lastPageToken) {
          newState[groupId] = records;
        } else {
          var preRecords = newState[groupId];
          newState[groupId] = [].concat(preRecords).concat(records);
        }

        return newState;

      case types.create:
      case types.createSuccess:
      case types.createError:
        newState = _objectSpread({}, state);
        newPosts = newState[groupId] && _toConsumableArray(newState[groupId]) || [];

        if (oldRecordId) {
          oldPostIndex = newPosts.findIndex(function (p) {
            return p.id === oldRecordId;
          });
        } else {
          oldPostIndex = newPosts.findIndex(function (p) {
            return p.id === record.id;
          });
        }

        if (oldPostIndex > -1) {
          newPosts.splice(oldPostIndex, 1, record);
          newState[groupId] = newPosts;
        } else if (isSendByMe) {
          oldPostIndex = newPosts.findIndex(function (p) {
            return p.creatorId === record.creatorId && p.text === record.text && p.sendStatus === _status["default"].creating;
          });

          if (oldPostIndex === -1) {
            newState[groupId] = [record].concat(newPosts.filter(function (p) {
              return p.id !== record.id;
            }));
          }
        } else {
          newState[groupId] = [record].concat(newPosts.filter(function (p) {
            return p.id !== record.id;
          }));
        }

        return newState;

      case types.resetSuccess:
        return {};

      default:
        return state;
    }
  };
}

function getGlipPostsInputsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        groupId = _ref4.groupId,
        textValue = _ref4.textValue,
        mentions = _ref4.mentions;

    var newState;

    switch (type) {
      case types.updatePostInput:
        newState = _objectSpread({}, state);
        newState[groupId] = {
          text: textValue,
          mentions: mentions
        };
        return newState;

      default:
        return state;
    }
  };
}

function getGlipPostsReadTimeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        groupId = _ref5.groupId,
        _ref5$time = _ref5.time,
        time = _ref5$time === void 0 ? Date.now() : _ref5$time;

    var newState;

    switch (type) {
      case types.updateReadTime:
        newState = _objectSpread({}, state);
        newState[groupId] = time;
        return newState;

      case types.resetSuccess:
        return {};

      default:
        return state;
    }
  };
}

function getGlipPostsPageInfoReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref6 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref6.type,
        groupId = _ref6.groupId,
        navigation = _ref6.navigation;

    var newState;

    switch (type) {
      case types.fetchSuccess:
        newState = _objectSpread({}, state);
        newState[groupId] = navigation;
        return newState;

      case types.resetSuccess:
        return {};

      default:
        return state;
    }
  };
}

function getGlipPostsFetchTimeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref7 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref7.type,
        groupId = _ref7.groupId;

    var newState;

    switch (type) {
      case types.fetchSuccess:
        newState = _objectSpread({}, state);
        newState[groupId] = Date.now();
        return newState;

      case types.resetSuccess:
        return {};

      default:
        return state;
    }
  };
}

function getGlipPostsReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _redux.combineReducers)(_objectSpread(_objectSpread({}, reducers), {}, {
    status: (0, _getModuleStatusReducer["default"])(types),
    fetchStatus: getGlipPostsStatusReducer(types),
    glipPostsStore: getGlipPostsStoreReducer(types),
    createStatus: getGlipPostsCreateStatusReducer(types),
    postInputs: getGlipPostsInputsReducer(types),
    pageInfos: getGlipPostsPageInfoReducer(types),
    fetchTimes: getGlipPostsFetchTimeReducer(types)
  }));
}
//# sourceMappingURL=getReducer.js.map
