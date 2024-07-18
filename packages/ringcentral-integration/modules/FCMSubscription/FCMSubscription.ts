import {
  action,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

import { subscriptionFilters } from '../../enums/subscriptionFilters';
import { Module } from '../../lib/di';
import { waitUntilTo } from '../../utils';

import {
  Deps,
  TFCMSubscription,
  TRegistrationToken,
} from './FCMSubscription.interface';

@Module({
  name: 'FCMSubscription',
  deps: ['Auth', 'Storage', 'Client', { dep: 'FCMSubscriptionOptions' }],
})
export class FCMSubscription extends RcModuleV2<Deps> {
  messaging: ReturnType<typeof getMessaging>;
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'FCMSubscription',
    });
    // Initialize Firebase
    const firebaseApp = initializeApp(
      this._deps.fCMSubscriptionOptions.firebaseConfig,
    );
    this.messaging = getMessaging(firebaseApp);
  }

  override _shouldInit() {
    return !!(super._shouldInit() && this._deps.auth.loggedIn);
  }

  override _shouldReset() {
    return !!(
      super._shouldReset() ||
      (this.ready && !this._deps.auth.loggedIn)
    );
  }

  override onInitOnce() {
    this._deps.auth.addBeforeLogoutHandler(async () => {
      const fcmSubscription = this.fcmSubscription;
      if (fcmSubscription) {
        await this._deleteSubscription(fcmSubscription);
      }
    });
  }
  @state
  registrationToken: TRegistrationToken = null;

  @action
  setRegistrationToken(token: TRegistrationToken) {
    this.registrationToken = token;
  }

  @storage
  @state
  fcmSubscription: TFCMSubscription = null;

  @action
  setFcmSubscription(subscription: TFCMSubscription) {
    this.fcmSubscription = subscription;
  }
  getServiceworkerRigestration() {
    return new Promise((resolve, reject) => {
      navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
        getToken(this.messaging, {
          vapidKey: this._deps.fCMSubscriptionOptions.vapidKey,
          serviceWorkerRegistration,
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log('===registration token: ', currentToken);
              this.setRegistrationToken(currentToken);
              resolve(null);
            } else {
              // Show permission request UI
              console.log(
                '==No registration token available. Request permission to generate one.',
              );
              this.setRegistrationToken(null);
              resolve(null);
            }
          })
          .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            this.setRegistrationToken(null);
            reject();
          });
      });
    });
  }
  async _createSubscription(registrationToken: TRegistrationToken) {
    const response = await this._deps.client.service.post(
      '/restapi/v1.0/subscription',
      {
        eventFilters: [
          '/restapi/v1.0/account/~/extension/~/start-ring',
          '/restapi/v1.0/account/~/extension/~/stop-ring',
          '/restapi/v1.0/account/~/extension/~/missed-calls',
          '/restapi/v1.0/account/~/extension/~/fax?direction=Inbound',
          '/restapi/v1.0/account/~/extension/~/voicemail',
          '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS',
          '/restapi/v1.0/account/~/extension/~/message-store?type=Pager&direction=Inbound',
          subscriptionFilters.presence,
        ],
        deliveryMode: {
          transportType: 'RC/GCM',
          registrationId: registrationToken,
          certificateName: this._deps.fCMSubscriptionOptions.certificateName,
        },
      },
    );
    return response.json();
  }
  async _deleteSubscription(fcmSubscription: TFCMSubscription) {
    await this._deps.client.service.delete(
      `/restapi/v1.0/subscription/${fcmSubscription!.id}`,
    );
    this.setFcmSubscription(null);
  }
  async _createOrUpdateSubscription(
    fcmSubscription: TFCMSubscription,
    registrationToken: TRegistrationToken,
  ) {
    if (!fcmSubscription) {
      return await this._createSubscription(registrationToken);
    }
    if (fcmSubscription.deliveryMode.registrationId === registrationToken) {
      const renewResponse = await this._deps.client.service.post(
        `/restapi/v1.0/subscription/${fcmSubscription.id}/renew`,
      );
      return renewResponse.json();
    }
    try {
      this._deleteSubscription(fcmSubscription);
    } catch (e) {
      console.error(`[FCMSubscription] subscription delete fail: ${e}`);
      throw e;
    }
    return await this._createSubscription(registrationToken);
  }

  private async _registerFCM() {
    await this.getServiceworkerRigestration();
    const registrationToken = this.registrationToken;
    let subscription = this.fcmSubscription;
    subscription = await this._createOrUpdateSubscription(
      subscription,
      registrationToken,
    );
    this.setFcmSubscription(subscription);
  }

  override async onInit() {
    try {
      await waitUntilTo(async () => await this._registerFCM(), {
        timeout: 30000,
        interval: 10000,
      });
    } catch (e) {
      console.error(`===something error:${e}`);
    }
  }
}
