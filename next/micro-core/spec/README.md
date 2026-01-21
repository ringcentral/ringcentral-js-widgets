# Micro Core specification

The Core MFE provides complete Brand business features, including Theme, Locale, and other related modules.

## Services

-   Alert
-   MicroCore
-   Brand
-   SleepDetector
-   Locale
-   Theme
-   Toast
-   DataMatcher
-   LoggerBase
-   DateTimeFormat

## Pages

-   ModalView
-   ToastView
-   MicroCoreView

## Plugins

-   BlockPlugin
-   ThemePlugin

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

-   MFE mode with Gzip: 522 KB

|                               | Before Login | After Login |
| :---------------------------- | -----------: | :---------: |
| LCP(Largest Contentful Paint) |        0.33s |     N/A     |
| TTI(Time to Interactive)      |        0.33s |     N/A     |

-   SPA mode With Gzip: 292 KB

|                               | Before Login | After Login |
| :---------------------------- | -----------: | :---------: |
| LCP(Largest Contentful Paint) |        0.29s |     N/A     |
| TTI(Time to Interactive)      |        0.29s |     N/A     |
