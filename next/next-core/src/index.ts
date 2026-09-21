import type {} from '../typings/typings';

export * from './lib';

export * from './modules';
export * from './plugins';
export * from './hooks';
export * from './interface';
export * from './components';
export * from './createSharedApp';
export * from './constant';

export {
  computed,
  inject,
  type ClassProvider,
  type FactoryProvider,
  type ModuleProvider,
  type ValueProvider,
  lazy,
  dynamic,
  load,
  ModuleRef,
  optional,
  PluginModule,
  state,
  subscribe,
  watch,
  testBed,
  autobind,
  applyPatches,
  getRef,
  nameKey,
} from 'reactant';

export {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
  createSharedApp as createBaseSharedApp,
  PortDetector,
  useLock,
  mockPairTransports,
  SharedAppOptions,
  Coworker,
  CoworkerOptions,
  createCoworker,
  fork,
  createBroadcastTransport,
} from 'reactant-share';

export type {
  ISharedAppOptions,
  ClientTransport,
  ServerTransport,
  SharedAppConfig,
  ICoworkerOptions,
  SymmetricTransport,
} from 'reactant-share';

export {
  createTransport,
  merge,
} from 'data-transport';

export type { EmitOptions, SendOptions, Transport } from 'data-transport';

export type { ILastActionState } from 'reactant-last-action';

export type {
  App,
  Config,
  PartialKeys,
  ReactantModuleOptions,
  Renderer as ReactantRenderer,
  Renderer as RendererType,
  ServiceIdentifier,
  Store,
} from 'reactant';

export {
  BrowserRouter,
  MemoryRouter,
  Switch,
  Route,
  Router,
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
  generatePath,
  Prompt,
  StaticRouter,
  matchPath,
  withRouter,
  // react-dom
  createRoot,
  hydrateRoot,
  findDOMNode,
  unmountComponentAtNode,
  createPortal,
  version,
  render,
  hydrate,
  flushSync,
  unstable_batchedUpdates,
  unstable_renderSubtreeIntoContainer,
} from 'reactant-web';

export type {
  RouteChildrenProps,
  RouteComponentProps,
  SwitchProps,
  match,
  RouterChildContext,
  RouteProps,
  // react-dom
  Renderer,
} from 'reactant-web';
