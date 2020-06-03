"use strict";

var _parseNumber = require("./parseNumber");

describe('parseNumber', function () {
  it('should return result number if phoneNumber is valid local number', function () {
    var phonenumber = '6508498195';
    var result = (0, _parseNumber.parseNumber)(phonenumber);
    expect(result).toEqual('6508498195');
  });
  it('should return local number if phoneNumber is valid e164 number', function () {
    var phonenumber = '+16508498195';
    var result = (0, _parseNumber.parseNumber)(phonenumber);
    expect(result).toEqual('6508498195');
  });
  it('should throw error if phoneNumber is invalid', function () {
    var error = null;

    try {
      var phonenumber = '%^&64238478';
      (0, _parseNumber.parseNumber)(phonenumber);
    } catch (e) {
      error = e;
    }

    expect(error.message).toEqual('Error Type: INVALID_NUMBER');
  });
  it('should throw error if phoneNumber is empty', function () {
    var error = null;

    try {
      var phonenumber = '';
      (0, _parseNumber.parseNumber)(phonenumber);
    } catch (e) {
      error = e;
    }

    expect(error.message).toEqual('Error Type: INVALID_NUMBER');
  });
});
//# sourceMappingURL=parseNumber.spec.js.map
