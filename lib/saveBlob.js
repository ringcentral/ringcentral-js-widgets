"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = saveBlob;

function saveBlob(name, blob) {
  var anchor = document.createElement('a');
  anchor.href = window.URL.createObjectURL(blob);
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
//# sourceMappingURL=saveBlob.js.map
