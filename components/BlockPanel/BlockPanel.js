"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockPanel = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _juno = require("@ringcentral/juno");

var _SpinnerOverlay = require("../SpinnerOverlay");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var BlockPanel = function BlockPanel(_ref) {
  var block = _ref.block,
      rest = _objectWithoutProperties(_ref, ["block"]);

  if (!block) return null;
  var _block$classes = block.classes,
      classes = _block$classes === void 0 ? {} : _block$classes;
  return block && /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, _extends({
    classes: (0, _juno.combineProps)(classes, {
      container: _styles["default"].spinner
    }),
    custom: function custom() {
      return /*#__PURE__*/_react["default"].createElement(_juno.RcCircularProgress, {
        size: 40
      });
    }
  }, rest));
};

exports.BlockPanel = BlockPanel;
BlockPanel.defaultProps = {};
//# sourceMappingURL=BlockPanel.js.map
