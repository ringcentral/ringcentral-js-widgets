"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lightningWidth = exports.classicWidth = void 0;
var _px = require("@ringcentral/juno/es6/foundation/styles/px.js");
var lightningPageWidth = 298;
var classicPageWidth = 198;
var lightningPageSpace = 16;
var classicPageSpace = 12;
// left and right both with 8
var muiMarginWidth = 16;
var lightningWidth = exports.lightningWidth = (0, _px.px)(lightningPageWidth - 2 * lightningPageSpace - muiMarginWidth);
var classicWidth = exports.classicWidth = (0, _px.px)(classicPageWidth - 2 * classicPageSpace - muiMarginWidth);
//# sourceMappingURL=tooltipUtils.js.map
