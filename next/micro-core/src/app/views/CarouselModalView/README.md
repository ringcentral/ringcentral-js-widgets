# Carousel Modal with Iframe

that provide a way to load iframe as carousel like tutorial.

1. load iframe out of screen
2. when iframe loaded done, show that modal with tutorial
3. the dialog size base on iframe inner selector, default be `#root` element size

## Communicate from iframe to main app

import `./utils/bridge.ts` in your project entry files like `/src/bridge.ts` that want to put inside iframe

```ts
import '@ringcentral-integration/micro-core/src/app/views/CarouselModalView/utils/bridge';
```

update your build config to pack that into source build

let iframe creator put that js file into page like below.

```html
<script
    defer
    src="http://localhost:8081/bridge.js"
    type="text/javascript"
></script>
```

when you need some action from iframe, call `RC_AEM.post('example', event)` on that element that you want to use.

> if you pass the final event at the latest of params, that will do `event.preventDefault()` for you, if not pass that will not take effect

```html
<a
    onclick="RC_AEM.post('params', event)"
    href="https://support.ringcentral.com/webinar/getting-started/intro-ringcentral-webinar.html"
    title="Learn more"
>
    Learn more
</a>
```

## Usage

by default we will listen global all `click` and `keydown(Enter, button also listen space key)` with `data-desktop-action` and `data-mobile-action` attribute,
if you not need that. set disabledGlobalActionListener at global before load bridge script.

```html
<script>
    window.RC_AEM = {
        disabledGlobalActionListener: true,
    };
</script>
<script
    defer
    src="http://localhost:8081/bridge.js"
    type="text/javascript"
></script>
```

and put attribute on that element which you want

```html
<a
    data-desktop-action='{"type": "event", "value": "value"}'
    data-mobile-action='{"type": "event", "value": "value"}'
>
    Learn more 2
</a>
```

when user click that action anchor will `postMessage` to parent window with current element `attributes` with `CarouselModalMessage` structure

```ts
export type CarouselModalMessage = {
    type: string;
    data: unknown[];
};
```

## API Usage

or you can use js to add listener to that.

```ts
element.addEventListener('click', (e) => {
    RC_AEM.post('params', 'params2', e);
});
```

finally, you can add listener in your main app like below

```ts
this._carouselModalView.action$
    .pipe(
        tap(async (e) => {
            console.log('🐞 ~ index:', e.index);
            console.log('🐞 ~ data:', e.data);
            console.log('🐞 ~ origin:', e.origin);

            // do something that you want

            await this._carouselModalView.close();
        }),
    )
    .subscribe();
```

## Limit

should do response inside iframe element, when user change window dynamic when page be loaded, that will not auto response, only response when init load.

## Typescript

if you need typescript support add reference at your `type.d.ts` file

```ts
/// <reference path='./{some_path_that_your_file_put}/bridge.d.ts'/>
```
