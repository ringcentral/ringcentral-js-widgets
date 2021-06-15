"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataReducer = getDataReducer;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.regexp.split");

var _core = require("@ringcentral-integration/core");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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

        return action._state[action.type].data;
      }
    }

    var newState = {};
    var hasChange = false; // compute new sub states and check for changes

    /* eslint-disable guard-for-in */

    for (var key in reducers) {
      newState[key] = reducers[key](state[key], action);
      if (newState[key] !== state[key]) hasChange = true;
    }

    return hasChange ? newState : state;
  };
}
//# sourceMappingURL=getStorageReducer.js.map
