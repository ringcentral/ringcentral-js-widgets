'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactMarkdown = require('react-markdown');

var _reactMarkdown2 = _interopRequireDefault(_reactMarkdown);

var _reactEmojione = require('react-emojione');

var _reactEmojione2 = _interopRequireDefault(_reactEmojione);

var _emojione = require('../../assets/images/emojione.png');

var _emojione2 = _interopRequireDefault(_emojione);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ImageRender(props) {
  if (props.alt === ':Person' || props.alt === ':Team') {
    if (typeof props.atRender === 'function') {
      var AtRender = props.atRender;
      return _react2.default.createElement(AtRender, { id: props.src, type: props.alt.replace(':', '') });
    }
    return _react2.default.createElement(
      'a',
      { href: '#' + props.src },
      '@',
      props.src
    );
  }
  return _react2.default.createElement('img', { src: props.src, alt: props.alt });
}

ImageRender.propTypes = {
  src: _propTypes2.default.string.isRequired,
  alt: _propTypes2.default.string,
  atRender: _propTypes2.default.func
};

ImageRender.defaultProps = {
  alt: undefined,
  atRender: undefined
};

function LinkRender(props) {
  return _react2.default.createElement(
    'a',
    { target: '_blank', rel: 'noopener noreferrer', href: props.href, title: props.title },
    props.children
  );
}

LinkRender.propTypes = {
  href: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.node.isRequired,
  title: _propTypes2.default.string
};

LinkRender.defaultProps = {
  title: undefined
};

function TextRender(props) {
  var children = props.children.map(function (child) {
    if (child && child.split) {
      return child.split('\n').reduce(function (lines, line) {
        if (lines.length > 0) {
          lines.push(_react2.default.createElement('br', null));
        }
        lines.push(line);
        return lines;
      }, []);
    }
    return child;
  });
  return _react2.default.createElement(
    'p',
    null,
    _react2.default.createElement(
      _reactEmojione2.default,
      {
        style: {
          backgroundImage: 'url("' + _emojione2.default + '")'
        }
      },
      children
    )
  );
}

TextRender.propTypes = {
  children: _propTypes2.default.node.isRequired
};

function Markdown(_ref) {
  var className = _ref.className,
      text = _ref.text,
      atRender = _ref.atRender;

  var renderers = {
    image: function image(props) {
      return _react2.default.createElement(ImageRender, (0, _extends3.default)({}, props, { atRender: atRender }));
    },
    link: LinkRender,
    paragraph: TextRender
  };
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, className) },
    _react2.default.createElement(_reactMarkdown2.default, {
      className: _styles2.default['markdown-body'],
      source: text,
      renderers: renderers
    })
  );
  /* eslint-enable */
}

Markdown.propTypes = {
  className: _propTypes2.default.string,
  text: _propTypes2.default.string.isRequired,
  atRender: _propTypes2.default.func
};

Markdown.defaultProps = {
  className: undefined,
  atRender: undefined
};

exports.default = Markdown;
//# sourceMappingURL=index.js.map
