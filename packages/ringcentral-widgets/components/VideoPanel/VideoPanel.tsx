import React, { FunctionComponent, useRef } from 'react';

import { RcVMeetingModel } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import {
  AUTH_USER,
  RcvDelegator,
  RcvItemType,
} from '@ringcentral-integration/commons/modules/RcVideo';
import { sleep } from '@ringcentral-integration/commons/utils';
import {
  RcCheckboxProps,
  RcDatePickerSize,
  RcTimePickerSize,
} from '@ringcentral/juno';

import isSafari from '../../lib/isSafari';
import { Topic, TopicRef } from '../InnerTopic';
import styles from './styles.scss';
import { VideoConfig } from './VideoConfig';

/** @deprecated */
export const VideoPanel: FunctionComponent<VideoPanelProps> = ({
  scheduleButton: ScheduleButton,
  datePickerSize,
  timePickerSize,
  checkboxSize,
  meeting,
  hidden,
  currentLocale,
  onOK,
  showSaveAsDefault,
  disableSaveAsDefault,
  disabled,
  openNewWindow,
  schedule,
  updateMeetingSettings,
  init,
  recipientsSection,
  showWhen,
  showDuration,
  brandName,
  showRcvAdminLock,
  showPmiConfirm,
  isPmiChangeConfirmed,
  // @ts-expect-error TS(2339): Property 'onPmiChangeClick' does not exist on type... Remove this comment to see the full error message
  onPmiChangeClick,
  showWaitingRoom,
  showE2EE,
  isE2EEDisabled,
  enablePersonalMeeting,
  enableJoinAfterMeCopy,
  personalMeetingId,
  isPersonalMeetingDisabled,
  configDisabled,
  labelPlacement,
  switchUsePersonalMeetingId,
  trackSettingChanges,
  e2eeInteractFunc,
  updateScheduleFor,
  delegators,
  joinBeforeHostLabel,
  authUserTypeValue,
  isJoinBeforeHostDisabled,
  isMuteAudioDisabled,
  isTurnOffCameraDisabled,
  isAllowScreenSharingDisabled,
  isAuthenticatedCanJoinDisabled,
  isAuthUserTypeDisabled,
  // @ts-expect-error TS(2339): Property 'isWaitingRoomTypeDisabled' does not exis... Remove this comment to see the full error message
  isWaitingRoomTypeDisabled,
  isSignedInUsersDisabled,
  isSignedInCoWorkersDisabled,
  isWaitingRoomNotCoworkerDisabled,
  isWaitingRoomGuestDisabled,
  isWaitingRoomAllDisabled,
  isWaitingRoomDisabled,
  isRequirePasswordDisabled,
  showScheduleOnBehalf,
  showSpinnerInConfigPanel,
}) => {
  const topicRef = useRef<TopicRef>(null);

  return (
    <div className={styles.videoPanel}>
      <VideoConfig
        currentLocale={currentLocale}
        meeting={meeting}
        updateMeetingSettings={updateMeetingSettings}
        recipientsSection={recipientsSection}
        init={init}
        showWhen={showWhen}
        showDuration={showDuration}
        brandName={brandName}
        showRcvAdminLock={showRcvAdminLock}
        showPmiConfirm={showPmiConfirm}
        showWaitingRoom={showWaitingRoom}
        showE2EE={showE2EE}
        isE2EEDisabled={isE2EEDisabled}
        enablePersonalMeeting={enablePersonalMeeting}
        enableJoinAfterMeCopy={enableJoinAfterMeCopy}
        personalMeetingId={personalMeetingId}
        switchUsePersonalMeetingId={switchUsePersonalMeetingId}
        trackSettingChanges={trackSettingChanges}
        disabled={configDisabled}
        // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
        isPersonalMeetingDisabled={isPersonalMeetingDisabled}
        isPmiChangeConfirmed={isPmiChangeConfirmed}
        labelPlacement={labelPlacement}
        e2eeInteractFunc={e2eeInteractFunc}
        updateScheduleFor={updateScheduleFor}
        onPmiChangeClick={onPmiChangeClick}
        datePickerSize={datePickerSize}
        timePickerSize={timePickerSize}
        checkboxSize={checkboxSize}
        isWaitingRoomNotCoworkerDisabled={isWaitingRoomNotCoworkerDisabled}
        isWaitingRoomGuestDisabled={isWaitingRoomGuestDisabled}
        isWaitingRoomAllDisabled={isWaitingRoomAllDisabled}
        isAuthUserTypeDisabled={isAuthUserTypeDisabled}
        isWaitingRoomTypeDisabled={isWaitingRoomTypeDisabled}
        isSignedInUsersDisabled={isSignedInUsersDisabled}
        isSignedInCoWorkersDisabled={isSignedInCoWorkersDisabled}
        showScheduleOnBehalf={showScheduleOnBehalf}
        showSpinnerInConfigPanel={showSpinnerInConfigPanel}
        delegators={delegators}
        joinBeforeHostLabel={joinBeforeHostLabel}
        authUserTypeValue={authUserTypeValue}
        isJoinBeforeHostDisabled={isJoinBeforeHostDisabled}
        isMuteAudioDisabled={isMuteAudioDisabled}
        isTurnOffCameraDisabled={isTurnOffCameraDisabled}
        isAllowScreenSharingDisabled={isAllowScreenSharingDisabled}
        isAuthenticatedCanJoinDisabled={isAuthenticatedCanJoinDisabled}
        isWaitingRoomDisabled={isWaitingRoomDisabled}
        isRequirePasswordDisabled={isRequirePasswordDisabled}
      >
        {/* @ts-expect-error TS(2741): Property 'defaultTopic' is missing in type '{ name... Remove this comment to see the full error message */}
        <Topic
          name={meeting.name}
          updateMeetingTopic={(name) => {
            updateMeetingSettings({ name });
          }}
          currentLocale={currentLocale}
          ref={topicRef}
        />
      </VideoConfig>
      {ScheduleButton ? (
        <ScheduleButton
          currentLocale={currentLocale}
          hidden={hidden}
          disabled={disabled}
          meeting={meeting}
          onOK={onOK}
          onClick={async () => {
            if (!disabled) {
              await sleep(100);
              const opener = openNewWindow && isSafari() ? window.open() : null;
              await schedule(
                {
                  ...meeting,
                  // @ts-expect-error TS(2531): Object is possibly 'null'.
                  name: topicRef.current.value,
                },
                // @ts-expect-error TS(2345): Argument of type 'Window | null' is not assignable... Remove this comment to see the full error message
                opener,
              );
            }
          }}
          update={updateMeetingSettings}
          showSaveAsDefault={showSaveAsDefault}
          disableSaveAsDefault={disableSaveAsDefault}
        />
      ) : null}
    </div>
  );
};

interface VideoPanelProps {
  currentLocale: string;
  meeting: RcVMeetingModel;
  hidden: boolean;
  disabled: boolean;
  onOK: any;
  showSaveAsDefault: boolean;
  disableSaveAsDefault: boolean;
  scheduleButton: any;
  openNewWindow: any;
  init: any;
  brandName: string;
  recipientsSection?: React.ReactNode;
  showWhen?: boolean;
  showDuration?: boolean;
  showRcvAdminLock?: boolean;
  showPmiConfirm?: boolean;
  showWaitingRoom?: boolean;
  showE2EE?: boolean;
  isE2EEDisabled?: boolean;
  enablePersonalMeeting?: boolean;
  enableJoinAfterMeCopy?: boolean;
  personalMeetingId: string;
  isPersonalMeetingDisabled?: boolean;
  datePickerSize?: RcDatePickerSize;
  timePickerSize?: RcTimePickerSize;
  checkboxSize?: RcCheckboxProps['size'];
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  configDisabled?: boolean;
  delegators?: RcvDelegator[];
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
  isSignedInUsersDisabled: boolean;
  isSignedInCoWorkersDisabled: boolean;
  showScheduleOnBehalf: boolean;
  showSpinnerInConfigPanel: boolean;
  isPmiChangeConfirmed: boolean;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
  trackSettingChanges?: (itemName: RcvItemType) => void;
  e2eeInteractFunc: (e2eeValue: boolean) => void;
  schedule: (meeting: RcVMeetingModel, opener: Window) => any;
  updateMeetingSettings: (meeting: Partial<RcVMeetingModel>) => void;
  updateScheduleFor: (userExtensionId: string) => any;
}
