"use strict";

var _checkCountryCode = require("./checkCountryCode");

describe('checkCountryCode', function () {
  it('should throw error when phonenumber is e164 of other country  expect US/CA', function () {
    var error = null;

    try {
      var phonenumber = '+8618877679909';
      (0, _checkCountryCode.checkCountryCode)(phonenumber);
    } catch (e) {
      error = e;
    }

    expect(error.message).toEqual('Error Type: NO_SUPPORT_COUNTRY');
  });
  it('should throw error when  phonenumber is e164 of other country expect US/CA', function () {
    var error = null;

    try {
      var phonenumber = '+44 (20) 3743-3124';
      (0, _checkCountryCode.checkCountryCode)(phonenumber);
    } catch (e) {
      error = e;
    }

    expect(error.message).toEqual('Error Type: NO_SUPPORT_COUNTRY');
  });
  it('should not throw error when phonenumber is e164 of US/CA', function () {
    var phonenumber = '+1 650 849 8195';
    (0, _checkCountryCode.checkCountryCode)(phonenumber);
  });
  it('should not throw error when phonenumber is local number', function () {
    var phonenumber = '650 849 8195';
    (0, _checkCountryCode.checkCountryCode)(phonenumber);
  });
});
//# sourceMappingURL=checkCountryCode.spec.js.map
