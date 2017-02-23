'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _formatMessage = require('format-message');

var _formatMessage2 = _interopRequireDefault(_formatMessage);

var _callingOptions = require('ringcentral-integration/modules/CallingSettings/callingOptions');

var _callingOptions2 = _interopRequireDefault(_callingOptions);

require('font-awesome/css/font-awesome.css');

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _Header = require('../../components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Panel = require('../../components/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _Switch = require('../../components/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _IconField = require('../../components/IconField');

var _IconField2 = _interopRequireDefault(_IconField);

var _InputField = require('../../components/InputField');

var _InputField2 = _interopRequireDefault(_InputField);

var _TextInput = require('../../components/TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _Select = require('../../components/Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallingSettingsPanel = function (_Component) {
  (0, _inherits3.default)(CallingSettingsPanel, _Component);

  function CallingSettingsPanel(props) {
    (0, _classCallCheck3.default)(this, CallingSettingsPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallingSettingsPanel.__proto__ || (0, _getPrototypeOf2.default)(CallingSettingsPanel)).call(this, props));

    _this.onSave = function () {
      if (typeof _this.props.onSave === 'function') {
        var _this$state = _this.state,
            callWith = _this$state.callWith,
            myLocation = _this$state.myLocation,
            ringoutPrompt = _this$state.ringoutPrompt;

        _this.props.onSave({
          callWith: callWith,
          myLocation: myLocation,
          ringoutPrompt: ringoutPrompt
        });
      }
    };

    _this.onReset = function () {
      var _this$props = _this.props,
          callWith = _this$props.callWith,
          myLocation = _this$props.myLocation,
          ringoutPrompt = _this$props.ringoutPrompt;

      _this.setState({
        callWith: callWith,
        myLocation: myLocation,
        ringoutPrompt: ringoutPrompt
      });
    };

    _this.onCallWithChange = function (e) {
      var callWith = e.currentTarget.value;
      _this.setState({
        callWith: callWith,
        myLocation: _this.props.availableNumbers[callWith] && _this.props.availableNumbers[callWith][0] || ''
      });
    };

    _this.onMyLocationChange = function (e) {
      _this.setState({
        myLocation: e.currentTarget.value
      });
    };

    _this.onRingoutPromptChange = function (checked) {
      _this.setState({
        ringoutPrompt: checked
      });
    };

    _this.state = {
      callWith: props.callWith,
      ringoutPrompt: props.ringoutPrompt,
      myLocation: props.myLocation
    };
    return _this;
  }

  (0, _createClass3.default)(CallingSettingsPanel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.callWith !== this.props.callWith) {
        this.setState({
          callWith: newProps.callWith
        });
      }
      if (newProps.ringoutPrompt !== this.props.ringoutPrompt) {
        this.setState({
          ringoutPrompt: newProps.ringoutPrompt
        });
      }
      if (newProps.myLocation !== this.props.myLocation) {
        this.setState({
          myLocation: newProps.myLocation
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentLocale = _props.currentLocale,
          callWith = _props.callWith,
          callWithOptions = _props.callWithOptions,
          myLocation = _props.myLocation,
          ringoutPrompt = _props.ringoutPrompt,
          onBackButtonClick = _props.onBackButtonClick,
          brand = _props.brand,
          availableNumbers = _props.availableNumbers,
          className = _props.className;

      var buttons = [];
      var hasChanges = this.state.callWith !== callWith || this.state.myLocation !== myLocation || this.state.ringoutPrompt !== ringoutPrompt;
      buttons.push({
        label: _react2.default.createElement('i', { className: 'fa fa-chevron-left' }),
        onClick: onBackButtonClick,
        placement: 'left'
      });
      buttons.push({
        label: _react2.default.createElement('i', { className: 'fa fa-undo' }),
        onClick: this.onReset,
        placement: 'right',
        hidden: !hasChanges
      });
      buttons.push({
        label: _react2.default.createElement('i', { className: 'fa fa-floppy-o' }),
        onClick: this.onSave,
        placement: 'right',
        disabled: !hasChanges
      });

      var ringout = this.state.callWith !== _callingOptions2.default.softphone ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: _styles2.default.ringoutHint },
          _i18n2.default.getString('ringoutHint', currentLocale)
        ),
        _react2.default.createElement(
          _InputField2.default,
          {
            className: _styles2.default.inputField,
            label: _i18n2.default.getString('myLocationLabel', currentLocale) },
          availableNumbers[this.state.callWith] ? _react2.default.createElement(_Select2.default, {
            className: _styles2.default.select,
            value: this.state.myLocation,
            onChange: this.onMyLocationChange,
            options: availableNumbers[this.state.callWith]
          }) : _react2.default.createElement(_TextInput2.default, {
            value: this.state.myLocation,
            maxLength: 30,
            onChange: this.onMyLocationChange })
        ),
        _react2.default.createElement(
          _IconField2.default,
          {
            className: _styles2.default.iconField,
            icon: _react2.default.createElement(_Switch2.default, {
              checked: this.state.ringoutPrompt,
              onChange: this.onRingoutPromptChange
            })
          },
          _i18n2.default.getString('press1ToStartCallLabel', currentLocale)
        )
      ) : null;
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, className) },
        _react2.default.createElement(
          _Header2.default,
          { buttons: buttons },
          _i18n2.default.getString('title', currentLocale)
        ),
        _react2.default.createElement(
          _Panel2.default,
          { className: _styles2.default.content },
          _react2.default.createElement(
            _InputField2.default,
            {
              className: _styles2.default.inputField,
              label: _i18n2.default.getString('makeCallsWith', currentLocale), noBorder: true },
            _react2.default.createElement(_Select2.default, {
              className: _styles2.default.select,
              value: this.state.callWith,
              onChange: this.onCallWithChange,
              options: callWithOptions,
              renderFunction: function renderFunction(option) {
                return (0, _formatMessage2.default)(_i18n2.default.getString(option, currentLocale), { brand: brand });
              }
            })
          ),
          ringout
        )
      );
    }
  }]);
  return CallingSettingsPanel;
}(_react.Component);

exports.default = CallingSettingsPanel;


CallingSettingsPanel.propTypes = {
  brand: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string,
  currentLocale: _react.PropTypes.string.isRequired,
  callWithOptions: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
  callWith: _react.PropTypes.string.isRequired,
  myLocation: _react.PropTypes.string.isRequired,
  ringoutPrompt: _react.PropTypes.bool.isRequired,
  availableNumbers: _react.PropTypes.object.isRequired,
  onBackButtonClick: _react.PropTypes.func.isRequired,
  onSave: _react.PropTypes.func.isRequired
};
//# sourceMappingURL=index.js.map
