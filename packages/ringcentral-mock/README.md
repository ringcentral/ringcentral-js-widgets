# ringcentral-mock

A RingCentral Platform APIs mocking library, it's based on the following libraries.

-   json-schema-faker
-   faker
-   fetch-mock

## Features

-   Generate mock data
    -   dynamic mock data
-   mock integrity
    -   server push
-   Wrap mock logics
    -   API
    -   interface
-   Debugging
-   Request Validation
-   FetchMock Assertions

## Structure

-   RingCentralMock
    -   Platform APIs Mock
        -   Data Generator with Swagger
        -   Interface
    -   Subscription Mock
        -   Pubnub mock
        -   WebSocket mock
    -   Webphone

## Setup

1. Install `@ringcentral-integration/mock`.
2. Add jest `setupFiles` config `@ringcentral-integration/mock/setup.ts`.

## Usage

```ts
import { RcMock, PubnubMock } from '@ringcentral-integration/mock';

const rcMock = new RcMock({
    subscription: new PubnubMock(),
});

// main
rcMock.init();
rcMock.reset();

// utils
rcMock.debug();

// mock RC logic
await rcMock.receiveCall({ phoneNumber: '+12088991234' });

// custom response
rcMock.get('/restapi/v1.0/account/~/telephony/sessions/:id', 200, {
    response: { body: {} },
});

rcMock.get('/restapi/v1.0/account/~/telephony/sessions/:id', 200, {
    // schema: (schema) => {},
    response: ({ mockData, url, request, params, body }) => ({
        body: {},
    }),
});

// assert
expect(rcMock.fetchMock).toHaveBeenCalledWith(
    '/restapi/v1.0/account/~/telephony/sessions/:id',
);
```

## Debugging

```ts
rcMock.debug((options) => {
    // customized Debugging
});
```

```sh
# all
DEBUG=rc-mock* yarn jest

# verbose mode
DEBUG=rc-mock** yarn jest

# mock
DEBUG=rc-mock:mock yarn jest

# unmock
DEBUG=rc-mock:unmock yarn jest

# filter by url
DEBUG=rc-mock* URL=message-sync yarn jest

# filter by method
DEBUG=rc-mock* METHOD=POST yarn jest
```

## APIs

-   `get()`/`post()`/`delete()`/`patch()`/`post()`/`put()`/`mock`

> The mock path must be an absolute path.

-   `debug()`

> runtime debugger

-   `init()`

> setup init mocks

-   `reset()`

> reset fetch mock and remove Webphone Subscription mock

-   `defaultInitMocks`

> define default mocks for init()

Note: Do `NOT` add any mock method to `defaultInitMocks` when RcMock is initialized, it will not take effect.
