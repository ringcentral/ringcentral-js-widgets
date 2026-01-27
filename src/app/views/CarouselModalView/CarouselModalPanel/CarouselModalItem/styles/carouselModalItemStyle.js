"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.outOfViewStyle = exports.CarouselModalDialogGlobalStyle = void 0;
var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _templateObject, _templateObject2, _templateObject3;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var CarouselModalDialogGlobalStyle = exports.CarouselModalDialogGlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n\n  .carouselModal-dialog-paper {\n    overflow-y: unset;\n    border-radius: ", ";\n\n    width: ", "px;\n    height: ", "px;\n    max-width: ", "px;\n    max-height: ", "px;\n  }\n"])), function (_ref) {
  var loading = _ref.loading;
  return loading && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      .carouselModal-dialog-root {\n        pointer-events: none;\n        opacity: 0;\n\n        .RcBackdrop-root {\n          opacity: 0 !important;\n        }\n      }\n    "])));
}, (0, _spacing.spacing)(3), function (_ref2) {
  var width = _ref2.width;
  return width;
}, function (_ref3) {
  var height = _ref3.height;
  return height;
}, function (_ref4) {
  var width = _ref4.width;
  return width;
}, function (_ref5) {
  var height = _ref5.height;
  return height;
});
var outOfViewStyle = exports.outOfViewStyle = (0, _styledComponents.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 200vh;\n  left: 200vw;\n\n  iframe {\n    height: 100vh;\n    width: 100vw;\n  }\n"])));
//# sourceMappingURL=carouselModalItemStyle.js.map
