import 'react-widgets/dist/css/react-widgets.css';

import Moment from 'moment';
import React, { Component } from 'react';
import momentLocalizer from 'react-widgets-moment';
import {
  isRecurringMeeting,
  RcMMeetingModel,
} from 'ringcentral-integration/modules/Meeting';

import i18n from './i18n';
import { MeetingDate } from './MeetingDate';
import { MeetingDuration as Duration } from './MeetingDuration';
import { MeetingIdSection } from './MeetingIdSection';
import { MeetingOptions } from './MeetingOptions';
import { Topic } from './MeetingTopic';
import { RecurringOptions as RecurringMeeting } from './RecurringOptions';
import styles from './styles.scss';
import { AudioOptions, Video } from './VideoAudioOptions';

interface MeetingConfigsProps {
  disabled: boolean;
  enablePersonalMeeting: boolean;
  personalMeetingId: string;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
  update: (...args: any[]) => any;
  init: (...args: any[]) => any;
  meeting: RcMMeetingModel;
  currentLocale: string;
  recipientsSection?: React.ReactNode;
  showTopic?: boolean;
  showWhen?: boolean;
  showDuration?: boolean;
  showRecurringMeeting?: boolean;
  meetingOptionToggle?: boolean;
  passwordPlaceholderEnable?: boolean;
  audioOptionToggle?: boolean;
  useTimePicker?: boolean;
}

interface MeetingConfigsState {
  isChangePmiConfirmed: boolean;
}

class MeetingConfig extends Component<
  MeetingConfigsProps,
  MeetingConfigsState
> {
  static defaultProps = {
    recipientsSection: undefined,
    showTopic: true,
    showWhen: true,
    showDuration: true,
    showRecurringMeeting: true,
    meetingOptionToggle: false,
    passwordPlaceholderEnable: false,
    audioOptionToggle: false,
    useTimePicker: false,
  };

  hours: any;
  minutes: any;
  topic: any;

  constructor(args: MeetingConfigsProps) {
    super(args);
    const { init, currentLocale } = this.props;
    init();
    this.state = {
      isChangePmiConfirmed: false,
    };
    Moment.locale(currentLocale);
    momentLocalizer();
  }

  componentDidMount() {
    const { meeting, showWhen } = this.props;
    setTimeout(() => {
      if (showWhen) {
        this.displayFormat(meeting.schedule.startTime);
      }
    });
  }

  displayFormat(startTime: Date) {
    const { useTimePicker } = this.props;
    const isAMPM = useTimePicker ? 'hh' : 'HH';
    if (this.hours) {
      this.hours.value = Moment(startTime).format(isAMPM);
    }
    if (this.minutes) {
      this.minutes.value = Moment(startTime).format('mm');
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: MeetingConfigsProps) {
    const { meeting } = this.props;
    if (meeting.topic !== nextProps.meeting.topic) {
      setTimeout(() => {
        if (!this.topic) return;
        const selectionStart = this.topic.selectionStart;
        const selectionEnd = this.topic.selectionEnd;
        this.topic.value = nextProps.meeting.topic;
        this.topic.setSelectionRange(selectionStart, selectionEnd);
      });
    }
    if (
      meeting.schedule &&
      nextProps.meeting.schedule &&
      meeting.schedule.startTime !== nextProps.meeting.schedule.startTime
    ) {
      this.displayFormat(nextProps.meeting.schedule.startTime);
    }
  }

  handlePmiConfirmed = (isChangePmiConfirmed: boolean) => {
    this.setState({ isChangePmiConfirmed });
  };

  render() {
    const { isChangePmiConfirmed } = this.state;
    const {
      update,
      meeting,
      currentLocale,
      recipientsSection,
      showTopic,
      showWhen,
      showDuration,
      showRecurringMeeting,
      meetingOptionToggle,
      passwordPlaceholderEnable,
      audioOptionToggle,
      useTimePicker,
      enablePersonalMeeting,
      personalMeetingId,
      switchUsePersonalMeetingId,
    } = this.props;

    const isOptionDisabled =
      meeting.usePersonalMeetingId && !isChangePmiConfirmed;

    if (!Object.keys(meeting).length) {
      return null;
    }

    const onToggle = (type) => {
      const isToggle = !this[`${type}Blur`];
      if (isToggle) {
        if (this[type]._values.open) {
          this[type].inner.close();
        } else {
          this[type].focus();
          this[type].inner.toggle();
        }
      }
    };
    const isRecurring = isRecurringMeeting(meeting.meetingType);
    const telephonyOnly = i18n.getString('telephonyOnly', currentLocale);
    const voIPOnly = i18n.getString('voIPOnly', currentLocale);
    const both = i18n.getString('both', currentLocale);
    const AUDIO_OPTIONS = [
      {
        key: 'Phone',
        text: telephonyOnly,
      },
      {
        key: 'ComputerAudio',
        text: voIPOnly,
      },
      {
        key: 'Phone_ComputerAudio',
        text: both,
      },
    ];
    let minTime = {};
    if (
      meeting.schedule &&
      meeting.schedule.startTime &&
      +new Date(meeting.schedule.startTime) < +new Date()
    ) {
      minTime = { min: new Date() };
    }

    return (
      <div className={styles.scroll} data-sign="meetingConfigsPanel">
        {showTopic ? (
          <Topic
            that={this}
            meeting={meeting}
            update={update}
            currentLocale={currentLocale}
          />
        ) : null}
        {enablePersonalMeeting && (
          <MeetingIdSection
            personalMeetingId={personalMeetingId}
            currentLocale={currentLocale}
            meeting={meeting}
            switchUsePersonalMeetingId={switchUsePersonalMeetingId}
            handlePmiConfirmed={this.handlePmiConfirmed}
            isChangePmiConfirmed={isChangePmiConfirmed}
          />
        )}
        {recipientsSection}
        {showWhen ? (
          <MeetingDate
            isRecurring={isRecurring}
            currentLocale={currentLocale}
            meeting={meeting}
            update={update}
            that={this}
            onToggle={onToggle}
            minTime={minTime}
            useTimePicker={useTimePicker}
          />
        ) : null}
        {showDuration ? (
          <Duration
            isRecurring={isRecurring}
            currentLocale={currentLocale}
            meeting={meeting}
            update={update}
          />
        ) : null}
        {showRecurringMeeting ? (
          <RecurringMeeting
            isRecurring={isRecurring}
            currentLocale={currentLocale}
            meeting={meeting}
            update={update}
          />
        ) : null}
        <Video
          currentLocale={currentLocale}
          meeting={meeting}
          update={update}
          disabled={isOptionDisabled}
        />
        <AudioOptions
          data={AUDIO_OPTIONS}
          currentLocale={currentLocale}
          meeting={meeting}
          update={update}
          audioOptionToggle={audioOptionToggle}
          disabled={isOptionDisabled}
        />
        <MeetingOptions
          currentLocale={currentLocale}
          meeting={meeting}
          that={this}
          update={update}
          meetingOptionToggle={meetingOptionToggle}
          passwordPlaceholderEnable={passwordPlaceholderEnable}
          disabled={isOptionDisabled}
        />
      </div>
    );
  }
}

export default MeetingConfig;
