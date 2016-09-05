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

var _Input = require('./Input.react');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Input />', function () {
  it('display default value', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, (0, _test.postProcess)(_test3.default['Input.react.js'])));
    (0, _chai.expect)(wrapper.find('input').prop('value')).to.equal((0, _test.postProcess)(_test3.default['Input.react.js']).value);
  });

  it('has proper class name', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, (0, _test.postProcess)(_test3.default['Input.react.js'])));
    (0, _chai.expect)(wrapper.find('input').prop('className')).to.equal((0, _test.postProcess)(_test3.default['Input.react.js']).className);
  });

  it('has proper place holder', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, (0, _test.postProcess)(_test3.default['Input.react.js'])));
    (0, _chai.expect)(wrapper.find('input').prop('placeholder')).to.equal((0, _test.postProcess)(_test3.default['Input.react.js']).placeholder);
  });

  it('call onChange when input', function () {
    var onInputChange = _sinon2.default.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Input2.default, _extends({}, (0, _test.postProcess)(_test3.default['ActiveCall.react.js']), {
      onChange: onInputChange
    })));
    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    (0, _chai.expect)(onInputChange.calledOnce).to.equal(true);
  });
});