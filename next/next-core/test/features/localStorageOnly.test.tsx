/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  StepFunction,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  App,
  createSharedApp,
  injectable,
  localStorageOnly,
  RcViewModule,
  render,
  storage,
  StoragePlugin,
} from '../../';

let defaultStorageValue: number;

beforeEach(() => {
  global.localStorage.clear();
  defaultStorageValue = 1;
});

@injectable({
  name: 'AppView',
})
class AppView extends RcViewModule {
  constructor(public storage: StoragePlugin) {
    super();
    this.storage.enable(this);
    expect(() => this.sum).toThrow();
    expect(() => {
      this.sum = 1;
    }).toThrow();
  }

  @localStorageOnly
  sum: any = defaultStorageValue;

  override component(props: Record<string, any>) {
    return null;
  }
}

@autorun(test)
@title('local storage work correctly')
class BaseSpaWithStorageInBaseMode extends Step {
  @examples([
    {
      value: undefined,
    },
    {
      value: null,
    },
    {
      value: 'str',
    },
    {
      value: 2,
    },
    {
      value: false,
    },
    {
      value: true,
    },
    {
      value: { foo: 'bar' },
    },
    {
      value: [1, 'test'],
    },
  ])
  run() {
    return (
      <Scenario desc="Base Module">
        <Given
          desc="Create and bootstrap base app"
          action={
            (async (_, context) => {
              defaultStorageValue = this.example.value;
              context.appModule = await createSharedApp({
                modules: [
                  StoragePlugin,
                  {
                    provide: 'Prefix',
                    useValue: 'app123',
                  },
                ],
                main: AppView,
                render,
                share: {
                  name: 'counter',
                  type: 'Base',
                },
              });
            }) as StepFunction<any, { appModule: App<AppView, any, any> }>
          }
        />
        <When
          desc="Basic value check"
          action={
            (async (_, context) => {
              const appView = context.appModule.container.got(AppView)!;
              expect(appView.sum).toEqual(defaultStorageValue);

              appView.sum = 10;

              const value = global.localStorage.getItem('app123-AppView.sum');

              expect(value).toBe('10');
              expect(appView.sum).toBe(10);

              appView.sum = defaultStorageValue;
              expect(appView.sum).toEqual(defaultStorageValue);
            }) as StepFunction<any, { appModule: App<AppView, any, any> }>
          }
        />
      </Scenario>
    );
  }
}

type InitHaveValueBaseSpaWithStorageInBaseModeProps = {
  value: string;
  expectResult: number | null;
};

@autorun(test)
@title('init have value local storage work correctly')
class InitHaveValueBaseSpaWithStorageInBaseMode extends Step {
  @examples(`
    | value   | expectResult |
    | '10000' | 10000        |
    | 'null'  | null         |
  `)
  run() {
    return (
      <Scenario desc="Base Module">
        <Given
          desc="Create and bootstrap base app"
          action={[
            ({ value }: InitHaveValueBaseSpaWithStorageInBaseModeProps) => {
              global.localStorage.setItem('app123-AppView.sum', value);
            },
            (async (_, context) => {
              context.appModule = await createSharedApp({
                modules: [
                  StoragePlugin,
                  {
                    provide: 'Prefix',
                    useValue: 'app123',
                  },
                ],
                main: AppView,
                render,
                share: {
                  name: 'counter',
                  type: 'Base',
                },
              });
            }) as StepFunction<any, { appModule: App<AppView, any, any> }>,
          ]}
        />
        <When
          desc="Basic value check"
          action={
            (async ({ expectResult }, context) => {
              const appView = context.appModule.container.got(AppView)!;
              expect(appView.sum).toBe(expectResult);

              appView.sum = 10;

              const value = global.localStorage.getItem('app123-AppView.sum');
              expect(value).toBe('10');
              expect(appView.sum).toBe(10);
            }) as StepFunction<
              InitHaveValueBaseSpaWithStorageInBaseModeProps,
              { appModule: App<AppView, any, any> }
            >
          }
        />
        <When
          desc="Set null"
          action={
            (async (_, context) => {
              const appView = context.appModule.container.got(AppView)!;

              appView.sum = null;

              const value = global.localStorage.getItem('app123-AppView.sum');
              expect(value).toBe('null');
              expect(appView.sum).toBe(null);
            }) as StepFunction<
              InitHaveValueBaseSpaWithStorageInBaseModeProps,
              { appModule: App<AppView, any, any> }
            >
          }
        />
      </Scenario>
    );
  }
}

@injectable({
  name: 'AppViewWithIndexDBStorage',
})
class AppViewWithIndexDBStorage extends RcViewModule {
  constructor(public storage: StoragePlugin) {
    super();
    this.storage.enable(this);
  }

  @storage
  sum2: number | null = 1;

  @localStorageOnly
  sum: number | null = 1;

  override component(props: Record<string, any>) {
    return null;
  }
}

@autorun(test)
@title('local storage work correctly')
class BaseSpaWithStorageInBaseModeWithStorage extends Step {
  run() {
    return (
      <Scenario desc="Base Module">
        <Given
          desc="Create and bootstrap base app"
          action={
            (async (_, context) => {
              context.appModule = await createSharedApp({
                modules: [
                  StoragePlugin,
                  {
                    provide: 'Prefix',
                    useValue: 'app123',
                  },
                ],
                main: AppViewWithIndexDBStorage,
                render,
                share: {
                  name: 'counter',
                  type: 'Base',
                },
              });
            }) as StepFunction<
              any,
              { appModule: App<AppViewWithIndexDBStorage, any, any> }
            >
          }
        />
        <When
          desc="Basic value check"
          action={
            (async (_, context) => {
              const appViewWithIndexDBStorage = context.appModule.container.got(
                AppViewWithIndexDBStorage,
              )!;
              expect(appViewWithIndexDBStorage.sum).toBe(1);

              appViewWithIndexDBStorage.sum = 10;

              const value = global.localStorage.getItem(
                'app123-AppViewWithIndexDBStorage.sum',
              );

              expect(value).toBe('10');
              expect(appViewWithIndexDBStorage.sum).toBe(10);
            }) as StepFunction<
              any,
              { appModule: App<AppViewWithIndexDBStorage, any, any> }
            >
          }
        />
      </Scenario>
    );
  }
}
