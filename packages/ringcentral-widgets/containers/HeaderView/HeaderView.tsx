import React, { FunctionComponent } from 'react';

import {
  createGlobalStyle,
  flexCenterStyle,
  palette2,
  styled,
} from '@ringcentral/juno';

import CallMonitorBar from '../../components/CallMonitorBar';
import { PresenceDropdown } from '../../components/PresenceDropdown';
import { fullSizeStyle, noSelectStyle } from '../../lib/commonStyles';
import { connectModule } from '../../lib/phoneContext';
import { HeaderViewProps } from './HeaderView.interface';
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
  position: relative;
  height: calc(100% - ${headerViewHeight}px);
  z-index: 1;
`;

export const HeaderView: FunctionComponent<HeaderViewProps> = ({
  logo: Logo,
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
    return <>{children}</>;
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
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        )}
      </Header>
      <Main>{children}</Main>
    </Wrapper>
  );
};

export const HeaderContainer = connectModule<any, Partial<HeaderViewProps>>(
  ({ headerViewUI }) => headerViewUI,
)(HeaderView);