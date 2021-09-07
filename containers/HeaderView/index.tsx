import React, { FC } from 'react';
import PresenceDropdown from '../../components/PresenceDropdown';
import CallMonitorBar from '../../components/CallMonitorBar';
import { connectModule } from '../../lib/phoneContext';
import { Props } from './HeaderView.interface';

import styles from './styles.scss';

const ALL_CALL_PATH = '/calls';
const ACTIVE_CALL_PATH = '/calls/active';

export const HeaderView: FC<Props> = ({
  logo,
  userStatus,
  dndStatus,
  currentLocale,
  setAvailable,
  setBusy,
  setDoNotDisturb,
  setInvisible,
  standAlone,
  children,
  ringingCalls,
  onHoldCalls,
  currentCalls,
  currentPath,
  activeSessionId,
  incomingCallPageMinimized,
  presenceReady,
  ...props
}) => {
  if (!standAlone) {
    return children;
  }
  let shouldDisplayCallMonitorBar = false;
  if (
    currentCalls.length > 0 ||
    ringingCalls.length > 0 ||
    onHoldCalls.length > 0
  ) {
    shouldDisplayCallMonitorBar = true;
  }
  const Logo = logo;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <PresenceDropdown
          isReady={presenceReady}
          currentLocale={currentLocale}
          dndStatus={dndStatus}
          userStatus={userStatus}
          setAvailable={setAvailable}
          setBusy={setBusy}
          setDoNotDisturb={setDoNotDisturb}
          setInvisible={setInvisible}
        />
        {shouldDisplayCallMonitorBar ? (
          <CallMonitorBar
            ringingCalls={ringingCalls}
            currentLocale={currentLocale}
            onHoldCalls={onHoldCalls}
            currentCalls={currentCalls}
            shouldDisplayCurrentCallBtn={
              currentPath !== ACTIVE_CALL_PATH &&
              currentPath !== `${ACTIVE_CALL_PATH}/${activeSessionId}`
            }
            shouldDisplayViewCallsBtn={
              !incomingCallPageMinimized || currentPath !== ALL_CALL_PATH
            }
            {...props}
          />
        ) : (
          <Logo className={styles.logo} />
        )}
      </header>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default connectModule(({ headerViewUI }) => headerViewUI)(HeaderView);
