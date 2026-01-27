"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useActiveCallInfoWithPreinsert = useActiveCallInfoWithPreinsert;
exports.useLatestExistCall = useLatestExistCall;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _react = require("react");
var _reactantShare = require("reactant-share");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * when info is exist, means the call be connected or connecting, so need to keep the call instance to avoid the blank page render
 */
function useLatestExistCall(info) {
  var latestActiveCallRef = (0, _react.useRef)();
  if (info) {
    if (info.call) {
      latestActiveCallRef.current = info.call;
    }
  } else {
    // when info not exist, means the call be ended and be closed
    latestActiveCallRef.current = undefined;
  }
  return latestActiveCallRef.current;
}

// function usePreinsertCallInfo(callAction: CallAction) {
//   const curr = useConnector(() => callAction.preInsertCallInfoList[0]);
//   const prev = usePrevious(() => curr);

//   if (curr) return curr;

//   /**
//    * because the preinsert data flow will like below
//    *
//    * make call -> preinsert call -> call connected -> set the call be active call, so there will have a tick time that the preinsert call and active call both not exist at the same time, cause a blank page render, so need to use the latest active call to avoid that
//    */
//   const webphoneSession = prev?.call.webphoneSession;
//   if (
//     webphoneSession &&
//     webphoneSession.callStatus !== sessionStatus.finished
//   ) {
//     return prev;
//   }
// }

function useActiveCallInfoWithPreinsert(callAction) {
  var activeCallInfo = (0, _reactantShare.useConnector)(function () {
    return callAction.activeCallInfo;
  });
  var latestActiveCall = useLatestExistCall(activeCallInfo);
  // const latestPreInsertCallInfo = usePreinsertCallInfo(callAction);

  return (0, _react.useMemo)(function () {
    // when have preinsert call that be new call still connecting, always render the preinsert call, when that be connected will be remove from preinsert list
    // TODO: outbound call still not completed
    // if (
    //   // TODO: in test env we not full implement the webphone mock, should try a way to fix that in the future
    //   process.env.NODE_ENV !== 'test' &&
    //   latestPreInsertCallInfo
    // ) {
    //   return latestPreInsertCallInfo;
    // }

    if (activeCallInfo) {
      return !activeCallInfo.call ? // when active call be ended, the call will be not exist directly, but the end event still not emit to other service, like callHistory, so need to use latest call to avoid that render a blank page cause the page jump to dialer then to history, keep the call instance to avoid that
      _objectSpread(_objectSpread({}, activeCallInfo), {}, {
        call: latestActiveCall
      }) : activeCallInfo;
    }
  }, [activeCallInfo, latestActiveCall]);
}
//# sourceMappingURL=useActiveCallInfoWithPreinsert.js.map
