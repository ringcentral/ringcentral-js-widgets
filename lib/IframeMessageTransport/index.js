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

var _MessageTransportCore2 = require('../MessageTransportCore');

var _MessageTransportCore3 = _interopRequireDefault(_MessageTransportCore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IframeMessageTransport = function (_MessageTransportCore) {
  (0, _inherits3.default)(IframeMessageTransport, _MessageTransportCore);

  function IframeMessageTransport(_ref) {
    var targetIframe = _ref.targetIframe,
        targetWindow = _ref.targetWindow;
    (0, _classCallCheck3.default)(this, IframeMessageTransport);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IframeMessageTransport.__proto__ || (0, _getPrototypeOf2.default)(IframeMessageTransport)).call(this));

    _this._onMessage = function (msg) {
      if (msg && msg.data) {
        _this._distributeMessage(msg.data);
      }
    };

    _this._targetIframe = targetIframe;
    _this._targetWindow = targetWindow;
    window.addEventListener('message', _this._onMessage);
    return _this;
  }

  (0, _createClass3.default)(IframeMessageTransport, [{
    key: 'dispose',
    value: function dispose() {
      window.removeEventListener('message', this._onMessage);
    }
  }, {
    key: 'postMessage',
    value: function postMessage(msg) {
      var target = this._targetWindow || this._targetIframe && this._targetIframe.contentWindow;
      if (target) {
        target.postMessage(msg, '*');
      }
    }
  }]);
  return IframeMessageTransport;
}(_MessageTransportCore3.default);

exports.default = IframeMessageTransport;
//# sourceMappingURL=index.js.map
