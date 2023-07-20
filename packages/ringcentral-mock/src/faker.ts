/* eslint-disable global-require */
import type { JSONSchemaFakerOptions } from 'json-schema-faker';
import jsf from 'json-schema-faker';
import faker from '@faker-js/faker';

export type Generate = typeof jsf.generate;

export const fake = (
  locale = 'en_US',
  options: JSONSchemaFakerOptions = {
    failOnInvalidTypes: false,
    failOnInvalidFormat: false,
    alwaysFakeOptionals: true,
    optionalsProbability: true,
    fixedProbabilities: true,
    ignoreMissingRefs: true,
    maxItems: 2,
    maxLength: 100,
    // rethink about enable the toggles.
    useExamplesValue: true,
    useDefaultValue: true,
  },
) => {
  jsf.extend('faker', () => {
    faker.locale = locale;
    // faker.custom = {
    //   // TODO: more custom
    //   phoneNumber: (format: number) => {
    //     return faker.phone.phoneNumberFormat(format);
    //   },
    // };
    return faker;
  });

  jsf.option(options);
  return jsf.generate;
};
