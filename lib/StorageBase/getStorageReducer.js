"use strict";

require("core-js/modules/es.array.is-array");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataReducer = getDataReducer;
var _core = require("@ringcentral-integration/core");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
