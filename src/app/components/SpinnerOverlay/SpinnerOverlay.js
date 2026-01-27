"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpinnerOverlay = exports.LoadingOverlay = void 0;
var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");
var _CircularProgress = require("@ringcentral/juno/es6/components/Progress/CircularProgress/CircularProgress.js");
var _Loading = require("@ringcentral/juno/es6/components/Loading/Loading.js");
var _palette = require("@ringcentral/juno/es6/foundation/styles/palette.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _zIndex = require("@ringcentral/juno/es6/foundation/styles/zIndex.js");
var _react = _interopRequireDefault(require("react"));
var _templateObject;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var backgroundColor = (0, _palette.setOpacity)((0, _newPalette.palette2)('neutral', 'b01'), '40', true);
var StyledLoading = _styledComponents["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  top: 0px;\n  left: 0px;\n  background: ", ";\n  z-index: ", ";\n"])), backgroundColor, function (props) {
  return (0, _zIndex.zIndex)('tooltip')(props) + 1;
});
var LoadingOverlay = exports.LoadingOverlay = function LoadingOverlay(_ref) {
  var backgroundType = _ref.backgroundType,
    size = _ref.size,
    disableShrink = _ref.disableShrink;
  return /*#__PURE__*/_react["default"].createElement(StyledLoading, {
    backgroundType: backgroundType
  }, /*#__PURE__*/_react["default"].createElement(_CircularProgress.RcCircularProgress, {
    size: size,
    disableShrink: disableShrink
  }));
};
var SpinnerOverlay = exports.SpinnerOverlay = _Loading.RcLoading;
SpinnerOverlay.defaultProps = {
  LoadingComponent: LoadingOverlay
};
//# sourceMappingURL=SpinnerOverlay.js.map
