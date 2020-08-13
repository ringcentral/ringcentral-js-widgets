import {
  ActivePermissionResource,
  AuthProfileResource,
} from '@rc-ex/core/definitions';
import { computed, watch } from '@ringcentral-integration/core';
import { reduce } from 'ramda';
import { Unsubscribe } from 'redux';

import { Module } from '../../lib/di';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { permissionsMessages } from '../RolesAndPermissions/permissionsMessages';
import { Deps } from './RolesAndPermissions.interface';

const DEFAULT_TTL = 24 * 60 * 60 * 1000;

@Module({
  name: 'RolesAndPermissions',
  deps: [
    'Auth',
    'Alert',
    'Client',
    'DataFetcherV2',
    'ExtensionInfo',
    { dep: 'RolesAndPermissionsOptions', optional: true },
  ],
})
export class RolesAndPermissions extends DataFetcherV2Consumer<
  Deps,
  AuthProfileResource
> {
  protected _onDataReadyHandlers: (() => any)[] = [];
  protected _stopWatching: Unsubscribe = null;

  constructor(deps: Deps) {
    super({
      deps,
    });
    const rolesAndPermissionsOptions = deps.rolesAndPermissionsOptions ?? {};
    const { ttl = DEFAULT_TTL } = rolesAndPermissionsOptions;
    this._source = new DataSource({
      ...rolesAndPermissionsOptions,
      key: 'rolesAndPermissions',
      ttl,
      cleanOnReset: true,
      fetchFunction: async () => {
        try {
          const result: AuthProfileResource = await this._deps.client
            .account()
            .extension()
            .authzProfile()
            .get();
          return result;
        } catch (error) {
          if (error.response?.status === 403) {
            await this._deps.auth.logout();
            this._deps.alert.danger({
              message: permissionsMessages.insufficientPrivilege,
              ttl: 0,
            });
            return {} as AuthProfileResource;
          }
        }
      },
      readyCheckFunction: () =>
        this._deps.alert.ready &&
        this._deps.auth.ready &&
        this._deps.auth.loggedIn &&
        this._deps.dataFetcherV2.ready,
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  get isCRM() {
    return this._deps.rolesAndPermissionsOptions?.isCRM ?? false;
  }

  get flag() {
    return this._deps.rolesAndPermissionsOptions?.flag ?? 'SalesForce';
  }

  protected async _checkTier() {
    if (
      this.ready &&
      this._deps.auth.loggedIn &&
      this.isCRM &&
      this.tierEnabled === false
    ) {
      await this._deps.auth.logout();
      this._deps.alert.danger({
        message: permissionsMessages.invalidTier,
        ttl: 0,
      });
    }
  }

  @computed<RolesAndPermissions>(({ data }) => [data])
  get permissions() {
    return reduce(
      (acc, item) => {
        acc[item.permission.id] = true;
        return acc;
      },
      {} as Record<string, boolean>,
      this.data?.permissions || ([] as ActivePermissionResource[]),
    );
  }

  protected async _checkReadUserInfo() {
    if (
      this.ready &&
      this._deps.auth.loggedIn &&
      !this.permissions.ReadUserInfo
    ) {
      const hasPermissions = !!this.data;
      await this._deps.auth.logout();
      if (hasPermissions) {
        this._deps.alert.danger({
          message: permissionsMessages.insufficientPrivilege,
          ttl: 0,
        });
      }
    }
  }

  @computed<RolesAndPermissions>(({ ready, data }) => [ready, data])
  get _statusAndData(): [boolean, AuthProfileResource] {
    return [this.ready, this.data];
  }

  onInit() {
    this._stopWatching = watch(
      this,
      () => this._statusAndData,
      ([ready, data]) => {
        if (ready && data) {
          for (const handler of this._onDataReadyHandlers) {
            try {
              handler();
            } catch (error) {
              console.error(error);
            }
          }
        }
      },
    );
  }

  onReset() {
    this._stopWatching?.();
    this._stopWatching = null;
  }

  async onStateChange() {
    await this._checkTier();
    await this._checkReadUserInfo();
  }

  onDataReady(fn: () => any) {
    this._onDataReadyHandlers.push(fn);
  }

  refreshServiceFeatures() {
    this._deps.extensionInfo.fetchData();
  }

  get serviceFeatures() {
    return this._deps.extensionInfo.serviceFeatures;
  }

  async fetchData() {
    await this.refreshServiceFeatures();
    return super.fetchData();
  }

  get ringoutEnabled() {
    return !!this.serviceFeatures.RingOut?.enabled;
  }

  get webphoneEnabled() {
    return !!this.serviceFeatures.WebPhone?.enabled;
  }

  get callingEnabled() {
    return this.webphoneEnabled || this.ringoutEnabled;
  }

  get tierEnabled() {
    const feature = this.serviceFeatures[this.flag];
    return feature ? feature.enabled : null;
  }

  get hasReadCallLogPermission() {
    return !!(this.ready && this.permissions.ReadCallLog);
  }

  get hasPresencePermission() {
    return !!(
      this.ready &&
      this.callingEnabled &&
      this.permissions.ReadPresenceStatus
    );
  }

  get hasEditPresencePermission() {
    return !!(
      this.ready &&
      this.callingEnabled &&
      this.permissions.EditPresenceStatus
    );
  }

  get hasComposeTextPermission() {
    return !!(
      this.serviceFeatures.Pager?.enabled || this.serviceFeatures.SMS?.enabled
    );
  }

  get onlyPagerPermission() {
    return !!(
      this.serviceFeatures.Pager?.enabled && !this.serviceFeatures.SMS?.enabled
    );
  }

  get hasReadMessagesPermission() {
    return (
      this.ready &&
      (this.readTextPermissions ||
        this.voicemailPermissions ||
        this.readFaxPermissions)
    );
  }

  get readTextPermissions() {
    return !!(
      this.serviceFeatures.PagerReceiving?.enabled ||
      this.serviceFeatures.SMSReceiving?.enabled
    );
  }

  get voicemailPermissions() {
    return !!(
      this.permissions?.Voicemail && this.serviceFeatures.Voicemail?.enabled
    );
  }

  get readFaxPermissions() {
    return !!this.serviceFeatures.FaxReceiving?.enabled;
  }

  get hasUserGuidePermission() {
    return !!(this.callingEnabled || this.hasReadMessagesPermission);
  }

  get hasConferencingPermission() {
    return !!this.serviceFeatures.Conferencing?.enabled;
  }

  get hasGlipPermission() {
    return !!this.permissions.Glip;
  }

  get hasConferenceCallPermission() {
    return this.callingEnabled && this.webphoneEnabled;
  }

  get hasMeetingsPermission() {
    return !!this.permissions.Meetings;
  }
}
