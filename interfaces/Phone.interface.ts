import { RcModulePhoneType } from '@ringcentral-integration/core';
import { BasePhone } from 'ringcentral-integration/models/basePhone.model';
import LoginUI from 'ringcentral-widgets/modules/LoginUI';

import { EvClient } from '../lib/EvClient';
import { EvActiveCallControl } from '../modules/EvActiveCallControl';
import { EvActiveCallListUI } from '../modules/EvActiveCallListUI';
import { EvActivityCallUI } from '../modules/EvActivityCallUI';
import { EvAgentScript } from '../modules/EvAgentScript';
import { EvAgentSession } from '../modules/EvAgentSession';
import { EvAgentSessionUI } from '../modules/EvAgentSessionUI';
import { EvAuth } from '../modules/EvAuth';
import { EvCall } from '../modules/EvCall';
import { EvCallMonitor } from '../modules/EvCallMonitor';
import { EvDialerUI } from '../modules/EvDialerUI';
import { EvIntegratedSoftphone } from '../modules/EvIntegratedSoftphone';
import { EvManualDialSettingsUI } from '../modules/EvManualDialSettingsUI';
import { EvPresence } from '../modules/EvPresence';
import { EvRequeueCall } from '../modules/EvRequeueCall';
import { EvSettings } from '../modules/EvSettings';
import { EvSettingsUI } from '../modules/EvSettingsUI';
import { EvSubscription } from '../modules/EvSubscription';
import { EvTransferCall } from '../modules/EvTransferCall';
import { EvTransferCallUI } from '../modules/EvTransferCallUI';
import { EvWorkingState } from '../modules/EvWorkingState';
import { MainViewUI } from '../modules/MainViewUI';

// TODO: separed UI and nomal module that should just pick getUIProps, getUIFunctions in test environment.
export type EvPhoneUI = {
  LoginUI: LoginUI;
  mainViewUI: MainViewUI;
  evAgentSessionUI: EvAgentSessionUI;
  evActivityCallUI: EvActivityCallUI;
  evDialerUI: EvDialerUI;
  evTransferCallUI: EvTransferCallUI;
  evActiveCallListUI: EvActiveCallListUI;
  evSettingsUI: EvSettingsUI;
  evManualDialSettingsUI: EvManualDialSettingsUI;
};

export type EvPhone = RcModulePhoneType<
  {
    activeCallControl: EvActiveCallControl;
    evAuth: EvAuth;
    evCall: EvCall;
    evCallMonitor: EvCallMonitor;
    evAgentSession: EvAgentSession;
    evSettings: EvSettings;
    evSubscription: EvSubscription;
    evWorkingState: EvWorkingState;
    evRequeueCall: EvRequeueCall;
    evTransferCall: EvTransferCall;
    presence: EvPresence;
    evClient: EvClient;
    evIntegratedSoftphone: EvIntegratedSoftphone;
    evAgentScript: EvAgentScript;
  } & EvPhoneUI
> &
  BasePhone;

export type DispatchPhone<T = [{ [key: string]: any }]> = {
  phone: EvPhone;
} & T;
