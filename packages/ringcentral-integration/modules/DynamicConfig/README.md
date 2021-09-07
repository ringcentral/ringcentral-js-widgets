# DynamicConfig

DynamicConfig module provides two ways of dynamic configuration. They are fetching remote static ConfigData files and using the discovery API (just provides RCV link domain).

## Usage

```js
{ provide: 'DynamicConfig', useClass: DynamicConfig },
{ provide: 'DynamicConfigOptions', useValue: {} as DynamicConfigOptions },
```

> if DynamicConfigOptions `frequentUpdate` is true, A request is sent before each config is got.

## Update Config

- The local code must update `ConfigData.json` & `ConfigData.js`, and upload `ConfigData.js` & `ConfigData.json` to `https://apps.ringcentral.com/integration/dynamic-config/` (dev uri: `https://apps.ringcentral.com/integration/dynamic-config-dev/`) via ftp to Akamai.

## Note:

- If it can't use DynamicConfig module, please make a custom request for dynamic config files, such as backend or gsuite-addon, etc.
- By default, DynamicConfig will only request the configuration or get the data provided by the discovery API when the user is logged in, and DynamicConfig will be ready after the request is completed.
