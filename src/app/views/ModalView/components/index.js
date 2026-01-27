"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ModalTitleWithClose = require("./ModalTitleWithClose");
Object.keys(_ModalTitleWithClose).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ModalTitleWithClose[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ModalTitleWithClose[key];
    }
  });
});
var _DialogContentReset = require("./DialogContentReset");
Object.keys(_DialogContentReset).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DialogContentReset[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DialogContentReset[key];
    }
  });
});
var _DefaultActionsFooter = require("./DefaultActionsFooter");
Object.keys(_DefaultActionsFooter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DefaultActionsFooter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DefaultActionsFooter[key];
    }
  });
});
//# sourceMappingURL=index.js.map
