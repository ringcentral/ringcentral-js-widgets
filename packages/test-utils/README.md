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
cross-env NODE_ENV=ci yarn jest
```

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
