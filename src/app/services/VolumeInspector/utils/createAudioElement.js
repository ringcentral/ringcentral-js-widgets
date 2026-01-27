"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAudioElement = void 0;
require("core-js/modules/esnext.global-this.js");
var createAudioElement = exports.createAudioElement = function createAudioElement() {
  var audioElement = globalThis.document.createElement('audio');
  audioElement.hidden = true;
  globalThis.document.body.appendChild(audioElement);
  return audioElement;
};
//# sourceMappingURL=createAudioElement.js.map
