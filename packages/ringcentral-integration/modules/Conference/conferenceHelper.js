import formatNumber from '../../lib/formatNumber';

export async function updateJoinBeforeHost(client, allowJoinBeforeHost) {
  const data = await client.account().extension().conferencing()
    .put({ allowJoinBeforeHost });
  return data;
}

export async function getConferenceInfo(client) {
  const data = await client.account().extension().conferencing().get();
  return data;
}

export function formatDialInNumbers({
  currentLocale,
  phoneNumbers,
  countryCode,
  areaCode,
  countryNames,
}) {
  const countryCounter = phoneNumbers.reduce((acc, item) => {
    if (!acc[item.country.isoCode]) {
      acc[item.country.isoCode] = 1;
    } else {
      acc[item.country.isoCode] += 1;
    }
    return acc;
  }, {});
  const dialInNumbers = phoneNumbers.map((item) => {
    const countryName = countryNames.getString(item.country.isoCode, currentLocale);
    // only show the provinces of canada
    return {
      region: countryCounter[item.country.isoCode] > 1 ?
        `${countryName}, ${item.location}` :
        countryName,
      phoneNumber: item.phoneNumber
    };
  });
  return dialInNumbers.map(e => ({
    ...e,
    formattedPhoneNumber: formatNumber({
      phoneNumber: e.phoneNumber,
      countryCode,
      areaCode,
      international: true
    })
  }));
}
