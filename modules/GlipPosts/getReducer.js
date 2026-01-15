"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getGlipPostsReducer;
exports.getGlipPostsCreateStatusReducer = getGlipPostsCreateStatusReducer;
exports.getGlipPostsFetchTimeReducer = getGlipPostsFetchTimeReducer;
exports.getGlipPostsInputsReducer = getGlipPostsInputsReducer;
exports.getGlipPostsPageInfoReducer = getGlipPostsPageInfoReducer;
exports.getGlipPostsReadTimeReducer = getGlipPostsReadTimeReducer;
exports.getGlipPostsStatusReducer = getGlipPostsStatusReducer;
exports.getGlipPostsStoreReducer = getGlipPostsStoreReducer;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
var _redux = require("redux");
var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));
var _status = _interopRequireDefault(require("./status"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          newState[groupId] = records;
        } else {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          var preRecords = newState[groupId];
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          newState[groupId] = [].concat(preRecords).concat(records);
        }
        return newState;
      case types.create:
      case types.createSuccess:
      case types.createError:
        newState = _objectSpread({}, state);
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          newState[groupId] = newPosts;
        } else if (isSendByMe) {
          oldPostIndex = newPosts.findIndex(function (p) {
            return p.creatorId === record.creatorId && p.text === record.text && p.sendStatus === _status["default"].creating;
          });
          if (oldPostIndex === -1) {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            newState[groupId] = [record].concat(newPosts.filter(function (p) {
              return p.id !== record.id;
            }));
          }
        } else {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
