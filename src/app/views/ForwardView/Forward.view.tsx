import {
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useParams,
} from '@ringcentral-integration/next-core';
import ForwardPanel from '@ringcentral-integration/widgets/components/ForwardPanel';
import React, { useRef } from 'react';

import { ActiveCallControl } from '../../services';

import type {
  ForwardViewFunctions,
  ForwardViewOptions,
  ForwardViewProps,
} from './Forward.view.interface';

@injectable({
  name: 'ForwardView',
})
export class ForwardView extends RcViewModule {
  constructor(
    protected _activeCallControl: ActiveCallControl,
    protected _router: RouterPlugin,
    @optional('ForwardViewOptions')
    protected _forwardViewOptions?: ForwardViewOptions,
  ) {
    super();
  }

  getUIFunctions(props: ForwardViewProps): ForwardViewFunctions {
    return {
      onForward: async (phoneNumber: string, telephonySessionId: string) => {
        const result = await this._activeCallControl.forward(
          phoneNumber,
          telephonySessionId,
        );
        if (result) {
          this._router.goBack();
        }
      },
      onBackClick: () => {
        this._router.goBack();
      },
    };
  }

  component(props: ForwardViewProps) {
    const { telephonySessionId } = useParams<{ telephonySessionId: string }>();
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = {
      ...props,
      telephonySessionId,
    };
    const Component = this._forwardViewOptions?.component || ForwardPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
