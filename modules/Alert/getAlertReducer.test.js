"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

var _chai = require("chai");

var _getAlertReducer = _interopRequireWildcard(require("./getAlertReducer"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('getMessagesReducer', function () {
  it('should be a function', function () {
    (0, _chai.expect)(_getAlertReducer.getMessagesReducer).to.be.a('function');
  });
  it('should return a reducer', function () {
    (0, _chai.expect)((0, _getAlertReducer.getMessagesReducer)({
      types: _actionTypes["default"]
    })).to.be.a('function');
  });
  describe('messagesReducer', function () {
    var reducer = (0, _getAlertReducer.getMessagesReducer)(_actionTypes["default"]);
    it('should have initial state of []', function () {
      (0, _chai.expect)(reducer(undefined, {})).to.deep.equal([]);
    });
    it('should return original state if type is not recognized', function () {
      var originalState = [];
      (0, _chai.expect)(reducer(originalState, {
        type: 'foo'
      })).to.equal(originalState);
    });
    it('should add new message to state on alert', function () {
      (0, _chai.expect)(reducer([], {
        type: _actionTypes["default"].alert,
        id: 'foo',
        message: 'bar',
        payload: 'payload',
        ttl: 0,
        level: 'level',
        timestamp: 1234
      })).to.deep.equal([{
        id: 'foo',
        message: 'bar',
        payload: 'payload',
        ttl: 0,
        level: 'level',
        timestamp: 1234
      }]);
      (0, _chai.expect)(reducer([{}, {}], {
        type: _actionTypes["default"].alert,
        id: 'foo',
        message: 'bar',
        payload: 'payload',
        ttl: 0,
        level: 'level',
        timestamp: 1234
      })).to.deep.equal([{}, {}, {
        id: 'foo',
        message: 'bar',
        payload: 'payload',
        ttl: 0,
        level: 'level',
        timestamp: 1234
      }]);
    });
    it('should return state if allowDuplicates === false and message already exists', function () {
      var originalState = [{
        message: 'foo'
      }];
      (0, _chai.expect)(reducer(originalState, {
        type: _actionTypes["default"].alert,
        message: 'foo',
        allowDuplicates: false
      })).to.equal(originalState);
    });
    it('should remove messages specified by the ids on dismiss', function () {
      (0, _chai.expect)(reducer([{
        id: 'foo'
      }, {
        id: 'bar'
      }, {
        id: 'rogue'
      }], {
        type: _actionTypes["default"].dismiss,
        ids: ['foo', 'bar']
      })).to.deep.equal([{
        id: 'rogue'
      }]);
    });
    it('should remove all messages on dismissAll', function () {
      (0, _chai.expect)(reducer([{
        id: 'foo'
      }, {
        id: 'bar'
      }, {
        id: 'rogue'
      }], {
        type: _actionTypes["default"].dismissAll
      })).to.deep.equal([]);
    });
  });
});
describe('getAlertReducer', function () {
  it('should be a function', function () {
    (0, _chai.expect)(_getAlertReducer["default"]).to.be.a('function');
  });
  it('should return a reducer', function () {
    (0, _chai.expect)((0, _getAlertReducer["default"])(_actionTypes["default"])).to.be.a('function');
  });
  it('should return a combined reducer', function () {
    var reducer = (0, _getAlertReducer["default"])(_actionTypes["default"]);
    var messagesReducer = (0, _getAlertReducer.getMessagesReducer)(_actionTypes["default"]);
    (0, _chai.expect)(reducer(undefined, {})).to.deep.equal({
      messages: messagesReducer(undefined, {})
    });
  });
});
//# sourceMappingURL=getAlertReducer.test.js.map
