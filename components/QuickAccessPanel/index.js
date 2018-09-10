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

var _formatMessage = require('format-message');

var _formatMessage2 = _interopRequireDefault(_formatMessage);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _CheckBox = require('../CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OPTION_FOR_GOOGLE = 'GOOGLE';
var OPTION_FOR_ALL = 'ALL';
var OPTION_FOR_USER = 'USER';

var QuickAccessPanel = function (_Component) {
  (0, _inherits3.default)(QuickAccessPanel, _Component);

  function QuickAccessPanel(props) {
    (0, _classCallCheck3.default)(this, QuickAccessPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (QuickAccessPanel.__proto__ || (0, _getPrototypeOf2.default)(QuickAccessPanel)).call(this, props));

    _this.onConfirm = function () {
      if (_this.state.selected === 2) {
        _this.props.setOptionData({ whitelistOption: OPTION_FOR_ALL });
      } else if (_this.state.selected === 3) {
        _this.props.setOptionData({ whitelistOption: OPTION_FOR_USER });
      } else {
        _this.props.setOptionData({ whitelistOption: OPTION_FOR_GOOGLE });
      }
      _this.props.onCancel();
    };

    _this.onSelectOption = function (item) {
      _this.setState({
        selected: item.value
      });
    };

    _this.state = {
      selected: 1,
      entered: _this.props.entered || false
    };
    return _this;
  }

  (0, _createClass3.default)(QuickAccessPanel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var entered = nextProps.entered;

      if (this.state.entered !== entered) {
        this.setState({ entered: entered });
        if (entered) {
          this.props.getOptionData(function (storageData) {
            if (storageData.whitelistOption === OPTION_FOR_ALL) {
              _this2.setState({
                selected: 2
              });
            } else if (storageData.whitelistOption === OPTION_FOR_USER) {
              _this2.setState({
                selected: 3
              });
            } else {
              _this2.setState({
                selected: 1
              });
            }
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.entered) return null;
      var data = [{
        text: (0, _formatMessage2.default)(_i18n2.default.getString('textGoogle', this.props.currentLocale), { appName: this.props.appName }),
        value: 1
      }, {
        text: _i18n2.default.getString('textAll', this.props.currentLocale),
        value: 2
      }, {
        text: _i18n2.default.getString('textUser', this.props.currentLocale),
        value: 3
      }];
      var description = null;
      var extensionOptions = _i18n2.default.getString('extensionOptions', this.props.currentLocale);
      var optionsLink = _react2.default.createElement(
        'a',
        { href: '#', onClick: this.props.openOptionspage },
        extensionOptions
      );
      if (this.state.selected === 2) {
        description = _react2.default.createElement(_FormattedMessage2.default, {
          message: _i18n2.default.getString('descriptionAll', this.props.currentLocale),
          values: { optionsLink: optionsLink } });
      } else if (this.state.selected === 3) {
        description = _react2.default.createElement(_FormattedMessage2.default, {
          message: _i18n2.default.getString('descriptionUser', this.props.currentLocale),
          values: { optionsLink: optionsLink } });
      }
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, this.props.className) },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.group },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.header },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.title },
              (0, _formatMessage2.default)(_i18n2.default.getString('title', this.props.currentLocale), { brandName: this.props.brandName })
            ),
            _react2.default.createElement(
              'div',
              { className: (0, _classnames2.default)(_styles2.default.bageBox, _styles2.default[this.props.brandCode]) },
              _react2.default.createElement(
                'div',
                { className: _styles2.default.bage },
                _react2.default.createElement('div', { className: _styles2.default.presence }),
                _react2.default.createElement(
                  'div',
                  { className: _styles2.default.iconContainer },
                  _react2.default.createElement('img', { className: _styles2.default.icon, src: this.props.logoIconUrl, alt: this.props.brandName })
                )
              )
            )
          ),
          _react2.default.createElement(_CheckBox2.default, {
            className: _styles2.default.checkbox,
            valueField: 'value',
            textField: 'text',
            data: data,
            selected: this.state.selected,
            onSelect: this.onSelectOption
          }),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.description },
            ' ',
            description,
            ' '
          )
        ),
        _react2.default.createElement(
          _Button2.default,
          {
            className: _styles2.default.confirmBtn,
            onClick: this.onConfirm
          },
          _i18n2.default.getString('Confirm', this.props.currentLocale)
        ),
        _react2.default.createElement(
          _Button2.default,
          {
            className: _styles2.default.cancelBtn,
            onClick: this.props.onCancel },
          _i18n2.default.getString('Cancel', this.props.currentLocale)
        )
      );
    }
  }]);
  return QuickAccessPanel;
}(_react.Component);

exports.default = QuickAccessPanel;


QuickAccessPanel.propTypes = {
  entered: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  onCancel: _propTypes2.default.func.isRequired,
  brandName: _propTypes2.default.string,
  brandCode: _propTypes2.default.string,
  appName: _propTypes2.default.string,
  logoIconUrl: _propTypes2.default.any,
  setOptionData: _propTypes2.default.func,
  getOptionData: _propTypes2.default.func,
  openOptionspage: _propTypes2.default.func,
  currentLocale: _propTypes2.default.string.isRequired
};

QuickAccessPanel.defaultProps = {
  entered: false,
  className: '',
  brandName: 'RingCentral',
  brandCode: '',
  appName: '',
  logoIconUrl: undefined,
  setOptionData: function setOptionData() {},
  getOptionData: function getOptionData() {},

  openOptionspage: undefined
};
//# sourceMappingURL=index.js.map
