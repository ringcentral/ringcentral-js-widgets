import {
  updateFullTime,
  updateFullYear,
} from '@ringcentral-integration/commons/helpers/meetingHelper';
import type { RcVMeetingModel } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import type {
  AUTH_USER,
  RcvDelegator,
  RcvItemType,
  RcvWaitingRoomModeProps,
} from '@ringcentral-integration/commons/modules/RcVideo';
import {
  ASSISTED_USERS_MYSELF,
  AUTH_USER_TYPE,
  RCV_ITEM_NAME,
  RCV_WAITING_ROOM_MODE,
} from '@ringcentral-integration/commons/modules/RcVideo';
import { format } from '@ringcentral-integration/utils';
import type {
  RcCheckboxProps,
  RcDatePickerProps,
  RcTimePickerProps,
} from '@ringcentral/juno';
import {
  RcCheckbox,
  RcDatePicker,
  RcIcon,
  RcLink,
  RcMenuItem,
  RcSelect,
  RcText,
  RcTextField,
  RcTimePicker,
  spacing,
  styled,
} from '@ringcentral/juno';
import { InfoBorder } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { formatMeetingId } from '../../lib/MeetingCalendarHelper';
import {
  getHoursList,
  getMinutesList,
  HOUR_SCALE,
  MINUTE_SCALE,
} from '../../lib/MeetingHelper';
import { MigrateToPluginAlert, RemoveMeetingWarn } from '../MeetingAlert';
import { ExtendedTooltip } from '../MeetingConfigsV2/ExtendedTooltip';
import { SpinnerOverlay } from '../SpinnerOverlay';

import { SettingGroup } from './SettingGroup';
import { VideoSecuritySettingItem } from './VideoSecuritySettingItem';
import { RCV_SCHEDULE_ON_BEHALF_GUIDANCE_LINK } from './constants';
import i18n, { type I18nKey } from './i18n';
import styles from './styles.scss';

function getHelperTextForPasswordField(
  meeting: RcVMeetingModel,
  currentLocale: string,
  isPasswordFocus: boolean,
): string {
  if (!meeting.meetingPassword) {
    return i18n.getString('passwordEmptyError', currentLocale);
  }
  if (!meeting.isMeetingPasswordValid) {
    return i18n.getString('passwordInvalidError', currentLocale);
  }
  if (isPasswordFocus) {
    return i18n.getString('passwordHintText', currentLocale);
  }
  // when correct input without focus, show nothing
  return '';
}

// TODO: integrate with VideoPanelProps from 'GenericMeetingPanel/interface'
interface VideoConfigProps {
  disabled?: boolean;
  showScheduleOnBehalf?: boolean;
  delegators?: RcvDelegator[];
  currentLocale: string;
  meeting: RcVMeetingModel;

  updateMeetingSettings: (meeting: Partial<RcVMeetingModel>) => void;
  onCloseMigrationAlert?: () => void;

  recipientsSection?: React.ReactNode;
  showWhen?: boolean;
  showDuration?: boolean;
  showRcvAdminLock?: boolean;
  showPmiConfirm?: boolean;
  showWaitingRoom?: boolean;
  showE2EE?: boolean;
  isE2EEDisabled?: boolean;

  enablePersonalMeeting?: boolean;
  isPmiChangeConfirmed?: boolean;
  isPersonalMeetingDisabled: boolean;
  personalMeetingId: string;
  showMigrationAlert?: boolean;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
  trackSettingChanges?: (itemName: RcvItemType) => void;
  updateScheduleFor: (userExtensionId: string) => any;
  init: () => any;
  e2eeInteractFunc: (e2eeValue: boolean) => void;
  onPmiChangeClick: () => void;
  datePickerSize?: RcDatePickerProps['size'];
  timePickerSize?: RcTimePickerProps['size'];
  checkboxSize?: RcCheckboxProps['size'];
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  showSpinnerInConfigPanel: boolean;
  joinBeforeHostLabel: string;
  authUserTypeValue: AUTH_USER;
  isJoinBeforeHostDisabled: boolean;
  isMuteAudioDisabled: boolean;
  isTurnOffCameraDisabled: boolean;
  isAllowScreenSharingDisabled: boolean;
  isAuthenticatedCanJoinDisabled: boolean;
  isWaitingRoomDisabled: boolean;
  isRequirePasswordDisabled: boolean;
  isWaitingRoomNotCoworkerDisabled: boolean;
  isWaitingRoomGuestDisabled: boolean;
  isWaitingRoomAllDisabled: boolean;
  isAuthUserTypeDisabled: boolean;
  isWaitingRoomTypeDisabled: boolean;
  isSignedInUsersDisabled: boolean;
  isSignedInCoWorkersDisabled: boolean;
  showRemoveMeetingWarning: boolean;
  brandConfig: any;
}

const PanelRoot = styled.div`
  ${RcCheckbox} {
    padding: ${spacing(2)};
  }
`;

export const VideoConfig: FunctionComponent<VideoConfigProps> = (props) => {
  const {
    disabled,
    currentLocale,
    meeting,
    updateMeetingSettings,
    recipientsSection,
    init,
    children,
    showWhen,
    showDuration,
    showRcvAdminLock,
    showPmiConfirm,
    showWaitingRoom,
    showE2EE,
    isE2EEDisabled,
    enablePersonalMeeting,
    isPmiChangeConfirmed,
    isPersonalMeetingDisabled,
    personalMeetingId,
    switchUsePersonalMeetingId,
    trackSettingChanges,
    e2eeInteractFunc,
    onPmiChangeClick,
    onCloseMigrationAlert,
    datePickerSize,
    timePickerSize,
    checkboxSize,
    labelPlacement,
    delegators,
    showScheduleOnBehalf,
    updateScheduleFor,
    showSpinnerInConfigPanel,
    joinBeforeHostLabel,
    authUserTypeValue,
    isJoinBeforeHostDisabled,
    isMuteAudioDisabled,
    isTurnOffCameraDisabled,
    isAllowScreenSharingDisabled,
    isAuthenticatedCanJoinDisabled,
    isAuthUserTypeDisabled,
    isWaitingRoomTypeDisabled,
    isSignedInUsersDisabled,
    isSignedInCoWorkersDisabled,
    isWaitingRoomDisabled,
    isRequirePasswordDisabled,
    isWaitingRoomNotCoworkerDisabled,
    isWaitingRoomGuestDisabled,
    isWaitingRoomAllDisabled,
    showRemoveMeetingWarning,
    brandConfig,
    showMigrationAlert,
  } = props;

  const settingsGroupExpandable = false;
  const hoursList = getHoursList(HOUR_SCALE, currentLocale);
  const minutesList = getMinutesList(MINUTE_SCALE, currentLocale);

  useEffect(() => {
    if (init) {
      init();
    }
  }, []);

  const update = (options: any, itemName?: RcvItemType) => {
    updateMeetingSettings({
      ...meeting,
      ...options,
    });
    trackSettingChanges && itemName && trackSettingChanges(itemName);
  };

  /* Password validate interaction */
  const [isPasswordFocus, setPasswordFocus] = useState<boolean>(false);

  const startTime = useMemo(() => {
    return new Date(meeting.startTime);
  }, [meeting.startTime]);

  /* Scrollbar */
  const configRef = useRef<HTMLDivElement>();
  const [hasScrollBar, setHasScrollBar] = useState<boolean>(false);
  useEffect(() => {
    setHasScrollBar(
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      configRef.current.scrollHeight > configRef.current.clientHeight,
    );
  }, []);

  return (
    // @ts-expect-error TS(2322): Type '{ children: Element; ref: MutableRefObject<H... Remove this comment to see the full error message
    <PanelRoot
      ref={configRef}
      className={styles.videoConfig}
      data-sign="videoConfigsPanel"
    >
      <div className={styles.meetingContent}>
        {showSpinnerInConfigPanel ? <SpinnerOverlay /> : null}
        {showRemoveMeetingWarning && (
          <SettingGroup dataSign="removeMeetingWarningPanel" expandable={false}>
            <RemoveMeetingWarn
              brandConfig={brandConfig}
              currentLocale={currentLocale}
            />
          </SettingGroup>
        )}
        {showMigrationAlert && (
          <MigrateToPluginAlert
            currentLocale={currentLocale}
            substituteName={brandConfig.substituteName}
            onCloseAlert={onCloseMigrationAlert}
          />
        )}
        <div className={clsx(styles.meetingSection, styles.gutterTop)}>
          {children}
        </div>
        {recipientsSection ? (
          <div className={styles.meetingSection}>{recipientsSection}</div>
        ) : null}
        {showWhen ? (
          <div className={styles.meetingSection}>
            <div className={styles.datePicker}>
              <RcDatePicker
                fullWidth
                gutterBottom
                label={i18n.getString('date', currentLocale)}
                data-sign="date"
                value={startTime}
                clearBtn={false}
                formatString="MM/DD/YYYY"
                size={datePickerSize}
                locale={currentLocale}
                todayButtonText={i18n.getString('today', currentLocale)}
                onChange={(value) => {
                  update({
                    // @ts-expect-error TS(2345): Argument of type 'Date | null' is not assignable t... Remove this comment to see the full error message
                    startTime: updateFullYear(startTime, value),
                  });
                }}
              />
            </div>
            <div className={styles.timePicker}>
              <RcTimePicker
                fullWidth
                gutterBottom
                clearBtn={false}
                size={timePickerSize}
                label={i18n.getString('startTime', currentLocale)}
                isTwelveHourSystem
                data-sign="startTime"
                dateMode
                value={startTime}
                onChange={(value) => {
                  update({
                    // @ts-expect-error TS(2345): Argument of type 'Date | null' is not assignable t... Remove this comment to see the full error message
                    startTime: updateFullTime(startTime, value),
                  });
                }}
              />
            </div>
          </div>
        ) : null}

        {showDuration ? (
          <div className={styles.meetingSection}>
            <div className={styles.hourDuration}>
              <RcSelect
                fullWidth
                gutterBottom
                data-sign="durationHour"
                value={Math.floor(meeting.duration / 60)}
                onChange={(e) => {
                  // @ts-expect-error TS(2571): Object is of type 'unknown'.
                  const value = +e.target.value;
                  const restMinutes = Math.floor(meeting.duration % 60);
                  const durationInMinutes = value * 60 + restMinutes;
                  update({
                    duration: durationInMinutes,
                  });
                }}
                className={styles.select}
                label={i18n.getString('duration', currentLocale)}
              >
                {hoursList.map((item, i) => (
                  <RcMenuItem
                    key={i}
                    // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
                    value={item.value}
                    data-sign={`option${i}`}
                  >
                    {/* @ts-expect-error TS(2339): Property 'text' does not exist on type 'never'. */}
                    {item !== null ? item.text : 'defaultValue'}
                  </RcMenuItem>
                ))}
              </RcSelect>
            </div>
            <div className={styles.minuteDuration}>
              <RcSelect
                fullWidth
                gutterBottom
                data-sign="durationMinute"
                required
                value={Math.floor(meeting.duration % 60)}
                onChange={(e) => {
                  // @ts-expect-error TS(2571): Object is of type 'unknown'.
                  const value = +e.target.value;
                  const restHours = Math.floor(meeting.duration / 60);
                  // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
                  const isMax = restHours === hoursList.slice(-1)[0].value;
                  const minutes = isMax ? 0 : value;
                  const durationInMinutes = restHours * 60 + minutes;
                  update({
                    duration: durationInMinutes,
                  });
                }}
              >
                {minutesList.map((item, i) => (
                  <RcMenuItem
                    key={i}
                    // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
                    value={item.value}
                    data-sign={`option${i}`}
                  >
                    {/* @ts-expect-error TS(2339): Property 'text' does not exist on type 'never'. */}
                    {item !== null ? item.text : 'defaultValue'}
                  </RcMenuItem>
                ))}
              </RcSelect>
            </div>
          </div>
        ) : null}
        {showScheduleOnBehalf ? (
          <SettingGroup
            dataSign="scheduleOnBehalfPanel"
            expandable={settingsGroupExpandable}
            summary={
              <span className={styles.flexVertical}>
                {i18n.getString('scheduleFor', currentLocale)}
                <ExtendedTooltip
                  interactive
                  placement="bottom"
                  hasScrollBar={hasScrollBar}
                  data-sign="scheduleForTooltip"
                  title={
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div
                        data-sign="scheduleForGuidance"
                        className={styles.preLine}
                      >
                        {i18n.getString('scheduleForGuidance', currentLocale)}
                      </div>
                      <br />
                      <div>
                        <RcLink
                          variant="inherit"
                          data-sign="scheduleForGuidanceLink"
                          className={styles.underline}
                          target="_blank"
                          color="neutral.b01"
                          href={RCV_SCHEDULE_ON_BEHALF_GUIDANCE_LINK}
                        >
                          {i18n.getString(
                            'scheduleForGuidanceMore',
                            currentLocale,
                          )}
                        </RcLink>
                      </div>
                    </div>
                  }
                >
                  <RcIcon
                    size="small"
                    color="neutral.f04"
                    symbol={InfoBorder}
                    data-sign="scheduleForGuidanceIcon"
                    className={styles.allowCursor}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </ExtendedTooltip>
              </span>
            }
          >
            <div className={styles.boxSelectWrapper}>
              <RcSelect
                variant="box"
                fullWidth
                className={styles.boxSelect}
                data-sign="scheduleFor"
                disabled={disabled}
                onChange={(e) => {
                  updateScheduleFor(e.target.value as string);
                  // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                  trackSettingChanges(RCV_ITEM_NAME.scheduleFor);
                }}
                value={meeting.extensionId}
              >
                {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
                {delegators.map((item: RcvDelegator, index: number) => {
                  const userName =
                    item.name === ASSISTED_USERS_MYSELF
                      ? i18n.getString(item.name, currentLocale)
                      : item.name;
                  return (
                    <RcMenuItem
                      value={item.extensionId}
                      key={item.extensionId}
                      title={userName}
                      className={styles.boxSelectMenuItem}
                      data-sign={`scheduleForMenuItem${index}`}
                    >
                      {userName}
                    </RcMenuItem>
                  );
                })}
              </RcSelect>
            </div>
          </SettingGroup>
        ) : null}
        <SettingGroup
          dataSign="settingsPanel"
          expandable={settingsGroupExpandable}
          summary={i18n.getString('meetingSettings', currentLocale)}
        >
          {enablePersonalMeeting && personalMeetingId && (
            <>
              <VideoSecuritySettingItem
                labelPlacement={labelPlacement}
                dataSign="usePersonalMeetingIdWrapper"
                hasScrollBar={hasScrollBar}
                isDisabled={isPersonalMeetingDisabled}
                currentLocale={currentLocale}
                label={
                  <div className={styles.pmiLabel}>
                    {i18n.getString('usePersonalMeetingId', currentLocale)}
                    &nbsp;
                    <span data-sign="personalMeetingId">
                      {formatMeetingId(personalMeetingId, '-')}
                    </span>
                  </div>
                }
              >
                <RcCheckbox
                  data-sign="usePersonalMeetingId"
                  disabled={isPersonalMeetingDisabled || disabled}
                  size={checkboxSize}
                  checked={meeting.usePersonalMeetingId}
                  onChange={(ev, checked) => {
                    switchUsePersonalMeetingId(checked);
                  }}
                />
              </VideoSecuritySettingItem>
              {meeting.usePersonalMeetingId &&
              showPmiConfirm &&
              !isPmiChangeConfirmed ? (
                <div className={styles.pmiChangeConfirmContainer}>
                  <RcLink
                    onClick={onPmiChangeClick}
                    data-sign="pmiConfirm"
                    className={styles.noUnderLine}
                  >
                    <RcText weight="bold" className={styles.normalSize}>
                      {i18n.getString('changePmiSettings', currentLocale)}
                    </RcText>
                  </RcLink>
                </div>
              ) : null}
            </>
          )}
          <VideoSecuritySettingItem
            labelPlacement={labelPlacement}
            dataSign="muteAudioWrapper"
            hasScrollBar={hasScrollBar}
            currentLocale={currentLocale}
            label={i18n.getString('muteAudio', currentLocale)}
          >
            <RcCheckbox
              data-sign="muteAudio"
              disabled={isMuteAudioDisabled}
              size={checkboxSize}
              checked={meeting.muteAudio}
              onChange={() => {
                update(
                  {
                    muteAudio: !meeting.muteAudio,
                  },
                  RCV_ITEM_NAME.muteAudio,
                );
              }}
            />
          </VideoSecuritySettingItem>
          <VideoSecuritySettingItem
            labelPlacement={labelPlacement}
            dataSign="turnOffCameraWrapper"
            hasScrollBar={hasScrollBar}
            currentLocale={currentLocale}
            label={i18n.getString('turnOffCamera', currentLocale)}
          >
            <RcCheckbox
              data-sign="turnOffCamera"
              disabled={isTurnOffCameraDisabled}
              size={checkboxSize}
              checked={meeting.muteVideo}
              onChange={() => {
                update(
                  {
                    muteVideo: !meeting.muteVideo,
                  },
                  RCV_ITEM_NAME.muteVideo,
                );
              }}
            />
          </VideoSecuritySettingItem>
        </SettingGroup>
        <SettingGroup
          dataSign="securityPanel"
          expandable={settingsGroupExpandable}
          summary={i18n.getString('meetingSettingsSecurity', currentLocale)}
        >
          {showE2EE ? (
            <VideoSecuritySettingItem
              labelPlacement={labelPlacement}
              dataSign="e2eeWrapper"
              hasScrollBar={hasScrollBar}
              isDisabled={isE2EEDisabled}
              isLock={showRcvAdminLock && meeting.settingLock?.e2ee}
              currentLocale={currentLocale}
              label={
                <span className={styles.flexVertical}>
                  {i18n.getString('useE2ee', currentLocale)}
                  <ExtendedTooltip
                    placement="top"
                    hasScrollBar={hasScrollBar}
                    title={i18n.getString('e2eeTooltip', currentLocale)}
                    data-sign="e2eeTooltip"
                  >
                    <RcIcon
                      size="small"
                      color="neutral.f04"
                      symbol={InfoBorder}
                    />
                  </ExtendedTooltip>
                </span>
              }
            >
              <RcCheckbox
                data-sign="e2ee"
                checked={meeting.e2ee}
                disabled={isE2EEDisabled || disabled}
                size={checkboxSize}
                onChange={(ev, value) => {
                  e2eeInteractFunc(value);
                  // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                  trackSettingChanges(RCV_ITEM_NAME.e2ee);
                }}
              />
            </VideoSecuritySettingItem>
          ) : null}
          <VideoSecuritySettingItem
            labelPlacement={labelPlacement}
            dataSign="requirePasswordWrapper"
            hasScrollBar={hasScrollBar}
            isLock={showRcvAdminLock && meeting.settingLock?.isMeetingSecret}
            currentLocale={currentLocale}
            label={i18n.getString('requirePassword', currentLocale)}
          >
            <RcCheckbox
              data-sign="requirePassword"
              checked={meeting.isMeetingSecret}
              disabled={isRequirePasswordDisabled}
              size={checkboxSize}
              onChange={() => {
                const next = !meeting.isMeetingSecret;
                update(
                  {
                    isMeetingSecret: next,
                  },
                  RCV_ITEM_NAME.isMeetingSecret,
                );
              }}
            />
          </VideoSecuritySettingItem>
          {meeting.isMeetingSecret ? (
            <div
              className={clsx(styles.passwordInput, {
                [styles.subPrefixPadding]: labelPlacement === 'end',
              })}
            >
              <RcTextField
                variant="outline"
                fullWidth
                disabled={disabled}
                size="small"
                placeholder={i18n.getString('enterPassword', currentLocale)}
                error={!meeting.isMeetingPasswordValid}
                helperText={getHelperTextForPasswordField(
                  meeting,
                  currentLocale,
                  isPasswordFocus,
                )}
                InputLabelProps={{
                  className: styles.passwordLabel,
                }}
                data-sign="password"
                clearBtn
                spellCheck={false}
                value={meeting.meetingPassword}
                inputProps={{
                  maxLength: 255,
                }}
                onChange={(e) => {
                  update({
                    meetingPassword: e.target.value,
                  });
                }}
                onFocus={() => {
                  setPasswordFocus(true);
                }}
                onBlur={() => {
                  setPasswordFocus(false);
                  // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                  trackSettingChanges(RCV_ITEM_NAME.meetingPassword);
                }}
              />
            </div>
          ) : null}
          <VideoSecuritySettingItem
            labelPlacement={labelPlacement}
            dataSign="allowJoinBeforeHostWrapper"
            hasScrollBar={hasScrollBar}
            isLock={
              showRcvAdminLock && meeting.settingLock?.allowJoinBeforeHost
            }
            currentLocale={currentLocale}
            label={i18n.getString(
              joinBeforeHostLabel as I18nKey,
              currentLocale,
            )}
          >
            <RcCheckbox
              data-sign="allowJoinBeforeHost"
              checked={!meeting.allowJoinBeforeHost}
              disabled={isJoinBeforeHostDisabled}
              size={checkboxSize}
              onChange={() => {
                update(
                  {
                    allowJoinBeforeHost: !meeting.allowJoinBeforeHost,
                  },
                  RCV_ITEM_NAME.allowJoinBeforeHost,
                );
              }}
            />
          </VideoSecuritySettingItem>
          {showWaitingRoom ? (
            <>
              <VideoSecuritySettingItem
                labelPlacement={labelPlacement}
                dataSign="isWaitingRoomWrapper"
                hasScrollBar={hasScrollBar}
                isLock={
                  showRcvAdminLock && meeting.settingLock?.waitingRoomMode
                }
                currentLocale={currentLocale}
                label={i18n.getString(
                  meeting.waitingRoomMode ? 'waitingRoom' : 'enableWaitingRoom',
                  currentLocale,
                )}
              >
                <RcCheckbox
                  data-sign="enableWaitingRoom"
                  checked={!!meeting.waitingRoomMode}
                  disabled={isWaitingRoomDisabled}
                  size={checkboxSize}
                  onChange={(ev, checked) => {
                    update(
                      {
                        waitingRoomMode: checked
                          ? RCV_WAITING_ROOM_MODE.notcoworker
                          : RCV_WAITING_ROOM_MODE.off,
                      },
                      RCV_ITEM_NAME.waitingRoomMode,
                    );
                  }}
                />
              </VideoSecuritySettingItem>
              {meeting.waitingRoomMode ? (
                <div
                  className={clsx(styles.boxSelectWrapper, {
                    [styles.subPrefixPadding]: labelPlacement === 'end',
                  })}
                >
                  <RcSelect
                    variant="box"
                    data-sign="waitingRoom"
                    data-test-automation-id="waitingRoom"
                    className={styles.boxSelect}
                    fullWidth
                    disabled={isWaitingRoomTypeDisabled}
                    onChange={(e) => {
                      update(
                        {
                          waitingRoomMode: e.target
                            .value as RcvWaitingRoomModeProps,
                        },
                        RCV_ITEM_NAME.waitingRoomType,
                      );
                    }}
                    value={meeting.waitingRoomMode}
                  >
                    <RcMenuItem
                      data-sign="waitingRoomNotCoworker"
                      disabled={isWaitingRoomNotCoworkerDisabled}
                      value={RCV_WAITING_ROOM_MODE.notcoworker}
                      className={styles.boxSelectMenuItem}
                      title={i18n.getString(
                        'waitingRoomNotCoworker',
                        currentLocale,
                      )}
                    >
                      {i18n.getString('waitingRoomNotCoworker', currentLocale)}
                    </RcMenuItem>
                    <RcMenuItem
                      data-sign="waitingRoomGuest"
                      disabled={isWaitingRoomGuestDisabled}
                      value={RCV_WAITING_ROOM_MODE.guests}
                      className={styles.boxSelectMenuItem}
                      title={i18n.getString('waitingRoomGuest', currentLocale)}
                    >
                      {i18n.getString('waitingRoomGuest', currentLocale)}
                    </RcMenuItem>
                    <RcMenuItem
                      data-sign="waitingRoomAll"
                      disabled={isWaitingRoomAllDisabled}
                      value={RCV_WAITING_ROOM_MODE.all}
                      className={styles.boxSelectMenuItem}
                      title={i18n.getString('waitingRoomAll', currentLocale)}
                    >
                      {i18n.getString('waitingRoomAll', currentLocale)}
                    </RcMenuItem>
                  </RcSelect>
                </div>
              ) : null}
            </>
          ) : null}
          <VideoSecuritySettingItem
            labelPlacement={labelPlacement}
            dataSign="isOnlyAuthUserJoinWrapper"
            hasScrollBar={hasScrollBar}
            isLock={showRcvAdminLock && meeting.settingLock?.isOnlyAuthUserJoin}
            currentLocale={currentLocale}
            label={i18n.getString('onlyAuthUserJoin', currentLocale)}
          >
            <RcCheckbox
              data-sign="isOnlyAuthUserJoin"
              checked={meeting.isOnlyAuthUserJoin}
              disabled={isAuthenticatedCanJoinDisabled}
              size={checkboxSize}
              onChange={(ev, checked) => {
                update(
                  {
                    isOnlyAuthUserJoin: checked,
                    isOnlyCoworkersJoin: checked
                      ? meeting.isOnlyCoworkersJoin
                      : false,
                  },
                  RCV_ITEM_NAME.isOnlyAuthUserJoin,
                );
              }}
            />
          </VideoSecuritySettingItem>
          {meeting.isOnlyAuthUserJoin ? (
            <div
              className={clsx(styles.boxSelectWrapper, {
                [styles.subPrefixPadding]: labelPlacement === 'end',
              })}
            >
              <RcSelect
                variant="box"
                data-test-automation-id="authUserType"
                data-sign="authUserType"
                disabled={isAuthUserTypeDisabled}
                className={styles.boxSelect}
                fullWidth
                onChange={(e) => {
                  update(
                    {
                      isOnlyCoworkersJoin:
                        e.target.value === AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS,
                    },
                    RCV_ITEM_NAME.isOnlyCoworkersJoin,
                  );
                }}
                value={authUserTypeValue}
              >
                <RcMenuItem
                  disabled={isSignedInUsersDisabled}
                  value={AUTH_USER_TYPE.SIGNED_IN_USERS}
                  title={i18n.getString('signedInUsers', currentLocale)}
                >
                  {i18n.getString('signedInUsers', currentLocale)}
                </RcMenuItem>
                <RcMenuItem
                  disabled={isSignedInCoWorkersDisabled}
                  value={AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS}
                  title={i18n.getString('signedInCoWorkers', currentLocale)}
                >
                  {i18n.getString('signedInCoWorkers', currentLocale)}
                </RcMenuItem>
              </RcSelect>
            </div>
          ) : null}

          <VideoSecuritySettingItem
            labelPlacement={labelPlacement}
            dataSign="limitScreenSharingWrapper"
            hasScrollBar={hasScrollBar}
            isLock={showRcvAdminLock && meeting.settingLock?.allowScreenSharing}
            currentLocale={currentLocale}
            label={i18n.getString('limitScreenSharing', currentLocale)}
          >
            <RcCheckbox
              data-sign="limitScreenSharing"
              checked={!meeting.allowScreenSharing}
              disabled={isAllowScreenSharingDisabled}
              size={checkboxSize}
              onChange={() => {
                update(
                  {
                    allowScreenSharing: !meeting.allowScreenSharing,
                  },
                  RCV_ITEM_NAME.allowScreenSharing,
                );
              }}
            />
          </VideoSecuritySettingItem>
        </SettingGroup>
      </div>
    </PanelRoot>
  );
};

VideoConfig.defaultProps = {
  recipientsSection: undefined,
  showWhen: true,
  showDuration: true,
  showRcvAdminLock: false,
  enablePersonalMeeting: false,
  isPmiChangeConfirmed: false,
  showPmiConfirm: false,
  showWaitingRoom: false,
  showE2EE: false,
  isE2EEDisabled: false,
  datePickerSize: 'medium',
  timePickerSize: 'medium',
  labelPlacement: 'start',
  checkboxSize: 'medium',
};
