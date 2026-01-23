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
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
  createSharedApp as createBaseSharedApp,
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
  PortDetector,
  state,
  subscribe,
  watch,
  useLock,
  createTransport,
  testBed,
  mockPairTransports,
  merge,
  SharedAppOptions,
  autobind,
  type SendOptions,
  applyPatches,
  Coworker,
  CoworkerOptions,
  createCoworker,
  getRef,
  fork,
  createBroadcastTransport,
  nameKey,
} from 'reactant-share';

export type {
  ServiceIdentifier,
  ISharedAppOptions,
  ClientTransport,
  ServerTransport,
  Renderer as RendererType,
  SharedAppConfig,
  PartialKeys,
  ILastActionState,
  ICoworkerOptions,
  ReactantModuleOptions,
  Renderer as ReactantRenderer,
  SymmetricTransport,
} from 'reactant-share';

export type { App, Config, Store, Transport } from 'reactant-share';

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
  findDOMNode,
  unmountComponentAtNode,
  createPortal,
  version,
  render,
  hydrate,
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
