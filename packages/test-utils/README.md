# @ringcentral-integration/test-utils

## Usage

Add `@ringcentral-integration/test-utils` dependency by running the following command in the monorepo root directory.

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
cross-env NODE_ENV=ci yarn jest
```
