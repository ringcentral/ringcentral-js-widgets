# I18n

A simple I18n implementation used in RingCentral Integration projects.

# Template

`./i18n/en-US.ts`:

```ts
export default {
    showMessage: '{hello} {name} Show message',
} as const;
```

`./i18n/loadLocale.ts`:

> The file must be exactly the same as the following and cannot be changed.

```ts
/* loadLocale */
```

`./i18n/index.ts`:

> The file must be exactly the same as the following and cannot be changed.

```ts
import I18n from '@ringcentral-integration/i18n';
import { getTranslateFn } from '@ringcentral-integration/utils';

import type enUS from './en-US';
// @ts-expect-error
import loadLocale from './loadLocale';

const i18n = new I18n<typeof enUS>(loadLocale);

export const t = getTranslateFn(i18n);

export type I18nKey = keyof typeof enUS;

export default i18n;
```

# Usage

```ts
import i18n from './i18n';

const t = i18n.t;

const showMessage = t('showMessage', {
    hello: 'Hello world',
    name: 'John',
});

// result will be "Hello world John Show message"
```

# Rule

1. The key must be string
2. The value be string or null
3. when the value be null that will use key as display value
