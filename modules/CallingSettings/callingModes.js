"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callingModes = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var callingModes = _ObjectMap.ObjectMap.prefixKeys(['softphone',
// ringcentral phone
'ringout',
// branding rc..
'webphone',
// webrtc
'jupiter',
// ringcentral (jupiter app)
'jupiterUniversalLink' // ringcentral (jupiter web)
], 'callingModes');
exports.callingModes = callingModes;
//# sourceMappingURL=callingModes.js.map
