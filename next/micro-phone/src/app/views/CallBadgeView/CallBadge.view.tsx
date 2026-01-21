import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  computed,
  injectable,
  optional,
  RcViewModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import CallBadgePanel from '@ringcentral-integration/widgets/components/CallBadge';
import React, { useRef } from 'react';

import { Webphone } from '../../services';

import type {
  CallBadgePanelProps,
  CallBadgeViewOptions,
  CallBadgeViewProps,
} from './CallBadge.view.interface';

@injectable({
  name: 'CallBadgeView',
})
export class CallBadgeView extends RcViewModule {
  constructor(
    protected _locale: Locale,
    protected _webphone: Webphone,
    @optional('CallBadgeViewOptions')
    protected _callBadgeViewOptions?: CallBadgeViewOptions,
  ) {
    super();
  }

  @computed((that: CallBadgeView) => [
    that._webphone.activeSession,
    that._webphone.ringSession,
  ])
  get currentSession() {
    return this._webphone.activeSession || this._webphone.ringSession || {};
  }

  getUIProps({
    hidden,
    defaultOffsetX = 0,
    defaultOffsetY = 0,
  }: CallBadgeViewProps): UIProps<CallBadgePanelProps> {
    return {
      hidden,
      defaultOffsetX,
      defaultOffsetY,
      session: this.currentSession,
      currentLocale: this._locale.currentLocale,
    };
  }

  getUIFunctions({
    goToCallCtrl,
  }: CallBadgeViewProps): UIFunctions<CallBadgePanelProps> {
    return {
      goToCallCtrl,
      toggleMinimized: (id) => this._webphone.toggleMinimized(id),
    };
  }

  component(props: CallBadgeViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component = this._callBadgeViewOptions?.component || CallBadgePanel;

    return (
      // TODO: fix type
      // @ts-ignore
      <Component {..._props} {...uiFunctions} />
    );
  }
}
