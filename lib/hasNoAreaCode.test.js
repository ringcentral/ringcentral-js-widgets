"use strict";

var _chai = require("chai");

var _hasNoAreaCode = require("./hasNoAreaCode");

describe('hasNoAreaCode', function () {
  it('should return false if phoneNumber is ServiceNumber', function () {
    var result = (0, _hasNoAreaCode.hasNoAreaCode)({
      input: '*101',
      countryCode: 'US',
      areaCode: '666'
    });
    (0, _chai.expect)(result).to.equal(false);
  });
  it('should return false if phoneNumber is hasPlus', function () {
    var result = (0, _hasNoAreaCode.hasNoAreaCode)({
      input: '+16508370000',
      countryCode: 'US',
      areaCode: '666'
    });
    (0, _chai.expect)(result).to.equal(false);
  });
  it('should return false if phoneNumber length is not 7', function () {
    var result = (0, _hasNoAreaCode.hasNoAreaCode)({
      input: '16508370000',
      countryCode: 'US',
      areaCode: '666'
    });
    (0, _chai.expect)(result).to.equal(false);
  });
  it('should return false if phoneNumber length is 7 and countryCode is not CA or US', function () {
    var result = (0, _hasNoAreaCode.hasNoAreaCode)({
      input: '8370000',
      countryCode: 'GB',
      areaCode: ''
    });
    (0, _chai.expect)(result).to.equal(false);
  });
  it('should return false if phoneNumber length is 7, countryCode is CA and has areaCode', function () {
    var result = (0, _hasNoAreaCode.hasNoAreaCode)({
      input: '8370000',
      countryCode: 'CA',
      areaCode: '666'
    });
    (0, _chai.expect)(result).to.equal(false);
  });
  it('should return false if phoneNumber length is 7, countryCode is US and has areaCode', function () {
    var result = (0, _hasNoAreaCode.hasNoAreaCode)({
      input: '8370000',
      countryCode: 'US',
      areaCode: '666'
    });
    (0, _chai.expect)(result).to.equal(false);
  });
  it('should return true if phoneNumber length is 7, countryCode is US and has not areaCode', function () {
    var result = (0, _hasNoAreaCode.hasNoAreaCode)({
      input: '8370000',
      countryCode: 'US',
      areaCode: ''
    });
    (0, _chai.expect)(result).to.equal(true);
  });
  it('should return true if phoneNumber length is 7, countryCode is CA and has not areaCode', function () {
    var result = (0, _hasNoAreaCode.hasNoAreaCode)({
      input: '8370000',
      countryCode: 'CA',
      areaCode: ''
    });
    (0, _chai.expect)(result).to.equal(true);
  });
});
//# sourceMappingURL=hasNoAreaCode.test.js.map
