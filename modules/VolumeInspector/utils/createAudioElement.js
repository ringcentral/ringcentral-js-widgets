"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAudioElement = void 0;
var createAudioElement = exports.createAudioElement = function createAudioElement() {
  var audioElement = document.createElement('audio');
  audioElement.hidden = true;
  document.body.appendChild(audioElement);
  return audioElement;
};
//# sourceMappingURL=createAudioElement.js.map
