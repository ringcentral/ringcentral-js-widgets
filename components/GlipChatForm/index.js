'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

require('rc-tooltip/assets/bootstrap_white.css');

require('rc-editor-mention/assets/index.css');

var _rcEditorMention = require('rc-editor-mention');

var _rcEditorMention2 = _interopRequireDefault(_rcEditorMention);

var _EmojiSelect = require('../EmojiSelect');

var _EmojiSelect2 = _interopRequireDefault(_EmojiSelect);

var _emoji = require('../../assets/images/emoji.png');

var _emoji2 = _interopRequireDefault(_emoji);

var _upload = require('../../assets/images/upload.png');

var _upload2 = _interopRequireDefault(_upload);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isOnMobileDevice() {
  if (typeof navigator !== 'undefined') {
    return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i);
  }
  return false;
}

var GlipChatForm = function (_Component) {
  (0, _inherits3.default)(GlipChatForm, _Component);

  function GlipChatForm(props) {
    (0, _classCallCheck3.default)(this, GlipChatForm);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GlipChatForm.__proto__ || (0, _getPrototypeOf2.default)(GlipChatForm)).call(this, props));

    _this.state = {
      defaultValue: (0, _rcEditorMention.toEditorState)(props.textValue),
      suggestions: []
    };
    _this._onInputChange = function (editorState) {
      _this.setState({
        defaultValue: editorState
      });
      if (typeof _this.props.onTextChange === 'function') {
        var mentions = (0, _rcEditorMention.getMentions)(editorState).map(function (mention) {
          var email = mention.replace('@[', '').replace(']', '');
          var member = _this.props.members.find(function (m) {
            return m.email === email;
          });
          return {
            mention: mention,
            matcherId: member && member.id
          };
        });
        _this.props.onTextChange((0, _rcEditorMention.toString)(editorState), mentions);
      }
    };

    _this._onSearchChange = function (value) {
      var members = _this.props.members.filter(function (m) {
        var search = value && value.toLowerCase();
        if (!search) {
          return true;
        }
        var name = (m.firstName + ' ' + m.lastName).toLowerCase();
        if (name.indexOf(search) > -1) {
          return true;
        }
        if (m.email && m.email.indexOf(search) > -1) {
          return true;
        }
        return false;
      });
      var suggestions = _this._getSuggestions(members);
      _this.setState({
        suggestions: suggestions
      });
    };

    _this._onSubmit = function (e) {
      _this.props.onSubmit();
      e.preventDefault();
    };

    _this._onTextAreaKeyDown = function (e) {
      if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
        _this.props.onSubmit();
        e.preventDefault();
      }
    };

    _this._onSelectEmoji = function (emoji) {
      var newText = _this.props.textValue ? _this.props.textValue + ' ' + emoji + ' ' : emoji + ' ';
      if (typeof _this.props.onTextChange === 'function') {
        _this.props.onTextChange(newText);
      }
      _this.setState({
        defaultValue: (0, _rcEditorMention.toEditorState)(newText)
      });
      setTimeout(function () {
        if (_this._metionInput) {
          _this._metionInput.reset();
        }
      }, 10);
    };

    _this._onSelectFile = function (e) {
      var file = e.target.files[0];
      if (!file) {
        return;
      }
      var reader = new FileReader();
      reader.onloadend = function (evt) {
        if (evt.target.readyState === FileReader.DONE) {
          _this.props.onUploadFile(file.name, evt.target.result);
        }
      };
      reader.readAsArrayBuffer(file);
    };
    return _this;
  }

  (0, _createClass3.default)(GlipChatForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._autoFocus();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.members !== nextProps.members) {
        var suggestions = this._getSuggestions(nextProps.members);
        this.setState({
          suggestions: suggestions
        });
      }
      if (nextProps.groupId !== this.props.groupId) {
        var _suggestions = this._getSuggestions(nextProps.members);
        this.setState({
          suggestions: _suggestions,
          defaultValue: (0, _rcEditorMention.toEditorState)(nextProps.textValue)
        });
      }
      if (this.props.textValue !== nextProps.textValue) {
        this.setState({
          defaultValue: (0, _rcEditorMention.toEditorState)(nextProps.textValue)
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.groupId !== this.props.groupId) {
        this._autoFocus();
        if (this._metionInput) {
          this._metionInput.reset();
        }
      }
      if (this.props.textValue.length === 0 && prevProps.textValue.length > 0) {
        if (this._metionInput) {
          this._metionInput.reset();
        }
      }
    }
  }, {
    key: '_getSuggestions',
    value: function _getSuggestions(suggestions) {
      return suggestions.map(function (suggestion) {
        return _react2.default.createElement(
          _rcEditorMention.Nav,
          { style: { height: 34 }, value: '[' + suggestion.email + ']', key: suggestion.id },
          _react2.default.createElement(
            'span',
            null,
            suggestion.firstName,
            ' ',
            suggestion.lastName
          )
        );
      });
    }
  }, {
    key: '_autoFocus',
    value: function _autoFocus() {
      if (isOnMobileDevice()) {
        return;
      }
      if (this._metionInput) {
        this._metionInput._editor.focusEditor();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          placeholder = _props.placeholder,
          height = _props.height;


      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, className), style: { height: height } },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.tools },
          _react2.default.createElement(
            _rcTooltip2.default,
            {
              placement: 'top',
              trigger: 'click',
              arrowContent: _react2.default.createElement('div', { className: 'rc-tooltip-arrow-inner' }),
              overlayClassName: _styles2.default.emojisTooltip,
              overlay: _react2.default.createElement(
                'div',
                { style: { width: 325, height: 250 } },
                _react2.default.createElement(_EmojiSelect2.default, { onSelect: this._onSelectEmoji })
              )
            },
            _react2.default.createElement('img', { alt: 'emoji', src: _emoji2.default, className: _styles2.default.emoji })
          ),
          _react2.default.createElement(
            'label',
            { className: _styles2.default.file },
            _react2.default.createElement('img', { alt: 'emoji', src: _upload2.default }),
            _react2.default.createElement('input', { type: 'file', onChange: this._onSelectFile })
          )
        ),
        _react2.default.createElement(
          'form',
          { onSubmit: this._onSubmit },
          _react2.default.createElement(_rcEditorMention2.default, {
            style: { width: '100%', height: height - 35, lineHeight: '18px' },
            className: _styles2.default.mentionInput,
            ref: function ref(input) {
              _this2._metionInput = input;
            },
            placeholder: placeholder,
            placement: 'bottom',
            defaultValue: this.state.defaultValue,
            onChange: this._onInputChange,
            onSearchChange: this._onSearchChange,
            suggestions: this.state.suggestions,
            prefix: '@',
            notFoundContent: 'No found.',
            multiLines: true,
            mode: 'immutable',
            onKeyDown: this._onTextAreaKeyDown
          }),
          _react2.default.createElement('input', { type: 'submit', className: _styles2.default.submit })
        )
      );
    }
  }]);
  return GlipChatForm;
}(_react.Component);

exports.default = GlipChatForm;


GlipChatForm.propTypes = {
  textValue: _propTypes2.default.string,
  className: _propTypes2.default.string,
  onTextChange: _propTypes2.default.func,
  onSubmit: _propTypes2.default.func.isRequired,
  onUploadFile: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.string,
  groupId: _propTypes2.default.string,
  members: _propTypes2.default.array,
  height: _propTypes2.default.number
};

GlipChatForm.defaultProps = {
  className: undefined,
  textValue: '',
  onTextChange: undefined,
  placeholder: undefined,
  groupId: undefined,
  members: [],
  height: 120
};
//# sourceMappingURL=index.js.map
