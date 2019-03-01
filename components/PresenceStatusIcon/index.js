"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PresenceStatusIcon(_ref) {
  var userStatus = _ref.userStatus,
      dndStatus = _ref.dndStatus,
      presenceStatus = _ref.presenceStatus,
      className = _ref.className;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)(_styles.default.presence, _styles.default[presenceStatus || userStatus], _styles.default[dndStatus], className)
  }, _react.default.createElement("div", {
    className: _styles.default.presenceBar
  }));
}

PresenceStatusIcon.propTypes = {
  className: _propTypes.default.string,
  dndStatus: _propTypes.default.string,
  userStatus: _propTypes.default.string,
  presenceStatus: _propTypes.default.string
};
PresenceStatusIcon.defaultProps = {
  className: null,
  dndStatus: null,
  userStatus: null,
  presenceStatus: null
};
var _default = PresenceStatusIcon;
exports.default = _default;
//# sourceMappingURL=index.js.map
