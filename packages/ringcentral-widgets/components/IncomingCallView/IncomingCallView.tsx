import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { useMountState } from '@ringcentral/juno';
import type { FunctionComponent } from 'react';
import React, { useEffect, useState } from 'react';

import IncomingCallPanel from '../IncomingCallPanel';

import i18n from './i18n';

export type IncomingCallViewProps = {
  session: {
    id?: string;
    direction?: string;
    startTime?: number;
    isOnMute?: boolean;
    isOnHold?: boolean;
    isOnRecord?: boolean;
    to?: string;
    from?: string;
    contactMatch?: object;
    minimized?: boolean;
    callQueueName?: any;
  };
  showCallQueueName?: any;
  currentLocale: string;
  toggleMinimized: (...args: any[]) => any;
  answer: (...args: any[]) => any;
  reject: (...args: any[]) => any;
  onForward: (...args: any[]) => any;
  toVoiceMail: (...args: any[]) => any;
  replyWithMessage: (...args: any[]) => any;
  formatPhone: (...args: any[]) => any;
  nameMatches: any[];
  areaCode: string;
  countryCode: string;
  getAvatarUrl: (...args: any[]) => any;
  forwardingNumbers: any[];
  updateSessionMatchedContact: (...args: any[]) => any;
  showContactDisplayPlaceholder: boolean;
  brand: string;
  activeSessionId?: string;
  sourceIcons?: object;
  hangup: (...args: any[]) => any;
  onHold: (...args: any[]) => any;
  searchContactList: any[];
  searchContact: (...args: any[]) => any;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  phoneNumber: string;
  callerIdName: string | null | undefined;
};
export const IncomingCallView: FunctionComponent<IncomingCallViewProps> = (
  props,
) => {
  const {
    currentLocale,
    nameMatches = [],
    phoneNumber,
    formatPhone,
    areaCode,
    countryCode,
    forwardingNumbers,
    brand,
    showContactDisplayPlaceholder,
    sourceIcons,
    searchContact,
    searchContactList,
    children,
    session,
    activeSessionId,
    showCallQueueName,
    reject: rejectProp,
    toVoiceMail: toVoiceMailProp,
    replyWithMessage: replyWithMessageProp,
    toggleMinimized: toggleMinimizedProp,
    hangup: hangupProp,
    answer: answerProp,
    onHold: onHoldProp,
    onForward: onForwardProp,
    getAvatarUrl,
    updateSessionMatchedContact,
    phoneTypeRenderer,
    phoneSourceNameRenderer,
    callerIdName,
  } = props;
  const [selectedMatcherIndex, setSelectedMatcherIndex] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const { current: mounted } = useMountState();

  const hasOtherActiveCall = !!activeSessionId;
  const answer = () => answerProp(session.id);
  const reject = () => rejectProp(session.id);
  const toVoiceMail = () => toVoiceMailProp(session.id);
  const replyWithMessage = (message: string) =>
    replyWithMessageProp(session.id, message);

  const toggleMinimized = () => toggleMinimizedProp(session.id);
  const answerAndEnd = async () => {
    await hangupProp(activeSessionId);
    await answerProp(session.id);
  };

  const answerAndHold = async () => {
    await onHoldProp(activeSessionId);
    await answerProp(session.id);
  };

  const onForward = (forwardNumber: string) =>
    onForwardProp(session.id, forwardNumber);

  const updateAvatarUrl = async (contact: any) => {
    avatarUrl && setAvatarUrl(null);

    if (contact) {
      const avatarUrl = await getAvatarUrl(contact);
      // prevent memory leak issue when component unmounted
      if (!mounted) return;

      setAvatarUrl(avatarUrl);
    }
  };

  const getSelectedMatcherItem = (currContact: any | undefined) => {
    let index = nameMatches.findIndex((match) => match.id === currContact?.id);

    if (index < 0) index = 0;

    if (index !== selectedMatcherIndex) {
      setSelectedMatcherIndex(index);
    }

    return nameMatches[index];
  };

  const handleSelectMatcherName = (currContact: any) => {
    const contact = getSelectedMatcherItem(currContact);

    if (contact) {
      updateAvatarUrl(contact);

      updateSessionMatchedContact(session.id, contact);
    }
  };

  useEffect(() => {
    const contact = getSelectedMatcherItem(
      session.contactMatch ||
        // zero index maybe null
        nameMatches?.[0],
    );

    updateAvatarUrl(contact);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.id]);

  const active = !!session.id;
  if (!active || session.minimized) {
    return null;
  }

  let fallbackUserName: string | undefined;
  if (
    session.direction === callDirections.inbound &&
    session.from === 'anonymous'
  ) {
    fallbackUserName = i18n.getString('anonymous', currentLocale);
  }
  if (!fallbackUserName) {
    fallbackUserName = i18n.getString('unknown', currentLocale);
  }

  return (
    <IncomingCallPanel
      currentLocale={currentLocale}
      nameMatches={nameMatches}
      callerIdName={callerIdName}
      fallBackName={fallbackUserName}
      callQueueName={showCallQueueName ? session.callQueueName : null}
      phoneNumber={phoneNumber}
      answer={answer}
      reject={reject}
      replyWithMessage={replyWithMessage}
      toVoiceMail={toVoiceMail}
      formatPhone={formatPhone}
      areaCode={areaCode}
      countryCode={countryCode}
      selectedMatcherIndex={selectedMatcherIndex}
      onSelectMatcherName={handleSelectMatcherName}
      avatarUrl={avatarUrl}
      onBackButtonClick={toggleMinimized}
      forwardingNumbers={forwardingNumbers}
      onForward={onForward}
      brand={brand}
      showContactDisplayPlaceholder={showContactDisplayPlaceholder}
      hasOtherActiveCall={hasOtherActiveCall}
      answerAndEnd={answerAndEnd}
      answerAndHold={answerAndHold}
      sessionId={session.id}
      sourceIcons={sourceIcons}
      searchContact={searchContact}
      searchContactList={searchContactList}
      phoneTypeRenderer={phoneTypeRenderer}
      phoneSourceNameRenderer={phoneSourceNameRenderer}
    >
      {children}
    </IncomingCallPanel>
  );
};
