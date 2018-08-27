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

var _SpinnerOverlay = require('ringcentral-widgets/components/SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _left_arrow = require('../../assets/images/left_arrow.png');

var _left_arrow2 = _interopRequireDefault(_left_arrow);

var _GlipPostList = require('../GlipPostList');

var _GlipPostList2 = _interopRequireDefault(_GlipPostList);

var _GlipChatForm = require('../GlipChatForm');

var _GlipChatForm2 = _interopRequireDefault(_GlipChatForm);

var _GlipGroupName = require('../GlipGroupName');

var _GlipGroupName2 = _interopRequireDefault(_GlipGroupName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GlipChatPage = function (_Component) {
  (0, _inherits3.default)(GlipChatPage, _Component);

  function GlipChatPage(props) {
    (0, _classCallCheck3.default)(this, GlipChatPage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GlipChatPage.__proto__ || (0, _getPrototypeOf2.default)(GlipChatPage)).call(this, props));

    _this.state = {
      inputHeight: props.mobile ? 80 : 110,
      headerHeight: props.mobile ? 38 : 50
    };
    return _this;
  }

  (0, _createClass3.default)(GlipChatPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.loadGroup(this.props.groupId);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.groupId !== nextProps.groupId) {
        this.props.loadGroup(nextProps.groupId);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          group = _props.group,
          className = _props.className,
          posts = _props.posts,
          updateText = _props.updateText,
          createPost = _props.createPost,
          textValue = _props.textValue,
          dateTimeFormatter = _props.dateTimeFormatter,
          showSpinner = _props.showSpinner,
          atRender = _props.atRender,
          uploadFile = _props.uploadFile,
          viewProfile = _props.viewProfile,
          loadNextPage = _props.loadNextPage,
          onBackClick = _props.onBackClick,
          mobile = _props.mobile;

      var spinner = showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : null;
      // TODO: update alt with i18n
      var backIcon = onBackClick ? _react2.default.createElement('img', { src: _left_arrow2.default, alt: 'Back', className: _styles2.default.backIcon, onClick: onBackClick }) : null;
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.root, className)
        },
        _react2.default.createElement(
          'div',
          {
            className: _styles2.default.header,
            style: {
              height: this.state.headerHeight,
              lineHeight: this.state.headerHeight + 'px'
            }
          },
          backIcon,
          _react2.default.createElement(_GlipGroupName2.default, { group: group, showNumber: true })
        ),
        _react2.default.createElement(
          'div',
          {
            className: _styles2.default.content,
            style: { height: 'calc(100% - ' + (this.state.inputHeight + this.state.headerHeight) + 'px)' }
          },
          _react2.default.createElement(_GlipPostList2.default, {
            posts: posts,
            atRender: atRender,
            groupId: group.id,
            showName: group.members && group.members.length > 2,
            dateTimeFormatter: dateTimeFormatter,
            viewProfile: viewProfile,
            loadNextPage: loadNextPage
          })
        ),
        _react2.default.createElement(_GlipChatForm2.default, {
          className: _styles2.default.inputArea,
          height: this.state.inputHeight,
          textValue: textValue,
          onTextChange: updateText,
          groupId: group.id,
          onSubmit: createPost,
          onUploadFile: uploadFile,
          members: group.detailMembers,
          mobile: mobile
        }),
        spinner
      );
    }
  }]);
  return GlipChatPage;
}(_react.Component);

exports.default = GlipChatPage;


GlipChatPage.propTypes = {
  className: _propTypes2.default.string,
  group: _propTypes2.default.object,
  posts: _propTypes2.default.array,
  groupId: _propTypes2.default.string,
  textValue: _propTypes2.default.string,
  showSpinner: _propTypes2.default.bool,
  loadGroup: _propTypes2.default.func.isRequired,
  updateText: _propTypes2.default.func.isRequired,
  createPost: _propTypes2.default.func.isRequired,
  uploadFile: _propTypes2.default.func.isRequired,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  atRender: _propTypes2.default.func,
  onBackClick: _propTypes2.default.func,
  viewProfile: _propTypes2.default.func.isRequired,
  loadNextPage: _propTypes2.default.func.isRequired,
  mobile: _propTypes2.default.bool
};

GlipChatPage.defaultProps = {
  className: undefined,
  groupId: null,
  group: {},
  posts: [],
  textValue: '',
  showSpinner: false,
  atRender: undefined,
  onBackClick: undefined,
  mobile: false
};
//# sourceMappingURL=index.js.map
