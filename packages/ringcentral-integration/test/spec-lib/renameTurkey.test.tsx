import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  ut,
  When,
} from '@ringcentral-integration/test-utils';

import {
  renameTurkey,
  renameTurkeyCountry,
  renameTurkeyCountries,
} from '../../helpers/renameTurkey';

@autorun(test)
@ut
@title('Rename Turkey Test')
export class RenameTurkeyTest extends Step {
  @examples(`
    | content   | result    |
    | null      | null      |
    | undefined | undefined |
    | ''        | ''        |
    | 0         | 0         |
    | 'Turkey'       | 'Türkiye' |
    | 'TurkeyTurkey' | 'TürkiyeTürkiye' |
    | 'Turkey Turkey' | 'Türkiye Türkiye' |
    | '\\tTurkey \\nTurkey' | '\\tTürkiye \\nTürkiye' |
    | '\\nTurkey \\r\\nTurkey\\r\\n' | '\\nTürkiye \\r\\nTürkiye\\r\\n' |
  `)
  run() {
    return (
      <Scenario desc="Rename Turkey Test">
        <When
          desc="Text content and process function is provided"
          action={(_: unknown, context: any) => {
            context.func = renameTurkey;
            expect(typeof context.func).toBe('function');
          }}
        />
        <Then
          desc="should return ${result} after process ${content}"
          action={(_: unknown, { func, example }: any) => {
            expect(func(example.content)).toBe(example.result);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@title('Rename Turkey Country Test')
export class RenameTurkeyCountryTest extends Step {
  run() {
    return (
      <Scenario desc="Rename Turkey Country Test">
        <When
          desc="Country object and process function is provided"
          action={(_: unknown, context: any) => {
            context.func = renameTurkeyCountry;
            expect(typeof context.func).toBe('function');
          }}
        />
        <Then
          desc="should return expected result after process country object"
          action={(_: unknown, { func }: any) => {
            expect(
              func({
                name: 'Turkey',
              }),
            ).toEqual({
              name: 'Türkiye',
            });

            expect(
              func({
                name: 'Turkey',
                isoCode: 'tr-TR',
              }),
            ).toEqual({
              name: 'Türkiye',
              isoCode: 'tr-TR',
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@title('Rename Turkey Countries Test')
export class RenameTurkeyCountriesTest extends Step {
  run() {
    return (
      <Scenario desc="Rename Turkey Countries Test">
        <When
          desc="Country array and process function is provided"
          action={(_: unknown, context: any) => {
            context.func = renameTurkeyCountries;
            expect(typeof context.func).toBe('function');
          }}
        />
        <Then
          desc="should return expected result after process country array"
          action={(_: unknown, { func }: any) => {
            expect(
              func([
                { name: 'Turkey' },
                {
                  name: 'Turkey',
                  isoCode: 'tr-TR',
                },
              ]),
            ).toEqual([
              { name: 'Türkiye' },
              {
                name: 'Türkiye',
                isoCode: 'tr-TR',
              },
            ]);
          }}
        />
      </Scenario>
    );
  }
}
