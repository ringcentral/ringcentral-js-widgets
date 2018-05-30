import { reduce, sort } from 'ramda';
import isBlank from './isBlank';

export const AllContactSourceName = 'all';

export function addPhoneToContact(contact, phone, type) {
  if (isBlank(phone)) {
    return;
  }
  const existedPhone = contact.phoneNumbers.find(
    number => number && number.phoneNumber === phone
  );
  if (existedPhone) {
    existedPhone.phoneType = type;
  } else {
    contact.phoneNumbers.push({
      phoneNumber: phone,
      phoneType: type,
    });
  }
}

export function uniqueContactItems(input = []) {
  const map = {};
  return reduce(
    (result, item) => {
      const itemId = `${item.type}${item.id}`;
      if (!map[itemId]) {
        map[itemId] = true;
        result.push(item);
      }
      return result;
    },
    [],
    input,
  );
}

const NON_ALPHABET_RE = /[^a-z]/i;
function byName(a, b) {
  const name1 = (a.name || '').toLowerCase().replace(/^\s\s*/, ''); // trim start
  const name2 = (b.name || '').toLowerCase().replace(/^\s\s*/, ''); // trim start
  const isNumber1 = /^[0-9]/.test(name1);
  const isNumber2 = /^[0-9]/.test(name2);
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
export function sortContactItemsByName(input = []) {
  return input.sort(byName);
}

const POUND_SIGN = '#';
export function groupByFirstLetterOfName(input = []) {
  const groups = [];
  if (input && input.length) {
    let group;
    input.forEach((contact) => {
      const name = (contact.name || '').replace(/^\s\s*/, ''); // trim start
      let letter = null;
      if (name.length <= 0 || NON_ALPHABET_RE.test(name[0])) {
        letter = POUND_SIGN;
      } else {
        letter = (name[0] || '').toLocaleUpperCase();
      }
      if (!group || group.caption !== letter) {
        group = {
          contacts: [],
          caption: letter,
          id: letter,
        };
        groups.push(group);
      }
      group.contacts.push(contact);
    });
  }
  return groups;
}

export function filterContacts(contacts, searchFilter) {
  const items = contacts;
  if (!searchFilter || isBlank(searchFilter)) {
    return items;
  }
  const searchText = searchFilter.toLowerCase();
  return items.filter((item) => {
    const name = `${item.firstName} ${item.lastName}`;
    if (
      name.toLowerCase().indexOf(searchText) >= 0 ||
      (item.extensionNumber && item.extensionNumber.indexOf(searchText) >= 0) ||
      (item.phoneNumbers && item.phoneNumbers.find(x => x.phoneNumber.indexOf(searchText) >= 0))
    ) {
      return true;
    }
    return false;
  });
}

export function getMatchContacts({ contacts, phoneNumber, entityType }) {
  const result = [];
  contacts.forEach((contact) => {
    const found = contact.phoneNumbers && contact.phoneNumbers.find(
      number => (number.phoneNumber === phoneNumber)
    );
    if (!found) {
      return;
    }
    const matchedContact = {
      ...contact,
      phoneNumbers: [
        ...contact.phoneNumbers
      ],
      entityType,
    };
    result.push(matchedContact);
  });
  return result;
}
