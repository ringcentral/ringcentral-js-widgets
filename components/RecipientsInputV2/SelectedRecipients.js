"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SelectedRecipients;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _RemoveButton = _interopRequireDefault(require("../RemoveButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Recipient(_ref) {
  var phoneNumber = _ref.phoneNumber,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? phoneNumber : _ref$name,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? name : _ref$title,
      onRemove = _ref.onRemove;
  var className = phoneNumber.length > 5 ? _styles["default"].phoneNumber : _styles["default"].extension;
  return _react["default"].createElement("li", {
    className: className,
    title: title
  }, _react["default"].createElement("span", null, name), _react["default"].createElement(_RemoveButton["default"], {
    className: _styles["default"].removeReceiver,
    onClick: onRemove,
    visibility: true
  }));
}

Recipient.propTypes = {
  name: _propTypes["default"].string,
  onRemove: _propTypes["default"].func.isRequired,
  phoneNumber: _propTypes["default"].string.isRequired,
  title: _propTypes["default"].string
};
Recipient.defaultProps = {
  name: undefined,
  title: undefined
};

function SelectedRecipients(_ref2) {
  var recipients = _ref2.recipients,
      _onRemove = _ref2.onRemove,
      className = _ref2.className;

  if (recipients.length) {
    return _react["default"].createElement("ul", {
      className: (0, _classnames["default"])(className, _styles["default"].selectReceivers)
    }, recipients.map(function (item) {
      return _react["default"].createElement(Recipient, {
        key: item.phoneNumber,
        name: item.name,
        phoneNumber: item.phoneNumber,
        onRemove: function onRemove() {
          return _onRemove(item.phoneNumber);
        }
      });
    }));
  }

  return null;
}

SelectedRecipients.propTypes = {
  onRemove: _propTypes["default"].func.isRequired,
  recipients: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string.isRequired,
    name: _propTypes["default"].string
  })).isRequired,
  className: _propTypes["default"].string
};
SelectedRecipients.defaultProps = {
  className: undefined
};
//# sourceMappingURL=SelectedRecipients.js.map
