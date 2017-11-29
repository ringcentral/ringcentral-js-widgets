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

var _presenceStatus = require('ringcentral-integration/modules/Presence/presenceStatus');

var _presenceStatus2 = _interopRequireDefault(_presenceStatus);

var _dndStatus = require('ringcentral-integration/modules/Presence/dndStatus');

var _dndStatus2 = _interopRequireDefault(_dndStatus);

var _IconLine = require('../IconLine');

var _IconLine2 = _interopRequireDefault(_IconLine);

var _Line = require('../Line');

var _Line2 = _interopRequireDefault(_Line);

var _Switch = require('../Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _PresenceStatusIcon = require('../PresenceStatusIcon');

var _PresenceStatusIcon2 = _interopRequireDefault(_PresenceStatusIcon);

var _PresenceItem = require('../PresenceItem');

var _PresenceItem2 = _interopRequireDefault(_PresenceItem);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PresenceSettingSection = function (_Component) {
  (0, _inherits3.default)(PresenceSettingSection, _Component);

  function PresenceSettingSection(props) {
    (0, _classCallCheck3.default)(this, PresenceSettingSection);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PresenceSettingSection.__proto__ || (0, _getPrototypeOf2.default)(PresenceSettingSection)).call(this, props));

    _this.state = {
      showSelects: props.showPresenceSettings
    };

    _this.toggleShow = function () {
      _this.setState(function (preState) {
        return {
          showSelects: !preState.showSelects
        };
      });
    };

    _this.onCallQueueChange = function () {
      if (_this.state.dndStatus === _dndStatus2.default.doNotAcceptAnyCalls) {
        return;
      }
      _this.setState(function (preState) {
        return {
          dndStatus: preState.dndStatus === _dndStatus2.default.takeAllCalls ? _dndStatus2.default.doNotAcceptDepartmentCalls : _dndStatus2.default.takeAllCalls
        };
      });
      _this.props.toggleAcceptCallQueueCalls();
    };
    return _this;
  }

  (0, _createClass3.default)(PresenceSettingSection, [{
    key: 'render',
    value: function render() {
      var sectionClass = (0, _classnames2.default)(_styles2.default.section, this.state.showSelects ? _styles2.default.showDropdown : null);
      var acceptQueueCalls = this.props.isCallQueueMember ? _react2.default.createElement(
        _IconLine2.default,
        {
          icon: _react2.default.createElement(_Switch2.default, {
            checked: this.props.dndStatus === _dndStatus2.default.takeAllCalls,
            onChange: this.onCallQueueChange
          })
        },
        _i18n2.default.getString('acceptQueueCalls', this.props.currentLocale)
      ) : null;
      var currentStatus = (0, _PresenceItem.getPresenceStatusName)(this.props.userStatus, this.props.dndStatus, this.props.currentLocale);
      return _react2.default.createElement(
        'section',
        { className: sectionClass },
        _react2.default.createElement(
          _IconLine2.default,
          {
            icon: _react2.default.createElement(
              'span',
              { className: _styles2.default.dropdownIcon },
              _react2.default.createElement('i', { className: _DynamicsFont2.default.arrow })
            ),
            onClick: this.toggleShow,
            className: _styles2.default.iconLine
          },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.title },
            _i18n2.default.getString('status', this.props.currentLocale)
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.subTitle },
            _react2.default.createElement(_PresenceStatusIcon2.default, {
              className: _styles2.default.statusIcon,
              userStatus: this.props.userStatus,
              dndStatus: this.props.dndStatus
            }),
            _react2.default.createElement(
              'span',
              null,
              currentStatus
            )
          )
        ),
        _react2.default.createElement(
          _Line2.default,
          { className: _styles2.default.presenceList },
          _react2.default.createElement(_PresenceItem2.default, {
            userStatus: _presenceStatus2.default.available,
            currentLocale: this.props.currentLocale,
            onClick: this.props.setAvailable,
            selected: this.props.userStatus === _presenceStatus2.default.available
          }),
          _react2.default.createElement(_PresenceItem2.default, {
            userStatus: _presenceStatus2.default.busy,
            dndStatus: _dndStatus2.default.takeAllCalls,
            currentLocale: this.props.currentLocale,
            onClick: this.props.setBusy,
            selected: this.props.userStatus === _presenceStatus2.default.busy && this.props.dndStatus !== _dndStatus2.default.doNotAcceptAnyCalls
          }),
          _react2.default.createElement(_PresenceItem2.default, {
            userStatus: _presenceStatus2.default.busy,
            dndStatus: _dndStatus2.default.doNotAcceptAnyCalls,
            currentLocale: this.props.currentLocale,
            onClick: this.props.setDoNotDisturb,
            selected: this.props.userStatus === _presenceStatus2.default.busy && this.props.dndStatus === _dndStatus2.default.doNotAcceptAnyCalls
          }),
          _react2.default.createElement(_PresenceItem2.default, {
            userStatus: _presenceStatus2.default.offline,
            currentLocale: this.props.currentLocale,
            onClick: this.props.setInvisible,
            selected: this.props.userStatus === _presenceStatus2.default.offline
          })
        ),
        acceptQueueCalls
      );
    }
  }]);
  return PresenceSettingSection;
}(_react.Component);

exports.default = PresenceSettingSection;


PresenceSettingSection.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  dndStatus: _propTypes2.default.string.isRequired,
  userStatus: _propTypes2.default.string.isRequired,
  isCallQueueMember: _propTypes2.default.bool.isRequired,
  setAvailable: _propTypes2.default.func.isRequired,
  setBusy: _propTypes2.default.func.isRequired,
  setDoNotDisturb: _propTypes2.default.func.isRequired,
  setInvisible: _propTypes2.default.func.isRequired,
  toggleAcceptCallQueueCalls: _propTypes2.default.func.isRequired,
  showPresenceSettings: _propTypes2.default.bool.isRequired
};
//# sourceMappingURL=index.js.map
