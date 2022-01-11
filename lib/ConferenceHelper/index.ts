import formatMessage from 'format-message';
import { map, reduce } from 'ramda';

import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import Conference from '@ringcentral-integration/commons/modules/Conference';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';

import countryNames from '../countryNames';
import i18n from './i18n';

// TODO: refactor options
export function getInviteTxt({
  brand,
  conference,
  locale,
  regionSettings,
}: {
  brand: Brand;
  conference: Conference;
  locale: Locale;
  regionSettings: RegionSettings;
}) {
  const { participantCode, phoneNumbers } = conference.data;
  let dialInNumber = conference.dialInNumber || '';
  const additionalNumbers = conference.additionalNumbers;
  const countryCounter = reduce(
    (acc, item) => {
      if (!acc[item.country.isoCode]) {
        acc[item.country.isoCode] = 1;
      } else {
        acc[item.country.isoCode] += 1;
      }
      return acc;
    },
    {} as Record<string, number>,
    phoneNumbers,
  );
  const dialInNumbers = map((item) => {
    const countryName = countryNames.getString(
      item.country.isoCode,
      locale.currentLocale,
    );
    // only show the provinces of canada
    return {
      region:
        countryCounter[item.country.isoCode] > 1
          ? `${countryName}, ${item.location}`
          : countryName,
      phoneNumber: item.phoneNumber,
      formattedPhoneNumber: formatNumber({
        phoneNumber: item.phoneNumber,
        countryCode: regionSettings.countryCode,
        areaCode: regionSettings.areaCode,
        international: true,
      }),
    };
  }, phoneNumbers);
  dialInNumber =
    dialInNumbers.find((e) => e.phoneNumber === dialInNumber) ||
    dialInNumbers[0];
  const formattedDialInNumber = dialInNumber.formattedPhoneNumber;
  const additionalNumbersTxt = additionalNumbers
    .map((p) => dialInNumbers.find((obj) => obj.phoneNumber === p))
    .map((fmt) => `${fmt.region}  ${fmt.formattedPhoneNumber}`)
    .join('\n');
  let additionalNumbersSection = '';
  if (additionalNumbers.length > 0) {
    additionalNumbersSection = `${i18n.getString(
      'internationalNumber',
      locale.currentLocale,
    )}\n${additionalNumbersTxt}`;
  }
  return formatMessage(
    i18n.getString(`inviteText_${brand.code}`, locale.currentLocale),
    {
      brandName: brand.name,
      formattedDialInNumber,
      additionalNumbersSection,
      participantCode: participantCode
        .replace(/(\d{3})/g, '$1-')
        .replace(/-$/, ''),
      dialInNumbersLink: brand.brandConfig.conference.dialInNumbersLink,
    },
  );
}
