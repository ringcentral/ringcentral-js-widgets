'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global describe it */

describe('connect', function () {
  var Passthrough = function (_React$Component) {
    _inherits(Passthrough, _React$Component);

    function Passthrough() {
      _classCallCheck(this, Passthrough);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Passthrough).apply(this, arguments));
    }

    _createClass(Passthrough, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement('div', null);
      }
    }]);

    return Passthrough;
  }(_react2.default.Component);

  it('should have context in wrapped component', function () {
    var store = (0, _redux.createStore)(function (state, action) {
      return state;
    });
    var Container = function Container(props) {
      return _react2.default.createElement(Passthrough, props);
    };
    var phone = {
      attr: 1
    };
    var Wrapper = (0, _.connect)(function (state, props, p) {
      return { attr: p.attr };
    })(Container);
    var tree = (0, _enzyme.mount)(_react2.default.createElement(
      _.Provider,
      { store: store },
      _react2.default.createElement(
        _.PhoneProvider,
        { phone: phone },
        _react2.default.createElement(Wrapper, null)
      )
    ));
    (0, _chai.expect)(Wrapper.displayName).to.equal('Connect(Container)');
    (0, _chai.expect)(Wrapper.contextTypes.phone).to.equal(_react2.default.PropTypes.object);
    (0, _chai.expect)(tree.find('Connect(Container)')).to.have.length(1);
    (0, _chai.expect)(tree.find('Passthrough').props().attr).to.equal(1);
    // expect(tree.find(<Container />).props()).to.equal(phone);
  });
});