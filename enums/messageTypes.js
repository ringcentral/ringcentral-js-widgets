"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageTypes = exports["default"] = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var messageTypes = _ObjectMap.ObjectMap.fromObject({
  all: 'All',
  fax: 'Fax',
  sms: 'SMS',
  voiceMail: 'VoiceMail',
  pager: 'Pager',
  text: 'Text'
});

exports.messageTypes = messageTypes;
var _default = messageTypes;
exports["default"] = _default;
//# sourceMappingURL=messageTypes.js.map
