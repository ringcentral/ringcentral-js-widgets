'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function getMeidaCls(str) {
  return _styles2.default['media' + capitalize(str)];
}

function MediaObject(_ref) {
  var _classnames;

  var containerCls = _ref.containerCls,
      mediaLeft = _ref.mediaLeft,
      mediaBody = _ref.mediaBody,
      mediaRight = _ref.mediaRight,
      leftCls = _ref.leftCls,
      bodyCls = _ref.bodyCls,
      rightCls = _ref.rightCls,
      mediaHeading = _ref.mediaHeading,
      headingCls = _ref.headingCls,
      leftAlignment = _ref.leftAlignment,
      bodyAlignment = _ref.bodyAlignment,
      rightAlignment = _ref.rightAlignment,
      flexible = _ref.flexible;

  var leftAlignmentClassName = getMeidaCls(leftAlignment);
  var rightAlignmentClassName = getMeidaCls(rightAlignment);
  var bodyAlignmentClassName = getMeidaCls(bodyAlignment);

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, _styles2.default.media, true), (0, _defineProperty3.default)(_classnames, _styles2.default.flex, !!flexible), (0, _defineProperty3.default)(_classnames, containerCls, !!containerCls), _classnames)) },
    mediaLeft ? _react2.default.createElement(
      'div',
      { className: (0, _classnames3.default)(_styles2.default.mediaLeft, leftAlignmentClassName, leftCls) },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.mediaObject },
        mediaLeft
      )
    ) : null,
    _react2.default.createElement(
      'div',
      { className: (0, _classnames3.default)(_styles2.default.mediaBody, bodyAlignmentClassName, bodyCls) },
      mediaHeading ? _react2.default.createElement(
        'h4',
        { className: (0, _classnames3.default)(_styles2.default.mediaHeading, headingCls) },
        mediaHeading
      ) : null,
      mediaBody
    ),
    mediaRight ? _react2.default.createElement(
      'div',
      { className: (0, _classnames3.default)(_styles2.default.mediaRight, rightAlignmentClassName, rightCls) },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.mediaObject },
        mediaRight
      )
    ) : null
  );
}

MediaObject.propTypes = {
  containerCls: _propTypes2.default.string,
  mediaLeft: _propTypes2.default.element,
  mediaBody: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]),
  mediaRight: _propTypes2.default.element,
  mediaHeading: _propTypes2.default.string,
  leftCls: _propTypes2.default.string,
  bodyCls: _propTypes2.default.string,
  rightCls: _propTypes2.default.string,
  headingCls: _propTypes2.default.string,
  leftAlignment: _propTypes2.default.oneOf(['top', 'middle', 'bottom']),
  bodyAlignment: _propTypes2.default.oneOf(['top', 'middle', 'bottom']),
  rightAlignment: _propTypes2.default.oneOf(['top', 'middle', 'bottom']),
  flexible: _propTypes2.default.bool
};

MediaObject.defaultProps = {
  containerCls: null,
  mediaLeft: null,
  mediaBody: null,
  mediaRight: null,
  mediaHeading: null,
  leftCls: null,
  bodyCls: null,
  rightCls: null,
  headingCls: null,
  leftAlignment: 'middle',
  bodyAlignment: 'middle',
  rightAlignment: 'middle',
  flexible: true
};

exports.default = MediaObject;
//# sourceMappingURL=index.js.map
