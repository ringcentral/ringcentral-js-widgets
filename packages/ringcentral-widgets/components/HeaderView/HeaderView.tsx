import {
  createGlobalStyle,
  flexCenterStyle,
  palette2,
  styled,
} from '@ringcentral/juno';
import type { FunctionComponent } from 'react';
import React from 'react';

import { fullSizeStyle, noSelectStyle } from '../../lib/commonStyles';
import { CallMonitorBar } from '../CallMonitorBar';
import { PresenceDropdown } from '../PresenceDropdown';

import type { HeaderViewProps } from './HeaderView.interface';
import styles from './styles.scss';
import { headerViewHeight } from './utils';

const ALL_CALL_PATH = '/calls';
const ACTIVE_CALL_PATH = '/calls/active';

// TODO: refactor with Juno
const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #2F2F2F;
  }
`;

const Header = styled.header`
  ${noSelectStyle};
  position: relative;
  height: ${headerViewHeight}px;
  line-height: ${headerViewHeight}px;
  text-align: center;
  box-sizing: border-box;
  background-color: ${palette2('neutral', 'b01')};
  border-bottom: 1px solid ${palette2('neutral', 'l02')};
  z-index: 2;
`;

const LogoWrapper = styled.div`
  ${fullSizeStyle};
  ${flexCenterStyle};
`;

const Wrapper = styled.div`
  ${fullSizeStyle};
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;
  height: calc(100% - ${headerViewHeight}px);
  z-index: 1;
`;

export const HeaderView: FunctionComponent<HeaderViewProps> = ({
  logoUrl,
  userStatus,
  dndStatus,
  currentLocale,
  setAvailable,
  setBusy,
  setDoNotDisturb,
  setInvisible,
  standAlone,
  children,
  ringingCalls = [],
  onHoldCalls = [],
  currentCalls = [],
  currentPath,
  activeSessionId,
  incomingCallPageMinimized,
  presenceReady,
  shouldDisplayCurrentCallBtn,
  shouldDisplayViewCallsBtn,
  ...props
}) => {
  if (!standAlone) {
    return (
      <>
        <GlobalStyle />
        {children}
      </>
    );
  }

  const shouldDisplayCallMonitorBar =
    currentCalls.length > 0 ||
    ringingCalls.length > 0 ||
    onHoldCalls.length > 0;

  return (
    <Wrapper>
      <GlobalStyle />
      <Header>
        <PresenceDropdown
          isReady={!!presenceReady}
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
              shouldDisplayCurrentCallBtn ??
              (currentPath !== ACTIVE_CALL_PATH &&
                currentPath !== `${ACTIVE_CALL_PATH}/${activeSessionId}`)
            }
            shouldDisplayViewCallsBtn={
              shouldDisplayViewCallsBtn ??
              (!incomingCallPageMinimized || currentPath !== ALL_CALL_PATH)
            }
            {...props}
          />
        ) : (
          <LogoWrapper>
            {logoUrl ? (
              <img src={logoUrl} alt="" className={styles.logo} />
            ) : null}
          </LogoWrapper>
        )}
      </Header>
      <Main>{children}</Main>
    </Wrapper>
  );
};
