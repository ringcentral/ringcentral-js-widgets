"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = void 0;

var _core = require("@ringcentral-integration/core");

var _di = require("./di");

/**
 * Create app with FactoryModule based on RcModuleV2.
 * !! Please ensure that all dependency injection modules are based on the RcModuleV2 module.
 */
var createApp = function createApp(Main, reduxEnhancer) {
  var main = _di.Injector.bootstrap(Main);

  var modules = main._deps;
  (0, _core.createApp)({
    main: main,
    modules: modules,
    reduxEnhancer: reduxEnhancer
  });
  return main;
};

exports.createApp = createApp;
//# sourceMappingURL=createApp.js.map
