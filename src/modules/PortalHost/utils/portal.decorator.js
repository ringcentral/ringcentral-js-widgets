"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.portalKey = exports.portal = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
/* eslint-disable @typescript-eslint/no-explicit-any */
var portalKey = exports.portalKey = Symbol('portal');

/**
 * mark portal key to current instance, for do init in constructor.
 */
var portal = exports.portal = function portal(target, key, descriptor) {
  target[portalKey] = target[portalKey] || new Set();
  target[portalKey].add(key);
  return descriptor;
};
//# sourceMappingURL=portal.decorator.js.map
