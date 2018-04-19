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

var _callingOptions = require('ringcentral-integration/modules/CallingSettings/callingOptions');

var _callingOptions2 = _interopRequireDefault(_callingOptions);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

require('rc-tooltip/assets/bootstrap_white.css');

var _Info = require('../../assets/images/Info.svg');

var _Info2 = _interopRequireDefault(_Info);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _Switch = require('../Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _IconField = require('../IconField');

var _IconField2 = _interopRequireDefault(_IconField);

var _InputField = require('../InputField');

var _InputField2 = _interopRequireDefault(_InputField);

var _TextInput = require('../TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _DropdownSelect = require('../DropdownSelect');

var _DropdownSelect2 = _interopRequireDefault(_DropdownSelect);

var _SaveButton = require('../SaveButton');

var _SaveButton2 = _interopRequireDefault(_SaveButton);

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

    _this.onCallWithChange = function (callWith) {
      _this.setState({
        callWith: callWith,
        myLocation: _this.props.availableNumbers[callWith] && _this.props.availableNumbers[callWith][0] || '',
        ringoutPrompt: _this.defaultRingoutPrompt
      });
    };

    _this.onMyLocationChange = function (myLocation) {
      _this.setState({
        myLocation: myLocation
      });
    };

    _this.onMyLocationTextChange = function (e) {
      var myLocation = e.target.value;
      _this.setState({
        myLocation: myLocation
      });
    };

    _this.onRingoutPromptChange = function (checked) {
      _this.setState({
        ringoutPrompt: checked
      });
    };

    _this.renderHandler = function (option) {
      var brand = _this.props.brand;

      if (option === _callingOptions2.default.myphone) {
        brand = brand.replace(/\sPhone$/, '');
      }
      return (0, _formatMessage2.default)(_i18n2.default.getString(option, _this.props.currentLocale), { brand: brand });
    };

    _this.defaultRingoutPrompt = props.ringoutPrompt;
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
    key: 'getTooltipContent',
    value: function getTooltipContent() {
      var _this2 = this;

      var contentKeys = void 0;
      if (this.state.callWith === _callingOptions2.default.browser || this.state.callWith === _callingOptions2.default.softphone) {
        contentKeys = [this.state.callWith + 'Tooltip'];
      } else {
        contentKeys = [this.state.callWith + 'Tooltip', this.state.callWith + 'Tooltip1'];
      }
      return _react2.default.createElement(
        'div',
        null,
        contentKeys.map(function (contentKey) {
          return _react2.default.createElement(
            'div',
            { key: contentKey },
            (0, _formatMessage2.default)(_i18n2.default.getString(contentKey, _this2.props.currentLocale), { brand: _this2.props.brand })
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          currentLocale = _props.currentLocale,
          callWith = _props.callWith,
          callWithOptions = _props.callWithOptions,
          myLocation = _props.myLocation,
          ringoutPrompt = _props.ringoutPrompt,
          onBackButtonClick = _props.onBackButtonClick,
          availableNumbers = _props.availableNumbers,
          className = _props.className,
          disabled = _props.disabled;

      var hasChanges = this.state.callWith !== callWith || this.state.myLocation !== myLocation || this.state.ringoutPrompt !== ringoutPrompt;
      var ringout = this.state.callWith !== _callingOptions2.default.softphone && this.state.callWith !== _callingOptions2.default.browser ? _react2.default.createElement(
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
            label: _i18n2.default.getString('myLocationLabel', currentLocale) },
          availableNumbers[this.state.callWith] ? _react2.default.createElement(_DropdownSelect2.default, {
            className: (0, _classnames2.default)(_styles2.default.select, _styles2.default.locationSelect),
            value: this.state.myLocation,
            onChange: this.onMyLocationChange,
            options: availableNumbers[this.state.callWith],
            disabled: disabled,
            dropdownAlign: 'left',
            titleEnabled: true
          }) : _react2.default.createElement(_TextInput2.default, {
            value: this.state.myLocation,
            maxLength: 30,
            onChange: this.onMyLocationTextChange })
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

      var toolTip = this.getTooltipContent();
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, className) },
        _react2.default.createElement(
          _BackHeader2.default,
          {
            onBackClick: onBackButtonClick
          },
          _i18n2.default.getString('title', currentLocale)
        ),
        _react2.default.createElement(
          _Panel2.default,
          { className: _styles2.default.content },
          _react2.default.createElement(
            _InputField2.default,
            {
              label: _react2.default.createElement(
                'span',
                null,
                _i18n2.default.getString('makeCallsWith', currentLocale),
                _react2.default.createElement(
                  _rcTooltip2.default,
                  {
                    placement: 'bottom',
                    trigger: 'click',
                    overlay: toolTip,
                    align: {
                      offset: [0, 47]
                    },
                    arrowContent: _react2.default.createElement('div', { className: 'rc-tooltip-arrow-inner' }),
                    getTooltipContainer: function getTooltipContainer() {
                      return _this3.tooltipContainner;
                    }
                  },
                  _react2.default.createElement(_Info2.default, { width: 14, height: 14, className: _styles2.default.infoIcon })
                )
              ),
              noBorder: true
            },
            _react2.default.createElement(_DropdownSelect2.default, {
              className: _styles2.default.select,
              value: this.state.callWith,
              onChange: this.onCallWithChange,
              options: callWithOptions,
              dropdownAlign: 'left',
              renderFunction: this.renderHandler,
              renderValue: this.renderHandler,
              disabled: disabled,
              titleEnabled: true
            }),
            _react2.default.createElement('div', {
              className: _styles2.default.tooltipContainner,
              ref: function ref(tooltipContainner) {
                _this3.tooltipContainner = tooltipContainner;
              }
            })
          ),
          ringout,
          _react2.default.createElement(_SaveButton2.default, {
            currentLocale: currentLocale,
            onClick: this.onSave,
            disabled: !hasChanges
          })
        )
      );
    }
  }]);
  return CallingSettingsPanel;
}(_react.Component);

exports.default = CallingSettingsPanel;


CallingSettingsPanel.propTypes = {
  brand: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string.isRequired,
  callWithOptions: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  callWith: _propTypes2.default.string.isRequired,
  myLocation: _propTypes2.default.string.isRequired,
  ringoutPrompt: _propTypes2.default.bool.isRequired,
  availableNumbers: _propTypes2.default.object.isRequired,
  onBackButtonClick: _propTypes2.default.func.isRequired,
  onSave: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool
};

CallingSettingsPanel.defaultProps = {
  className: null,
  disabled: false
};
//# sourceMappingURL=index.js.map
