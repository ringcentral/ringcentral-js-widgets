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

## MFE CLI

- Get all MFE info:

```bash
yarn mfe
```

- Get MFE info with dependencies:

```bash
yarn mfe --deps
```
