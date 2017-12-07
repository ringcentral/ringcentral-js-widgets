'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var button = function button(text) {
  return _react2.default.createElement(
    'span',
    { key: text, className: _styles2.default.button },
    text
  );
};

var section = function section(buttons, title, body) {
  return _react2.default.createElement(
    'div',
    { key: buttons.join(''), className: _styles2.default.section },
    buttons.map(function (b) {
      return button(b);
    }),
    _react2.default.createElement(
      'p',
      { className: _styles2.default.title },
      title
    ),
    body.split('\n').map(function (line, index) {
      return _react2.default.createElement(
        'p',
        { key: index, className: _styles2.default.body },
        line
      );
    })
  );
};

var sections = [{
  buttons: ['*', '#', '2'],
  title: 'Caller Count',
  body: 'Keep track of how many people are on the call'
}, {
  buttons: ['*', '#', '3'],
  title: 'Leave Conference',
  body: 'Lets the host hang up and end the call'
}, {
  buttons: ['*', '#', '4'],
  title: 'Menu',
  body: 'Listen to the list of touchtone commands'
}, {
  buttons: ['*', '#', '5'],
  title: 'Set Listening Modes',
  body: 'Press 1x: Mute callers - Callers can unmute with  *, #, 6\nPress 2x: Mute callers - Listen only. No unmuting option\nPress 3x: Unmute callers - Opens the line again'
}, {
  buttons: ['*', '#', '6'],
  title: 'Mute Host Line',
  body: 'Press once to MUTE\nPress again to UNMUTE'
}, {
  buttons: ['*', '#', '7'],
  title: 'Secure the Call',
  body: 'Press once to BLOCK all callers\nPress again to OPEN the call'
}, {
  buttons: ['*', '#', '8'],
  title: 'Hear sound when people Enter or Exit call',
  body: 'Press 1x: Turns OFF sound\nPress 2x: Enter tone is ON Exit tone is OFF\nPress 3x: Enter tone is OFF Exit tone is ON\nPress 4x: Turns ON sound'
}, {
  buttons: ['*', '9'],
  title: 'Record your conference',
  body: 'Press once to START recording\nPress again to STOP recording'
}];

var ConferenceCommands = function ConferenceCommands(_ref) {
  var onBack = _ref.onBack;
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.container },
    _react2.default.createElement(
      _BackHeader2.default,
      { onBackClick: onBack },
      'Conference Commands'
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.conferenceCommands },
      sections.map(function (s) {
        return section(s.buttons, s.title, s.body);
      })
    )
  );
};

ConferenceCommands.propTypes = {
  onBack: _propTypes2.default.func.isRequired
};

exports.default = ConferenceCommands;
//# sourceMappingURL=index.js.map
