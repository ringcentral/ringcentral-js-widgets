import React from 'react';

import classnames from 'classnames';

import ActiveCallItem from '../ActiveCallItem';
import { ActiveCallItem as ActiveCallItemV2 } from '../ActiveCallItemV2';
import styles from './styles.scss';

function isConferenceCall(normalizedCall) {
  return (
    normalizedCall &&
    normalizedCall.to &&
    Array.isArray(normalizedCall.to.phoneNumber) &&
    normalizedCall.to.phoneNumber.length === 0 &&
    normalizedCall.toName === 'Conference'
  );
}
type ActiveCallListProps = {
  currentLocale: string;
  className?: string;
  title: string;
  calls: any[];
  areaCode: string;
  countryCode: string;
  brand?: string;
  showContactDisplayPlaceholder?: boolean;
  formatPhone: (...args: any[]) => any;
  onClickToSms?: (...args: any[]) => any;
  onCreateContact?: (...args: any[]) => any;
  onViewContact?: (...args: any[]) => any;
  outboundSmsPermission?: boolean;
  internalSmsPermission?: boolean;
  isLoggedContact?: (...args: any[]) => any;
  onLogCall?: (...args: any[]) => any;
  loggingMap?: object;
  webphoneAnswer?: (...args: any[]) => any;
  webphoneReject?: (...args: any[]) => any;
  webphoneHangup?: (...args: any[]) => any;
  webphoneResume?: (...args: any[]) => any;
  webphoneToVoicemail?: (...args: any[]) => any;
  webphoneSwitchCall?: (...args: any[]) => any;
  webphoneIgnore?: (...args: any[]) => any;
  modalConfirm?: (...args: any[]) => any;
  modalClose?: (...args: any[]) => any;
  enableContactFallback?: boolean;
  autoLog?: boolean;
  sourceIcons?: object;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  isSessionAConferenceCall?: (...args: any[]) => any;
  useV2?: boolean;
  onCallItemClick?: (...args: any[]) => any;
  showAvatar?: boolean;
  getAvatarUrl?: (...args: any[]) => any;
  conferenceCallParties?: object[];
  webphoneHold?: (...args: any[]) => any;
  showCallDetail?: boolean;
  updateSessionMatchedContact?: (...args: any[]) => any;
  renderExtraButton?: (...args: any[]) => any;
  renderContactName?: (...args: any[]) => any;
  renderSubContactName?: (...args: any[]) => any;
  ringoutHangup?: (...args: any[]) => any;
  ringoutTransfer?: (...args: any[]) => any;
  ringoutReject?: (...args: any[]) => any;
  disableLinks?: boolean;
  showRingoutCallControl?: boolean;
  showMultipleMatch?: boolean;
  showSwitchCall?: boolean;
  showTransferCall?: boolean;
  showHoldOnOtherDevice?: boolean;
  isOnHold?: (...args: any[]) => any;
  showIgnoreBtn?: boolean;
  showHoldAnswerBtn?: boolean;
  useCallDetailV2?: boolean;
  newCallIcon?: boolean;
  clickSwitchTrack?: (...args: any[]) => any;
  isWide?: boolean;
};
const ActiveCallList: React.SFC<ActiveCallListProps> = ({
  calls,
  className,
  currentLocale,
  areaCode,
  countryCode,
  brand,
  showContactDisplayPlaceholder,
  formatPhone,
  onClickToSms,
  onCreateContact,
  onViewContact,
  outboundSmsPermission,
  internalSmsPermission,
  isLoggedContact,
  onLogCall,
  autoLog,
  loggingMap,
  webphoneAnswer,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
  webphoneToVoicemail,
  webphoneSwitchCall,
  modalConfirm,
  modalClose,
  enableContactFallback,
  title,
  sourceIcons,
  phoneTypeRenderer,
  phoneSourceNameRenderer,
  isSessionAConferenceCall,
  onCallItemClick,
  showAvatar,
  getAvatarUrl,
  conferenceCallParties,
  useV2, // TODO: For compatibility, after replacing all ActiveCallItem with ActiveCallItemV2, we should remove this.
  webphoneHold,
  showCallDetail,
  updateSessionMatchedContact,
  renderExtraButton,
  renderContactName,
  renderSubContactName,
  ringoutHangup,
  ringoutTransfer,
  ringoutReject,
  disableLinks,
  showRingoutCallControl,
  showSwitchCall,
  showTransferCall,
  showHoldOnOtherDevice,
  isOnHold,
  webphoneIgnore,
  showIgnoreBtn,
  showHoldAnswerBtn,
  useCallDetailV2,
  newCallIcon,
  clickSwitchTrack,
  showMultipleMatch,
  isWide,
}) => {
  if (!calls.length) {
    return null;
  }
  // if you are using call control SDK for webphone operation, then require to use ActiveCallItem v2
  const Component = useV2 ? ActiveCallItemV2 : ActiveCallItem;
  return (
    <div className={classnames(styles.list, className)} data-sign="callList">
      <div
        className={styles.listTitle}
        style={{
          marginBottom: useV2 && title ? '-5px' : null,
        }}
        title={title}
        data-sign="listTitle"
      >
        {title}
      </div>
      {calls.map((call) => {
        const isOnConferenceCall = call.webphoneSession
          ? isSessionAConferenceCall(call.webphoneSession.id)
          : isConferenceCall(call); // in case it's an other device call
        return (
          <Component
            call={call}
            key={call.id}
            isOnConferenceCall={isOnConferenceCall}
            currentLocale={currentLocale}
            areaCode={areaCode}
            countryCode={countryCode}
            brand={brand}
            showContactDisplayPlaceholder={showContactDisplayPlaceholder}
            formatPhone={formatPhone}
            onClickToSms={onClickToSms}
            internalSmsPermission={internalSmsPermission}
            outboundSmsPermission={outboundSmsPermission}
            isLoggedContact={isLoggedContact}
            onLogCall={onLogCall}
            onViewContact={onViewContact}
            onCreateContact={onCreateContact}
            loggingMap={loggingMap}
            webphoneAnswer={webphoneAnswer}
            webphoneReject={webphoneReject}
            webphoneHangup={webphoneHangup}
            webphoneResume={webphoneResume}
            webphoneToVoicemail={webphoneToVoicemail}
            webphoneSwitchCall={webphoneSwitchCall}
            modalConfirm={modalConfirm}
            modalClose={modalClose}
            enableContactFallback={enableContactFallback}
            autoLog={autoLog}
            sourceIcons={sourceIcons}
            phoneTypeRenderer={phoneTypeRenderer}
            phoneSourceNameRenderer={phoneSourceNameRenderer}
            hasActionMenu={!isOnConferenceCall}
            onClick={() => onCallItemClick(call)}
            showAvatar={showAvatar}
            getAvatarUrl={getAvatarUrl}
            conferenceCallParties={conferenceCallParties}
            webphoneHold={webphoneHold}
            showCallDetail={showCallDetail}
            updateSessionMatchedContact={updateSessionMatchedContact}
            renderExtraButton={renderExtraButton}
            renderContactName={renderContactName}
            renderSubContactName={renderSubContactName}
            ringoutHangup={ringoutHangup}
            ringoutTransfer={ringoutTransfer}
            ringoutReject={ringoutReject}
            disableLinks={disableLinks}
            showRingoutCallControl={showRingoutCallControl}
            showMultipleMatch={!showRingoutCallControl && showMultipleMatch} // disabled for salesforce
            showSwitchCall={showSwitchCall}
            showTransferCall={showTransferCall}
            showHoldOnOtherDevice={showHoldOnOtherDevice}
            isOnHold={isOnHold}
            webphoneIgnore={webphoneIgnore}
            showIgnoreBtn={showIgnoreBtn}
            showHoldAnswerBtn={showHoldAnswerBtn}
            useCallDetailV2={useCallDetailV2}
            newCallIcon={newCallIcon}
            clickSwitchTrack={clickSwitchTrack}
            isWide={isWide}
          />
        );
      })}
    </div>
  );
};
ActiveCallList.defaultProps = {
  isWide: true,
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onLogCall: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  onViewContact: undefined,
  webphoneToVoicemail: undefined,
  webphoneSwitchCall: undefined,
  webphoneIgnore: undefined,
  modalConfirm: undefined,
  modalClose: undefined,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  isSessionAConferenceCall: () => false,
  useV2: false,
  onCallItemClick: (i) => i,
  showAvatar: true,
  getAvatarUrl: undefined,
  conferenceCallParties: [],
  webphoneHold: (i) => i,
  showCallDetail: false,
  updateSessionMatchedContact: (i) => i,
  renderExtraButton: undefined,
  renderContactName: undefined,
  renderSubContactName: undefined,
  ringoutHangup: undefined,
  ringoutTransfer: undefined,
  ringoutReject: undefined,
  disableLinks: false,
  showRingoutCallControl: false,
  showMultipleMatch: true,
  showSwitchCall: false,
  showTransferCall: true,
  showHoldOnOtherDevice: false,
  isOnHold: undefined,
  showIgnoreBtn: false,
  showHoldAnswerBtn: false,
  useCallDetailV2: false,
  newCallIcon: false,
  clickSwitchTrack() {},
};
export default ActiveCallList;
