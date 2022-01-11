"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

var _chai = require("chai");

var _contactHelper = require("../../lib/contactHelper");

var _getModuleStatusReducer = require("../../lib/getModuleStatusReducer");

var _actionTypes = require("./actionTypes");

var _getContactsReducer = _interopRequireWildcard(require("./getContactsReducer"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('Contacts :: getSearchFilterReducer', function () {
  it('getSearchFilterReducer should be a function', function () {
    (0, _chai.expect)(_getContactsReducer.getSearchFilterReducer).to.be.a('function');
  });
  it('getSearchFilterReducer should return a reducer', function () {
    (0, _chai.expect)((0, _getContactsReducer.getSearchFilterReducer)()).to.be.a('function');
  });
  describe('searchFilterReducer', function () {
    var reducer = (0, _getContactsReducer.getSearchFilterReducer)(_actionTypes.actionTypes);
    it('should have initial state of blank string', function () {
      (0, _chai.expect)(reducer(undefined, {})).to.equal('');
    });
    it('should return original state of actionTypes is not recognized', function () {
      var originalState = {};
      (0, _chai.expect)(reducer(originalState, {
        type: 'foo'
      })).to.equal(originalState);
    });
    it('should return new filter on updateFilter', function () {
      (0, _chai.expect)(reducer('foo', {
        type: _actionTypes.actionTypes.updateFilter,
        searchFilter: 'test'
      })).to.equal('test');
    });
    it('should return blank string on resetSuccess', function () {
      (0, _chai.expect)(reducer('foo', {
        type: _actionTypes.actionTypes.resetSuccess
      })).to.equal('');
    });
    it('should return original filter when searchFilter is undefined on updateFilter', function () {
      (0, _chai.expect)(reducer('foo', {
        type: _actionTypes.actionTypes.updateFilter,
        searchFilter: undefined
      })).to.equal('foo');
    });
    it('should return original filter when searchFilter is null on updateFilter', function () {
      (0, _chai.expect)(reducer('foo', {
        type: _actionTypes.actionTypes.updateFilter,
        searchFilter: null
      })).to.equal('foo');
    });
  });
});
describe('Contacts :: getSourceFilterReducer', function () {
  it('getSourceFilterReducer should be a function', function () {
    (0, _chai.expect)(_getContactsReducer.getSourceFilterReducer).to.be.a('function');
  });
  it('getSourceFilterReducer should return a reducer', function () {
    (0, _chai.expect)((0, _getContactsReducer.getSourceFilterReducer)()).to.be.a('function');
  });
  describe('sourceFilterReducer', function () {
    var reducer = (0, _getContactsReducer.getSourceFilterReducer)(_actionTypes.actionTypes);
    it('should have initial state of AllContactSourceName', function () {
      (0, _chai.expect)(reducer(undefined, {})).to.equal(_contactHelper.AllContactSourceName);
    });
    it('should return original state of actionTypes is not recognized', function () {
      var originalState = {};
      (0, _chai.expect)(reducer(originalState, {
        type: 'foo'
      })).to.equal(originalState);
    });
    it('should return sourceFilter on updateFilter', function () {
      (0, _chai.expect)(reducer('foo', {
        type: _actionTypes.actionTypes.updateFilter,
        sourceFilter: 'test'
      })).to.equal('test');
    });
    it('should return AllContactSourceName on resetSuccess', function () {
      (0, _chai.expect)(reducer('foo', {
        type: _actionTypes.actionTypes.resetSuccess
      })).to.equal(_contactHelper.AllContactSourceName);
    });
    it('should return original filter when sourceFilter is undefined on updateFilter', function () {
      (0, _chai.expect)(reducer('foo', {
        type: _actionTypes.actionTypes.updateFilter,
        sourceFilter: undefined
      })).to.equal('foo');
    });
    it('should return original filter when sourceFilter is null on updateFilter', function () {
      (0, _chai.expect)(reducer('foo', {
        type: _actionTypes.actionTypes.updateFilter,
        sourceFilter: null
      })).to.equal('foo');
    });
  });
});
describe('getContactsReducer', function () {
  it('should be a function', function () {
    (0, _chai.expect)(_getContactsReducer["default"]).to.be.a('function');
  });
  it('should return a reducer', function () {
    (0, _chai.expect)((0, _getContactsReducer["default"])(_actionTypes.actionTypes)).to.be.a('function');
  });
  it('should return a combined reducer', function () {
    var reducer = (0, _getContactsReducer["default"])(_actionTypes.actionTypes);
    var statusReducer = (0, _getModuleStatusReducer.getModuleStatusReducer)(_actionTypes.actionTypes);
    var searchFilterReducer = (0, _getContactsReducer.getSearchFilterReducer)(_actionTypes.actionTypes);
    var sourceFilterReducer = (0, _getContactsReducer.getSourceFilterReducer)(_actionTypes.actionTypes);
    (0, _chai.expect)(reducer(undefined, {})).to.deep.equal({
      status: statusReducer(undefined, {}),
      searchFilter: searchFilterReducer(undefined, {}),
      sourceFilter: sourceFilterReducer(undefined, {})
    });
  });
});
//# sourceMappingURL=getContactsReducer.test.js.map
