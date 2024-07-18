"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStagedState = exports.setStagedModule = exports.getStagedState = exports.getStagedModule = void 0;
var stagedState;
var stagedModule;
var getStagedState = function getStagedState() {
  return stagedState;
};
exports.getStagedState = getStagedState;
var setStagedState = function setStagedState(state) {
  stagedState = state;
};
exports.setStagedState = setStagedState;
var getStagedModule = function getStagedModule() {
  return stagedModule;
};
exports.getStagedModule = getStagedModule;
var setStagedModule = function setStagedModule(module) {
  stagedModule = module;
};
exports.setStagedModule = setStagedModule;
//# sourceMappingURL=stagedState.js.map
