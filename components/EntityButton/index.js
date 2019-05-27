"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EntityButton;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

var _Button = _interopRequireDefault(require("../Button"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function EntityButton(_ref) {
  var className = _ref.className,
      onViewEntity = _ref.onViewEntity,
      onCreateEntity = _ref.onCreateEntity,
      hasEntity = _ref.hasEntity,
      isCreating = _ref.isCreating,
      disableLinks = _ref.disableLinks,
      viewEntityTitle = _ref.viewEntityTitle,
      createEntityTitle = _ref.createEntityTitle;
  // console.debug('isCreating', isCreating);
  var spinner = isCreating ? _react["default"].createElement("div", {
    className: _styles["default"].spinnerContainer
  }, _react["default"].createElement(_Spinner["default"], {
    ringWidth: 2
  })) : null;
  var icon = hasEntity ? _DynamicsFont["default"].record : _DynamicsFont["default"].addEntity;
  var onClick = hasEntity ? onViewEntity : onCreateEntity;
  var title = hasEntity ? viewEntityTitle : createEntityTitle;
  return _react["default"].createElement(_Button["default"], {
    className: (0, _classnames["default"])(_styles["default"].entity, className),
    onClick: onClick,
    disabled: disableLinks,
    dataSign: title
  }, _react["default"].createElement("span", {
    className: icon,
    title: title
  }), spinner);
}

EntityButton.propTypes = {
  className: _propTypes["default"].string,
  onViewEntity: _propTypes["default"].func,
  onCreateEntity: _propTypes["default"].func,
  hasEntity: _propTypes["default"].bool,
  isCreating: _propTypes["default"].bool,
  disableLinks: _propTypes["default"].bool,
  viewEntityTitle: _propTypes["default"].string,
  createEntityTitle: _propTypes["default"].string
};
EntityButton.defaultProps = {
  className: undefined,
  onViewEntity: undefined,
  hasEntity: false,
  onCreateEntity: undefined,
  isCreating: false,
  disableLinks: false,
  viewEntityTitle: undefined,
  createEntityTitle: undefined
};
//# sourceMappingURL=index.js.map
