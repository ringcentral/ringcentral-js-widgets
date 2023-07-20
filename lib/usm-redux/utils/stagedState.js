"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStagedState = exports.getStagedState = void 0;
var stagedState;
var getStagedState = function getStagedState() {
  return stagedState;
};
exports.getStagedState = getStagedState;
var setStagedState = function setStagedState(state) {
  stagedState = state;
};
exports.setStagedState = setStagedState;
//# sourceMappingURL=stagedState.js.map
