import {
  autobind,
  injectable,
  RcViewModule,
} from '@ringcentral-integration/next-core';
import { RcMicroAppView } from '@ringcentral-integration/next-micro';
import React, { PropsWithChildren, useState } from 'react';

import { AppRootView } from '../AppRootView';
import { ModalViewProps } from '../ModalView';

type AppRootProps = {
  ModalViewProps?: ModalViewProps;
  ToastViewProps?: ModalViewProps;
};

@injectable({
  name: 'MFEAppRootView',
})
export class MFEAppRootView extends RcViewModule {
  constructor(private _appRootView: AppRootView) {
    super();
  }

  private _routes = new Map<RcMicroAppView, () => JSX.Element>();

  setRoutes(instance: RcMicroAppView, routes: () => JSX.Element) {
    this._routes.set(instance, routes);
    this._updateRoutes?.((i: number) => i + 1);
  }

  private _updateRoutes?: (...args: any) => void;

  @autobind
  Routes(props: { appShell?: RcMicroAppView }) {
    const [, updateRoutes] = useState(0);
    this._updateRoutes = updateRoutes;
    return (
      <>
        {Array.from(this._routes).map(([instance, Route]) =>
          instance.isAppShell && instance !== props.appShell ? null : (
            <Route key={Math.random()} />
          ),
        )}
      </>
    );
  }

  private _updateDefaultRoute?: (...args: any) => void;

  private _defaultRoute: () => JSX.Element = () => <></>;

  setDefaultRoutes(route: () => JSX.Element) {
    this._defaultRoute = route;
    this._updateDefaultRoute?.((i: number) => i + 1);
  }

  @autobind
  DefaultRoute() {
    const [_, updateDefaultRoute] = useState(0);
    this._updateDefaultRoute = updateDefaultRoute;
    return <this._defaultRoute />;
  }

  component({ children, ...rest }: PropsWithChildren<AppRootProps>) {
    return (
      <this._appRootView.component {...rest}>
        {children}
      </this._appRootView.component>
    );
  }
}
