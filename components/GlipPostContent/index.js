'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Download = require('ringcentral-widgets/assets/images/Download.svg');

var _Download2 = _interopRequireDefault(_Download);

var _isPicture = require('../../lib/isPicture');

var _isPicture2 = _interopRequireDefault(_isPicture);

var _GlipMarkdown = require('../GlipMarkdown');

var _GlipMarkdown2 = _interopRequireDefault(_GlipMarkdown);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Attachments(_ref) {
  var attachments = _ref.attachments;

  var attachmentFiles = attachments.map(function (attachment) {
    if ((0, _isPicture2.default)(attachment.contentUri)) {
      return _react2.default.createElement('img', {
        key: attachment.name,
        src: attachment.contentUri,
        alt: attachment.name,
        className: _styles2.default.attachmentImg
      });
    }
    if (attachment.type === 'Card') {
      // TODO: update message with i18n
      return 'Unsupported message';
    }
    return _react2.default.createElement(
      'a',
      {
        key: attachment.name,
        download: true,
        href: attachment.contentUri,
        className: _styles2.default.attachmentFile
      },
      attachment.name,
      _react2.default.createElement(
        'span',
        { title: 'Download', className: _styles2.default.downloadIcon },
        _react2.default.createElement(_Download2.default, { width: '18', height: '18' })
      )
    );
  });
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.attachments },
    attachmentFiles
  );
}

Attachments.propTypes = {
  attachments: _propTypes2.default.array.isRequired
};

function PostContent(_ref2) {
  var post = _ref2.post,
      className = _ref2.className,
      atRender = _ref2.atRender;

  if (!post.text && (!post.attachments || post.attachments.length === 0)) {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_styles2.default.root, className) },
      'Unsupported message'
    );
  }
  var text = post.text;
  if (text) {
    text = text.replace('[code]', '```\n').replace('[/code]', '\n```\n');
  }
  var textContent = text ? _react2.default.createElement(_GlipMarkdown2.default, { text: text, atRender: atRender }) : null;
  var attachments = post.attachments ? _react2.default.createElement(Attachments, { attachments: post.attachments }) : null;
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, className) },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.content },
      textContent,
      attachments
    )
  );
}

PostContent.propTypes = {
  post: _propTypes2.default.object.isRequired,
  className: _propTypes2.default.string,
  atRender: _propTypes2.default.func
};

PostContent.defaultProps = {
  className: undefined,
  atRender: undefined
};

exports.default = PostContent;
//# sourceMappingURL=index.js.map
