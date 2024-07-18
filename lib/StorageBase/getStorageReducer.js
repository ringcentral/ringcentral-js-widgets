"use strict";

require("core-js/modules/es.array.is-array");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataReducer = getDataReducer;
var _core = require("@ringcentral-integration/core");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function calculateInitialState(reducers) {
  var initialState = {};
  /* eslint-disable guard-for-in */
  for (var key in reducers) {
    initialState[key] = reducers[key](undefined, {});
  }
  return initialState;
}
function getDataReducer(_ref) {
  var types = _ref.types,
    reducers = _ref.reducers;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : calculateInitialState(reducers);
    var action = arguments.length > 1 ? arguments[1] : undefined;
    if (action._usm === _core.usmAction && (action.type === 'globalStorage' || action.type === 'storage')) {
      // usm-redux update data with generic reducer for globalStorage & storage.
      var _types$init$split = types.init.split('-'),
        _types$init$split2 = _slicedToArray(_types$init$split, 1),
        name = _types$init$split2[0];
      if (name === action.type) {
        // for proxy storage state
        if (action._state.target) {
          return action._state.target[action.type].data;
        }
        return action._state.data;
      }
    }
    var newState = {};
    var hasChange = false;
    // compute new sub states and check for changes
    /* eslint-disable guard-for-in */
    for (var key in reducers) {
      newState[key] = reducers[key](state[key], action);
      if (newState[key] !== state[key]) hasChange = true;
    }
    return hasChange ? newState : state;
  };
}
//# sourceMappingURL=getStorageReducer.js.map
