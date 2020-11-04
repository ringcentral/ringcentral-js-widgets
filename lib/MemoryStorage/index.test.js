"use strict";

require("core-js/modules/es6.array.for-each");

var _chai = require("chai");

var _ = require(".");

describe('MemoryStorage', function () {
  it('should be a constructor function', function () {
    (0, _chai.expect)(_.MemoryStorage).to.be.a('function');
    (0, _chai.expect)(function () {
      return new _.MemoryStorage();
    }).to.not["throw"]();
    var instance = new _.MemoryStorage();
    (0, _chai.expect)(instance).to.exist;
    (0, _chai.expect)(instance instanceof _.MemoryStorage).to.be["true"];
  });
  describe('MemoryStorage instance', function () {
    it('should have function getItem', function () {
      var instance = new _.MemoryStorage();
      (0, _chai.expect)(instance.getItem).to.be.a('function');
    });
    it('should have function setItem', function () {
      var instance = new _.MemoryStorage();
      (0, _chai.expect)(instance.setItem).to.be.a('function');
    });
    it('should have function removeItem', function () {
      var instance = new _.MemoryStorage();
      (0, _chai.expect)(instance.removeItem).to.be.a('function');
    });
    it('should behave similar to localStorage with getItem, setItem, and removeItem', function () {
      var instance = new _.MemoryStorage();
      instance.setItem('foo', 'bar');
      (0, _chai.expect)(instance.getItem('foo')).to.equal('bar');
      instance.removeItem('foo');
      (0, _chai.expect)(instance.getItem('bar')).to.be.undefined;
    });
    it('should have function key', function () {
      var instance = new _.MemoryStorage();
      (0, _chai.expect)(instance.key).to.be.a('function');
    });
    it('should have property length', function () {
      var instance = new _.MemoryStorage();
      (0, _chai.expect)(instance.length).to.be.a('number');
    });
    it('should have the correct length', function () {
      var instance = new _.MemoryStorage();
      [1, 2, 3, 4, 5].forEach(function (num) {
        instance.setItem("foo-".concat(num), "bar-".concat(num));
        (0, _chai.expect)(instance.length).to.equal(num);
      });
    });
    it('should return storage keys with key function', function () {
      var instance = new _.MemoryStorage();
      [1, 2, 3, 4, 5].forEach(function (num, idx) {
        instance.setItem("foo-".concat(num), "bar-".concat(num));
        (0, _chai.expect)(instance.key(idx)).to.equal("foo-".concat(num));
      });
    });
  });
});
//# sourceMappingURL=index.test.js.map
