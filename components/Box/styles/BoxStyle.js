"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxStyle = void 0;
var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");
var _flexCenter = require("@ringcentral/juno/es6/foundation/styles/flexCenter.js");
var _flexWidth = require("@ringcentral/juno/es6/foundation/styles/flexWidth.js");
var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _typography = require("@ringcentral/juno/es6/foundation/styles/typography.js");
var _templateObject, _templateObject2, _templateObject3;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var BoxStyle = exports.BoxStyle = function BoxStyle(props) {
  var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
  var m = props.m,
    p = props.p,
    mt = props.mt,
    mb = props.mb,
    ml = props.ml,
    mr = props.mr,
    mx = props.mx,
    my = props.my,
    pt = props.pt,
    pb = props.pb,
    pl = props.pl,
    pr = props.pr,
    px = props.px,
    py = props.py,
    flexWidthProp = props.flexWidth,
    typographyProp = props.typography,
    color = props.color,
    flexCenter = props.flexCenter,
    classes = props.classes;
  var _ml = (_ref = ml !== null && ml !== void 0 ? ml : mx) !== null && _ref !== void 0 ? _ref : m;
  var _mr = (_ref2 = mr !== null && mr !== void 0 ? mr : mx) !== null && _ref2 !== void 0 ? _ref2 : m;
  var _mt = (_ref3 = mt !== null && mt !== void 0 ? mt : my) !== null && _ref3 !== void 0 ? _ref3 : m;
  var _mb = (_ref4 = mb !== null && mb !== void 0 ? mb : my) !== null && _ref4 !== void 0 ? _ref4 : m;
  var _pl = (_ref5 = pl !== null && pl !== void 0 ? pl : px) !== null && _ref5 !== void 0 ? _ref5 : p;
  var _pr = (_ref6 = pr !== null && pr !== void 0 ? pr : px) !== null && _ref6 !== void 0 ? _ref6 : p;
  var _pt = (_ref7 = pt !== null && pt !== void 0 ? pt : py) !== null && _ref7 !== void 0 ? _ref7 : p;
  var _pb = (_ref8 = pb !== null && pb !== void 0 ? pb : py) !== null && _ref8 !== void 0 ? _ref8 : p;
  var typographyClassName = classes === null || classes === void 0 ? void 0 : classes.typography;
  return (0, _styledComponents.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    margin-left: ", ";\n    margin-right: ", ";\n    margin-top: ", ";\n    margin-bottom: ", ";\n\n    padding-left: ", ";\n    padding-right: ", ";\n    padding-top: ", ";\n    padding-bottom: ", ";\n\n    ", ";\n\n    ", ";\n\n    ", ";\n  "])), _ml && (0, _spacing.spacing)(_ml), _mr && (0, _spacing.spacing)(_mr), _mt && (0, _spacing.spacing)(_mt), _mb && (0, _spacing.spacing)(_mb), _pl && (0, _spacing.spacing)(_pl), _pr && (0, _spacing.spacing)(_pr), _pt && (0, _spacing.spacing)(_pt), _pb && (0, _spacing.spacing)(_pb), flexWidthProp && (0, _flexWidth.flexWidth)(flexWidthProp), typographyClassName ? (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n          .", " {\n            ", ";\n            color: ", ";\n          }\n        "])), typographyClassName, typographyProp && (0, _typography.typography)(typographyProp), color && (0, _newPalette.getParsePaletteColor)(color)) : (0, _styledComponents.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n          ", ";\n          color: ", ";\n        "])), typographyProp && (0, _typography.typography)(typographyProp), color && (0, _newPalette.getParsePaletteColor)(color)), flexCenter && _flexCenter.flexCenterStyle);
};
//# sourceMappingURL=BoxStyle.js.map
