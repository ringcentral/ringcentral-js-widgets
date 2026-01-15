"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.to-string.js");
var _customFormat = require("./customFormat");
describe('customFormat', function () {
  it('should format phone numbers with custom format template', function () {
    var localUSNumbers = ['(650) 555-1234', '6505551234', '650.555.1234', '650-555-1234', '650 555 1234'];
    var template = 'XXX-XXX-XXXX';
    localUSNumbers.forEach(function (localPhoneNumber) {
      expect((0, _customFormat.customFormat)({
        localPhoneNumber: localPhoneNumber,
        template: template
      })).toBe('650-555-1234');
    });
    template = '(XXX) XXX-XXXX';
    localUSNumbers.forEach(function (localPhoneNumber) {
      expect((0, _customFormat.customFormat)({
        localPhoneNumber: localPhoneNumber,
        template: template
      })).toBe('(650) 555-1234');
    });
    template = 'XXX.XXX.XXXX';
    localUSNumbers.forEach(function (localPhoneNumber) {
      expect((0, _customFormat.customFormat)({
        localPhoneNumber: localPhoneNumber,
        template: template
      })).toBe('650.555.1234');
    });
    template = 'XXX XXX XXXX';
    localUSNumbers.forEach(function (localPhoneNumber) {
      expect((0, _customFormat.customFormat)({
        localPhoneNumber: localPhoneNumber,
        template: template
      })).toBe('650 555 1234');
    });
  });
  it("should throw an error if the number of digits in the phone number doesn't match the number of template characters in strict mode", function () {
    var localPhoneNumber = '6505551234';
    var template = 'XXX-XXX-XXX';
    expect(function () {
      return (0, _customFormat.customFormat)({
        localPhoneNumber: localPhoneNumber,
        template: template,
        strict: true
      });
    }).toThrow("Invalid custom format: 6505551234 => XXX-XXX-XXX, number of digits don't match: 10 !== 9");
  });
  it('should ignore extra digits in non strict mode', function () {
    var localPhoneNumber = '6505551234';
    var template = 'XXX-XXX-XXX';
    expect((0, _customFormat.customFormat)({
      localPhoneNumber: localPhoneNumber,
      template: template
    })).toBe('650-555-123');
  });
  it('should ignore extra template characters in non strict mode', function () {
    var localPhoneNumber = '6505551234';
    var template = 'XXX-XXX-XXXXX';
    expect((0, _customFormat.customFormat)({
      localPhoneNumber: localPhoneNumber,
      template: template
    })).toBe('650-555-1234');
  });
  it('should format phone numbers with custom format template and custom template character', function () {
    var localUSNumbers = ['(650) 555-1234', '6505551234', '650.555.1234', '650-555-1234', '650 555 1234'];
    var template = 'YYY-YYY-YYYY';
    var templateChar = 'Y';
    localUSNumbers.forEach(function (localPhoneNumber) {
      expect((0, _customFormat.customFormat)({
        localPhoneNumber: localPhoneNumber,
        template: template,
        templateChar: templateChar
      })).toBe('650-555-1234');
    });
  });
});
//# sourceMappingURL=customFormat.test.js.map
