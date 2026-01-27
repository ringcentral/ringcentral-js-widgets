"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapActionTypeToCallActions = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var actionTypeMap = new Map([['answer', 'Answer'], ['holdAndAnswer', 'Answer and hold'], ['endAndAnswer', 'Answer and end'], ['voicemail', 'Reject to voicemail'], ['startForward', 'Forward'], ['startReply', 'Reply with message'], ['ignore', 'Ignore'], ['ignoreQueue', 'Ignore'], ['mute', 'Mute'], ['unmute', 'Unmute'], ['hold', 'Hold'], ['unHold', 'Unhold'], ['startAdd', 'Added new calls'], ['startMerge', 'Merged'], ['record', 'Recorded'], ['stopRecord', 'Stop Record'], ['flip', 'Flipped'], ['startWarmTransfer', 'Warm transferred'], ['startTransfer', 'Cold transferred'], ['startTransferToVoicemail', 'Transfer to voicemail'], ['hangUp', 'End call'], ['sendDTMF', 'Keypad input'], ['park', 'Park'], ['switch', 'Switch to current device'], ['aiNotes', 'Start ai notes'], ['audio', 'Select audio device']]);
var mapActionTypeToCallActions = exports.mapActionTypeToCallActions = function mapActionTypeToCallActions(actionType) {
  var _actionTypeMap$get;
  return (_actionTypeMap$get = actionTypeMap.get(actionType)) !== null && _actionTypeMap$get !== void 0 ? _actionTypeMap$get : null;
};
//# sourceMappingURL=mapActionTypeToCallActions.js.map
