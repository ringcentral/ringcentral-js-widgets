"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ActiveCallControl = require("./ActiveCallControl");
Object.keys(_ActiveCallControl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ActiveCallControl[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ActiveCallControl[key];
    }
  });
});
var _CallHistory = require("./CallHistory");
Object.keys(_CallHistory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallHistory[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallHistory[key];
    }
  });
});
var _CallLogger = require("./CallLogger");
Object.keys(_CallLogger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLogger[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogger[key];
    }
  });
});
var _CallMonitor = require("./CallMonitor");
Object.keys(_CallMonitor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallMonitor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallMonitor[key];
    }
  });
});
var _CallerId = require("./CallerId");
Object.keys(_CallerId).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallerId[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallerId[key];
    }
  });
});
var _CallingSettings = require("./CallingSettings");
Object.keys(_CallingSettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallingSettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallingSettings[key];
    }
  });
});
var _Call = require("./Call");
Object.keys(_Call).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Call[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Call[key];
    }
  });
});
var _CallAction = require("./CallAction");
Object.keys(_CallAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallAction[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallAction[key];
    }
  });
});
var _CallLog = require("./CallLog");
Object.keys(_CallLog).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLog[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLog[key];
    }
  });
});
var _CallQueueManagement = require("./CallQueueManagement");
Object.keys(_CallQueueManagement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallQueueManagement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallQueueManagement[key];
    }
  });
});
var _ConferenceCall = require("./ConferenceCall");
Object.keys(_ConferenceCall).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConferenceCall[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConferenceCall[key];
    }
  });
});
var _Webphone = require("./Webphone");
Object.keys(_Webphone).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Webphone[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Webphone[key];
    }
  });
});
var _ForwardingNumber = require("./ForwardingNumber");
Object.keys(_ForwardingNumber).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ForwardingNumber[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ForwardingNumber[key];
    }
  });
});
var _AudioSettings = require("./AudioSettings");
Object.keys(_AudioSettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AudioSettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AudioSettings[key];
    }
  });
});
var _PreinsertCall = require("./PreinsertCall");
Object.keys(_PreinsertCall).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PreinsertCall[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PreinsertCall[key];
    }
  });
});
var _RecentCalls = require("./RecentCalls");
Object.keys(_RecentCalls).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RecentCalls[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RecentCalls[key];
    }
  });
});
var _Softphone = require("./Softphone");
Object.keys(_Softphone).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Softphone[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Softphone[key];
    }
  });
});
var _Ringout = require("./Ringout");
Object.keys(_Ringout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Ringout[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Ringout[key];
    }
  });
});
var _RingtoneConfiguration = require("./RingtoneConfiguration");
Object.keys(_RingtoneConfiguration).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RingtoneConfiguration[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RingtoneConfiguration[key];
    }
  });
});
var _VolumeInspector = require("./VolumeInspector");
Object.keys(_VolumeInspector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VolumeInspector[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VolumeInspector[key];
    }
  });
});
var _CallLogTasks = require("./CallLogTasks");
Object.keys(_CallLogTasks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLogTasks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogTasks[key];
    }
  });
});
var _CallQueues = require("./CallQueues");
Object.keys(_CallQueues).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallQueues[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallQueues[key];
    }
  });
});
//# sourceMappingURL=index.js.map
