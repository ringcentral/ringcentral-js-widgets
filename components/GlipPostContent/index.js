"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Download = _interopRequireDefault(require("ringcentral-widgets/assets/images/Download.svg"));

var _isPicture = _interopRequireDefault(require("../../lib/isPicture"));

var _GlipMarkdown = _interopRequireDefault(require("../GlipMarkdown"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Attachments(_ref) {
  var attachments = _ref.attachments;
  var attachmentFiles = attachments.map(function (attachment) {
    if ((0, _isPicture["default"])(attachment.contentUri)) {
      return /*#__PURE__*/_react["default"].createElement("img", {
        key: attachment.name,
        src: attachment.contentUri,
        alt: attachment.name,
        className: _styles["default"].attachmentImg
      });
    }

    if (attachment.type === 'Card') {
      // TODO: update message with i18n
      return 'Unsupported message';
    }

    return /*#__PURE__*/_react["default"].createElement("a", {
      key: attachment.name,
      download: true,
      href: attachment.contentUri,
      className: _styles["default"].attachmentFile
    }, attachment.name, /*#__PURE__*/_react["default"].createElement("span", {
      title: "Download",
      className: _styles["default"].downloadIcon
    }, /*#__PURE__*/_react["default"].createElement(_Download["default"], {
      width: "18",
      height: "18"
    })));
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].attachments
  }, attachmentFiles);
}

Attachments.propTypes = {
  attachments: _propTypes["default"].array.isRequired
};

function PostContent(_ref2) {
  var post = _ref2.post,
      className = _ref2.className,
      atRender = _ref2.atRender;

  if (!post.text && (!post.attachments || post.attachments.length === 0)) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])(_styles["default"].root, className)
    }, "Unsupported message");
  }

  var text = post.text;

  if (text) {
    text = text.replace('[code]', '```\n').replace('[/code]', '\n```\n');
  }

  var textContent = text ? /*#__PURE__*/_react["default"].createElement(_GlipMarkdown["default"], {
    text: text,
    atRender: atRender
  }) : null;
  var attachments = post.attachments ? /*#__PURE__*/_react["default"].createElement(Attachments, {
    attachments: post.attachments
  }) : null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].content
  }, textContent, attachments));
}

PostContent.propTypes = {
  post: _propTypes["default"].object.isRequired,
  className: _propTypes["default"].string,
  atRender: _propTypes["default"].func
};
PostContent.defaultProps = {
  className: undefined,
  atRender: undefined
};
var _default = PostContent;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
