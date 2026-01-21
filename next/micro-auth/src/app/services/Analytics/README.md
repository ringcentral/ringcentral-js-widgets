# Analytics Module

## Overview

The Analytics module is a tracking service for RingCentral applications that provides event tracking capabilities. It supports multiple analytics providers including Mixpanel and Pendo. The module is designed to work in various architectures, including multi-tab and worker-based environments.

## Features

-   Cross-tab tracking via worker mode
-   Support for Mixpanel and Pendo integration
-   Extended event properties functionality
-   Debug mode for development
-   Route-based tracking targets
-   Automatic user identification with owner ID
-   Compliance with EU privacy policies (IP address tracking disabled)
-   Observable stream of tracking events

## Installation

The Analytics module is part of the `@ringcentral-integration/micro-auth` package. It should be registered in your application's dependency injection container:

```typescript
import { Analytics } from '@ringcentral-integration/micro-auth/src/app/services/Analytics';
import { TrackPropsService } from '@ringcentral-integration/micro-auth/src/app/services/Analytics/TrackPropsService';

// In your module registration
Analytics,
{
  provide: 'AnalyticsOptions',
  useValue: {
    analyticsKey: 'your-mixpanel-key',
    enableMixpanel: true,
  },
},
```

## Pendo Integration

if you want to use Pendo, you need to add the `PendoAnalytics` module in your app:

```ts
import { PendoAnalytics } from '@ringcentral-integration/micro-auth/src/app/services/Analytics/PendoAnalytics';

modules: [
...(enablePendo ? [PendoAnalytics] : []),
],
```

````

## Usage

### Basic Tracking

```typescript
// Inject the Analytics service
constructor(private _analytics: Analytics) {}

// Track an event
this._analytics.track('buttonClicked', {
  buttonName: 'submit',
  page: 'login'
});
````

### Extended Properties

You can add custom properties that will be included in specific events:

```typescript
// Add extended properties to specific events
this._analytics.addEventsExtendedProps({
    events: ['login', 'logout'],
    extendedProps: {
        appVersion: '1.0.0',
        userRole: 'admin',
    },
});
```

### Additional Properties

The interface for the additional track props

you can implement this interface in your project and inject in the createApp

!! always use `function` or `getter` to return the trackProps, because the trackProps may be changed in the future

@example

```ts
{
    provide: 'AdditionalTrackProps',
    deps: [ThirdPartyService],
    useFactory: (thirdPartyService: ThirdPartyService) => {
        return {
            trackProps: () => {
                'Server Version': thirdPartyService?.crmInfo.crmVersion || '',
            },
            autoHeartBeatProps: () => {
                'Some Props': 'Some value that you want to track every 24 hours base on different user extension id',
            },
        } satisfies IAdditionalTrackProps;
    },
};
```

or implement the class with same DI name

```ts
@injectable({
    name: 'AdditionalTrackProps',
})
export class AdditionalTrackProps
    extends RcModule
    implements IAdditionalTrackProps
{
    get trackProps() {
        // some properties that you want to add into every track
        const initProps = this.getInitTrackProps();
        return {
            ...initProps,
            ...this.trackPropsValue,
        };
    }
}
```

### Accessing Track Properties

The module provides access to global tracking properties:

```typescript
// Get current tracking properties
const trackProps = this._analytics.trackProps;
```

### Subscribing to Tracking Events

if you need addition trigger event when track

```typescript
// Subscribe to all tracked events
this._analytics.track$.subscribe(({ event, trackProps }) => {
    console.log(`Event tracked: ${event}`, trackProps);
});
```

## Configuration

The Analytics module is configured via `AnalyticsOptions` interface:

```typescript
export interface AnalyticsOptions {
    // Enable console logging of track events
    useLog?: boolean;

    // Enable Mixpanel integration
    enableMixpanel?: boolean;

    // Mixpanel project token
    analyticsKey: string;

    // Custom track routers configuration (optional)
    trackRouters?: TrackRouter[];
}

// TrackRouter interface
export interface TrackRouter {
    router: string;
    target: string;
}
```

### Debug

Toggle Mixpanel debug mode for development, which will show mixpanel detail:

```typescript
// Toggle debug mode for Mixpanel
this._analytics.toggleDebug();
```

you can set `useLog` to true in your config, and it will show mixpanel detail in console on any call of the track method.

in development mode, that will not auto enable the data tracking no matter you already set the analyticsKey or not, use `toggleEnv()` or self call the `app.modules.Analytics.toggleDebug();` and `app.modules.Environment._toggleEnableAnalytics(true)` to enable the data tracking in development mode.

remember that will only enable that for two hours to prevent the data tracking in development mode cost budget to many, try to close that manually if you already test completed `app.modules.Environment._toggleEnableAnalytics(false)`.

## Example

`app.modules.Analytics.track('cool',{})`

then wait a while the console will show the mixpanel detail

```
[batch] MIXPANEL REQUEST [
    {
        "event": "cool",
        "properties": {
            "$os": "Mac OS X",
           ...
        }
    }
]
```
