import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  computed,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
  useParams,
} from '@ringcentral-integration/next-core';
import FlipPanel from '@ringcentral-integration/widgets/components/FlipPanel';
import React, { useRef } from 'react';

import { ForwardingNumber, Webphone } from '../../services';

import type {
  FlipViewOptions,
  FlipViewPanelProps,
  FlipViewProps,
} from './Flip.view.interface';

interface IParams {
  sessionId?: string;
}

@injectable({
  name: 'FlipView',
})
export class FlipView extends RcViewModule {
  private params: IParams = {};

  get sessionId() {
    return this.params.sessionId!;
  }

  constructor(
    protected _locale: Locale,
    protected _webphone: Webphone,
    protected _forwardingNumber: ForwardingNumber,
    protected _regionSettings: RegionSettings,
    protected _router: RouterPlugin,
    protected _accountInfo: AccountInfo,
    @optional('FlipViewOptions') protected _flipViewOptions?: FlipViewOptions,
  ) {
    super();
  }

  @computed((that: FlipView) => [that.sessionId, that._webphone.sessions])
  get session() {
    return this.sessionId
      ? this._webphone.sessions.find((s) => s.id === this.sessionId)!
      : null;
  }

  getUIProps(): UIProps<FlipViewPanelProps> {
    return {
      sessionId: this.sessionId,
      isOnFlip: !!this.session?.isOnFlip,
      currentLocale: this._locale.currentLocale,
      flipNumbers: this._forwardingNumber.flipNumbers,
      session: this.session,
    };
  }

  getUIFunctions(): UIFunctions<FlipViewPanelProps> {
    return {
      onFlip: (...args) => this._webphone.flip(...args),
      onComplete: (...args) => this._webphone.hangup(...args),
      onBack: () => this._router.goBack(),
      onCallEnd: () => this._router.replace('/dialer'),
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
        })!,
    };
  }

  component(props: FlipViewProps) {
    this.params = useParams<IParams>();
    const { current: uiFunctions } = useRef(this.getUIFunctions());

    const _props = useConnector(() => {
      const uiProps = this.getUIProps();

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component = this._flipViewOptions?.component || FlipPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
