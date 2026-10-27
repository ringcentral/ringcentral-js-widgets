# ringcentral-js-widgets

[![CI Pipeline](https://github.com/ringcentral/ringcentral-js-widgets/actions/workflows/ci.yml/badge.svg?branch=next-packages)](https://github.com/ringcentral/ringcentral-js-widgets/actions/workflows/ci.yml?query=branch%3Anext-packages)
[![Coverage Status](https://coveralls.io/repos/github/ringcentral/ringcentral-js-widgets/badge.svg?branch=next-packages)](https://coveralls.io/github/ringcentral/ringcentral-js-widgets?branch=next-packages)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/81c5e5334eff454b9404b05b5c29e09b)](https://www.codacy.com/app/RingCentral/ringcentral-js-widgets?utm_source=github.com&utm_medium=referral&utm_content=ringcentral/ringcentral-js-widgets&utm_campaign=badger)


## Introduction

RingCentral integration widgets aim to provide reusable UI components to allow developers to integrate RingCentral unified communication service into third party processes or tools more easily.

This project is built based on [RingCentral Integration Common Library](https://www.npmjs.com/package/@ringcentral-integration/commons) and [React](https://facebook.github.io/react/). The basic idea is to connect modules in RingCentral Integration Common Library with React components to provide ready to use UI widgets.


## Get Started

> [!NOTE]
> We no longer recommend `ringcentral-widgets-cli` for creating new apps. It isn't maintained alongside the 1.0 packages.

```bash
npm install @ringcentral-integration/widgets
```

See the [repository README](https://github.com/ringcentral/ringcentral-js-widgets#get-started) for the reference demo app and how to run it locally.

## Tests

The tests live in this package. Run them from the repository root:

```bash
npm test -w @ringcentral-integration/widgets
```
