'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global describe it */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _test = require('../../../utils/test');

var _test2 = require('../../../../test.json');

var _test3 = _interopRequireDefault(_test2);

var _CallConsole = require('./CallConsole.react');

var _CallConsole2 = _interopRequireDefault(_CallConsole);

var _CallConsole3 = require('./CallConsole.css');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<CallConsole />', function () {
  it('can disable all panel', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_CallConsole2.default, _extends({}, (0, _test.postProcess)(_test3.default['ActiveCall.react.js']), {
      disabled: true
    })));
    var holdingButton = wrapper.find('.' + _CallConsole3.line).at(0).childAt(0);
    var keypadButton = wrapper.find('.' + _CallConsole3.line).at(0).childAt(1);
    var recordButton = wrapper.find('.' + _CallConsole3.line).at(0).childAt(2);
    var flipButton = wrapper.find('.' + _CallConsole3.line).at(1).childAt(0);
    var transferButton = wrapper.find('.' + _CallConsole3.line).at(1).childAt(1);
    var parkButton = wrapper.find('.' + _CallConsole3.line).at(1).childAt(2);
    (0, _chai.expect)(holdingButton.hasClass(_CallConsole3.disabled)).to.equal(true);
    (0, _chai.expect)(keypadButton.hasClass(_CallConsole3.disabled)).to.equal(true);
    (0, _chai.expect)(recordButton.hasClass(_CallConsole3.disabled)).to.equal(true);
    (0, _chai.expect)(flipButton.hasClass(_CallConsole3.disabled)).to.equal(true);
    (0, _chai.expect)(transferButton.hasClass(_CallConsole3.disabled)).to.equal(true);
    (0, _chai.expect)(parkButton.hasClass(_CallConsole3.disabled)).to.equal(true);
  });

  it('has two-line layout', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_CallConsole2.default, (0, _test.postProcess)(_test3.default['ActiveCall.react.js'])));
    (0, _chai.expect)(wrapper.find('.' + _CallConsole3.line)).to.have.length(2);
  });

  it('handle button clicks', function () {
    var onButtonClick = _sinon2.default.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_CallConsole2.default, _extends({}, (0, _test.postProcess)(_test3.default['ActiveCall.react.js']), {
      handleHoldClick: onButtonClick
    })));
    var holdingButton = wrapper.find('.' + _CallConsole3.line).at(0).childAt(0);
    holdingButton.simulate('click');
    (0, _chai.expect)(onButtonClick.calledOnce).to.equal(true);
  });

  it('show disable status', function () {
    var onButtonClick = _sinon2.default.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_CallConsole2.default, _extends({}, (0, _test.postProcess)(_test3.default['ActiveCall.react.js']), {
      handleHoldClick: onButtonClick
    })));
    var holdingSpan = wrapper.find('.' + _CallConsole3.line).at(0).childAt(0).find('span');
    if ((0, _test.postProcess)(_test3.default['CallConsole.react.js']).status.indexOf('HOLDING') === -1) {
      (0, _chai.expect)(holdingSpan.hasClass(iconClass('icon-uni28'))).to.equal(true);
    } else {
      (0, _chai.expect)(holdingSpan.hasClass(iconClass('icon-uni35'))).to.equal(true);
    }
  });
});