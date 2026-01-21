import { callResults } from '@ringcentral-integration/commons/enums/callResults';
import type { Call as ICall } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import {
  isInbound as isInboundCall,
  isMissed as isMissedCall,
} from '@ringcentral-integration/commons/lib/callLogHelpers';
import { formatDurationWithLocale } from '@ringcentral-integration/commons/lib/formatDuration';
import {
  messageIsFax,
  messageIsTextMessage,
  messageIsVoicemail,
} from '@ringcentral-integration/commons/lib/messageHelper';
import { useFormattedPhoneNumberFn } from '@ringcentral-integration/micro-auth/src/app/components';
import { ContactAvatar } from '@ringcentral-integration/micro-contacts/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import type {
  CorrespondentMatch,
  FormattedConversation,
} from '@ringcentral-integration/micro-message/src/app/services';
import {
  getDetail,
  getIconInfo,
} from '@ringcentral-integration/micro-message/src/app/views/ConversationsViewSpring/ConversationsPage/ConversationsListItem/helpers';
import { useContainer } from '@ringcentral-integration/next-core';
import { DurationCounter } from '@ringcentral-integration/widgets/components/DurationCounter';
import {
  ActiveCallMd,
  DelegatedCallsMd,
  InfoMd,
  IncomingCallMd,
  MeetingMd,
  MissedCallMd,
  MobileMd,
  OutgoingCallMd,
  SmartNotesMd,
} from '@ringcentral/spring-icon';
import {
  type AvatarProps,
  Badge,
  type BadgeProps,
  Icon,
  Tag,
  type TagProps,
  Tooltip,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import {
  getDisplayCallQueueName,
  isHoldingCall,
  isOtherDeviceCall,
  isQueueCall,
  isRingingCall,
} from '../../services/ActiveCallControl/helpers';
import {
  type HistoryCall,
  isQueueHistoryCall,
} from '../../services/CallHistory';

import {
  ContactDisplayRender,
  ContactDisplayRenderProps,
  LogInfo,
  useFormatExtOrPhoneNumber,
  useGetContactDisplayTextFn,
} from './components';
import { ContactAvatarByRenderInfo } from './components/ContactAvatarByRenderInfo';
import i18n from './i18n';
import {
  type ContactDisplayInfo,
  copyWithResultMessage,
  getContactDisplayInfo,
  GetContactDisplayInfoOptions,
  useFormattedDateFromNow,
} from './utils';

type EntityOrCorrespondentMatch = Entity | CorrespondentMatch;

export type ContactRendererOptions = {
  onSelectContact?: (
    data:
      | {
          type: 'conversation';
          source: FormattedConversation;
          entity: EntityOrCorrespondentMatch;
        }
      // TODO: rest of types still not implement
      | {
          type: 'call';
          source: ICall;
          entity: EntityOrCorrespondentMatch;
        }
      | {
          type: 'callHistory';
          source: HistoryCall;
          entity: EntityOrCorrespondentMatch;
        },
  ) => void;
  getDisplayedSelectedEntity?: (
    selection: EntityOrCorrespondentMatch[],
    conversationId?: string,
  ) => EntityOrCorrespondentMatch | undefined;
  getDefaultCrmMatch?: (
    matches: Array<EntityOrCorrespondentMatch>,
  ) => EntityOrCorrespondentMatch | undefined;
};

export const useContactRenderInfoFromCall = (
  call: ICall,
  options: {
    hideBlockedFromInfo?: boolean;
  } & Pick<GetContactDisplayInfoOptions<any>, 'phoneNumberDisplayMode'> = {},
) => {
  const { t } = useLocale(i18n);

  const contactRendererOptions = useContainer<ContactRendererOptions, true>(
    'ContactRendererOptions',
  );

  const isQueue = isQueueCall(call);
  const callQueueName = getDisplayCallQueueName(call);
  const callFrom = call.from || {};
  const callTo = call.to || {};
  const { direction, webphoneSession, startTime, offset } = call;
  const isInbound = isInboundCall(call);
  const ringing = isRingingCall(call);
  const otherDevice = isOtherDeviceCall(call);
  const holding = isHoldingCall(call);
  const controllable = !!webphoneSession;
  const { phoneNumberDisplayMode = 'phoneNumber' } = options;

  const extensionNumber = isInbound
    ? callFrom.extensionNumber
    : callTo.extensionNumber;

  const phoneNumber = isInbound ? callFrom.phoneNumber : callTo.phoneNumber;
  const matches = isInbound ? call.fromMatches : call.toMatches;

  // const activeCallControlCallerIdName = isInbound ? callFrom.name : callTo.name;

  // active call control api return the wrong data during the call process in XMN-up, so we use webphone data only for webphone call, not have correct callerIdName, so we use the webphone data
  const callerId = isInbound
    ? webphoneSession?.fromUserName
    : webphoneSession?.toUserName;

  const callSelectionInfo = call.callSelectionInfo;

  const renderInfo = getContactDisplayInfo({
    callerId,
    queueName: callQueueName,
    matches,
    phoneNumber,
    extensionNumber,
    phoneNumberDisplayMode,
    displaySelection: callSelectionInfo?.displayedSelection,
    selections: callSelectionInfo?.selections,
    getDefaultCrmMatch: contactRendererOptions?.getDefaultCrmMatch,
  });
  const getContactDisplayTextFn = useGetContactDisplayTextFn();

  // TODO: the conference view able still not support
  const conferenceParticipantsInfoFnList = useMemo(
    () =>
      call.conferenceParticipants?.map(
        (conferenceParticipant, index) =>
          ({
            phoneNumberDisplayMode,
          }: Pick<
            GetContactDisplayInfoOptions<any>,
            'phoneNumberDisplayMode'
          > = {}) => {
            const participantQueueName = conferenceParticipant.queueName;
            const participantRenderInfo = getContactDisplayInfo({
              // active call control api return the wrong data during the call process in XMN-up, so we use webphone data only for webphone call, not have correct callerIdName, so we use the webphone data
              // conferenceParticipant.info.name,
              callerId: undefined,
              queueName: callQueueName,
              phoneNumber: conferenceParticipant.info.phoneNumber,
              extensionNumber: conferenceParticipant.info.extensionNumber,
              matches: call.conferenceParticipantsMatchesList?.[index],
              phoneNumberDisplayMode,
            });
            const participantBeQueue = Boolean(
              participantQueueName ||
                participantRenderInfo.matchedContact?.isCallQueueNumber,
            );

            const Avatar = ({ size }: Pick<AvatarProps, 'size'>) => (
              <ContactAvatarByRenderInfo
                isQueue={participantBeQueue}
                isConferenceCall={false}
                renderInfo={participantRenderInfo}
                size={size}
              />
            );

            return {
              data: conferenceParticipant,
              renderInfo: participantRenderInfo,
              result: (
                <ContactDisplayRender
                  info={participantRenderInfo}
                  callQueueName={participantQueueName}
                  // TODO: conference call display control not implemented
                  // displayControl={{
                  //   viewable: false,
                  // }}
                />
              ),
              /**
               * plain text display name
               */
              displayName: getContactDisplayTextFn({
                renderInfo: participantRenderInfo,
                callQueueName: participantQueueName,
              }) as string,
              Avatar,
            };
          },
      ),
    [call, callQueueName, getContactDisplayTextFn],
  );

  const isConferenceCall = Boolean(call.isConferenceCall);

  const fromInfo = useFormatExtOrPhoneNumber(callFrom);
  const fromInfoHideBlocked = useFormatExtOrPhoneNumber(callFrom, true);
  const toInfo = useFormatExtOrPhoneNumber(callTo);

  const callStatusText = useMemo(() => {
    if (ringing) return t('Inbound');
    if (holding) return t('onHold');

    return t('activeCall');
  }, [holding, ringing, t]);

  const CallStatus = useCallback<FunctionComponent>(
    ({ children }) => (
      <div
        className={clsx(
          ringing && 'text-success-f',
          holding && 'text-warning-high-contrast',
          !ringing && !holding && 'text-danger-f',
        )}
      >
        <span className="mr-1">{callStatusText}</span>

        {children}
      </div>
    ),
    [ringing, holding, callStatusText],
  );

  const OnOtherDevice = useCallback<
    FunctionComponent<
      {
        /**
         * @default 'text'
         */
        mode?: 'icon' | 'text';
      } & TagProps
    >
  >(
    ({ mode = 'text', ...rest }) => {
      if (mode === 'icon')
        return (
          <Tooltip title={t('otherDevice')} placement="top">
            <Icon data-sign="onOtherDevice" symbol={MobileMd} size="small" />
          </Tooltip>
        );

      return (
        <Tag
          data-sign="onOtherDevice"
          color="neutral"
          variant="inverted"
          {...rest}
        >
          {t('otherDevice')}
        </Tag>
      );
    },
    [t],
  );

  const Avatar = useCallback(
    ({ size }: Pick<AvatarProps, 'size'>) => (
      <ContactAvatarByRenderInfo
        isQueue={isQueue}
        isConferenceCall={isConferenceCall}
        renderInfo={renderInfo}
        size={size}
      />
    ),
    [isConferenceCall, renderInfo, isQueue],
  );

  return {
    DisplayName: (props: Pick<ContactDisplayRenderProps, 'displayControl'>) => {
      if (isConferenceCall) {
        const text = conferenceParticipantsInfoFnList
          ?.map((fn) =>
            // the conference call participant show the phone number for group name
            fn({ phoneNumberDisplayMode: 'phoneNumber' }),
          )
          .filter((x) => !x.data.isHost)
          .map((x) => x.displayName)
          .join(', ');
        // TODO: the conference view able still not support
        return (
          <span title={text} className="truncate">
            {text}
          </span>
        );
      }

      return (
        <ContactDisplayRender
          info={renderInfo}
          callQueueName={callQueueName}
          {...props}
        />
      );
    },
    displayPhoneNumber: isInbound
      ? options?.hideBlockedFromInfo
        ? fromInfoHideBlocked
        : fromInfo
      : toInfo,
    Avatar,
    myCallerId: isInbound ? toInfo : fromInfo,
    duration: <DurationCounter startTime={startTime} offset={offset} />,
    CallStatus,
    OnOtherDevice: otherDevice ? OnOtherDevice : null,
    // basic info
    direction,
    isInbound,
    ringing,
    holding,
    controllable,
    conferenceParticipantsInfoFnList,
    callQueueName,
  };
};

export const useContactRenderInfoFromCallHistory = (
  currentCallLog: HistoryCall,
  {
    startTimeMode = 'withTime',
    hideBlockedFromInfo = false,
    showLogInfo = false,
    phoneNumberDisplayMode = 'unknown',
    delaySavingState,
    DelayComponent,
  }: {
    /**
     * how to display the startTime
     *
     * @default 'withTime'
     */
    startTimeMode?: 'withoutTime' | 'withTime';
    /**
     * hide blocked number from info
     *
     * @default false
     */
    hideBlockedFromInfo?: boolean;
    /**
     * should show log status info
     *
     * @default false
     */
    showLogInfo?: boolean;
    // TODO: should move out of here, should update in the usage place of component instead
    /**
     * delay saving state for the current call
     */
    delaySavingState?: {
      delayUpdatingStartTime: number;
      delayUpdatingMinutes: number;
    } | null;
    /**
     * custom component to render the delay countdown
     */
    DelayComponent?: React.ComponentType<{
      startTime: number;
      durationMinutes: number;
    }>;
  } & Pick<GetContactDisplayInfoOptions<any>, 'phoneNumberDisplayMode'> = {},
) => {
  const { t } = useLocale(i18n);
  const formattedPhoneNumberFn = useFormattedPhoneNumberFn();

  const contactRendererOptions = useContainer<ContactRendererOptions, true>(
    'ContactRendererOptions',
  );

  const result = currentCallLog.result;

  const direction = currentCallLog.direction;
  const isInbound = currentCallLog && isInboundCall(currentCallLog);
  const isMissed =
    isInbound &&
    currentCallLog &&
    isMissedCall({ result: currentCallLog.result });
  const startTime = useFormattedDateFromNow(
    currentCallLog.startTime,
    startTimeMode,
  );

  const duration = useMemo(
    () =>
      formatDurationWithLocale(currentCallLog.duration, {
        day: t('day'),
        hr: t('hr'),
        min: t('min'),
        sec: t('sec'),
      }),
    [currentCallLog.duration, t],
  );

  const ringingElsewhere = (result as any) === callResults.ringingElsewhere;
  // TODO: maybe need upgrade `@rc-ex/core`
  const queueCallDisplayMode =
    (result as any) === callResults.answeredElsewhere || ringingElsewhere;

  const answeredByDelegate = currentCallLog.delegate;
  const hasAiNotes = currentCallLog.hasSmartNote;

  const Status = useCallback<
    FunctionComponent<{
      /**
       * @default 'text'
       */
      mode?: 'icon' | 'text';
    }>
  >(
    ({ mode = 'text' }) => {
      if (!result || !direction) return null;

      const queueCallRender = () => {
        const answeredByText = answeredByDelegate
          ? `${t('answeredBy')} ${answeredByDelegate?.name}`
          : undefined;

        const queueCallDisplayModeNode = answeredByDelegate ? (
          <span
            className="truncate"
            data-sign="answered-by"
            title={answeredByText}
          >
            {answeredByText}
          </span>
        ) : (
          <span>{t(result)}</span>
        );

        return queueCallDisplayModeNode;
      };

      if (mode === 'text') {
        if (queueCallDisplayMode) {
          return queueCallRender();
        }

        const displayDuration = duration ? `(${duration})` : '';
        return (
          <span
            className={isMissed ? 'text-danger-f' : 'text-success-f'}
            data-sign="callDetailInfoResult"
          >
            {isMissed ? t('Missed') : `${t(direction)} ${displayDuration}`}
          </span>
        );
      }

      if (queueCallDisplayMode) {
        return (
          <div className="flex gap-1 items-center pt-0.5" data-sign={result}>
            <Icon
              size="small"
              data-sign={
                answeredByDelegate ? 'delegate-icon' : 'active-call-icon'
              }
              symbol={answeredByDelegate ? DelegatedCallsMd : ActiveCallMd}
            />
            {queueCallRender()}
          </div>
        );
      }

      return (
        <div
          className={clsx(
            'flex gap-1 items-center pt-0.5',
            isMissed && 'text-danger',
          )}
          data-sign={`status-${isMissed ? 'missed' : direction.toLowerCase()}`}
        >
          <Icon
            size="small"
            data-sign={
              isMissed
                ? 'missed-icon'
                : isInbound
                ? 'incoming-icon'
                : 'outgoing-icon'
            }
            symbol={
              isMissed
                ? MissedCallMd
                : isInbound
                ? IncomingCallMd
                : OutgoingCallMd
            }
            className={isMissed ? 'text-inherit' : undefined}
          />
          <span data-sign="duration">{isMissed ? t('Missed') : duration}</span>
          {hasAiNotes && (
            <>
              <Icon size="small" symbol={SmartNotesMd} />
              <span data-sign="aiNote">{t('notes')}</span>
            </>
          )}
        </div>
      );
    },
    [
      queueCallDisplayMode,
      answeredByDelegate,
      direction,
      duration,
      hasAiNotes,
      isInbound,
      isMissed,
      result,
      t,
    ],
  );

  const isQueue = isQueueHistoryCall(currentCallLog);
  const callQueueName = getDisplayCallQueueName(currentCallLog);

  const callFrom = currentCallLog.from || {};
  const callTo = currentCallLog.to || {};

  const signalSourceInfo = isInbound ? callFrom : callTo;
  const phoneNumber = signalSourceInfo.phoneNumber;
  const extensionNumber = isInbound
    ? callFrom.extensionNumber
    : callTo.extensionNumber;

  const matches = isInbound
    ? currentCallLog.fromMatches
    : currentCallLog.toMatches;
  const serverName = isInbound ? callFrom.name : callTo.name;
  const callSelectionInfo = currentCallLog.callSelectionInfo;

  const renderInfo = getContactDisplayInfo({
    serverName,
    queueName: callQueueName,
    matches,
    phoneNumber,
    extensionNumber,
    phoneNumberDisplayMode,
    displaySelection: callSelectionInfo?.displayedSelection,
    selections: callSelectionInfo?.selections,
    getDefaultCrmMatch: contactRendererOptions?.getDefaultCrmMatch,
  });

  const isConferenceCall = Boolean(currentCallLog.isConferenceCall);

  const fromInfo = useFormatExtOrPhoneNumber(callFrom);
  const fromInfoHideBlocked = useFormatExtOrPhoneNumber(
    callFrom,
    hideBlockedFromInfo,
  );
  const toInfo = useFormatExtOrPhoneNumber(callTo);

  const isLogged = currentCallLog.isLogged;
  const formattedPhoneNumber = renderInfo.dialToPhoneNumber
    ? formattedPhoneNumberFn(renderInfo.dialToPhoneNumber)
    : '';

  const Avatar = useCallback(
    ({ size }: Pick<AvatarProps, 'size'>) => (
      <ContactAvatarByRenderInfo
        isConferenceCall={isConferenceCall}
        isQueue={isQueue}
        renderInfo={renderInfo}
        size={size}
      />
    ),
    [isConferenceCall, isQueue, renderInfo],
  );

  const copyNumber = () => {
    return copyWithResultMessage(formattedPhoneNumber);
  };

  /**
   * get info when want to call the entity or send message to the entity
   */
  const getActionInfo = () => {
    const matchedContact = renderInfo.matchedContact as Entity;
    if (matchedContact?.name) {
      return {
        phoneNumber: formattedPhoneNumber,
        name: matchedContact.name,
        type: matchedContact.type,
      };
    }

    if (formattedPhoneNumber) {
      return {
        phoneNumber: formattedPhoneNumber,
      };
    }

    return undefined;
  };

  return {
    DisplayName: (props: Pick<ContactDisplayRenderProps, 'displayControl'>) => {
      // in call history be conference call, we show that be conference call
      if (isConferenceCall) return <span>{t('conferenceCall')}</span>;

      return (
        <ContactDisplayRender
          info={renderInfo}
          callQueueName={callQueueName}
          isMissed={isMissed}
          {...props}
        />
      );
    },
    displayPhoneNumber: isInbound
      ? hideBlockedFromInfo
        ? fromInfoHideBlocked
        : fromInfo
      : toInfo,
    Avatar,
    myCallerIdTitle: isInbound ? t('to') : t('from'),
    myCallerId: isInbound ? toInfo : fromInfo,
    startTime,
    duration,
    Status,
    callQueueName,
    isConferenceCall,
    // basic info
    isInbound,
    renderInfo,
    signalSourceInfo,
    formattedPhoneNumber,
    logged: showLogInfo ? (
      <LogInfo
        logged={isLogged}
        delaySavingState={delaySavingState}
        DelayComponent={DelayComponent}
      />
    ) : null,
    showViewLogIcon: Boolean(showLogInfo && isLogged),
    ringingElsewhere,
    answeredByDelegate,
    copyNumber,
    getActionInfo,
  };
};

export const useContactRenderInfoFromConversation = (
  conversation: FormattedConversation,
  {
    timePresentationMode = 'withTime',
    displayLogStatus = false,
    hasCrmLogged = false,
    phoneNumberDisplayMode = 'phoneNumber',
    isOptOut = false,
  }: {
    /**
     * how to display the startTime
     *
     * @default 'withTime'
     */
    timePresentationMode?: 'withoutTime' | 'withTime';
    displayLogStatus?: boolean;
    hasCrmLogged?: boolean;
    /**
     * for no matched contact but with/without server name display logic
     *
     * Currently, only in voicemail detail, display 'Unknown'
     * In other conversations list or detail, display the phone number directly
     */
    phoneNumberDisplayMode?: 'unknown' | 'phoneNumber';
    /**
     * whether the conversation is opted out
     *
     * @default false
     */
    isOptOut?: boolean;
  } = {},
) => {
  const { t } = useLocale(i18n);
  const formattedPhoneNumberFn = useFormattedPhoneNumberFn();

  const contactRendererOptions = useContainer<ContactRendererOptions, true>(
    'ContactRendererOptions',
  );

  const isInbound = isInboundCall(conversation);
  const isTextMessage = messageIsTextMessage(conversation);
  const isFax = messageIsFax(conversation);
  const isVoicemail = messageIsVoicemail(conversation);
  const markAble =
    // TODO: currently we not support mark text message, so we just mark voicemail and fax
    // the mark text message in jupiter that just mark the first message of the conversation
    // isTextMessage ||
    isVoicemail || (isFax && isInbound);
  const messageStatus = conversation.messageStatus;
  const faxAttachmentExist = Boolean(
    isFax &&
      (messageStatus === 'Sent' || messageStatus === 'Received') &&
      conversation.faxAttachment?.uri,
  );
  const voicemailAttachmentExist = Boolean(
    isVoicemail && conversation.voicemailAttachment?.uri,
  );

  const creationTime = useFormattedDateFromNow(
    conversation.creationTime,
    timePresentationMode,
  );

  const callFrom = conversation.from!;
  const callTo = conversation.to;
  const callSelf = conversation.self;

  const fromInfo = useFormatExtOrPhoneNumber(callFrom);
  const toInfo = useFormatExtOrPhoneNumber(callSelf);

  const {
    correspondents,
    lastMatchedCorrespondentEntity,
    conversationMatches,
    correspondentMatches,
    correspondentMatchesList,
  } = conversation;

  const singleCorrespondent = correspondents.length === 1;
  const multiMatchForSingleCorrespondent =
    singleCorrespondent &&
    correspondentMatchesList.length === 1 &&
    correspondentMatchesList[0].length > 1;

  const selectedIndex = useMemo(() => {
    // when not multi-match for singleCorrespondent, should select the first one
    if (!multiMatchForSingleCorrespondent) return 0;
    const correspondentMatchId =
      (lastMatchedCorrespondentEntity && lastMatchedCorrespondentEntity.id) ||
      (conversationMatches[0] && conversationMatches[0].id);
    if (correspondentMatchId) {
      const index = correspondentMatches.findIndex(
        (contact: any) => contact.id === correspondentMatchId,
      );
      if (index! > -1) return index;
    }
    // index return undefined means not selected yet
  }, [
    multiMatchForSingleCorrespondent,
    lastMatchedCorrespondentEntity,
    conversationMatches,
    correspondentMatches,
  ]);

  const { displayInfoList, correspondentsDisplayInfoMap } = useMemo(() => {
    if (!correspondents.length) {
      // some record like block number will not have correspondents or from/to data
      return {
        displayInfoList: [
          getContactDisplayInfo({
            queueName: undefined,
            phoneNumber: undefined,
            extensionNumber: undefined,
            matches: [],
            phoneNumberDisplayMode,
            getDefaultCrmMatch: contactRendererOptions?.getDefaultCrmMatch,
          }),
        ],
      };
    }

    const correspondentsDisplayInfoMap = new Map<string, ContactDisplayInfo>();

    const displayInfoList = correspondents.map((correspondent, index) => {
      const isMultipleCorrespondent = !singleCorrespondent;
      const nonSupportSelectionType =
        isFax || isVoicemail || isMultipleCorrespondent;

      const renderInfo = getContactDisplayInfo({
        serverName: correspondent.name,
        queueName: undefined,
        phoneNumber: correspondent.phoneNumber,
        extensionNumber: correspondent.extensionNumber,
        matches: correspondentMatchesList[index],
        displaySelection: contactRendererOptions?.getDisplayedSelectedEntity
          ? contactRendererOptions?.getDisplayedSelectedEntity(
              conversationMatches,
              conversation.conversationId,
            )
          : selectedIndex
          ? correspondentMatchesList[index][selectedIndex]
          : undefined,
        selections: nonSupportSelectionType ? undefined : conversationMatches,
        // TODO: support the multiple match display in multiple correspondents scenario
        alwaysShowFirstMatch: isMultipleCorrespondent,
        phoneNumberDisplayMode,
        getDefaultCrmMatch: contactRendererOptions?.getDefaultCrmMatch,
      });

      if (renderInfo.dialToPhoneNumber) {
        correspondentsDisplayInfoMap.set(
          renderInfo.dialToPhoneNumber,
          renderInfo,
        );
      }

      return renderInfo;
    });

    return { displayInfoList, correspondentsDisplayInfoMap };
  }, [
    correspondents,
    phoneNumberDisplayMode,
    contactRendererOptions,
    singleCorrespondent,
    isFax,
    isVoicemail,
    correspondentMatchesList,
    conversationMatches,
    conversation.conversationId,
    selectedIndex,
  ]);

  const detail = getDetail(conversation);
  const { icon } = getIconInfo(conversation);
  const displayDescription = (
    <div className={clsx('flex items-center gap-1')} data-sign="summary">
      {isOptOut ? (
        <>
          <Tooltip title={t('optOutAlertTooltip')}>
            <Icon symbol={InfoMd} className="text-warning-f" size="small" />
          </Tooltip>
          <span className="truncate" title={t('optedOut')}>
            {t('optedOut')}
          </span>
        </>
      ) : (
        <>
          <Icon size="small" symbol={icon} />
          <span className="truncate" title={detail}>
            {detail}
          </span>
        </>
      )}
    </div>
  );
  const unreadCounts = conversation.unreadCounts || 0;
  const signalTo =
    // when self fx, will not have to data
    !callTo || callTo.length === 1;

  // currently we only support one of contact able to select matchedContact, for multiple correspondents, we not show those related function
  // TODO: when support multiple contact select in one conversation, we need to change the logic
  const matchedContact = displayInfoList[0]?.matchedContact;

  const signalSourceInfo = useMemo(() => {
    if (signalTo) {
      return isInbound ? callFrom : callTo ? callTo[0] : undefined;
    }
    return undefined;
  }, [callFrom, callTo, isInbound, signalTo]);

  const displayName = displayInfoList
    .map((info) => {
      if (info.type === 'phoneNumber') {
        return formattedPhoneNumberFn(info.displayName);
      }
      return info.displayName;
    })
    .join(', ');

  const Avatar = useCallback(
    ({ size }: Pick<AvatarProps, 'size'>) =>
      signalTo ? (
        <ContactAvatar
          size={size}
          {...(matchedContact
            ? {
                contact: {
                  id: matchedContact.id!,
                  type: matchedContact.type!,
                },
                contactName: matchedContact.name,
                phoneNumber: matchedContact.phoneNumber,
              }
            : {
                contactName:
                  displayInfoList[0].type === 'callerIdName'
                    ? displayName
                    : undefined,
                phoneNumber: displayInfoList[0].dialToPhoneNumber,
              })}
        />
      ) : (
        <ContactAvatar size={size} symbol={MeetingMd} />
      ),
    [displayInfoList, displayName, matchedContact, signalTo],
  );

  const dialToPhoneNumber = signalTo
    ? displayInfoList[0].dialToPhoneNumber
    : undefined;

  const formattedPhoneNumber = dialToPhoneNumber
    ? formattedPhoneNumberFn(dialToPhoneNumber)
    : '';

  const copyNumber = () => {
    return copyWithResultMessage(formattedPhoneNumber);
  };

  /**
   * get info when want to call the entity or send message to the entity
   */
  const getActionInfo = () => {
    if (signalSourceInfo) {
      if (matchedContact?.name) {
        return {
          phoneNumber: formattedPhoneNumber,
          name: matchedContact.name,
          type: matchedContact.type,
        };
      }

      if (formattedPhoneNumber) {
        return {
          phoneNumber: formattedPhoneNumber,
        };
      }
    }

    return undefined;
  };

  return {
    DisplayName: (props: Pick<ContactDisplayRenderProps, 'displayControl'>) => {
      if (
        displayInfoList?.length > 1 ||
        displayInfoList[0].type === 'phoneNumber'
      ) {
        return (
          <div className="truncate self-stretch" title={displayName}>
            {displayName}
          </div>
        );
      }

      return <ContactDisplayRender info={displayInfoList[0]} {...props} />;
    },
    formattedPhoneNumber,
    correspondentsDisplayInfoMap,
    displayType: signalTo ? displayInfoList[0].type : 'multiple',
    displayDescription,
    Unread: (props: Omit<BadgeProps, 'count'>) =>
      unreadCounts > 0 ? (
        <Badge
          variant="contained"
          type="dot"
          size="medium"
          color="warning"
          count={unreadCounts}
          {...props}
        />
      ) : null,
    Avatar,
    creationTime,
    // basic info
    signalSourceInfo,
    matchedContact,
    isInbound,
    isTextMessage,
    isFax,
    isVoicemail,
    markAble,
    unreadCounts,
    faxAttachmentExist,
    faxAttachmentUri: faxAttachmentExist
      ? conversation.faxAttachment!.uri
      : undefined,
    faxAttachmentDownloadUri: faxAttachmentExist
      ? `${conversation.faxAttachment!.uri}&contentDisposition=Attachment`
      : undefined,
    voicemailAttachmentExist,
    voicemailAttachmentUri: voicemailAttachmentExist
      ? conversation.voicemailAttachment!.uri
      : undefined,
    signalTo,
    logged: displayLogStatus ? <LogInfo logged={hasCrmLogged} /> : null,
    myCallerIdTitle: isInbound ? t('to') : t('from'),
    myCallerId: isInbound ? toInfo : fromInfo,
    copyNumber,
    getActionInfo,
  };
};
