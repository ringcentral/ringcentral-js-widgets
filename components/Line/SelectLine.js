"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectLine = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _components = require("@ringcentral-integration/next-widgets/components");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["children", "disabled", "value", "options", "onChange", "classes", "border"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var SelectLine = exports.SelectLine = function SelectLine(_ref) {
  var children = _ref.children,
    disabled = _ref.disabled,
    value = _ref.value,
    options = _ref.options,
    _onChange = _ref.onChange,
    classes = _ref.classes,
    _ref$border = _ref.border,
    border = _ref$border === void 0 ? false : _ref$border,
    rest = _objectWithoutProperties(_ref, _excluded);
  var nonBorderProps = border ? {
    MenuProps: {
      PopperProps: {
        matchAnchorWidth: false
      }
    },
    className: (0, _clsx["default"])('w-full'),
    variant: 'outlined'
  } : {
    classes: {
      content: 'border-none'
    },
    className: (0, _clsx["default"])('w-full [&_.sui-form-field-focus-effect]:border-none'),
    MenuProps: {
      PopperProps: {
        offset: 0,
        matchAnchorWidth: false
      }
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_components.Line, {
    classes: classes,
    endAdornment: /*#__PURE__*/_react["default"].createElement(_springUi.Select, _extends({
      disabled: disabled,
      value: value,
      renderValue: function renderValue(value) {
        var selected = options.find(function (option) {
          return option.value === value;
        });
        return selected ? selected.label : value;
      },
      size: "medium"
      // TODO: spring-ui should support none underline style
    }, nonBorderProps, {
      onChange: function onChange(e) {
        return _onChange(e.target.value);
      }
    }, rest), options.map(function (_ref2) {
      var value = _ref2.value,
        label = _ref2.label;
      return /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
        key: value,
        value: value
      }, label);
    }))
  }, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "".concat(rest['data-sign'], "_label")
  }, children));
};
//# sourceMappingURL=SelectLine.js.map
