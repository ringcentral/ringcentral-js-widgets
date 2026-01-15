"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStagedState = exports.setStagedModule = exports.getStagedState = exports.getStagedModule = void 0;
var stagedState;
var stagedModule;
var getStagedState = exports.getStagedState = function getStagedState() {
  return stagedState;
};
var setStagedState = exports.setStagedState = function setStagedState(state) {
  stagedState = state;
};
var getStagedModule = exports.getStagedModule = function getStagedModule() {
  return stagedModule;
};
var setStagedModule = exports.setStagedModule = function setStagedModule(module) {
  stagedModule = module;
};
//# sourceMappingURL=stagedState.js.map
