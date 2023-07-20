import type { BasePhone } from '@ringcentral-integration/commons/interfaces/BasePhone.interface';
import type { RcModulePhoneType } from '@ringcentral-integration/core';
import type { LoginUI } from '@ringcentral-integration/widgets/modules/LoginUI';

import type { EvClient } from '../lib/EvClient';
import type { EvActiveCallControl } from '../modules/EvActiveCallControl';
import type { EvActiveCallListUI } from '../modules/EvActiveCallListUI';
import type { EvActivityCallUI } from '../modules/EvActivityCallUI';
import type { EvAgentScript } from '../modules/EvAgentScript';
import type { EvAgentSession } from '../modules/EvAgentSession';
import type { EvAgentSessionUI } from '../modules/EvAgentSessionUI';
import type { EvAuth } from '../modules/EvAuth';
import type { EvCall } from '../modules/EvCall';
import type { EvCallMonitor } from '../modules/EvCallMonitor';
import type { EvChooseAccountUI } from '../modules/EvChooseAccountUI';
import type { EvDialerUI } from '../modules/EvDialerUI';
import type { EvIntegratedSoftphone } from '../modules/EvIntegratedSoftphone';
import type { EvManualDialSettingsUI } from '../modules/EvManualDialSettingsUI';
import type { EvPresence } from '../modules/EvPresence';
import type { EvRequeueCall } from '../modules/EvRequeueCall';
import type { EvSettings } from '../modules/EvSettings';
import type { EvSettingsUI } from '../modules/EvSettingsUI';
import type { EvSubscription } from '../modules/EvSubscription';
import type { EvTabManager } from '../modules/EvTabManager';
import type { EvTransferCall } from '../modules/EvTransferCall';
import type { EvTransferCallUI } from '../modules/EvTransferCallUI';
import type { EvWorkingState } from '../modules/EvWorkingState';
import type { MainViewUI } from '../modules/MainViewUI';

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
