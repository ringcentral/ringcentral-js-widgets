import detect from './';

const withPlus = [
  '+54 115 236 0151',
  '+61 2 8310 8040',
  '+43 1267 5659',
  '+32 2 808 91 42',
  '+22 96 150 9868',
  '+55 11 4380 8033',
  '+35 92 491 5120',
  '+1 587 316 4436',
  '+1 780 666 9719',
  '+1 902 701 0543',
  '+1 438 794 7820',
  '+1 613 699 2642',
  '+1 418 478 1534',
  '+1 306 500 6992',
  '+1 506 799 5774',
  '+1 647 494 4053',
  '+1 604 259 2561',
  '+1 204 500 0720',
  '+86 21 8024 5697',
  '+385 1 7776 206',
  '+357 22 222173',
  '+420 255 719 520',
  '+45 32 70 05 98',
  '+18 29 947 5214',
  '+50 32 136 7471',
  '+37 2 880 7860',
  '+358 9 42411127',
  '+33 173 078 713',
  '+49 307 6759 848',
  '+233 24 242 6021',
  '+302 11 198 7281',
  '+224 66 071 0308',
  '+85 25 803 4545',
  '+36 1 255 0356',
  '+353 1 487 0050',
  '+972 39 350 644',
  '+39 068 997 1954',
  '+81 6 4560 2947',
  '+254 20 5293 367',
  '+37 16 616 3975',
  '+37 05 214 1729',
  '+352 2786 1971',
  '+52 558 526 4582',
  '+31 10 798 6126',
  '+644 280 7452',
  '+47 21 93 97 86',
  '+507 833 8962',
  '+511 707 1429',
  '+48 22 116 84 79',
  '+351 308 807 355',
  '+17 87 945 0332',
  '+40 356 780 163',
  '+653 158 3925',
  '+421 233 325736',
  '+386 1 600 31 04',
  '+27 21 205 6202',
  '+34 935 22 01 25',
  '+46 85 050 17 23',
  '+41 22 560 74 07',
  '+886 27 705 4479',
  '+90 212 900 3677',
  '+44 203 875 4507',
  '+1 773 231 9226',
  '+16504371071',
  '+1 (650)437-1071',
  '+1(650)437 1071',
  '+1 (650) 437-1071',
  '+1 650 437 1071',
];
const usNumbers = [
  '16504371071',
  '(650)437-1071',
  '(650)437 1071',
  '650 437 1071',
  '1 650 437 1071',
  '1.650.437.1071',
  '650.437.1071',
  '1-650-437-1071',
];
const sevenDigits = [
  '437 1071',
  '437-1071',
];

const countryCodes = [
  'US',
  'CA',
  'GB',
  'FR',
  'DE',
];

describe('detect', () => {
  describe('numbers with +{country}', () => {
    test('should be detected regardless of default country', () => {
      withPlus.forEach((item) => {
        countryCodes.forEach((code) => {
          const matches = detect({ input: item, countryCode: code });
          expect(matches.length).toBe(1);
          expect(item.substring(matches[0].startsAt, matches[0].endsAt)).toBe(item);
        });
      });
    });
    test('should detect numbers without + if number is dialable in the defaultCountry', () => {
      usNumbers.forEach((item) => {
        const matches = detect({ input: item, countryCode: 'US' });
        expect(matches.length).toBe(1);
        expect(item.substring(matches[0].startsAt, matches[0].endsAt)).toBe(item);
      });
    });
    test('should accept 7-digit numbers if defaultCountry is US or CA and areaCode is given', () => {
      sevenDigits.forEach((item) => {
        let matches = detect({ input: item, countryCode: 'US', areaCode: '650' });
        expect(matches.length).toBe(1);
        expect(item.substring(matches[0].startsAt, matches[0].endsAt)).toBe(item);
        matches = detect({ input: item, countryCode: 'CA', areaCode: '416' });
        expect(matches.length).toBe(1);
        expect(item.substring(matches[0].startsAt, matches[0].endsAt)).toBe(item);
      });
    });
    test('should detect all numbers from input', () => {
      const matches = detect({
        input: `
          hello world +46 85 050 17 23
          +886 27 705 4479, test: 112-7772,
          more number: 339-1476
          long number: +41 22 560 74 07,
          `,
        countryCode: 'CA',
        areaCode: '416'
      });
      expect(matches.length).toBe(5);
    });
  });
});
