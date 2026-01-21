# Micro Auth specification

The Auth MFE provides complete Auth business features, including WSG subscription, basic login information and other related modules.

## Services

-   AccountInfo
-   Analytics
-   Auth
-   AvailabilityMonitor
-   Client
-   ConnectivityMonitor
-   DataFetcher
-   Environment
-   ExtensionFeatures
-   ExtensionInfo
-   OAuth
-   OAuthBase
-   RateLimiter
-   RingCentralExtensions
-   TierChecker
-   WebSocketSubscription
-   AppFeatures
-   Presence
-   ExtensionPhoneNumber
-   ExtensionDevice
-   ExtensionNumberAreaCode

## Pages

-   LoginView

## Interface Types

TBD

## Interface Testing

TBD

## E2E Testing

TBD

## Integration Testing

TBD

## Performance

> Device: MacBook Pro (16-inch, 2019) 2.6 GHz 6-Core Intel Core i7
>
> OS: macOS 11.5.2
>
> Account: N/A

MFE mode with Gzip: `2.0 MB`

|                               | Before Login | After Login |
| :---------------------------- | -----------: | :---------: |
| LCP(Largest Contentful Paint) |        0.79s |    0.93s    |
| TTI(Time to Interactive)      |        0.74s |    0.90s    |

SPA mode With Gzip: `498 KB`

|                               | Before Login | After Login |
| :---------------------------- | -----------: | :---------: |
| LCP(Largest Contentful Paint) |        0.60s |    0.71s    |
| TTI(Time to Interactive)      |        0.60s |    0.71s    |
