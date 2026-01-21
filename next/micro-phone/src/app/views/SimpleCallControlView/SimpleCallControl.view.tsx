import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import {
  AccountInfo,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Brand,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import { SimpleCallControlPanel } from '@ringcentral-integration/widgets/components/SimpleCallControlPanel';
import { t } from '@ringcentral-integration/widgets/components/SimpleCallControlPanel/i18n';
import { pickFallBackInfo } from '@ringcentral-integration/widgets/components/SimpleCallControlPanel/utils';
import React, { useRef } from 'react';
import { useParams } from 'react-router';

import { ActiveCallControl } from '../../services';

import type {
  IParams,
  SimpleCallControlContainerProps,
  SimpleCallControlViewOptions,
  SimpleCallControlPageProps,
  SimpleCallControlViewProps,
} from './SimpleCallControl.view.interface';

@injectable({
  name: 'SimpleCallControlView',
})
export class SimpleCallControlView extends RcViewModule {
  params: IParams = {};

  constructor(
    protected _locale: Locale,
    protected _router: RouterPlugin,
    protected _brand: Brand,
    protected _regionSettings: RegionSettings,
    protected _activeCallControl: ActiveCallControl,
    protected _accountInfo: AccountInfo,
    @optional('SimpleCallControlViewOptions')
    protected _simpleCallControlViewOptions?: SimpleCallControlViewOptions,
  ) {
    super();
  }

  get sessionId() {
    return this.params.sessionId!;
  }

  getUIProps({
    renderContactName,
  }: SimpleCallControlContainerProps): UIProps<SimpleCallControlPageProps> {
    const activeSession = this._activeCallControl.getActiveSession(
      this.sessionId,
    );
    let fallBackName = '';
    let phoneNumber = '';
    let nameMatches: Entity[] = [];

    if (renderContactName) {
      const contactName = renderContactName({
        sessionId: activeSession?.sessionId,
        telephonySessionId: this.sessionId,
      });
      const { fallBackName: fallBackNameFromThirdParty, fallBackNumber } =
        pickFallBackInfo(
          activeSession,
          contactName,
          this._locale.currentLocale,
        );
      phoneNumber = fallBackNumber;
      fallBackName = fallBackNameFromThirdParty;
    } else if (activeSession) {
      phoneNumber =
        activeSession.direction === callDirections.outbound
          ? activeSession.to!
          : activeSession.from!;

      if (!renderContactName) {
        nameMatches =
          (activeSession.direction === callDirections.outbound
            ? activeSession.toMatches
            : activeSession.fromMatches) ?? [];
      }
      fallBackName = t('Unknown');
    }

    return {
      currentLocale: this._locale.currentLocale,
      activeSession,
      sessionId: this.sessionId,
      areaCode: this._regionSettings.areaCode,
      countryCode: this._regionSettings.countryCode,
      nameMatches,
      phoneNumber,
      fallBackName,
      brandName: this._brand.name,
      controlBusy: this._activeCallControl.busy,
      maxExtensionNumberLength: this._accountInfo.maxExtensionNumberLength,
    };
  }

  getUIFunctions(): UIFunctions<SimpleCallControlPageProps> {
    return {
      onBackButtonClick: () => {
        this._router.goBack();
      },
      onTransfer: (sessionId = this.sessionId) => {
        this._router.push(`/transfer/${sessionId}/active`);
      },
      onMute: () => this._activeCallControl.mute(this.sessionId),
      onUnmute: () => this._activeCallControl.unmute(this.sessionId),
      onHold: () => this._activeCallControl.hold(this.sessionId),
      onUnhold: () => this._activeCallControl.unhold(this.sessionId),
      onHangup: () => this._activeCallControl.hangUp(this.sessionId),
    };
  }

  component(props: SimpleCallControlViewProps) {
    this.params = useParams<IParams>();
    const { current: uiFunctions } = useRef(this.getUIFunctions());

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component =
      this._simpleCallControlViewOptions?.component || SimpleCallControlPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
