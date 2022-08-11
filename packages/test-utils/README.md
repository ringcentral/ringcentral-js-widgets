# @ringcentral-integration/test-utils

Test utilities for RingCentral Integration

## Usage

Add `@ringcentral-integration/test-utils` to the development dependencies in the specified project.

And copy the template(CLI tool to be implemented):

```sh
cp -a ringcentral-js-widgets/test-utils/template/ packages/sub-package-folder/
```

Run the following command in the `sub-package-folder` root directory for test development:

```sh
yarn jest
```

Run the following command to start `jest.retryTimes(3)` by default on CI:

```sh
yarn run-test
```

## Setup test with CLI

Run the following command in the monorepo root directory:

```sh
yarn setup-test packages/example-project
cd example-project
yarn jest
```

> If the `setup-test` command does not exist, just run `npm link @ringcentral-integration/test-utils` in repo root directory.

## Run test with CLI

```sh
cd example-project-dir
yarn run-test
```

You can use it with any jest cli parameter. For example, `yarn run-test --coverage`.

> If the `run-test` command does not exist, just run `npm link @ringcentral-integration/test-utils` in repo root directory.

> When we are using `yarn run-test` for UT/IT, we should not set the `babel-jest` transformer with the `test` option in the jest configuration, otherwise `jest.mock` will fail.

## APIs

-   `renderComponent(Component, props)`

```tsx
import { renderComponent } from '@ringcentral-integration/test-utils/lib/render';
import { Foobar } from '../components/Foobar';

test('', () => {
    // `const app = render(<Foobar version="" />);` is equivalent to:
    const app = renderComponent(Foobar, { version: '' });
});
```

## Spy on console

We have hijacked console(`debug`, `info`, `warn`, `log`, `error`, `time`, `timeEnd`) by default, and when running tests with `--ci`, console will be silenced. These methods in console support parameter assertions.

```ts
expect(console.log).toBeCalledWith(result);
```

## Retry

When using the `RETRY=$time` argument in front of CLI, we will be able to set the number of retries.

## DEV mode

When using the `SWC=true` argument in front of CLI, we will use `@swc/jest` as testing runner for fast tests.

## Debugging

You can add `DEBUG` variable to log on CLI to enable Debugging mode, for example

```sh
DEBUG=log yarn test
```

and call `log()` on the code that needs to be debugged.

> In debugging mode, all `console` printing will be blocked.

## Debugging with browser preview

> When you find dom or visual inspection, that will be very helpful, you can easy to find dom through browser.

-   Run test with `DEBUG=preview yarn test` or use vscode debugger `Packages: Jest Current File with preview` to run current file.

    > ! IMPORTANT: You should not use run `yarn jest-preview` manually before you use that, otherwise that port `3336` will be blocked and that `DEBUG=preview yarn test` will not be workable.

-   Then visit http://localhost:3336 to see the preview. you can view it in VS Code after install `Browser Preview` or `VS Browser` extension.
-   Re-render preview page

    As default `jest-preview` will re-render the page when you call `preview.debug`, so you must manually trigger that when you need to re-render page.

    in our jest environment, we provide a global `debugPreview()` method to do that.
    you can call `debugPreview()` inside debug mode to re-render page directly.

View more detail refer to [jest-preview](https://www.jest-preview.com/docs/getting-started/usage)
