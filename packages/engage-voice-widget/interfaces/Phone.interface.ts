import { RcModulePhoneType } from '@ringcentral-integration/core';
import { BasePhone } from 'ringcentral-integration/models/basePhone.model';
import TabManager from 'ringcentral-integration/modules/TabManager';
import { Modal } from 'ringcentral-widgets/modules/Modal';
import { ModalUI } from 'ringcentral-widgets/modules/ModalUI';
import LoginUI from 'ringcentral-widgets/modules/LoginUI';

import { EvClient } from '../lib/EvClient';
import { EvActiveCallControl } from '../modules/EvActiveCallControl';
import { EvActiveCallListUI } from '../modules/EvActiveCallListUI';
import { EvActivityCallUI } from '../modules/EvActivityCallUI';
import { EvAuth } from '../modules/EvAuth';
import { EvCall } from '../modules/EvCall';
import { EvCallMonitor } from '../modules/EvCallMonitor';
import { EvDialerUI } from '../modules/EvDialerUI';
import { EvInboundQueuesUI } from '../modules/EvInboundQueuesUI';
import { EvIntegratedSoftphone } from '../modules/EvIntegratedSoftphone';
import { EvManualDialSettingsUI } from '../modules/EvManualDialSettingsUI';
import { EvPresence } from '../modules/EvPresence';
import { EvRequeueCall } from '../modules/EvRequeueCall';
import { EvSessionConfig } from '../modules/EvSessionConfig';
import { EvSessionConfigUI } from '../modules/EvSessionConfigUI';
import { EvSettings } from '../modules/EvSettings';
import { EvSettingsUI } from '../modules/EvSettingsUI';
import { EvSubscription } from '../modules/EvSubscription';
import { EvTransferCall } from '../modules/EvTransferCall';
import { EvTransferCallUI } from '../modules/EvTransferCallUI';
import { EvWorkingState } from '../modules/EvWorkingState';
import { MainViewUI } from '../modules/MainViewUI';

// TODO: separed UI and nomal module that should just pick getUIProps, getUIFunctions in test environment.
export type EvPhoneUI = {
  evInboundQueuesUI: EvInboundQueuesUI;
  evSessionConfigUI: EvSessionConfigUI;
  LoginUI: LoginUI;
  evActivityCallUI: EvActivityCallUI;
  mainViewUI: MainViewUI;
  evDialerUI: EvDialerUI;
  evTransferCallUI: EvTransferCallUI;
  evActiveCallListUI: EvActiveCallListUI;
  evSettingsUI: EvSettingsUI;
  evManualDialSettingsUI: EvManualDialSettingsUI;
  modalUI: ModalUI;
};

export type EvPhone = RcModulePhoneType<
  {
    modal: Modal;
    activeCallControl: EvActiveCallControl;
    evAuth: EvAuth;
    evCall: EvCall;
    evCallMonitor: EvCallMonitor;
    evSessionConfig: EvSessionConfig;
    evSettings: EvSettings;
    evSubscription: EvSubscription;
    evWorkingState: EvWorkingState;
    evRequeueCall: EvRequeueCall;
    evTransferCall: EvTransferCall;
    presence: EvPresence;
    evClient: EvClient;
    tabManager?: TabManager;
    evIntegratedSoftphone: EvIntegratedSoftphone;
  } & EvPhoneUI
> &
  BasePhone;

export type DispatchPhone<T = [{ [key: string]: any }]> = {
  phone: EvPhone;
} & T;
