# Background/Client proxy mechanism

It's an  Integrations applications architecture for browser expansion, and one background server port shared to multiple render-only clients.

## APIs

- `@proxify` ringcentral-js-widgets/ringcentral-integration/lib/proxy/proxify.ts
- `@action` ringcentral-js-widgets/core/lib/usm-redux/decorators/action.ts
- `initializeProxy` ringcentral-js-widgets/core/lib/RcModule/RcModule.ts

## How it works

user trigger UI event -> method by `@proxify` -> transfer to background -> exec method by `@proxify` -> call stack -> call method by `@action` -> dispatch action -> transfer to clients with patches -> update clients UI

## Practice

### @proxify

- The method decorated by @proxify must be asynchronous.

```ts
class Call extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @proxify
  makeCall(phoneNumber: string) { // ❌ bad practice
    // ....
  }

  @proxify
  async makeCall(phoneNumber: string) { // ✅ good practice
    // ....
  }
}
```

- The closer to UI call the method is decorated with @proxify.

- The parameters of the method decorated by @proxify must be serializable.

```ts
class ContactsList extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @proxify
  async addContactSources(contacts: Set<ContactSources>) { // ❌ bad practice
    // ....
  }

  @proxify
  async addContactSources(contacts: ContactSources[]) { // ✅ good practice
    // ....
  }
}
```

