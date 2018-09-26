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

var _debounce = require('ringcentral-integration/lib/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _CallAvatar = require('../CallAvatar');

var _CallAvatar2 = _interopRequireDefault(_CallAvatar);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAXIMUM_AVATARS = 4;

var WIDTH_PER_AVATAR = parseInt(_styles2.default.conferenceAvatarSize, 0); // 51

var AVATAR_MERGIN_LEFT = parseInt(_styles2.default.avatarMerginLeftSize, 0); // -20
var PEDDING_WIDTH = parseInt(_styles2.default.avatarPaddingSize, 0); // 15

var minWidthCalculator = function minWidthCalculator(count) {
  return WIDTH_PER_AVATAR * count + AVATAR_MERGIN_LEFT * (count - 1) + PEDDING_WIDTH * 2 + 1 + 2;
};

// when the container width reachs below item of width, display the avatar amount of count.
var KINDS_OF_WIDTH_THAT_NEED_ADAPATER = [{ avartarCount: 0, width: minWidthCalculator(1) }, { avartarCount: 1, width: minWidthCalculator(3) }, { avartarCount: 2, width: minWidthCalculator(MAXIMUM_AVATARS) }, { avartarCount: 3, width: minWidthCalculator(MAXIMUM_AVATARS + 1) }];

var ConferenceInfo = function (_Component) {
  (0, _inherits3.default)(ConferenceInfo, _Component);

  function ConferenceInfo(props) {
    (0, _classCallCheck3.default)(this, ConferenceInfo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConferenceInfo.__proto__ || (0, _getPrototypeOf2.default)(ConferenceInfo)).call(this, props));

    _this.onWindowResize = (0, _debounce2.default)(function () {
      _this.updateAvatarAmounts(_this.props);
    }, 100);

    _this.state = {
      avatarCount: MAXIMUM_AVATARS
    };

    _this._container = _react2.default.createRef();
    return _this;
  }

  (0, _createClass3.default)(ConferenceInfo, [{
    key: '_computeAvatarCountByWindowWidth',
    value: function _computeAvatarCountByWindowWidth(props) {
      var partyProfiles = props.partyProfiles;

      var avatarProfilesCount = partyProfiles && partyProfiles.length || 0;

      if (!this._mounted) {
        if (avatarProfilesCount >= MAXIMUM_AVATARS) {
          return MAXIMUM_AVATARS;
        }
        return avatarProfilesCount;
      }

      var width = this._container && this._container.current && this._container.current.clientWidth;

      var avatarCount = avatarProfilesCount;

      var firstMatchWidth = KINDS_OF_WIDTH_THAT_NEED_ADAPATER.find(function (it) {
        return width < it.width;
      });

      if (firstMatchWidth) {
        avatarCount = firstMatchWidth.avartarCount;
        if (avatarCount + 1 === avatarProfilesCount) {
          avatarCount = avatarProfilesCount;
        }
      } else if (avatarCount >= MAXIMUM_AVATARS) {
        avatarCount = MAXIMUM_AVATARS;
      }

      return avatarCount;
    }
  }, {
    key: 'updateAvatarAmounts',
    value: function updateAvatarAmounts(props) {
      if (!this._mounted) {
        return;
      }

      var avatarCount = this._computeAvatarCountByWindowWidth(props);

      if (avatarCount !== this.state.avatarCount) {
        this.setState({
          avatarCount: avatarCount
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.updateAvatarAmounts(nextProps);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
      window.addEventListener('resize', this.onWindowResize);
      this.updateAvatarAmounts(this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
      window.removeEventListener('resize', this.onWindowResize);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var partyProfiles = nextProps.partyProfiles;

      var oldpartyProfiles = this.props.partyProfiles;
      var showUpdate = true;
      if (partyProfiles !== oldpartyProfiles) {
        if (Array.isArray(partyProfiles) && Array.isArray(oldpartyProfiles) && partyProfiles.length === oldpartyProfiles.length) {
          showUpdate = false;
          for (var i = 0; i < partyProfiles.length; i += 1) {
            if (partyProfiles[i].id !== oldpartyProfiles[i].id) {
              showUpdate = true;
              break;
            }
          }
        }
      } else if (nextState.avatarCount !== this.state.avatarCount) {
        showUpdate = true;
      } else {
        showUpdate = false;
      }

      return showUpdate;
    }
  }, {
    key: 'computeDisplayedProfiles',
    value: function computeDisplayedProfiles(_ref) {
      var profiles = _ref.profiles,
          avatarCount = _ref.avatarCount;

      var displayedProfiles = profiles.length >= avatarCount ? profiles.slice(0, avatarCount) : profiles;

      var remains = profiles.length - avatarCount;

      return {
        displayedProfiles: displayedProfiles,
        remains: remains
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentLocale = _props.currentLocale,
          partyProfiles = _props.partyProfiles,
          _onClick = _props.onClick;

      var profiles = partyProfiles || [];

      var avatarCount = this.state.avatarCount;

      var _computeDisplayedProf = this.computeDisplayedProfiles({ profiles: profiles, avatarCount: avatarCount }),
          displayedProfiles = _computeDisplayedProf.displayedProfiles,
          remains = _computeDisplayedProf.remains;

      return _react2.default.createElement(
        'div',
        {
          className: _styles2.default.conferenceCallInfoContainer,
          ref: this._container
        },
        displayedProfiles.length || avatarCount === 0 && remains > 0 ? _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(_styles2.default.avatarContainer, _styles2.default.clickable),
            onClick: function onClick(e) {
              e.preventDefault();_onClick();
            }
          },
          displayedProfiles.map(function (_ref2, idx) {
            var avatarUrl = _ref2.avatarUrl,
                toUserName = _ref2.toUserName;
            return _react2.default.createElement(
              'div',
              {
                key: toUserName + '_' + idx,
                className: _styles2.default.avatar },
              _react2.default.createElement(_CallAvatar2.default, {
                avatarUrl: avatarUrl
              })
            );
          }),
          remains > 0 ? _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)(_styles2.default.avatar, _styles2.default.remains)
            },
            '+' + remains
          ) : null
        ) : _react2.default.createElement(
          'div',
          { className: _styles2.default.avatarContainer },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.avatar, style: { backgroundColor: '#fff' } },
            _react2.default.createElement('i', { className: (0, _classnames2.default)(_DynamicsFont2.default.portrait, _styles2.default.icon) })
          )
        ),
        _react2.default.createElement(
          'p',
          { className: _styles2.default.info },
          _i18n2.default.getString('conferenceCall', currentLocale)
        )
      );
    }
  }]);
  return ConferenceInfo;
}(_react.Component);

exports.default = ConferenceInfo;


ConferenceInfo.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  partyProfiles: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    avatarUrl: _propTypes2.default.string,
    toUserName: _propTypes2.default.string
  })),
  onClick: _propTypes2.default.func
};

ConferenceInfo.defaultProps = {
  partyProfiles: null,
  onClick: function onClick(i) {
    return i;
  }
};
//# sourceMappingURL=ConferenceInfo.js.map
