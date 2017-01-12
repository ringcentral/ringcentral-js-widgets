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

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _Line = require('../Line');

var _Line2 = _interopRequireDefault(_Line);

var _IconLine = require('../IconLine');

var _IconLine2 = _interopRequireDefault(_IconLine);

var _TextInput = require('../TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _Switch = require('../Switch');

var _Switch2 = _interopRequireDefault(_Switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Environment component for switching api server. Intended only for testing.
 * This component current does not comply to use redux properly.
 */

var Environment = function (_Component) {
  (0, _inherits3.default)(Environment, _Component);

  function Environment(props) {
    (0, _classCallCheck3.default)(this, Environment);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Environment.__proto__ || (0, _getPrototypeOf2.default)(Environment)).call(this, props));

    _this.state = {
      hidden: true,
      serverValue: props.server,
      enabledValue: props.enabled
    };

    _this.onServerChange = function (e) {
      _this.setState({
        serverValue: e.currentTarget.value
      });
    };
    _this.onToggleEnabled = function (e) {
      _this.setState({
        enabledValue: !_this.state.enabledValue
      });
    };
    _this.onOk = function () {
      _this.props.onSetData({
        server: _this.state.serverValue,
        enabled: _this.state.enabledValue
      });
      _this.toggleEnv();
    };
    _this.onCancel = function () {
      _this.setState({
        serverValue: _this.props.server,
        enabledValue: _this.props.enabled
      });
      _this.toggleEnv();
    };
    _this.toggleEnv = function () {
      _this.setState({
        hidden: !_this.state.hidden
      });
    };
    if (typeof window !== 'undefined') {
      window.toggleEnv = _this.toggleEnv;
    }
    return _this;
  }

  (0, _createClass3.default)(Environment, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.server !== this.props.server) {
        this.setState({
          serverValue: nextProps.server
        });
      }
      if (nextProps.enabled !== this.props.enabled) {
        this.setState({
          enabledValue: nextProps.enabled
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.hidden) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          _Header2.default,
          {
            buttons: [{
              label: _react2.default.createElement('i', { className: 'fa fa-times' }),
              onClick: this.onCancel
            }, {
              label: _react2.default.createElement('i', { className: 'fa fa-save' }),
              onClick: this.onOk,
              disabled: this.state.serverValue === this.props.server && this.state.enabledValue === this.props.enabled,
              placement: 'right'
            }]
          },
          'Environment'
        ),
        _react2.default.createElement(
          _Panel2.default,
          { classname: _styles2.default.content },
          _react2.default.createElement(
            _Line2.default,
            null,
            'Server',
            _react2.default.createElement(_TextInput2.default, {
              value: this.state.serverValue,
              onChange: this.onServerChange
            })
          ),
          _react2.default.createElement(
            _IconLine2.default,
            {
              icon: _react2.default.createElement(_Switch2.default, {
                checked: this.state.enabledValue,
                onChange: this.onToggleEnabled
              })
            },
            'Enable'
          )
        )
      );
    }
  }]);
  return Environment;
}(_react.Component);

Environment.propTypes = {
  server: _react.PropTypes.string.isRequired,
  enabled: _react.PropTypes.bool.isRequired,
  onSetData: _react.PropTypes.func.isRequired
};

exports.default = Environment;
//# sourceMappingURL=index.js.map
