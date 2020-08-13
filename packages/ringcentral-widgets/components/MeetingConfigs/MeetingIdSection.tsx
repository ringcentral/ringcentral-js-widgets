import 'react-widgets/dist/css/react-widgets.css';

import { RcLink } from '@ringcentral-integration/rcui';
import formatMessage from 'format-message';
import React, { FunctionComponent } from 'react';
import { RcMMeetingModel } from 'ringcentral-integration/modules/Meeting';

import CheckBox from '../CheckBox';
import MeetingSection from '../MeetingSection';
import i18n from './i18n';
import styles from './styles.scss';

interface MeetingIdSectionProps {
  isChangePmiConfirmed: boolean;
  personalMeetingId: string;
  handlePmiConfirmed: (value: boolean) => void;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
  currentLocale: string;
  meeting: RcMMeetingModel;
}

export const MeetingIdSection: FunctionComponent<MeetingIdSectionProps> = ({
  handlePmiConfirmed,
  personalMeetingId,
  currentLocale,
  switchUsePersonalMeetingId,
  meeting,
  isChangePmiConfirmed,
}) => {
  const ID_SETTING_OPTIONS = [
    {
      key: true,
      text: formatMessage(i18n.getString('usePmi', currentLocale), {
        meetingId: personalMeetingId,
      }),
    },
    {
      key: false,
      text: i18n.getString('generateAutomatically', currentLocale),
    },
  ];

  return (
    <MeetingSection
      title={i18n.getString('meetingId', currentLocale)}
      withSwitch
    >
      <>
        <CheckBox
          onSelect={({ key }: { key: boolean; text: string }) => {
            if (key) {
              handlePmiConfirmed(false);
            }
            switchUsePersonalMeetingId(key);
          }}
          valueField="key"
          textField="text"
          selected={meeting.usePersonalMeetingId}
          data={ID_SETTING_OPTIONS}
        />
        {meeting.usePersonalMeetingId && isChangePmiConfirmed ? (
          <div className={styles.pmiHintContainer}>
            {i18n.getString('pmiSettingChangeAlert', currentLocale)}
          </div>
        ) : null}
        {meeting.usePersonalMeetingId && !isChangePmiConfirmed ? (
          <div className={styles.pmiHintContainer}>
            {i18n.getString('pmiChangeConfirm', currentLocale)}
            <RcLink handleOnClick={() => handlePmiConfirmed(true)}>
              {i18n.getString('changePmiSettings', currentLocale)}
            </RcLink>
            .
          </div>
        ) : null}
      </>
    </MeetingSection>
  );
};
