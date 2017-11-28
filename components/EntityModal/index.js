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

var _Modal = require('../Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntityModal = function (_Component) {
  (0, _inherits3.default)(EntityModal, _Component);

  function EntityModal(props) {
    (0, _classCallCheck3.default)(this, EntityModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EntityModal.__proto__ || (0, _getPrototypeOf2.default)(EntityModal)).call(this, props));

    _this.state = {
      selected: props.entities[0]
    };

    _this.onCancel = function () {
      if (typeof _this.props.onCancel === 'function') {
        _this.props.onCancel();
      }
    };
    _this.onCreate = function () {
      if (typeof _this.props.onCreate === 'function') {
        _this.props.onCreate(_this.state.selected);
      }
    };
    _this.onRadioChange = function (e) {
      _this.setState({
        selected: e.target.value
      });
    };
    return _this;
  }

  (0, _createClass3.default)(EntityModal, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          entities = _props.entities,
          show = _props.show,
          currentLocale = _props.currentLocale;

      return _react2.default.createElement(
        _Modal2.default,
        {
          show: show,
          title: _i18n2.default.getString('chooseEntity', currentLocale),
          onConfirm: this.onCreate,
          onCancel: this.onCancel,
          textConfirm: _i18n2.default.getString('create', currentLocale),
          currentLocale: currentLocale,
          clickOutToClose: true },
        entities.map(function (entityType, idx) {
          return _react2.default.createElement(
            'div',
            { className: _styles2.default.radio, key: idx },
            _react2.default.createElement(
              'label',
              null,
              _react2.default.createElement('input', {
                type: 'radio',
                value: entityType,
                checked: entityType === _this2.state.selected,
                onChange: _this2.onRadioChange
              }),
              _i18n2.default.getString('' + entityType, currentLocale)
            )
          );
        })
      );
    }
  }]);
  return EntityModal;
}(_react.Component);

exports.default = EntityModal;

EntityModal.propTypes = {
  show: _propTypes2.default.bool,
  onCreate: _propTypes2.default.func.isRequired,
  onCancel: _propTypes2.default.func.isRequired,
  entities: _propTypes2.default.array,
  currentLocale: _propTypes2.default.string.isRequired
};
EntityModal.defaultProps = {
  show: false,
  entities: ['account', 'lead', 'contact']
};
//# sourceMappingURL=index.js.map
