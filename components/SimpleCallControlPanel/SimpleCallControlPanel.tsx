import React, {
  useCallback,
  useEffect,
  useState,
  FunctionComponent,
  useRef,
} from 'react';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';

import CallCtrlPanel from '../CallCtrlPanel';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import { ACTIONS_CTRL_MAP } from '../ActiveCallPad';
import { SimpleCallControlPanelProps } from './SimpleCallControlPanel.interface';
import i18n from './i18n';

const SimpleCallControlPanel: FunctionComponent<SimpleCallControlPanelProps> = ({
  activeSession,
  areaCode,
  countryCode,
  nameMatches,
  sessionId,
  currentLocale,
  fallBackName,
  phoneNumber,
  actions,
  showContactDisplayPlaceholder,
  controlBusy,
  brandName,
  onBackButtonClick,
  setActiveSessionId,
  onMute,
  onUnmute,
  onHold,
  onUnhold,
  onHangup,
  onTransfer,
}) => {
  const [selectedMatcherIndex, setSelectedMatcherIndex] = useState(0);
  const formatPhone = useCallback(
    (phoneNumber) =>
      formatNumber({
        phoneNumber,
        areaCode,
        countryCode,
      }),
    [areaCode, countryCode],
  );
  const onSelectMatcherName = useCallback(
    (option) => {
      let selectedMatcherIndex = (nameMatches ?? []).findIndex(
        (match) => match.id === option.id,
      );
      if (selectedMatcherIndex < 0) {
        selectedMatcherIndex = 0;
      }
      setSelectedMatcherIndex(selectedMatcherIndex);
    },
    [nameMatches],
  );
  const renderTime = useRef(0);
  useEffect(() => {
    if (renderTime.current > 0 && !activeSession) {
      onBackButtonClick();
    }
    renderTime.current += 1;
  });
  useEffect(() => {
    setActiveSessionId(sessionId);
  }, []);
  if (!activeSession) {
    // or using skeleton screen here
    return null;
  }
  return (
    <CallCtrlPanel
      sessionId={sessionId}
      currentLocale={currentLocale}
      fallBackName={fallBackName}
      phoneNumber={phoneNumber}
      onMute={onMute}
      onUnmute={onUnmute}
      onHold={onHold}
      onUnhold={onUnhold}
      onHangup={onHangup}
      onTransfer={onTransfer}
      showBackButton
      backButtonLabel={i18n.getString('allCalls', currentLocale)}
      onBackButtonClick={onBackButtonClick}
      formatPhone={formatPhone}
      areaCode={areaCode}
      countryCode={countryCode}
      selectedMatcherIndex={selectedMatcherIndex}
      layout={callCtrlLayouts.normalCtrl}
      startTime={activeSession.startTime}
      actions={actions}
      isOnMute={activeSession.isOnMute}
      isOnHold={activeSession.isOnHold}
      nameMatches={nameMatches}
      onSelectMatcherName={onSelectMatcherName}
      brand={brandName}
      showContactDisplayPlaceholder={showContactDisplayPlaceholder}
      controlBusy={controlBusy}
    />
  );
};

SimpleCallControlPanel.defaultProps = {
  setActiveSessionId() {},
  currentLocale: 'en-US',
  activeSession: null,
  sessionId: null,
  nameMatches: [],
  fallBackName: '',
  phoneNumber: '',
  showContactDisplayPlaceholder: false,
  controlBusy: false,
  actions: [
    ACTIONS_CTRL_MAP.muteCtrl,
    ACTIONS_CTRL_MAP.transferCtrl,
    ACTIONS_CTRL_MAP.holdCtrl,
  ],
};

export { SimpleCallControlPanel };
