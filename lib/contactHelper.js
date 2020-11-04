"use strict";

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPhoneToContact = addPhoneToContact;
exports.uniqueContactItems = uniqueContactItems;
exports.sortContactItemsByName = sortContactItemsByName;
exports.groupByFirstLetterOfName = groupByFirstLetterOfName;
exports.filterContacts = filterContacts;
exports.getSearchContacts = getSearchContacts;
exports.getMatchContacts = getMatchContacts;
exports.getFindContact = exports.isExtensionExist = exports.isAnExtension = exports.AllContactSourceName = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.find");

var _ramda = require("ramda");

var _format = require("@ringcentral-integration/phone-number/lib/format");

var _isBlank = _interopRequireDefault(require("./isBlank"));

var _phoneTypes = require("../enums/phoneTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AllContactSourceName = 'all';
exports.AllContactSourceName = AllContactSourceName;

function addPhoneToContact(contact, phone, type) {
  if ((0, _isBlank["default"])(phone)) {
    return;
  }

  var existedPhone = contact.phoneNumbers.find(function (number) {
    return number && number.phoneNumber === phone;
  });

  if (existedPhone) {
    existedPhone.phoneType = type;
  } else {
    contact.phoneNumbers.push({
      phoneNumber: phone,
      phoneType: type.replace('Phone', '')
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
  var isNumber2 = /^[0-9]/.test(name2); // Empty string should be put at the end

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

function filterContacts(contacts, searchFilter) {
  var items = contacts;

  if (!searchFilter || (0, _isBlank["default"])(searchFilter)) {
    return items;
  }

  var searchText = searchFilter.toLowerCase();
  return items.filter(function (item) {
    var name = "".concat(item.firstName, " ").concat(item.lastName, " ").concat(item.name);

    if (name.toLowerCase().indexOf(searchText) >= 0 || item.extensionNumber && item.extensionNumber.indexOf(searchText) >= 0 || item.phoneNumbers && item.phoneNumbers.find(function (x) {
      return x.phoneNumber && x.phoneNumber.indexOf(searchText) >= 0;
    })) {
      return true;
    }

    return false;
  });
}

function getSearchContacts(_ref) {
  var contacts = _ref.contacts,
      entityType = _ref.entityType,
      searchString = _ref.searchString,
      options = _ref.options;

  if (!searchString) {
    return contacts;
  }

  var searchText = searchString.toLowerCase();
  var result = [];
  contacts.forEach(function (item) {
    var name = item.name || "".concat(item.firstName, " ").concat(item.lastName);
    item.phoneNumbers.forEach(function (p) {
      if (name.toLowerCase().indexOf(searchText) >= 0 || p.phoneNumber.indexOf(searchText) >= 0) {
        var _options$isMultipleSi;

        var phoneNumber = p.phoneNumber;
        var isMultipleSiteEnabled = (_options$isMultipleSi = options === null || options === void 0 ? void 0 : options.isMultipleSiteEnabled) !== null && _options$isMultipleSi !== void 0 ? _options$isMultipleSi : false; // Need to check multi-site ?

        if (p.phoneType === _phoneTypes.phoneTypes.extension && isMultipleSiteEnabled) {
          var _options$siteCode;

          // Remove site code of same site
          phoneNumber = (0, _format.formatSameSiteExtension)({
            currentSiteCode: (_options$siteCode = options === null || options === void 0 ? void 0 : options.siteCode) !== null && _options$siteCode !== void 0 ? _options$siteCode : '',
            extension: phoneNumber
          });
        }

        result.push({
          id: "".concat(item.id).concat(p.phoneNumber),
          name: name,
          type: item.type,
          phoneNumber: phoneNumber,
          phoneType: p.phoneType.replace('Phone', ''),
          entityType: entityType
        });
      }
    });
  });
  return result;
}

function getMatchContacts(_ref2) {
  var contacts = _ref2.contacts,
      phoneNumber = _ref2.phoneNumber,
      entityType = _ref2.entityType,
      _ref2$normalizeNumber = _ref2.normalizeNumber,
      normalizeNumber = _ref2$normalizeNumber === void 0 ? function (number) {
    return number;
  } : _ref2$normalizeNumber,
      _ref2$findContact = _ref2.findContact,
      findContact = _ref2$findContact === void 0 ? function (item) {
    return normalizeNumber(item.phoneNumber) === phoneNumber;
  } : _ref2$findContact;
  var result = [];
  contacts.forEach(function (contact) {
    var found = contact.phoneNumbers && contact.phoneNumbers.find(findContact);

    if (!found) {
      return;
    }

    var matchedContact = _objectSpread(_objectSpread({}, contact), {}, {
      phoneNumbers: _toConsumableArray(contact.phoneNumbers),
      entityType: entityType
    });

    result.push(matchedContact);
  });
  return result;
}

var isSameSite = function isSameSite(_ref3) {
  var _ref3$siteCode = _ref3.siteCode,
      siteCode = _ref3$siteCode === void 0 ? '' : _ref3$siteCode,
      extensionNumber = _ref3.extensionNumber,
      extensionFromContacts = _ref3.extensionFromContacts;

  /**
   * [multiple site number match role]:
   * Given an account which short extension starts with 0 in the same site, When short extension is equal to 0, it can match.
   * Otherwise it cannot match.
   */
  if (!siteCode || !/^[0-9]+$/.test(extensionNumber) || // to avoid special character in regular
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
  return number && number.length <= 6 && number[0] !== '+';
};
/**
 * check whether an extension is in contacts
 * @param {String} extensionNumber extensionNumber need to be checked
 * @param {String} extensionFromContacts extensionNumber from contact
 * @param {Boolean} options.isMultipleSiteEnabled
 * @param {String} options.siteCode
 * @returns {Boolean}
 */


exports.isAnExtension = isAnExtension;

var isExtensionExist = function isExtensionExist(_ref4) {
  var _options$siteCode2;

  var extensionNumber = _ref4.extensionNumber,
      extensionFromContacts = _ref4.extensionFromContacts,
      options = _ref4.options;

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

var getFindContact = function getFindContact(_ref5) {
  var phoneNumber = _ref5.phoneNumber,
      _ref5$options = _ref5.options,
      options = _ref5$options === void 0 ? {} : _ref5$options;
  return function (item) {
    if (item.phoneType === _phoneTypes.phoneTypes.extension) {
      return isAnExtension(phoneNumber) && isExtensionExist({
        extensionNumber: phoneNumber,
        extensionFromContacts: item.phoneNumber,
        options: options
      });
    }

    return item.phoneNumber === phoneNumber;
  };
};

exports.getFindContact = getFindContact;
//# sourceMappingURL=contactHelper.js.map
