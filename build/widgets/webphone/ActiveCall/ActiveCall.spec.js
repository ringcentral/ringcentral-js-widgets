'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global describe it */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _test = require('../../../../../utils/test');

var _test2 = require('../../../../../../test.json');

var _test3 = _interopRequireDefault(_test2);

var _ActiveCall = require('./ActiveCall.react');

var _ActiveCall2 = _interopRequireDefault(_ActiveCall);

var _CallFooter = require('../CallFooter/CallFooter.react');

var _CallFooter2 = _interopRequireDefault(_CallFooter);

var _CallConsole = require('../CallConsole/CallConsole.react');

var _CallConsole2 = _interopRequireDefault(_CallConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<ActiveCall />', function () {
  it('count the duration', function (done) {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ActiveCall2.default, (0, _test.postProcess)(_test3.default['ActiveCall.react.js'])));
    (0, _chai.expect)(wrapper.state('duration')).to.equal(0);
    setTimeout(function () {
      (0, _chai.expect)(wrapper.state('duration')).to.equal(1);
      done();
    }, 1000);
  });

  it('can bye when click right button of call footer', function () {
    var onButtonClick = _sinon2.default.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ActiveCall2.default, _extends({}, (0, _test.postProcess)(_test3.default['ActiveCall.react.js']), {
      bye: onButtonClick
    })));
    wrapper.find(_CallFooter2.default).prop('onRightClick')();
    (0, _chai.expect)(onButtonClick.calledOnce).to.equal(true);
  });

  it('can transfer', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ActiveCall2.default, (0, _test.postProcess)(_test3.default['ActiveCall.react.js'])));
    wrapper.find(_CallConsole2.default).prop('handleTransferClick')();
    (0, _chai.expect)(wrapper.state('openedPanel')).to.equal('transfer');
  });

  it('can record', function () {
    var onButtonClick = _sinon2.default.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ActiveCall2.default, _extends({}, (0, _test.postProcess)(_test3.default['ActiveCall.react.js']), {
      record: onButtonClick
    })));
    wrapper.find(_CallConsole2.default).prop('handleRecordClick')();
    (0, _chai.expect)(onButtonClick.calledOnce).to.equal(true);
  });

  it('can hold', function () {
    var onButtonClick = _sinon2.default.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ActiveCall2.default, _extends({}, (0, _test.postProcess)(_test3.default['ActiveCall.react.js']), {
      hold: onButtonClick
    })));
    wrapper.find(_CallConsole2.default).prop('handleHoldClick')();
    (0, _chai.expect)(onButtonClick.calledOnce).to.equal(true);
  });

  it('can mute', function () {
    var onButtonClick = _sinon2.default.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ActiveCall2.default, _extends({}, (0, _test.postProcess)(_test3.default['ActiveCall.react.js']), {
      mute: onButtonClick
    })));
    wrapper.find(_CallFooter2.default).prop('onLeftClick')();
    (0, _chai.expect)(onButtonClick.calledOnce).to.equal(true);
  });
});