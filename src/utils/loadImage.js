"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadImage = loadImage;

/**
 * load image with js, use for preload image or get image info
 */
function loadImage(url) {
  return new Promise(function (resolve, reject) {
    var img = new Image();

    img.onload = function () {
      return resolve(img);
    };

    img.onerror = function () {
      return reject(new Error('Load image failed'));
    };

    img.src = url;
  });
}
//# sourceMappingURL=loadImage.js.map
