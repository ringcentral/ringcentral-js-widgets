import React, { FunctionComponent } from 'react';

import { PresenceSettingSection } from '../PresenceSettingSection';
import { PresenceSettingProps } from './SettingsPanel.interface';

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
