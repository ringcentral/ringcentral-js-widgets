# next-micro

`next-micro` is a library for building micro frontends with [ringcentral-mfe](https://github.com/ringcentral/ringcentral-mfe). It provides a set of APIs to help you build and manage micro frontends.

## Usage

You can install `next-micro` via npm:

```bash
npm install @ringcentral/next-micro
```

## APIs

You have three ways to use MFE with `ringcentral-mfe` in your project:
1. Using static import from an MFE module.
2. Use `next-micro` APIs to create an MFE module or an MFE app shell.
3. Only use `dynamicLoad()` API to load an MFE module.

If your module is part of an integrated project team, we generally prefer the first way unless there are special entry points. This way is simpler and does not require additional configurations.
If your module is using the ringcentral-mfe by an independent project team, we recommend using the second way. This way is more flexible and allows better control over the loading and rendering of the module.
If your module is from a third-party team, we recommend using the third way. This way is more flexible and can prevent third-party modules from impacting your project.

### useMicroApp()

It is a hook to load and render a micro app in a RcViewModule.

```tsx
import { useMicroApp } from '@ringcentral/next-micro';

class ExampleView extends RcMicroAppView {
    component() {
        const MicroCore = useMicroApp(this, {
            name: '@ringcentral-integration/micro-core',
            loader: () =>
                import('@ringcentral-integration/micro-core/src/bootstrap'),
        });
        return <MicroCore />;
    }
}
```

> You can need to set a site config `@ringcentral-integration/micro-core` in the app shell project.

### exposeMicroApp()

It is a function to expose a micro app to the global window object.

For example, `bootstrap.ts`:

```tsx
import { exposeMicroApp } from '@ringcentral-integration/next-micro';

import { AppView } from './app/App.view';

export default exposeMicroApp({
    modules: [
        //... modules
    ],
    main: AppView,
    share: {
        name: 'micro-core',
        type: 'Base',
    },
    renderRoot: () => document.getElementById('app'), // the element is rendered the micro app for locale dev mode
});
```

### RcMicroAppView

You can extend `RcMicroAppView` to create a view module for a micro app.

```tsx
import { injectable } from '@ringcentral-integration/next-core';
import { RcMicroAppView } from '@ringcentral-integration/next-micro';
import React from 'react';

@injectable({
    name: 'AppView',
})
export class AppView extends RcMicroAppView {
    component() {
        if (!this.isAppShell) return null;
        return <>mfe example content</>;
    }
}
```
