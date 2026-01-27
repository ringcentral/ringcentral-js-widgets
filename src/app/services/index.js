"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Auth = require("./Auth");
Object.keys(_Auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Auth[key];
    }
  });
});
var _AccountInfo = require("./AccountInfo");
Object.keys(_AccountInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AccountInfo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AccountInfo[key];
    }
  });
});
var _Analytics = require("./Analytics");
Object.keys(_Analytics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Analytics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Analytics[key];
    }
  });
});
var _PendoAnalytics = require("./PendoAnalytics");
Object.keys(_PendoAnalytics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PendoAnalytics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PendoAnalytics[key];
    }
  });
});
var _TrackPropsService = require("./TrackPropsService");
Object.keys(_TrackPropsService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TrackPropsService[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TrackPropsService[key];
    }
  });
});
var _Client = require("./Client");
Object.keys(_Client).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Client[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Client[key];
    }
  });
});
var _DataFetcher = require("./DataFetcher");
Object.keys(_DataFetcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DataFetcher[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DataFetcher[key];
    }
  });
});
var _Environment = require("./Environment");
Object.keys(_Environment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Environment[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Environment[key];
    }
  });
});
var _ExtensionFeatures = require("./ExtensionFeatures");
Object.keys(_ExtensionFeatures).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionFeatures[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionFeatures[key];
    }
  });
});
var _ExtensionInfo = require("./ExtensionInfo");
Object.keys(_ExtensionInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionInfo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionInfo[key];
    }
  });
});
var _RateLimiter = require("./RateLimiter");
Object.keys(_RateLimiter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RateLimiter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RateLimiter[key];
    }
  });
});
var _TierChecker = require("./TierChecker");
Object.keys(_TierChecker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TierChecker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TierChecker[key];
    }
  });
});
var _AvailabilityMonitor = require("./AvailabilityMonitor");
Object.keys(_AvailabilityMonitor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AvailabilityMonitor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AvailabilityMonitor[key];
    }
  });
});
var _ConnectivityMonitor = require("./ConnectivityMonitor");
Object.keys(_ConnectivityMonitor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConnectivityMonitor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConnectivityMonitor[key];
    }
  });
});
var _OAuth = require("./OAuth");
Object.keys(_OAuth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _OAuth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _OAuth[key];
    }
  });
});
var _OAuthBase = require("./OAuthBase");
Object.keys(_OAuthBase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _OAuthBase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _OAuthBase[key];
    }
  });
});
var _RingCentralExtensions = require("./RingCentralExtensions");
Object.keys(_RingCentralExtensions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RingCentralExtensions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RingCentralExtensions[key];
    }
  });
});
var _WebSocketSubscription = require("./WebSocketSubscription");
Object.keys(_WebSocketSubscription).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WebSocketSubscription[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WebSocketSubscription[key];
    }
  });
});
var _AppFeatures = require("./AppFeatures");
Object.keys(_AppFeatures).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AppFeatures[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AppFeatures[key];
    }
  });
});
var _Presence = require("./Presence");
Object.keys(_Presence).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Presence[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Presence[key];
    }
  });
});
var _ExtensionPhoneNumber = require("./ExtensionPhoneNumber");
Object.keys(_ExtensionPhoneNumber).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionPhoneNumber[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionPhoneNumber[key];
    }
  });
});
var _ExtensionDevice = require("./ExtensionDevice");
Object.keys(_ExtensionDevice).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionDevice[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionDevice[key];
    }
  });
});
var _ExtensionNumberAreaCode = require("./ExtensionNumberAreaCode");
Object.keys(_ExtensionNumberAreaCode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionNumberAreaCode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionNumberAreaCode[key];
    }
  });
});
var _DialingPlan = require("./DialingPlan");
Object.keys(_DialingPlan).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DialingPlan[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DialingPlan[key];
    }
  });
});
var _RegionSettings = require("./RegionSettings");
Object.keys(_RegionSettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RegionSettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RegionSettings[key];
    }
  });
});
var _ConnectivityManager = require("./ConnectivityManager");
Object.keys(_ConnectivityManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConnectivityManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConnectivityManager[key];
    }
  });
});
var _ErrorLogger = require("./ErrorLogger");
Object.keys(_ErrorLogger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ErrorLogger[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ErrorLogger[key];
    }
  });
});
var _NumberFormatter = require("./NumberFormatter");
Object.keys(_NumberFormatter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NumberFormatter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NumberFormatter[key];
    }
  });
});
var _Timezone = require("./Timezone");
Object.keys(_Timezone).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Timezone[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Timezone[key];
    }
  });
});
var _UserInfo = require("./UserInfo");
Object.keys(_UserInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _UserInfo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _UserInfo[key];
    }
  });
});
var _KeepBeat = require("./KeepBeat");
Object.keys(_KeepBeat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _KeepBeat[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _KeepBeat[key];
    }
  });
});
//# sourceMappingURL=index.js.map
