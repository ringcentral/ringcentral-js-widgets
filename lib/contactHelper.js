'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllContactSourceName = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.addPhoneToContact = addPhoneToContact;
exports.uniqueContactItems = uniqueContactItems;
exports.sortContactItemsByName = sortContactItemsByName;
exports.groupByFirstLetterOfName = groupByFirstLetterOfName;
exports.filterContacts = filterContacts;
exports.getMatchContacts = getMatchContacts;

var _isBlank = require('./isBlank');

var _isBlank2 = _interopRequireDefault(_isBlank);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AllContactSourceName = exports.AllContactSourceName = 'all';

function addPhoneToContact(contact, phone, type) {
  if ((0, _isBlank2.default)(phone)) {
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
      phoneType: type
    });
  }
}

function uniqueContactItems(result) {
  var items = result || [];
  // remove duplicated referencing
  items = items.filter(function (value, index, arr) {
    return arr.indexOf(value) === index;
  });
  // remove duplicated items by id
  var hash = {};
  var unique = [];
  items.forEach(function (item) {
    var itemId = '' + item.type + item.id;
    if (!hash[itemId]) {
      hash[itemId] = 1;
      unique.push(item);
    }
  });
  return unique;
}

var NON_ALPHABET_RE = /[^a-z]/i;
function sortContactItemsByName(result) {
  var items = result || [];
  items.sort(function (a, b) {
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
  });
  return items;
}

var POUND_SIGN = '#';
function groupByFirstLetterOfName(contactItems) {
  var groups = [];
  if (contactItems && contactItems.length) {
    var group = void 0;
    contactItems.forEach(function (contact) {
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
  if (!searchFilter || (0, _isBlank2.default)(searchFilter)) {
    return items;
  }
  var searchText = searchFilter.toLowerCase();
  return items.filter(function (item) {
    var name = item.firstName + ' ' + item.lastName;
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
    var matchedContact = (0, _extends3.default)({}, contact, {
      phoneNumbers: [].concat((0, _toConsumableArray3.default)(contact.phoneNumbers)),
      entityType: entityType
    });
    result.push(matchedContact);
  });
  return result;
}
//# sourceMappingURL=contactHelper.js.map
