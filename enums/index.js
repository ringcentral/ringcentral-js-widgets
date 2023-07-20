"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _agentScriptEvents = require("./agentScriptEvents");
Object.keys(_agentScriptEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _agentScriptEvents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _agentScriptEvents[key];
    }
  });
});
var _agentSessionEvents = require("./agentSessionEvents");
Object.keys(_agentSessionEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _agentSessionEvents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _agentSessionEvents[key];
    }
  });
});
var _agentStateTypes = require("./agentStateTypes");
Object.keys(_agentStateTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _agentStateTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _agentStateTypes[key];
    }
  });
});
var _agentStatesColors = require("./agentStatesColors");
Object.keys(_agentStatesColors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _agentStatesColors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _agentStatesColors[key];
    }
  });
});
var _agentStatesTexts = require("./agentStatesTexts");
Object.keys(_agentStatesTexts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _agentStatesTexts[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _agentStatesTexts[key];
    }
  });
});
var _loginStatus = require("./loginStatus");
Object.keys(_loginStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _loginStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loginStatus[key];
    }
  });
});
var _callStatus = require("./callStatus");
Object.keys(_callStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _callStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _callStatus[key];
    }
  });
});
var _dialoutStatus = require("./dialoutStatus");
Object.keys(_dialoutStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _dialoutStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dialoutStatus[key];
    }
  });
});
var _directTransferNotificationTypes = require("./directTransferNotificationTypes");
Object.keys(_directTransferNotificationTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _directTransferNotificationTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _directTransferNotificationTypes[key];
    }
  });
});
var _directTransferStatues = require("./directTransferStatues");
Object.keys(_directTransferStatues).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _directTransferStatues[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _directTransferStatues[key];
    }
  });
});
var _directTransferTypes = require("./directTransferTypes");
Object.keys(_directTransferTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _directTransferTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _directTransferTypes[key];
    }
  });
});
var _dropDownOptions = require("./dropDownOptions");
Object.keys(_dropDownOptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _dropDownOptions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dropDownOptions[key];
    }
  });
});
var _logTypes = require("./logTypes");
Object.keys(_logTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _logTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _logTypes[key];
    }
  });
});
var _loginTypes = require("./loginTypes");
Object.keys(_loginTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _loginTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loginTypes[key];
    }
  });
});
var _messageTypes = require("./messageTypes");
Object.keys(_messageTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _messageTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _messageTypes[key];
    }
  });
});
var _requeueEvents = require("./requeueEvents");
Object.keys(_requeueEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _requeueEvents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _requeueEvents[key];
    }
  });
});
var _sfSearchTypes = require("./sfSearchTypes");
Object.keys(_sfSearchTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _sfSearchTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sfSearchTypes[key];
    }
  });
});
var _softphoneEvents = require("./softphoneEvents");
Object.keys(_softphoneEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _softphoneEvents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _softphoneEvents[key];
    }
  });
});
var _tabManagerEvents = require("./tabManagerEvents");
Object.keys(_tabManagerEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tabManagerEvents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tabManagerEvents[key];
    }
  });
});
var _transferErrors = require("./transferErrors");
Object.keys(_transferErrors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _transferErrors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _transferErrors[key];
    }
  });
});
var _transferEvents = require("./transferEvents");
Object.keys(_transferEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _transferEvents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _transferEvents[key];
    }
  });
});
var _transferStatuses = require("./transferStatuses");
Object.keys(_transferStatuses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _transferStatuses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _transferStatuses[key];
    }
  });
});
var _transferSuccesses = require("./transferSuccesses");
Object.keys(_transferSuccesses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _transferSuccesses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _transferSuccesses[key];
    }
  });
});
var _transferTypes = require("./transferTypes");
Object.keys(_transferTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _transferTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _transferTypes[key];
    }
  });
});
var _agentTypes = require("./agentTypes");
Object.keys(_agentTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _agentTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _agentTypes[key];
    }
  });
});
//# sourceMappingURL=index.js.map
