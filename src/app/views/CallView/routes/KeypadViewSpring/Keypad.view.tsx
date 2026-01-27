import {
  injectable,
  optional,
  RcViewModule,
  Root,
  type UIFunctions,
  type UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { useRef } from 'react';

import { AudioSettings, Call, CallAction } from '../../../../services';
import { CallViewState } from '../../services';

import type {
  KeypadViewOptions,
  KeypadViewPanelProps,
  KeypadViewProps,
} from './Keypad.view.interface';
import { KeypadPage } from './KeypadPanel';

@injectable({
  name: 'KeypadView',
})
export class KeypadView extends RcViewModule {
  constructor(
    private _callAction: CallAction,
    private _root: Root,
    private _call: Call,
    private _callViewState: CallViewState,
    @optional() private _audioSettings?: AudioSettings,
    @optional('KeypadViewOptions')
    private _keypadViewOptions?: KeypadViewOptions,
  ) {
    super();
  }

  getUIProps({
    call,
    actionsDisabled,
  }: KeypadViewProps): UIProps<KeypadViewPanelProps> {
    const state = this._callViewState.getCallViewState(
      call.telephonySessionId!,
    );
    return {
      call,
      expanded: this._root.expanded,
      toNumber: state.keypadToNumber,
      callVolume: this._audioSettings?.callVolume ?? 1,
      outputDeviceId: this._audioSettings?.outputDeviceId ?? '',
      actionButtonDisabled: actionsDisabled || !this._call.isIdle,
    };
  }

  getUIFunctions({ call }: KeypadViewProps): UIFunctions<KeypadViewPanelProps> {
    const telephonySessionId = call.telephonySessionId!;
    const toggleExpanded = this._callAction.toggleExpanded;

    return {
      onToNumberChange: (val: string) =>
        this._callViewState.setCallViewState(telephonySessionId, {
          keypadToNumber: val,
        }),
      onAction: (...args) => {
        const handlers =
          this._callAction.createActionsHandler(telephonySessionId);
        return handlers(...args);
      },
      onExpand: toggleExpanded
        ? () => toggleExpanded(telephonySessionId)
        : undefined,
    };
  }

  component(props: KeypadViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component = this._keypadViewOptions?.component || KeypadPage;

    return <Component {..._props} {...uiFunctions} />;
  }
}
