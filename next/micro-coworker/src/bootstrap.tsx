/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-sparse-arrays */
import {
  AccountInfo,
  Auth,
  ExtensionInfo,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  AccountContacts,
  AddressBook,
  CompanyContacts,
  ContactInitiator,
  ContactMatcher,
  Contacts,
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import { ThemePlugin } from '@ringcentral-integration/micro-core/src/app/plugins';
import {
  Brand,
  BrowserLogger,
  Locale,
  LocaleOptions,
  SleepDetector,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  App,
  Config,
  Coworker,
  CoworkerOptions,
  createMemoryHistory,
  createSharedApp,
  ICoworkerOptions,
  IRouterOptions,
  ISharedAppOptions,
  isSharedWorker,
  PartialKeys,
  ReactantModuleOptions,
  ReactantRenderer,
  RouterOptions,
  RouterPlugin,
  SharedAppConfig,
  StoragePlugin,
  ValueProvider,
} from '@ringcentral-integration/next-core';

import { CoWorkerAppView } from './app/App.view';
import {
  CoworkerAuth,
  CoworkerLogger,
  ProxyExecutor,
  ProxyExecutorOptions,
  ProxyFetcher,
} from './app/services';

interface ExcludeCoworkerModules<
  T,
  S extends any[],
  R extends ReactantRenderer<S>,
> extends Config<T, S, R> {
  share: ISharedAppOptions & {
    coworker?: Pick<
      ICoworkerConfig,
      Exclude<keyof ICoworkerConfig, 'useModules'>
    >;
  };
}

type ICoworkerConfig = RemoveUndefined<ICoworkerOptions>;

type RemoveUndefined<T> = T extends undefined ? never : T;

export const CoworkerModuleOptions = Symbol('CoworkerModuleOptions');

export interface ICoworkerModuleOptions {
  modules: ReactantModuleOptions[];
}

export const createAppWithCoworker = async <
  T,
  S extends any[],
  R extends ReactantRenderer<S>,
>({
  modules = [],
  ...options
}: PartialKeys<ExcludeCoworkerModules<T, S, R>, 'render'>): Promise<
  App<T, S, R>
> => {
  if (!options.share.coworker) {
    return createSharedApp({
      modules,
      ...options,
    } as PartialKeys<SharedAppConfig<T, S, R>, 'render'>);
  }
  const prefixConfig: ValueProvider = { provide: 'Prefix', useValue: '' };
  const injectedModules = [
    prefixConfig,
    { provide: 'SdkConfig' },
    { provide: 'BrandConfig' },
    { provide: AccountInfo, useClass: AccountInfo },
    { provide: CoworkerLogger, useClass: CoworkerLogger },
    { provide: BrowserLogger, useClass: BrowserLogger },
    { provide: CompanyContacts, useClass: CompanyContacts },
    { provide: ContactMatcher, useClass: ContactMatcher },
    { provide: ContactSearch, useClass: ContactSearch },
    { provide: ExtensionInfo, useClass: ExtensionInfo },
    { provide: ContactInitiator, useClass: ContactInitiator },
    { provide: Auth, useClass: Auth },
    { provide: SleepDetector, useClass: SleepDetector },
    { provide: RouterPlugin, useClass: RouterPlugin },
    { provide: ThemePlugin, useClass: ThemePlugin },
    { provide: Brand, useClass: Brand },
    { provide: Locale, useClass: Locale },
    {
      provide: RouterOptions,
      useValue: {
        ...(isSharedWorker
          ? {}
          : { createHistory: () => createMemoryHistory() }),
      } as IRouterOptions,
    },
    { provide: StoragePlugin, useClass: StoragePlugin },
    {
      provide: 'ContactSources',
      deps: [AccountContacts, AddressBook],
      useFactory: (
        accountContacts: AccountContacts,
        addressBook: AddressBook,
      ) => [accountContacts, addressBook],
    },
    { provide: Contacts, useClass: Contacts },
    { provide: CoworkerAuth, useClass: CoworkerAuth },
    { provide: ProxyExecutor, useClass: ProxyExecutor },
    { provide: ProxyFetcher, useClass: ProxyFetcher },
  ] as ReactantModuleOptions[];
  const proxyExecutorOptions = modules.find(
    (module: any) => module?.provide === 'ProxyExecutorOptions',
  ) as ProxyExecutorOptions | undefined;
  if (
    process.env.NODE_ENV !== 'production' &&
    proxyExecutorOptions?.enabledProxyModules
  ) {
    proxyExecutorOptions!.enabledProxyModules.forEach((token: any) => {
      const hasModule = !modules.find(
        (module: any) => (module.provide ?? module) === token,
      );
      if (!hasModule) {
        throw new Error(`no module ${token} in "config.modules"`);
      }
    });
  }
  // merge modules config
  injectedModules.forEach((module: any) => {
    const token = module.provide;
    const item = modules.find((item: any) => item?.provide === token);
    if (typeof item === 'object') {
      Object.assign(module, item);
    }
  });
  modules.forEach((module: any) => {
    const token = module?.provide ?? module;
    const item = injectedModules.find((item: any) => item.provide === token);
    if (!options.share.coworker!.isCoworker && !item) {
      injectedModules.push(module);
    }
    if (options.share.coworker!.isCoworker && token === CoworkerModuleOptions) {
      module.useValue?.modules?.forEach((item: ReactantModuleOptions) => {
        injectedModules.push(item);
      });
    }
  });
  const main = (
    options.share.coworker!.isCoworker ? CoWorkerAppView : options.main
  ) as ReactantModuleOptions<T>;
  injectedModules.push(Coworker, {
    provide: CoworkerOptions,
    useValue: {
      ...options.share.coworker,
      isCoworker: options.share.coworker.isCoworker,
      useModules: [],
    } as ICoworkerOptions,
  });
  return createSharedApp({
    ...options,
    modules: injectedModules,
    main,
    share: {
      ...options.share,
      name: options.share.name,
    },
  });
};
