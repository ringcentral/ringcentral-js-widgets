import { findPhoneNumbers } from 'libphonenumber-js';
import { forEach, find } from 'ramda';
import parse from '../parse';

function find7DigitNumbers(input, countryCode) {
  const output = [];
  const regex = /(?:^|[^\d\w#/])((?:\d[-\s]{0,1}){7,12}(?=[^\d]|$))/g;

  let match;
  do {
    match = regex.exec(input);
    if (match) {
      const {
        isValid,
        phoneNumber,
        hasPlus,
      } = parse({ input: match[0], countryCode });
      if (isValid && !hasPlus && phoneNumber.length === 7) {
        output.push({
          country: countryCode,
          phone: phoneNumber,
          startsAt: match.index,
          endsAt: match.index + match[0].length,
        });
      }
    }
  } while (match);
  return output;
}

function byStartsAt(a, b) {
  return a.startsAt - b.startsAt;
}

export default function detect({ input, countryCode = 'US', areaCode = '' }) {
  const output = findPhoneNumbers(input, countryCode);
  if (
    (countryCode === 'US' || countryCode === 'CA') &&
    areaCode.length === 3
  ) {
    const sevenDigits = find7DigitNumbers(input, countryCode);
    if (sevenDigits.length) {
      // keep a reference of the original output to search in
      const ref = output.slice();
      forEach(
        (item) => {
          if (!find(
            entry => (
              entry.startsAt <= item.startsAt &&
              entry.endsAt >= item.startsAt
            ),
            ref,
          )) {
            output.push(item);
          }
        },
        sevenDigits,
      );
    }
  }
  return output.sort(byStartsAt);
}
