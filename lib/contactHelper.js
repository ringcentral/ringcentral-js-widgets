"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.some");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.assign");
require("core-js/modules/es.regexp.constructor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/es.string.includes");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.trim");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllContactSourceName = void 0;
exports.addPhoneToContact = addPhoneToContact;
exports.getFilterContacts = getFilterContacts;
exports.getFindPhoneNumber = void 0;
exports.getMatchContactsByPhoneNumber = getMatchContactsByPhoneNumber;
exports.getSearchForPhoneNumbers = getSearchForPhoneNumbers;
exports.groupByFirstLetterOfName = groupByFirstLetterOfName;
exports.isExtensionExist = exports.isAnExtension = void 0;
exports.isSearchHitContact = isSearchHitContact;
exports.sortContactItemsByName = sortContactItemsByName;
exports.uniqueContactItems = uniqueContactItems;
var _ramda = require("ramda");
var _format = require("@ringcentral-integration/phone-number/lib/format");
var _phoneTypes = require("../enums/phoneTypes");
var _isBlank = require("./isBlank");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var AllContactSourceName = 'all';
exports.AllContactSourceName = AllContactSourceName;
function addPhoneToContact(contact, phone, type) {
  if ((0, _isBlank.isBlank)(phone)) {
    return;
  }
  var existedPhone = contact.phoneNumbers.find(function (number) {
    return number && number.phoneNumber === phone;
  });
  /**
   * otherFax => fax
   * businessFax => fax
   * businessPhone => business
   * businessPhone2 => business
   */
  var phoneType;
  if (/Fax/.test(type)) {
    phoneType = 'fax';
  } else {
    phoneType = type.replace(/Phone2|Phone/, '');
  }
  if (existedPhone) {
    existedPhone.phoneType = phoneType;
  } else {
    contact.phoneNumbers.push({
      phoneNumber: phone,
      phoneType: phoneType
    });
  }
}
function uniqueContactItems() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var map = {};
  return (0, _ramda.reduce)(function (result, item) {
    var itemId = "".concat(item.type).concat(item.id);
    if (!map[itemId]) {
      map[itemId] = true;
      result.push(item);
    }
    return result;
  }, [], input);
}
var NON_ALPHABET_RE = /[^a-z]/i;
function byName(a, b) {
  var name1 = (a.name || '').toLowerCase().replace(/^\s\s*/, ''); // trim start
  var name2 = (b.name || '').toLowerCase().replace(/^\s\s*/, ''); // trim start
  var isNumber1 = /^[0-9]/.test(name1);
  var isNumber2 = /^[0-9]/.test(name2);
  // Empty string should be put at the end
  if (name1.length <= 0 || name2.length <= 0) {
    return -name1.localeCompare(name2);
  }
  if (isNumber1 && isNumber2) {
    return name1.localeCompare(name2);
  }
  if (isNumber1 || isNumber2) {
    // put number name at last
    return -name1.localeCompare(name2);
  }
  if (NON_ALPHABET_RE.test(name1[0]) && !NON_ALPHABET_RE.test(name2[0])) {
    return 1;
  }
  if (!NON_ALPHABET_RE.test(name1[0]) && NON_ALPHABET_RE.test(name2[0])) {
    return -1;
  }
  return name1.localeCompare(name2);
}
function sortContactItemsByName() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return input.sort(byName);
}
var POUND_SIGN = '#';
function groupByFirstLetterOfName() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var groups = [];
  if (input && input.length) {
    var group;
    input.forEach(function (contact) {
      var name = (contact.name || '').replace(/^\s\s*/, ''); // trim start
      var letter = null;
      if (name.length <= 0 || NON_ALPHABET_RE.test(name[0])) {
        letter = POUND_SIGN;
      } else {
        letter = (name[0] || '').toLocaleUpperCase();
      }
      if (!group || group.caption !== letter) {
        group = {
          contacts: [],
          caption: letter,
          id: letter
        };
        groups.push(group);
      }
      group.contacts.push(contact);
    });
  }
  return groups;
}
function isSearchHitContact(_ref) {
  var lowerSearch = _ref.lowerSearch,
    contact = _ref.contact;
  return (
    // search names
    !!contact.name && contact.name.toLowerCase().includes(lowerSearch) || [contact.firstName, contact.lastName].map(function (x) {
      return x && x.trim();
    }).filter(function (x) {
      return !!x;
    }).join(' ').toLowerCase().includes(lowerSearch) ||
    // search phones
    Array.isArray(contact.phoneNumbers) && contact.phoneNumbers.some(function (x) {
      return x.phoneNumber && x.phoneNumber.includes(lowerSearch);
    }) ||
    // search emails
    !!contact.email && contact.email.toLowerCase() === lowerSearch || Array.isArray(contact.emails) && contact.emails.map(function (x) {
      return x && x.toLowerCase();
    }).includes(lowerSearch)
  );
}
function getFilterContacts(contacts, searchFilter) {
  if (!searchFilter || (0, _isBlank.isBlank)(searchFilter)) {
    return contacts;
  }
  var lowerSearch = searchFilter.toLowerCase();
  return contacts.filter(function (contact) {
    return isSearchHitContact({
      lowerSearch: lowerSearch,
      contact: contact
    });
  });
}
function getSearchForPhoneNumbers(_ref2) {
  var contacts = _ref2.contacts,
    entityType = _ref2.entityType,
    searchString = _ref2.searchString,
    options = _ref2.options;
  if (!searchString) {
    return [];
  }
  var lowerSearch = searchString.toLowerCase();
  var result = [];
  contacts.forEach(function (contact) {
    if (!Array.isArray(contact.phoneNumbers) || !contact.phoneNumbers.length) {
      return;
    }
    var isContactHit = isSearchHitContact({
      lowerSearch: lowerSearch,
      contact: contact
    });
    contact.phoneNumbers.forEach(function (_ref3) {
      var phoneType = _ref3.phoneType,
        phoneNumber = _ref3.phoneNumber;
      if (isContactHit || phoneNumber && phoneNumber.includes(lowerSearch)) {
        var _contact$profileImage;
        if (phoneType === _phoneTypes.phoneTypes.extension && (options === null || options === void 0 ? void 0 : options.isMultipleSiteEnabled)) {
          var _options$siteCode;
          // Remove site code of same site
          phoneNumber = (0, _format.formatSameSiteExtension)({
            currentSiteCode: (_options$siteCode = options === null || options === void 0 ? void 0 : options.siteCode) !== null && _options$siteCode !== void 0 ? _options$siteCode : '',
            extension: phoneNumber
          });
        }
        result.push({
          id: "".concat(contact.id).concat(phoneNumber),
          contactId: contact.id,
          name: contact.name || "".concat(contact.firstName, " ").concat(contact.lastName),
          type: contact.type,
          phoneNumber: phoneNumber,
          phoneType: phoneType.replace('Phone', ''),
          profileImageUrl: (_contact$profileImage = contact.profileImage) === null || _contact$profileImage === void 0 ? void 0 : _contact$profileImage.uri,
          entityType: entityType
        });
      }
    });
  });
  return result;
}
function getMatchContactsByPhoneNumber(_ref4) {
  var contacts = _ref4.contacts,
    phoneNumber = _ref4.phoneNumber,
    entityType = _ref4.entityType,
    _ref4$findPhoneNumber = _ref4.findPhoneNumber,
    findPhoneNumber = _ref4$findPhoneNumber === void 0 ? function (item) {
      return item.phoneNumber === phoneNumber;
    } : _ref4$findPhoneNumber;
  var result = [];
  contacts.forEach(function (contact) {
    var found = contact.phoneNumbers && contact.phoneNumbers.find(findPhoneNumber);
    if (!found) {
      return;
    }
    var matchedContact = Object.assign({}, contact, {
      phoneNumbers: _toConsumableArray(contact.phoneNumbers || []),
      entityType: entityType
    });
    result.push(matchedContact);
  });
  return result;
}
var isSameSite = function isSameSite(_ref5) {
  var _ref5$siteCode = _ref5.siteCode,
    siteCode = _ref5$siteCode === void 0 ? '' : _ref5$siteCode,
    extensionNumber = _ref5.extensionNumber,
    extensionFromContacts = _ref5.extensionFromContacts;
  /**
   * [multiple site number match role]:
   * Given an account which short extension starts with 0 in the same site, When short extension is equal to 0, it can match.
   * Otherwise it cannot match.
   */
  if (!siteCode || !/^[0-9]+$/.test(extensionNumber) ||
  // to avoid special character in regular
  extensionNumber[0] === '0' && extensionNumber !== '0') {
    return false;
  }

  /**
   * [multiple site only]
   * The full extension number's length is fixed, no need to compute the frequency of 0.
   * For example, 21022, 210022 would not both exist at the same time
   */
  return new RegExp("^".concat(siteCode, "0*").concat(extensionNumber, "$")).test(extensionFromContacts);
};
var isAnExtension = function isAnExtension(number) {
  var maxExtensionLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return (number === null || number === void 0 ? void 0 : number.length) <= maxExtensionLength && number[0] !== '+';
};

/**
 * check whether an extension is in contacts
 */
exports.isAnExtension = isAnExtension;
var isExtensionExist = function isExtensionExist(_ref6) {
  var _options$siteCode2;
  var extensionNumber = _ref6.extensionNumber,
    extensionFromContacts = _ref6.extensionFromContacts,
    _ref6$options = _ref6.options,
    options = _ref6$options === void 0 ? {} : _ref6$options;
  if (extensionFromContacts === extensionNumber) {
    return true;
  }
  if (options.isMultipleSiteEnabled && isSameSite({
    siteCode: (_options$siteCode2 = options === null || options === void 0 ? void 0 : options.siteCode) !== null && _options$siteCode2 !== void 0 ? _options$siteCode2 : '',
    extensionNumber: extensionNumber,
    extensionFromContacts: extensionFromContacts
  })) {
    return true;
  }
  return false;
};
exports.isExtensionExist = isExtensionExist;
var getFindPhoneNumber = function getFindPhoneNumber(_ref7) {
  var phoneNumber = _ref7.phoneNumber,
    shouldMatchExtension = _ref7.shouldMatchExtension,
    _ref7$options = _ref7.options,
    options = _ref7$options === void 0 ? {} : _ref7$options;
  return function (item) {
    if (item.phoneType === _phoneTypes.phoneTypes.extension && shouldMatchExtension) {
      return isExtensionExist({
        extensionNumber: phoneNumber,
        extensionFromContacts: item.phoneNumber,
        options: options
      });
    }
    return item.phoneNumber === phoneNumber;
  };
};
exports.getFindPhoneNumber = getFindPhoneNumber;
//# sourceMappingURL=contactHelper.js.map
