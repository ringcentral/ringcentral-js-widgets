import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';

import { DateTimeFormat } from '../../modules/DateTimeFormatV2';

@autorun(test)
@title('addFormatter function with ${JSON.stringify(option)} & error: ${error}')
export class AddFormatter extends Step {
  @examples(`
    | option                  | error |
    | { formatter: () => {} } | false |
    | { name: null }          | true  |
    | { name: undefined }     | true  |
    | { name: '' }            | true  |
    | { name: '' }            | true  |
    | { formatter: undefined }| true  |
    | { formatter: 123 }      | true  |
    | { formatter: {} }       | true  |
    | { formatter: 'bar' }    | true  |
  `)
  run() {
    interface Context {
      example: { option: { formatter: any; name: any }; error: boolean };
      module: DateTimeFormat;
      formatter: (...args: any) => any;
      name: string;
    }
    return (
      <Scenario desc="add formatter function to the module">
        <Given
          desc="Create a 'DateTimeFormat' instance"
          action={(_: any, context: Context) => {
            context.module = new DateTimeFormat({
              locale: { currentLocale: 'en-US' } as any,
            });
          }}
        />
        <When
          desc="Execute 'addFormatter' method with ${JSON.stringify(option)}"
          action={(_: any, context: Context) => {
            context.name =
              'name' in context.example.option
                ? context.example.option.name
                : 'foo';
            context.formatter =
              'formatter' in context.example.option
                ? context.example.option.formatter
                : () => {};
            if (!context.example.error) {
              context.module.addFormatter({
                name: context.name,
                formatter: context.formatter,
              });
            }
          }}
        />
        <Then
          desc="be added formatter function to the module is error ${error}"
          action={(_: any, context: Context) => {
            if (context.example.error) {
              expect(() =>
                context.module.addFormatter({
                  name: context.name,
                  formatter: context.formatter,
                }),
              ).toThrow();
            } else {
              expect(context.module._formatters[context.name]).toEqual(
                context.formatter,
              );
              expect(() => {
                context.module.addFormatter({
                  name: context.name,
                  formatter: () => {},
                });
              }).toThrow();
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('formatDateTime function should call named formatter')
export class FormatDateTime1 extends Step {
  run() {
    interface Context {
      module: DateTimeFormat;
      formatter: any;
    }
    return (
      <Scenario desc="formatDateTime function">
        <Given
          desc="Create a 'DateTimeFormat' instance"
          action={(_: any, context: Context) => {
            context.module = new DateTimeFormat({
              locale: { currentLocale: 'en-US' } as any,
            });
          }}
        />
        <When
          desc="Execute 'formatDateTime' method"
          action={(_: any, context: Context) => {
            const name = 'foo';
            context.formatter = jest.fn();
            context.module.addFormatter({
              name,
              formatter: context.formatter,
            });
            context.module.formatDateTime({
              name,
              utcTimestamp: Date.now(),
            } as any);
          }}
        />
        <Then
          desc="should call named formatter"
          action={(_: any, context: Context) => {
            expect(context.formatter.mock.calls.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title(
  'formatDateTime function should pass utcTimestamp, locale, type to formatter',
)
export class FormatDateTime2 extends Step {
  run() {
    interface Context {
      module: DateTimeFormat;
    }
    return (
      <Scenario desc="formatDateTime function">
        <Given
          desc="Create a 'DateTimeFormat' instance"
          action={(_: any, context: Context) => {
            context.module = new DateTimeFormat({
              locale: { currentLocale: 'en-US' } as any,
            });
          }}
        />
        <Then
          desc="should pass utcTimestamp, locale, type to formatter"
          action={(_: any, context: any) => {
            const options = {
              locale: 'foo',
              type: 'bar',
              utcTimestamp: Date.now(),
            };
            context.module._defaultFormatter = (args: any) => {
              expect(args).toEqual(options);
            };
            context.module.formatDateTime(options);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title(
  'formatDateTime function should default locale to this._locale.currentLocale',
)
export class FormatDateTime3 extends Step {
  run() {
    interface Context {
      module: DateTimeFormat;
      currentLocale: string;
    }
    return (
      <Scenario desc="formatDateTime function">
        <Given
          desc="Create a 'DateTimeFormat' instance"
          action={(_: any, context: Context) => {
            context.currentLocale = 'foo';
            context.module = new DateTimeFormat({
              locale: { currentLocale: context.currentLocale } as any,
            });
          }}
        />
        <Then
          desc="should default locale to this._locale.currentLocale"
          action={(_: any, context: any) => {
            const options = {
              type: 'bar',
              utcTimestamp: Date.now(),
            };
            context.module._defaultFormatter = (args: any) => {
              expect(args).toEqual({
                ...options,
                locale: context.currentLocale,
              });
            };
            context.module.formatDateTime(options);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('formatDate function should call formatDateTime with type set to "date"')
export class FormatDate extends Step {
  run() {
    interface Context {
      module: DateTimeFormat;
    }
    return (
      <Scenario desc="formatDate function">
        <Given
          desc="Create a 'DateTimeFormat' instance"
          action={(_: any, context: Context) => {
            context.module = new DateTimeFormat({
              locale: { currentLocale: 'en-US' } as any,
            });
          }}
        />
        <Then
          desc="should call formatDateTime with type set to 'date'"
          action={(_: any, context: Context) => {
            const options = {
              locale: 'foo',
              name: 'bar',
              utcTimestamp: Date.now(),
            };
            context.module.formatDateTime = jest.fn();
            context.module.formatDate(options);
            expect(
              (context.module.formatDateTime as any).mock.calls[0][0],
            ).toEqual({
              ...options,
              type: 'date',
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('formatTime function should call formatDateTime with type set to "time"')
export class FormatTime extends Step {
  run() {
    interface Context {
      module: DateTimeFormat;
    }
    return (
      <Scenario desc="formatTime function">
        <Given
          desc="Create a 'DateTimeFormat' instance"
          action={(_: any, context: Context) => {
            context.module = new DateTimeFormat({
              locale: { currentLocale: 'en-US' } as any,
            });
          }}
        />
        <Then
          desc="should call formatDateTime with type set to 'time'"
          action={(_: any, context: Context) => {
            const options = {
              locale: 'foo',
              name: 'bar',
              utcTimestamp: Date.now(),
            };
            context.module.formatDateTime = jest.fn();
            context.module.formatTime(options);
            expect(
              (context.module.formatDateTime as any).mock.calls[0][0],
            ).toEqual({
              ...options,
              type: 'time',
            });
          }}
        />
      </Scenario>
    );
  }
}
