/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  RcViewModule,
  load,
  createSharedApp,
  App,
  RendererType,
} from '@ringcentral-integration/next-core';
import { UseAppOptions } from '@ringcentral/mfe-core';
import { GlobalTransport, useApp } from '@ringcentral/mfe-react';

import { RcMicroAppView } from '../RcMicroAppView';

type Options<T> = {
  init: (
    inject: any,
  ) => Promise<App<T, any[], RendererType<any[]>> | undefined>;
  render: (element?: HTMLElement | null | undefined, props?: any) => () => void;
  transport?: GlobalTransport<any>;
};

type InitReturn<K> = K extends Promise<
  App<infer T, any[], RendererType<any[]>> | undefined
>
  ? T
  : never;

/**
 * useMicroApp() can be used to load a micro app in a view module.
 * It is a hook to load and render a micro app in a RcViewModule.
 *
 * ### Example
 * ```tsx
 * import { useMicroApp } from '@ringcentral-integration/next-micro';
 *
 * class ExampleView extends RcMicroAppView {
 *   component() {
 *     const MicroCore = useMicroApp(this, {
 *         name: '@ringcentral-integration/micro-core',
 *         loader: () =>
 *             import('@ringcentral-integration/micro-core/src/bootstrap'),
 *     });
 *     return <MicroCore />;
 *   }
 * }
 * ```
 *
 * @param target view module
 * @param options options
 * @returns mfe component
 */
export const useMicroApp = <T extends RcViewModule, O extends Options<T>>(
  target: RcViewModule,
  options: Pick<
    UseAppOptions<O>,
    Exclude<keyof UseAppOptions<O>, 'target' | 'bootstrap'>
  >,
) => {
  const Component = useApp({
    bootstrap: async ({ init }) => {
      await init!(async (options: Parameters<typeof createSharedApp>[0]) => {
        const container = await load(target, [
          options.main,
          ...options.modules!,
        ]);
        const viewModule = container.get(options.main as any) as RcMicroAppView;
        viewModule.isAppShell = false;
        return viewModule.component;
      });
    },
    ...options,
  });

  return Component as InitReturn<ReturnType<O['init']>>['component'];
};
