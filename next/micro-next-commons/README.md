# Micro Commons

## Introduction

This is a RC commons that can be used to RC CRM integrations. It is designed to be used in a micro-frontend environment and a non-micro-frontend environment.

## Usage with MFE mode

Below is the list of module exports for the micro-frontend for all RC business services:

```json
{
    "./src/micro-auth/services": "./src/micro-auth/services",
    "./src/micro-auth/views": "./src/micro-auth/views",
    "./src/micro-contacts/services": "./src/micro-contacts/services",
    "./src/micro-contacts/views": "./src/micro-contacts/views",
    "./src/micro-core/hooks": "./src/micro-core/hooks",
    "./src/micro-core/plugins": "./src/micro-core/plugins",
    "./src/micro-core/services": "./src/micro-core/services",
    "./src/micro-core/views": "./src/micro-core/views",
    "./src/micro-meeting/services": "./src/micro-meeting/services",
    "./src/micro-meeting/views": "./src/micro-meeting/views",
    "./src/micro-message/services": "./src/micro-message/services",
    "./src/micro-message/views": "./src/micro-message/views",
    "./src/micro-phone/services": "./src/micro-phone/services",
    "./src/micro-phone/views": "./src/micro-phone/views",
    "./src/micro-setting/services": "./src/micro-setting/services",
    "./src/micro-setting/views": "./src/micro-setting/views"
}
```

Due to the module sharing of the micro-frontend, all relevant RC modules can be referenced via `@ringcentral-integration/micro-next-commons`.

For example:

```diff
- import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
+ import { Auth } from '@ringcentral-integration/micro-next-commons/src/micro-auth/services';
```
