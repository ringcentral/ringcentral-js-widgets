"use strict";

var _chai = require("chai");

var _isValidNumber = require("./isValidNumber");

describe('isValidNumber', function () {
  it('should return false if phoneNumber is blank', function () {
    var isValidNumberOptions = {
      input: '',
      countryCode: 'US'
    };
    var result = (0, _isValidNumber.isValidNumber)(isValidNumberOptions);
    (0, _chai.expect)(result).to.equal(false);
  });
  it('should return false if cleanNumber is blank', function () {
    var isValidNumberOptions = {
      countryCode: 'US',
      input: "iamn%@onedi!@$%^&()_=\\][';/.,~nu><.,,?/mber"
    };
    var result = (0, _isValidNumber.isValidNumber)(isValidNumberOptions);
    (0, _chai.expect)(result).to.equal(false);
  });
  it('should return true if phoneNumber is extensionNumber', function () {
    var isValidNumberOptions = {
      countryCode: 'US',
      input: '1234'
    };
    var result = (0, _isValidNumber.isValidNumber)(isValidNumberOptions);
    (0, _chai.expect)(result).to.equal(true);
  });
  it('should return true if phoneNumber is valid', function () {
    var isValidNumberOptions = {
      countryCode: 'US',
      input: '(999) 1234 567'
    };
    var result = (0, _isValidNumber.isValidNumber)(isValidNumberOptions);
    (0, _chai.expect)(result).to.equal(true);
  });
  it('should return true if phoneNumber is e164 format', function () {
    var isValidNumberOptions = {
      countryCode: 'US',
      input: '+1234567890'
    };
    var result = (0, _isValidNumber.isValidNumber)(isValidNumberOptions);
    (0, _chai.expect)(result).to.equal(true);
  });
});
//# sourceMappingURL=isValidNumber.test.js.map
