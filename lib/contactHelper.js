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
exports.getMatchContacts = getMatchContacts;
exports.AllContactSourceName = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.find");

var _ramda = require("ramda");

var _isBlank = _interopRequireDefault(require("./isBlank"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AllContactSourceName = 'all';
exports.AllContactSourceName = AllContactSourceName;

function addPhoneToContact(contact, phone, type) {
  if ((0, _isBlank.default)(phone)) {
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

  if (!searchFilter || (0, _isBlank.default)(searchFilter)) {
    return items;
  }

  var searchText = searchFilter.toLowerCase();
  return items.filter(function (item) {
    var name = "".concat(item.firstName, " ").concat(item.lastName, " ").concat(item.name);

    if (name.toLowerCase().indexOf(searchText) >= 0 || item.extensionNumber && item.extensionNumber.indexOf(searchText) >= 0 || item.phoneNumbers && item.phoneNumbers.find(function (x) {
      return x.phoneNumber.indexOf(searchText) >= 0;
    })) {
      return true;
    }

    return false;
  });
}

function getMatchContacts(_ref) {
  var contacts = _ref.contacts,
      phoneNumber = _ref.phoneNumber,
      entityType = _ref.entityType;
  var result = [];
  contacts.forEach(function (contact) {
    var found = contact.phoneNumbers && contact.phoneNumbers.find(function (number) {
      return number.phoneNumber === phoneNumber;
    });

    if (!found) {
      return;
    }

    var matchedContact = _objectSpread({}, contact, {
      phoneNumbers: _toConsumableArray(contact.phoneNumbers),
      entityType: entityType
    });

    result.push(matchedContact);
  });
  return result;
}
//# sourceMappingURL=contactHelper.js.map
