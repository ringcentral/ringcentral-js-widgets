import { computed, RcUIModuleV2 } from '@ringcentral-integration/core';
import moment from 'moment';
import { Module } from '@ringcentral-integration/commons/lib/di';

import {
  EvSettingsUIFunctions,
  EvSettingsUIProps,
  SessionInfo,
} from '../../interfaces/EvSettingsUI.interface';
import { formatPhoneNumber } from '../../lib/FormatPhoneNumber';
import { Deps, SettingsUI } from './EvSettingsUI.interface';
import i18n from './i18n';

const LOGIN_TYPE = {
  RC_PHONE: 'ringCentralPhone',
  RC_SOFTPHONE: 'integratedPhone',
  RC_EXTERNAL: 'externalPhone',
};

type LoginType = keyof typeof LOGIN_TYPE;

@Module({
  name: 'EvSettingsUI',
  deps: [
    'EvClient',
    'Locale',
    'RouterInteraction',
    'EvAuth',
    'EvSettings',
    'Version',
    'EvCallMonitor',
    'EvAgentSession',
  ],
})
class EvSettingsUI extends RcUIModuleV2<Deps> implements SettingsUI {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @computed((that: EvSettingsUI) => [
    that._deps.locale.currentLocale,
    that._deps.evAuth.agentSettings.loginDTS,
    that._deps.evAuth.agentSettings.loginType,
    that._deps.evAuth.agentSettings.dialDest,
    that._deps.evAuth.inboundSettings.skillProfile,
  ])
  get sessionInfo(): SessionInfo {
    const { loginDTS, loginType, dialDest } = this._deps.evAuth.agentSettings;

    const [phoneNumber, type = 'RC_EXTERNAL'] = dialDest.split('@');

    // TODO: find that why reponse empty phoneNumber by accident
    const formatedPhoneNumber = formatPhoneNumber({
      phoneNumber,
      currentLocale: this._deps.locale.currentLocale,
    });

    const loginTime = moment(loginDTS).format('M/DD/YY h:mm A');

    const getLocalString = (name: string) =>
      i18n.getString(name, this._deps.locale.currentLocale);

    const profileName =
      this._deps.evAuth.inboundSettings.skillProfile?.profileName ??
      getLocalString('noneSkillProfile');

    return [
      {
        label: getLocalString(
          LOGIN_TYPE[type as LoginType] ?? 'integratedPhone',
        ),
        value: LOGIN_TYPE[type as LoginType] ? formatedPhoneNumber : dialDest,
      },
      {
        label: getLocalString('loginStyle'),
        value: loginType,
      },
      {
        label: getLocalString('loginTime'),
        value: loginTime,
      },
      {
        label: getLocalString('skillProfile'),
        value: profileName,
      },
    ];
  }

  goToSessionUpdatePage() {
    this._deps.evAgentSession.resetFormGroup();
    this._deps.routerInteraction.push('/sessionUpdate');
  }

  get agentName() {
    const {
      firstName,
      lastName,
    } = this._deps.evAuth.agent.agentConfig.agentSettings;
    if (!firstName && !lastName) {
      return null;
    }
    return `${firstName} ${lastName}`;
  }

  getUIProps(): EvSettingsUIProps {
    const { agentSettings, agentPermissions } = this._deps.evAuth;
    return {
      currentLocale: this._deps.locale.currentLocale,
      version: this._deps.version,
      agentName: this.agentName,
      userName: agentSettings.username,
      sessionInfo: this.sessionInfo,
      // pendingdisposition?
      disableEditSessionButton:
        this._deps.evCallMonitor.isOnCall ||
        this._deps.evSettings.isOffhooking ||
        this._deps.evSettings.isOffhook,
      showEditSessionIcon: agentPermissions.allowLoginUpdates,
    };
  }

  getUIFunctions(): EvSettingsUIFunctions {
    return {
      onLogout: () => this._deps.evAuth.logout(),
      goToSessionUpdatePage: () => this.goToSessionUpdatePage(),
    };
  }
}
export { EvSettingsUI };
