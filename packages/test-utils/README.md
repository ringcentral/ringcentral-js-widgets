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
yarn run-test --ci
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

- `mount(Component, props)`

```tsx
import { mount } from '@ringcentral-integration/test-utils/lib/render';
import { Foobar } from '../components/Foobar';

test('', () => {
  // `const app = render(<Foobar version="" />);` is equivalent to:
  const app = mount(Foobar, { version: '' });
});
```

## Note

1. If you need to use `@testing-library/jest-dom`, please add `setupFilesAfterEnv` setting.

```diff
const merge = require('@ringcentral-integration/test-utils/lib/merge');
const baseConfig = require('@ringcentral-integration/test-utils/config/jest.config');

module.exports = merge(baseConfig, {
  setupFiles: ['<rootDir>/test/__mocks__/setup.ts'],
+ setupFilesAfterEnv: [
+   '@ringcentral-integration/test-utils/config/jest.testingLibraryConfig.ts',
+ ],
  // add additional jest config
});
```

## Spy on console

We have hijacked console(`debug`, `info`, `warn`, `log`, `error`, `time`, `timeEnd`) by default, and when running tests with `--ci`, console will be silenced. These methods in console support parameter assertions.

```ts
expect(console.log).toBeCalledWith(result);
```

## Retry

When using the `RETRY=$time` argument in front of CLI, we will be able to set the number of retries.
