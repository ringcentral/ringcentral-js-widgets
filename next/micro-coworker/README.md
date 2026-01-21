# RingCentral Coworker

## Introduction

`RingCentral Coworker` is used to solve the following three issue:

-   Concurrent requests limit
-   Contact searching performance
-   Contact matching performance

The API `createAppWithCoworker` has built-in `AddressBook`, `CompanyContacts`,`ContactMatcher` and `ContactSearch` related modules.

## Usage

```ts
yarn add @ringcentral-integration/micro-coworker
```

In main process:

```ts
import { createAppWithCoworker } from '@ringcentral-integration/micro-coworker/src/bootstrap';

createAppWithCoworker({
    // ...app options
    share: {
        name: 'app-demo',
        type: 'Base',
        coworker: {
            isCoworker: false,
            worker,
        },
    },
});
```

In coworker process:

```ts
import { createAppWithCoworker } from '@ringcentral-integration/micro-coworker/src/bootstrap';

createAppWithCoworker({
    // ...app options
    share: {
        name: 'app-demo',
        type: 'Base',
        coworker: {
            isCoworker: true,
        },
    },
});
```

### Coworker Options

### ProxyFetcherOptions

You can add new proxy fetcher modules by `enabledProxyModules`.

```ts
{
    provide: 'ProxyFetcherOptions',
    useFactory: (clientInfo) => {
        return {
            enabledProxyModules: [clientInfo],
        } satisfies ProxyFetcherOptions;
    },
    deps: [ClientInfo],
},
```

### ProxyExecutorOptions

You can add new proxy executor modules by `enabledProxyModules`.

```ts
    {
        provide: 'ProxyExecutorOptions',
        useValue: {
            enabledProxyModules: [NumberValidate],
        } satisfies ProxyExecutorOptions,
    },
```
