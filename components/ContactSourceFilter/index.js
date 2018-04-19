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

exports.ContactSourceItem = ContactSourceItem;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _ContactFilter = require('../../assets/images/ContactFilter.svg');

var _ContactFilter2 = _interopRequireDefault(_ContactFilter);

var _ContactFilterSolid = require('../../assets/images/ContactFilterSolid.svg');

var _ContactFilterSolid2 = _interopRequireDefault(_ContactFilterSolid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ContactSourceItem(_ref) {
  var sourceName = _ref.sourceName,
      sourceLabel = _ref.sourceLabel,
      isSelected = _ref.isSelected,
      onSelect = _ref.onSelect;

  return _react2.default.createElement(
    'div',
    {
      onClick: function onClick() {
        return onSelect(sourceName);
      },
      className: (0, _classnames2.default)(_styles2.default.contactSourceItem, isSelected ? _styles2.default.selected : '')
    },
    sourceLabel
  );
}
ContactSourceItem.propTypes = {
  sourceName: _propTypes2.default.string.isRequired,
  sourceLabel: _propTypes2.default.string.isRequired,
  isSelected: _propTypes2.default.bool.isRequired,
  onSelect: _propTypes2.default.func.isRequired
};

var ContactSourceFilter = function (_Component) {
  (0, _inherits3.default)(ContactSourceFilter, _Component);

  function ContactSourceFilter(props) {
    (0, _classCallCheck3.default)(this, ContactSourceFilter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ContactSourceFilter.__proto__ || (0, _getPrototypeOf2.default)(ContactSourceFilter)).call(this, props));

    _this.hideList = function () {
      _this.setState(function () {
        return {
          unfold: false
        };
      });
      if (typeof _this.props.onUnfoldChange === 'function') {
        _this.props.onUnfoldChange(false);
      }
      window.removeEventListener('click', _this.hideList);
    };

    _this.showList = function () {
      _this.setState(function () {
        return {
          unfold: true
        };
      });
      window.addEventListener('click', _this.hideList);
      if (typeof _this.props.onUnfoldChange === 'function') {
        _this.props.onUnfoldChange(true);
      }
    };

    _this.togglePanel = function (evt) {
      evt.stopPropagation();
      if (!_this.state.unfold) {
        _this.showList();
        return;
      }
      _this.hideList();
    };

    _this.emitSelect = function (sourceName) {
      var onSourceSelect = _this.props.onSourceSelect;

      if (onSourceSelect) {
        onSourceSelect(sourceName);
      }
      _this.hideList();
    };

    var unfold = props.unfold !== undefined ? props.unfold : false;
    _this.state = {
      unfold: unfold
    };
    return _this;
  }

  (0, _createClass3.default)(ContactSourceFilter, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.state.unfold) {
        window.removeEventListener('click', this.hideList);
      }
    }
  }, {
    key: 'getString',
    value: function getString(key, locale) {
      return _i18n2.default.getString(key, locale);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          currentLocale = _props.currentLocale,
          contactSourceNames = _props.contactSourceNames,
          selectedSourceName = _props.selectedSourceName;


      var isAllSource = selectedSourceName === contactSourceNames[0];
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.contactSourceFilter, className),
          onClick: this.togglePanel
        },
        _react2.default.createElement(
          'div',
          {
            className: _styles2.default.filterIconContainer,
            title: this.getString(selectedSourceName, currentLocale)
          },
          isAllSource ? _react2.default.createElement(_ContactFilter2.default, {
            className: (0, _classnames2.default)(_styles2.default.filterIconNode, _styles2.default.iconNoneFill) }) : _react2.default.createElement(_ContactFilterSolid2.default, { className: _styles2.default.filterIconNode })
        ),
        !this.state.unfold ? null : _react2.default.createElement(
          'div',
          {
            className: _styles2.default.contactSourceList,
            onClick: function onClick(e) {
              return e.stopPropagation();
            }
          },
          contactSourceNames.map(function (sourceName) {
            return _react2.default.createElement(ContactSourceItem, {
              key: sourceName,
              sourceName: sourceName,
              sourceLabel: _this2.getString(sourceName, currentLocale),
              isSelected: sourceName === selectedSourceName,
              onSelect: _this2.emitSelect
            });
          })
        )
      );
    }
  }]);
  return ContactSourceFilter;
}(_react.Component);

exports.default = ContactSourceFilter;


ContactSourceFilter.propTypes = {
  className: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string.isRequired,
  onSourceSelect: _propTypes2.default.func,
  selectedSourceName: _propTypes2.default.string,
  contactSourceNames: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  unfold: _propTypes2.default.bool,
  onUnfoldChange: _propTypes2.default.func
};

ContactSourceFilter.defaultProps = {
  className: undefined,
  selectedSourceName: undefined,
  onSourceSelect: undefined,
  unfold: undefined,
  onUnfoldChange: undefined
};
//# sourceMappingURL=index.js.map
