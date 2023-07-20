import type CountryInfoShortModel from '@rc-ex/core/lib/definitions/CountryInfoShortModel';

/**
 * https://jira_domain/browse/RCINT-29161
 * Turkey renames to Türkiye
 */

export function renameTurkey(content: string) {
  if (typeof content !== 'string' || !content) {
    return content;
  }
  return content.replace(/Turkey/g, 'Türkiye');
}

export function renameTurkeyCountry(country: CountryInfoShortModel) {
  if (country?.name) {
    country.name = renameTurkey(country.name);
  }
  return country;
}

export function renameTurkeyCountries(countries: CountryInfoShortModel[]) {
  return countries.map((country) => renameTurkeyCountry(country));
}
