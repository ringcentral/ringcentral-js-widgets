import React, { FunctionComponent } from 'react';

import PresenceSettingSection from '../../PresenceSettingSection';

export interface PresenceSettingProps {
  showPresenceSettings?: boolean;
  dndStatus?: string;
  userStatus?: string;
  currentLocale: string;
  isCallQueueMember?: boolean;
  openPresenceSettings?: boolean;
  setAvailable?: (...args: any[]) => any;
  setBusy?: (...args: any[]) => any;
  setDoNotDisturb?: (...args: any[]) => any;
  setInvisible?: (...args: any[]) => any;
  toggleAcceptCallQueueCalls?: (...args: any[]) => any;
}

const PresenceSetting: FunctionComponent<PresenceSettingProps> = ({
  showPresenceSettings,
  dndStatus,
  userStatus,
  currentLocale,
  isCallQueueMember,
  setAvailable,
  setBusy,
  setDoNotDisturb,
  setInvisible,
  toggleAcceptCallQueueCalls,
  openPresenceSettings,
}) => {
  return showPresenceSettings && dndStatus && userStatus ? (
    <PresenceSettingSection
      currentLocale={currentLocale}
      dndStatus={dndStatus}
      userStatus={userStatus}
      isCallQueueMember={isCallQueueMember}
      setAvailable={setAvailable}
      setBusy={setBusy}
      setDoNotDisturb={setDoNotDisturb}
      setInvisible={setInvisible}
      toggleAcceptCallQueueCalls={toggleAcceptCallQueueCalls}
      showPresenceSettings={openPresenceSettings}
    />
  ) : null;
};

export { PresenceSetting };
