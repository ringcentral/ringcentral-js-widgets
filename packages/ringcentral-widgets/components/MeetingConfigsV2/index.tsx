import {
  RcBoxSelect,
  RcCheckbox,
  RcIcon,
  RcLink,
  RcMenuItem,
  RcTextField,
  RcTypography,
} from '@ringcentral/juno';
import classnames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { generateRandomPassword } from 'ringcentral-integration/helpers/meetingHelper';
import {
  isRecurringMeeting,
  MeetingDelegators,
  MeetingType,
  RcMMeetingModel,
  ASSISTED_USERS_MYSELF,
} from 'ringcentral-integration/modules/Meeting';

import { formatMeetingId } from '../../lib/MeetingCalendarHelper';
import { Alert, AlertType } from '../Alert';
import { SpinnerOverlay } from '../SpinnerOverlay';
import { ExtendedTooltip as MeetingOptionLocked } from './ExtendedTooltip';
import i18n from './i18n';
import LockSvg from './icons/icon-lock_border.svg';
import styles from './styles.scss';
import { VideoSettingGroup } from './VideoSettingGroup';

// TODO: wait for juno upgrade
export interface MeetingConfigsProps {
  disabled: boolean;
  showSpinnerInConfigPanel: boolean;
  personalMeetingId: string;
  updateMeetingSettings: (meeting: Partial<RcMMeetingModel>) => void;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
  update: (...args: any[]) => any;
  init: (...args: any[]) => any;
  meeting: RcMMeetingModel;
  currentLocale: string;
  recipientsSection?: React.ReactNode;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  showTopic?: boolean;
  showWhen?: boolean;
  showDuration?: boolean;
  showRecurringMeeting?: boolean;
  meetingOptionToggle?: boolean;
  showScheduleOnBehalf?: boolean;
  passwordPlaceholderEnable?: boolean;
  audioOptionToggle?: boolean;
  useTimePicker?: boolean;
  delegators: MeetingDelegators[];
  updateScheduleFor: (userExtensionId: string) => any;
}

function getHelperTextForPasswordField(
  meeting: RcMMeetingModel,
  currentLocale: string,
  isPasswordFocus: boolean,
): string {
  // when focus on password input, always show hint text
  if (isPasswordFocus) {
    return i18n.getString('rcmPasswordHintText', currentLocale);
  }
  if (!meeting.password) {
    return i18n.getString('passwordEmptyError', currentLocale);
  }
  if (!meeting.isMeetingPasswordValid) {
    return i18n.getString('rcmPasswordInvalidError', currentLocale);
  }
  // when correct input, show nothing
  return '';
}

function getIsPasswordFieldError(
  meeting: RcMMeetingModel,
  isPasswordFocus: boolean,
): boolean {
  return (
    !isPasswordFocus && (!meeting.password || !meeting.isMeetingPasswordValid)
  );
}

function getCheckboxCommProps(
  labelPlacement: 'end' | 'start' | 'top' | 'bottom',
) {
  return {
    formControlLabelProps: {
      classes: {
        root:
          labelPlacement === 'end'
            ? styles.labelPlacementEnd
            : styles.labelPlacementStart,
        label: styles.fullWidthLabel,
      },
      labelPlacement,
    },
  };
}

const MeetingOptionLabel: React.FunctionComponent<{
  children: React.ReactNode;
  isLocked?: boolean;
  currentLocale?: string;
  hasScrollBar?: boolean;
  className?: string;
  labelPlacement?: string;
}> = ({
  children,
  labelPlacement,
  isLocked = false,
  currentLocale,
  hasScrollBar = false,
  className = '',
}) => {
  return (
    <div className={styles.labelContent}>
      <div
        className={classnames(
          styles.placementLeft,
          { [styles.optionLabel]: labelPlacement === 'start' },
          className,
        )}
      >
        {children}
      </div>
      {isLocked ? (
        <div className={styles.placementRight}>
          <MeetingOptionLocked
            hasScrollBar={hasScrollBar}
            title={
              <span>{i18n.getString('lockedTooltip', currentLocale)}</span>
            }
          >
            <RcIcon size="small" symbol={LockSvg} />
          </MeetingOptionLocked>
        </div>
      ) : null}
    </div>
  );
};
export const MeetingConfigs: React.FunctionComponent<MeetingConfigsProps> = ({
  updateMeetingSettings,
  disabled,
  personalMeetingId,
  switchUsePersonalMeetingId,
  init,
  meeting,
  currentLocale,
  recipientsSection,
  showTopic,
  showWhen,
  showDuration,
  showRecurringMeeting,
  meetingOptionToggle,
  audioOptionToggle,
  useTimePicker,
  showScheduleOnBehalf,
  delegators,
  updateScheduleFor,
  labelPlacement,
  showSpinnerInConfigPanel,
}) => {
  useEffect(() => {
    if (init) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (options: any) => {
    return updateMeetingSettings({
      ...meeting,
      ...options,
    });
  };

  const configRef = useRef<HTMLDivElement>();
  const [hasScrollBar, setHasScrollBar] = useState<boolean>(false);

  useEffect(() => {
    setHasScrollBar(
      configRef.current.scrollHeight > configRef.current.clientHeight,
    );
  }, []);

  /* Password */
  const [isPasswordFocus, setPasswordFocus] = useState<boolean>(false);

  /* AudioOptions */
  const [audioOptions, setAudioOptions] = useState<string>(
    meeting.audioOptions && meeting.audioOptions.join('_'),
  );
  const audioHelpTextMap: { [key: string]: string } = {
    Phone: 'telephonyOnly',
    ComputerAudio: 'voIPOnly',
    Phone_ComputerAudio: 'both',
  };
  const updateAudioOptions = (audioOptions: string) => {
    setAudioOptions(audioOptions);
    update({
      audioOptions: audioOptions.split('_'),
    });
  };
  useEffect(() => {
    setAudioOptions(meeting.audioOptions.join('_'));
  }, [meeting.audioOptions]);

  /* Recurring */
  const [isRecurring, setIsRecurring] = useState<boolean>(
    isRecurringMeeting(meeting.meetingType),
  );
  const toggleRecurring = (isRecurring: boolean) => {
    update({
      meetingType: isRecurring ? MeetingType.RECURRING : MeetingType.SCHEDULED,
    });
  };
  useEffect(() => {
    setIsRecurring(isRecurringMeeting(meeting.meetingType));
  }, [meeting.meetingType]);

  /* Use Personal MeetingId */
  const [isPmiConfirm, setPmiConfirm] = useState<boolean>(false);
  const onPmiChange = async (usePersonalMeetingId: boolean) => {
    setPmiConfirm(false);
    await switchUsePersonalMeetingId(usePersonalMeetingId);
  };

  /* Option Disable Status */
  const isDisabled =
    disabled || (meeting.usePersonalMeetingId && !isPmiConfirm);

  const settingsGroupExpandable = false;

  const checkboxCommProps = getCheckboxCommProps(labelPlacement);

  return (
    <div
      ref={configRef}
      className={styles.videoConfig}
      data-sign="meetingConfigsPanel"
    >
      <div className={styles.meetingContent}>
        {showSpinnerInConfigPanel ? <SpinnerOverlay /> : null}
        {recipientsSection ? (
          <div className={styles.meetingSection}>{recipientsSection}</div>
        ) : null}
        <div className={styles.meetingSettings}>
          {showScheduleOnBehalf ? (
            <VideoSettingGroup
              dataSign="scheduleForPanel"
              expandable={settingsGroupExpandable}
              summary={i18n.getString('scheduleFor', currentLocale)}
            >
              <div
                className={classnames(styles.sideMargin, styles.selectOption)}
              >
                <RcBoxSelect
                  disabled={disabled}
                  className={classnames(
                    styles.scheduleForBoxSelect,
                    styles.autoFullWidth,
                  )}
                  data-sign="scheduleFor"
                  automationId="scheduleFor"
                  onChange={(e) => {
                    updateScheduleFor(e.target.value as string);
                  }}
                  value={meeting.host.id}
                >
                  {delegators.map((item: MeetingDelegators) => {
                    const userName =
                      item.name === ASSISTED_USERS_MYSELF
                        ? i18n.getString(item.name, currentLocale)
                        : item.name;
                    return (
                      <RcMenuItem
                        value={item.id}
                        key={item.id}
                        title={userName}
                        className={styles.boxSelectMenuItem}
                      >
                        {userName}
                      </RcMenuItem>
                    );
                  })}
                </RcBoxSelect>
              </div>
            </VideoSettingGroup>
          ) : null}
          {personalMeetingId ? (
            <VideoSettingGroup
              dataSign="meetingIdSection"
              expandable={settingsGroupExpandable}
              summary={i18n.getString('meetingId', currentLocale)}
            >
              <>
                <RcCheckbox
                  {...checkboxCommProps}
                  data-sign="usePersonalMeetingId"
                  checked={meeting.usePersonalMeetingId}
                  onChange={async () => {
                    onPmiChange(!meeting.usePersonalMeetingId);
                  }}
                  label={
                    <MeetingOptionLabel
                      labelPlacement={labelPlacement}
                      className={styles.pmiLabel}
                    >
                      {i18n.getString('usePersonalMeetingId', currentLocale)}
                      &nbsp;
                      <span data-sign="personalMeetingId">
                        {formatMeetingId(personalMeetingId, '-')}
                      </span>
                    </MeetingOptionLabel>
                  }
                />
                {meeting.usePersonalMeetingId ? (
                  <Alert
                    type={AlertType.INFO}
                    className={styles.alertContainer}
                  >
                    {isPmiConfirm ? (
                      i18n.getString('pmiSettingChangeAlert', currentLocale)
                    ) : (
                      <>
                        {i18n.getString('pmiChangeConfirm', currentLocale)}
                        <RcLink
                          handleOnClick={() => setPmiConfirm(!isPmiConfirm)}
                          data-sign="setPmiConfirm"
                        >
                          {i18n.getString('changePmiSettings', currentLocale)}
                        </RcLink>
                      </>
                    )}
                  </Alert>
                ) : null}
              </>
            </VideoSettingGroup>
          ) : null}
          <VideoSettingGroup
            dataSign="passwordSection"
            expandable={settingsGroupExpandable}
            summary={i18n.getString('password', currentLocale)}
          >
            <RcCheckbox
              {...checkboxCommProps}
              data-sign="requirePassword"
              disabled={isDisabled || meeting._lockRequireMeetingPassword}
              checked={meeting._requireMeetingPassword}
              onChange={() => {
                let password = '';
                // checked before
                if (meeting._requireMeetingPassword) {
                  password = '';
                } else {
                  password =
                    meeting.usePersonalMeetingId && meeting._pmiPassword
                      ? meeting._pmiPassword
                      : generateRandomPassword();
                }
                update({
                  _requireMeetingPassword: !meeting._requireMeetingPassword,
                  password,
                });
              }}
              label={
                <MeetingOptionLabel
                  labelPlacement={labelPlacement}
                  isLocked={meeting._lockRequireMeetingPassword}
                  currentLocale={currentLocale}
                  hasScrollBar={hasScrollBar}
                >
                  {i18n.getString('requirePassword', currentLocale)}
                </MeetingOptionLabel>
              }
            />
            {meeting._requireMeetingPassword ? (
              <div
                className={classnames(styles.passwordField, {
                  [styles.subPrefixPadding]: labelPlacement === 'end',
                })}
              >
                <RcTextField
                  disabled={isDisabled}
                  error={getIsPasswordFieldError(meeting, isPasswordFocus)}
                  helperText={getHelperTextForPasswordField(
                    meeting,
                    currentLocale,
                    isPasswordFocus,
                  )}
                  label={i18n.getString('setPassword', currentLocale)}
                  data-sign="password"
                  classes={{
                    root: styles.noBottomMargin,
                  }}
                  fullWidth
                  clearBtn
                  value={meeting.password}
                  inputProps={{
                    maxLength: 255,
                  }}
                  onChange={(e) => {
                    const password = e.target.value;
                    update({ password });
                  }}
                  onFocus={() => {
                    setPasswordFocus(true);
                  }}
                  onBlur={() => {
                    setPasswordFocus(false);
                  }}
                />
              </div>
            ) : null}
          </VideoSettingGroup>
          <VideoSettingGroup
            dataSign="videoSection"
            expandable={settingsGroupExpandable}
            summary={i18n.getString('video', currentLocale)}
          >
            <RcCheckbox
              {...checkboxCommProps}
              data-sign="turnOffCamera"
              disabled={
                isDisabled || meeting.settingLock.startParticipantsVideo
              }
              checked={!meeting.startParticipantsVideo}
              onChange={() => {
                update({
                  startParticipantsVideo: !meeting.startParticipantsVideo,
                });
              }}
              label={
                <MeetingOptionLabel
                  labelPlacement={labelPlacement}
                  isLocked={meeting.settingLock.startParticipantsVideo}
                  currentLocale={currentLocale}
                  hasScrollBar={hasScrollBar}
                >
                  {i18n.getString('turnOffCamera', currentLocale)}
                </MeetingOptionLabel>
              }
            />
            <RcCheckbox
              {...checkboxCommProps}
              data-sign="turnOffHostCamera"
              disabled={isDisabled || meeting.settingLock.startHostVideo}
              checked={!meeting.startHostVideo}
              onChange={() => {
                update({
                  startHostVideo: !meeting.startHostVideo,
                });
              }}
              label={
                <MeetingOptionLabel
                  labelPlacement={labelPlacement}
                  isLocked={meeting.settingLock.startHostVideo}
                  currentLocale={currentLocale}
                  hasScrollBar={hasScrollBar}
                >
                  {i18n.getString('turnOffHostCamera', currentLocale)}
                </MeetingOptionLabel>
              }
            />
          </VideoSettingGroup>
          <VideoSettingGroup
            dataSign="audioSection"
            expandable={settingsGroupExpandable}
            summary={i18n.getString('audio', currentLocale)}
          >
            <div
              className={classnames(
                styles.selectOption,
                styles.labelContent,
                styles.sideMargin,
              )}
            >
              <div
                className={classnames(styles.placementLeft, styles.hackWidth)}
              >
                <RcBoxSelect
                  disabled={isDisabled || meeting.settingLock.audioOptions}
                  title={i18n.getString(
                    audioHelpTextMap[audioOptions],
                    currentLocale,
                  )}
                  classes={{
                    root: styles.boxSelectWrapper,
                  }}
                  className={styles.autoFullWidth}
                  automationId="audioOptions"
                  onChange={(e) => {
                    updateAudioOptions(e.target.value as string);
                  }}
                  value={audioOptions}
                >
                  <RcMenuItem value="Phone">
                    {i18n.getString('telephonyOnly', currentLocale)}
                  </RcMenuItem>
                  <RcMenuItem value="ComputerAudio">
                    {i18n.getString('voIPOnly', currentLocale)}
                  </RcMenuItem>
                  <RcMenuItem value="Phone_ComputerAudio">
                    {i18n.getString('both', currentLocale)}
                  </RcMenuItem>
                </RcBoxSelect>
              </div>
              {meeting.settingLock.audioOptions ? (
                <div
                  className={classnames(
                    styles.placementRight,
                    styles.lockedIcon,
                  )}
                >
                  <MeetingOptionLocked
                    hasScrollBar={hasScrollBar}
                    title={
                      <span>
                        {i18n.getString('lockedTooltip', currentLocale)}
                      </span>
                    }
                  >
                    <RcIcon size="small" symbol={LockSvg} />
                  </MeetingOptionLocked>
                </div>
              ) : null}
            </div>
          </VideoSettingGroup>
          <VideoSettingGroup
            dataSign="meetingOptionsSection"
            expandable={settingsGroupExpandable}
            summary={i18n.getString('meetingOptions', currentLocale)}
          >
            <RcCheckbox
              {...checkboxCommProps}
              disabled={isDisabled || meeting.settingLock.allowJoinBeforeHost}
              data-sign="enableJoinToggle"
              checked={meeting.allowJoinBeforeHost}
              onChange={() => {
                update({
                  allowJoinBeforeHost: !meeting.allowJoinBeforeHost,
                });
              }}
              label={
                <MeetingOptionLabel
                  labelPlacement={labelPlacement}
                  isLocked={meeting.settingLock.allowJoinBeforeHost}
                  currentLocale={currentLocale}
                  hasScrollBar={hasScrollBar}
                >
                  {i18n.getString('joinBeforeHost', currentLocale)}
                </MeetingOptionLabel>
              }
            />
            {showRecurringMeeting ? (
              <>
                <RcCheckbox
                  {...checkboxCommProps}
                  disabled={isDisabled}
                  data-sign="recurringMeeting"
                  checked={isRecurring}
                  onChange={() => {
                    toggleRecurring(!isRecurring);
                  }}
                  label={
                    <MeetingOptionLabel labelPlacement={labelPlacement}>
                      {i18n.getString('recurringMeeting', currentLocale)}
                    </MeetingOptionLabel>
                  }
                />
                <RcTypography
                  variant="caption1"
                  className={classnames(styles.recurringNote, {
                    [styles.subPrefixPadding]: labelPlacement === 'end',
                  })}
                >
                  {i18n.getString('recurringNote', currentLocale)}
                </RcTypography>
              </>
            ) : null}
          </VideoSettingGroup>
        </div>
      </div>
    </div>
  );
};

MeetingConfigs.defaultProps = {
  showRecurringMeeting: true,
  labelPlacement: 'start',
};
