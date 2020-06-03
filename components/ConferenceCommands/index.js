"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Button = function Button(_ref) {
  var text = _ref.text;
  return /*#__PURE__*/_react["default"].createElement("span", {
    key: text,
    className: _styles["default"].button
  }, text);
};

Button.propTypes = {
  text: _propTypes["default"].string.isRequired
};

var Section = function Section(_ref2) {
  var buttons = _ref2.buttons,
      title = _ref2.title,
      body = _ref2.body;
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: buttons.join(''),
    className: _styles["default"].section
  }, buttons.map(function (b) {
    return /*#__PURE__*/_react["default"].createElement(Button, {
      text: b,
      key: b
    });
  }), /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].title
  }, title), body.split('\n').map(function (line) {
    return /*#__PURE__*/_react["default"].createElement("p", {
      key: line,
      className: _styles["default"].body
    }, line);
  }));
};

Section.propTypes = {
  title: _propTypes["default"].string.isRequired,
  buttons: _propTypes["default"].array.isRequired,
  body: _propTypes["default"].string.isRequired
};

var sections = function sections(currentLocale) {
  return [{
    buttons: ['*', '#', '2'],
    title: _i18n["default"].getString('starSharp2Title', currentLocale),
    body: _i18n["default"].getString('starSharp2Body', currentLocale)
  }, {
    buttons: ['*', '#', '3'],
    title: _i18n["default"].getString('starSharp3Title', currentLocale),
    body: _i18n["default"].getString('starSharp3Body', currentLocale)
  }, {
    buttons: ['*', '#', '4'],
    title: _i18n["default"].getString('starSharp4Title', currentLocale),
    body: _i18n["default"].getString('starSharp4Body', currentLocale)
  }, {
    buttons: ['*', '#', '5'],
    title: _i18n["default"].getString('starSharp5Title', currentLocale),
    body: _i18n["default"].getString('starSharp5Body', currentLocale)
  }, {
    buttons: ['*', '#', '6'],
    title: _i18n["default"].getString('starSharp6Title', currentLocale),
    body: _i18n["default"].getString('starSharp6Body', currentLocale)
  }, {
    buttons: ['*', '#', '7'],
    title: _i18n["default"].getString('starSharp7Title', currentLocale),
    body: _i18n["default"].getString('starSharp7Body', currentLocale)
  }, {
    buttons: ['*', '#', '8'],
    title: _i18n["default"].getString('starSharp8Title', currentLocale),
    body: _i18n["default"].getString('starSharp8Body', currentLocale)
  }, {
    buttons: ['*', '9'],
    title: _i18n["default"].getString('star9Title', currentLocale),
    body: _i18n["default"].getString('star9Body', currentLocale)
  }];
};

var ConferenceCommands = function ConferenceCommands(_ref3) {
  var currentLocale = _ref3.currentLocale,
      onBack = _ref3.onBack;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
    onBackClick: onBack
  }, _i18n["default"].getString('title', currentLocale)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].conferenceCommands
  }, sections(currentLocale).map(function (s) {
    return /*#__PURE__*/_react["default"].createElement(Section, {
      key: s.title,
      buttons: s.buttons,
      title: s.title,
      body: s.body
    });
  })));
};

ConferenceCommands.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  onBack: _propTypes["default"].func.isRequired
};
var _default = ConferenceCommands;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
