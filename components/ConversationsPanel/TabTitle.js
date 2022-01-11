"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabTitle = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _react = _interopRequireDefault(require("react"));

var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");

var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledTitle = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var $active = _ref.$active;
  return $active && (0, _newPalette.palette2)('tab', 'selected');
});

var TabTitle = function TabTitle(_ref2) {
  var type = _ref2.type,
      currentLocale = _ref2.currentLocale,
      active = _ref2.active;
  return /*#__PURE__*/_react["default"].createElement(StyledTitle, {
    $active: active,
    className: _styles["default"].tabTitle
  }, _i18n["default"].getString(type, currentLocale));
};

exports.TabTitle = TabTitle;
//# sourceMappingURL=TabTitle.js.map
