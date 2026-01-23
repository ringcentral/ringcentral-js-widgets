# @ringcentral-integration/next-core

This is the foundation package for RingCentral integration products, it is based on `Reactant`.
`Reactant` is a progressive framework based on `Redux`, `Inversify`, `React Router`, and `Mutative` for OOP module model design.

It supports building shared web applications that support multiple windows.

-   Shared Tab
-   Shared Worker
-   Detached window
-   iframe
-   Any other data-transport based application port, such as WebRTC

## Table of Contents

-   [@ringcentral-integration/next-core](#ringcentral-integrationnext-core)
    -   [Table of Contents](#table-of-contents)
    -   [Usage](#usage)
    -   [APIs](#apis)
        -   [Dependency Injection](#dependency-injection)
            -   [@injectable()](#injectable)
            -   [@inject()](#inject)
            -   [@optional()](#optional)
            -   [ModuleRef](#moduleref)
        -   [RcModule APIs](#rcmodule-apis)
            -   [@state](#state)
            -   [@action](#action)
            -   [@computed()](#computed)
            -   [delegate](#delegate)
            -   [logger](#logger)
        -   [RcViewModule APIs](#rcviewmodule-apis)
        -   [State Subscription APIs](#state-subscription-apis)
            -   [watch()](#watch)
            -   [subscribe()](#subscribe)
        -   [Storage APIs](#storage-apis)
            -   [@storage](#storage)
            -   [@userStorage](#userstorage)
        -   [Router APIs](#router-apis)
        -   [createApp()](#createapp)
        -   [i18n](#i18n)
        -   [PortManager APIs](#portmanager-apis)
        -   [Debugging](#debugging)
            -   [Redux DevTools](#redux-devtools)
        -   [Module Lifecycle Check](#module-lifecycle-check)
        -   [Module Performance Track](#module-Performance-track)
        -   [Plugin Module](#plugin-module)
        -   [Dynamic Module](#dynamic-module)
        -   [Abstract class](#abstract-module)
        -   [Subclass](#subclass)

## Usage

```bash
yarn add @ringcentral-integration/next-core
```

```ts
const app = await createApp(config);
app.bootstrap(document.getElementById('app'));
```

## APIs

### Dependency Injection

The foundation package provides dependency injection, which supports TypeScript(also supports JavaScript), and we recommend the `experimentalDecorators` feature based on TypeScript, as well as `Reflect.metadata` to record the dependency injection metadata.

> If using `babel`, make sure that you install `@babel/plugin-propose-decorators`, `babel-plugin-transform-typescript-metadata` and configure the babel settings correctly.

To enable experimental support for decorators, you must enable the `experimentalDecorators` and `emitDecoratorMetadata` compiler option either on the command line or in your tsconfig.json:

```json
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

#### @injectable()

Use `@injectable()`, it will turn the current module into an injectable module.

```ts
@injectable({
    name: 'Foo',
})
class Foo extends RcModule {}

@injectable({
    name: 'Bar',
})
class Bar extends RcModule {
    constructor(protected foo: Foo) {
        super();
    }
}
```

> If it does not depend on any other module, in fact, the `@injectable()` modifier of the current module can be omitted, and turns it into an injectable module and injects it automatically when the `createApp()` runs.

## @inject()

Use `@inject()` and bring its corresponding identifier parameter as dependency injection module.

> If you only inject the class itself as a dependency identifier, then you can use `protected bar: Bar`.

```ts
interface Bar {
    text: string;
}

@injectable({
    name: 'Foo',
})
class Foo extends RcModule {
    constructor(@inject('Bar') protected bar: Bar) {
        super();
    }

    get text() {
        return this.bar.text;
    }
}
```

#### @optional()

Use `optional()` with a dependency identifier that you can use to inject an optional module.

> If you only need the class itself as a dependency identifier, then you can abbreviate `@optional(Bar) protected bar?: Bar` to `@optional() protected bar?: Bar`.

```ts
interface Bar {
    text: string;
}

@injectable({
    name: 'Foo',
})
class Foo extends RcModule {
    constructor(@optional('Bar') public bar?: Bar) {
        super();
    }

    get text() {
        return this.bar?.text;
    }
}
```

> Optional modules are not automatically injected by default. If you need it, please specify the injected module on `createApp()`.

#### ModuleRef

If the app have circular dependencies, you can define a getter in this module and use `ModuleRef` to dynamically obtain an instance of the dependency.

```ts
@injectable({
    name: 'Bar',
})
class Bar extends RcModule {
    constructor(public foo: Foo) {
        super();
    }
}

@injectable({
    name: 'Foo',
})
class Foo extends RcModule {
    constructor(public moduleRef: ModuleRef) {
        super();
    }

    get bar() {
        return this.moduleRef.get(Bar);
    }
}
```

### RcModule APIs

`@ringcentral-integration/next-core` provides `RcModule` base module, decorators `@state`, `@action`, `@computed`.

-   onInit()

`onInit` lifecycle for current initialization after all deps modules are all ready.

-   onInitOnce()

`onInitOnce` once lifecycle for current initialization after all deps modules are all ready.

-   onInitSuccess()

`onInitSuccess` lifecycle for current initialization after this module is ready.

-   onReset()

`onReset` lifecycle for current reset after one of deps modules is not ready.

The first full lifecycle is `onInitOnce() -> onInit() -> "this.ready === true" -> onInitSuccess()`.
And The re-login lifecycle is `logout -> onReset() -> login -> onInit() -> "this.ready === true" -> onInitSuccess()`.

> If the current module has persistent state, then the full lifecycle can only start when the hydration is completed.

For example:

```ts
import {
    RcModule,
    state,
    action,
    computed,
} from '@ringcentral-integration/next-core';

class Auth extends RcModule {
    constructor(protected _client: Client) {
        super();
    }

    @state
    connected = '';

    @action
    changeConnection(connected) {
        this.connected = connected;
    }

    async connect() {
        await this._client.connect();
        this.changeConnection(true);
    }

    @computed((that: Auth) => [that.connected])
    get permissions() {
        return { writeable: this.connected, readable: true };
    }

    override async onInitSuccess() {
        //
    }
}
```

#### @state

`@state` is used to decorate a module state, which is based on the Redux reducer.

-   that will be an state in redux, and never be clear after some view be destroyed.
-   if you want that state only inside some components, should use `useState` from React.

#### @action

`@action` is used to decorate a method that changes the state of the module (Executing it will dispatch a Redux action), and it does **NOT** support asynchronous methods.

> The method decorated with `@action` in the current module **CAN** call the method decorated with `@action` in other modules.

-   The `@action` decorated method should have **no side effects**.

```ts
@injectable({
    name: 'ContactsList',
})
class ContactsList extends RcModule {
    constructor() {
        super();
    }

    @state
    contacts: Contact[] = [];

    @action
    addContacts(contacts: Contact[]) {
        // ❌ bad practice
        contacts.forEach(() => {
            // fetch avatar
        });
        // ....
    }

    override onInitOnce() {
        // ✅ good practice
        watch(
            this,
            () => this.contacts,
            () => {
                // fetch avatar
            },
        );
    }
}
```

-   The state operations in the methods decorated by `@action` should be \*_mutation updates_ as possible to ensure patch minimization.

```ts
@injectable({
    name: 'ContactsList',
})
class ContactsList extends RcModule {
    constructor() {
        super();
    }

    @state
    contacts: Contact[] = [];

    @action
    addContact(contact: Contact) {
        // ❌ bad practice
        this.contacts = [...this.contacts, contact];
    }

    @action
    addContact(contact: Contact) {
        // ✅ good practice
        this.contacts.push(contact);
    }
}
```

> `@action` supports calling other actions that execute other update states and merge updates into the UI (They must be the current module state, cross-module states will still be updated one by one).

#### @computed()

`@computed` supports automatic collection of dependencies and automatic re-computing when the state of a dependency changes.

> Note: Automatic collection of dependent target properties is only supported for properties decorated by @state and getter fields decorated by @computed.

If you want to manage dependencies manually then, you can use `@computed(callback)` for a getter, you should make sure that the return value of its callback function is an `Array` of dependency collections.

```ts
@injectable({
    name: 'Auth',
})
class Auth extends RcModule {
    constructor() {
        super();
    }

    @state
    connected = '';

    @state
    readable = false;

    @computed
    // or you can also manage dependencies manually like this:
    // @computed((that: Auth) => [that.connected, that.readable])
    get permissions() {
        return {
            writeable: getWriteable(this.connected),
            readable: this.readable,
        };
    }
}
```

> Note: The `@computed` decorator only supports getter fields, and the getter fields must be `readonly`. During the execution of a getter with `@computed`, no `@action` methods should be invoked.

#### delegate

The `delegate()` supports both function calls and being used as a decorator.

> To maintain flexibility in the execution of delegates, we recommend giving priority to using function calls.

1. Using function:

-   You can simply delegate usage like this: `await delegate(this.counter, 'increment');`, with the default delegation target being 'server'.
-   If you want to include the arguments of the function being delegated, then you can use it like this: `await delegate(this.counter, 'decrement', [1]);`.

By defining the 'target' options of `delegate()`, we can specify our execution target. The following targets are supported:

-   `await delegate(this.counter, 'increment', [], { target: 'server' });`

It is equivalent to `await delegate(this.counter, 'increment')`.
Delegate execution, run that method in `server`.
Unless the target is 'server', there are no more options available.

-   `delegate(this.counter, 'increment', [], { target: 'all' });`

Parallel execution, run that method in all `clients` and `server`.

-   `delegate(this.counter, 'increment', [], { target: 'clients' });`

Parallel execution, run that method in all `clients`.

-   `await delegate(this.counter, 'increment', [], { target: 'mainClient' });`

Delegate execution in `main client`.

2. Using decorator:

-   `@delegate('server')`

Delegate execution, run that method in `server`.

-   `@delegate('all')`

Parallel execution, run that method in all `clients` and `server`.

-   `@delegate('clients')`

Parallel execution, run that method in all `clients`.

-   `@delegate('mainClient')`

Delegate execution in `main client`.

#### logger

The `logger` is a built-in logger that supports `info`, `warn`, `error`, `debug`, and `trace` methods.

```ts
@injectable({
    name: 'Counter',
})
class Counter extends RcModule {
    constructor() {
        super();
    }

    @state
    count = 0;

    @action
    increment() {
        this.count += 1;
        this.logger.info('increment', this.count);
    }
}
```

## RcViewModule APIs

We can be used to implement a module with a View by inheriting the `RcViewModule` and defining the `component` method (a React function component).

It is possible to inject any method of the current `RcViewModule` in its `component`, and also to inject the current shared module state or other dependent module state using `useConnector()` React hook:

```tsx
interface Todo {
    text: string;
    completed: boolean;
}

@injectable({
    name: 'TodoView',
})
class TodoView extends RcViewModule {
    @state
    list: Todo[] = [];

    addTodo(text: string) {
        this.list.push({
            text,
            completed: false,
        });
    }

    @action
    toggleTodo(key: number, value: boolean) {
        this.list[key].completed = !value;
    }

    component() {
        const list = useConnector(() => this.list);
        return (
            <ul>
                {this.list.map(({ text, completed }, key) => (
                    <li
                        key={key}
                        onClick={() => this.toggleTodo(key, completed)}
                    >
                        {text}
                    </li>
                ))}
            </ul>
        );
    }
}
```

`useConnector` also supports returning a state object, which automatically makes shallow comparisons:

```ts
const { list, visibilityFilter } = useConnector(() => ({
    list: this.list,
    visibilityFilter: this.visibilityFilter,
}));
```

It should be noted that while the `ViewModule` supports inheritance, function components based on `component` method implementations must be called in the same way as components based on superclass `component` methods, not using the jsx:

```tsx
@injectable({
    name: 'BaseFooView',
})
class BaseFooView extends RcViewModule {
    component() {
        return <span>foo</span>;
    }
}

@injectable({
    name: 'FooView',
})
class FooView extends BaseFooView {
    component(props) {
        return (
            <>
                <span>foo</span>
                {
                    super.component(props)
                    // Don't make it: <super.component />
                }
            </>
        );
    }
}
```

### State Subscription APIs

#### watch()

You can use watch() to observe a specific state changes in any class module.

For example,

```ts
@injectable({
    name: 'Counter',
})
class Counter extends RcModule {
    constructor() {
        super();
        watch(
            this,
            () => this.count.sum,
            (newValue, oldValue) => {
                //
            },
        );
    }

    @state
    count = { sum: 0 };
}
```

You can pass the option `{ multiple: true }`, which will support watching multiple values.

For example,

```ts
@injectable({
    name: 'Counter',
})
class Counter extends RcModule {
    constructor() {
        super();
        watch(
            this,
            () => [this.count0, this.count1] as const,
            ([newCount0, newCount1], [oldCount0, oldCount0]) => {
                //
            },
            {
                multiple: true,
            },
        );
    }

    @state
    count0 = 0;

    @state
    count1 = 0;
}
```

> watch option supports passing in `{ isEqual: () => {} }` function for custom equal.

#### subscribe()

You can use subscribe() to subscribe state changes in any class module.

For example,

```ts
@injectable({
    name: 'Counter',
})
class Counter extends RcModule {
    constructor() {
        super();
        subscribe(this, () => {
            //
        });
    }

    @state
    count = { sum: 0 };
}
```

### Storage APIs

#### @storage

You can use @storage to decorate a persistent state, and execute enable(instance) to enable the ability of persistence. When the account logouts, this persistence state will be cleared.

```ts
@injectable({
    name: 'Counter',
})
class Counter extends RcViewModule {
    constructor(public storage: StoragePlugin) {
        super();
        this.storage.enable(this);
    }

    @storage
    @state
    sum = 0;

    @action
    increment() {
        this.sum += 1;
    }
}
```

#### @userStorage

If you want the persistent state not to be cleared when the current account logouts, you can use `@userStorage` to decorate a persistent state.

```ts
@injectable({
    name: 'Counter',
})
class Counter extends RcViewModule {
    constructor(public storage: StoragePlugin) {
        super();
        this.storage.enable(this);
    }

    @userStorage
    @state
    sum = 0;

    @action
    increment() {
        this.sum += 1;
    }
}
```

> You can use `storage.purge()` for clear all storage.

### Router APIs

The foundation package provides a router based on `React Router` v5.3.1, and you can use the `Router` module to define the routing configuration.

```ts
const app = await createSharedApp({
    modules: [
        RouterPlugin,
        {
            provide: RouterOptions,
            useValue: {
                createHistory: () => createBrowserHistory(),
            } satisfies IRouterOptions,
        },
    ],
    main: AppView,
    render,
});
```

History is a dependency of the router, and you can use `createBrowserHistory`, `createHashHistory` or `createMemoryHistory` to create a history object. For detail information, please refer to the [React Router](https://v5.reactrouter.com/) and [history](https://github.com/remix-run/history) documentation.

### createSharedApp()

The `createSharedApp()` method is used to create a shared application, and you can use it to create a shared application that supports multiple windows or Base mode app.

```ts
const app = await createSharedApp({
    modules: [
        RouterPlugin,
        {
            provide: RouterOptions,
            useValue: {
                createHistory: () => createBrowserHistory(),
            } satisfies IRouterOptions,
        },
    ],
    main: AppView,
    render,
    share: {
        name,
        type: 'Base', // 'Base' | 'SharedTab' | 'SharedWorker'
    },
});
```

If you want to create a shared application that supports multiple windows, you can use the `SharedWorker` type, When the browser does not support SharedWorker, then the program will automatically downgrade to setting `SharedTab`.

### i18n

The foundation package provides an i18n hooks, and you can use the `useLocale()` React hook to get the `t` function.

```ts
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';

import i18n from './i18n';

const { t } = useLocale(i18n);
const text = t('loginSuccess');
```

### PortManager

If you want to do the multiprocessing programming, you can use the `PortManager` module to manage the ports. You can read the [PortManager public API](src/modules/PortManager.ts) for more information.

You can use it to manage the logic for different types of ports:
* On the server side, you can use `onServer` to manage server-side port logic.
* On the client side, you can use `onClient` to manage client-side port logic.
* On the main tab side, you can use `onMainTab` to manage main tab port logic.

For example:

```ts
@injectable({
    name: 'App',
})
class App extends RcModule {
    constructor() {
        super();

        if (this._portManager.shared) {
            this._portManager.onServer(() => this.initializeOnServer());
            this._portManager.onClient(() => this.initializeOnClient());
        } else {
            this.initializeOnServer();
            this.initializeOnClient();
        }
    }
}
```

### Debugging

You can use `devOptions` for debugging, and you can use `devOptions` to enable the `Redux DevTools` and `Module Lifecycle Check`.

```ts
const app = await createSharedApp({
    modules,
    main: AppView,
    render,
    share,
    devOptions, // enable devOptions
});
```

This is the `DevOptions` interface:

```ts
interface DevOptions {
    /**
     * Enable strict mode for React and Mutative.
     */
    strict?: boolean;
    /**
     * Enable state update patches.
     */
    enablePatches?: boolean;
    /**
     * Enable inspector for state changing.
     */
    enableInspector?: boolean;
    /**
     * Enable state auto freeze.
     */
    autoFreeze?: boolean;
    /**
     * Enable auto computed.
     */
    autoComputed?: boolean;
    /**
     * Enable redux dev tools.
     */
    reduxDevTools?: boolean;
    /**
     * Redux dev tools enhancer options.
     */
    reduxDevToolsOptions?: ReduxDevToolsOptions;
}
```

### Module Lifecycle Check

You can use `checkModules()` to check the lifecycle of all the module, And you can use `checkModule(module)` to check the lifecycle of a specific module.

### Module Performance Track

If you want to track the performance of the module initialization, you can use `trackModule()` to track the performance of all the module.

### Plugin Module

`Pluggable` is an important concept of the f. It provides an interface that allows you to encapsulate many of React's libraries in a clean design. You can base complex plugins on it to encapsulate them simply enough.

```ts
@injectable({
    name: 'ExamplePlugin',
})
class ExamplePlugin extends PluginModule {
    constructor() {
        super();
    }
}
```

For detail information, please refer to the [Pluggable API docs](https://reactant.js.org/docs/api/reactant-module/classes/core_plugin.PluginModule)

### Dynamic Module

You can use `@dynamic()` to define a dynamic module, and then use `load()` to load the lazy module.

```ts
@injectable({
    name: 'Klazz',
})
class Klazz extends RcModule {
    @dynamic('LazyLoad')
    lazyLoad?: LazyLoad;

    constructor() {
        super();
    }

    async lazyLoadExample() {
        const LazyLoad = await import('./LazyLoad').then((m) => m.LazyLoad);

        await load(this, [
            {
                provide: 'LazyLoad',
                useClass: LazyLoad,
            },
        ]);

        console.log(this.lazyLoad);
    }
}
```

### Abstract class

You can use `abstract` to define an abstract class without `@injectable()`, and then use `@injectable()` to decorate the subclass.

```ts
abstract class Klazz extends RcModule {
    constructor() {
        super();
    }
}
```

And you can use `@injectable()` to decorate the subclass.

```ts
@injectable({
    name: 'Foo',
})
class Foo extends Klazz {
    constructor() {
        super();
    }
}
```

### Subclass

You can use `extends` to define a subclass, and then use `@injectable()` to decorate the subclass.

```ts
@injectable({
    name: 'Klazz',
})
class Klazz extends RcModule {
    constructor(public foo: Foo) {
        super();
    }
}

@injectable({
    name: 'Foo',
})
class Foo extends Klazz {
    constructor(public foo: Foo) {
        // !!! we need to call super(foo) to pass the foo to the parent class
        super(foo);
    }
}
```
