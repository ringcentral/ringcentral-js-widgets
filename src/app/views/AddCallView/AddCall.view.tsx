import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  RegionSettings,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  CompanyContacts,
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import { ContactSearchView } from '@ringcentral-integration/micro-contacts/src/app/views';
import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { useRef } from 'react';

import {
  ActiveCallControl,
  AudioSettings,
  Call,
  CallingSettings,
  CallMonitor,
  Webphone,
} from '../../services';
import { DialerView } from '../DialerView';

import type {
  AddCallViewOptions,
  AddCallViewPanelProps,
  AddCallViewProps,
} from './AddCall.view.interface';
import { AddCallPanel } from './deprecated';

@injectable({
  name: 'AddCallView',
})
export class AddCallView extends RcViewModule {
  constructor(
    protected _locale: Locale,
    protected _regionSettings: RegionSettings,
    protected _router: RouterPlugin,
    protected _callMonitor: CallMonitor,
    protected _accountInfo: AccountInfo,
    protected _call: Call,
    protected _callingSettings: CallingSettings,
    protected _dialerView: DialerView,
    private _contactSearchView: ContactSearchView,
    @optional() protected _audioSettings?: AudioSettings,
    @optional() protected _contactSearch?: ContactSearch,
    @optional() protected _webphone?: Webphone,
    @optional() protected _activeCallControl?: ActiveCallControl,
    @optional() protected _companyContacts?: CompanyContacts,
    @optional('AddCallViewOptions')
    protected _addCallViewOptions?: AddCallViewOptions,
  ) {
    super();
  }

  @track((that: AddCallView, eventName: string, contactType: string) => {
    return [eventName, { contactType, location: 'Add Call' }];
  })
  async triggerEventTracking(eventName: string, contactType: string) {
    //
  }

  getUIProps(): UIProps<AddCallViewPanelProps> {
    return {
      currentLocale: this._locale.currentLocale,
      searchContactList: this._contactSearch?.sortedResult ?? [],
      controlBusy: this._activeCallControl?.busy || !this._call.isIdle,
      hasCalls: this._callMonitor.allCalls.length > 0,
      callVolume: this._audioSettings?.callVolume ?? 1,
      outputDeviceId: this._audioSettings?.outputDeviceId ?? '',
    };
  }

  getUIFunctions(): UIFunctions<AddCallViewPanelProps> {
    return {
      triggerEventTracking: (eventName: string, contactType: string) =>
        this.triggerEventTracking(eventName, contactType),
      onBack: () => {
        this._router.goBack();
      },
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
        })!,
      searchContact: (searchString) => {
        this._contactSearch?.debouncedSearch({ searchString });
      },
      onAddCall: async (params) => {
        await this._dialerView.call(params);
        this._router.push('/dialer');
      },
    };
  }

  component(props: AddCallViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions());

    const _props = useConnector(() => {
      const uiProps = this.getUIProps();

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component = this._addCallViewOptions?.component || AddCallPanel;

    return (
      // TODO: fix type
      // @ts-ignore
      <Component
        {..._props}
        ContactSearch={this._contactSearchView.component}
        {...uiFunctions}
      />
    );
  }
}
