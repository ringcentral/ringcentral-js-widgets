# ringcentral-js-widgets

[![CI Pipeline](https://github.com/ringcentral/ringcentral-js-widgets/actions/workflows/ci.yml/badge.svg?branch=next-packages)](https://github.com/ringcentral/ringcentral-js-widgets/actions/workflows/ci.yml?query=branch%3Anext-packages)
[![Coverage Status](https://coveralls.io/repos/github/ringcentral/ringcentral-js-widgets/badge.svg?branch=next-packages)](https://coveralls.io/github/ringcentral/ringcentral-js-widgets?branch=next-packages)
[![@ringcentral-integration/*](https://img.shields.io/npm/v/@ringcentral-integration/next-core?label=%40ringcentral-integration%2F*)](https://www.npmjs.com/package/@ringcentral-integration/next-core)
[![i18n](https://img.shields.io/npm/v/@ringcentral-integration/i18n?label=i18n)](https://www.npmjs.com/package/@ringcentral-integration/i18n)
[![locale-loader](https://img.shields.io/npm/v/@ringcentral-integration/locale-loader?label=locale-loader)](https://www.npmjs.com/package/@ringcentral-integration/locale-loader)
[![phone-number](https://img.shields.io/npm/v/@ringcentral-integration/phone-number?label=phone-number)](https://www.npmjs.com/package/@ringcentral-integration/phone-number)

## Introduction

RingCentral integration widgets aim to provide reusable RingCentral service module and UI components to allow developers to integrate RingCentral unified communication service into third party processes or tools more easily.

This project includes [RingCentral Integration Common Library](packages/ringcentral-integration/README.md) and [RingCentral Widgets Library](packages/ringcentral-widgets/README.md). The basic idea is to connect modules in RingCentral Integration Common Library with React components to provide ready to use UI widgets.

## Get Started

> [!NOTE]
> We no longer recommend `ringcentral-widgets-cli` for creating new apps. It isn't maintained alongside the 1.0 packages.

Install the packages your app needs from npm, for example:

```bash
npm install @ringcentral-integration/next-core @ringcentral-integration/micro-core
```

Use [`next/app-demo`](next/app-demo) as the reference app. [`next/app-demo/src/createApp.tsx`](next/app-demo/src/createApp.tsx) shows how the `next-*` and `micro-*` packages are wired together, and you can run it locally as described in [Play with Development Server](#play-with-development-server).

## Contribution and Development

This is an npm workspaces monorepo (`packages/*`, `next/*`, `crius/packages/*`). It requires Node.js 22 or later (see `.nvmrc`).

Clone the repo:

```bash
$ git clone https://github.com/ringcentral/ringcentral-js-widgets.git
$ cd ringcentral-js-widgets
```

Install dependent libraries:

```bash
$ npm ci
```

After adding or upgrading any `@ringcentral/*` dependency, run `npm run lockfile:fix`. Some of these packages have a different build under the same version on internal registries, so `package-lock.json` keeps both integrity hashes to stay installable from public npm. CI runs `npm run lockfile:check` to enforce this, and a [husky](https://typicode.github.io/husky/) pre-commit hook (in `.husky`, enabled by `npm ci`) refuses a `package-lock.json` that resolves packages from any registry other than public npm. If registry.npmjs.org is not reachable from your network, set `PUBLIC_REGISTRY` to a mirror of it.

Test:

```bash
$ npm test -w @ringcentral-integration/next-core # Run one package's tests
```

Commit:

```bash
$ git add .
$ npm run commit
```

Release:

Push a tag and GitHub Actions publishes to npm (see `scripts/publishPackages.mjs`):

- `1.0.0`, `1.1.0-rc.0`: every package except the ones below, at that version. Prereleases go to the `next` dist-tag.
- `i18n@2.4.0`, `i18n@2.4.0-rc.0`, `locale-loader@2.3.4`, `phone-number@1.2.1`: one package on its own version line.

The tag sets the published version; you don't need to change `package.json` first, and the release doesn't update it. The version must be newer than every version of that package already on npm, so a typo'd older version or `2.3.1-rc.0` after `2.3.1` is refused. Pushing a tag that's already published skips it, so a failed release can be re-run.

### Play with Development Server

[`next/app-demo`](next/app-demo) is a demo app you can run locally to get familiar with the project or try changes.

Create a `.env` file in the repository root with your RingCentral app's credentials:

```bash
RINGCENTRAL_CLIENT_ID=your_client_id
RINGCENTRAL_SERVER_URL=https://platform.ringcentral.com
```

Start the development server:

```bash
$ npm start
```

Then open https://localhost:8081 in your browser. To see the app rendered inside an iframe, open https://localhost:8081/host.html.

The demo signs in with OAuth, so add `https://localhost:8081/redirect.html` as a redirect URI on your RingCentral app.

## Projects which use this library

- [RingCentral Embeddable](https://github.com/ringcentral/ringcentral-embeddable)
- [RingCentral for Google Extension 4.0](https://chrome.google.com/webstore/detail/ringcentral-for-google/fddhonoimfhgiopglkiokmofecgdiedb)
