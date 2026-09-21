# CallView

The `CallView` is a core component in the RingCentral Phone application that manages the display and interaction of active calls, incoming calls, and call-related features. It is built using the `RcViewModule` pattern and integrates with various call-related services.

## Features

- Manages active calls display and interactions
- Handles incoming calls and call notifications
- Supports call controls (hold, transfer, forward, etc.)
- Integrates with call logging and smart notes
- Provides post-call view functionality
- Supports multiple call views (active call, call list, add call)

## Dependencies

The component relies on several services and modules:

- `CallAction`: Manages call-related actions
- `CallMonitor`: Monitors call states
- `Webphone`: Handles web-based phone functionality
- `ActiveCallControl`: Controls active call states

## Component Structure

The `CallView` is composed of several sub-components:

- `ActiveCallsView`: Displays the list of active calls
- `AddCallView`: Interface for adding new calls
- `CallControlView`: Controls for active calls
- `ForwardView`: Call forwarding interface
- `IncomingCallView`: Displays incoming call notifications
- `KeypadView`: Dial pad interface
- `PostCallView`: Post-call summary and actions
- `ReplyWithMessageView`: Interface for replying to calls with messages
- `TransferView`: Call transfer interface

### Important methods and fields

```ts
`CallViewState` service to handle the call view related state
    `view`: to control current route display view, `"hidden" | "callList" | "addCall" | "activeCall" | "postCall"`

    -  `hidden`: No call or Call minimized state
    -  `activeCall`: Current Active call view
    -  `callList`: The active call list view
    -  `addCall`: New call interface, the exist open called will be close
```

```ts
`CallAction` service to handle each call status and action
    `displayCallAllInfo`: all info that be use during the call process
        - call: `Call | undefined` => the call information data during the call
        - meta: `CallMetaInfo | undefined` => the display meta, CallMetaInfo
        - session: `ActiveSession` => the active call control session data
    `displayFormCall`: the current display call both in `CallView`, and `CallHistory`, `PostCallView` with call log data
    `allCallInfoList`: all info when multiple call

    `createActionsHandler`: create all actions during the call by `telephonySessionId`
```

```ts
`CallHistory`: service for history data

when call end will preinsert the end call data into the `endedCalls`, and wait data `synced` from backend, the primary key be `telephonySessionId`, you can know the data source from the `preinsert` field, synced data will not have this field.

`getHistoryByTelephonySessionId`: get the history data by `telephonySessionId`
```
