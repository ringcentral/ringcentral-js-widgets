# Role Delegation Design

Status: implemented v1 contract for RCINT-49223.

## Goal

Add role-based client delegation to `next-core` without changing the behavior or protocol of existing `delegate()` targets. A role identifies connected client capability. `PortManager` owns role membership, handoff, revisions, fencing, delivery, and disconnect cleanup.

## Scope

-   Generic `next-core` API. WebphoneV2 consumes it; it does not own the abstraction.
-   One domain role ID per invocation. A role may have one or many owners.
-   First-class system routes: `server`, `connectedClients`, `electedClient`, and `all`.
-   `electedClient` is the sticky, explicit-handoff successor to legacy `mainClient` election.
-   Static decorator configuration only. Runtime role selection remains an imperative API concern and is deferred.
-   Existing `server`, `mainClient`, `clients`, and `all` delegation remains unchanged.

## Non-goals

-   Replacing existing `delegate()` consumers in this slice.
-   Multi-role/composite routing.
-   Modifying legacy `mainClient` election or its protocol.
-   Generic role liveness probes, lease heartbeats, or stale-owner detection.
-   Automatic active-client designation or focus-driven `electedClient` transfer.
-   Cross-application active-client policy. Prove an SF-specific role first; promote it to PortManager only if other integrations need the same proven behavior.
-   Application heartbeat or a second Webphone ownership registry.
-   Same-operation retry or cross-attempt invocation dedupe. A caught error followed by another call is a new operation.
-   Separate delivery-ACK and completion protocol. Add only when a concrete recovery workflow needs it.

## Role declaration

Domains declare a stable constant next to their implementation. There is no central catalog.

```ts
const mediaOwnerRole = {
  role: 'webphone.mediaOwner',
  allowMultiple: false,
  autoElect: false,
} as const satisfies RoleDefinition;

await portManager.registerRole(mediaOwnerRole, {
  onAcquire,
  onRelease,
});

await portManager.claimRole(mediaOwnerRole.role);

@delegateRole(mediaOwnerRole)
async startCall() {}
```

The definition declares cardinality and election behavior explicitly.
Registration binds local lifecycle handlers and makes that instance a
candidate. Claiming is a separate ownership action. The coordinator rejects
and logs definition mismatches.

`autoElect: true` is valid only for singleton roles:

```ts
const focusedClientRole = {
  role: 'integration.focusedClient',
  allowMultiple: false,
  autoElect: true,
} as const satisfies RoleDefinition;

await portManager.registerRole(focusedClientRole, { onAcquire, onRelease });
```

Each registered client is a candidate. The server selects the first ready candidate, awaits its `onAcquire`, and tries the next candidate if acquisition fails. The first successful candidate commits as owner. Later `claimRole()` calls remain deliberate handoff requests, so an integration may move an automatically elected role to its latest active tab without adding a PortManager-wide active-client policy. If that explicit takeover's `onAcquire` fails, its caller receives the failure and the coordinator elects another candidate; the failed contender is excluded from that election pass.

If every candidate fails, the role becomes `unavailable`; it does not retry in a loop. PortManager logs each failed acquisition with role, candidate, revision, and serialized error. A later registration, explicit claim, or explicit future re-election begins a new election.

`claimRole()` fails with `RoleNotRegisteredError` when that local instance has
not registered a domain role. `electedClient` is the only system exception,
and only topology-eligible instances may claim it.

Registration is a one-time local declaration with server acknowledgement; await it before claiming. Duplicate registration is an explicit error. PortManager retains the declaration for the app-instance lifetime; ownership claims remain asynchronous actions.

V1 has no `unregisterRole()`. Registrations live for the app instance lifetime; transport disconnect performs ownership cleanup. Add explicit unregistration only for a concrete dynamic-module use case.

Applications cannot register system IDs: `server`, `connectedClients`, `electedClient`, `mainClient`, or `all`. System routes cannot be released or registered. `claimRole('electedClient')` is the sole exception: it deliberately requests a sticky-client handoff.

`delegateRole` may target PortManager-owned system routes. `server` and `connectedClients` expose existing endpoint membership through the new API; `electedClient` provides deliberate lifecycle-based election; `all` becomes a first-class all-instances route with explicit operation boundaries. `mainClient` is a legacy bridge/fallback, not a claimable role.

## Usage guide

Keep a domain role next to the capability that owns it. Register once during
module setup, then claim only when that local instance can safely serve the
capability.

```ts
import {
    delegateRole,
    invokeRole,
    RoleReleaseRejectedError,
} from '@ringcentral-integration/next-core';

const mediaOwnerRole = {
    role: 'webphone.mediaOwner',
    allowMultiple: false,
    autoElect: false,
} as const satisfies RoleDefinition;

await portManager.registerRole(mediaOwnerRole, {
    onAcquire: async () => webphone.connect(),
    onRelease: async () => {
        if (webphone.hasActiveCall) {
            throw new RoleReleaseRejectedError(mediaOwnerRole.role);
        }
        await webphone.disconnect();
    },
});

await portManager.claimRole(mediaOwnerRole.role);
```

The decorated method returns `void` after every selected owner succeeds. Use
`invokeRole()` when a caller needs explicit per-owner results.

```ts
@delegateRole(mediaOwnerRole)
async refreshDeviceList() {
  await webphone.refreshDevices();
}

const results = await invokeRole(this, 'refreshDeviceList', [], {
  role: mediaOwnerRole.role,
  collectResults: true,
});
```

Observe role state only for UI and diagnostics. Lifecycle callbacks are the
ownership gate; an observable notification never authorizes work.

```ts
const { roleState$, roleTransition$ } =
    portManager.getRoleStateStreams(mediaOwnerRole);
```

### Good and bad practices

| Do                                                              | Do not                                                     |
| --------------------------------------------------------------- | ---------------------------------------------------------- |
| Use a stable, namespaced domain ID.                             | Build a central catalog or dynamic decorator resolver.     |
| Reject `onRelease` before unsafe teardown.                      | Throw after partially releasing an exclusive resource.     |
| Route durable state changes to `server`.                        | Mutate shared state through `all`.                         |
| Treat a timeout as unknown completion.                          | Retry, reroute, or hand off automatically after a timeout. |
| Use `completion: 'local'` only for deliberate best-effort work. | Assume peer completion when using local completion.        |
| Release an idle capability explicitly.                          | Use heartbeats or focus changes as ownership authority.    |

| System route       | Members                                   | Ownership                                                               |
| ------------------ | ----------------------------------------- | ----------------------------------------------------------------------- |
| `server`           | worker/server endpoint                    | always PortManager-owned                                                |
| `connectedClients` | transport-ready clients snapshot          | automatic membership                                                    |
| `electedClient`    | one connected client                      | first ready client by default; explicit takeover uses lifecycle handoff |
| `all`              | `server` plus `connectedClients` snapshot | composite system route, never claimable                                 |
| `mainClient`       | legacy elected client                     | compatibility bridge/fallback only                                      |

`electedClient` is PortManager's built-in singleton `autoElect` role. Every
eligible app instance registers internally as an implicit candidate during app
startup, before `createSharedApp()` resolves. A SharedWorker coordinator is
excluded because it is not a browser client. The role uses the same generic
claim, election, revision, fencing, and disconnect paths as a domain
`autoElect` role. The difference is ownership: PortManager defines its
membership and applications cannot register or release it.

It normally has an owner or is electing one in SharedWorker mode. On owner disconnect or failed candidate acquisition, PortManager tries the next ready client; if all candidates fail, it is `unavailable`. V1 selection remains first-ready, with no custom election selector. HubSpot's current external-window gate remains legacy behavior until it migrates to explicit takeover.

`electedClient` election confirms only PortManager transport readiness. Application `roleState$`/`roleTransition$` subscribers run after commit; their failure is logged and cannot roll back the election. V1 deliberately provides no application `onAcquire`/`onRelease` hooks for this built-in role, matching legacy `mainClient`: application initialization and recovery remain application-owned. A domain role is the correct choice when successful setup must gate ownership.

### Deferred: stale `electedClient` recovery

An `electedClient` can remain transport-connected while its browser tab is deeply sleeping. It may not process invocations, even though it has not disconnected and therefore is not re-elected. Legacy `mainClient` delegation waits for its transport timeout and resolves `undefined`; it does not recover ownership.

V1 deliberately does not add a heartbeat, automatic liveness test, focus-driven replacement, or automatic re-election. Any such mechanism creates a new authority and duplicate-work risk that needs integration-level proof first.

`claimRole('electedClient')` already provides a deliberate handoff request. It may be used by a concrete future recovery flow, but it is not a liveness signal and V1 adds no separate `reElectElectedClient()` alias. Define that flow only when an integration supplies its safety policy.

Topology boundary:

| Topology                   | Server                  | `electedClient`    | Explicit takeover              |
| -------------------------- | ----------------------- | ------------------ | ------------------------------ |
| Standalone Base, no port   | local app               | local app          | idempotent                     |
| SharedWorker               | worker                  | browser client     | supported                      |
| SharedTab                  | lock-owning browser tab | current server tab | server-only                    |
| Base with explicit ports   | dedicated server        | dedicated server   | server-only                    |

In SharedTab, `electedClient` follows server authority. Promotion advances its
revision and fences the prior physical owner without transferring any domain
roles.

Standalone Base resolves `server`, `electedClient`, and `all` locally;
`connectedClients` is an empty owned group. Base with explicit ports is a
sticky client/server topology: system invocations go through the dedicated
server, and clients are ineligible to claim `electedClient`.

## Ownership and handoff

The server is authoritative. Tabs do not discover or coordinate directly.

Claims and releases are atomic and idempotent. Repeating a claim by the current owner returns the current ownership snapshot without rerunning `onAcquire`. Repeating a release after ownership is gone succeeds as a no-op without rerunning `onRelease`.

An explicit `releaseRole()` awaits the owner's `onRelease()` before clearing ownership. Callers use `releaseRole()` rather than duplicating teardown logic.

```mermaid
sequenceDiagram
  participant T1 as Current owner (Tab 1)
  participant S as PortManager server
  participant T2 as Contender (Tab 2)

  T2->>S: claim(role)
  S->>T1: onRelease({ deadline })
  alt release succeeds
    T1-->>S: success
    S->>T2: onAcquire(nextRevision)
    T2-->>S: success
    S->>S: commit owner + revision
  else release explicitly rejects
    T1-->>S: RoleReleaseRejectedError
    S-->>T2: claim rejected; T1 remains owner
  else release errors, times out, or disconnects
    T1-->>S: failure / no response
    S->>S: fence and revoke T1
    S->>T2: onAcquire(nextRevision)
    T2-->>S: success
    S->>S: commit owner + revision
  end
```

`RoleReleaseRejectedError` means the current owner deliberately remains healthy and declines takeover. Any other release failure means it is unreliable: the server fences/revokes it and continues takeover. The failed tab handles its own error and may refresh itself. Resource owners needing strict exclusivity must reject before partial teardown; they must not throw after making the resource unsafe.

WebphoneV2 media ownership uses that rejection path: while calls are active, `onRelease` throws `RoleReleaseRejectedError`, so a competing claim cannot take over. When no calls remain, the owner explicitly releases the role. WebphoneV1 remains on legacy `PortManager.onMainTab` and `delegate('mainClient')`; it is out of scope for this design.

If contender acquisition fails, ownership is unavailable. No invocation is accepted until ownership commits again. For `autoElect` roles, the coordinator immediately tries another live registered candidate; otherwise a later explicit claim retries acquisition.

Transport disconnect revokes ownership. It cannot run a callback in the disconnected tab.

## Lifecycle callbacks

| Callback    | Recipient     | Awaited | Meaning                                                                   |
| ----------- | ------------- | ------- | ------------------------------------------------------------------------- |
| `onAcquire` | pending owner | yes     | Prepare capability before ownership commits.                              |
| `onRelease` | current owner | yes     | Controlled teardown for a takeover or release; receives request deadline. |

`onAcquire` success commits ownership. No role invocation can run while a role is acquiring or draining. Lifecycle callbacks are targeted control messages, not application-state synchronization.

`onRelease({ deadline })` lets a delayed owner decide whether to skip late teardown, finish it, or refresh itself after the coordinator timed out. Conditional release policy and source-client identity are deferred until a concrete caller needs them.

V1 has no `onLoss()` callback and no application heartbeat. Disconnect cleanup is server-side; an unreachable tab cannot reliably receive another lifecycle message.

## Deadline and timeout

Every awaited role control message and role invocation has a **65-second coordinator deadline**. The extra five seconds avoids treating Chromium's one-minute background-timer cadence as an exact timeout boundary; it does not prove that the target is alive.

On an invocation deadline, a single-owner invocation rejects `RoleInvocationTimeoutError`. A multi-owner `completion: 'all'` invocation reports timeouts with other per-owner outcomes in `RoleAggregateError.results` and `RoleAggregateError.errors`. It never resolves `undefined`, unlike legacy `data-transport` delegation. A timeout means completion is unknown: a deep-sleeping owner may later wake and execute the request. Therefore a timeout does not retry, reroute, change ownership, or imply a failed method call. The caller chooses the business recovery.

The same deadline governs `onAcquire` and `onRelease`. A release timeout follows the handoff rule above: the old owner is fenced and the contender can acquire. `onRelease({ deadline })` receives the absolute deadline so the old owner can avoid unsafe late teardown or refresh itself.

## Observable role state

The server stores authoritative snapshots in synchronized application state.
Every instance can observe every role's current ownership phase through the
same RxJS streams.

```ts
type RoleState =
    | { phase: 'unavailable'; role: string; revision: number; owners: [] }
    | {
          phase: 'acquiring';
          role: string;
          revision: number;
          owners: [];
          pendingOwnerIds: string[];
      }
    | {
          phase: 'owned';
          role: string;
          revision: number;
          owners: { clientId: string }[];
      }
    | {
          phase: 'draining';
          role: string;
          revision: number;
          owners: { clientId: string }[];
          pendingOwnerIds: string[];
      };
```

-   `roleState$`: stable snapshots only: `unavailable` and `owned`.
-   `roleTransition$`: all snapshots, including `acquiring` and `draining`.
-   Synchronized snapshots guarantee convergence on the latest state; they are
    not a durable event log.
-   Failure details remain server/affected-owner diagnostics. Shared snapshots expose no raw error payload.

## Role invocation

`delegateRole` and `invokeRole` are separate from legacy `delegate()`.

-   Singleton role: invoke its one owner.
-   `allowMultiple: true`: invoke every owner in the resolution snapshot, in parallel.
-   The default completion scope is `all`: a returned Promise resolves only after every selected owner completes.
-   `completion: 'local'` is explicit. It is valid only when the caller is a selected owner; it resolves after that local execution while peer owners continue.
-   A non-owner using `completion: 'local'` receives `RoleSourceNotOwnerError`.
-   Multi-owner `all` completion waits for every owner to settle by default, then reports all failures. First-failure rejection is an explicit opt-in for callers that need it.
-   Default success completion returns `void`. `collectResults: true` returns per-owner settled results. If any owner fails, `RoleAggregateError` extends `AggregateError` and exposes the complete result array.
-   `collectResults` is valid only with `completion: 'all'`; combining it with `completion: 'local'` is a configuration error.
-   Fire-and-forget callers intentionally do `void invocation.catch(handler)`.
-   A caught error followed by another invocation creates a new operation. V1 exposes no retry token or dedupe behavior.

Each owner receives one targeted RPC containing the resolved role revision. It validates fencing before method execution and returns normal completion or an error. Transport, stale-owner, and method failures are one invocation failure to the caller. The caller decides whether to call again or take another business action. A separate delivery ACK/completion protocol is deferred until a concrete recovery need exists.

Existing `delegate('clients')` and `delegate('all')` remain unchanged. New system routes provide the migration path without retrofitting legacy protocol behavior.

### Best-effort compatibility mode

`completion: 'local'` is the opt-in best-effort replacement for legacy fire-and-forget-style calls. It preserves local caller latency: the caller waits only for its own selected execution and does not wait for peer completion. Peer work still runs from the resolved target snapshot; its later success is not guaranteed to the caller, and peer failures are diagnostics logged by PortManager.

This is intentionally not exact legacy protocol compatibility. Legacy `delegate('all')` keeps its own server/client response and state-sync behavior unchanged. New role calls have one explicit operation boundary and no implicit state synchronization.

### `all` usage guidance

Use `all` for localized, in-memory or browser work that must happen in every current instance: listeners, permission prompts, local SDK setup, and UI/browser effects.

Do not use `all` to mutate authoritative application state, `@state`, or storage. Route those changes to `server` and rely on normal state synchronization. New `all` has no implicit state-sync behavior.

## Follow-up implementation details

-   Final public TypeScript names for result records and `RoleAggregateError` fields.
-   Characterization test matrix and documentation links in `README.md`.

## Implementation boundary

Expected implementation area after design approval:

-   `libs/next-core/src/modules/PortManager.ts`: authoritative registry, lifecycle, state streams, targeted control protocol.
-   `libs/next-core/src/lib/decorators/`: `delegateRole` and imperative `invokeRole` exports.
-   `libs/next-core/test/features/`: legacy delegate characterization gates plus role protocol tests.
-   `libs/next-core/README.md`: link this document and public API summary.

Lifecycle and invocation delivery reuse `reactant-share` targeted `clientIds`.
Role snapshots use normal synchronized application state so every instance can
observe ownership transitions.

---

## Implemented v1 decisions and roadmap

This section preserves detailed implementation constraints and deferred work
accepted during review.

### Objective

Keep one foundational role contract for domain and system roles without forcing
every role through the same membership mechanism.

All roles share:

-   A stable definition.
-   Owner resolution.
-   Invocation routing.
-   Completion options and result aggregation.
-   Observable state.
-   Revision and fencing policy where ownership is mutable.

Membership remains role-specific:

-   Domain roles use application registration.
-   `server`, `connectedClients`, and `all` derive membership from topology.
-   `electedClient` is PortManager-managed and uses topology-specific
    eligibility.

The implementation should centralize these policies and remove scattered
`role === '...'`, reserved-role, and topology checks. It should not turn every
system route into a mutable `ServerRole` record.

### Canonical role definitions

Role behavior belongs in a reusable, code-owned definition:

```ts
export const goodRole = {
    role: 'goodRole',
    allowMultiple: false,
    autoElect: true,
} as const satisfies RoleDefinition;
```

Every instance loading the same domain module uses the same definition. Role
configuration is not discovered from synchronized application state.

`RoleDefinition` requires explicit cardinality and election behavior. Its type
must reject the invalid combination `allowMultiple: true` plus
`autoElect: true`:

```ts
export type RoleDefinition =
    | {
          readonly role: RoleId;
          readonly allowMultiple: true;
          readonly autoElect: false;
      }
    | {
          readonly role: RoleId;
          readonly allowMultiple: false;
          readonly autoElect: boolean;
      };
```

Runtime validation remains necessary for JavaScript callers and transported
registration data.

Future role behavior configuration belongs in `RoleDefinition`. Lifecycle
callbacks do not: they bind the definition to one local instance.

### Domain registration API

`registerRole` is new, so only the two-argument API is required:

```ts
await portManager.registerRole(goodRole, {
    onAcquire,
    onRelease,
});
```

There is no merged compatibility form.

Conceptually:

```ts
interface RoleLifecycle {
    readonly onAcquire?: (
        context: RoleLifecycleContext,
    ) => Promise<void> | void;
    readonly onRelease?: (
        context: RoleLifecycleContext,
    ) => Promise<void> | void;
}
```

Calling `registerRole` means:

1. The instance knows the canonical role definition.
2. The instance is currently a candidate for that role.
3. The supplied lifecycle callbacks are available locally.

Callbacks remain local and are never serialized or synchronized.

Calling public `registerRole` twice for the same role on one instance is an
explicit error. Any future internal promotion re-declaration must use a
separate private, idempotent PortManager control path rather than calling the
public API again.

The active coordinator structurally validates every candidate's definition
against the first accepted definition for that role. A mismatch is an
invariant violation:

-   Log it through PortManager's logger at error level.
-   Include role ID, both definitions, participant/client ID, and topology.
-   Exclude the mismatched instance from that role's candidates.
-   Reject its claims with `RoleDefinitionMismatchError`.
-   Do not automatically reload the page from PortManager.

Automatic stale-build reload is deferred because core lacks reliable build
identity and an unguarded reload can loop indefinitely.

### Decorator and imperative invocation

`delegateRole` accepts either the reusable definition or a role ID:

```ts
@delegateRole(goodRole)
async execute(input: string) {}
```

```ts
@delegateRole('goodRole')
async execute(input: string) {}
```

Definition objects are preferred for domain roles. Strings remain concise for
simple and system routing.

The imperative `invokeRole` helper can continue accepting a role ID in its
options:

```ts
await invokeRole(this, 'execute', ['hello'], {
    role: goodRole.role,
    collectResults: true,
});
```

No additional imperative API redesign is required in this pass.

### Built-in system-role definitions

Export built-ins under one namespace-style constant to avoid collisions with
common names such as `server`:

```ts
export const systemRoles = {
    server: {
        role: 'server',
        allowMultiple: false,
        autoElect: false,
    },
    connectedClients: {
        role: 'connectedClients',
        allowMultiple: true,
        autoElect: false,
    },
    electedClient: {
        role: 'electedClient',
        allowMultiple: false,
        autoElect: true,
    },
    all: {
        role: 'all',
        allowMultiple: true,
        autoElect: false,
    },
} as const satisfies Record<string, RoleDefinition>;
```

Examples:

```ts
@delegateRole(systemRoles.server)
async updateAuthoritativeState() {}
```

Applications cannot register or release system roles. Only
`systemRoles.electedClient` is claimable, and a claim succeeds only when the
local instance is eligible under the current membership policy.

Legacy `mainClient` is not part of `systemRoles`. Existing
`@delegate('mainClient')` behavior remains unchanged.

### System membership policies

System roles use one definition and invocation foundation with different owner
resolvers:

| Role               | Membership policy                             | Mutable | Claimable |
| ------------------ | --------------------------------------------- | ------- | --------- |
| `server`           | Current coordinator endpoint                  | no      | no        |
| `connectedClients` | Current connected client endpoints            | derived | no        |
| `electedClient`    | One topology-eligible instance                | yes     | yes       |
| `all`              | Derived union of server and connected clients | derived | no        |

`all` must remain derived. Storing a separate authoritative membership list
would duplicate `server` and `connectedClients` state and allow drift.

### Current topology scope

Do not add a new public topology abstraction in this pass. Use current
`createSharedApp`/PortDetector facts:

-   `sharedAppOptions.type`
-   `shared`
-   `isWorkerMode`
-   `isServer`
-   `isClient`

The important distinction is not only `type: 'Base'`. Base without a port is a
standalone app; Base with explicit ports is a real client/server topology used
by Chrome-extension offscreen servers, Electron/desktop servers, WebSocket
clients, and embedded web instances.

Current supported behavior:

| Application model                   | `server`           | `connectedClients` | `electedClient`    | `all`                   |
| ----------------------------------- | ------------------ | ------------------ | ------------------ | ----------------------- |
| Standalone Base, no port            | local app          | empty              | local app          | local app               |
| SharedWorker                        | worker coordinator | browser clients    | one browser client | worker plus clients     |
| SharedTab                           | lock-owning tab    | other tabs         | current server tab | server tab plus clients |
| Explicit sticky server/client ports | dedicated server   | connected clients  | dedicated server   | server plus clients     |

Sticky-server examples include:

-   A Chrome extension with an offscreen page as server and visible extension
    pages as clients.
-   An Electron/desktop server with web or embedded third-party clients
    connected through WebSocket transports.

For sticky-server models, server death ends the application. No server
promotion or recovery protocol is required.

SharedTab use is increasingly rare. Keep its current behavior simple:

-   `server` follows the current lock-owning server tab.
-   `electedClient` follows that server tab.
-   A promoted SharedTab server therefore becomes the elected owner.
-   Do not preserve independent elected ownership across promotion in this
    pass.

Eligibility determines claim behavior without a dedicated
“SharedWorker-only” error:

-   Standalone local claim is idempotent.
-   SharedWorker client claim may request handoff.
-   SharedTab server claim is idempotent; a client is ineligible.
-   Sticky-server claim is idempotent on server; clients are ineligible.

Applications with topology-dependent capability placement should use a domain
role rather than forcing that policy into `electedClient`. Historical Webphone
behavior illustrates this:

-   SharedWorker: browser clients can register as media-owner candidates because
    SIP.js cannot run in the worker.
-   SharedTab: server tab can register as the media owner.
-   Offscreen/Electron server: dedicated server can register as media owner.
-   Standalone: local app registers.

The domain module decides whether to call `registerRole` from the runtime facts.
PortManager should not learn SIP.js, DOM, media, or Electron capability policy.

### System-client readiness handshake

PortDetector exposes client removal but no clean client-added callback suitable
for synchronized system-role state. Use one internal PortManager readiness
handshake from every shared client after its transport listener and initial
full-state synchronization are ready:

```ts
_registerSystemClient({ clientId });
```

The coordinator uses this event to:

-   Refresh the `connectedClients` snapshot.
-   Refresh the derived `all` snapshot.
-   Admit the client to `electedClient` only when the topology policy makes the
    client eligible.
-   Publish synchronized system-role snapshots.

This replaces an electedClient-specific startup-registration control message.
It is private PortManager coordination, not a domain API.

Client disconnect continues using PortDetector's existing removal callback.

PortManager owns system-role initialization. `createSharedApp` may await an
initial PortManager readiness promise, but it should not directly initialize
individual roles. Client initialization must occur after the client RPC
listener and initial full-state synchronization are safe; starting delegated
registration directly inside PortDetector's synchronous `onClient` callback can
deadlock because the target RPC listener is not installed yet.

### Derived membership and empty groups

`connectedClients` can legitimately have no owners:

-   Before a SharedWorker browser client connects.
-   In a server-only sticky deployment.
-   During disconnect churn.

Empty membership does not make the role unavailable:

-   Invocation succeeds as a no-op.
-   `collectResults: true` returns `[]`.
-   Its observable state uses the common `owners` field with `owners: []`.

`all` invokes the server even when there are no clients.

Keep the common `owners` field for every role. Do not add a separate `members`
state shape in this pass.

### Revision and fencing policy

Derived system roles use fixed revision `0` and have no acquiring/draining
transitions:

-   `server`
-   `connectedClients`
-   `all`

`server` is a logical alias for the current coordinator:

```text
before SharedTab promotion: __SERVER__ -> Tab A
after SharedTab promotion:  __SERVER__ -> Tab B
```

The physical endpoint changes, but the logical derived role does not claim or
transfer ownership. Subsequent invocations route through the new coordinator.

Mutable roles use normal revisions and fencing:

-   `electedClient`
-   Domain roles

Remove any broad rule that lets every reserved role execute with revision `0`.
Only definitions with fixed derived membership may use the fixed revision.

Abruptly terminated server work may already be running and cannot be made
crash-linearizable through a role revision. Strong topology generations,
operation deduplication, and crash-linearizable failover are deferred.

### Observable system-role state

Use one `RoleState` contract with `owners` for domain and system roles.

Expected system snapshots:

-   `server`: stable `owned`, current logical server owner, revision `0`.
-   `connectedClients`: stable `owned`, current clients, possibly empty,
    revision `0`.
-   `all`: stable `owned`, server plus current clients, revision `0`.
-   `electedClient`: mutable `owned`/`unavailable` plus
    `acquiring`/`draining` transitions and normal revision.

Publish derived snapshots after:

-   Initial startup.
-   Internal system-client registration.
-   Client disconnect.
-   SharedTab server promotion.

Synchronized snapshots remain current observable state, not an event log.

### Review findings this design must resolve

The first implementation review found two valid issues.

#### Explicit Base client elected invocation

The first pass treated every Base system invocation as local while excluding
managed `electedClient` from Base's virtual owner resolution. An explicit Base
client could therefore register or claim successfully and still receive
`RoleUnavailableError` when invoking.

Resolution:

-   Base without a port is standalone and resolves locally.
-   Base with explicit ports is sticky client/server topology.
-   Explicit clients delegate mutable/system routing to the server.
-   `electedClient` resolves to the dedicated server under the scoped policy.

#### SharedTab promotion reset

The first pass attempted to preserve independent elected ownership while
keeping authoritative `serverRoles` private. A promoted server therefore
created a new elected record and silently replaced a surviving owner.

Resolution for the current scope:

-   Do not promise independent elected ownership in SharedTab.
-   `electedClient` follows current server authority.
-   Promotion intentionally moves elected ownership to the promoted server.
-   Advance elected revision and fence stale ownership through the normal
    mutable-role path.
-   Full independent ownership recovery remains roadmap work.

### Immediate validation matrix

Add or update focused tests for:

1. Role-definition type rejects `allowMultiple: true` plus
   `autoElect: true`.
2. `registerRole(definition, lifecycle)` registers once and duplicate public
   registration fails.
3. Definition mismatch logs and rejects the candidate/claim.
4. `@delegateRole` accepts a definition and a role ID.
5. Prototype-named domain roles continue to synchronize safely.
6. Standalone Base resolves `server`, `electedClient`, and `all` locally.
7. Standalone `connectedClients` is empty and invocation is a no-op.
8. Explicit Base server/client routes system roles according to sticky-server
   policy.
9. SharedWorker coordinator is never an elected candidate.
10. SharedWorker has an elected browser client before client creation resolves.
11. SharedWorker elected handoff and owner-disconnect failover still work.
12. SharedTab system roles follow current server before and after promotion.
13. `connectedClients` and `all` snapshots update on client registration and
    disconnect.
14. Empty `connectedClients` with `collectResults: true` returns `[]`.
15. Derived roles execute with revision `0`; elected/domain roles require their
    current mutable revision.
16. Existing claim synchronization, release rejection, aggregation, deadlines,
    and transition tests continue passing.
17. Initialization remains safe under fake timers and does not deadlock before
    client RPC listeners are installed.

Validation commands should remain focused:

```sh
yarn workspace @ringcentral-integration/next-core test delegateRole.test.tsx --runInBand
yarn workspace @ringcentral-integration/next-core tsc-check
yarn workspace @ringcentral-integration/delegate-role-demo build
yarn workspace @ringcentral-integration/delegate-role-demo test
git diff --check
```

Do not launch Electron for automated verification; it steals focus from the
developer's active work.

### Explicitly deferred roadmap

Document these decisions so future applications can extend the design when a
real topology requires them:

1. **Normalized public topology API**

    Potentially expose `standalone`, `sharedWorker`, `sharedTab`, and
    `clientServer` plus current port. Current runtime facts are sufficient for
    this pass.

2. **Domain-role SharedTab promotion recovery**

    A promoted server already has identical role definitions because SharedTab
    instances load the same modules. Missing runtime information is surviving
    candidate membership. A future PortManager-internal recovery flow can:

    - Enter a bounded recovery state.
    - Use `connectedClients` to request lightweight, batched re-declaration of
      each client's stored registrations.
    - Rebuild candidates through a private idempotent method.
    - Validate definitions.
    - Reconcile synchronized ownership and revisions.
    - Resume invocations.

    Domain modules must not participate manually and must not call public
    `registerRole` twice.

3. **Bounded promotion recovery**

    Mutable-role calls should await recovery for up to the existing 65-second
    coordinator deadline and reject only on timeout. A future
    `RoleRecoveryTimeoutError` should extend `RoleUnavailableError`.

4. **Definition mismatch during recovery**

    Fail the affected role closed, log through PortManager, exclude the
    incompatible candidate, and reject its claims. Do not automatically reload.
    Application-level stale-build handling may later perform one build-aware,
    loop-guarded reload.

5. **Independent elected ownership in SharedTab**

    Preserving an elected owner independently from server authority requires:

    - Capturing the promoted tab's prior client identity.
    - Distinguishing old `__SERVER__` from the new physical server.
    - Waiting for surviving-client discovery.
    - Reconstructing candidates.
    - Conservatively invalidating `acquiring`/`draining` snapshots.
    - Advancing revisions before new election.

    Do not implement until a concrete SharedTab consumer needs it.

6. **Stable participant identity**

    Endpoint IDs and `__SERVER__` are routing addresses, not necessarily stable
    physical-app identities across promotion. Add a stable participant identity
    only when independent ownership recovery requires it.

7. **External server to worker fallback**

    A desktop-server-missing fallback that starts a worker coordinator has been
    discussed but has no current application. Its authority transition and
    recovery protocol remain out of scope.

8. **Runtime capability declarations**

    If multiple domains repeatedly need to select owners based on DOM, media,
    SIP, Electron, or other runtime capabilities, consider an application
    capability API. For now, domain modules use existing topology facts and
    decide whether to register.

9. **Crash-linearizable failover**

    Heartbeats, leases, topology generations, cross-attempt deduplication, and
    guarantees about already-running work remain out of scope.

10. **Legacy `mainClient` migration**

    Keep current behavior. Migrate individual consumers only when an actual
    application adopts `electedClient` or a domain role.
