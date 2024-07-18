import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import {
  getTelephoneDisplayName,
  isInbound,
  isMissed,
  isRinging,
} from '@ringcentral-integration/commons/lib/callLogHelpers';
import { formatDuration } from '@ringcentral-integration/commons/lib/formatDuration';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import { parseNumber } from '@ringcentral-integration/commons/lib/parseNumber';
import { useEventCallback, usePrevious } from '@ringcentral/juno';
import clsx from 'clsx';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import { checkShouldHideContactUser } from '../../lib/checkShouldHideContactUser';
import { checkShouldHidePhoneNumber } from '../../lib/checkShouldHidePhoneNumber';
import usePromise from '../../react-hooks/usePromise';
import ActionMenu from '../ActionMenu';
import { ContactDisplay } from '../ContactDisplay';
import { CountdownTimer } from '../CountdownTimer';
import DurationCounter from '../DurationCounter';

import { CallIcon } from './CallIcon';
import i18n from './i18n';
import styles from './styles.scss';

type CallItemProps = {
  renderIndex?: number;
  extended?: boolean;
  // TODO: find correct type
  call: Call & {
    offset: number;
    type: string;
  };
  areaCode: string;
  brand: string;
  countryCode: string;
  currentLocale: string;
  onLogCall?: (...args: any[]) => any;
  onViewContact?: (...args: any[]) => any;
  onCreateContact?: (...args: any[]) => any;
  createEntityTypes?: any[];
  onClickToDial?: (...args: any[]) => any;
  onClickToSms?: (...args: any[]) => any;
  isLoggedContact?: (...args: any[]) => any;
  disableLinks?: boolean;
  disableCallButton?: boolean;
  disableClickToDial?: boolean;
  outboundSmsPermission?: boolean;
  internalSmsPermission?: boolean;
  active: boolean;
  dateTimeFormatter: (...args: any[]) => any;
  isLogging?: boolean;
  enableContactFallback?: boolean;
  autoLog?: boolean;
  showContactDisplayPlaceholder?: boolean;
  sourceIcons?: any;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  renderContactName?: (...args: any[]) => any;
  renderSubContactName?: (...args: any[]) => any;
  renderExtraButton?: (...args: any[]) => any;
  contactDisplayStyle?: string;
  externalViewEntity?: (...args: any[]) => any;
  externalHasEntity?: (...args: any[]) => any;
  shouldHideEntityButton?: (...args: any[]) => boolean;
  readTextPermission?: boolean;
  onSizeChanged?: (...args: any[]) => any;
  onItemHeightChanged?: (renderIndex?: number) => void;
  withAnimation?: boolean;
  currentSiteCode?: string;
  isMultipleSiteEnabled?: boolean;
  showCallerIdName?: boolean;
  showChooseEntityModal?: boolean;
  enableCDC?: boolean;
  maxExtensionNumberLength?: number;
  formatPhone?: (...args: any[]) => any;
  currentDelaySavingState?: any;
};

export const CallItem: FunctionComponent<CallItemProps> = ({
  currentSiteCode = '',
  isMultipleSiteEnabled = false,
  extended: extendedProp = false,
  isLoggedContact = () => false,
  isLogging: isLoggingProp = false,
  disableClickToDial = false,
  outboundSmsPermission = false,
  internalSmsPermission = false,
  disableLinks = false,
  disableCallButton = false,
  showContactDisplayPlaceholder = true,
  showCallerIdName = false,
  autoLog = false,
  readTextPermission = true,
  withAnimation = true,
  showChooseEntityModal = true,
  enableCDC = false,
  maxExtensionNumberLength = 6,
  formatPhone = (phoneNumber: string) => phoneNumber,
  onSizeChanged,
  renderIndex,
  call,
  brand,
  currentLocale,
  areaCode,
  countryCode,
  active,
  onViewContact,
  onCreateContact,
  createEntityTypes,
  onLogCall,
  onClickToDial,
  onClickToSms,
  dateTimeFormatter,
  enableContactFallback,
  sourceIcons,
  phoneSourceNameRenderer,
  renderContactName,
  renderSubContactName,
  renderExtraButton,
  contactDisplayStyle,
  externalViewEntity: externalViewEntityProp,
  externalHasEntity,
  shouldHideEntityButton,
  currentDelaySavingState,
  onItemHeightChanged,
}) => {
  const {
    direction,
    telephonyStatus,
    result,
    startTime,
    duration,
    activityMatches = [],
    offset,
    type,
    toName,
  } = call;

  const { delayUpdatingStartTime, delayUpdatingMinutes } =
    currentDelaySavingState ?? {};

  useEffect(() => {
    if (onItemHeightChanged) {
      onItemHeightChanged(renderIndex);
    }
  }, [currentDelaySavingState, onItemHeightChanged, renderIndex]);

  const getInitialContactIndex = useEventCallback(() => {
    const contactMatches = getContactMatches()!;

    const activityMatches = call.activityMatches || [];
    for (const activity of activityMatches) {
      const index = contactMatches.findIndex((contact) =>
        isLoggedContact?.(call, activity, contact),
      );
      if (index > -1) return index;
    }
    if (call.toNumberEntity) {
      const index = contactMatches.findIndex(
        (contact) => contact.id === call.toNumberEntity,
      );
      return index;
    }
    return showContactDisplayPlaceholder ? -1 : 0;
  });

  const onSelectContact = (value: any, idx: any) => {
    const selected = showContactDisplayPlaceholder
      ? parseInt(idx, 10) - 1
      : parseInt(idx, 10);
    userSelectionRef.current = true;
    setSelected(selected);
    if (autoLog) {
      logCall(false, selected);
    }
  };

  const toggleExtended = (e: any) => {
    const contactDisplay = contactDisplayRef.current;
    if (contactDisplay && contactDisplay.contains(e.target)) {
      return;
    }
    if (onSizeChanged) {
      onSizeChanged(renderIndex);
    } else {
      setExtended((extended) => !extended);
    }
  };

  const getSelectedContact = (isSelected = selected) => {
    const contactMatches = getContactMatches();
    return (
      (isSelected > -1 && contactMatches[isSelected]) ||
      (contactMatches.length === 1 && contactMatches[0]) ||
      null
    );
  };

  const getPhoneNumber = () => {
    return (
      isInbound(call)
        ? call.from!.phoneNumber || call.from!.extensionNumber
        : call.to!.phoneNumber || call.to!.extensionNumber
    ) as string;
  };

  const getContactMatches = () => {
    return (isInbound(call) ? call.fromMatches : call.toMatches) || [];
  };

  const getFallbackContactName = () => {
    return isInbound(call) ? call.from!.name : call.to?.name;
  };

  const logCall = async (redirect = true, isSelected = selected) => {
    if (typeof onLogCall === 'function' && !isLogging) {
      setIsLogging(true);
      await mounted(
        onLogCall({
          contact: getSelectedContact(isSelected),
          call: call,
          redirect,
        }),
      );

      setIsLogging(false);
    }
  };

  const viewSelectedContact = () => {
    if (typeof onViewContact !== 'function') return;

    const activityMatches = (call && call.activityMatches) || [];
    onViewContact({
      activityMatches,
      contactMatches: getContactMatches(),
      contact: getSelectedContact(),
      phoneNumber: getPhoneNumber(),
    });
  };

  const createSelectedContact = async (entityType: any) => {
    if (typeof onCreateContact === 'function' && !isCreating) {
      setIsCreating(true);
      const phoneNumber = getPhoneNumber();
      await mounted(
        onCreateContact({
          phoneNumber,
          name: enableContactFallback ? getFallbackContactName() : '',
          entityType,
        }),
      );

      setIsCreating(false);
    }
  };

  const clickToSms = ({ countryCode, areaCode }: any) => {
    if (!onClickToSms) return;

    const phoneNumber = getPhoneNumber()!;
    const contact = getSelectedContact();
    if (contact) {
      onClickToSms({
        ...contact,
        phoneNumber,
      });
    } else {
      const formatted = formatNumber({
        phoneNumber,
        countryCode,
        areaCode,
        maxExtensionLength: maxExtensionNumberLength,
      });
      onClickToSms(
        {
          name: enableContactFallback ? getFallbackContactName() : formatted,
          phoneNumber,
        },
        true,
      );
    }
  };

  const clickToDial = () => {
    if (onClickToDial) {
      const contact = getSelectedContact() || {};
      const phoneNumber = getPhoneNumber();

      if (phoneNumber) {
        onClickToDial({
          ...contact,
          phoneNumber,
        });
      }
    }
  };

  const mounted = usePromise();
  const [selected, setSelected] = useState(getInitialContactIndex());
  const [extended, setExtended] = useState(extendedProp);
  const [isLogging, setIsLogging] = useState(isLoggingProp);
  const [isCreating, setIsCreating] = useState(false);

  const contactDisplayRef = useRef<HTMLElement | null>(null);
  const userSelectionRef = useRef(false);
  const previousCall = usePrevious(() => call);

  useEffect(() => {
    setExtended(extendedProp);
  }, [extendedProp]);

  useEffect(() => {
    setIsLogging(isLoggingProp);
  }, [isLoggingProp]);

  useEffect(() => {
    if (
      !userSelectionRef.current &&
      previousCall &&
      (call.activityMatches !== previousCall?.activityMatches ||
        call.fromMatches !== previousCall?.fromMatches ||
        call.toMatches !== previousCall?.toMatches)
    ) {
      setSelected(getInitialContactIndex());
    }
  }, [call, getInitialContactIndex, previousCall]);

  const phoneNumber = getPhoneNumber();
  const contactMatches = getContactMatches();
  const shouldHideNumber =
    enableCDC && checkShouldHidePhoneNumber(phoneNumber, contactMatches);
  const isContactMatchesHidden =
    enableCDC && checkShouldHideContactUser(contactMatches);
  const fallbackContactName = getFallbackContactName();

  const ringing = isRinging(call);

  const missed = isInbound(call) && isMissed(call);
  const parsedInfo = parseNumber({
    phoneNumber,
    countryCode: countryCode as never,
    areaCode,
  });
  const isExtension =
    !parsedInfo.hasPlus &&
    parsedInfo.number &&
    parsedInfo.number.length <= maxExtensionNumberLength;
  const disableClickToSms = !(
    onClickToSms &&
    (isExtension ? internalSmsPermission : outboundSmsPermission)
  );

  const durationEl =
    typeof duration === 'undefined' ? (
      disableLinks ? (
        i18n.getString('unavailable', currentLocale)
      ) : (
        <DurationCounter startTime={startTime!} offset={offset} />
      )
    ) : (
      formatDuration(duration)
    );
  const dateEl = !active ? dateTimeFormatter({ utcTimestamp: startTime }) : '';
  const statusEl = active
    ? i18n.getString((result || telephonyStatus) as never, currentLocale)
    : '';

  const contactName = renderContactName?.(call);
  const subContactName = renderSubContactName?.(call);
  const extraButton = renderExtraButton?.(call);

  const menuExtended = extended;
  const selectedMatchContactType = getSelectedContact()?.type ?? '';
  const callerIdName = showCallerIdName
    ? getTelephoneDisplayName(call)
    : undefined;

  return (
    <div
      className={styles.root}
      onClick={toggleExtended}
      data-sign="calls_item_root"
    >
      <div data-sign="calls_item_wrapper" className={styles.wrapper}>
        <CallIcon
          direction={direction!}
          ringing={ringing}
          active={active}
          missed={missed}
          inboundTitle={i18n.getString('inboundCall', currentLocale)}
          outboundTitle={i18n.getString('outboundCall', currentLocale)}
          missedTitle={i18n.getString('missedCall', currentLocale)}
          type={type}
        />
        <div className={styles.infoWrapper}>
          <ContactDisplay
            showCallerIdIcon
            callerIdName={callerIdName}
            formatPhone={formatPhone}
            missed={missed}
            isOnConferenceCall={
              direction === callDirections.outbound && toName === 'Conference'
            }
            contactName={contactName}
            subContactName={subContactName}
            reference={(ref) => {
              contactDisplayRef.current = ref;
            }}
            className={clsx(
              styles.contactDisplay,
              contactDisplayStyle,
              missed && styles.missed,
              active && styles.active,
            )}
            selectClassName={styles.dropdownSelect}
            brand={brand}
            sourceIcons={sourceIcons}
            phoneSourceNameRenderer={phoneSourceNameRenderer}
            // TODO: find correct type
            contactMatches={contactMatches as never}
            selected={selected}
            onSelectContact={onSelectContact}
            disabled={disableLinks}
            isLogging={isLogging}
            fallBackName={fallbackContactName}
            enableContactFallback={enableContactFallback}
            areaCode={areaCode}
            countryCode={countryCode}
            phoneNumber={shouldHideNumber ? null : phoneNumber}
            currentLocale={currentLocale}
            stopPropagation={false}
            showType={false}
            showPlaceholder={showContactDisplayPlaceholder}
            currentSiteCode={currentSiteCode}
            isMultipleSiteEnabled={isMultipleSiteEnabled}
          />
          <div className={styles.details}>
            <span data-sign="duration">{durationEl}</span>
            <span data-sign="date">{` | ${dateEl}${statusEl}`}</span>
          </div>
          {delayUpdatingStartTime && delayUpdatingMinutes && (
            <CountdownTimer
              variant="plain"
              currentLocale={currentLocale}
              creationTime={delayUpdatingStartTime}
              duration={delayUpdatingMinutes}
            />
          )}
        </div>
        {extraButton}
      </div>
      <ActionMenu
        extended={menuExtended}
        onToggle={toggleExtended}
        currentLocale={currentLocale}
        onLog={onLogCall && logCall}
        onViewEntity={onViewContact && viewSelectedContact}
        onCreateEntity={onCreateContact && createSelectedContact}
        createEntityTypes={createEntityTypes}
        hasEntity={!!contactMatches.length}
        selectedMatchContactType={selectedMatchContactType}
        onClickToDial={onClickToDial && clickToDial}
        onClickToSms={
          readTextPermission
            ? () => clickToSms({ countryCode, areaCode })
            : undefined
        }
        phoneNumber={phoneNumber}
        disableLinks={disableLinks}
        shouldHideEntityButton={() => {
          if (shouldHideEntityButton) {
            return shouldHideEntityButton(call);
          }
          return isContactMatchesHidden;
        }}
        disableCallButton={disableCallButton}
        disableClickToDial={disableClickToDial}
        isLogging={isLogging || isLogging}
        isLogged={activityMatches.length > 0}
        isCreating={isCreating}
        addLogTitle={i18n.getString('addLog', currentLocale)}
        editLogTitle={i18n.getString('editLog', currentLocale)}
        textTitle={i18n.getString('text', currentLocale)}
        callTitle={i18n.getString('call', currentLocale)}
        createEntityTitle={i18n.getString('addEntity', currentLocale)}
        viewEntityTitle={i18n.getString('viewDetails', currentLocale)}
        externalViewEntity={
          externalViewEntityProp
            ? () => externalViewEntityProp?.(call)
            : undefined
        }
        externalHasEntity={externalHasEntity && externalHasEntity(call)}
        disableClickToSms={disableClickToSms}
        withAnimation={withAnimation}
        showChooseEntityModal={showChooseEntityModal}
      />
    </div>
  );
};
