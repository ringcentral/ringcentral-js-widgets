# Dependency Injection

* [Introduction](#introduction)
* [Usage](#usage)
    * [@Module](#module)
    * [@Library](#library)
    * [@ModuleFactory](#modulefactory)
        * [Private Module Provider](#private-module-provider)
        * [Providers](#providers)
            * [Class Provider](#class-provider)
            * [Value Provider](#value-provider)
            * [Factory Provider](#factory-provider)
            * [Existing Provider](#existing-provider)
* [Inheritance](#inheritance)
    * [Module Inheritance](#module-inheritance)
    * [ModuleFactory Inheritance](#modulefactory-inheritance)
* [Composition](#composition)
* [RcModule](#rcmodule)
* [Miscellaneous](#miscellaneous)

## Introduction
The integration commons repository consists of multiple modules, each module is responsible for specific functionality and there are dependence relationships across some modules. By leveraging Dependency Injection mechanism, it can be much easier for developers to write modules without concerning about module initialization order and module dependencies. All you need to do is to declare the dependencies of the module and register the module as a provider in the ModuleFactory. Besides, the capability of module combination is also provided, which can be used for phone customization.

## Usage
The dependency injection system uses `decorator` to declare module metadata. There are currently three decorators `@Library`, `@Module` and `@ModuleFactory`.

As its name implies, `@Module` is used for anotating a module and declaring its dependencies. `@Library` is actually the alias for `@Module`, similarly, it can be used for declaring a library and its dependencies. A module or library can be registered as a provider such that it can be used for module injection.

`@ModuleFactory` is intended for declaring module factory. Module factory is a special kind of module, it can be used for providing and combining multiple modules.

### @Module
Before writing a new module, we need to import `Module` decorator from `lib/di` and then decorate the module class with `@Module()` decorator.

After that, you can start defining the dependent module in `deps` array.  Dependency defined in **String literal** is always a non-optional dependency, which means when the instance of the dependent module can not be found, an error will be thrown. Nevertheless, you can also define an optional dependency by using the **Object** definition with **optional** property inside it. Optional dependency is usually used for injecting additional configuration parameters. Note that the dependency name is the name that registered in `@ModuleFactory` instead of the actual module class name.

All the declared dependencies will be injected into the module constructor as an object and afterwards you can pick up the module easily by using destructuring assignment (the module name will be converted to camel case from pascal case).

Note that if you want the module to be always injetable, the `@Module()` decorator is required even if there is no dependent modules.

```js
@Module({
  deps: [
    // Required dependency
    'Client',
    // Optional dependency
    { dep: 'AccountPhoneNumberOptions', optional: true }
  ]
})
export default class ActiveCalls {
  // Dependent module will be innjected into consturctor
  constructor({
    client,
    ...options
  }) {}
}
```

### @Library
`@Library` decorator is almost exactly the same as `@Module` except for the decorator name. But it's usually intended for declaring a library in `/lib` folder.

```js
@Library({
  deps: [
    'Auth',
    { dep: 'DataFetcherOptions', optional: true }
  ]
})
export default class DateFetcher {
  constructor({
    auth,
    ...options
  }) {}
}
```

### @ModuleFactory
`@ModuleFactory` is used for declaring a module factory. Module factory is usually a central place for registering and providing a bunch of modules and also assembling the registered module as a whole.

> Note: the ValueProvider will be injected into ModuleFactory as a provider instead of being spread.

```js
@ModuleFactory({
  // Register module as module provider
  providers: [
    // Class Provider
    { provide: 'Client', useClass: Client },
    // Value Provider
    { provide: 'Options', useValue: { key: 'value' } },
    // Existing Provider
    { provide: 'LagacyClient', useExisting: 'Client' },
    // Factory Provider
    { provide: 'Factory',
      useFactory: ({ client }) => new Klass(client),
      deps: ['Client']
    }
  ]
})
class Phone {
  constructor({
    client,
    options,
    legacyClient,
    factory,
  }) {}
}
```

After registered as a provider, it can be used for injection in other modules. The `provide` attribute is defining the name of the provider, the `deps` attribute in `@Module` or `@Library` is also using the provider name defined in `provide` to search for dependencies.

#### Private Module Provider
As we can see from the previous snippet,  all providers will also be injected into module factory class as its own dependencies, however, in real world scenarios, some providers are not designed to be exposed to the module factory. In this case, the `private` property can be used for stating that the provider is only designed for injection which is not necessarily to be exposed to outer scope.

```js
providers: [
  { provide: 'Client', useClass: Client, private: true }
]
```

#### Providers
A module is registered as a provider means the module can be injectable inside module factory scope. To be specific, all the modules defining in `providers` of the same module factory are in the same scope, which means they can be injected into any other modules of the same scope.

All providers will also be regarded as the dependencies of the module factory class, which can be used for assembling modules or performing other operations.

There are four kinds of `Provider`:
##### Class Provider
Provide a class, it's usually used for providing a module class.
##### Value Provider
Provide values, it's usually used for injecting configuration options. There is a `spread` property, which can be used for spreading the value object during injection process. **The spread action will only happen in the Module Injection process.**

```js
@Module({
  deps: ['Options']
})
class TestModule {
  constructor({
    // Options value has been spread
    appKey
  }) {}
}

@ModuleFactory({
  providers: [
    { provide: 'Options',
      useValue: { appKey: 'key' },
      spread: true,
      private: true }
  ]
})
class Phone {}
```
##### Factory Provider
Provide anything that returned by the factory function, it's usually used for importing third party instances. The factory function also supports dependency injection which should be declared in `deps` property.

The `spread` flag is also supported in Factory Provider when the factory function returns an object.

```js
@ModuleFactory({
  providers: [
    { provide: 'Factory',
      useFactory: ({ client }) => new Klass(client),
      deps: ['Client'] }
  ]
})
class Phone {}
```

##### Existing Provider
Provide an existing provider (alias for existing provider), it's usually used for code refactoring.

## Inheritance
In order to provide more extensibility, the DI system supports module inheritance. There are two inheritance approaches, one is Module inheritance, the other is ModuleFactory inheritance.

### Module Inheritance
Basically, a Module can inherit from another Module or Library, the inheritance will actually combine the metadata of child class and parent class.

```js
@Module({
  deps: [
    'Client',
    'Storage',
    'Subscription'
  ]
})
class Presence extends RcModule {}

@Module({
  deps: [
    'Auth'
  ]
})
class DetailedPresence extends Presence {}
```

From the snippet above, we know that the `DetailedPresence` Module inherits from `Presence` Module, in this case, the dependencies of two classes will be injected into the instance of child class. Afterwards, you can pass the dependencies through `super()` all the way up to its ancestor classes. Note that multilevel inheritance is supported.

The rule for inheritance is almost the same as language's. The metadata of parent class may be overwritten by its child class. For instance, you can make an optional dependency of parent class non-optional by overwriting the `optional` property.

The inheritance mechanism will still work even if its parent class is without `@Module()`  or `@Library` decorator.

### ModuleFactory Inheritance
Similarly, a ModuleFactory can inherit from another ModuleFactory. This feature can be used for extending an overall module set.
```js
@ModuleFactory({
  providers: [
    { provide: 'Webphone', useClass: Webphone },
    { provide: 'AccountInfo', useClass: AccountInfo },
    { provide: 'Config',
      useValue: {
        server: 'https://platform.ringcentral.com'
      },
      spread: true,
      private: true }
  ]
})
class RcPhone extends RcModule {}

@ModuleFactory({
  providers: [
    { provide: 'Config',
      useValue: {
        appKey: 'appKey',
        appSecret: 'appSecret'
      },
      spread: true,
      merge: true }
  ]
})
class MyPhone extends RcPhone {}
```

The `RcPhone` is literally a phone with basic features built in. By using the inheritance mechanism of ModuleFactory, it's fairly easy to set up your own phone with specific configurations and additional modules.

The metadata of parent class will be overwritten by its child class by default. However, for `ValueProvider`,  you can specify `merge` property so that the value of parent class will be merged shallowly together with the child class.

Note that the property of parent class will be inherited by child class if there is no such property in child class. If you really want to change the value of that property, you can declare a new value in child class so that the value in parent class will be overwritten.

## Composition
Another way of extending and combining modules is called `Composition` which provides the capability of Module Factory Injection. In simple words, a ModuleFactory is also a special Module so that it can be registered as a Class Provider in other Module Factories.

The composition can be used for higher abstractions, as the project getting larger, it needs to be separated into different independent packages. Each package has it own providers, each of which can be marked as **private** so as to keep the context clean.

```js
@ModuleFactory({
  providers: [
    { provide: 'Contacts', useClass: Contacts },
    { provide: 'AddressBook', useClass: AddressBook },
    { provide: 'ContactMatcher', useClass: ContactMatcher },
  ]
})
class Contact {}

@ModuleFactory({
  providers: [
    { provide: 'Contact', useClass: Contact }
  ]
})
class Phone {}
```

## RcModule
When a module inherits from `RcModule` and decorated by `@Module`, the module will be initialized and attached to `ModuleFactory` as a property and the reducers will be set up and combined automatically as well.

## Miscellaneous
- ##### Circular Dependency is not supported
Since the system injects dependencies into constructor, it can not be initialized without its dependencies being resolved.
- ##### The useExiting provider can only use the provider in the same scope
The `useExisting` provider is usually used for module refactoring, it doesn't make sense to provide a Module in parent scope. If necessary, the provider can be provided directly in parent scope.

- ##### Class can still be used normally without DI system
The module can still be used in a normal way without DI system when decorated with `@Module` and `@ModuleFactory`.

- ##### Short hand provider declaration
The class provider can be registered in a simpler way, but make sure that the `mangle` option is turned off if you use uglify.js, otherwise the module can not be found.
```js
@ModuleFactory({
  providers: [
    Auth,
    { provide: Contact }
  ]
})
```
