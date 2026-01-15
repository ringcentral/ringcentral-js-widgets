"use strict";

require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _index = _interopRequireWildcard(require("./index"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
describe('format', function () {
  test('should return a string', function () {
    expect(_typeof((0, _index["default"])({
      phoneNumber: '12345'
    }))).toBe('string');
    expect(_typeof((0, _index["default"])({
      phoneNumber: '+1 650-361-8700'
    }))).toBe('string');
  });
  test('should return empty string if no numbers are in the input string', function () {
    expect((0, _index["default"])({
      phoneNumber: 'foo'
    })).toBe('');
    expect((0, _index["default"])({
      phoneNumber: 'bar'
    })).toBe('');
  });
  test('should default to US', function () {
    var phoneNumber = '16503618700';
    expect((0, _index["default"])({
      phoneNumber: phoneNumber
    })).toBe((0, _index["default"])({
      phoneNumber: phoneNumber,
      countryCode: 'US'
    }));
  });
  test('should format a number', function () {
    var _format;
    var phoneNumber = '16503618700';
    expect((_format = (0, _index["default"])({
      phoneNumber: phoneNumber
    })) === null || _format === void 0 ? void 0 : _format.length).not.toBe(phoneNumber.length);
  });
  test('should default to local format', function () {
    var phoneNumber = '16503618700';
    expect((0, _index["default"])({
      phoneNumber: phoneNumber
    })).toBe((0, _index["default"])({
      phoneNumber: phoneNumber,
      type: _index.formatTypes.local
    }));
  });
  test('should return number as extension if number is shorter than 7 digits', function () {
    ['1', '12', '123', '12345', '12345*12345', '123456'].forEach(function (phoneNumber) {
      expect((0, _index["default"])({
        phoneNumber: phoneNumber
      })).toBe(phoneNumber.split('*').pop());
    });
  });
  test('should only remove extension number if params.removeExtension is true', function () {
    var phoneNumber = '16503618700';
    var extension = '123';
    expect((0, _index["default"])({
      phoneNumber: "".concat(phoneNumber, "*").concat(extension),
      removeExtension: true
    })).toBe((0, _index["default"])({
      phoneNumber: phoneNumber
    }));
    expect((0, _index["default"])({
      phoneNumber: "".concat(phoneNumber, "*").concat(extension),
      removeExtension: false
    })).toBe((0, _index["default"])({
      phoneNumber: "".concat(phoneNumber, "*").concat(extension)
    }));
  });
  test('should add areaCode if phoneNumber is 7 digits and countryCode is CA 2', function () {
    var phoneNumber = '1234567';
    var areaCode = '890';
    expect((0, _index["default"])({
      phoneNumber: phoneNumber,
      areaCode: areaCode,
      countryCode: 'CA'
    })).toBe((0, _index["default"])({
      phoneNumber: "".concat(areaCode).concat(phoneNumber),
      countryCode: 'CA',
      type: _index.formatTypes.international
    }));
  });
  test('should ignore areaCode if countryCode is not CA', function () {
    var phoneNumber = '1234567';
    var areaCode = '890';
    expect((0, _index["default"])({
      phoneNumber: phoneNumber,
      areaCode: areaCode,
      countryCode: 'GB'
    })).toBe((0, _index["default"])({
      phoneNumber: phoneNumber,
      countryCode: 'GB'
    }));
  });
  test('should not differentiate US and CA numbers', function () {
    var ca = ['+1-613-555-0177', '+1-613-555-0174', '+1-613-555-0194', '+1-613-555-0189', '+1-613-555-0127', '+1-613-555-0105'];
    var us = ['+1-202-555-0139', '+1-202-555-0142', '+1-202-555-0139', '+1-202-555-0169', '+1-202-555-0187', '+1-202-555-0177'];
    ca.forEach(function (n) {
      expect((0, _index["default"])({
        phoneNumber: n,
        countryCode: 'US'
      })).toBe((0, _index["default"])({
        phoneNumber: n,
        countryCode: 'CA'
      }));
    });
    us.forEach(function (n) {
      expect((0, _index["default"])({
        phoneNumber: n,
        countryCode: 'US'
      })).toBe((0, _index["default"])({
        phoneNumber: n,
        countryCode: 'CA'
      }));
    });
  });
  test('PR should not be formatted as international number', function () {
    var _format2;
    var phoneNumber = '+17872628888'; // Puerto Rico Pizza Hut
    expect(((_format2 = (0, _index["default"])({
      phoneNumber: phoneNumber,
      countryCode: 'US'
    })) === null || _format2 === void 0 ? void 0 : _format2[0]) === '+').toBe(false);
  });
  test('should format to localFormat if phoneNumber matchs countryCode', function () {
    var _format3, _format4, _format5, _format6;
    expect(((_format3 = (0, _index["default"])({
      phoneNumber: '+1-202-555-0139',
      countryCode: 'US'
    })) === null || _format3 === void 0 ? void 0 : _format3[0]) !== '+').toBe(true);
    expect(((_format4 = (0, _index["default"])({
      phoneNumber: '202-555-0139',
      countryCode: 'US'
    })) === null || _format4 === void 0 ? void 0 : _format4[0]) !== '+').toBe(true);
    expect(((_format5 = (0, _index["default"])({
      phoneNumber: '+44 20 7930 9114',
      countryCode: 'GB'
    })) === null || _format5 === void 0 ? void 0 : _format5[0]) !== '+').toBe(true);
    expect(((_format6 = (0, _index["default"])({
      phoneNumber: '20 7930 9114',
      countryCode: 'GB'
    })) === null || _format6 === void 0 ? void 0 : _format6[0]) !== '+').toBe(true);
    expect((0, _index["default"])({
      phoneNumber: '+1-202-555-0139',
      countryCode: 'US'
    })).toBe('(202) 555-0139');
    expect((0, _index["default"])({
      phoneNumber: '+44 20 7930 9114',
      countryCode: 'GB'
    })).toBe('020 7930 9114');
  });
  test('should format to international format if options.international is set to true', function () {
    expect((0, _index["default"])({
      phoneNumber: '+1-202-555-0139',
      countryCode: 'US',
      type: _index.formatTypes.international
    })).toBe((0, _index["default"])({
      phoneNumber: '+1-202-555-0139',
      countryCode: 'GB'
    }));
  });
  test('should format to international format if phoneNumber not match courtryCode', function () {
    expect((0, _index["default"])({
      phoneNumber: '+44-202-555-0139',
      countryCode: 'US'
    })).toBe((0, _index["default"])({
      phoneNumber: '+44-202-555-0139',
      countryCode: 'US',
      type: _index.formatTypes.international
    }));
  });
  test('should normalize numbers into E164 format', function () {
    ['+1-613-555-0177', '+1-613-555-0174', '+1-613-555-0194', '+1-613-555-0189', '+1-613-555-0127', '+1-613-555-0105', '+1-202-555-0139', '+1-202-555-0142', '+1-202-555-0139', '+1-202-555-0169', '+1-202-555-0187', '+1-202-555-0177', '+44 20 7930 9114', '+33 4 73 25 21 42'].forEach(function (phoneNumber) {
      expect((0, _index["default"])({
        phoneNumber: phoneNumber,
        type: _index.formatTypes.e164
      })).toBe(phoneNumber.replace(/[- ]/g, ''));
    });
  });
  test('should add country code', function () {
    ['613-555-0177', '613-555-0174', '613-555-0194', '613-555-0189', '613-555-0127', '613-555-0105'].forEach(function (phoneNumber) {
      expect((0, _index["default"])({
        phoneNumber: phoneNumber,
        countryCode: 'US',
        type: _index.formatTypes.e164
      })).toBe((0, _index["default"])({
        phoneNumber: "+1".concat(phoneNumber),
        countryCode: 'US',
        type: _index.formatTypes.e164
      }));
    });
  });
  test('should ignore areaCode if the number already contains areaCode', function () {
    ['613-555-0177', '613-555-0174', '613-555-0194', '613-555-0189', '613-555-0127', '613-555-0105'].forEach(function (phoneNumber) {
      expect((0, _index["default"])({
        phoneNumber: phoneNumber,
        countryCode: 'US',
        areaCode: '650',
        type: _index.formatTypes.e164
      })).toBe((0, _index["default"])({
        phoneNumber: "+1".concat(phoneNumber),
        countryCode: 'US',
        type: _index.formatTypes.e164
      }));
    });
  });
  test('should return empty string if number is invalid', function () {
    ['foo', '+bar'].forEach(function (phoneNumber) {
      expect((0, _index["default"])({
        phoneNumber: phoneNumber,
        type: _index.formatTypes.e164
      })).toBe('');
    });
  });
  test('should return number as extension if number is shorter than 6 digits', function () {
    ['1', '12', '123', '12345', '12345*12345'].forEach(function (phoneNumber) {
      expect((0, _index["default"])({
        phoneNumber: phoneNumber,
        type: _index.formatTypes.e164
      })).toBe(phoneNumber.split('*').pop());
    });
  });
  test('should add areaCode if phoneNumber is 7 digits and countryCode is CA', function () {
    var phoneNumber = '1234567';
    var areaCode = '890';
    expect((0, _index["default"])({
      phoneNumber: phoneNumber,
      areaCode: areaCode,
      countryCode: 'CA',
      type: _index.formatTypes.e164
    })).toBe((0, _index["default"])({
      phoneNumber: "".concat(areaCode).concat(phoneNumber),
      countryCode: 'CA',
      type: _index.formatTypes.e164
    }));
  });
  test('should only remove extension number if params.removeExtension is true 3', function () {
    var phoneNumber = '16503618700';
    var extension = '123';
    expect((0, _index["default"])({
      phoneNumber: "".concat(phoneNumber, "*").concat(extension),
      removeExtension: true,
      type: _index.formatTypes.e164
    })).toBe((0, _index["default"])({
      phoneNumber: phoneNumber,
      type: _index.formatTypes.e164
    }));
    expect((0, _index["default"])({
      phoneNumber: "".concat(phoneNumber, "*").concat(extension),
      removeExtension: false,
      type: _index.formatTypes.e164
    })).toBe((0, _index["default"])({
      phoneNumber: "".concat(phoneNumber, "*").concat(extension),
      type: _index.formatTypes.e164
    }));
  });
  test('should keep extension number intact when multi-site disabled', function () {
    var originExtensionNumber = '22702';
    expect((0, _index["default"])({
      phoneNumber: originExtensionNumber
    })).toBe(originExtensionNumber);
  });
  test('should only remove site code in extension number when same site', function () {
    var siteIsSameWithExtension = '22';
    var siteIsDifferentFromExtension = '37';
    var longExtension = '22702';
    var shortExtension = '702';
    expect((0, _index["default"])({
      phoneNumber: longExtension,
      siteCode: siteIsSameWithExtension,
      isMultipleSiteEnabled: true
    })).toBe(shortExtension);
    expect((0, _index["default"])({
      phoneNumber: longExtension,
      siteCode: siteIsDifferentFromExtension,
      isMultipleSiteEnabled: true
    })).toBe(longExtension);
  });
});
describe('formatSameSiteExtension', function () {
  test('should return the extension as is when currentSiteCode is empty', function () {
    var result = (0, _index.formatSameSiteExtension)({
      currentSiteCode: '',
      extension: '1234'
    });
    expect(result).toBe('1234');
  });
  test('should return the extension as is when extension does not start with currentSiteCode', function () {
    var result = (0, _index.formatSameSiteExtension)({
      currentSiteCode: '567',
      extension: '56701234'
    });
    expect(result).toBe('1234');
  });
});
//# sourceMappingURL=index.test.js.map
