# Engage Voice widgets lib

This project is a UI widgets library to help developers create Engage Voice widget easily to link client agent controls to the Engage Voice system.

## Dependences

This project depends on:

* React
* [RingCentral Widgets](https://github.com/ringcentral/ringcentral-js-widgets)

## Usage

```
yarn add @ringcentral-integration/engage-voice-widgets
```

Import modules:

```js
import { EvClient } from '@ringcentral-integration/engage-voice-widgets/lib/EvClient';
import { EvActiveCallControl } from '@ringcentral-integration/engage-voice-widgets/modules/EvActiveCallControl';
import { EvActiveCallListUI } from '@ringcentral-integration/engage-voice-widgets/modules/EvActiveCallListUI';
import { EvAuth } from '@ringcentral-integration/engage-voice-widgets/modules/EvAuth';
import { EvCall } from '@ringcentral-integration/engage-voice-widgets/modules/EvCall';
```

Import UI containers

```js
import { AppView } from '@ringcentral-integration/engage-voice-widgets/containers/AppView';
import { DialerPage } from '@ringcentral-integration/engage-voice-widgets/containers/DialerPage';
import { InboundQueuesPage } from '@ringcentral-integration/engage-voice-widgets/containers/InboundQueuesPage';
import { LoginPage } from '@ringcentral-integration/engage-voice-widgets/containers/LoginPage';
import { MainViewPage } from '@ringcentral-integration/engage-voice-widgets/containers/MainViewPage';
import { ManualDialSettingsPage } from '@ringcentral-integration/engage-voice-widgets/containers/ManualDialSettingsPage';
```
## Ev_Agent_SDK
- [Ev AgentSDK Link](http://nexus-eu.engage.ringcentral.com/#browse/browse:npm-private:%40ringcentral%2Fengage-voice-agent)
