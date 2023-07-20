"use strict";

require("core-js/modules/es.array.iterator");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.url");
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
