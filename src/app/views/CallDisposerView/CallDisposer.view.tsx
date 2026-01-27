/* eslint-disable @typescript-eslint/no-explicit-any */
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  AppFeatures,
  ConnectivityMonitor,
  RateLimiter,
  RegionSettings,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  DateTimeFormat,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  computed,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  UIFunctions,
  UIProps,
  useConnector,
  useParams,
} from '@ringcentral-integration/next-core';
import SaveLogButton from '@ringcentral-integration/widgets/components/SaveLogButton';
import type Form from '@rjsf/core';
import React, { useRef } from 'react';

import CallLogPanel from '../../components/CallLogPanelSimple';
import {
  CallHistory,
  CallingSettings,
  CallMonitor,
  ForwardingNumber,
} from '../../services';
import { CallLogCallCtrlView } from '../CallLogCallCtrlView';

import type {
  CallDisposerViewOptions,
  CallDisposerViewPanelProps,
  CallDisposerViewProps,
} from './CallDisposer.view.interface';
import i18n from './i18n';

interface IParams {
  telephonySessionId?: string;
}

@injectable({
  name: 'CallDisposerView',
})
export class CallDisposerView extends RcViewModule {
  private params: IParams = {};
  private currentTelephonySessionId: string | undefined = undefined;

  constructor(
    protected _locale: Locale,
    protected _rateLimiter: RateLimiter,
    protected _regionSettings: RegionSettings,
    protected _dateTimeFormat: DateTimeFormat,
    protected _router: RouterPlugin,
    protected _appFeatures: AppFeatures,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected _callingSettings: CallingSettings,
    protected _forwardingNumber: ForwardingNumber,
    protected _callMonitor: CallMonitor,
    protected _callHistory: CallHistory,
    protected _accountInfo: AccountInfo,
    @optional('CallLogViewOptions')
    protected _callDisposerViewOptions?: CallDisposerViewOptions,
    @optional() protected _callLogCallCtrlView?: CallLogCallCtrlView,
  ) {
    super();
  }

  getUIProps(
    props: CallDisposerViewProps,
  ): UIProps<CallDisposerViewPanelProps> {
    this.currentTelephonySessionId = this.params.telephonySessionId;
    const call = this.currentCall;

    return {
      schema: {
        type: 'object',
        required: ['subject'],
        properties: {
          subject: {
            type: 'string',
            title: 'Subject',
            default: 'IBC: +15012140016',
          },
          description: {
            type: 'string',
            title: 'Note',
            default: undefined,
          },
        },
      },
      currentLog: {
        call,
        logName: 'hell world',
        currentLogCall: {},
        customLogFields: [],
        task: {
          subject: 'IBC: +15012140016',
          description: undefined,
        },
      },
      currentLocale: this._locale.currentLocale,
      header: true,
      showSpinner: !(
        this._locale.ready &&
        this._regionSettings.ready &&
        this._dateTimeFormat.ready &&
        this._appFeatures.ready
      ),
      disableLinks:
        !this._connectivityMonitor.connectivity || this._rateLimiter.restricted,
      forwardingNumbers: this._forwardingNumber.forwardingNumbers,
    };
  }

  getUIFunctions(
    props: CallDisposerViewProps,
  ): UIFunctions<CallDisposerViewPanelProps> {
    const { t } = useLocale(i18n);

    return {
      onSaveCallLog: () => {
        this.formRef?.current?.submit();
      },
      // @ts-ignore
      onSubmitCallLog: ({ formData }) => {
        console.log('Data submitted: ', formData);
      },
      // @ts-ignore
      onUpdateCallLog: ({ formData }) => {
        console.log('Data updated: ', formData);
      },
      // renderEditLogSection: renderEditLogSection(),
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
        }) || t('unknown'),
      goBack: () => {
        this._router.goBack();
      },
      // TODO: fix types
      renderSaveLogButton(props: any) {
        return <SaveLogButton {...props} />;
      },
      // TODO: fix types
      dateTimeFormatter: ({ utcTimestamp }: any) =>
        this._dateTimeFormat.formatDateTime({
          utcTimestamp,
          name: 'CALL_LOG_DATETIME_FORMATTER',
        })!,
    };
  }

  @track(trackEvents.clickParticipantsIcon)
  clickParticipantsIconTrack() {
    //
  }

  @track(trackEvents.clickRemoveParticipant)
  clickRemoveParticipantTrack() {
    //
  }

  @computed((that: CallDisposerView) => [
    that._callMonitor.allCalls,
    that._callHistory.calls,
    that.currentTelephonySessionId,
  ])
  get currentCall() {
    return ([...this._callMonitor.allCalls, ...this._callHistory.calls].find(
      (call) => call.telephonySessionId === this.currentTelephonySessionId,
    ) || {}) as any;
  }

  formRef?: React.MutableRefObject<Form | undefined>;

  component(props: CallDisposerViewProps) {
    this.params = useParams<IParams>();
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component = this._callDisposerViewOptions?.component || CallLogPanel;
    this.formRef = useRef<Form>();
    // @ts-ignore
    return <Component {..._props} {...uiFunctions} formRef={this.formRef} />;
  }
}
