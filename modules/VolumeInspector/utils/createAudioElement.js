"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAudioElement = void 0;
var createAudioElement = function createAudioElement() {
  var audioElement = document.createElement('audio');
  audioElement.hidden = true;
  document.body.appendChild(audioElement);
  return audioElement;
};
exports.createAudioElement = createAudioElement;
//# sourceMappingURL=createAudioElement.js.map
