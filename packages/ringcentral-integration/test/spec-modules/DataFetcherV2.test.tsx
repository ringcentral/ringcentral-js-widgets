import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  And,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';

import {
  DataFetcherV2,
  DataSource,
  DEFAULT_TTL,
  DEFAULT_RETRY,
  DEFAULT_RETRY_INTERVALS,
} from '../../modules/DataFetcherV2';

@autorun(test)
@title('DataSource default ttl')
export class DataSourceDefaultTTL extends Step {
  @examples(`
    | ttl       |
    | undefined |
    | null      |
  `)
  run() {
    return (
      <Scenario desc="DataSource::ttl=${ttl}">
        <Given
          desc="new DataSource with _props.ttl=${ttl}"
          action={(_: any, context: any) => {
            context.instance = new DataSource({
              key: 'foo',
              async fetchFunction() {},
              ttl: context.example.ttl,
            });
          }}
        />
        <Then
          desc="dataSource.ttl should use default when _props.ttl is null or undefined"
          action={(_: any, context: any) => {
            expect(context.instance.ttl).toBe(DEFAULT_TTL);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('DataSource default timeToRetry')
export class DataSourceDefaultTimeToRetry extends Step {
  @examples(`
    | timeToRetry |
    | undefined   |
    | null        |
  `)
  run() {
    return (
      <Scenario desc="DataSource::timeToRetry=${timeToRetry}">
        <Given
          desc="new DataSource with _props.timeToRetry=${timeToRetry}"
          action={(_: any, context: any) => {
            context.instance = new DataSource({
              key: 'foo',
              async fetchFunction() {},
              timeToRetry: context.example.timeToRetry,
            });
          }}
        />
        <Then
          desc="dataSource.timeToRetry should use default when _props.timeToRetry is null or undefined"
          action={(_: any, context: any) => {
            expect(context.instance.timeToRetry).toBe(DEFAULT_RETRY);
          }}
        />
      </Scenario>
    );
  }
}
@autorun(test)
@title('DataSource default retryIntervals')
export class DataSourceDefaultRetryIntervals extends Step {
  @examples(`
    | retryIntervals |
    | undefined      |
    | null           |
  `)
  run() {
    return (
      <Scenario desc="DataSource::retryIntervals=${retryIntervals}">
        <Given
          desc="new DataSource with _props.retryIntervals=${retryIntervals}"
          action={(_: any, context: any) => {
            context.instance = new DataSource({
              key: 'foo',
              async fetchFunction() {},
              retryIntervals: context.example.retryIntervals,
            });
          }}
        />
        <Then
          desc="dataSource.retryIntervals should use default when _props.retryIntervals is null or undefined"
          action={(_: any, context: any) => {
            expect(context.instance.retryIntervals).toBe(
              DEFAULT_RETRY_INTERVALS,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('DataSource default pollingInterval')
export class DataSourceDefaultPollingInterval extends Step {
  @examples(`
    | ttl       | pollingInterval   |
    | null      | undefined         |
    | null      | null              |
    | 10        | undefined         |
    | 10        | null              |
  `)
  run() {
    return (
      <Scenario desc="DataSource::pollingInterval=${pollingInterval}">
        <Given
          desc="new DataSource with _props.pollingInterval=${pollingInterval}, _props.ttl=${ttl}"
          action={(_: any, context: any) => {
            context.instance = new DataSource({
              key: 'foo',
              async fetchFunction() {},
              ttl: context.example.ttl,
              pollingInterval: context.example.pollingInterval,
            });
          }}
        />
        <Then
          desc="dataSource.pollingInterval should default to ttl when _props.pollingInterval is null or undefined"
          action={(_: any, context: any) => {
            expect(context.instance.pollingInterval).toBe(context.instance.ttl);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('DataSource pollingInterval constraint')
export class DataSourceDefaultPollingIntervalConstraint extends Step {
  @examples(`
    | ttl       | pollingInterval   |
    | 10        | 20                |
    | 10        | 5                 |
  `)
  run() {
    return (
      <Scenario desc="DataSource::pollingInterval=${pollingInterval}">
        <Given
          desc="new DataSource with _props.pollingInterval=${pollingInterval}, _props.ttl=${ttl}"
          action={(_: any, context: any) => {
            context.instance = new DataSource({
              key: 'foo',
              async fetchFunction() {},
              ttl: context.example.ttl,
              pollingInterval: context.example.pollingInterval,
            });
          }}
        />
        <Then
          desc="dataSource.pollingInterval should be set to ttl if _props.pollingInterval is smaller than _props.ttl"
          action={(_: any, context: any) => {
            if (context.example.pollingInterval < context.example.ttl) {
              expect(context.instance.pollingInterval).toBe(
                context.instance.ttl,
              );
            } else {
              expect(context.instance.pollingInterval).toBe(
                context.example.pollingInterval,
              );
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('DataSource cleanOnReset constraint')
export class DataSourceCleanOnResetConstraint extends Step {
  @examples(`
    | cleanOnReset   | disableCache |
    | false          | false        |
    | false          | true         |
    | true           | false        |
    | true           | true         |
  `)
  run() {
    return (
      <Scenario desc="DataSource::disableCache=${disableCache}, cleanOnReset=${cleanOnReset}">
        <Given
          desc="new DataSource with _props.disableCache=${disableCache} and _props.cleanOnReset=${cleanOnReset}"
          action={(_: any, context: any) => {
            context.instance = new DataSource({
              key: 'foo',
              async fetchFunction() {},
              cleanOnReset: context.example.cleanOnReset,
              disableCache: context.example.disableCache,
            });
          }}
        />
        <Then
          desc="dataSource.cleanOnReset should be true if dataSource.disableCache is true"
          action={(_: any, context: any) => {
            if (context.example.disableCache) {
              expect(context.instance.disableCache).toBe(true);
              expect(context.instance.cleanOnReset).toBe(true);
            }
          }}
        />
        <And
          desc="dataSource.cleanOnReset should be _props.cleanOnReset if disableCache is false"
          action={(_: any, context: any) => {
            if (!context.example.disableCache) {
              expect(context.instance.disableCache).toBe(false);
              expect(context.instance.cleanOnReset).toBe(
                context.example.cleanOnReset,
              );
            }
          }}
        />
      </Scenario>
    );
  }
}

class MockModule {
  _ready = true;
  get ready() {
    return this._ready;
  }
}

class MockAuth extends MockModule {
  loggedIn = true;
  async logout() {
    this.loggedIn = false;
  }
}

class MockSleepDetector extends MockModule {
  events = {
    detected: 'detected',
  };

  on() {}
}

class MockTabManager extends MockModule {}

class MockStorage extends MockModule {
  registerReducer() {}
}

@autorun(test)
@title('dataFetcher.register')
export class DataFetcherRegister extends Step {
  run() {
    return (
      <Scenario desc="dataFetcher.register should add dataSource to the register only once">
        <Given
          desc="DataFetcher instance, and a dataSource"
          action={(_: any, context: any) => {
            context.source = new DataSource({
              key: 'foo',
              fetchFunction: async () => 'foo',
            });
            context.instance = new DataFetcherV2({
              auth: new MockAuth() as any,
              sleepDetector: new MockSleepDetector() as any,
              storage: new MockStorage() as any,
              tabManager: new MockTabManager() as any,
            });
          }}
        />
        <When
          desc="the source is registered to the dataFetcher"
          action={(_: any, context: any) => {
            context.instance.register(context.source);
          }}
        />
        <Then
          desc="the source should appear in the sources set"
          action={(_: any, context: any) => {
            expect(context.instance.sources.has(context.source)).toBe(true);
            expect(context.instance.sources.size).toBe(1);
          }}
        />
        <When
          desc="attempting to add the same source again"
          action={(_: any, context: any) => {
            context.instance.register(context.source);
          }}
        />
        <Then
          desc="the source set should only list 1 source"
          action={(_: any, context: any) => {
            expect(context.instance.sources.has(context.source)).toBe(true);
            expect(context.instance.sources.size).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@title('DataFetcher::onReset')
class onReset extends Step {
  @examples(`
    | cleanOnReset | disableCache |
    | false        | false        |
    | false        | true         |
    | true         | false        |
    | true         | true         |
  `)
  run() {
    class MockDataFetcher extends DataFetcherV2 {
      args: any[];
      _setData(...args: any[]) {
        this.args = args;
      }

      getData(source: DataSource<any>): any {
        return true;
      }

      getTimestamp(source: DataSource<any>) {
        return Date.now();
      }
    }
    return (
      <Scenario desc="">
        <Given
          desc="DataFetcher instance and a dataSource with cleanOnReset=${cleanOnReset} and disableCache=${disableCache}"
          action={(_: any, context: any) => {
            context.instance = new MockDataFetcher({
              auth: new MockAuth() as any,
              sleepDetector: new MockSleepDetector() as any,
              storage: new MockStorage() as any,
              tabManager: new MockTabManager() as any,
            });
            context.source = new DataSource({
              key: 'foo',
              async fetchFunction() {},
              cleanOnReset: context.example.cleanOnRest,
              disableCache: context.example.disableCache,
            });
            context.instance.register(context.source);
          }}
        />
        <When
          desc="DataFetcher is reset"
          action={(_: any, context: any) => {
            context.instance.onReset();
          }}
        />
        <Then
          desc="DataFetcher should set data and timestamp to null if dataSource.cleanOnReset is true"
          action={(_: any, context: any) => {
            if (context.source.cleanOnReset) {
              expect(context.instance.args).toBeDefined();
              expect(context.instance.args[0]).toBe(context.source);
              expect(context.instance.args[1]).toBe(null);
              expect(context.instance.args[2]).toBe(null);
            } else {
              expect(context.instance.args).toBeUndefined();
            }
          }}
        />
      </Scenario>
    );
  }
}
