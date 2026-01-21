/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  App,
  createSharedApp,
  render,
  unmountComponentAtNode,
} from '@ringcentral-integration/next-core';
import type {
  RendererType,
  SharedAppConfig,
  PartialKeys,
} from '@ringcentral-integration/next-core';
import { expose } from '@ringcentral/mfe-react';
import React from 'react';

type Options<T, S extends any[], R extends RendererType<S>> = PartialKeys<
  SharedAppConfig<T, S, R>,
  'render'
>;

interface ExposeMicroAppOptions<T, S extends any[], R extends RendererType<S>>
  extends Pick<Options<T, S, R>, Exclude<keyof Options<T, S, R>, 'render'>> {
  /**
   * As a app shell, it will render in the root element.
   */
  renderRoot?: () => HTMLElement | null;
}

export const exposeMicroApp = <T, S extends any[], R extends RendererType<S>>({
  ...options
}: ExposeMicroAppOptions<T, S, R>) => {
  let BootstrapView = () => null;
  return expose({
    init: async (inject: any) => {
      if (inject) {
        const view = await inject(options);
        BootstrapView = view;
        return;
      }
      return createSharedApp({
        ...options,
        render: (app: JSX.Element, ...args: any[]) => {
          const target = args[0];
          if (typeof target === 'object') {
            return render(app, target) as ReturnType<R>;
          }
          return render(app, args[1]) as ReturnType<R>;
        },
      }) as Promise<App<T, S, R>>;
    },
    render: (element = options.renderRoot!(), props?: any, mfeId?: string) => {
      if (props) {
        global.app.bootstrap(
          () => <BootstrapView {...props} mfeId={mfeId} />,
          element,
        );
      } else {
        global.app.bootstrap(element);
      }
      return () => {
        unmountComponentAtNode(element!);
      };
    },
  });
};
