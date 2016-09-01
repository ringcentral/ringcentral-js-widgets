'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _test = require('../../../../../utils/test');

var _test2 = require('../../../../../../test.json');

var _test3 = _interopRequireDefault(_test2);

var _AuthPanel = require('./AuthPanel.react');

var _AuthPanel2 = _interopRequireDefault(_AuthPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it */

describe('<AuthPanel />', function () {
  it('render a Login button', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_AuthPanel2.default, (0, _test.postProcess)(_test3.default['AuthPanel.react.js'])));
    (0, _chai.expect)(wrapper.find('button').text()).to.equal('Login');
  });

  it('turn isOauthOpened state to true when oauth', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_AuthPanel2.default, (0, _test.postProcess)(_test3.default['AuthPanel.react.js'])));
    wrapper.find('button').simulate('click');
    (0, _chai.expect)(wrapper.state('isOauthOpened')).to.equal(true);
  });
});