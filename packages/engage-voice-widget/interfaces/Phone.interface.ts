import { BasePhone } from '@ringcentral-integration/commons/interfaces/BasePhone.interface';
import { RcModulePhoneType } from '@ringcentral-integration/core';
import LoginUI from '@ringcentral-integration/widgets/modules/LoginUI';

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
import { EvChooseAccountUI } from '../modules/EvChooseAccountUI';
import { EvDialerUI } from '../modules/EvDialerUI';
import { EvIntegratedSoftphone } from '../modules/EvIntegratedSoftphone';
import { EvManualDialSettingsUI } from '../modules/EvManualDialSettingsUI';
import { EvPresence } from '../modules/EvPresence';
import { EvRequeueCall } from '../modules/EvRequeueCall';
import { EvSettings } from '../modules/EvSettings';
import { EvSettingsUI } from '../modules/EvSettingsUI';
import { EvSubscription } from '../modules/EvSubscription';
import { EvTabManager } from '../modules/EvTabManager';
import { EvTransferCall } from '../modules/EvTransferCall';
import { EvTransferCallUI } from '../modules/EvTransferCallUI';
import { EvWorkingState } from '../modules/EvWorkingState';
import { MainViewUI } from '../modules/MainViewUI';

// TODO: separated UI and normal module that should just pick getUIProps, getUIFunctions in test environment.
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
  evChooseAccountUI: EvChooseAccountUI;
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
    tabManager: EvTabManager;
  } & EvPhoneUI
> &
  BasePhone;

export type DispatchPhone<T = [{ [key: string]: any }]> = {
  phone: EvPhone;
} & T;
