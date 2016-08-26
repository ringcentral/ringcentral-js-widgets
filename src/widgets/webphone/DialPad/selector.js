import countryData from 'country-data';
import LPN from 'google-libphonenumber';

const phoneUtil = LPN.PhoneNumberUtil.getInstance();

function countryMapping(name) {
  return countryData.lookup.countries({ name })[0].alpha2;
}

function getInternationalPhone(raw, country = 'US') {
  if (!raw) return '';
  return phoneUtil.format(
    phoneUtil.parse(
      raw,
      country
    ),
    LPN.PhoneNumberFormat.INTERNATIONAL
  );
}

const numberTypeMapping = {
  CompanyFaxNumber: {
    priority: 0,
    abbr: 'Company',
  },
  CompanyNumber: {
    priority: 1,
    abbr: 'Company',
  },
  MainCompanyNumber: {
    priority: 2,
    abbr: 'Main',
  },
  DirectNumber: {
    priority: 3,
    abbr: 'Direct',
  },
};

export default (state, props, phone) => (
  {
    call: (...args) => phone.webphone.call(...args),
    userNumbers: state.common.user.phoneNumbers
      .sort((a, b) =>
        numberTypeMapping[b.usageType].priority - numberTypeMapping[a.usageType].priority)
      .map(number => Object.assign({}, number, {
        left: countryMapping(number.country.name),
        mid: getInternationalPhone(number.phoneNumber, countryMapping(number.country.name)),
        right: numberTypeMapping[number.usageType].abbr,
      })),
    loadRingAudio: (options) => phone.webphone.loadRingAudio(options),
  }
);
