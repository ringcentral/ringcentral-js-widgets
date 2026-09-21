# @ringcentral-integration/next-builder

The `@ringcentral-integration/next-builder` is a library that provides a set of tools to help build RingCentral brand pages.

That will use `project.config.json` to generate the webpack configuration.

for for details, please refer to [project.config.schema.json](./src/projectConfigSchema.json)

## CLI options

-   `--pages` specify the pages that defined in `pages` item's `main` file name without extension
-   `--exclude-pages` excludes pages that defined in `pages` item's `main` file name without extension
-   `--build-env` specify the build env that defined in `environment`
-   `--brand` specify the build brand, after define `--build-env`, by default, it will use the brand that defined in `environment`'s `brand` items, if you want to override it, you can use this option

## Example

```bash
yarn build --pages=proxy --pages=redirect --build-env=prod --brand=rc
```

## Custom entry URL

Pages that include the `customEntryUrl` template parameter expose a browser
console helper for loading a custom JavaScript entry file:

```js
setCustomEntryUrl('https://example.com/path/to/entry.js');
```

`setCustomEntryUrl(url)` stores the URL in `localStorage` under
`_RC_CUSTOM_ENTRY_` and reloads the page. On the next page load, the template
injects the stored URL as a deferred `<script>` in `<head>` and exposes the
stored value as `globalThis.customEntryUrl`.

Use this when testing a preview or locally hosted entry file against an
environment that would normally load its webpack-generated entry scripts.

The URL must be a browser-loadable JavaScript file. The helper does not validate
or transform the URL before creating the script tag.

To remove the override and return to the default entry scripts, run:

```js
clearCustomEntryUrl();
```

### Template usage

Add `<%= customEntryUrl %>` before the script-loading logic in the HTML template.
When `globalThis.customEntryUrl` exists, skip the default entry scripts because
the custom entry template has already injected the stored URL.

```html
<%= customEntryUrl %>
<script>
    if (globalThis.customEntryUrl) {
        //
    } else {
        (function () {
            const scriptUrls = JSON.parse(
                '<%= JSON.stringify(htmlWebpackPlugin.files.js) %>',
            );

            scriptUrls.forEach((url) => {
                const script = document.createElement('script');
                script.defer = true;
                script.src = url;
                document.head.appendChild(script);
            });
        })();
    }
</script>
```

### HTMLWebpackPlugin injection

If a page uses this manual script-loading pattern, disable
HTMLWebpackPlugin's automatic script injection for that page. Otherwise the
webpack-generated entry script can be injected automatically and loaded again by
the manual loader.

The Dynamics adapter page uses this setup in
`apps/dynamics/project.config.json`:

```json
{
    "index": "src/index.html",
    "main": "src/main.ts",
    "params": {
        "inject": false
    }
}
```

## MFE CLI

-   Get all MFE info:

```bash
yarn mfe
```

-   Get MFE info with dependencies:

```bash
yarn mfe --deps
```
