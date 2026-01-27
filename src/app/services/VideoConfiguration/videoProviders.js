"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoProviders = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var videoProviders = exports.videoProviders = _ObjectMap.ObjectMap.fromKeys(['RCMeetings', 'RCVideo', 'None']);
var meetingProviderTypes = {
  meeting: 'RCMeetings',
  video: 'RCVideo',
  none: 'None'
};
//# sourceMappingURL=videoProviders.js.map
