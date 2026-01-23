"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userIdReadyKey = exports.subscribeModuleKey = exports.rehydratedKey = exports.notReadyModulesKey = exports.moduleInitTimeKey = exports.mainTabClientReload = exports.mainTabClientDelegate = exports.mainTabClientChange = exports.mainClient = exports.initializedKey = exports.initModuleKey = exports.ignoreReadyModulesKey = exports.getAppWindowSize = exports.disableRcSharedWorkerLoggerKey = exports.disableRcSharedWorkerKey = exports.depsModulesKey = exports.PortType = exports.ModuleStatus = exports.DEFAULT_APP_WINDOW_SIZE = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
var ModuleStatus = exports.ModuleStatus = /*#__PURE__*/function (ModuleStatus) {
  ModuleStatus["Pending"] = "PENDING";
  ModuleStatus["Initializing"] = "INITIALIZING";
  ModuleStatus["Ready"] = "READY";
  ModuleStatus["Resetting"] = "RESETTING";
  return ModuleStatus;
}({});
var PortType = exports.PortType = /*#__PURE__*/function (PortType) {
  PortType["Server"] = "SERVER";
  PortType["MainClient"] = "MAIN_CLIENT";
  PortType["Client"] = "CLIENT";
  return PortType;
}({});
var mainClient = exports.mainClient = 'main-client';
var initModuleKey = exports.initModuleKey = Symbol('initModule');
var subscribeModuleKey = exports.subscribeModuleKey = Symbol('subscribeModule');
var initializedKey = exports.initializedKey = Symbol('initialized');
var notReadyModulesKey = exports.notReadyModulesKey = Symbol('notReadyModules');
var depsModulesKey = exports.depsModulesKey = Symbol('depsModules');
var rehydratedKey = exports.rehydratedKey = Symbol('rehydrated');
var userIdReadyKey = exports.userIdReadyKey = Symbol('userIdReady');
var ignoreReadyModulesKey = exports.ignoreReadyModulesKey = Symbol('ignoreReadyModules');
var moduleInitTimeKey = exports.moduleInitTimeKey = Symbol('moduleInitTime');

// server port to client port
var mainTabClientDelegate = exports.mainTabClientDelegate = '@@rc:main-tab-client-delegate';
var mainTabClientReload = exports.mainTabClientReload = '@@rc:main-tab-client-reload';
// client port to server port
var mainTabClientChange = exports.mainTabClientChange = '@@rc:main-tab-client-change';

// disable shared worker storage key
var disableRcSharedWorkerKey = exports.disableRcSharedWorkerKey = 'disableRcSharedWorker';
var disableRcSharedWorkerLoggerKey = exports.disableRcSharedWorkerLoggerKey = 'disableRcSharedWorkerLogger';
var DEFAULT_APP_WINDOW_SIZE = exports.DEFAULT_APP_WINDOW_SIZE = {
  fold: {
    width: 300,
    height: 540
  },
  expand: {
    width: 600,
    height: 540
  }
};

/**
 * get the app window size when expand state changed
 * @param expanded - expand state
 * @param extraSize - extra size for add into the size if needed
 * @returns app window size
 */
var getAppWindowSize = exports.getAppWindowSize = function getAppWindowSize(expanded, extraSize) {
  var size = expanded ? DEFAULT_APP_WINDOW_SIZE.expand : DEFAULT_APP_WINDOW_SIZE.fold;
  return extraSize ? {
    width: size.width + extraSize.width,
    height: size.height + extraSize.height
  } : size;
};
//# sourceMappingURL=constant.js.map
