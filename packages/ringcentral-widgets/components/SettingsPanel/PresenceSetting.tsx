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
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      isCallQueueMember={isCallQueueMember}
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      setAvailable={setAvailable}
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      setBusy={setBusy}
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      setDoNotDisturb={setDoNotDisturb}
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      setInvisible={setInvisible}
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      toggleAcceptCallQueueCalls={toggleAcceptCallQueueCalls}
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      showPresenceSettings={openPresenceSettings}
    />
  ) : null;
};

export { PresenceSetting };
