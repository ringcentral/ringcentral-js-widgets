import { reduce } from 'ramda';
import isBlank from './isBlank';
import phoneTypes from '../enums/phoneTypes';

export const AllContactSourceName = 'all';

export function addPhoneToContact(contact, phone, type) {
  if (isBlank(phone)) {
    return;
  }
  const existedPhone = contact.phoneNumbers.find(
    (number) => number && number.phoneNumber === phone,
  );
  if (existedPhone) {
    existedPhone.phoneType = type;
  } else {
    contact.phoneNumbers.push({
      phoneNumber: phone,
      phoneType: type.replace('Phone', ''),
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
    const name = `${item.firstName} ${item.lastName} ${item.name}`;
    if (
      name.toLowerCase().indexOf(searchText) >= 0 ||
      (item.extensionNumber && item.extensionNumber.indexOf(searchText) >= 0) ||
      (item.phoneNumbers &&
        item.phoneNumbers.find(
          (x) => x.phoneNumber && x.phoneNumber.indexOf(searchText) >= 0,
        ))
    ) {
      return true;
    }
    return false;
  });
}

export function getMatchContacts({
  contacts,
  phoneNumber,
  entityType,
  normalizeNumber = (number) => number,
  findContact = (item) => normalizeNumber(item.phoneNumber) === phoneNumber,
}) {
  const result = [];
  contacts.forEach((contact) => {
    const found =
      contact.phoneNumbers && contact.phoneNumbers.find(findContact);
    if (!found) {
      return;
    }
    const matchedContact = {
      ...contact,
      phoneNumbers: [...contact.phoneNumbers],
      entityType,
    };
    result.push(matchedContact);
  });
  return result;
}

const isSameSite = ({
  siteCode = '',
  extensionNumber,
  extensionFromContacts,
}) => {
  /**
   * [multiple site number match role]:
   * Given account in the same site and the short extension starts with 0, When then short extension is equal to 0, it can match.
   * Otherwise it cannot match.
   */
  if (
    !siteCode ||
    !/^[0-9]+$/.test(extensionNumber) || // to avoid special character in regular
    (extensionNumber[0] === '0' && extensionNumber !== '0')
  ) {
    return false;
  }

  /**
   * [multiple site only]
   * The full extension number's length is fixed, no need to compute the frequency of 0.
   * For example, 21022, 210022 would not both exist at the same time
   */
  return new RegExp(`^${siteCode}0*${extensionNumber}$`).test(
    extensionFromContacts,
  );
};

export const isAnExtension = (number) => {
  return number && number.length <= 6 && number[0] !== '+';
};

/**
 * check whether an extension is in contacts
 * @param {String} extensionNumber extensionNumber need to be checked
 * @param {String} extensionFromContacts extensionNumber from contact
 * @param {Boolean} options.isMultipleSiteEnabled
 * @param {String} options.site.code
 * @returns {Boolean}
 */
export const isExtensionExist = ({
  extensionNumber,
  extensionFromContacts,
  options,
}) => {
  if (extensionFromContacts === extensionNumber) {
    return true;
  }
  if (
    options.isMultipleSiteEnabled &&
    isSameSite({
      siteCode: options.site?.code ?? '',
      extensionNumber,
      extensionFromContacts,
    })
  ) {
    return true;
  }
  return false;
};

export const getFindContact = ({ phoneNumber, options = {} }) => (item) => {
  if (item.phoneType === phoneTypes.extension) {
    return (
      isAnExtension(phoneNumber) &&
      isExtensionExist({
        extensionNumber: phoneNumber,
        extensionFromContacts: item.phoneNumber,
        options,
      })
    );
  }
  return item.phoneNumber === phoneNumber;
};
